import { notification } from 'antd'
import callApi from 'utils/callApi'

async function getFormsData({
  title,
  content,
  image, 
  deleteImage,
}) {
  console.log("tag", image,"delete",deleteImage)
  const formData = new FormData()
  formData.append('title', title)
  formData.append('content', content)
  if(image.length>0)
   {
    image.map(item => {
    formData.append('image', item.originFileObj)
    return ''
  })
  }
  else{
    formData.append('image',null)
  }
  deleteImage.forEach(i=>{
    formData.append('deleteImage',i)
  })

  return formData
}

export default async function addEditAbout(values,data) {
  console.log('addalertsservice', values,data)

  const formData = await getFormsData({...values,deleteImage:data.image})
  console.log("formdata", formData)

  const url = '/api/backend/v1/about'
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
 