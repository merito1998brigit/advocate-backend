/* eslint-disable no-underscore-dangle */
import React from 'react'
import {
  Table,
  // Input,
  Button,
  // Popconfirm,
  Skeleton,
  // Tooltip,
  notification
} from 'antd'
import { Helmet } from 'react-helmet'
import callApi from 'utils/callApi'
import { Link } from 'react-router-dom'
// import AddNew from 'components/CustomComponents/AddNew'
import SearchProvider from 'components/RenderProps/SearchProvider'
 

class BannersList extends React.Component {
  state = {
    tableData: [],
    loading: true,
    // // data: table.data,
    // filterDropdownVisible: false,
    // searchText: '',
    // filtered: false,
    // selectedRowKeys: [],
  }

  // onInputChange = e => {
  //   this.setState({ searchText: e.target.value })
  // }

  componentDidMount() {
    this.fetchDetails()
  }


  fetchDetails = async () => {
    const url = '/api/backend/v1/about'
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    this.setState({
      loading: true,
    })
    try {
      const res = await callApi(url, options)
      console.log("Res", res)
      const { tableData } = this.state
      if (res && res.data) this.setState({ loading: false, tableData: [...tableData, res.data] })
      else {
        this.setState({ loading: false })
      }
    }
    catch (error) {
      notification.error({
        message: 'Not Found',
        description: error
      })
    }

  }
 

   

  // onSelectChange = selectedRowKeys => {
  //   console.log('selectedRowKeys changed: ', selectedRowKeys)
  //   this.setState({ selectedRowKeys })
  // }

  render() {
    // /catalog/informations/information/:id - edit-information
    // /catalog/informations/add-information - add-information
    const { tableData,loading } = this.state
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.onSelectChange,
    // }

   
    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        search: true,
        render: (text) => <span>{text}</span>,
      },
      {
        title: 'Thumbnail',
        dataIndex: 'image',
        key: 'image',
        render: (text, record) => (
          <Link to={`/about/edit/${record.id}`} className="thumbnail-area">
            {/* <div className="image-view"> */}
            {console.log("record", record, record.image)}
            <img className="image-view" src={record.image} alt={record.title} />
            {/* </div> */}
          </Link>
        ),
      },
      {
        title: 'Content',
        dataIndex: 'content',
        key: 'content',
        render: (text) => <span>{text.replace( /(<([^>]+)>)/ig, '')}</span>
      },
      {
        title: 'Action',
        key: 'action',
        render: record => (
          <span>
            <Link to={`about/edit/${record.id}`}>
              <Button icon="edit" className="mr-1 bg-primary" size="small" />
            </Link>
          </span>
        ),
      },
    ]
    console.log("TableData", tableData)
    return (
      <div>
        <Helmet title="Banner List" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>About List</strong>
              {/* <AddNew
                add
                selectedRowKeys={selectedRowKeys}
                attribute="about"
                link='/about/add'
              /> */}
            </div>

          </div>
          {loading && (
            <div className="card-body">
              <Skeleton active />
            </div>
          )}
          {!loading && (
            <div className="card-body">
              <SearchProvider columns={columns}>
                {columnsWithSearch => (
                  <Table
                    className="utils__scrollTable"
                    scroll={{ x: '100%' }}
                    // rowSelection={rowSelection}
                    columns={columnsWithSearch}
                    dataSource={tableData}
                    rowKey={record => record.id}
                  />
                )}
              </SearchProvider>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default BannersList





