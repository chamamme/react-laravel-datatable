import React, { Component } from 'react';
import axios from 'axios';
import  PropTypes from "prop-types";


class DataTable extends Component {
    columnNames = [];
    constructor(props) {
        super(props);

        this.columnNames = props.columns.map(column => column.name);
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
            sorted_column: this.props.columns[0].name,
            offset: 4,
            order: 'asc',
        };
    }

    fetchEntities() {
        let fetchUrl = `${this.props.url}?page=${this.state.current_page}&column=${this.state.sorted_column}&order=${this.state.order}&per_page=${this.state.entities.per_page}`;
        axios.get(fetchUrl)
            .then(response => {
                console.log(response.data.data);
                this.setState({ entities: response.data.data });
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
            return <th className="table-head" key={column.name} onClick={() => this.sortByColumn(column.name)}>
                {this.columnHead(column.title)}
                {column.name === this.state.sorted_column && icon}
            </th>
        });

        if (this.props.actionRender) {
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
        var found = this.props.columns.find((el) => el.name == key);
        return (found.render ? found.render.bind(this, entity) : '')
    }

    entityList() {
        if (this.state.entities.data.length) {
            return this.state.entities.data.map(entity => {

                return <tr key={entity.id}>
                    {Object.keys(entity).map((key) => {
                        var colIndex = this.columnNames.indexOf(key)
                        var hasCallback = false;
                        var _columnObj = this.props.columns[colIndex];// i used the same colIndex here because column names have the arrangement as props.columns
                        if (_columnObj) {
                            hasCallback = _columnObj.onClick ? true : false;
                        }

                        if (colIndex != '-1') {

                            if (hasCallback == true) {
                                return (
                                    <td key={key} onClick={(entity) => _columnObj.onClick(entity)}>
                                        {entity[key]}
                                    </td>)
                            } else {
                                return (<td key={key}> {entity[key]} </td>)

                            }

                        }
                    }
                    )}

                    {this.props.actionRender ? (<td>{this.props.actionRender(entity)}</td>) : null}
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
                            <span style={{ marginTop: '8px' }}> &nbsp; <i>Displaying {this.state.entities.data.length} of {this.state.entities.total} entries.</i></span>
                        </ul>
                    </nav>
                }
            </div>
        );
    }
}

DataTable.prototype({
    url : PropTypes.string.isRequired,
    columns : PropTypes.object.isRequired,
    actionRender: PropTypes.func
})
export default  DataTable

