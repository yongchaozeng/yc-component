import React, { FC } from 'react'
import './index.less'
var classNames = require('classnames');

interface Option {
    value: any,
  
}



const Option: FC<Option> = ({ children, value = children }) => {

    // const getValue = ()=>{
    //     value
    // }

    return (
        <div className='option-box' data-value={value} >{children}</div>
    )

}

export default Option
