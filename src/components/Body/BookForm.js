import React, {useEffect, useRef, useContext} from 'react'
import {Form, Icon, Input, Button} from 'antd';
import {ErrorContext, GoogleBooksApiContext} from '../../contexts'
import {QUERY_URL} from '../../constants'
import {generateQueryParams} from '../../helpers'

import '../../App.css';
const {Item} = Form

const handleEmpty = (field, resetFields) => { resetFields([field]) }
const suffix = (field, getFieldValue, resetFields) => getFieldValue(field)
  ? <Icon type="close-circle" onClick={() => handleEmpty(field, resetFields)}/>
  : null;


const BookForm = ({form}) => {
  const {getItems} = useContext(GoogleBooksApiContext)
  const {errors, clearErrors, setError} = useContext(ErrorContext)

  const {getFieldDecorator, getFieldValue} = form

  const checkValue = (rule, value, callback) => {
    const {author, title} = form.getFieldsValue()
    if (!author && !title) return callback('At least one input required.')
    else callback()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    form.validateFields(async (err, values) => {
      if (err) {return}
      const url = generateQueryParams(QUERY_URL, values.title, values.author)
      await getItems(url)
    })
  }

  const autoFocusInt = useRef()
  useEffect(() => {
    autoFocusInt.current.focus()
  }, [])



  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Item>
        {getFieldDecorator('author', {rules: [ {initialValue: ''}, {validator: checkValue} ]})
        (
          <Input
            placeholder="Enter an author"
            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
            suffix={suffix('author', getFieldValue, form.resetFields)}
            ref={autoFocusInt}
          />
        )}
      </Item>
      <Item>
        {getFieldDecorator('title', {rules: [{initialValue: ''}, {validator: checkValue}]})
        (
          <Input
            placeholder="Enter a title"
            prefix={<Icon type="book" style={{color: 'rgba(0,0,0,.25)'}}/>}
            suffix={suffix('title', getFieldValue, form.resetFields)}
            ref={autoFocusInt}
          />
        )}
      </Item>
      <Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Item>
    </Form>
  )
}

export default Form.create()(BookForm)