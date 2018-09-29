import React, { Component } from 'react';
import {connect} from "react-redux"
import Content from './content.jsx'
import {CHANGE_KEY,OVERFLOW} from './constant';

// 内容面板容器组件

class ContentContainer extends Component{
  render(){
    return  (<Content {...this.props}/>);
  }
}

const stateToProps= state => state.toJS().module.layout

const dispatchToProps = dispatch => ({ dispatch, 
    // 每个键值改变
    onChange:(key,value) => dispatch({type:CHANGE_KEY,param:value,key:key}),
    onOverflow:value=>dispatch({type:OVERFLOW,param:value}),
});

export default connect(stateToProps, dispatchToProps)(ContentContainer);

