import React, { useEffect, useState } from 'react'
import E from 'wangeditor'
import { Form, Input, Button, Upload, Divider } from 'antd';
const Details = () => {
    let [discount, setdiscount] = useState<any>('')
    useEffect(() => {
        const editor = new E(document.getElementById('div1'))
        editor.create()
        editor.config.onchange = function (newHtml: any) {
            discount.value = newHtml;
        };
    }, [])
    let determine = () => {//确定

    }
    let back = () => {

    }
    return (
        <div>
            <div id="div1">

            </div>
            <Button className="mar15" onClick={back}>取消</Button>
            <Button type="primary" onClick={determine}>确认</Button>
        </div>
    )
}

export default Details
