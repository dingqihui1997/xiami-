import React, { useEffect, useState } from 'react'
import E from 'wangeditor'
import { Form, Input, Button, Upload, Divider } from 'antd';
interface props {
    detail: (val: string) => void
    back: (num: number) => void
}
const Specifications = (props: props) => {
    let [discount, setdiscount] = useState<any>()
    let [editor, seteditor] = useState<any>()
    const [form] = Form.useForm();//
    useEffect(() => {
        if (!editor) {
            const editor1 = new E(document.getElementById('div1'))
            editor1.create()
            seteditor(editor1)
            editor1.config.onchange = function (newHtml: any) {
                discount = newHtml
                setdiscount(discount);
                form.setFieldsValue({ detail: discount })
            };
        }
    }, [])
    let back = () => {
        props.back(0)
    }
    let onFinish = () => {//完成验证
        console.log(discount);
        props.detail(discount)
    }
    return (
        <div>
            <div id="div1">
            </div>
            <div className="mat20">
                <Button className="mar15" onClick={back}>取消</Button>
                <Button type="primary" htmlType="submit">确认</Button>
            </div>

        </div>
    )
}

export default Specifications