import Jsonp from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd';
import Utils from '../utils/utils'

export default class Axios {
  static requestList(_this,url,params, isMock = false) {
    let data = {
      params,
      isMock
    }
    this.ajax({
      url,
      data
    }).then((data) => {
      if (data && data.result) {
        let list = data.result.item_list.map((item, index) => {
          item.key = index;
          return item;
        });
        _this.setState({
          list,
          pagination: Utils.pagination(data, current => {
            _this.params.page = current;
            _this.requestList();
          })
        });
      }
    })
  }

  static jsonp(options) {
    return new Promise((resolve, reject) => {
      Jsonp(options.url, {
        param: 'callback'
      }, function(err, response) {
        if (err) reject(err)
        resolve(response)
      })
    })
  }

  static ajax(options) {
    let loading;
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById('ajaxLoading')
      loading.style.display = 'block'
    }
    // const baseURL = 'https://www.easy-mock.com/mock/5ca2128e0aa7bf50eb36bcc0/';
    let baseURL;
    if (options.isMock) {
      baseURL = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
    } else {
      baseURL = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
    }
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: 'get',
        baseURL,
        timeout: 5000,
        params: (options.data && options.data.parmas) || ''
      }).then(res => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading')
          loading.style.display = 'none'
        }
        if (res.status === 200) {
          const data = res.data;
          if (+data.code === 0) {
            resolve(data)
          } else {
            Modal.info({
              title: '提示',
              content: data.msg
            })
          }
        } else {
          reject(res.data)
        }
      })
    })
  }
}