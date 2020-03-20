import React, { FC ,useState, CSSProperties} from 'react'
import './index.less'
const classNames = require('classnames');


interface Input {
    className?:CSSProperties,
    placeholder?: string,
    close?: boolean,
    value?:string,
    type?:string,
    onChange:(e:string)  => void
}

const Input: FC<Input> = ({ placeholder = '请输入',type='text', close = true,value='',onChange }) => {


    const change = (e:React.ChangeEvent<HTMLInputElement>)=>{
        onChange(e.target.value);
    }
    const clear = ()=>{
        onChange('');
    }

    return (
        <span  className={classNames('input-container')} >
            <input value={value}  type={type} onChange={change} placeholder={placeholder} />
            <i onClick={clear} className={classNames({'input-close':close && value.length>0},'input-close-hidden')}>x</i>
        </span>

    )

}

export default Input

