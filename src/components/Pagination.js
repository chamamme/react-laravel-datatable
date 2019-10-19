import React, { useContext } from 'react'
import { fetchEntities } from '../store/actions';
import GlobalStateContext from '../context';

export default function Pagination(props) {
    var [state, dispatch] = useContext(GlobalStateContext);

    const changePage = (pageNumber) => {
        state = { ...state, current_page: pageNumber },
            fetchEntities([state, dispatch]);
    }

    const paginations = () => {
        return pagesNumbers().map(page => {
            return <li className={page === state.entities.current_page ? 'page-item active' : 'page-item'} key={page}>
                <button className="page-link" onClick={() => changePage(page)}>{page}</button>
            </li>
        })
    }

    const pagesNumbers = () => {
        if (!state.entities.to) {
            return [];
        }
        let from = state.entities.current_page - state.offset;
        if (from < 1) {
            from = 1;
        }
        let to = from + (state.offset * 2);
        if (to >= state.entities.last_page) {
            to = state.entities.last_page;
        }
        let pagesArray = [];
        for (let page = from; page <= to; page++) {
            pagesArray.push(page);
        }
        return pagesArray;
    }

    return (
        <div>
            {(state.entities.data && state.entities.data.length > 0) &&
                <nav>
                    <ul className="pagination" style={props.theme.pagination}>
                        <li key="pagination_previous" className="page-item">
                            <button className="page-link"
                                disabled={1 === state.entities.current_page}
                                onClick={() => changePage(state.entities.current_page - 1)}
                            >
                                &#60;&#60;
                                </button>
                        </li>
                        {paginations()}
                        <li className="pagination_next" className="page-item">
                            <button className="page-link"
                                disabled={state.entities.last_page === state.entities.current_page}
                                onClick={() => changePage(state.entities.current_page + 1)}
                            >
                                &#62;&#62;
                            </button>
                        </li>
                        <span> &nbsp; <i>  {state.entities.data.length} / {state.entities.total} records.</i></span>
                    </ul>
                </nav>
            }
        </div>
    )
}
