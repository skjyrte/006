describe("template spec", () => {
  it("Site is live", () => {
    cy.visit("http://localhost:3000");
    cy.get(".app-container__main-header").should("exist");
  });

  const initialEntryValue = "Entry to edit";
  const editedEntryValue = "Edited entry";

  const sampleEntries: Array<string> = [
    editedEntryValue,
    editedEntryValue,
    editedEntryValue,
  ];

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

  /*   it("Entry can be edited", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-test-id="entry"]')
      .contains(initialEntryValue)
      .parentsUntil(".app-container__todos-list-container")
      .within((resolved: any) => {
        cy.get('[data-test-id="edit-button"]').click();
        cy.get("textarea")
          .should("have.value", initialEntryValue)
          .clear()
          .type(editedEntryValue)
          .should("have.value", editedEntryValue)
          .end();
      });
    cy.get('[data-test-id="save-button"]').click();
  });
 */

  function deleteEntry() {
    if (
      cy
        .get('[data-test-id="entry"]')
        .contains(editedEntryValue)
        .should("exist")
    ) {
      cy.get('[data-test-id="entry"]')
        .contains(editedEntryValue)
        .parentsUntil(".app-container__todos-list-container")
        .find('[data-test-id="delete-button"]')
        .click()
        .then(() => deleteEntry());
    } else {
      assert(true);
    }
  }

  it("Entry can be deleted", () => {
    const scrollInterval: Array<number> = [500, 500, 500, 500];

    cy.visit("http://localhost:3000");
    scrollInterval.forEach((interval) => {
      cy.wait(interval);
      cy.get(".app-container__todos-list-container").scrollTo("bottom"); // Scroll 'sidebar' to its bottom
    });

    deleteEntry();
  });
});
