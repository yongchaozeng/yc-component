import React, { FC } from 'react'
import './index.less'
var classNames = require('classnames');

interface Checkbox {
    value: boolean,
    onChange: (show: boolean) => void
}

const Checkbox: FC<Checkbox> = ({ value, onChange }) => {
    function changeShow(e: React.ChangeEvent) {
        onChange(!value)
    }
    return (
        <div className='check-box'>
            <input type='checkbox' className='check-input' checked={value} onChange={changeShow} />
            <span className='check-label' >333</span>
        </div>

    )

}

export default Checkbox
