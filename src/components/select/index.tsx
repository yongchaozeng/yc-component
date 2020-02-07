import React, { FC, useState, useEffect, ReactNode, useRef, MouseEvent } from 'react'
import Portal from './portal'
import CloseModal from 'components/closeModal'
import { isChildOf } from '@/utils'
import './index.less'
// import * as style from './index.module.less'
// import styles from 'index.module.less'
// const styles = require('./index.module.less')

var classNames = require('classnames');

type SelectValue = {
    name: string | number,
    id: string | number | null
}

interface Select {
    parent?: string,
    key?: string,
    onChange: (SelectValuea: SelectValue) => void
}


const Select: FC<Select> = ({ children, onChange }) => {
    const container = useRef(null);
    const [top, setTop] = useState(0)
    const [show, setShow] = useState(false)
    const [value, setValue] = useState('请选择')

    useEffect(() => {
        // document.onscroll = () => {
        //     distance(container.current)
        // }
    }, [])


    const distance = (target: any) => {
        // let dom: HTMLDivElement | null = document.querySelector('.select-container')
        if (target && isChildOf(target, container.current)) {
            setTop(target.parentNode.getBoundingClientRect().bottom)
            console.log(target.parentNode.getBoundingClientRect())
        }
    }
    const openDropdown: ((event: React.MouseEvent<HTMLDivElement>) => void) = (e: any) => {
        distance(e.target)
        // setShow(true) // 选择之后不关闭弹窗
        if (isChildOf(e.target, container.current)) {
            setShow(!show)
        }
    }

    const closeModal = (e: MouseEvent) => {
        if (!isChildOf(e.target, container.current)) {
            setShow(false)
        }
    }

    function getValue(e: MouseEvent<HTMLDivElement>) {
        let tagget: HTMLDivElement = (e.target as HTMLDivElement)
        // console.log(1, (e.target as HTMLDivElement).innerText)
        // console.log(1, (e.target as HTMLDivElement).getAttribute('data-value'))
        console.log(3)
        if (tagget && tagget.getAttribute('data-value')) {
            setValue(tagget.innerText)
            onChange({ name: tagget.innerText, id: tagget.getAttribute('data-value') })
            setShow(false)
        }
        // setValue(tagget.innerText)

    }
    return (
        <CloseModal callback={(e: MouseEvent) => { closeModal(e) }}>
            <div className={'select-container'} ref={container} onClick={openDropdown} >
                <div className='select-value'>{value}</div>
                <i className='select-arrow' >click</i>
                {
                    (
                        show && <Portal  >
                            <div className='select-dropdown-menu' onClick={getValue} style={{ top: top }}>
                                {children}
                            </div>
                        </Portal>
                    )
                }
            </div>
        </CloseModal>
    )
}

export default Select
