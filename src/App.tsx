import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import dayjs from 'dayjs'
import jquery from 'jquery'


import Button from './components/button'
import Input from './components/input'
import Select from './components/select'
import Option from './components/select/option'
import Test from './components/test'
// import Radio from 'components/radio'
import Checkbox from 'components/checkbox'


const App: React.FC = () => {
  let [value, setValue] = useState('')
  let [show, setShow] = useState(false)
  useEffect(() => {

  })
  const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(12, e)
  }

  const onChange = (e: string) => {
    setValue(e)
  }

  function optionName(value: { name: string | number, id: string | number | null }) {
    console.log(12, value)
  }
  function optionAge(value: { name: string | number, id: string | number | null }) {
    console.log(12, value)
  }
  function changeCheckbox (show:boolean){
    setShow(show)
  }

  return (
    <div className="App">
      <Checkbox value={show} onChange={changeCheckbox} />
      {
        show && <h1>11</h1>
      }
      {/* <Test /> */}
      {/* <Button onClick={(e) => { submit(e) }} >23</Button>
      <Input value={value} onChange={onChange} />
      <h1>{value}</h1>
      <div className='select-modal'>
        <h1>1111</h1>
        <Select onChange={optionName} key='1'>
          <Option value='1'>name1</Option>
          <Option value='2' >name2</Option>
          <Option value={3} >name3</Option>
        </Select>
        <h1>111</h1>
        <h1>111</h1>
        <Select onChange={optionAge} key='2' >
          <div>11</div>
          <div>12</div>
          <div>13</div>
        </Select>
      </div> */}
    </div>

  );
}

export default App;
