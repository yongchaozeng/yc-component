import React, { FC, useState, useEffect } from 'react'
import './index.less'
var classNames = require('classnames');

interface Test {

}

const Test: FC<Test> = (props) => {
    const [show, setShow] = useState(false)
    useEffect(() => {
        document.body.addEventListener('click', (e) => {
            console.log(3);
        })
        document.addEventListener('click', (e) => {
            setShow(false)
            
            console.log(2);
        })

    }, [])


    const testClick = (event: React.MouseEvent<HTMLDivElement>) => {
        // event.nativeEvent.stopPropagation()
        event.nativeEvent.stopImmediatePropagation()
        event.nativeEvent.stopPropagation()

        console.log(1,event.target)
        setShow(true)
    }
    return (
        <>
            <div onClick={testClick} >测试组件</div>

            {
                show && <h1>11</h1>
            }
        </>


    )

}

export default Test
