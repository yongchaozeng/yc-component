import React, { FC, useEffect, useRef } from 'react'
import './index.less'
var classNames = require('classnames');

interface Animation {

}
function isInViewPortOfTwo(el: any) {
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    const top = el.getBoundingClientRect() && el.getBoundingClientRect().top
    return top <= viewPortHeight
}

const Animation: FC<Animation> = ({ children }) => {
    let ref = useRef(null)
    useEffect(() => {
        let animation: any = ref.current
        document.addEventListener('scroll', () => {
            if (isInViewPortOfTwo(animation)) {
                animation.style.opacity = 1
                animation.style.transform = 'translateY(0px)'
            }

        })

    })
    return (
        <div className='animation' ref={ref}>
            {children}
        </div>
    )

}

export default Animation
