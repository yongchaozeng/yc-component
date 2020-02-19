import React, { FC } from 'react'
import './index.less'
import Portal from 'components/select/portal'
var classNames = require('classnames');

interface Modal {
    value: boolean,
    onClick: (value:boolean) => void
}


const Modal: FC<Modal> = ({ onClick, value, children }) => {

    return (
        <Portal>
            {
                value && (
                    <div className='modal-container'>
                        <div className='modal-mask' ></div>
                        <div className='modal-warp'>
                            <div className='modal-content'>
                                {children}
                                <div className='modal-close' onClick={() => { onClick(false) }}  ></div>
                            </div>
                        </div>
                    </div>
                )
            }
        </Portal>
    )
}

export default Modal
