import React from 'react'
import {IndexRoute, Route} from 'react-router'
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth'
import CoreLayout from './layouts/CoreLayout/CoreLayout'
import HomeView from './views/HomeView/HomeView'
import {
    Chat,
    Widgets,
    About,
    Login,
    LoginSuccess,
    Survey,
    NotFound,
    Pagination
  } from 'containers'

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth () {
      const {auth: { user }} = store.getState()
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/')
      }
      cb()
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth)
    } else {
      checkAuth()
    }
  }

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path='/' component={CoreLayout}>
      { /* Home (main) route */ }
      <IndexRoute component={HomeView}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path='chat' component={Chat}/>
        <Route path='loginSuccess' component={LoginSuccess}/>
      </Route>

      { /* Routes */ }
      <Route path='about' component={About}/>
      <Route path='login' component={Login}/>
      <Route path='pagination' component={Pagination}/>
      <Route path='survey' component={Survey}/>
      <Route path='widgets' component={Widgets}/>

      { /* Catch all route */ }
      <Route path='*' component={NotFound} status={404} />
    </Route>
  )
}
