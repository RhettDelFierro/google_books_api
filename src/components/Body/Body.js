import React, {useEffect, useState, useRef} from 'react'
import {Form, Icon, Input, Button} from 'antd';
import '../../App.css';
const {Item} = Form


const Body = ({form}) => {
  const {getFieldDecorator, getFieldValue} = form

  const handleSubmit = (event) => {
    event.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        console.log('received values of form: ', values)
      }
    })
  }

  const handleAuthorEmpty = () => { form.resetFields(['author']) }
  const handleTitleEmpty = () => { form.resetFields(['title']) }


  const autoFocusInt = useRef()
  useEffect(() => {
    autoFocusInt.current.focus()
  }, [])

  const checkValue = (rule, value, callback) => {
    const {author, title} = form.getFieldsValue()
    console.log(author, title)
    if (!author && !title)
        return callback('At least one input required.')
    else callback()
  }

  const authorSuffix = getFieldValue('author') ? <Icon type="close-circle" onClick={handleAuthorEmpty}/> : null;
  const titleSuffix = getFieldValue('title') ? <Icon type="close-circle" onClick={handleTitleEmpty}/> : null;

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Item>
        {getFieldDecorator('author', {rules: [ {validator: checkValue} ]})
        (
          <Input
            placeholder="Enter an author"
            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
            suffix={authorSuffix}
            ref={autoFocusInt}
          />
        )}
      </Item>
      <Item>
        {getFieldDecorator('title', {rules: [{validator: checkValue}]})
        (
          <Input
            placeholder="Enter a title"
            prefix={<Icon type="book" style={{color: 'rgba(0,0,0,.25)'}}/>}
            suffix={titleSuffix}
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

export default Form.create()(Body)