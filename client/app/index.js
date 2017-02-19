import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

import App from './app/App'
import Footer from './app/Footer'

import Home from './home/Home'
import About from './about/About'
import Profile from './profile/Profile'
import Error from './error/Error'

render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='/about' component={About} />
      <Route path='/profile/:userID' component={Profile} />
    </Route>
    <Route path='*' component={Error} />
  </Router>
), document.getElementById("app"));
