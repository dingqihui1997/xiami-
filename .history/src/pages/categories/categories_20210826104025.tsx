import React, { useState } from 'react'
import style from '../index.less'
import { Card, Button, Radio, Divider, message, Switch, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
const Categories = () => {
    const { Search } = Input;
    const [form] = Form.useForm();//
    let [data, setdata] = useState<any>({})
    const onSearch = (e: any) => {

    };//输入框的值
    return (
        <div>
            <Card>
                <Search placeholder="请输入分类名称，" onSearch={onSearch} style={{ width: 300 }} />
                <div className="flex">
                    <div className="flex1"></div>
                    <div className="flex1">
                        <div className={`${style.add} flex-sb`}>
                            <div className="font16 font-w7">新增分类</div>
                            <div className={`${style.upload}`}>确定</div>
                        </div>
                        <div>
                            <Form
                                form={form}
                                preserve={false}
                            >
                                <Form.Item
                                    initialValue={data && data ? data.content : ''}
                                    label="分类名称"
                                    name="title"
                                    rules={[{ required: true, message: '内容不能为空' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    initialValue={data && data ? data.content : ''}
                                    label="上级分类"
                                    name="title"
                                    rules={[{ required: true, message: '内容不能为空' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    initialValue={data && data ? data.content : ''}
                                    label="分类别名"
                                    name="title"
                                    rules={[{ required: true, message: '内容不能为空' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </Card >
        </div >
    )
}

export default Categories
