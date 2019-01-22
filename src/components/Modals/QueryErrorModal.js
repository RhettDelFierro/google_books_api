import React, {useContext} from 'react'
import {ErrorContext} from "../../contexts"
import { Modal, Button } from 'antd';

const QueryErrorModal = () => {
  const {errors, clearErrors, setError} = useContext(ErrorContext)
  return (
    <Modal
      title={`${errors.apiErrorMessage ? 'There was an error processing your request' : 'There was an error with your query'}`}
      visible={!!errors.apiErrorMessage || !!errors.noResults}
      onOk={clearErrors}
      onCancel={clearErrors}
    >
      <p>{errors.apiErrorMessage || errors.noResults}</p>
    </Modal>
  )
}

export default QueryErrorModal