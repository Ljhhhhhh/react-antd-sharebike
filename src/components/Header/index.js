import React, { Component } from "react";
import { Row, Col } from "antd";
import Util from "../../utils/utils";
import axios from "../../axios";
import { connect } from 'react-redux'
import "./index.less";

class Header extends Component {
  state = {};

  componentWillMount() {
    this.setState({
      userName: "Ljh"
    });
    setInterval(() => {
      let sysTime = Util.formateDate(new Date().getTime());
      this.setState({
        sysTime
      });
    }, 1000);
    this.getWeatherData();
  }

  getWeatherData = () => {
    let city = "北京";
    axios.jsonp({
        url:
          "http://api.map.baidu.com/telematics/v3/weather?location=" +
          encodeURIComponent(city) +
          "&output=json&ak=3p49MVra6urFRGOT9s8UBWr2"
      }).then(res => {
        const {
          results: [weather]
        } = res;
        const weatherData = weather.weather_data[0];
        this.setState({
          weather: weatherData.weather,
          dayPictureUrl: weatherData.dayPictureUrl
        });
      });
  };

  render() {
    const menuType = this.props.menuType;
    return (
      <div className="header">
        <Row className="header-top">
        {
          menuType ? 
            <Col span={6} className="logo">
              <img src="/assets/logo-ant.svg" alt=""/>
              <span>通用管理系统</span>
            </Col> : ''
        }
          <Col span={menuType ? 18 : 24}>
            <span>欢迎，{this.state.userName}</span>
            <a href="/">退出</a>
          </Col>
        </Row>
        {menuType ? (
          ""
        ) : (
          <Row className="breadcrumb">
            <Col span={4} className="breadcrumb-title">
              {this.props.menuName}
            </Col>
            <Col span={20} className="weather">
              <span className="date">{this.state.sysTime}</span>
              <span className="weather-img">
                <img src={this.state.dayPictureUrl} alt="" />
              </span>
              <span className="weather-detail">{this.state.weather}</span>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    menuName: state.menuName
  }
};
export default connect(mapStateToProps)(Header)