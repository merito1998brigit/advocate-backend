import { notification } from 'antd'
import callApi from 'utils/callApi'
 
async function getFormsData({
  Logo,
 DomainName, 
 deleteLogo,
}) {
  console.log("tag",Logo,deleteLogo)
  const formData = new FormData()
  formData.append('DomainName', DomainName)
  formData.append('Logo',Logo[0]? Logo[0].originFileObj:null)
  formData.append('deleteLogo',deleteLogo!==null?deleteLogo:'')
 
  return formData
}

export  default async function addEditLogo(values,data) {
  console.log('addalertsservice', values,data)

  const formData = await getFormsData({...values,deleteLogo:data.Logo})
  console.log("formdata", formData)

  const url = '/api/backend/v1/logo'
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
 