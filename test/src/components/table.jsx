import React, { Component } from 'react';

class Table extends Component {
    state = {  } 
    
    render() { 
        return (
            <table>
                <thead>
                    <tr>
                        {this.props.column.map((item, index) => <TableHeadItem item={item}/>)}
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.map((item, index) => <TableRow item={item} column={this.props.column}/>)}
                </tbody>
            </table>
        );
    }
}
 
const TableHeadItem = ({ item }) => <th>{item.heading}</th>
const TableRow = ({ item, column }) => {return(
    <tr>
        {column.map((columnItem, index) => {
            return <td>{item[columnItem.value]}</td>
        })}
    </tr> 
    );
}

export default Table; 