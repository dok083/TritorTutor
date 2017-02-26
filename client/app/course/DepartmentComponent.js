import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router'

class DepartmentComponent extends React.Component {
  render() {
    var department = this.props.department;

    return(
        <tr>
          <td>{department.name}</td>
        </tr>
    );
  }
}


DepartmentComponent.displayName = 'DepartmentComponent';

export default DepartmentComponent