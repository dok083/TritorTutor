import React from 'react'
import NavBarContainer from './NavBarContainer'
import Footer from './Footer'

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBarContainer />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App
