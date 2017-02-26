import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router'

import DepartmentComponent from './DepartmentComponent'
 
class DepartmentContainer extends React.Component {
  render() {

    var departments = this.props.departments.map((department) => {
      return <DepartmentComponent department={department} />
    });

    return(
      <div id='container'>
        <Table responsive hover>
          <tbody>
            {departments}
          </tbody>
        </Table>
      </div>
    );
  }
}


DepartmentContainer.displayName = 'DepartmentContainer';

export default DepartmentContainer