/* eslint-disable no-underscore-dangle */
import React from 'react'
import {
  Table,
  Icon,
  Dropdown,
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
import Menu from 'components/Menu'
import SearchProvider from 'components/RenderProps/SearchProvider'

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
    // selectedRowKeys: [],
  }

  // onInputChange = e => {
  //   this.setState({ searchText: e.target.value })
  // }

  componentDidMount() {
    this.fetchDetails()
  }


  fetchDetails = async () => {
    const url = '/api/backend/v1/contactus'
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
      const {tableData}=this.state
      if (res && res.data) this.setState({ loading: false, tableData: [...tableData,res.data] })
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

  handleMenuClick = async e => {
    const { clickedId, tableData } = this.state
    console.log('clicked on', e.key, clickedId)
//  const {title}=tableData.find(item=>item.id===clickedId)

    const isUpdated = await callApi(`/api/backend/v1/contactus?status=${e.key}`,{method:'POST'})
    console.log("isUpdated",isUpdated)
    if (isUpdated) {
      tableData[0].status = e.key
      return this.setState(prev => ({
        ...prev.data,
        clickedId: null,
      }))
    }
    this.setState({ clickedId: null })
    return null
  }

  handleStatusClick = id => {
    this.setState({ clickedId: id })
  }
 
  // onSelectChange = selectedRowKeys => {
  //   console.log('selectedRowKeys changed: ', selectedRowKeys)
  //   this.setState({ selectedRowKeys })
  // }

  render() {
 
    const { tableData,loading } = this.state
     
    const menu = <Menu items={menuItems} onClick={this.handleMenuClick} />
 
    const columns = [
      {
        title: 'Helpline Number',
        dataIndex: 'help_Num',
        key: 'help_Num',
        // search: true,
        render: (text)=><span>{text}</span>,
      },
      {
        title: 'Facebook',
        dataIndex: 'fblink',
        key: 'fblink',
        // search: true,
        render: (text)=><span>{text}</span>,
      },
      {
        title: 'Twitter',
        dataIndex: 'twitter',
        key: 'twitter',
        // search: true,
        render: (text)=><span>{text}</span>,
      },
      {
        title: 'LinkedIn',
        dataIndex: 'linkedin',
        key: 'linkedin',
        // search: true,
        render: (text)=><span>{text}</span>,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          console.log("Record",text,record)
          let badge = 'badge-success'
          if (record.status === 'hold') badge = 'badge-danger'
          return (
            <Dropdown
              // eslint-disable-next-line react/destructuring-assignment
              // visible={this.state.clickedId === record._id}
              overlay={menu}
              ref={this.clickId}
              id={record}
              onClick={() => this.handleStatusClick(record)}
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
            <Link to={`contact/edit/${record.id}`}>
              <Button icon="edit" className="mr-1" size="small" />
            </Link>
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
              <strong>Contact List</strong>
              {/* <AddNew
                add
                selectedRowKeys={selectedRowKeys}
                attribute="alerts"
                link='/contact/add'
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




 
  