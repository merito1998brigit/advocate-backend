/* eslint-disable no-underscore-dangle */
import React from 'react'
import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import Query from 'components/Query'
import useFetching from 'hooks/useFetching'
import { Skeleton } from 'antd'

 
import Form from './Form'

const FormIndex = props => {
  const { match } = props
  const { params } = match
  const { id } = params
console.log("id",id)

const [{ response:contactRes, error:contactErr }] = useFetching('/api/backend/v1/banner/3')
console.log("CONATCt",contactErr,contactRes)

  let form = <Form />
  if (id) {
    form = (
      <Query url={`/api/backend/v1/banner/${id}`} loader={<Skeleton active />}>
        {res => {
          console.log("data Res",res)
          if (res.data) return <Form data={res.data} />
          return <div>No data!</div>
        }}
      </Query>
    )
  }
  const title = id ? 'Edit Banner' : 'Add Banner'
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
