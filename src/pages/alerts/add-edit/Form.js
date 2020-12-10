/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Radio, notification, Upload, Icon } from 'antd'
import { alertSchema } from 'utils/Schema'
import { formItemLayout, tailFormItemLayout } from 'utils'
import isEmpty from 'lodash/isEmpty'
import { withRouter, Redirect } from 'react-router-dom'
import useFormValidation from 'hooks/useFormValidation'
import { addAlerts } from 'services/alerts'
import { STRINGS } from '_constants'
import Editor from 'components/Editor/index'
import useUpload from 'hooks/useUpload'

const FormA = ({ data }) => {
  console.log('DAta', data)
  useEffect(() => {
    console.log(values, errors)
  }, [values, errors])

  const initialValues = {
    status: 'hold',
  }
  const [success, setSuccess] = useState(false)
  // const [deleteImage, setDeleteImage] = useState([])
  const [upload,setUpload]=useState('image');
  console.log(upload)
  const {
    onChange: onChangeMain,
    onRemove: onRemoveMain,
    beforeUpload: beforeUploadMain,
    fileList: fileListMain,
    // setFileList: setFileListMain,
  } = useUpload(1)

  const propsMainImage = {
    listType: 'picture',
    onChange: onChangeMain,
    onRemove: onRemoveMain,
    beforeUpload: beforeUploadMain,
    fileList: fileListMain,
  }

  useEffect(() => {
    console.log('done', data)
    if (!isEmpty(data)) {
      // const icon = [
      //   {
      //     uid: '-1',
      //     url: data.icon.url,
      //     name: getBaseName(data.icon.url),
      //     thumbnail: data.icon.thumbnail,
      //   },
      // ]
      // const image = [
      //   {
      //     uid: '-1',
      //     url: data.image.url,
      //     name: getBaseName(data.image.url),
      //     thumbnail: data.image.thumbnail,
      //   },
      // ]
      // setFileListMain(data.image)
      // setFileListImage(data.image)
      setValues({
        ...data,
      })
    }
  }, [data])

  useEffect(() => {
    if (fileListMain) {
      setValues((a) => ({ ...a, image: fileListMain }))
    }
    console.log('FilteList <main', fileListMain)
  }, [fileListMain])

  const fetchSubmit = async () => {
    console.log('Values*************', values, data)
    const a = data ? await addAlerts(values, data) : await addAlerts(values, data)
    setSubmitting(false)
    if (a) {
      notification.success({
        message: STRINGS.success,
        description: data ? STRINGS.editSuccess : STRINGS.addSuccess,
      })
      setSuccess(true)
    }
  }

  const submitForm = () => {
    try {
      console.log('will submitform', values)
      fetchSubmit()
    } catch (err) {
      setSubmitting(false)
    }
  }

  const handleEditorChange = (e) => {
    setValues((a) => ({
      ...a,
      content: e,
    }))
  }
  

  const handleupload=(e)=>{
    if(e.target.value==='video'){
      console.log(formItems)
      formItems[3]= {
       type: <Input value={values.videolink} name="videolink" />,
       key: 'videolink',
       label: 'Video Link',
       error: errors.videolink,
     }
    }
    else{
       // alert('b')
    }
  }


  const {
    onChange,
    values,
    setValues,
    onSubmit,
    onBlur,
    errors,
    setSubmitting,
    isSubmitting,
    // validateForm,
    // touched,
    // setTouched,
  } = useFormValidation(initialValues, alertSchema, submitForm) // file as object {fileInputName:'icon', maxCount:1}
  console.log(values)

  console.log('Values DeleteImage', values)

  const formItems = [
    // { heading: 'General' },
    {
      type: <Input value={values.title} name="title" />,
      key: 'title',
      label: 'title',
      error: errors.title,
    },
    {
      type: (
        <Radio.Group name="status" defaultValue="hold" buttonStyle="solid">
          <Radio.Button checked={values.status === 'active'} value="active">
            Active
          </Radio.Button>
          <Radio.Button checked={values.status === 'hold'} value="hold">
            Hold
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'status',
      label: 'Status',
      error: errors.status,
    },
    {
      type: (
        <Radio.Group name="upload" defaultValue={upload} buttonStyle="solid" onChange={(e)=>{handleupload(e)}}>
          <Radio.Button checked={values.upload === 'image'} value="image" onClick={()=>setUpload('image')}>
            Image
          </Radio.Button>
          <Radio.Button checked={values.upload === 'video'} value="video" onClick={()=>setUpload('video')}>
            Video
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'Upload',
      label: 'Upload',
      error: errors.status,
    },
    // {
    //   type: <Input value={values.videolink} name="videolink" />,
    //   key: 'videolink',
    //   label: 'Video Link',
    //   error: errors.videolink,
    // },
    {
      label: 'Image',
      error: errors.image,
      key: 'image',
      name: 'image',
      type: (
        <>
          <Upload listType="picture-card" name="image" {...propsMainImage}>
            {/* <Button onBlur={(e) => onBlur(e, 'image')}> */}
            <Button>
              <Icon type="upload" /> Select File
            </Button>
          </Upload>
        </>
      ),
    },
    {
      type: (
        <Editor
          placeholder="Write something..."
          editorHtml={values.content || ''}
          onChange={handleEditorChange}
        />
      ),
      label: 'Content',
      error: errors.content,
      key: 'content',
    },
  ]

  if (success) return <Redirect to="/alerts" />

  return (
    <Form
      onChange={onChange}
      onBlur={onBlur}
      onSubmit={onSubmit}
      labelAlign="right"
      {...formItemLayout}
    >
      {formItems.map((item) => {
        if (item.heading)
          return (
            <h4 key={item.heading} className="text-black mb-3">
              <strong>{item.heading}</strong>
            </h4>
          )
        return (
          <Form.Item
            key={item.key}
            label={item.label}
            validateStatus={item.error && 'error'}
            help={item.error}
          >
            {item.type}
          </Form.Item>
        )
      })}
      <Form.Item {...tailFormItemLayout}>
        <Button disabled={isSubmitting} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default withRouter(FormA)
