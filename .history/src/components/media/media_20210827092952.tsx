import React from 'react'
import { Form, Input, Button, Upload, Divider } from 'antd';
interface props {
    media: (vaule: any) => void
}

const Media = () => {
    const [form] = Form.useForm();
    const onPreview = async (file: any) => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow && document.write(image.outerHTML);
    };

    let onChange = (file: any) => {
        console.log(file);
        // console.log(vaule);
        form.setFieldsValue({ pic: file.fileList })
    }
    let back = () => {//取消

    }
    let onFinish = () => {//验证通过
        console.log(8888);
        let vaule = form.getFieldsValue()

    }
    return (
        <div>
            <Form form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item name="pic" label="商品图片" rules={[{ required: true, message: '图片为必传项' }]}>
                    <Upload
                        headers={{ Authorization: localStorage.getItem('token')! }} action="http://localhost:7001/admin/upload"
                        listType="picture-card"
                        onPreview={onPreview}
                        onChange={onChange}
                    >
                        +点击上传图片
                    </Upload>
                </Form.Item>
                <Divider />
                <Button className="mar15" onClick={back}>取消</Button>
                <Button type="primary" htmlType="submit">确认</Button>
            </Form>
        </div>
    )
}

export default Media
