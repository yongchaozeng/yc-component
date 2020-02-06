import React, { FC, useState, useEffect, ReactNode, useRef, MouseEvent } from 'react'
import Portal from './portal'
import CloseModal from 'components/closeModal'
import './index.less'

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
        distance(e.target)
        setShow(true)
        if (isChildOf(e.target, container.current)) {
            setShow(!show)
        }
    }

    const closeModal = (e: MouseEvent) => {
        if (!isChildOf(e.target, container.current)) {
            // console.log(12)
            setShow(false)
        }
    }
    return (
        <CloseModal callback={(e: MouseEvent) => { closeModal(e) }}>
            <div className={'select-container'} ref={container} onClick={openDropdown} >
                <div className='select-value'>123</div>
                <i className='select-arrow' >click</i>
                {
                    (
                        show && <Portal  >
                            <div className='select-dropdown-menu' style={{ top: top }}>
                                <div>1</div>
                                <div>2</div>
                                <div>3</div>
                            </div>
                        </Portal>
                    )
                }
            </div>
        </CloseModal>
    )
}

export default Select
