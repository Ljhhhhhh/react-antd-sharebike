import React from 'react'
import {Select} from 'antd'
const Option = Select.Option

export default {
  formateDate(time) {
    if (!time) return;
    return new Date(time).toLocaleString('chinese', {hour12: false});
  },
  pagination(data, callback) {
    return {
      onChange: (current) => {
        callback(current)
      },
      current: data.result.page,
      pageSize: data.result.page_size,
      total: data.result.total,
      showTotal: () => {
        return `共${data.result.total}条数据`
      },
      showQuickJumper: true
    }
  },
  getOptionList(data) {
    if (!data) {
      return [];
    }
    let options = [] // [<Option value="0" key="all_key">全部</Option>]
    data.forEach((item) => {
      options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
    })
    return options
  },
  /**
     * ETable 行点击通用函数
     * @param {*选中行的索引} selectedRowKeys
     * @param {*选中行对象} selectedItem
     */
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
      if (selectedIds) {
          this.setState({
              selectedRowKeys,
              selectedIds: selectedIds,
              selectedItem: selectedRows
          })
      } else {
          this.setState({
              selectedRowKeys,
              selectedItem: selectedRows
          })
      }
  },
}