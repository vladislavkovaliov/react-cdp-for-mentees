describe('Index page', () => {
  describe('Page is loaded', () => {
    before(() => {
      cy.visit('/');
    });

    it('should be visible search button', () => {
      cy.get('#search-btn')
        .should('be.visible');
    });

    it('should be visible title button', () => {
      cy.get('label[for="title"]')
        .should('be.visible');
    });

    it('should be visible director button', () => {
      cy.get('label[for="genres"]')
        .should('be.visible');
    });

    it('should be visible sort by release', () => {
      cy.get('label[for="release"]')
        .should('be.visible')
    });

    it('should be visible sort by rating', () => {
      cy.get('label[for="rating"]')
        .should('be.visible');
    });
  });
});

describe('Searching film', () => {
  describe('Should search films by title', () => {
    before(() => {
      cy.visit('/');
    });

    it('should input title into search field', () => {
      cy.get('.header__content-input')
        .type('Blade')
        .type('{enter}');
    });

    it('should be not zero count of result of found film', () => {
      cy.get('.content__header-result span')
        .should('have.not.value', '0')
    });
  });

  describe('Should search films by director', () => {
    before(() => {
      cy.visit('/');
    });

    it('should input genres into search field', () => {
      cy.get('label[for="genres"]')
        .click();

      cy.get('.header__content-input')
        .type('Blade')
        .type('{enter}');
    });

    it('should be not zero count of result of found film', () => {
      cy.get('.content__header-result span')
        .should('have.not.value', '0')
    });
  });
});

describe('Sorting films', () => {
  before(() => {
    cy.visit('/');


    cy.get('.header__content-input')
      .type('Blade')
      .type('{enter}')
      .wait(2000);
  });

  describe('Sort by rating', () => {
    it('should sort film by rating', () => {
      cy.get('.content__header-sort label[for="rating"]')
        .click();

      cy.get('.films-list')
        .children()
        .should('have.not.length', 0);
    });

    it('should rating of first more then last film', () => {
      const firstFilm = Cypress.$('.films-list .film-item:first-child span.rating').text();
      const lastFilm = Cypress.$('.films-list .film-item:last-child span.rating').text();

      expect(firstFilm > lastFilm).to.be.true;
    });
  });

  describe('Sort by release date', () => {
    it('should sort film by release date', () => {
      cy.get('.content__header-sort label[for="release"]')
        .click();

      cy.wait(2000);

      cy.get('.films-list')
        .children()
        .should('have.not.length', 0);
    });

    it('should year of first more then last film', () => {
      const firstFilm = Cypress.$('.films-list .film-item:first-child .film-item__footer-desc span').text();
      const lastFilm = Cypress.$('.films-list .film-item:last-child .film-item__footer-desc span').text();

      expect(firstFilm > lastFilm).to.be.true;
    });
  });
});