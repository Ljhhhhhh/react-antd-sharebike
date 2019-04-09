import React, { Component } from "react";
import { Card, Table, Modal, Button, message, Badge } from "antd";
import axios from "./../../axios/index";

export default class highTable extends Component {
  state = {

  }
  params = {
    page: 1
  }
  componentDidMount() {
    this.request()
  }
  request = () => {
    axios
      .ajax({
        url: "/table/high/list",
        data: {
          params: {
            page: this.params.page
          }
        }
      })
      .then(res => {
        if (res.code === 0) {
          res.result.list.map((item, index) => {
            item.key = index;
            return item;
          });
          this.setState({
            dataSource: res.result.list
          });
        }
      });
  };
  handleChange = (pagination, filters, sorter) => {
    this.setState({
      setOrder: sorter.order
    })
  }

  handleDelete = (item) => {
    Modal.confirm({
      title: '确认',
      content: '您确认要删除这条数据吗',
      onOk: () => {
        message.success('删除成功');
        this.request()
      }
    })
  }
  render() {
    const columns = [
      {
        title: "id",
        key: "id",
        dataIndex: "id",
        width: 80
      },
      {
        title: "用户名",
        key: "userName",
        dataIndex: "userName",
        width: 80
      },
      {
        title: "性别",
        key: "sex",
        dataIndex: "sex",
        render(sex) {
          return sex === 1 ? "男" : "女";
        },
        width: 80
      },
      {
        title: "状态",
        key: "state",
        dataIndex: "state",
        render(state) {
          let config = {
            "1": "咸鱼一条",
            "2": "风华浪子",
            "3": "北大才子",
            "4": "百度FE",
            "5": "创业者"
          };
          return config[state];
        },
        width: 80
      },
      {
        title: "爱好",
        key: "interest",
        dataIndex: "interest",
        render(abc) {
          let config = {
            "1": "游泳",
            "2": "打篮球",
            "3": "踢足球",
            "4": "跑步",
            "5": "爬山",
            "6": "骑行",
            "7": "桌球",
            "8": "麦霸"
          };
          return config[abc];
        },
        width: 80
      },
      {
        title: "生日",
        key: "birthday",
        dataIndex: "birthday",
        width: 120
      },
      {
        title: "地址",
        key: "address",
        dataIndex: "address",
        width: 120
      },
      {
        title: "早起时间",
        key: "time",
        dataIndex: "time",
        width: 120
      }
    ];
    const columns2 = [
      {
        title: "id",
        key: "id",
        dataIndex: "id",
      },
      {
        title: "用户名",
        key: "userName",
        dataIndex: "userName",
      },
      {
        title: "性别",
        key: "sex",
        dataIndex: "sex",
        render(sex) {
          return sex === 1 ? "男" : "女";
        },
      },
      {
        title: "状态",
        key: "state",
        dataIndex: "state",
        render(state) {
          let config = {
            "1": "咸鱼一条",
            "2": "风华浪子",
            "3": "北大才子",
            "4": "百度FE",
            "5": "创业者"
          };
          return config[state];
        },
      },
      {
        title: "爱好",
        key: "interest",
        dataIndex: "interest",
        render(abc) {
          let config = {
            "1": "游泳",
            "2": "打篮球",
            "3": "踢足球",
            "4": "跑步",
            "5": "爬山",
            "6": "骑行",
            "7": "桌球",
            "8": "麦霸"
          };
          return config[abc];
        },
      },
      
      {
        title: "生日",
        key: "birthday",
        dataIndex: "birthday",
      },
      {
        title: "地址",
        key: "address",
        dataIndex: "address",
      },
      {
        title: "早起时间",
        key: "time",
        dataIndex: "time",
      }
    ];
    const columns3 = [
      {
        title: "id",
        key: "id",
        dataIndex: "id",
      },
      {
        title: "用户名",
        key: "userName",
        dataIndex: "userName"
      },
      {
        title: "年龄",
        key: "age",
        dataIndex: "age",
        sorter: (a, b) => {
          return a.age - b.age
        },
        // sortOrder: this.state.sortOrder
      },
      {
        title: "性别",
        key: "sex",
        dataIndex: "sex",
        render(sex) {
          return sex === 1 ? "男" : "女";
        }
      },
      {
        title: "状态",
        key: "state",
        dataIndex: "state",
        render(state) {
          let config = {
            "1": "咸鱼一条",
            "2": "风华浪子",
            "3": "北大才子",
            "4": "百度FE",
            "5": "创业者"
          };
          return config[state];
        }
      },
      {
        title: "爱好",
        key: "interest",
        dataIndex: "interest",
        render(abc) {
          let config = {
            "1": "游泳",
            "2": "打篮球",
            "3": "踢足球",
            "4": "跑步",
            "5": "爬山",
            "6": "骑行",
            "7": "桌球",
            "8": "麦霸"
          };
          return config[abc];
        }
      },
      {
        title: "生日",
        key: "birthday",
        dataIndex: "birthday"
      },
      {
        title: "地址",
        key: "address",
        dataIndex: "address"
      },
      {
        title: "早起时间",
        key: "time",
        dataIndex: "time"
      }
    ];
    const columns4 = [
      {
        title: "id",
        dataIndex: "id",
      },
      {
        title: "用户名",
        dataIndex: "userName"
      },
      {
        title: "年龄",
        dataIndex: "age",
        sorter: (a, b) => {
          return a.age - b.age
        },
        // sortOrder: this.state.sortOrder
      },
      {
        title: "性别",
        dataIndex: "sex",
        render(sex) {
          return sex === 1 ? "男" : "女";
        }
      },
      {
        title: "状态",
        dataIndex: "state",
        render(state) {
          let config = {
            "1": '咸鱼一条',
            "2": "风华浪子",
            "3": "北大才子",
            "4": "百度FE",
            "5": "创业者"
          };
          return config[state];
        }
      },
      {
        title: "爱好",
        dataIndex: "interest",
        render(abc) {
          let config = {
            "1": <Badge status="success" text="成功"/>,
            "2": <Badge status="error" text="报错"/>,
            "3": <Badge status="default" text="踢足正常球"/>,
            "4": <Badge status="processing" text="进行中"/>,
            "5": <Badge status="warning" text="警告"/>,
          };
          return config[abc];
        }
      },
      {
        title: "生日",
        dataIndex: "birthday"
      },
      {
        title: "地址",
        dataIndex: "address"
      },
      {
        title: "操作",
        render: (text, item) => {
          return <Button size="small" onClick={(item) => {this.handleDelete(item)}}>删除</Button>
        }
      }
    ];
    return (
      <div>
        <Card title="基础表格">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
            scroll={{y: 240}}
          />
        </Card>
        <Card title="动态数据渲染表格-Mock" style={{ margin: "10px 0" }}>
          <Table
            bordered
            columns={columns2}
            dataSource={this.state.dataSource}
            pagination={false}
          />
        </Card>
        <Card title="排序" style={{ margin: "10px 0" }}>
          <Table
            bordered
            columns={columns3}
            dataSource={this.state.dataSource}
            pagination={false}
            scroll={{x: 2100}}
            onChange={this.handleChange}
          />
        </Card>
        <Card title="操作" style={{ margin: "10px 0" }}>
          <Table
            bordered
            columns={columns4}
            dataSource={this.state.dataSource}
            pagination={false}
          />
        </Card>
      </div>
    );
  }
}
