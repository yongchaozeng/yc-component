import React, { FC, useState, useEffect, ReactNode ,useRef} from 'react'
import ReactDOM from 'react-dom';
import './index.less'
import Portal from './portal'

var classNames = require('classnames');

interface Select {
    parent?: '',
}

let dropdown = ''

const Select: FC<Select> = (props) => {
    const container = useRef(null);
    const [top, setTop] = useState(0)
    const [show, setShow] = useState(false)

    useEffect(() => {
        document.onscroll = () => {
            // distance()
        }
        document.body.onclick = ((e) => {
            let dom = document.querySelector('.select-dropdown-menu')
            let container = document.querySelector('.select-container')
            console.log(111, dropdown)
            console.log(22, e.target)
            // if (!isChildOf(e.target, dropdown)) {
            //     setShow(false)
            // }
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
        if (target) {
            setTop(target.parentNode.getBoundingClientRect().bottom)
        }
    }
    const openDropdown: ((event: React.MouseEvent<HTMLDivElement>) => void) = (e: any) => {
        // e.stopPropagation()
        dropdown = e.target.parentNode

        console.log(33)
        distance(e.target)
        setShow(!show)
    }
    return (
        <div className={'select-container'} ref={container} onClick={openDropdown} >
            <div className='select-value'>123</div>
            <i className='select-arrow' >click</i>
            {
                (
                    show && <Portal  >
                        <div onClick={(e) => { e.stopPropagation() }} className='select-dropdown-menu' style={{ top: top }}>
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
