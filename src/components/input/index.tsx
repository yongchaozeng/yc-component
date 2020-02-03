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

    let [closeShow,setCloseShow] = useState(false)

    // const setValue =(value:string)=>{
    //     onChange(value);
    // } 
    const change = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
        onChange(e.target.value);
        // setValue(e.target.value)
        // onChange((e.target as HTMLTextAreaElement).value);
    //     if((e.target as HTMLTextAreaElement).value.length>0){ 
    //         setCloseShow(true)
    //     }else{
    //         setCloseShow(false)
    //     }
         
    }

    const clear = ()=>{
        onChange('');
        // setValue('')
        // console.log(11);
        // (e.target as HTMLTextAreaElement).value = ''
    }

    return (
        <span className='input-container'>
            <input value={value}  type="text" onChange={change} placeholder={placeholder} />
            <i onClick={clear} className={classNames({'input-close':close && value.length>0},'input-close-hidden')}>x</i>
        </span>

    )

}

export default Input
