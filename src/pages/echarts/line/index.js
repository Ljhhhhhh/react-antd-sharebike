import React, { Component } from "react";
import { Card } from "antd";
import ReactEcharts from "echarts-for-react";
import echartTheme from "../themeLight";
// import echarts from 'echarts'
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";

export default class Line extends Component {
  componentDidMount() {
    echarts.registerTheme("Imooc", echartTheme);
  }
  getOption = () => {
    let option = {
      title: {
        text: "用户骑行订单"
      },
      tooltip: {
        trigger: "axis"
      },
      xAxis: {
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "订单量",
          type: "line",
          data: [1000, 2000, 1500, 3000, 2000, 1200, 800]
        }
      ]
    };
    return option;
  };
  getOption2 = () => {
    let option = {
      title: {
        text: "用户骑行订单"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ['ofo订单量', '膜拜订单量']
      },
      xAxis: {
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        type: 'category',
        boundaryCap: false
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "ofo订单量",
          type: "line",
          data: [2000, 1000, 2500, 3000, 4000, 4200, 800],
          areaStyle: {}
        },
        {
          name: "膜拜订单量",
          type: "line",
          data: [1000, 2000, 1500, 3000, 2000, 1200, 800],
          areaStyle: {}
        }
      ]
    };
    return option;
  };
  render() {
    return (
      <div>
        <Card>
          <ReactEcharts option={this.getOption()} theme="Imooc" />
        </Card>
        <Card>
          <ReactEcharts option={this.getOption2()} theme="Imooc" />
        </Card>
      </div>
    );
  }
}
