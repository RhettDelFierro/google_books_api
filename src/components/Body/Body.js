import React, {} from 'react'
import '../../App.css';
import BookForm from './BookForm'


const Body = (props) =>
  <>
    {console.log(props)}
    <BookForm googleBooksApi={props.googleBooksApi}/>
  </>

export default Body