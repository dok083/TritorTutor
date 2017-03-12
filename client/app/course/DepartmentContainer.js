import React from 'react'
import { Table, Nav, NavItem } from 'react-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap'

import DepartmentComponent from './DepartmentComponent'
import subjectList from '!json!./subjectList.json'

class DepartmentContainer extends React.Component {
  onSelect(courseID) {

  }

  render() {
    var departments = subjectList.map((department, index) => {
      return (
        <IndexLinkContainer to={'/courses/' + department.id}>
          <NavItem eventKey={index} key={index}>
            {department.name}
          </NavItem>
        </IndexLinkContainer>
      );
    });

    return(
      <Nav bsStyle='pills' activeKey={0} stacked onSelect={this.onSelect.bind(this)}>
        {departments}
      </Nav>
    );
  }
}

DepartmentContainer.displayName = 'DepartmentContainer';

export default DepartmentContainer