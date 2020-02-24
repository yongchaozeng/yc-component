import React, {useEffect, useImperativeHandle, forwardRef} from 'react';
import ReactDom from 'react-dom';
import './index.scss'

function Test(props) {
    let {closeModal, childrenDiv} = props;

    return (
        <div className='modal-container'>
            <div className='modal' key={childrenDiv}>
                <img src={require('../../../assets/imgs/modal-close.png')} className="close-background" onClick={() => {
                    closeModal();
                }} alt='' />
                {childrenDiv}
            </div>
        </div>
    );
}

let modalDom = null;

function Modal(props, ref) {

    let {show, close, children,} = props;
    useImperativeHandle(ref, () => ({
        closeModal: closeModal
    }));
    const closeModal = () => {
        close(false);
        let selfDom = document.querySelector('.modal-container');
        selfDom.parentElement.remove();
        document.documentElement.style.overflow = 'auto';
    };

    useEffect(() => {
        if (show) {
            modalDom = document.createElement('div');
            document.body.appendChild(modalDom);
            ReactDom.render(<Test closeModal={closeModal} show={show} childrenDiv={children}/>, modalDom);
            document.documentElement.style.overflow = 'hidden';
            setTimeout(() => {
                let node = document.querySelector('.modal-container');
                node.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                }, true);

                let node1 = document.querySelector('.log-list-box');
                if(node1){
                    node1.addEventListener('touchmove', function (e) {
                        window.event.returnValue = true;
                    }, false);
                }

            });


        }
    }, [show,]);

    return <></>;
}

export default forwardRef(Modal);
