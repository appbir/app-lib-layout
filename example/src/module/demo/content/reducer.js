import {CHANGE_KEY,OVERFLOW} from './constant';
import {POSITION} from 'appbir-layout';

const initState = {
    width:'100vw',
    height:'100vh',
    overflow:false,
    config:{
        header:{visiabled:true,width:'',height:'50px',fixed: false,zIndex:10},
        left:{visiabled:true,width:'134px',height:'',fixed: false,zIndex:10},
        right:{visiabled:true,width:'87px',height:'',fixed: false,zIndex:10},
        content_header:{visiabled:true,width:'',height:'36px',fixed: false,zIndex:10},
        content:{visiabled:true,width:'',height:'',fixed: false,zIndex:10},
        bottom:{visiabled:true,width:'',height:'50px',fixed: false,zIndex:10}
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
