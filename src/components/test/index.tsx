import React, { MouseEvent } from "react";
import path from 'path'
import CloseModal from 'components/closeModal'

class Test extends React.Component {

    constructor(props: any) {
        super(props)
    }
    componentDidMount() {

    }

    // 阻止冒泡
    stopBubble(event: MouseEvent) {
        event.nativeEvent.stopImmediatePropagation() //阻止冒泡
    }
    testClick(e: MouseEvent<HTMLDivElement>) {
        // this.stopBubble(e)
        console.log(12);
    }
    render() {
        return (
            <>
                {/* <CloseModal >
                    <div onClick={(e) => this.testClick(e)}>测试组件</div>
                </CloseModal> */}
            </>
        )
    }
}
export default Test