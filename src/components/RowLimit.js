import React from 'react';
import GlobalStateContext from '../context';
import { fetchEntities } from '../store/actions';
import { SET_PER_PAGE } from '../store/actions/types';

export default function RowLimit(props) {
    var [state,dispatch] = React.useContext(GlobalStateContext)
    const defaultLimits = [5,10,20,40,50,100]
    const activelimit = state.per_page;
    var limits = props.perPage == undefined ? defaultLimits :props.perPage; 
    console.log("lims",limits);
    const onLimitChange = async (e) =>{
        const newVal  = e.target.value;
        await dispatch({
            type:SET_PER_PAGE,
            payload : newVal
        });
    
        fetchEntities([{...state,per_page:activelimit},dispatch]);
    }
    
    return (
        <div>
            <select value={activelimit} onChange={onLimitChange} >
                {limits.map((lim)=>{
                   return  <option key={"lim_"+lim} > {lim} </option>
                })}
                
            </select>
        </div>
    )
}
