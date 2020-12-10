import { notification } from 'antd'
import callApi from 'utils/callApi'
// import { getFormData } from 'utils/index'
  
async function getFormData({
  title,
  content,
  image,
  status,
  priority,
   video ,
   deleteImage 
}) {
  console.log("tag", image,"delete",deleteImage)
  const formData = new FormData()
  formData.append('title', title)
  formData.append('content', content)
  formData.append('image', image[0] ?image[0].originFileObj:null)
  formData.append('deleteImage',deleteImage!==null?deleteImage:'')
  formData.append('priority',priority)
  formData.append('video', video)
  formData.append('status', status)
  return formData
}
export async function addBanner(values) {
  console.log('addalertsservice', values)

  const formData = await getFormData(values)
  console.log("formdata", formData)
 

  const url = '/api/backend/v1/banner'
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

export async function editBanner(id,values,data) {
  console.log('in editBlogForm service', id,values)
  const formData = await getFormData({...values,deleteImage:data.image})
  console.log("formdata", formData)

  const url = `/api/backend/v1/banner/${id}`
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