import React, { FC, useEffect, useRef } from 'react'
import './index.less'

interface CloseModal {
    callback: (event: React.MouseEvent<Element, MouseEvent>) => void;
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
    useEffect(() => {
        document.addEventListener('click', (e: any) => {
            callback(e)
        })
    }, [])

    return (
        <div ref={container}>
            {children}
        </div>
    )
}

export default CloseModal
