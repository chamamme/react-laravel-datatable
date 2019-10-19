import { FETCH_DATA,INIT } from "./types";
import React, { useContext } from 'react';
import axios from 'axios';
import useGlobalState from "..";
import GlobalStateContext from "../../context";
import Api from "../../utils/API";


export const fetchEntities = async (gState) => {
    let data = [];
     var [state,dispatch] = gState;
    try {
        let fetchUrl = `${state.props.url}?term=${state.search_term}&page=${state.current_page}&column=${state.sorted_column}&order=${state.order}&per_page=${state.per_page}`;
        const response = await Api.get(fetchUrl)
        console.log("ste check", response);
        if (response.data.data == undefined) {
            throw "Invalid response. Please make sure your response body contains a data key and is a laravel pagination object."
        }else{
            data = response.data.data
        }
        
    } catch (e) {
        console.error(e);
    }
    return dispatch( {type: FETCH_DATA, payload : data })
}


export const initialize = async (gState,props) => {
    console.log("setting props to state",gState);
    var [state,dispatch] = gState;
    state = {...state, props : props}
    const items = await  Api.get(props.url);
      state = items.data.data ? {...state, entities: items.data.data} : state
      dispatch({
            type: INIT,
            payload: state
        })
    //   return {type:init,}
}


export const columnHead = (value) => {
    return value.split('_').join(' ').toUpperCase()
}