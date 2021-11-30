import reducer from './reducer'
import { useReducer } from 'react'

const initialState = {

    search_term: '',
    per_page: 10,
    entities: {
        data: [],
        current_page: 1,
        from: 1,
        last_page: 1,
        per_page: 5,
        to: 1,
        total: 1,
    },
    first_page: 1,
    current_page: 1,
    sorted_column: '',
    offset: 4,
    order: 'asc',
    error:false,

};

const useGlobalState = () => {
    console.log("Hook about to be called")
    return useReducer(reducer, initialState)
};
console.log.apply(useGlobalState);


export default useGlobalState;
