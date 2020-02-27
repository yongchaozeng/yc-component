import React, { FC, useEffect, useRef, useState } from 'react'
import './index.less'

interface CloseModal {
    callback: () => void;
    refs:any
}

function isChildOf(child: React.ReactNode, parent: React.ReactNode) {
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

const CloseModal: FC<CloseModal> = ({ children, callback }) => {
    const container = useRef(null);
    let [show, setShow] = useState<boolean>(false)
    useEffect(() => {
        document.addEventListener('click', (e: any) => {

            if (!isChildOf(e.target, container.current)) {
                callback()
            }
        })
    }, [])

    const openDropdown: ((event: React.MouseEvent<HTMLDivElement>) => void) = (e: any) => {
        // setShow(true) // 选择之后不关闭弹窗
        if (isChildOf(e.target, container.current)) {
            setShow(!show)
        }
    }

    return (
        <>
            {show && <div >
                {children}
            </div>}
        </>
    )
}

export default CloseModal
