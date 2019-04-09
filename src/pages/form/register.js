import React, { Component } from "react";
import moment from "moment";
import "moment/locale/zh-cn";
import {
  Card,
  Form,
  Button,
  Input,
  Radio,
  Select,
  Switch,
  DatePicker,
  Upload,
  Icon,
  message,
  InputNumber,
  Checkbox
} from "antd";
moment.locale("zh-cn");
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

class FormRegister extends Component {
  state = {
    avatar: '',
    loading: false
  }
  handleSubmit = ()=>{
    let userInfo = this.props.form.getFieldsValue();
    console.log(JSON.stringify(userInfo))
    message.success(`${userInfo.userName} 恭喜你，您通过本次表单组件学习，当前密码为：${userInfo.userPwd}`)
  }
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          avatar: imageUrl,
          loading: false
        })
      );
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        xs: 24,
        sm: 20
      }
    };
    const offsetLayout = {
      wrapperCol:{
          xs:24,
          sm:{
              span:12,
              offset:4
          }
      }
    }
    return (
      <div>
        <Card title="注册表单">
          <Form layout="horizontal" {...formItemLayout}>
            <FormItem label="用户名">
              {getFieldDecorator("username", {
                initialValue: "",
                rules: [
                  {
                    required: true,
                    message: "用户名不能为空"
                  },
                  {
                    min: 5,
                    max: 10,
                    message: "长度不在范围内"
                  },
                  {
                    pattern: /^\w/g,
                    message: "必须是字母或者数字"
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="user" />}
                  placeholder="请输入用户名"
                />
              )}
            </FormItem>
            <FormItem label="密码">
              {getFieldDecorator("userpwd", {
                initialValue: ""
              })(<Input placeholder="请输入密码" />)}
            </FormItem>
            <FormItem label="性别" {...formItemLayout}>
              {getFieldDecorator("sex", {
                initialValue: "1"
              })(
                <RadioGroup>
                  <Radio value="1">男</Radio>
                  <Radio value="2">女</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="年龄">
              {getFieldDecorator("age", {
                initialValue: 18
              })(<InputNumber />)}
            </FormItem>
            <FormItem label="当前状态">
              {getFieldDecorator("state", {
                initialValue: ""
              })(
                <Select>
                  <Option value="1">咸鱼一条</Option>
                  <Option value="2">帅哥一枚</Option>
                  <Option value="3">创业者</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="爱好">
              {getFieldDecorator("habit", {
                initialValue: []
              })(
                <Select mode="multiple">
                  <Option value="1">游泳</Option>
                  <Option value="2">跑步</Option>
                  <Option value="3">打球</Option>
                  <Option value="4">健身</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="是否已婚" {...formItemLayout}>
              {getFieldDecorator("isMarried", {
                valuePropName: "checked",
                initialValue: true
              })(<Switch />)}
            </FormItem>
            <FormItem label="生日" {...formItemLayout}>
              {getFieldDecorator("birthday", {
                initialValue: moment("1995-06-15")
              })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
            </FormItem>
            <FormItem label="联系地址" {...formItemLayout}>
              {getFieldDecorator("address", {
                initialValue: "浙江省宁波市"
              })(<TextArea autosize={{ minRows: 4, maxRows: 6 }} />)}
            </FormItem>
            <FormItem label="头像" {...formItemLayout}>
              {getFieldDecorator("avarar")(
                <Upload listType="picture-card" showUploadList={false} action='https://jsonplaceholder.typicode.com/posts/' onChange={this.handleChange}>
                {this.state.avatar ? <img src={this.state.avatar} alt=""/> : <Icon type="plus"></Icon>}
                </Upload>
              )}
            </FormItem>
            <FormItem {...offsetLayout}>
              {
                getFieldDecorator('userImg')(
                  <Checkbox>我已阅读过<a href="/">慕课协议</a></Checkbox>
                )
              }
            </FormItem>
            <FormItem {...offsetLayout}>
              <Button type="primary" onClick={this.handleSubmit}>注册</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(FormRegister);
