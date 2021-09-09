import React from 'react'
import { Form, Input, Button, Select } from 'antd';

const Media = () => {
    const [form] = Form.useForm();
    return (
        <div>
            <Form form={form} name="control-hooks">
                <Form.Item name="note" label="Note" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </Form>
        </div>
    )
}

export default Media
