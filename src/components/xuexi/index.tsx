import React, { FC, useRef } from 'react'
import './index.less'
import schema from 'async-validator';
var classNames = require('classnames');

interface Name {
    type: string,
    required: boolean,
    validator: (rule: string, value: string) => void
}
interface Age {
    type: string,
    asyncValidator: (rule: string, value: number) => void
}


interface Descriptor {
    // name: {
    // type: string;
    // required: boolean;
    // validator: (rule: string, value: string) => boolean;
    // };
    // age: {
    //     type: string;
    //     asyncValidator: (rule: string, value: number) => Promise<unknown>;
    // };
}
const descriptor: any = {
    name: {
        type: "string",
        required: true,
        validator: (rule: string, value: string) => value === 'muji',
    },
    age: {
        type: "number",
        asyncValidator: (rule: string, value: number) => {
            return new Promise((resolve, reject) => {
                if (value < 18) {
                    reject("too young");  // reject with error message
                } else {
                    resolve();
                }
            });
        }
    }
};
interface ValidateOption {

}
const ValidateOption: ValidateOption = (errors: any, fields: any): void => {

    if (errors) {

        // validation failed, errors is an array of all errors
        // fields is an object keyed by field name with an array of
        // errors per field
        // return handleErrors(errors, fields);
    }
    console.log(11,errors,fields)

    // validation passed
}
var validator = new schema(descriptor);
validator.validate({ name: "muji3" }, ValidateOption);



interface Xue {

}

// const Xue: FC<Xue> = (props) => {
//     let inputNode: any = <input />;
//     const {
//         ref: originRef,
//         props: {
//             onKeyDown: onOriginKeyDown,
//             onChange: onOriginChange,
//             onMouseDown: onOriginMouseDown,
//             style,
//         },
//     } = inputNode;
//     const b = React.cloneElement(inputNode, { haha: 'ha' })

//     // const FancyButton: any = React.forwardRef<HTMLButtonElement>((props, ref) => (
//     //     <button  className="FancyButton">
//     //         {props.children}
//     //     </button>
//     // ));
//     interface A {
//         ref: any
//     }
//     const FancyButton: FC<A> = ((props,ref) => {

//         return (
//             <button ref={ref} className="FancyButton">
//                 {props.children}
//             </button>
//         )
//     });
//     let ref: any = React.createRef();
//     const printInfo = () => {
//         console.log(7, ref)
//     }
//     return (
//         <>
//             <FancyButton ref={ref} >336</FancyButton>
//             <div onClick={printInfo}>222</div>
//             {inputNode}
//             {b}
//         </>
//     )

// }
interface Sun {
    ref: any
}
const Sun = React.forwardRef<HTMLInputElement>((props, ref) => {
    return (
        <>
            <h1>112</h1>
            <input ref={ref} type="text" />
        </>
    )
})

const Xue = () => {
    const ref = useRef(null)
    const print = () => {
        console.log(1, ref)
    }
    return (
        <>
            <Sun ref={ref} />
            <h1 onClick={print}>123</h1>
            {/* <input type="text" ref={ref} /> */}
        </>
    )
}

export default Xue
