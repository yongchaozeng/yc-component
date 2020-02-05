import React, { FC ,useState} from 'react'
import './index.less'
const classNames = require('classnames');


interface Input {
    placeholder?: string,
    close?: boolean,
    value?:string,
    onChange:(e:string)  => void
}

const Input: FC<Input> = ({ placeholder = '请输入', close = true,value='',onChange }) => {


    const change = (e:React.ChangeEvent<HTMLInputElement>)=>{
        onChange(e.target.value);
    }
    const clear = ()=>{
        onChange('');
    }

    return (
        <span className='input-container'>
            <input value={value}  type="text" onChange={change} placeholder={placeholder} />
            <i onClick={clear} className={classNames({'input-close':close && value.length>0},'input-close-hidden')}>x</i>
        </span>

    )

}

export default Input

