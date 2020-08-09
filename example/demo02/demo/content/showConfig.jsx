
import React from 'react';
import './showConfig.less'
const Overflow = (config) => {
    return (<div className="center-cls">
            <pre className="config-show">{JSON.stringify(config, null, 2)}</pre>
            {/* <div  className="config-show" contentEditable={true} dangerouslySetInnerHTML={{__html: JSON.stringify(config, null, 2)}}></div> */}
        </div>)
}

export default Overflow;