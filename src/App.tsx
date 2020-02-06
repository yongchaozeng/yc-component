import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import dayjs from 'dayjs'
import jquery from 'jquery'


import Button from './components/button'
import Input from './components/input'
import Select from './components/select'
import Test from './components/test'

const App: React.FC = () => {
  let [value, setValue] = useState('')
  useEffect(() => {

  })
  const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(12, e)
  }

  const onChange = (e: string) => {
    setValue(e)
  }
  return (
    <div className="App">
      {/* <Test /> */}
      <Button onClick={(e) => { submit(e) }} >23</Button>
      <Input value={value} onChange={onChange} />
      <h1>{value}</h1>
      <div className='select-modal'>
        <h1>1111</h1>
        <Select key='1'></Select>
        <h1>111</h1>
        <h1>111</h1>
        <Select key='2' ></Select>
      </div>
    </div>

  );
}

export default App;
