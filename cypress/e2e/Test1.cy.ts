import "cypress-wait-until";

function deleteAllEntries() {
  cy.get("body").then((body) => {
    if (body.find(`[data-testid="entry"]`).length > 0) {
      cy.get('[data-testid="entry"]')
        .find('[data-testid="delete-button"]')
        .first()
        .click()
        .waitUntil(() => {
          return cy
            .get(".Toastify__toast-body")
            .contains("Deleted successfully")
            .click()
            .then(() => deleteAllEntries());
        });
    } else {
      assert(true);
    }
  });
}

const scrollToBottom = (pageLength: number, entryArray: Array<string>): any => {
  const scrollInterval: Array<number> = Array.from(
    Array(Math.ceil(entryArray.length / pageLength)).fill(500)
  );
  scrollInterval.forEach((interval) => {
    cy.wait(interval);
    cy.get(".app-container__todos-list-container").scrollTo("bottom", {
      ensureScrollable: false,
    });
  });
};

describe("Todo app tests", () => {
  before(() => {
    cy.visit("http://localhost:3000");
    /* Cleanup of todos from database */
    scrollToBottom(elementsOnPage, sampleEntries);
    deleteAllEntries();
    cy.get('[data-testid="entry"]').should("not.exist");
    cy.get(".app-container__todos-list-container_no-entry").should(
      "contain",
      "No entry to show"
    );
  });

  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  const elementsOnPage = 2;
  const sampleEntries: Array<string> = ["Todo 1", "Todo 2", "Todo 3"];
  const editedEntries: Array<Array<string>> = [
    ["Todo 1", "EDITED: Todo 1"],
    ["Todo 2"],
    ["Todo 3", "EDITED: Todo 3"],
  ];

  const editedCheckboxes: number[] = [0, 2];
  const stringOver70Chars: string =
    "nmmnmdiiqacpevwtfadjhbkciyajfkamjhzjfvwnkacjyrxfuvzakwragbhbrrvpqpnEND_here are characters over 70";
  const stringExact70Chars: string =
    "nmmnmdiiqacpevwtfadjhbkciyajfkamjhzjfvwnkacjyrxfuvzakwragbhbrrvpqpnEND";

  it("Page elements are present, app ready for tests", () => {
    cy.get(".app-container__main-header").should("exist");
  });

  it("Entry can be added", () => {
    sampleEntries.forEach((element, index) => {
      cy.get('[data-testid="input-bar"]')
        .find("input")
        .should("exist")
        .should("have.value", "")
        .type(element)
        .end();
      cy.get('[data-testid="add-entry-button"]').click().end();
      cy.get('[data-testid="entry"] > .entry__todo-content')
        .eq(index)
        .should("exist")
        .should("contain", element);
    });
  });

  it("Entry can be edited", () => {
    cy.get('[data-testid="all-button"]')
      .then(($el) => $el[0].className)
      .should("match", /text-button_now-selected/);

    scrollToBottom(elementsOnPage, sampleEntries);
    editedEntries.forEach((element, index) => {
      cy.get('[data-testid="entry"]').eq(index).should("contain", element[0]);
      if (element[0] === sampleEntries[index] && element[1]) {
        cy.get('[data-testid="entry"]')
          .eq(index)
          .within(() => {
            cy.get('[data-testid="edit-button"]').click();
            cy.get("textarea")
              .should("have.value", element[0])
              .clear()
              .type(element[1])
              .should("have.value", element[1])
              .end();
          });
        cy.get('[data-testid="save-button"]').click();
        cy.get('[data-testid="entry"] > .entry__todo-content')
          .eq(index)
          .should("exist")
          .should("contain", element[1]);
      }
    });
  });

  it("Entry status can be changed", () => {
    scrollToBottom(elementsOnPage, sampleEntries);
    cy.get('[data-testid="all-button"]')
      .then(($el) => $el[0].className)
      .should("match", /text-button_now-selected/);

    scrollToBottom(elementsOnPage, sampleEntries);
    editedCheckboxes.forEach((element) => {
      cy.get('[data-testid="entry"]')
        .eq(element)
        .find(".entry__todo-content")
        .end();
      cy.get('[data-testid="checkbox"]')
        .eq(element)
        .find('[data-testid="checkbox-input"]')
        .should("not.be.checked", "not.be.disabled")
        .click({ force: true })
        .should("be.checked", "not.be.disabled")
        .end();
      cy.get('[data-testid="entry"]')
        .eq(element)
        .find(".entry__todo-content_completed")
        .end();
    });
  });
  it("Active tab shows only active", () => {
    cy.get('[data-testid="active-button"]').should("exist").click().end();
    scrollToBottom(elementsOnPage, sampleEntries);
    cy.get('[data-testid="entry"]').should("have.length", "1");
    cy.get('[data-testid="checkbox-input"]')
      .should("not.be.checked", "not.be.disabled")
      .end();
  });
  it("Completed tab shows only completed", () => {
    cy.get('[data-testid="completed-button"]').should("exist").click().end();
    scrollToBottom(elementsOnPage, sampleEntries);
    cy.get('[data-testid="entry"]').should("have.length", "2");
    editedCheckboxes.forEach((element, index) => {
      cy.get('[data-testid="checkbox-input"]')
        .eq(index)
        .should("be.checked", "not.be.disabled")
        .end();
    });
  });
  it("Light theme is OK", () => {
    cy.get('[data-testid="theme-button"]').should("exist").click().end();
    scrollToBottom(elementsOnPage, sampleEntries);
    cy.get(".dark").should("not.exist");
    cy.get('[data-testid = "icon-moon"]').should("exist");
    cy.get('[data-testid = "icon-sun"]').should("not.exist");
  });

  it("Dark theme is OK", () => {
    scrollToBottom(elementsOnPage, sampleEntries);
    cy.get("body").within(() => {
      cy.get("div").each(($el) => console.log($el.hasClass("dark")));
      /* overview of applied theme classes, no special check was applied */
      console.log(cy.get("div"));
    });
    cy.get('[data-testid = "icon-moon"]').should("not.exist");
    cy.get('[data-testid = "icon-sun"]').should("exist");
  });

  it("Clear completed button works", () => {
    cy.get('[data-testid="completed-button"]').should("exist").click().end();
    scrollToBottom(elementsOnPage, sampleEntries);
    cy.get('[data-testid="clear-completed-button"]')
      .should("exist")
      .click()
      .end();
    cy.get('[data-testid="entry"]').should("have.length", "0");
  });

  it("Active todo count OK", () => {
    cy.get('[data-testid="active-todo-counter"]')
      .should("exist")
      .contains("1 item left");
  });

  it("Attempt to add an entry with more than 70 characters", () => {
    cy.get('[data-testid="input-bar"]')
      .find("input")
      .should("exist")
      .should("have.value", "")
      .type(stringOver70Chars)
      .should("have.value", stringExact70Chars)
      .end();
    cy.get('[data-testid="add-entry-button"]').click().end();
    cy.get('[data-testid="entry"] > .entry__todo-content')
      .eq(1)
      .should("exist")
      .should("contain", stringExact70Chars);
  });
  it("Delete entry", () => {
    cy.get('[data-testid="entry"]')
      .eq(1)
      .find('[data-testid="delete-button"]')
      .click();
  });

  it("Attempt to edit an entry with more than 70 characters", () => {
    cy.get('[data-testid="all-button"]')
      .then(($el) => $el[0].className)
      .should("match", /text-button_now-selected/);

    scrollToBottom(elementsOnPage, sampleEntries);
    cy.get('[data-testid="entry"]')
      .should("contain", sampleEntries[1])
      .within(() => {
        cy.get('[data-testid="edit-button"]').click();
        cy.get("textarea")
          .should("have.value", sampleEntries[1])
          .clear()
          .type(stringOver70Chars)
          .should("have.value", stringExact70Chars)
          .end();
      });
    cy.get('[data-testid="save-button"]').click();
    cy.get('[data-testid="entry"] > .entry__todo-content')
      .should("exist")
      .should("contain", stringExact70Chars);
  });
});
