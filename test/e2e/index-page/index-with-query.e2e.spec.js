const {
  header,
  filmItem,
  timeout,
  seacrhBtn,
  pagination,
} = require('./config');

function clickBtnById(id) {
  browser
    .element(id)
    .click();
}

describe('Index page', () => {
  describe('With title', () => {
    before(() => {
      browser.url('/?search=Blade&searchBy=title');
    });

    it('should have the right title', () => {
      const title = browser.getTitle();
    
      title.should.equal('React CDP App');
    });
  
    it('should search movies by title', () => {
      browser.waitForExist(filmItem, timeout);
    });
  });
  
  describe('With genres', () => {
    before(() => {
      browser.url('/?search=Action&searchBy=genres');
    });

    it('should have the right title', () => {
      const title = browser.getTitle();
    
      title.should.equal('React CDP App');
    });

    it('should search movies by genres', () => {
      browser.waitForExist(filmItem, timeout);
    });
  });
});

