import { notification } from 'antd'
import callApi from 'utils/callApi'
// import { getFormData } from 'utils/index'
  
async function getFormData({
  title,
  content,
  image,
  status,
  pOrder,
  metaTitle,
  metaDescription,
  metaKeywords,
  slug,
  deleteImage  
}) {
  console.log("tag", image,"delete",deleteImage)
  const formData = new FormData()
  formData.append('title', title)
  formData.append('content', content)
  formData.append('image',image[0]? image[0].originFileObj:null)
  formData.append('metaTitle', metaTitle)
  formData.append('metaDescription', metaDescription)
  formData.append('metaKeywords', metaKeywords)
  formData.append('slug', slug!==undefined?slug:'')
  formData.append('deleteImage',deleteImage!==null?deleteImage:'')
  formData.append('p_order',pOrder)
  formData.append('status', status)
  return formData
}
export async function addPages(values) {
  console.log('addalertsservice', values)

  const formData = await getFormData(values)
  console.log("formdata", formData)
 

  const url = '/api/backend/v1/pages'
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
    return false
  }
  // return null
}

export async function editPages(id,values,data) {
  console.log('in editBlogForm service', id,values)
  const formData = await getFormData({...values,deleteImage:data.image})
  console.log("formdata", formData)

  const url = `/api/backend/v1/pages/${id}`
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