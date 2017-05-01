class TableModel {
  constructor(numCols = 10, numRows = 10) {
    this.numCols = numCols;
    this.numRows = numRows;
    this.data = {};
  }
  _getCellId(location) {
    return `${location.col}:${location.row}`;
  }

  getValue(location) {
    return this.data[this._getCellId(location)];
  }
  setValue(location, value) {
    this.data[this._getCellId(location)] = value;
  }
  addCol() {
    console.log(this.numCols);
    this.numCols += 1;
    console.log(this.numCols);
  }
}


module.exports = TableModel;
