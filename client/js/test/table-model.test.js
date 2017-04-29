const TableModel = require('../table-model');

describe('table-model', () => {
  it('can set and get a value', () => {
    // set up the initial state
    const model = new TableModel();
    const location = { row: 1, col: 2 };
    // inspect the initial state
    expect(model.getValue(location)).toBeUndefined();
    // test the code under test
    model.setValue(location, 'foo');
    // inspect the resulting state
    expect(model.getValue(location)).toBe('foo');
  });
});
