/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import {
  Form,
  Input,
  Button,
  Radio,
  InputNumber,
  notification,
  Select,
  Upload,
  Icon,
  DatePicker,
} from 'antd'
import { blogSchema } from 'utils/Schema'
import { formItemLayout, tailFormItemLayout } from 'utils'
import { withRouter, Redirect } from 'react-router-dom'
import useFormValidation from 'hooks/useFormValidation'
import { addBlog, editBlog } from 'services/blogs'
import isEmpty from 'lodash/isEmpty'
import { STRINGS, LINKS } from '_constants'
import moment from 'moment'
import Editor from 'components/Editor/index'
import useUpload from 'hooks/useUpload'

const FormA = ({ data, pages }) => {
  useEffect(() => {
    console.log(values, errors)
  }, [values, errors])
  const dateFormat = 'YYYY/MM/DD'
  const initialValues = {
    status: 'hold',
    publishedDate: moment().format(dateFormat),
  }

  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    // setFileList: setFileListImages,
  } = useUpload(1)

  useEffect(() => {
    if (data) {
      // let himg = []
      // if (data.images.length > 0) {
      //   himg = data.images.map((item) => {
      //     return {
      //       uid: item._id,
      //       name: getBaseName(item.url),
      //       url: item.url,
      //       thumbUrl: item.thumbnail,
      //     }
      //   })
      // }
      setValues({
        ...data,
        priorityOrder: data.p_order,
        publishingPage: data.publishing_Page.id,
      })
      console.log(initialValues)
      // setFileListImages([{key:1,url:data.photo}])
    }
  }, [data])

  useEffect(() => {
    setValues((a) => ({ ...a, photo: fileListImages }))
  }, [fileListImages])

  const handleEditorChange = (e) => {
    setValues((a) => ({
      ...a,
      content: e,
    }))
  }

  const propsImages = {
    beforeUpload: beforeUploadImages,
    onRemove: onRemoveImages,
    onChange: onChangeImages,
    fileList: fileListImages,
  }

  const [success, setSuccess] = useState(false)

  const fetchSubmit = async () => {
    const a = data ? await editBlog(data.id, values, data) : await addBlog(values)
    setSubmitting(false)
    if (a) {
      notification.success({
        message: STRINGS.success,
        description: data ? STRINGS.editSuccess : STRINGS.addSuccess,
      })
      setSuccess(true)
    }
  }

  const onChangeStartDate = (e) => {
    console.log('e', e, new Date(e).toISOString(), moment(e).format(dateFormat))
    setValues((a) => ({ ...a, publishedDate: moment(e).format(dateFormat) }))
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
  } = useFormValidation(initialValues, blogSchema, submitForm) // file as object {fileInputName:'icon', maxCount:1}
  console.log(values, pages)
  // title : title10
  // publishedDate : 2020/10/10
  // photo : image [ file type ]
  // youtubeurl : url
  // content : content10
  // publishing_Page : id [ from Pages]
  // p_order : 1
  // status : active
  //              [ active or hold]

  let formItems = [
    // { heading: 'General' },
    {
      type: <Input value={values.title} name="title" />,
      key: 'title',
      label: 'Title',
      error: errors.title,
    },
    {
      type: (
        <DatePicker
          format={dateFormat}
          // allowClear={true}
          // showToday
          // defaultPickerValue={moment(values.publishedDate)}
          value={moment(values.publishedDate)}
          onChange={onChangeStartDate}
        />
      ),
      key: 'publishedDate',
      label: 'Published Date',
      error: errors.publishedDate,
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
        <InputNumber
          onChange={(e) => setValues((a) => ({ ...a, priorityOrder: e }))}
          name="priorityOrder"
          value={values.priorityOrder}
          min={1}
        />
      ),
      key: 'priorityOrder',
      label: 'Priority ',
      error: errors.priorityOrder,
    },
    {
      label: 'photo',
      error: errors.photo,
      key: 'photo',
      name: 'photo',
      type: (
        <>
          <Upload listType="picture" name="photo" {...propsImages}>
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
    {
      type: (
        <Select
          // mode="multiple"
          value={values.publishingPage}
          name="publishingPage"
          placeholder="Select Publishing Page"
          onChange={(e) => setValues((a) => ({ ...a, publishingPage: e }))}
        >
          {pages?.map((i) => (
            <Select.Option key={i.id} value={i.id}>
              {`${i.title}`}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'publishingPage',
      label: 'Publishing Page',
      error: errors.publishingPage,
    },
    {
      type: <Input value={values.youtubeurl} name="youtubeurl" />,
      key: 'youtubeurl',
      label: 'Youtubeurl',
      error: errors.youtubeurl,
    },
    {
      type: <Input value={values.metaTitle} name="metaTitle" />,
      key: 'metaTitle',
      label: 'Meta title',
      error: errors.metaTitle,
    },
    {
      type: <Input value={values.metaDescription} name="metaDescription" />,
      key: 'metaDescription',
      label: 'Meta description',
      error: errors.metaDescription,
    },
    {
      type: <Input value={values.metaKeywords} name="metaKeywords" />,
      key: 'metaKeywords',
      label: 'Meta keywords',
      error: errors.metaKeywords,
    },
  ]
  const slugOptions = [
    {
      type: <Input value={values.slug} name="slug" />,
      key: 'slug',
      label: 'Slug',
      error: errors.slug,
    },
  ]
  if (!isEmpty(data)) {
    console.log('data*******', data)
    formItems = [...formItems, ...slugOptions]
  }

  if (success) return <Redirect to={LINKS.blogs} />

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
        // if (!isEmpty(data) && item.update) {
        //   console.log("data",data)
        //   return (
        //     <Form.Item
        //       key={item.key}
        //       label={item.label}
        //       validateStatus={item.error && 'error'}
        //       help={item.error}
        //     >
        //       {item.type}
        //     </Form.Item>
        //   )
        // }

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
