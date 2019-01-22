import React, {useContext, useState} from 'react'
import {Table, Divider, Tag} from 'antd'
import {GoogleBooksApiContext} from '../../contexts'
import '../../App.css'
import {CONSTANTS} from "../../constants"

const {Column, ColumnGroup} = Table
const {TITLE, AUTHORS, CATEGORIES} = CONSTANTS

const renderCategories = openViewMore => categories =>
  categories ?
    <span>{categories.map(tag =>
      <Tag color="blue"
           key={tag}
           onClick={() => openViewMore({category: tag})}
      >
        {tag}
      </Tag>
    )}</span>
    : null

const BookTable = () => {
  const initViewMore = {
    category: ''
  }
  const {items, setItems, tableItems, setTableItems} = useContext(GoogleBooksApiContext)
  const {viewMore, setViewMore} = useState('')
  const columns = [{
    title: 'Title',
    dataIndex: TITLE,
    key: TITLE,
  }, {
    title: 'Authors',
    dataIndex: AUTHORS,
    key: AUTHORS,
    render: (authors) => {
      // TODO: Make each author a link
      if (authors && authors.length > 0) return <span href="javascript:;">{authors.join(', ')}</span>
      return null
    }
  }, {
    title: 'Categories',
    dataIndex: CATEGORIES,
    key: CATEGORIES,
    render: renderCategories(setViewMore),
  }, {
    title: 'Action',
    key: 'action',// open a link to the buy page
    render: (text, record) => (
      <span>
      <a onClick={() => window.open(`${record.buyLink}`, "_blank")}>View Book</a>
      <Divider type="vertical"/>
      <a href="javascript:;">Delete</a>
    </span>
    )
  }]
  return (
    <Table columns={columns} dataSource={tableItems}/>
  )
}

export default BookTable