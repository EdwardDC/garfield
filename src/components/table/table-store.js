import _ from '@/libs/util'
const sortData = (data, states) => {
  const sortingColumn = states.sortingColumn
  if (!sortingColumn || typeof sortingColumn.sortable === 'string') {
    return data
  }
  return _.orderBy(data, states.sortProp, states.sortOrder, sortingColumn.sortMethod)
}

const doFlattenColumns = (columns) => {
  const result = []
  columns.forEach((column) => {
    if (column.children) {
      result.push.apply(result, doFlattenColumns(column.children))
    } else {
      result.push(column)
    }
  })
  return result
}

const toggleRowSelection = (states, row, selected) => {
  let changed = false
  const selection = states.selection
  const index = selection.indexOf(row)
  if (typeof selected === 'undefined') {
    if (index === -1) {
      selection.push(row)
      changed = true
    } else {
      selection.splice(index, 1)
      changed = true
    }
  } else {
    if (selected && index === -1) {
      selection.push(row)
      changed = true
    } else if (!selected && index > -1) {
      selection.splice(index, 1)
      changed = true
    }
  }

  return changed
}

class TableStore {

  constructor (table, options = {}) {
    this.table = table
    this.states = {
      rowKey: null,
      _columns: [],
      originColumns: [],
      columns: [],
      fixedColumns: [],
      rightFixedColumns: [],
      _data: null,
      filteredData: null,
      data: null,
      sortingColumn: null,
      sortProp: null,
      sortOrder: null,
      isAllSelected: false,
      selection: [],
      reserveSelection: false,
      selectable: null,
      currentRow: null,
      hoverRow: null,
      filters: {},
      expandRows: [],
      defaultExpandAll: false
    }
    Object.assign(this.states, options)
  }

  mutations = {
    changeSortCondition (states) {
      states.data = sortData((states.filteredData || states._data || []), states)

      this.table.$emit('sort-change', {
        column: this.states.sortingColumn,
        prop: this.states.sortProp,
        order: this.states.sortOrder
      })
    },
    insertColumn (states, column, index, parent) {
      let array = states._columns
      if (parent) {
        array = parent.children
        if (!array) array = parent.children = []
      }

      if (typeof index !== 'undefined') {
        array.splice(index, 0, column)
      } else {
        array.push(column)
      }

      if (column.type === 'selection') {
        states.selectable = column.selectable
        states.reserveSelection = column.reserveSelection
      }

      this.updateColumns()  // hack for dynamics insert column
      this.scheduleLayout()
    },
    removeColumn (states, column) {
      let _columns = states._columns
      if (_columns) {
        _columns.splice(_columns.indexOf(column), 1)
      }

      this.updateColumns()  // hack for dynamics remove column
      this.scheduleLayout()
    },
    rowSelectedChanged (states, row) {
      const changed = toggleRowSelection(states, row)
      const selection = states.selection

      if (changed) {
        const table = this.table
        table.$emit('selection-change', selection)
        table.$emit('select', selection, row)
      }
      this.updateAllSelected()
    },
    setData (states, data) {
      // 数据发生了改变
      const hasChange = states._data !== data
      states._data = data

      states.data = sortData(data || [], states)

      this.updateCurrentRow()

      // 不保留原来的选中项
      if (!states.reserveSelection) {
        if (hasChange) {
          this.clearSelection()
        } else {
          this.cleanSelection()
        }
        this.updateAllSelected()
      } else {
        this.updateAllSelected()
      }
    },
    setHoverRow (states, row) {
      states.hoverRow = row
    },
    setCurrentRow (states, row) {
      const oldCurrentRow = states.currentRow
      states.currentRow = row

      if (oldCurrentRow !== row) {
        this.table.$emit('current-change', row, oldCurrentRow)
      }
    },
    toggleAllSelection (states) {
      const data = states.data || []
      const value = !states.isAllSelected
      const selection = this.states.selection
      let selectionChanged = false

      data.forEach((item, index) => {
        if (states.selectable) {
          if (states.selectable.call(null, item, index) && toggleRowSelection(states, item, value)) {
            selectionChanged = true
          }
        } else {
          if (toggleRowSelection(states, item, value)) {
            selectionChanged = true
          }
        }
      })

      const table = this.table
      if (selectionChanged) {
        table.$emit('selection-change', selection)
      }
      table.$emit('select-all', selection)
      states.isAllSelected = value
    },
    setRowbyIndex (states, row) {
      let {data} = states
      let index = data.indexOf(row)
      if (index > -1) {
        this.commit('rowSelectedChanged', row)
      }
    }
  }

  commit (name, ...args) {
    const mutations = this.mutations

    mutations[name] && mutations[name].apply(this, [this.states].concat(args))
  }

  clearSelection () {
    var states = this.states
    var oldSelection = states.selection
    states.isAllSelected = false
    states.selection = []
    if (oldSelection.length) {
      this.table.$emit('selection-change', states.selection)
    }
  }

  cleanSelection () {
    let deleted
    let {selection = [], data = []} = this.states
    deleted = selection.filter(item => {
      return data.indexOf(item) === -1
    })
    deleted.forEach(item => {
      selection.splice(selection.indexOf(item), 1)
    })
    if (deleted.length) {
      this.table.$emit('selection-change', selection)
    }
  }

  isSelected (row) {
    return this.states.selection.indexOf(row) > -1
  }

  getSelection () {
    return this.states.selection
  }

  scheduleLayout () {
    // this.table.debouncedLayout()
  }

  toggleRowSelection (row, selected) {
    const changed = toggleRowSelection(this.states, row, selected)
    if (changed) {
      this.table.$emit('selection-change', this.states.selection)
    }
  }

  updateAllSelected () {
    let states = this.states
    let {data = [], selection = [], selectable} = states

    if (!data.length) {
      this.isAllSelected = false
      return
    }

    let selectedCount = 0
    let i = 0
    let length = data.length
    let item

    let isSelected = (row) => {
      return selection.indexOf(row) > -1
    }

    let isAllSelected = true
    for (; i < length; i++) {
      item = data[i]
      if (selectable) {
        const isRowSelectable = selectable(item, i)
        if (isRowSelectable) {
          if (!isSelected(item)) {
            isAllSelected = false
            break
          } else {
            selectedCount++
          }
        }
      } else {
        if (!isSelected(item)) {
          isAllSelected = false
          break
        } else {
          selectedCount++
        }
      }
    }

    if (selectedCount === 0) {
      isAllSelected = false
    }
    states.isAllSelected = isAllSelected
  }

  updateColumns () {
    const states = this.states
    const _columns = states._columns || []
    states.fixedColumns = _columns.filter((column) => column.fixed === true || column.fixed === 'left')
    states.rightFixedColumns = _columns.filter((column) => column.fixed === 'right')

    if (states.fixedColumns.length > 0 && _columns[0] && _columns[0].type === 'selection' && !_columns[0].fixed) {
      _columns[0].fixed = true
      states.fixedColumns.unshift(_columns[0])
    }
    states.originColumns = [].concat(states.fixedColumns).concat(_columns.filter((column) => !column.fixed)).concat(states.rightFixedColumns)
    states.columns = doFlattenColumns(states.originColumns)
  }

  updateCurrentRow () {
    var states = this.states
    var oldRow = states.currentRow
    var data = states.data
    // 没找到
    if (data.indexOf(oldRow) < 0) {
      states.currentRow = null

      if (states.currentRow !== oldRow) {
        this.table.$emit('current-change', null, oldRow)
      }
    }
  }
}

export default TableStore
