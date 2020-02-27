import React, { FC, useState, useEffect, ReactNode, useRef, MouseEvent } from 'react'
import Portal from './portal'
import CloseModal from 'components/closeModal'
import { isChildOf } from '@/utils'
import './index.less'
// import * as style from './index.module.less'
// import styles from 'index.module.less'
// const styles = require('./index.module.less')

var classNames = require('classnames');

export type SelectValue = {
    name: string | number,
    id: string | number | null
}

interface Select {
    parent?: string,
    key?: string,
    onChange: (SelectValuea: SelectValue) => void
}


const Select: FC<Select> = ({ children, onChange }) => {
    const container:any = useRef(null);
    const [top, setTop] = useState(0)
    const [show, setShow] = useState(false)
    const [value, setValue] = useState('请选择')

    // 滚动条计算位置
    useEffect(() => {
        document.addEventListener('scroll', () => {
            distance(container.current)
        })
        return (
            document.removeEventListener('scroll', () => {
                distance(container.current)
            })
        )
    }, [])


    const distance = (target: any) => {
        // let dom: HTMLDivElement | null = document.querySelector('.select-container')
        if (target && isChildOf(target, container.current)) {
            setTop(target.parentNode.getBoundingClientRect().bottom + document.documentElement.scrollTop)
            console.log(target.parentNode.getBoundingClientRect())
        }
    }
    const openDropdown: ((event: React.MouseEvent<HTMLDivElement>) => void) = (e: any) => {
        //     distance(e.target)
        //     // setShow(true) // 选择之后不关闭弹窗
        //     if (isChildOf(e.target, container.current)) {
        //         setShow(!show)
        //     }
        console.log(12,container)
    }

    const closeModal = () => {
        setShow(false)
    }

    function getValue(e: MouseEvent<HTMLDivElement>) {
        // let tagget: HTMLDivElement = (e.target as HTMLDivElement)
        // // console.log(1, (e.target as HTMLDivElement).innerText)
        // // console.log(1, (e.target as HTMLDivElement).getAttribute('data-value'))
        // if (tagget && tagget.getAttribute('data-value')) {
        //     setValue(tagget.innerText)
        //     onChange({ name: tagget.innerText, id: tagget.getAttribute('data-value') })
        //     setShow(false)
        // }
        // // setValue(tagget.innerText)

    }
    return (

        <div className={'select-container'}  onClick={openDropdown} >
            <CloseModal refs={container} callback={() => { closeModal() }}>
                <div className='select-value'>{value}</div>
                <i className='select-arrow' >click</i>


                <Portal  >
                    <div className={classNames('select-dropdown-menu', [{ 'select-open-animation': show }])} onClick={getValue} style={{ top: top }}>
                        {children}
                    </div>
                </Portal>

            </CloseModal>
        </div>
    )
}

export default Select
