export class Pagination {
  pageNumber = ''
  pageSize = ''
  lastPage = ''
  tableRowsCount = ''

  constructor({ pageNumber = 0, pageSize = 0, lastPage = 0, tableRowsCount = 0 } = {}) {
    this.pageNumber = pageNumber
    this.pageSize = pageSize
    this.lastPage = lastPage
    this.tableRowsCount = tableRowsCount
  }
}
