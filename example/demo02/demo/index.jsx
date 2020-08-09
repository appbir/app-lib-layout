import React, { Component } from 'react';
// import Layout from 'appbir-layout';
import Layout, {POSITION} from './layout.jsx';
import ConfigPanel from './content/content.jsx';
import Header from './part/header.jsx';
import Left from './part/left.jsx';
import Right from './part/right.jsx';
import Bottom from './part/bottom.jsx';
import ContentHeader from './part/content_header.jsx';
import 'antd/dist/antd.css';
import './index.less';



const Content = ({ children }) => {
    return children;
}

const clone = obj => JSON.parse(JSON.stringify(obj));

const set = (obj, keys, value) => {
    // let keys = key.split('.');
    let tempObj = obj[keys[0]];
    tempObj[keys[1]] = value;
}


class LayoutBoilerplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // model: true, // DIY 模型支持自定义宽度和高度 FULL 表示全浏览器满屏  默认FULL
            model:'FULL',
            style: null, // DIY模式下自定义内容
            showConfig:false, // 显示配置文本格式
            overflow: false,
            config: {
                header: { visiabled: true, width: '', height: '50px', fixed: false, zIndex: 10 },
                left: { visiabled: true, width: '134px', height: '', fixed: false, zIndex: 10 },
                right: { visiabled: true, width: '87px', height: '', fixed: false, zIndex: 10 },
                content_header: { visiabled: true, width: '', height: '36px', fixed: false, zIndex: 10 },
                content: { visiabled: true, width: '', height: '', fixed: false, zIndex: 10 },
                bottom: { visiabled: true, width: '', height: '50px', fixed: false, zIndex: 10 }
            }
        }
    }


    onChange = (key, value) => {
        let { config } = this.state;
        let newConfig = clone(config);
        set(newConfig, key, value);
        this.setState({ config: newConfig });
    }

    onOverflow = (overflow) => {
        this.setState({ overflow });
    }

    setStyle = (key, value) => {
        let { style } = this.state;
        let newStyle = clone(style);
        set(newStyle, key, value);
        this.setState({ style: newStyle });
    }

    onModelChange=(isCheck)=>{
        console.log(isCheck);
        let style= isCheck ? null  : {
            minHeight:"0px",
            width:'1600px',
            height:'900px'
        };
        this.setState({model:isCheck? 'FULL' : 'DIY',style})
        // this.setState({model:isCheck ? 'FULL':"DIY"})
    }
  

    render() {
        let { config,showConfig,style,model} = this.state;
    // <div className="inner2">
        return (
        
             <div className="inner"> 
             {/* 避免flex布局污染 */}
                < Layout config={config} style={style} model = {model} >
                    <Content>
                        <ConfigPanel onChange={this.onChange}
                            onOverflow={this.onOverflow}
                            overflow={this.state.overflow}
                            config={config}
                            onShowconfig={showConfig=>this.setState({showConfig})}
                            showConfig={showConfig}
                            model={model==='FULL'}
                            onModel = {this.onModelChange}
                             />
                    </Content>
                    <Header />
                     <Left />
                    <Right />
                    <Bottom />
                    <ContentHeader />
                </Layout >
            </div>
        )
    }
}

export default LayoutBoilerplate;
