/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Radio,notification } from 'antd'
import { contactSchema } from 'utils/Schema'
import { formItemLayout, tailFormItemLayout} from 'utils'
import isEmpty from 'lodash/isEmpty'
import { withRouter, Redirect } from 'react-router-dom'
import useFormValidation from 'hooks/useFormValidation'
import addEditContact  from 'services/contact'
import { STRINGS } from '_constants'
 
const FormA = ({ data }) => {
  console.log('data',data)
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
    const a = await addEditContact(values)
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
  } = useFormValidation(initialValues, contactSchema, submitForm) // file as object {fileInputName:'icon', maxCount:1}
  console.log(values)
  


  const formItems = [
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
      type: <Input value={values.help_Num} name="help_Num" />,
      key: 'help_Num',
      label: 'Helpline Number',
      error: errors.help_Num,
    },
    {
      type: <Input value={values.call_Now_Num} name="call_Now_Num" />,
      key: 'call_Now_Num',
      label: 'CallNow Number',
      error: errors.call_Now_Num,
    },
    {
      type: <Input value={values.whatsapplink} name="whatsapplink" />,
      key: 'whatsapplink',
      label: 'Whatsapp',
      error: errors.whatsapplink,
    },
    {
      type: <Input value={values.fblink} name="fblink" />,
      key: 'fblink',
      label: 'Facebook',
      error: errors.fblink,
    },
    {
      type: <Input value={values.twitter} name="twitter" />,
      key: 'twitter',
      label: 'Twitter ',
      error: errors.twitter,
    },
    {
      type: <Input value={values.linkedin} name="linkedin" />,
      key: 'linkedin',
      label: 'Linkedin',
      error: errors.linkedin,
    },
    {
      type: <Input value={values.youtube} name="youtube" />,
      key: 'youtube',
      label: 'Youtube',
      error: errors.youtube,
    },
    {
      type: <Input value={values.ownedby} name="ownedby" />,
      key: 'ownedby',
      label: 'Owned By',
      error: errors.ownedby,
    },
    {
      type: <Input value={values.developedby} name="developedby" />,
      key: 'developedby',
      label: 'Developed By',
      error: errors.developedby,
    },
    {
      type: <Input value={values.developedby_url} name="developedby_url" />,
      key: 'developedby_url',
      label: 'Developed By Url',
      error: errors.developedby_url,
    },    
    {
      type: <Input value={values.managedby} name="managedby" />,
      key: 'managedby',
      label: 'Managed By',
      error: errors.managedby,
    },
     {
      type: <Input value={values.managedby_url} name="managedby_url" />,
      key: 'managedby_url',
      label: 'Managed By Url',
      error: errors.managedby_url,
    },
   
  ]

  if (success) return <Redirect to='/contact' />

  return (
    <Form
      onChange={onChange}
      onBlur={onBlur}
      onSubmit={onSubmit}
      labelAlign="right"
      {...formItemLayout}
    >
      {formItems.map(item => {
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
