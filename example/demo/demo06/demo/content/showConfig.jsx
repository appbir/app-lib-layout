
import React from 'react';
import './showConfig.less'
const Overflow = ({config}) => {
    // 值展示存在配置的json数据
    let _config = {};
    for(let key in config){
        if(config[key].visible){
            _config[key] = config[key];
        }
    }


    return (<div className="center-cls">
            <pre className="config-show">{JSON.stringify(_config, null, 2)}</pre>
            {/* <div  className="config-show" contentEditable={true} dangerouslySetInnerHTML={{__html: JSON.stringify(config, null, 2)}}></div> */}
        </div>)
}

export default Overflow;