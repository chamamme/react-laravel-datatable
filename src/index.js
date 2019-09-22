import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";


class DataTable extends Component {
    columnNames = [];
    constructor(props) {
        super(props);

        if (props.columns == undefined) {
            throw `columns prop for Datatable  is required and must be an array of objects. Example
            [
                { id: name , label: User Name}
            ]`
        }

        if (props.url == undefined) {
            throw "url prop for Datatable  is required"
        }

        this.columnNames = props.columns.map(column => column.id);
        this.state = {
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
            sorted_column: this.props.columns[0].id,
            offset: 4,
            order: 'asc',
        };
    }

    fetchEntities() {
        let fetchUrl = `${this.props.url}?page=${this.state.current_page}&column=${this.state.sorted_column}&order=${this.state.order}&per_page=${this.state.entities.per_page}`;
        axios.get(fetchUrl)
            .then(response => {
                if (response.data.data == undefined) {
                    throw "Invalid response. Please make sure your response body contains a data key and is a laravel pagination object."
                }
                this.setState({ entities: response.data.data });
                console.log("respsda", this.state);
            })
            .catch(e => {
                console.error(e);
            });
    }

    changePage(pageNumber) {
        this.setState({ current_page: pageNumber }, () => { this.fetchEntities() });
    }

    columnHead(value) {
        return value.split('_').join(' ').toUpperCase()
    }

    pagesNumbers() {
        if (!this.state.entities.to) {
            return [];
        }
        let from = this.state.entities.current_page - this.state.offset;
        if (from < 1) {
            from = 1;
        }
        let to = from + (this.state.offset * 2);
        if (to >= this.state.entities.last_page) {
            to = this.state.entities.last_page;
        }
        let pagesArray = [];
        for (let page = from; page <= to; page++) {
            pagesArray.push(page);
        }
        return pagesArray;
    }

    componentDidMount() {
        this.setState({ current_page: this.state.entities.current_page }, () => { this.fetchEntities() });
    }

    tableHeads() {
        let icon;
        if (this.state.order === 'asc') {
            icon = <i className="fas fa-arrow-up"></i>;
        } else {
            icon = <i className="fas fa-arrow-down"></i>;
        }
        let _columns = this.props.columns.map(column => {
            return <th className="table-head" key={column.id} onClick={() => this.sortByColumn(column.id)}>
                {this.columnHead(column.label)}
                {column.id === this.state.sorted_column && icon}
            </th>
        });

        if (this.props.actions) {
            let _name = "actions";

            let _actionCol = <th className="table-head" key={_name} onClick={() => this.sortByColumn(_name)}>
                {this.columnHead(_name)} {_name === this.state.sorted_column && icon}
            </th>
            _columns.push(_actionCol);
        }

        return _columns;
    }

    getCellOnClickFunction(columnName) {

    }

    buildColumnRender(key, entity) {
        var found = this.props.columns.find((el) => el.id == key);
        return (found.render ? found.render.bind(this, entity) : '')
    }

    entityList() {
        if (this.state.entities.data.length > 0) { //Not empty
            var count = 0;
            return this.state.entities.data.map(entity => {
                count += 1;

                return <tr key={count}>
                    {this.props.columns.map((col) => { //Loop through each column object
                       
                        if (col.onClick != undefined) { // has an onClick callback function
                            return (<td onClick={(entity) => col.onClick(entity)}>
                                {entity[col.id]}
                            </td>)
                        } else {
                            return <td > {entity[col.id]}</td>

                        }
                    })}

                    {this.props.actions ? (<td>{this.props.actions(entity)}</td>) : null}

                </tr>

            })
        } else {
            return <tr>
                <td colSpan={this.props.columns.length} className="text-center">No Records Found.</td>
            </tr>
        }
    }

    sortByColumn(column) {
        if (column === this.state.sorted_column) {
            this.state.order === 'asc' ? this.setState({ order: 'desc', current_page: this.state.first_page }, () => { this.fetchEntities() }) : this.setState({ order: 'asc' }, () => { this.fetchEntities() });
        } else {
            this.setState({ sorted_column: column, order: 'asc', current_page: this.state.first_page }, () => { this.fetchEntities() });
        }
    }

    pageList() {
        return this.pagesNumbers().map(page => {
            return <li className={page === this.state.entities.current_page ? 'page-item active' : 'page-item'} key={page}>
                <button className="page-link" onClick={() => this.changePage(page)}>{page}</button>
            </li>
        })
    }

    render() {
        return (
            <div className="data-table">
                <table className="table table-bordered">
                    <thead>
                        <tr>{this.tableHeads()}</tr>
                    </thead>
                    <tbody>{this.entityList()}</tbody>
                </table>
                {(this.state.entities.data && this.state.entities.data.length > 0) &&
                    <nav>
                        <ul className="pagination">
                            <li className="page-item">
                                <button className="page-link"
                                    disabled={1 === this.state.entities.current_page}
                                    onClick={() => this.changePage(this.state.entities.current_page - 1)}
                                >
                                    Previous
                </button>
                            </li>
                            {this.pageList()}
                            <li className="page-item">
                                <button className="page-link"
                                    disabled={this.state.entities.last_page === this.state.entities.current_page}
                                    onClick={() => this.changePage(this.state.entities.current_page + 1)}
                                >
                                    Next
                </button>
                            </li>
                            <span style={{ marginTop: '8px' }}> &nbsp; <i> Showing {this.state.entities.data.length} of {this.state.entities.total} records.</i></span>
                        </ul>
                    </nav>
                }
            </div>
        );
    }
}

DataTable.propTypes = {
    url: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    actions: PropTypes.func
}
export default DataTable

