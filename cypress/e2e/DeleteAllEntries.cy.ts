/* import "cypress-wait-until";

describe("template spec", () => {

  function deleteALLEntries() {
    cy.get("body").then((body: any) => {
      if (
        body.find(`[data-test-id="entry"]:contains(${editedEntryValue})`)
          .length > 0
      ) {
        cy.get('[data-test-id="entry"]')
          .contains(editedEntryValue)
          .parentsUntil(".app-container__todos-list-container")
          .find('[data-test-id="delete-button"]')
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
});
 */
