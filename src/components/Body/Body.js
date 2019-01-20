import React, {} from 'react'
import '../../App.css';
import BookForm from './BookForm'


const Body = (props) =>
  <>
    <BookForm googleBooksApi={props.googleBooksApi}/>
  </>

export default Body