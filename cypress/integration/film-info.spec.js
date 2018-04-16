describe.only('Film info page', () => {
  before(() => {
    cy.visit('/film-info?id=36647');

  });

  it('Should return back on index page after button "Back" was clicked', () => {
    cy.get('.header .header__title a')
      .click();

    cy.url().should('eq', 'http://localhost:3000/')
  });
});