/* eslint-disable no-underscore-dangle */
import React from 'react'
import {
  Table,
  Icon,
  Dropdown,
  // Input,
  Button,
  Popconfirm,
  Skeleton,
  Tooltip,
  notification
} from 'antd'
import { Helmet } from 'react-helmet'
import callApi from 'utils/callApi'
import { Link } from 'react-router-dom'
import AddNew from 'components/CustomComponents/AddNew'
import Menu from 'components/Menu'
import { STRINGS ,LINKS} from '_constants'
import SearchProvider from 'components/RenderProps/SearchProvider'
import EditableCell from 'components/EditableCellNumber'

const menuItems = [
  {
    key: 'active',
    title: 'Active',
  },
  {
    key: 'hold',
    title: 'Hold',
  },
]

class BannersList extends React.Component {
  state = {
    tableData: [],
    loading: true,
    // // data: table.data,
    // filterDropdownVisible: false,
    // searchText: '',
    // filtered: false,
    selectedRowKeys: [],
  }

  // onInputChange = e => {
  //   this.setState({ searchText: e.target.value })
  // }

  componentDidMount() {
    this.fetchDetails()
  }


  fetchDetails = async () => {
    const url = '/api/backend/v1/blog'
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    this.setState({
      loading: true,
    })
    try{
      const res = await callApi(url,options)
      console.log("Res",res)
      if (res && res.data) this.setState({ loading: false, tableData: res.data })
      else {
        this.setState({ loading: false })
      }
    }
    catch(error){
      notification.error({
        message:'Not Found',
        description:error
      })
    }
   
  }

  handleDelete = async (id) => {
    console.log('id', id)
    const isDeleted = await callApi(`/api/backend/v1/blog/${id}`, { method: 'DELETE' })
    console.log('isdeleted', isDeleted)
    if (isDeleted) {
      this.setState((m) => {
        const newData = m.tableData.filter((i) => i.id !== id)
        return {
          ...m,
          tableData: newData,
        }
      })
    }
  }


  handleMenuClick = async e => {
    const { clickedId, tableData } = this.state
    // console.log('clicked on', e.key, clickedId)

    const isUpdated =await callApi(`/api/backend/v1/blog/${clickedId}?status=${e.key}`,{method:'PATCH'})
    console.log("isUpdated",isUpdated)
    if (isUpdated) {
      const recordIndex = tableData.findIndex(item => item.id === clickedId)
      tableData[recordIndex].status = e.key
      notification.success({ message: STRINGS.success,description:STRINGS.editSuccess})
      return this.setState(prev => ({
        ...prev.data,
        clickedId: null,
      }))
    }
    this.setState({ clickedId: null })
    return null
  }

  onCellChange = (id, key) => {
    return async value => {
      console.log(id, key, value)
      const edited = await callApi(`/api/backend/v1/blog/${id}?priority=${value}`,{method:'PATCH'})
      if (edited) {
        notification.success({ message: STRINGS.success,description:STRINGS.editSuccess})
        return true
      }
      return false
    }
  }

  handleStatusClick = id => {
    this.setState({ clickedId: id })
  }
 
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  render() {
    // /catalog/informations/information/:id - edit-information
    // /catalog/informations/add-information - add-information
    const { tableData, selectedRowKeys, loading } = this.state
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.onSelectChange,
    // }

    const menu = <Menu items={menuItems} onClick={this.handleMenuClick} />

    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        search: true,
        render: (text)=><span>{text}</span>,
      },
      {
        title: 'Thumbnail',
        dataIndex: 'photo',
        key: 'photo',
        render: (text, record) => (
          <Link to={`/blogs/edit/${record.id}`} className="thumbnail-area">
            {/* <div className="image-view"> */}
            {console.log("record",record,record.photo)}
            <img className="image-view" src={record.photo} alt={record.title} />
            {/* </div> */}
          </Link>
        ),
      },
      {
        title: 'Priority',
        dataIndex: 'p_order',
        key: 'p_order',
        sorter: (a, b) => a.p_order - b.p_order,
        render: (text, record) => (
          <EditableCell
            type="number"
            value={text}
            onChange={this.onCellChange(record.id, 'p_order')}
          />
        ),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          console.log("Record",record)
          let badge = 'badge-success'
          if (record.status === 'hold') badge = 'badge-danger'
          return (
            <Dropdown
              // eslint-disable-next-line react/destructuring-assignment
              // visible={this.state.clickedId === record._id}
              overlay={menu}
              ref={this.clickId}
              id={record.id}
              onClick={() => this.handleStatusClick(record.id)}
              trigger={['click']}
            >
              <span className={`font-size-12 badge ${badge} 'badgeText'`}>
                {text}
                <Icon type="down" />
              </span>
            </Dropdown>
          )
        },
      },
      {
        title: 'Action',
        key: 'action',
        render: record => (
          <span>
            <Link to={`${LINKS.blogs}/edit/${record.id}`}>
              <Button icon="edit" className="mr-2 bg-primary" size="small" />
            </Link>
            <Tooltip placement="bottomRight" title="Delete">
              <Popconfirm title="Delete record?" onConfirm={() => this.handleDelete(record.id)}>
                <Button icon="close" className="mr-1 bg-danger" size="small" />
              </Popconfirm>
            </Tooltip>
          </span>
        ),
      },
    ]
console.log("TableData",tableData)
    return (
      <div>
        <Helmet title="Banner List" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Blog List</strong>
              <AddNew
                add
                selectedRowKeys={selectedRowKeys}
                attribute="banner"
                link={LINKS.addBlogs}
              />
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




 
  