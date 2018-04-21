const {
  header,
  filmItem,
  timeout,
  seacrhBtn,
  pagination,
} = require('../config');

function clickBtnById(id) {
  browser
    .element(id)
    .click();
}

describe('Index page', () => {
  beforeEach(() => {
    browser.url('/');
  });

  it('should have the right title', () => {
    const title = browser.getTitle();
  
    title.should.equal('React CDP App');
  });

  it('should search movies by title', () => {
    const searchVal = 'Blade';
    browser
      .element(`${header}__content-input`)
      .setValue(searchVal);
    
    clickBtnById(seacrhBtn);

    browser.waitForExist(filmItem, timeout);
  });

  it('should search movies by genres', () => {
    const searchVal = 'Action';
    browser
      .element('label[for="genres"]')
      .click();

    browser
      .element(`${header}__content-input`)
      .setValue(searchVal);
    
    clickBtnById(seacrhBtn);

    browser.waitForExist(filmItem, timeout);
  });

  it('should page by click not an arrow', () => {
    const searchVal = 'Action';
    browser
      .element('label[for="genres"]')
      .click();

    browser
      .element(`${header}__content-input`)
      .setValue(searchVal);
    
    clickBtnById(seacrhBtn);

    browser.waitForExist(filmItem, timeout);

    const page = browser
      .getAttribute(`${pagination} li.selected a`, 'aria-label');

    browser
      .element(`${pagination} li.selected + li`)
      .click();

    browser.waitUntil(() => {
      const newPage = browser
        .getAttribute(`${pagination} li.selected a`, 'aria-label');

        return page !== newPage;
    }, timeout);
  });

  it('should page by click an arrow', () => {
    const searchVal = 'Action';
    browser
      .element('label[for="genres"]')
      .click();

    browser
      .element(`${header}__content-input`)
      .setValue(searchVal);
    
    clickBtnById(seacrhBtn);

    browser.waitForExist(filmItem, timeout);

    const page = browser
      .getAttribute(`${pagination} li.selected a`, 'aria-label');

    browser
      .element(`${pagination} li.next`)
      .click();

    browser.waitUntil(() => {
      const newPage = browser
        .getAttribute(`${pagination} li.selected a`, 'aria-label');

      return page !== newPage;
    }, timeout);
  });

  it('should page by click an arrow and return back', () => {
    const searchVal = 'Action';
    browser
      .element('label[for="genres"]')
      .click();

    browser
      .element(`${header}__content-input`)
      .setValue(searchVal);
    
    clickBtnById(seacrhBtn);

    browser.waitForExist(filmItem, timeout);

    const page = browser
      .getAttribute(`${pagination} li.selected a`, 'aria-label');

    browser
      .element(`${pagination} li.next`)
      .click();

    browser.waitUntil(() => {
      const newPage = browser
        .getAttribute(`${pagination} li.selected a`, 'aria-label');

      browser
        .element(`${pagination} li.previous`)
        .click();
        
      return page === newPage;
    }, timeout);
  });
});

