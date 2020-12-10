/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { Form, Input, Button,notification} from 'antd'
import { keywordSchema } from 'utils/Schema'
import { formItemLayout, tailFormItemLayout } from 'utils'
import isEmpty from 'lodash/isEmpty'
import { withRouter, Redirect } from 'react-router-dom'
import useFormValidation from 'hooks/useFormValidation'
import { addKeywords,editKeywords } from 'services/keywords'
import { STRINGS } from '_constants'
 

const FormA = ({ data }) => {
  useEffect(() => {
    console.log(values, errors)
  }, [values, errors])
 

  const initialValues = {
    status: 'active',
  }

  useEffect(() => {
    console.log('done', data)
    if (!isEmpty(data)) {     
        setValues({
            ...data,
      })
    }
  }, [data])

  
  const [success, setSuccess] = useState(false)

  const fetchSubmit = async () => {
      console.log("Values",values)
    const a = data ? await editKeywords(data.id ,values): addKeywords(values)
    console.log("a",a)
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
 

  // console.log(initialValues)
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
  } = useFormValidation(initialValues, keywordSchema, submitForm) // file as object {fileInputName:'icon', maxCount:1}
  console.log(values)
  

  const formItems = [
    {
      type: <Input value={values.page_title} name="page_title" />,
      key: 'pageTitle',
      label: 'Page Title',
      error: errors.page_title,
    },
    {
      type: <Input value={values.page_Description} name="page_Description" />,
      key: 'page_Description',
      label: 'Page description',
      error: errors.page_Description,
    },
    {
      type: <Input value={values.page_keywords} name="page_keywords" />,
      key: 'page_keywords',
      label: 'Page keywords',
      error: errors.page_keywords,
    },
    {
      type: <Input value={values.url} name="url" />,
      key: 'url',
      label: 'Relative page url',
      error: errors.url,
    },
  ]


  if (success) return <Redirect to='/keywords' />

  return (
    <Form
      onChange={onChange}
      onBlur={onBlur}
      onSubmit={onSubmit}
      labelAlign="right"
      {...formItemLayout}
    >
      {formItems.map(item => {
       
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
