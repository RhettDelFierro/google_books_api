import React, {useContext} from 'react'
import {ErrorContext, GoogleBooksApiContext} from "../../contexts"
import {Modal, Button, Table, Divider, Tag} from 'antd';

const ViewMoreResultsModal = () => {
  const {errors, clearErrors, setError} = useContext(ErrorContext)
  const {viewMoreItems, setViewMoreItems} = useContext(GoogleBooksApiContext)

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
    <Modal
      title={`More results`}
      visible={viewMoreItems && viewMoreItems.length > 0}
      onOk={() => setViewMoreItems([])}
      onCancel={() => setViewMoreItems([])}
    >
      <Table columns={columns} dataSource={viewMoreItems}/>
    </Modal>
  )
}

export default ViewMoreResultsModal