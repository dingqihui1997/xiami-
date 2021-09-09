import React from 'react'
import { Card, Select, Button, message, Switch, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';

const Norms = () => {
    const { Option } = Select;
    let onGenderChange = (e: any) => {
        console.log(e);
    }
    return (
        <div>
            <Card>
                <Form>
                    <Form.Item style={{ width: 400 }} name="gender" label="所属模型" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select a option and change input text above"
                            onChange={onGenderChange}
                            allowClear
                        >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                            <Option value="other">other</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Norms
