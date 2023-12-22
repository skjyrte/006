describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-test-id="input-bar"]').should("exist");

    cy.get('[data-test-id="entry"]')
      .contains("ABCDE")
      .parent()
      .then((resolved: any) => {
        resolved.find('[data-test-id="edit-button"]').click();
        return resolved;
      })
      .then((resolved: any) => {
        resolved.find("textarea").input("abadasdasa");
        /* 
        TypeError
resolved.find(...).input is not a function
 */
      });
  });
});
