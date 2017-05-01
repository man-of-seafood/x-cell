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

  describe('formula bar', () => {
    it('makes changes TO the value of the current cell', () => {
      //setup the initial state
      const model = new TableModel(3, 3);
      const view = new TableView(model);
      view.init();
      //inspect the initial state
      let trs = document.querySelectorAll('TBODY TR');
      let td = trs[0].cells[0];
      expect(td.textContent).toBe('');

      //simulate user action
      document.querySelector('#formula-bar').value = '65';
      view.handleFormulaBarChange();

      //inspect resulting state
      trs = document.querySelectorAll('TBODY TR');
      expect(trs[0].cells[0].textContent).toBe('65');
    });
    it('updates FROM the value of the current cell', () => {
      //set up the initial state
      const model = new TableModel(3, 3);
      const view = new TableView(model);
      model.setValue({ col: 2, row: 1 }, '123');
      view.init();
      //inspect the initial state
      const formulaBarEl = document.querySelector('#formula-bar');
      expect(formulaBarEl.value).toBe('');

      //evaluate the code under test/simulate user action
      const trs = document.querySelectorAll('TBODY TR');
      trs[1].cells[2].click();

      //evaluate the resulting state
      expect(formulaBarEl.value).toBe('123');
    })
  })

  describe('table body', () => {
    it('highlights the current cell when clicked', () => {
      //set up the initial state
      const model = new TableModel(10, 5);
      const view = new TableView(model);
      view.init();
      //inspect the initial state
      let trs = document.querySelectorAll('TBODY TR');
      let td = trs[2].cells[3];
      expect(td.className).toBe('');
      //run the code under test/user action to be simulated 
      td.click();
      //inspect the resulting state
      trs = document.querySelectorAll('TBODY TR');
      td = trs[2].cells[3];
      expect(td.className).not.toBe('');
    })

    it('has the right size', () => {
      //set up the initial state
      const numCols = 6;
      const numRows = 10;
      const model = new TableModel(numCols, numRows);
      const view = new TableView(model);
      view.init();
      //inspect the initial state
      let ths = document.querySelectorAll('THEAD TH');
      expect(ths.length).toBe(numCols);
    });
    it('fills in values from the models', () => {
      //set up the initial state

      const model = new TableModel(3, 3);
      const view = new TableView(model);
      model.setValue({ col: 2, row: 1 }, '123');
      view.init();

      //inspect the initial state
      const trs = document.querySelectorAll('TBODY TR');
      expect(trs[1].cells[2].textContent).toBe('123');
    });
  })

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
