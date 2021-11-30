import React, { useEffect,useState } from 'react';
import useGlobalState from "./store";
import { fetchEntities, initialize } from './store/actions';
import {SET_PROPS_TO_STATE,INIT } from './store/actions/types';
import GlobalStateContext from './context';
import Search from "./components/Search";
import TableHead from "./components/TableHead";
import TableBody from './components/TableBody';
import Pagination from './components/Pagination';
import theme from "./utils/theme";
import './style.css';
import RowLimit from './components/RowLimit';

const  index = (props) => {
    const  [state,dispatch] = useGlobalState();
    
    props = {...props ,theme : props.theme ?  props.theme : theme()} //override default theme specified
     useEffect(() => {
        
             initialize([state,dispatch],props)
         
    }, [])

    return (
        !state.error ?
        <GlobalStateContext.Provider value={[state,dispatch]}>
            <React.Fragment >
                <h2 style={props.theme.title}>{props.title  ? props.title : "" }</h2>
            <Search  {...props}/>
            <RowLimit    {...props}/>
            <table style={props.theme.table}>
                <TableHead   {...props}/> 
                <TableBody   {...props}/>
            </table>
            <Pagination    {...props}/>
            </React.Fragment>
        </GlobalStateContext.Provider>
        :
        <div style={{backgroundColor: "#FF9999",color: "#131720",padding: "10px 15px"}}>{state.error}</div>
    )
}

export default index;

index.defaultProps = {
    url: "",
    columns:[],
    headers:{"Content-Type":"application/json"}
  }