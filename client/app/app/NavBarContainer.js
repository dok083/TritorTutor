import React from 'react'
import axios from 'axios'
import NavBar from './NavBar'

class NavBarContainer extends React.Component {
  render() {
      return <NavBar user={this.props.user} onGetUser={this.props.onGetUser} />
  }
}

export default NavBarContainer
