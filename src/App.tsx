import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import dayjs from 'dayjs'
import jquery from 'jquery'


import Button from './components/button'
import Input from './components/input'
import Select, { SelectValue } from './components/select'
import Option from './components/select/option'
import Test from './components/test'
// import Radio from 'components/radio'
import Checkbox from 'components/checkbox'
import Animation from 'components/animation'
import Modal from 'components/modal'
import Xue from 'components/xuexi'


const App: React.FC = () => {
  let [value, setValue] = useState('')
  let [show, setShow] = useState(false)
  let [show2, setShow2] = useState(false)
  let [showModal, setShowModal] = useState(false)
  let [msg, setMsg] = useState('123')
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
  function changeCheckbox(show: boolean) {
    setShow(show)
  }
  function changeCheckbox2(show: boolean) {
    setShow2(show)
  }
  function changeModal(value: any) {
    setShowModal(value)
  }



  type DefaultValueType = {
    (a: string): number
  }
  type SrtingValue = {

  }
  type Color = {
    color: string
  }
  interface Font extends Color {
    size: number
  }
  interface StringArray {
    [index: number]: string | number
  }
  let array: StringArray = ['1', 23]
  let foo: DefaultValueType = (a: string) => {
    console.log(a)
    return 123
  }
  interface Dfa {
    color: string,
    size: number
  }

  // let foo: DefaultValueType = function (a: string) {
  //   console.log(a)
  //   return
  // }

  const Test: React.FC = (props) => <div>222</div>;

  function print() {
    console.log(777)
  }
  function changeSelect(select: SelectValue): void {
    console.log(6, select)
  }

  return (
    // <Xue />
    <>
      <Button onClick={print}  >确定</Button>
      <Select onChange={changeSelect}>
        <Option value="a">12</Option>
      </Select>
    </>
  )

  // return (
  //   <div className="App">
  //     <h1>111</h1>
  //     <Test>
  //       <h1>222</h1>
  //     </Test>
  //     <button onClick={() => { changeModal(true) }}>打开modal</button>
  //     {/* <Modal
  //       value={showModal}
  //       onClick={changeModal}
  //     >
  //       <div>
  //         <h1>{msg}</h1>
  //         <button onClick={() => { setMsg('222') }}>修改</button>
  //         <p>Some contents...</p>
  //         <p>Some contents...</p>
  //         <p>Some contents...</p>
  //       </div>
  //     </Modal> */}
  //     <Modal value={showModal} onClick={changeModal} >
  //       <>
  //         <div>{msg}</div>
  //         <button onClick={() => { setMsg('222') }}>changeMSg</button>
  //       </>
  //     </Modal>
  //     <Checkbox value={show} onChange={changeCheckbox} >点击1</Checkbox>
  //     {
  //       show && <h1>11</h1>
  //     }
  //     <Checkbox value={show2} onChange={changeCheckbox2} >点击2</Checkbox>
  //     {
  //       show2 && <h1>222</h1>
  //     }
  //     <Animation>
  //       <h1>777</h1>
  //     </Animation>
  //     <Animation>
  //       <h1>888</h1>
  //     </Animation>

  //     {/* <Test /> */}
  //     <Button onClick={(e) => { submit(e) }} >23</Button>
  //     <Input value={value} onChange={onChange} />
  //     <h1>{value}</h1>
  //     <div className='select-modal'>
  //       <h1>1111</h1>
  //       <Select onChange={optionName} key='1'>
  //         <Option value='1'>name1</Option>
  //         <Option value='2' >name2</Option>
  //         <Option value={3} >name3</Option>
  //       </Select>
  //       <h1>111</h1>
  //       <h1>111</h1>
  //       <Select onChange={optionAge} key='2' >
  //         <div>11</div>
  //         <div>12</div>
  //         <div>13</div>
  //       </Select>
  //     </div>
  //     <h1>11</h1>
  //     <h1>11</h1>
  //     <h1>11</h1>
  //     <h1>11</h1>
  //     <h1>11</h1>
  //     <h1>11</h1>
  //     <h1>11</h1>
  //     <h1>11</h1>
  //     <h1>11</h1>
  //     <h1>11</h1>
  //     <h1>11</h1>
  //     <h1>11</h1>
  //     <h1>11</h1>
  //     <h1>11</h1>
  //     <h1>11</h1>
  //     <h1>11</h1>
  //     <h1>11</h1>
  //     <h1>11</h1>
  //     <h1>11</h1>
  //     <h1>11</h1>
  //     <h1>11</h1>
  //   </div>

  // );
}

export default App;
