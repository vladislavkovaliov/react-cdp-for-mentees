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
      return browser.isVisible(`${filmInfo}__data > div.overview`);
    });
  });

  // content__header-result

  it('should similar result name be visible', () => {
    browser.waitUntil(() => {
      return browser.isVisible('.content__header-result');
    });
  });

});
