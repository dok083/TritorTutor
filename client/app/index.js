import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexRedirect, browserHistory } from 'react-router'

import App from './app/App'
import Footer from './app/Footer'

import Home from './home/Home'
import About from './about/About'
import Profile from './profile/Profile'
import NotFound from './error/NotFound'

import Course from './course/Course'
import CourseSearch from './course/CourseSearch'

import Settings from './settings/Settings'
import ProfileSettings from './settings/ProfileSettings'
import AccountSettings from './settings/AccountSettings'
import TutorSettings from './settings/TutorSettings'

render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='about' component={About} />
      <Route path='profile/:userID' component={Profile} />
      <Route path='profile' component={ProfileSettings} />
      <Route path='course/search/:query' component={CourseSearch} />
      <Route path='course/:id' component={Course} />
      <Route path='settings' component={Settings}>
        <IndexRedirect to='profile' />
        <Route path='profile' component={ProfileSettings} />
        <Route path='password' component={AccountSettings} />
        <Route path='tutor' component={TutorSettings} />
      </Route>
    </Route>
    <Route path='*' component={App}>
      <IndexRoute component={NotFound} />
    </Route>
  </Router>
), document.getElementById("app"));
