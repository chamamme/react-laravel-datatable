import React, { useContext } from "react";
import { columnHead } from '../store/actions'
import GlobalStateContext from "../context";
import { SET_ORDER_COLUMN } from "../store/actions/types";
var state, dispatch;

export default function TableBody(props) {
    [state, dispatch] = useContext(GlobalStateContext);

    const buildEntries = () => {
        console.log("state b4 body",state );
        if (state.entities.data.length > 0) { //Not empty
            var count = 0;
            return state.entities.data.map(entity => {
                count += 1;

                return <tr key={count} style={props.theme.rows}>
                    {props.columns.map((col) => { //Loop through each column object

                        if (col.onClick != undefined) { // has an onClick callback function
                            return (<td style={props.theme.cells} onClick={(e) => { return col.onClick(entity) }}>
                                {entity[col.id]}
                            </td>)
                        } else {
                            return <td  style={props.theme.cells}> {entity[col.id]}</td>

                        }
                    })}

                    {props.actions ? (<td>{props.actions(entity)}</td>) : null}

                </tr>

            })
        } else {
            return <tr key="not_found">
                <td colSpan={props.columns.length} className="text-center">No Records Found.</td>
            </tr>
        }
    }
    return (
        <React.Fragment>
            <tbody>
            { buildEntries() }
            </tbody>
        </React.Fragment>
    )
}
