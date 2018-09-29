import {CHANGE_KEY,OVERFLOW} from './constant';
import {POSITION} from '../../layout/layout.jsx';
// const POSITION = {
//     FULL:'FULL',
//     AUTO:'AUTO',
// }

const initState = {
    width:'100vw',
    height:'100vh',
    overflow:false,
    config:{
        header:{visiabled:false,width:'',height:'50px',fixed: false,zIndex:10},
        left:{visiabled:false,width:'134px',height:'',fixed: false,zIndex:10},
        right:{visiabled:false,width:'87px',height:'',fixed: false,zIndex:10},
        content_header:{visiabled:false,width:'',height:'36px',fixed: false,zIndex:10},
        content:{visiabled:true,width:'',height:'',fixed: false,zIndex:10},
        bottom:{visiabled:false,width:'',height:'50px',fixed: false,zIndex:10}
    }
};

export default (state = initState, action) => {
    switch (action.type) {
      case CHANGE_KEY:
        return state.setIn(['config'].concat(action.key),action.param);
      case OVERFLOW:
        return state.setIn(['overflow'],action.param);
      default:
        return state
    }
}
