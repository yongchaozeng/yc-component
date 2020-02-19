import React, { FC } from 'react'
import input from 'components/input'
import './index.less'
var classNames = require('classnames');


interface Checkbox {
    value: boolean,
    onChange: (show: boolean) => void
}

const Checkbox: FC<Checkbox> = ({ value, onChange,children }) => {
    function changeShow(e: React.MouseEvent) {
        onChange(!value)
    }
    return (
        <div className='check-box' onClick={changeShow}>
            {
                value
                    ? <span className='checkbox-inner' />
                    : <span className='checkbox-cancel' />
            }
            {/* <input type='checkbox' defaultChecked  className='checkbox'  /> */}
            <span className='checkbox-text' >{children}</span>
        </div>
    
    )

}

export default Checkbox
