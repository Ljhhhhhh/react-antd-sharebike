import React, { Component } from "react";
import { Card, Form, Input, Button, message, Icon, Checkbox } from "antd";
const FormItem = Form.Item;

class FormLogin extends Component {
  handleSubmit = () => {
    let userinfo = this.props.form.getFieldsValue();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success(`${userinfo.username},恭喜您通过学习`)
      }
    })
    console.log(userinfo)
  }

  render() {
    const { getFieldDecorator }  = this.props.form
    return (
      <div>
        <Card title="登录行内表单">
          <Form layout="inline">
            <FormItem>
              <Input placeholder="请输入用户名" />
            </FormItem>
            <FormItem>
              <Input placeholder="请输入密码" />
            </FormItem>
            <FormItem>
              <Button type="primary">登录</Button>
            </FormItem>
          </Form>
        </Card>
        <Card title="登录水平表单" style={{marginTop: 10}}>
          <Form style={{width: 300}}>
            <FormItem>
              {
                getFieldDecorator('username', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '用户名不能为空'
                    },
                    {
                      min:5, max: 10,
                      message: '长度不在范围内'
                    },
                    {
                      pattern: /^\w/g,
                      message: '必须是字母或者数字'
                    }
                  ]
                })(<Input prefix={<Icon type="user"/>} placeholder="请输入用户名" />)
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('password', {
                  initialValue: '123456',
                  rules: [
                    {
                      required: true,
                      message: '密码不能为空'
                    }
                  ]
                })(<Input prefix={<Icon type="lock"/>} placeholder="请输入密码" />)
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>记住密码</Checkbox>
                )
              }
              <a href="/admin" style={{float: 'right'}}>忘记密码</a>
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={this.handleSubmit}>登录</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(FormLogin)