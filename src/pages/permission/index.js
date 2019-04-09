import React, { Component } from "react";
import { Card, Button, Form, Select, Input, Modal, Tree, Transfer } from "antd";
import ETable from "../../components/ETable";
import Utils from "../../utils/utils";
import axios from "../../axios";
import menuConfig from "../../config/menuConfig";

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
export default class PermissionUser extends Component {
  state = {
    list: [],
    selectedRowKeys: ""
  };
  componentDidMount() {
    this.requestList();
  }
  requestList = () => {
    axios.requestList(this, "/role/list", {});
  };

  handleRole = () => {
    this.setState({
      isRoleVisable: true
    });
  };
  handleRoleSubmit = () => {
    let data = this.roleForm.props.form.getFieldsValue();
    axios
      .ajax({
        url: "/role/create",
        data: {
          params: data
        }
      })
      .then(res => {
        if (res.code === 0) {
          this.setState({
            isRoleVisable: false
          });
          this.roleForm.props.form.resetFields();
          this.requestList();
        }
      });
  };

  handlePermission = () => {
    let item = this.state.selectedItem;
    console.log(item, "item");
    if (!item) {
      Modal.info({
        title: "请先选择一个角色"
      });
      return;
    }
    this.setState({
      isPermVisible: true,
      detailInfo: item,
      menuInfo: item.menus
    });
  };
  handlePermEditSubmit = () => {
    let data = this.permForm.props.form.getFieldsValue();
    data.role_id = this.state.selectedItem.id;
    data.menus = this.state.menuInfo;
    axios
      .ajax({
        url: "/permission/edit",
        data: {
          params: {
            ...data
          }
        }
      })
      .then(res => {
        if (res) {
          this.setState({
            isPermVisible: false
          });
          this.requestList();
        }
      });
  };
  handleUserAuth = () => {
    let item = this.state.selectedItem;
    console.log(item, "item");
    if (!item) {
      Modal.info({
        title: "请先选择一个角色"
      });
      return;
    }
    this.setState({
      isUserVisable: true,
      detailInfo: item
    });
    this.getRoleUserList(item.id);
  };

  getRoleUserList = id => {
    axios
      .ajax({
        url: "/role/user_list",
        data: {
          params: {
            id
          }
        }
      })
      .then(res => {
        this.getAuthUserList(res.result);
      });
  };
  getAuthUserList = data => {
    console.log(data, "data");
    const mockData = [];
    const targetKeys = [];
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const d = {
          key: data[i].user_id,
          title: data[i].user_name,
          status: data[i].status,
      };
      if (d.status == 1) {
          targetKeys.push(d.key);
      }
      mockData.push(d);
      }
      this.setState({
        mockData,
        targetKeys
      });
    }
  };
  handleUserSubmit = () => {
    let data = {}
    data.user_ids = this.state.targetKeys;
    data.role_id = this.state.selectedItem.id;
    axios.ajax({
      url: '/role/user_role_edit',
      data: {
        params: {
          ...data
        }
      }
    }).then(res => {
      if (res) {
        this.setState({
          isUserVisable: false
        })
        this.requestList()
      } 
    })
  }
  render() {
    const columns = [
      {
        title: "角色ID",
        dataIndex: "id"
      },
      {
        title: "角色名称",
        dataIndex: "role_name"
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        render: Utils.formateDate
      },
      {
        title: "使用状态",
        dataIndex: "status",
        render(status) {
          return status === 1 ? "停用" : "启用";
        }
      },
      {
        title: "授权时间",
        dataIndex: "authorize_time",
        render: Utils.formateDate
      },
      {
        title: "授权人",
        dataIndex: "authorize_user_name"
      }
    ];
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.handleRole}>
            创建角色
          </Button>
          <Button type="primary" onClick={this.handlePermission}>
            设置权限
          </Button>
          <Button type="primary" onClick={this.handleUserAuth}>
            用户授权
          </Button>
        </Card>
        <div className="content-wrap">
          <ETable
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
            dataSource={this.state.list}
            columns={columns}
          />
        </div>
        <Modal
          title="角色创建"
          visible={this.state.isRoleVisable}
          onOk={this.handleRoleSubmit}
          onCancel={() => {
            this.roleForm.props.form.resetFields();
            this.setState({
              isRoleVisable: false
            });
          }}>
          <RoleForm wrappedComponentRef={inst => (this.roleForm = inst)} />
        </Modal>
        <Modal
          title="设置权限"
          visible={this.state.isPermVisible}
          width={600}
          onOk={this.handlePermSubmit}
          onCancel={() => {
            this.setState({
              isPermVisible: false
            });
          }}>
          <PermEditForm
            wrappedComponentRef={inst => (this.permForm = inst)}
            menuInfo={this.state.menuInfo}
            detailInfo={this.state.detailInfo}
            patchMenuInfo={checkedKeys => {
              this.setState({
                menuInfo: checkedKeys
              });
            }}
          />
        </Modal>
        <Modal
          title="用户授权"
          visible={this.state.isUserVisable}
          width={800}
          onOk={this.handleUserSubmit}
          onCancel={() => {
            this.setState({
              isUserVisable: false
            });
          }}>
          <RoleAuthForm
            wrappedComponentRef={inst => (this.userAuthForm = inst)}
            targetKeys={this.state.targetKeys}
            mockData={this.state.mockData}
            detailInfo={this.state.detailInfo}
            patchUserInfo={(targetKeys) => {
              this.setState({
                targetKeys
              })
            }}
          />
        </Modal>
      </div>
    );
  }
}

class RoleForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          {getFieldDecorator("role_name", {
            initialValue: ""
          })(<Input type="text" placeholder="请输入角色名称" />)}
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {getFieldDecorator("state", {
            initialValue: 1
          })(
            <Select>
              <Option value={1}>开启</Option>
              <Option value={0}>关闭</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    );
  }
}
RoleForm = Form.create({})(RoleForm);

class PermEditForm extends Component {
  renderTreeNode = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key}>
            {this.renderTreeNode(item.children)}
          </TreeNode>
        );
      } else {
        return <TreeNode {...item} />;
      }
    });
  };
  onCheck = checkedKeys => {
    this.props.patchMenuInfo(checkedKeys);
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    };
    const detailInfo = this.props.detailInfo;
    const menuInfo = this.props.menuInfo;
    return (
      <Form layout="horizontal" {...formItemLayout}>
        <FormItem label="角色布局">
          <Input disabled placeholder={detailInfo.role_name} />
        </FormItem>
        <FormItem label="状态">
          {getFieldDecorator("status")(
            <Select>
              <Option value="1">启用</Option>
              <Option value="2">停用</Option>
            </Select>
          )}
        </FormItem>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={menuInfo}
          onCheck={checkedKeys => {
            this.onCheck(checkedKeys);
          }}>
          <TreeNode title="平台权限" key="platform_all">
            {this.renderTreeNode(menuConfig)}
          </TreeNode>
        </Tree>
      </Form>
    );
  }
}
PermEditForm = Form.create({})(PermEditForm);

class RoleAuthForm extends React.Component {
  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1;
  };
  handleChange = targetKeys => {
    this.props.patchUserInfo(targetKeys);
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 }
    };
    const detail_info = this.props.detailInfo;
    console.log(detail_info);
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称：" {...formItemLayout}>
          <Input disabled maxLength={8} placeholder={detail_info.role_name} />
        </FormItem>
        <FormItem label="选择用户：" {...formItemLayout}>
          <Transfer
            listStyle={{ width: 200, height: 400 }}
            dataSource={this.props.mockData}
            showSearch
            titles={["待选用户", "已选用户"]}
            // locale="输入用户名"
            filterOption={this.filterOption}
            targetKeys={this.props.targetKeys}
            onChange={this.handleChange}
            render={item => item.title}
          />
        </FormItem>
      </Form>
    );
  }
}
RoleAuthForm = Form.create({})(RoleAuthForm);
