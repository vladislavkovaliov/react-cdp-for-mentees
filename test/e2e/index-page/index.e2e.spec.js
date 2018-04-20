const assert = require('assert');

describe('webdriver.io page', () => {
  it('should have the right title - the fancy generator way', () => {
    browser.url('http://react-cdp.herokuapp.com');
  
    const title = browser.getTitle();
  
    assert.equal(title, 'React CDP App');
  });
});