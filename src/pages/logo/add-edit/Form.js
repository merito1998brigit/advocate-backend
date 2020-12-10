/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { Form, Input, Button, notification, Upload, Icon } from 'antd'
import { logoSchema } from 'utils/Schema'
import { formItemLayout, tailFormItemLayout} from 'utils'
import isEmpty from 'lodash/isEmpty'
import { withRouter, Redirect } from 'react-router-dom'
import useFormValidation from 'hooks/useFormValidation'
import  addEditLogo  from 'services/logo'
import { STRINGS } from '_constants'
import useUpload from 'hooks/useUpload'

const FormA = ({ data }) => {
  console.log('data', data)
  useEffect(() => {
    console.log(values, errors)
  }, [values, errors])

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
      setValues({
        ...data,
      })
    }
  }, [data])

  useEffect(() => {
    if (fileListMain) setValues((a) => ({ ...a, Logo: fileListMain }))
     
  }, [fileListMain])

  const [success, setSuccess] = useState(false)

  const fetchSubmit = async () => {
    console.log('Values', values)
    const a = await addEditLogo(values,data)
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
  } = useFormValidation({}, logoSchema, submitForm) // file as object {fileInputName:'icon', maxCount:1}
  console.log(values)

  const formItems = [
    {
      type: <Input value={values.DomainName} name="DomainName" />,
      key: 'DomainName',
      label: 'Domain Name',
      error: errors.DomainName,
    },

    {
      label: 'Logo',
      error: errors.Logo,
      key: 'Logo',
      name: 'Logo',
      type: (
        <>
          <Upload listType="picture" name="Logo" {...propsMainImage}>
            {/* <Button onBlur={(e) => onBlur(e, 'image')}> */}
            <Button>
              <Icon type="upload" /> Select File
            </Button>
          </Upload>
        </>
      ),
    },
  ]

  if (success) return <Redirect to="/logo" />

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
