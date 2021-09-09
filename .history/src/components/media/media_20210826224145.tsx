import React from 'react'
import { Form, Input, Button, Upload } from 'antd';

const Media = () => {
    const [form] = Form.useForm();
    let onPreview = async (file: any) => {
        let src1 = file.url;
        if (!src1) {
            src1 = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
    }
    return (
        <div>
            <Form form={form} name="control-hooks">
                <Form.Item name="note" label="商品图片" rules={[{ required: true }]}>
                    <Upload
                        headers={{ Authorization: localStorage.getItem('token')! }} action="http://localhost:7001/admin/upload"
                        listType="picture-card"
                        onPreview={onPreview}

                    >
                        +点击上传图片
                    </Upload>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Media
