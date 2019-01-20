import React, {useEffect, useRef, useContext} from 'react'
import {Form, Icon, Input, Button} from 'antd';
import {GoogleBooksApiContext} from '../../contexts'
import {generateQueryParams, parseVolumeQuery} from '../../helpers'
import {QUERY_URL} from '../../constants'
import {either, left, right} from '../../data'

import '../../App.css';
const {Item} = Form

const handleEmpty = (field, resetFields) => { resetFields([field]) }
const suffix = (field, getFieldValue, resetFields) => getFieldValue(field)
  ? <Icon type="close-circle" onClick={() => handleEmpty(field, resetFields)}/>
  : null;


const BookForm = ({form}) => {
  const {getItems} = useContext(GoogleBooksApiContext)

  const {getFieldDecorator, getFieldValue} = form

  const checkValue = (rule, value, callback) => {
    const {author, title} = form.getFieldsValue()
    if (!author && !title) return callback('At least one input required.')
    else callback()
  }

  const handleSubmit = (event) => {
    console.log('are we submitting?')
    event.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        const url = generateQueryParams(QUERY_URL, values.title, values.author)
        console.log(url)
        const request = await getItems()(url)
          const x = request.chain(parseVolumeQuery)
        console.log(x.val())
      }
      else console.log(err)
    })
  }

  const autoFocusInt = useRef()
  useEffect(() => {
    autoFocusInt.current.focus()
  }, [])



  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Item>
        {getFieldDecorator('author', {rules: [ {validator: checkValue} ]})
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
        {getFieldDecorator('title', {rules: [{validator: checkValue}]})
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