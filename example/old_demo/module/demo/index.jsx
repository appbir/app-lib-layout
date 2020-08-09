import React, { Component } from 'react';
import {connect} from "react-redux"
// import Layout from 'appbir-layout';
import Layout from './layout.jsx';
import Content from './content/index.jsx';
import Header from './part/header.jsx';
import Left from './part/left.jsx';
import Right from './part/right.jsx';
import Bottom from './part/bottom.jsx';
import ContentHeader from './part/content_header.jsx';
import 'antd/dist/antd.css';
import './index.less';

class LayoutBoilerplate extends React.Component {
    render() {
      return (<Layout {...this.props}>
                <Content/>
                <Header/>
                <Left/>
                <Right  />
                <Bottom/>
                <ContentHeader/>
             </Layout>
        )
    }
}

const stateToProps= state => state.toJS().module.layout
export default connect(stateToProps)(LayoutBoilerplate);
