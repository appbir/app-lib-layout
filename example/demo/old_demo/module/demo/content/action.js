
import {CHANGE_KEY} from './constant';

export const onChange = (value)=>{
    console.log('outer onChange',value);
    return dispatch =>{
        console.log('inner switch change',value);
        return dispatch({type:CHANGE_KEY,param:value});
    }
}