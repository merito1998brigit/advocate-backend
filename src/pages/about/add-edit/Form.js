/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { Form, Input, Button, notification, Upload, Icon } from 'antd'
import { aboutSchema } from 'utils/Schema'
import { formItemLayout, tailFormItemLayout } from 'utils'
import isEmpty from 'lodash/isEmpty'
import { withRouter, Redirect } from 'react-router-dom'
import useFormValidation from 'hooks/useFormValidation'
import addEditAbout from 'services/about'
import { STRINGS } from '_constants'
import Editor from 'components/Editor/index'
import useUpload from 'hooks/useUpload'

const FormA = ({ data }) => {
  useEffect(() => {
    console.log(values, errors)
  }, [values, errors])

  const initialValues = {
    status: 'hold',
  }

  const {
    onChange: onChangeMain,
    onRemove: onRemoveMain,
    beforeUpload: beforeUploadMain,
    fileList: fileListMain,
    // setFileList: setFileListMain,
  } = useUpload()

  const propsMainImage = {
    multiple: true,
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
      // setFileListMain(icon)
      // setFileListImage(image)
      setValues({
        ...data,
      })
    }
  }, [data])

  useEffect(() => {
    if (fileListMain) setValues((a) => ({ ...a, image: fileListMain }))
  }, [fileListMain])

  const [success, setSuccess] = useState(false)

  const fetchSubmit = async () => {
    console.log('Values', values)
    const a = await addEditAbout(values, data)
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

  console.log(initialValues)
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
  } = useFormValidation({}, aboutSchema, submitForm) // file as object {fileInputName:'icon', maxCount:1}
  console.log(values)

  const formItems = [
    {
      type: <Input value={values.title} name="title" />,
      key: 'title',
      label: 'title',
      error: errors.title,
    },
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

  if (success) return <Redirect to="/about" />

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
