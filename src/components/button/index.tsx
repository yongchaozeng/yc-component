import React, {FC} from 'react'
import './index.less'
const classNames = require('classnames');

interface Button {
    children?:React.ReactNode,
    onClick?:React.ReactEventHandler
}

let buttonClass = classNames('button-container')

const Button: FC<Button> = ({children='确定',onClick}) => {
    return (
        <button onClick={onClick} className={buttonClass}>
            <span>{children}</span>
        </button>
    )

}

export default Button
