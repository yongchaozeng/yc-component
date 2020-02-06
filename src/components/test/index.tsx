import React, { MouseEvent } from "react";

class Test extends React.Component {
    constructor(props: any) {
        super(props)
    }
    componentDidMount() {
        // document.addEventListener('click', (e) => {
        //     console.log(2);
        // })
        // document.body.addEventListener('click', (e) => {
        //     console.log(3);
        // })
        document.onclick=()=>{
            console.log(2)
        }
        // document.addEventListener('click', (e) => {
        //     this.setState({
        //         showInput: false,
        //     })
        // })
    }

    // 阻止冒泡
    stopBubble(event: MouseEvent) {
        event.nativeEvent.stopImmediatePropagation() //阻止冒泡
    }
    testClick(e: MouseEvent<HTMLDivElement>) {
        this.stopBubble(e)
        console.log(1);
    }
    render() {
        return (
            <div onClick={(e) => this.testClick(e)}>测试组件</div>
        )
    }
}
export default Test