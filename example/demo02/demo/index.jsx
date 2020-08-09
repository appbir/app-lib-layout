import React, { Component } from 'react';
import Layout from 'appbir-layout';
// import Layout from './layout.jsx';
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
            style: {
                width: '100vw',
                height: '100vh',
            },
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


    render() {
        let { config } = this.state;

        return (
            <div >
                < Layout config={config} >
                    <Content>
                        {/* demo配置组件 */}
                        <ConfigPanel onChange={this.onChange}
                            onOverflow={this.onOverflow}
                            overflow={this.state.overflow}
                            config={config} />
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
