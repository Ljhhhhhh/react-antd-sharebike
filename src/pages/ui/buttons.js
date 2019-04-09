import React, { Component } from "react";
import { Card, Button, Radio } from "antd";
import "./ui.less";

export default class Buttons extends Component {
  state = {
    loading: true,
    size: 'default'
  };

  handleCloseLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  handleButtonSize = (e) => {
    this.setState({
      size: e.target.value
    })
  }

  render() {
    return (
      <div>
        <Card title="基础按钮" className="card-wrap">
          <Button type="primary">ljhhhhhh</Button>
          <Button>ljhhhhhh</Button>
          <Button type="dashed">ljhhhhhh</Button>
          <Button type="danger">ljhhhhhh</Button>
          <Button disabled>ljhhhhhh</Button>
        </Card>
        <Card title="图标按钮" className="card-wrap">
          <Button icon="plus">ljhhhhhh</Button>
          <Button icon="edit">ljhhhhhh</Button>
          <Button icon="delete" type="danger" shape="circle" />
          <Button icon="search">ljhhhhhh</Button>
          <Button icon="download">ljhhhhhh</Button>
        </Card>
        <Card title="loading按钮" className="card-wrap">
          <Button icon="plus" loading={this.state.loading} type="primary">
            ljhhhhhh
          </Button>
          <Button loading={this.state.loading} shape="circle" />
          <Button onClick={this.handleCloseLoading}>
            {this.state.loading ? "关闭" : "开启"}
          </Button>
        </Card>
        <Card title="按钮组">
          <Button.Group>
            <Button type="primary" icon="left">
              返回
            </Button>
            <Button type="primary" icon="right">
              前进
            </Button>
          </Button.Group>
        </Card>
        <Card title="图标按钮" className="card-wrap">
          <Radio.Group value={this.state.size} onChange={this.handleButtonSize}>
            <Radio value="small">小</Radio>
            <Radio value="default">中</Radio>
            <Radio value="large">大</Radio>
          </Radio.Group>
          <Button size={this.state.size} type="primary">ljhhhhhh</Button>
          <Button size={this.state.size} type="dashed">ljhhhhhh</Button>
          <Button size={this.state.size} type="danger">ljhhhhhh</Button>
          <Button size={this.state.size} type="primary">ljhhhhhh</Button>
        </Card>
      </div>
    );
  }
}
