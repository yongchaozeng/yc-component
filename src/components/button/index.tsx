import React, { FC } from 'react'
import './index.less'

const classNames = require('classnames');

interface Button {
    // children?:React.ReactNode, FC已定义
    // onClick?:React.ReactEventHandler
    // ref: React.MutableRefObject<null>,
    onClick?: (event: React.MouseEvent) => void;
    disabled?: boolean
}



const Button: FC<Button> = ({ children = '确定', onClick, disabled = false }) => {
    let buttonClass = classNames([
        { 'button-container': true },
        { 'primary-container': !disabled },
        { 'disabled-container': disabled }
    ])
    // console.log(12, <button onClick={onClick} className={buttonClass}>
    //     <span>{children}</span>
    // </button>)
    function handel(e: React.MouseEvent) {
        if (disabled) {
            return
        }
        if (onClick) {
            onClick(e)
        }
    }
    return (
        <button onClick={(e: React.MouseEvent) => { handel(e) }} className={buttonClass}>
            <span>{children}</span>
        </button>
        // React.createElement("div", null, React.createElement("div", {
        //     className: "profile"
        // }), React.createElement('h1', null, '123'))

    )

}
export default Button
