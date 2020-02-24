import React, {useEffect, useImperativeHandle, forwardRef} from 'react';
import './index.scss';


function Test(props) {
    let {closeModal, childrenDiv} = props;

    return (
        <div className='m-modal-container'>
            <div className='modal' key={childrenDiv}>
                <div className="close-background" onClick={() => {
                    closeModal();
                }}>
                    <img className='close-icon' src={require('../../../assets/imgs/modal-close.png')} alt=""/>
                </div>
                {childrenDiv}
            </div>
        </div>
    );
}

// let modalDom = null;

function Modal(props, ref) {

    let {show, close, children,} = props;
    useImperativeHandle(ref, () => ({
        closeModal: closeModal
    }));
    const closeModal = () => {
        close(false);
        // let selfDom = document.querySelector('.m-modal-container');
        // selfDom.parentElement.remove();
        // document.documentElement.style.overflow = 'auto';
    };

    useEffect(() => {
        if (show) {
            // modalDom = document.createElement('div');
            // document.body.appendChild(modalDom);
            // ReactDom.render(<Test closeModal={closeModal} show={show} childrenDiv={children}/>, modalDom);
            // document.documentElement.style.overflow = 'hidden';

            // setTimeout(() => {
            //     let node = document.querySelector('.m-modal-container');
            //     if (node) {
            //         node.addEventListener('touchmove', function (e) {
            //             e.preventDefault();
            //         }, true);
            //     }
            //
            //     let node1 = document.querySelector('.log-list-box');
            //     if(node1){
            //         node1.addEventListener('touchmove', function (e) {
            //             window.event.returnValue = true;
            //         }, false);
            //     }
            // });


        }
    }, [show,]);

    return <>
        {show && <Test closeModal={closeModal} show={show} childrenDiv={children}/>}
    </>;
}

export default forwardRef(Modal);
