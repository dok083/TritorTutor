import React from 'react'
import NavBarContainer from './NavBarContainer'
import Footer from './Footer'
import VerificationAlertContainer from '../verify/VerificationAlertContainer'
import axios from 'axios'

import Dispatch from '../Dispatch'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {user: null, loading: true};

    Dispatch.addListener('requestUserInfo', (data) => {
      var action = Dispatch.createAction('getUserInfo');
      action.set('component', data.component);
      action.set('user', this.state.user);
      action.dispatch();
    });

    Dispatch.addListener('updateUserInfo', (data) => {
      this.setState({user: data.user});
    });
  }

  componentWillMount() {
    axios.get('/api/user')
      .then((res) => {
        this.setState({
          user: res.data,
          loading: false
        });
      })
      .catch((res) => {
        this.setState({loading: false});
      });
  }

  onGetUser(newUser) {
    this.setState({user: newUser});
  }

  render() {
    var contents;

    if (this.state.loading) {
      const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#ccc',
        fontSize: '1.5em'
      };

      contents = (
        <div style={style}>
          Loading
        </div>
      );
    } else {
      contents = (
        <div>
          <VerificationAlertContainer user={this.state.user} />
          <NavBarContainer user={this.state.user} onGetUser={this.onGetUser.bind(this)} />
          {this.props.children}
          <Footer />
        </div>
      );
    }

    return contents;
  }
}

App.displayName = 'App';

export default App
