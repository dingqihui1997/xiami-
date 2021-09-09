import React, { useEffect, useState } from 'react'
import E from 'wangeditor'
import { Form, Input, Button, Upload, Divider } from 'antd';
const Details = () => {
    let [discount, setdiscount] = useState<any>()
    let [editor, seteditor] = useState<any>()
    const [form] = Form.useForm();//
    useEffect(() => {
        if (!editor) {
            const editor1 = new E(document.getElementById('div1'))
            editor1.create()
            seteditor(editor1)
            editor1.config.onchange = function (newHtml: any) {
                setdiscount(newHtml);
                form.setFieldsValue({ detail: discount })
            };
        }
    }, [])
    let back = () => {

    }
    let onFinish = () => {//完成验证
        console.log(discount);

    }
    return (
        <div>
            <Form onFinish={onFinish} form={form}>
                <Form.Item name="detail" label="商品详情" rules={[{ required: true }]} initialValue={discount}>
                    <div id="div1">
                    </div>
                </Form.Item>
                <Form.Item>
                    <div className="mat20">
                        <Button className="mar15" onClick={back}>取消</Button>
                        <Button type="primary" htmlType="submit">确认</Button>
                    </div>
                </Form.Item>

            </Form>


        </div>
    )
}

export default Details
