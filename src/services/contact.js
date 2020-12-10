import { notification } from 'antd'
import callApi from 'utils/callApi'
import { getFormData } from 'utils/index'
 
export default async function addEditContact(values) {
    console.log('addacontactsservice', values)
  
    const formData =  getFormData(values)
    console.log("formdata", formData)
  
    const url = '/api/backend/v1/contactus'
    const options = {
      method: 'POST',
      body: formData,
    }
    try {
      const responseJSON = await callApi(url, options)
      console.log("response", responseJSON)
      if (responseJSON.data) {
        return responseJSON.data
      }
      return null
    } catch (err) {
      // console.log(err)
      notification.error({
        message: err.status,
        description: err.message,
      })
    }
    return null
  }