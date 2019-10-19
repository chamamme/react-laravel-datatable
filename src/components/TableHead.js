
import React,{useContext} from "react";
import {columnHead, fetchEntities} from '../store/actions'
import GlobalStateContext from "../context";
import { SET_ORDER_COLUMN } from "../store/actions/types";
var state,dispatch;

const   sortByColumn  = (column) => {
    if (column === state.sorted_column) {
       state =  state.order === 'asc' ? { ...state , order: 'desc', current_page: state.first_page } : {...state, order: 'asc' };
   } else {
       state = {...state, sorted_column: column, order: 'asc', current_page: state.first_page };
   }
   fetchEntities([state,dispatch])
}

 const TableHeads = (props)=> {
     [state,dispatch] = useContext(GlobalStateContext);
    console.log("@head",state);
    let icon;
    if (state.order === 'asc') {
        icon = <i className="fas fa-arrow-up"></i>;
    } else {
        icon = <i className="fas fa-arrow-down"></i>;
    }
    let _columns = props.columns.map(column => {
        return <th className="table-head" key={column.id} onClick={() => sortByColumn(column.id)}>
            {columnHead(column.label)}
            {column.id === state.sorted_column && icon}
        </th>
    });

    if (props.actions) {
        let _name = "actions";

        let _actionCol = <th className="table-head" key={_name} onClick={() => sortByColumn(_name)}>
            {columnHead(_name)} {_name === state.sorted_column && icon}
        </th>
        _columns.push(_actionCol);
    }
    return <thead style={props.theme.header}>
            <tr>{_columns}</tr>
        </thead>

    
}


export default TableHeads;