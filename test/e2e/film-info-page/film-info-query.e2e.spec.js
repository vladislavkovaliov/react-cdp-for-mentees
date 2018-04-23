const {
  header,
  filmItem,
  timeout,
  seacrhBtn,
  pagination,
  filmInfo,
} = require('../config');

describe('Film info page', () => {
  beforeEach(() => {
    browser.url('/film-info?id=36647');
  });

  it('should title be visible', () => {
    browser.waitUntil(() => {
      return browser.isVisible(`${filmInfo}__name_and_rating`);
    });
  });

  it('should year be visible', () => {
    browser.waitUntil(() => {
      return browser.isVisible(`${filmInfo}__year_and_time > span.year`);
    });
  });

  it('should time be visible', () => {
    browser.waitUntil(() => {
      return browser.isVisible(`${filmInfo}__year_and_time > span.time`);
    });
  });

  it('should description be visible', () => {
    browser.waitUntil(() => {
      return browser.isVisible(`${filmInfo}__data div.overview`);
    });
  });

  it('should similar result name be visible', () => {
    browser.waitUntil(() => {
      return browser.isVisible('.content__header-result');
    });
  });

  it('should page by click not an arrow', () => {
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
