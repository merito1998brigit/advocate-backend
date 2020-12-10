/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { notification } from 'antd'
import callApi from 'utils/callApi'
 

const INFORMATIONS_URL = '/api/backend/v1/blog'


// title : title10
  // publishedDate : 2020/10/10
  // photo : image [ file type ]
  // youtubeurl : url
  // content : content10
  // publishing_Page : id [ from Pages]
  // p_order : 1
  // status : active
  //              [ active or hold]
async function getFormsData({
  title,
  content,
  photo,
  status,
  youtubeurl,  
  publishingPage,
  publishedDate,
  priorityOrder,
  metaTitle,
  metaDescription,
  metaKeywords,
  slug,
  deletePhoto
}) {
  console.log("tag", photo)
  const formData = new FormData()
  formData.append('title', title)
  formData.append('content', content)
  formData.append('metaTitle', metaTitle)
  formData.append('metaDescription', metaDescription)
  formData.append('metaKeywords', metaKeywords)
  formData.append('photo',photo[0]? photo[0].originFileObj: null)
  formData.append('deletePhoto',deletePhoto!==null?deletePhoto:'')
  formData.append('youtubeurl', youtubeurl)
  formData.append('status', status)
  formData.append('slug', slug)
  formData.append('publishing_Page', publishingPage)
  formData.append('publishedDate', publishedDate)
  formData.append('p_order', priorityOrder)
  return formData
}


export async function getBlogs() {
  try {
    const res = await callApi(INFORMATIONS_URL)
    if (res.data) return { data: res.data }
  } catch (error) {
    console.log(error)
    notification.error({
      message: 'Error!',
      description: error.message,
    })
  }
  return null
}

export async function editBlogsStatus(id, status) {
  const url = `${INFORMATIONS_URL}/${id}?status=${status}`
  const options = {
    method: 'PATCH',
  }
  try {
    const res = await callApi(url, options)
    if (res.data && res.data.status === status) return true
    return false
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return false
  }
}

export async function deleteBlog(id) {
  const url = `${INFORMATIONS_URL}/${id}`
  const options = {
    method: 'DELETE',
  }
  try {
    const res = await callApi(url, options)
    if (res && res.success) return true
    return false
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return false
  }
}

export async function addBlog(values) {
  console.log(values)
  const formData = await getFormsData(values)
  // const { images } = values
  // formData.append('image', images[0].originFileObj)
  // Object.entries(values).map(([key, value]) => {
  //   formData.append(key, value)
  //   return null
  // })
  const url = `${INFORMATIONS_URL}`
  const options = {
    method: 'POST',
    body: formData,
  }
  try {
    const res = await callApi(url, options)
    if (res && res.data) return res.data
    return null
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return false
  }
}

export async function editBlog(id, values,data) {
  console.log('ttttttttttttt', values)
  const url = `${INFORMATIONS_URL}/${id}`
  const formData = await getFormsData({...values,deletePhoto:data.photo})
  // const formImgs = values.images.map(i => {
  //   console.log('rrrrr', i)
  //   if (i.originFileObj) formData.append('image', i.originFileObj)
  //   return i.uid
  // })

  // delete values.images
  // console.log('formImgs', formImgs)

  // const delImgs = origData.images.filter(i => !formImgs.includes(i._id))
  // delImgs.forEach(i => {
  //   formData.append('deletedImages[]', i._id)
  // })
  // Object.entries(values).map(([key, value]) => {
  //   console.log(key, value)
  //   formData.append(key, value)
  //   return ''
  // })
  console.log('formData', ...formData)
  const options = {
    method: 'PATCH',
    body: formData,
  }
  try {
    const res = await callApi(url, options)
    if (res && res.success) return true
    return false
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return false
  }
}
