/* eslint-disable no-underscore-dangle */
import React from 'react'
import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import Query from 'components/Query'

import { Skeleton } from 'antd'

 
import Form from './Form'

const FormIndex = props => {
  const { match } = props
  const { params } = match
  const { id } = params

  let form = <Form />
  if (id) {
    form = (
      <Query url='/api/backend/v1/logo' loader={<Skeleton active />}>
        {res => {
          console.log("response",res)
          if (res.data) return <Form data={res.data} />
          return <div>No data!</div>
        }}
      </Query>
    )
  }
  const title = id ? 'Edit Logo' : 'Add Logo'
  return (
    <div>
      <Helmet title={title} />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>{title}</strong>
          </div>
        </div>
        <div className="card-body">{form}</div>
      </div>
    </div>
  )
}

export default withRouter(FormIndex)
