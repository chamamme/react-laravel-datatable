import React,{useContext} from 'react';
import { fetchEntities } from '../store/actions';
import { SET_SEARCH_TERM } from '../store/actions/types';
import GlobalStateContext from '../context';

export default function Search(props) {
    var [state,dispatch] = useContext(GlobalStateContext);

    const searcButtonOnClick = (e)=>{
        fetchEntities([state,dispatch])
    
    }
    const searchFormSubmit = (e)=>{
        e.preventDefault();
        fetchEntities([state,dispatch])
    }
    
    const searcFieldOnChange =  async (e)=>{
        const value = e.target.value;
        

        await dispatch({
            type:SET_SEARCH_TERM,
            payload : value
        });
        fetchEntities([state,dispatch]);
    }
    
    console.log("rendering search");
    return (
       

        <form onSubmit={searchFormSubmit}>
            <div style={props.theme.search}>
                <input type='text' placeholder="enter search term"  onChange={searcFieldOnChange} />
                <button type="button" onClick={searcButtonOnClick}> Go </button>
            </div> 
        </form>
    )
}
