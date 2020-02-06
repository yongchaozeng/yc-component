import React, { FC, useState, useEffect, ReactNode, useRef, MouseEvent } from 'react'
import { findDOMNode } from 'react-dom'
import ReactDOM from 'react-dom';
import './index.less'
import Portal from './portal'

var classNames = require('classnames');

interface Select {
    parent?: string,
    key?: string,
}


const Select: FC<Select> = (props: Select) => {
    const container = useRef(null);
    const [top, setTop] = useState(0)
    const [show, setShow] = useState(false)

    useEffect(() => {
        document.onscroll = () => {
            // distance()
        }
        // document.body.onclick = ((e) => {
        // let dom = document.querySelector('.select-dropdown-menu')
        // // let container = document.querySelector('.select-container')
        // // console.log(111, dropdown)
        // // findDOMNode
        // console.log(22, e.target)
        // console.log(33,container.current)

        // if (!isChildOf(e.target, container.current)) {
        //     console.log(12)
        // setShow(false)
        // }
        // console.log(2,container.current)
        // })

        document.addEventListener('click', (e) => {
            // console.log(2, container.current)
            if (!isChildOf(e.target, container.current)) {
                // console.log(12)
                setShow(false)
            }
            // console.log(2)
            // setShow(false)
        })
    }, [])
    function isChildOf(child: ReactNode, parent: ReactNode) {
        var parentNode;
        if (child && parent) {
            parentNode = (child as HTMLElement).parentNode;
            while (parentNode) {
                if (parent === parentNode) {
                    return true;
                }
                parentNode = parentNode.parentNode;
            }
        }
        return false;
    }

    const distance = (target: any) => {
        // let dom: HTMLDivElement | null = document.querySelector('.select-container')
        if (target && top === 0) {
            setTop(target.parentNode.getBoundingClientRect().bottom)
        }
    }
    const openDropdown: ((event: React.MouseEvent<HTMLDivElement>) => void) = (e: any) => {
        // e.stopPropagation()
        // e.nativeEvent.stopImmediatePropagation()
        console.log(1, container.current)
        console.log(2, e.target)
      
        distance(e.target)
        setShow(true)
        if (isChildOf(e.target, container.current)) {
            // e.nativeEvent.stopImmediatePropagation()
            // console.log(12)
            setShow(!show)
        }
    }
    const clickDropdown = (e: MouseEvent) => {
        e.nativeEvent.stopImmediatePropagation()
    }
    return (
        <div className={'select-container'} ref={container} onClick={openDropdown} >
            <div className='select-value'>123</div>
            <i className='select-arrow' >click</i>
            {
                (
                    show && <Portal  >
                        <div className='select-dropdown-menu' onClick={clickDropdown} style={{ top: top }}>
                            <div>1</div>
                            <div>2</div>
                            <div>3</div>
                        </div>
                    </Portal>
                )
            }

        </div>

    )




}

export default Select
