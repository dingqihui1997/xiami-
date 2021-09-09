import React, { useEffect, useState } from 'react'
import E from 'wangeditor'
import { Form, Input, Button, Upload, Divider } from 'antd';
const Details = () => {
    let [discount, setdiscount] = useState<any>()
    let [editor, seteditor] = useState<any>()
    useEffect(() => {
        if (!editor) {
            const editor1 = new E(document.getElementById('div1'))
            editor1.create()
            seteditor(editor1)
            editor1.config.onchange = function (newHtml: any) {
                setdiscount(newHtml);
            };
        }
    }, [])
    let determine = () => {//确定
        console.log(discount);
    }
    let back = () => {

    }
    return (
        <div>
            <Form>
                <Form.Item label="商品详情" rules={[{ required: true }]}>
                    <div id="div1">
                        hh
                    </div>
                </Form.Item>
                <div className="mat20">
                    <Button className="mar15" onClick={back}>取消</Button>
                    <Button type="primary" onClick={determine}>确认</Button>
                </div>
            </Form>


        </div>
    )
}

export default Details
