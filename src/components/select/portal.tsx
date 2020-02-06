import React, { FC, useEffect } from 'react'
import ReactDOM from 'react-dom';

interface Portal {
    parent?: ''
}

const Portal: FC<Portal> = ({ children }) => {
    // let body: Element|null = document.querySelector('body')
    // if (dom) {
    //     body = document.querySelector(dom)
    // } 
    let body: HTMLBodyElement | null = document.querySelector('body');



    // let container: HTMLDivElement | null = dom ? document.querySelector(dom) : null


    //     divElment.setAttribute('class', 'select-dropdown-menu')
    //     // if (container) {
    //     //     divElment.style.position = `absolute`
    //     //     divElment.style.top = `${container.offsetTop + container.offsetHeight}px`
    //     // }else{
    //     divElment.style.top=`${top}px`
    //     // }
    const stopImmediatePropagation = (e: any): void => {
        e.nativeEvent.stopImmediatePropagation()
    }
    return (<div onClick={stopImmediatePropagation}>
        {body && ReactDOM.createPortal(children, body)}
    </div >
    )



}

export default Portal
