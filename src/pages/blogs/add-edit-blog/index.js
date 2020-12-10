/* eslint-disable no-underscore-dangle */
import React from 'react'
import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import Query from 'components/Query'
import useFetching from 'hooks/useFetching'

import { Skeleton } from 'antd'

import Form from './Form'

const FormIndex = (props) => {
  const { match } = props
  const { params } = match
  const { id } = params

  const [{ response }] = useFetching('/api/backend/v1/pages')
  console.log('response', response)
  let form = <Form pages={response?.data} />
  if (id) {
    form = (
      <Query url={`/api/backend/v1/blog/${id}`} loader={<Skeleton active />}>
        {(res) => {
          if (res.data) return <Form pages={response?.data} data={res.data} />
          return <div>No data!</div>
        }}
      </Query>
    )
  }
  const title = id ? 'Edit blog' : 'Add blog'
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
