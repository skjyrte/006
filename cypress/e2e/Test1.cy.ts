import "cypress-wait-until";

describe("template spec", () => {
  it("Site is live", () => {
    cy.visit("http://localhost:3000");
    cy.get(".app-container__main-header").should("exist");
  });

  const initialEntryValue = "Entry to edit";
  const editedEntryValue = "Edited entry";

  const sampleEntries: Array<string> = [
    "Prepare a 72-hour kit",
    "Bake something I've never tried before",
    "Copy of Learn Express.js",
    "Copy of Learn Express.js",
    "Copy of Learn Express.js",
    "Learn Express.js",
    "Listen to a new music genre",
    "Go for a run",
    "Listen to a new podcast",
    "Find a DIY to do",
    "Study a foreign language",
    "Think of a new business idea",
    "Draw something interesting",
  ];

  const editedEntries: Array<Array<string>> = [
    ["Prepare a 72-hour kit", "EDITED: Next week: Prepare a 72-hour kit"],
    ["Bake something I've never tried before"],
    ["Copy of Learn Express.js", "EDITED: LEARN EXPRESS"],
    ["Copy of Learn Express.js", "EDITED: LEARN EXPRESS"],
    ["Copy of Learn Express.js", "EDITED: LEARN EXPRESS"],
    ["Learn Express.js"],
    ["Listen to a new music genre"],
    ["Go for a run", "EDITED: Next year: Go for a run"],
    ["Listen to a new podcast"],
    ["Find a DIY to do"],
    ["Study a foreign language"],
    ["Think of a new business idea"],
    ["Draw something interesting"],
  ];

  const scrollInterval: Array<number> = [500, 500, 500, 500, 500, 500];

  it("Entry can be deleted", () => {
    cy.visit("http://localhost:3000");
    scrollInterval.forEach((interval) => {
      cy.wait(interval);
      cy.get(".app-container__todos-list-container").scrollTo("bottom", {
        ensureScrollable: false,
      });
    });

    deleteALLEntries();

    cy.get(".app-container__todos-list-container_no-entry").should(
      "contain",
      "No entry to show"
    );
  });
  it("Entry can be added", () => {
    cy.visit("http://localhost:3000");
    sampleEntries.forEach((entry) => {
      cy.get('[data-test-id="input-bar"]')
        .should("exist")
        .should("have.value", "")
        .type(entry)
        .end();
      cy.get('[data-test-id="add-entry-button"]').click();
    });
  });

  it("Entry can be edited", () => {
    cy.visit("http://localhost:3000");
    scrollInterval.forEach((interval) => {
      cy.wait(interval);
      cy.get(".app-container__todos-list-container").scrollTo("bottom", {
        ensureScrollable: false,
      });
    });
    editedEntries.forEach((element: any, index) => {
      cy.get('[data-test-id="entry"]').eq(index).should("contain", element[0]);
      if (element[0] === sampleEntries[index] && element[1]) {
        cy.get('[data-test-id="entry"]')
          .eq(index)
          .within((resolved: any) => {
            cy.get('[data-test-id="edit-button"]').click();
            cy.get("textarea")
              .should("have.value", element[0])
              .clear()
              .type(element[1])
              .should("have.value", element[1])
              .end();
          });
        cy.get('[data-test-id="save-button"]').click();
      }
    });
  });

  function deleteALLEntries() {
    cy.get("body").then((body: any) => {
      if (body.find(`[data-test-id="entry"]`).length > 0) {
        cy.get('[data-test-id="entry"]')
          .find('[data-test-id="delete-button"]')
          .first()
          .click()
          .waitUntil(() => {
            return cy
              .get(".Toastify__toast-body")
              .contains("Deleted successfully")
              .click()
              .then(() => deleteALLEntries());
          });
      } else {
        assert(true);
      }
    });
  }
});
