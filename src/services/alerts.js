import { notification } from 'antd'
import callApi from 'utils/callApi'
import { getFormData } from 'utils/index'

//   image:file
// title:ttt(str required)
// videolink:flink(str)
// content:contents(str)
// status:hold/active(enum)
// deleteImage
async function getFormsData({
  title,
  content,
  image,
  status,
  videolink, 
  deleteImage, 
}) {
  console.log("tag", image,"delete",deleteImage)
  const formData = new FormData()
  formData.append('title', title)
  formData.append('content', content)
  formData.append('image',image[0]? image[0].originFileObj: null)
  formData.append('deleteImage',deleteImage!==null?deleteImage:'')
  formData.append('videolink', videolink)
  formData.append('status', status)
  return formData
}

export async function addAlerts(values,data) {
  console.log('addalertsservice',values,data.deleteImage)
 
  const formData = await getFormsData({...values,deleteImage:data.image})
  console.log("formdata", formData)

  const url = '/api/backend/v1/alert'
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

export async function editAlerts(values) {
  console.log('in editBlogForm service', values)
//   const { id } = values
  const formData = getFormData(values)
  console.log("formdata", formData)

  const url = `/api/backend/v1/alert`
  const options = {
    method: 'POST',
    body: formData,
  }
  try {
    const responseJSON = await callApi(url, options)
console.log("response",responseJSON)
 
    if (responseJSON.data) {
      notification.success({
        message: 'Success!',
        description: 'Updated successfully',
      })
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