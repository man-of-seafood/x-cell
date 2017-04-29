// need to load in the model so the view has something to render
// need to load in the view so the model can be rendered
// need to load fs so we can open up our fixture
// then what we're doing is esentially creating a new html doc
// and putting the fixture html inside it

const fs = require('fs');
const TableModel = require('../table-model');
const TableView = require('../table-view');

// then as with all jest tests, we format it like we are 
// describing the module
// describing a subsection of the module
// describing a particular function
//it does... expect..toBe..
describe('table-view', () => {

  beforeEach(() => {
    // we need to load the html skeleton and parse it into the
    // dom so there's something for the model to take on
    const fixturePath = './client/js/test/fixtures/sheet-container.html';
    const html = fs.readFileSync(fixturePath, 'utf8');
    document.documentElement.innerHTML = html;
  });

  describe('table header', () => {
    it('has valid column header labels', () => {
      // set up the initial state
      const numCols = 6;
      const numRows = 10;
      const model = new TableModel(numCols, numRows);
      const view = new TableView(model);
      view.init();
      // inspect the initial state
      let ths = document.querySelectorAll('THEAD TH');
      expect(ths.length).toBe(numCols);

      let labelTexts = Array.from(ths).map(el => el.textContent);
      expect(labelTexts).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);
    })
  })
})
