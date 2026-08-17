'use client';

import { useState } from 'react';

export default function ControlledFormExample () {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');


  return (
    <form>
      <label htmlFor='quote'>Quote</label>
      <input type="text" id="quote" value={quote} onChange={(e) => setQuote(e.target.value.toUpperCase())}/>

      <label htmlFor='author'>Author</label>
      <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)}/>
    </form>
  )
}