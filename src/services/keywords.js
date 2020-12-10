import { notification } from 'antd'
import callApi from 'utils/callApi'
import { getFormData } from 'utils/index'
  

export async function addKeywords(values) {
  console.log('addalertsservice', values)

  const formData =  getFormData(values)
  console.log("formdata", formData)

  const url = '/api/backend/v1/keywords'
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

export async function editKeywords(id,values) {
  console.log('in editBlogForm service', id,values)
  const formData = getFormData(values)
  console.log("formdata", formData)

  const url = `/api/backend/v1/keywords/${id}`
  const options = {
    method: 'PATCH',
    body: formData,
  }
  try {
    const responseJSON = await callApi(url, options)
   console.log("response",responseJSON)
 
    if (responseJSON.data) {
      return responseJSON.data
    }
    // return true
  }
  catch (err) {
    console.log("error", err)
    notification.error({
      message: err.status,
      description: err.message,
    })
  }
  return null
}