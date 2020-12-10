import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { notification } from 'antd'

const PrivateRoute = ({ authorize, user, component: Component, path, key, exact }) => {
  console.log(user.authorized)
  console.log(user.role)
  console.log("role",authorize.role)
  return (
    <Route
      path={path}
      key={key}
      exact={exact}
      render={props => {
        // console.log(props)
        if (user.authorized && user.role )
          return <Component {...props} />
        // console.log('not authorized - back to home?')
        notification.error({
          message: 'Unauthorized Access',
          description: 'You have no rights to access this page!',
        })

        // return <Redirect to="/user/login" />
        return <Redirect to="/" />
      }}
    />
  )
}

const mapStateToProps = ({ user }) => {
  // console.log(user)
  return {
    user,
  }
}

export default connect(mapStateToProps)(PrivateRoute)
