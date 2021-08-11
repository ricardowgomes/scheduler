describe("Navigation", () => {
  beforeEach(() => {
    cy.request('GET', '/api/debug/reset');
    cy.visit('/');
    cy.contains('Monday');
  });

  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.contains("[data-testid=day]", "Tuesday")
      .should("have.class", "day-list__item")
      .should("have.css", "color", "rgb(131, 149, 167)")
      .click()
      .should("have.css", "background-color", "rgb(242, 242, 242)")
      .should("have.class", "day-list__item--selected")

    cy.get(".text--regular")
      .should('not.contain', 'Archie Cohen');
  });
});