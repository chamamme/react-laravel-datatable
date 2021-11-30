import { FETCH_DATA,INIT, SET_ERROR } from "./types";
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
        const response = await Api.setHeaders(state.props.headers).get(fetchUrl)
        console.log("ste check", response);
        if (response.data.data == undefined) {
            throw "Invalid response. Please make sure your response body contains a data key and is a laravel pagination object."
        }else{
            data = response.data.data
        }
        
    } catch (e) {
        console.error(e);
        dispatch({
            type: SET_ERROR,
            payload: e
        })
    }
    return dispatch( {type: FETCH_DATA, payload : data })
}


export const initialize = async (gState,props) => {
    try {
        
        console.log("setting props to state",gState);
        var [state,dispatch] = gState;
        state = {...state, props : props}
        const items = await  Api.setHeaders(props.headers).get(props.url);
          state = items.data.data ? {...state, entities: items.data.data} : state
          dispatch({
                type: INIT,
                payload: state
            })
    } catch (error) {
        dispatch({
            type: SET_ERROR,
            payload: error.message
        })
    }
    //   return {type:init,}
}


export const columnHead = (value) => {
    return value.split('_').join(' ').toUpperCase()
}