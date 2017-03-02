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

import Message from './message/Message'
import MessageView from './message/MessageView'

import History from './history/History'

render((
  <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='about' component={About} />
      <Route path='profile/:id' component={Profile} />
      <Route path='profile' component={ProfileSettings} />
      <Route path='course/search/:query' component={CourseSearch} />
      <Route path='course/:id' component={Course} />
      <Route path='message' component={Message} />
      <Route path='message/view/:id' component={MessageView} />
      <Route path='history' component={History} />
      <Route path='settings' component={Settings}>
        <IndexRedirect to='profile' />
        <Route path='profile' component={ProfileSettings} />
        <Route path='account' component={AccountSettings} />
        <Route path='tutoring' component={TutorSettings} />
      </Route>
    </Route>
    <Route path='*' component={App}>
      <IndexRoute component={NotFound} />
    </Route>
  </Router>
), document.getElementById("app"));
