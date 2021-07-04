import React, { Component } from "react";

import Demo from "./index.jsx";

// 主要用于外部进行属性传递验证
class IndexContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cfg:{1:123}
    }
  }

  onApplyClick = (cfg) => {
    this.setState({cfg});
  };
  render() {
    return <Demo onApplyClick={this.onApplyClick} cfg={this.state.cfg}></Demo>;
  }
}

export default IndexContainer;
