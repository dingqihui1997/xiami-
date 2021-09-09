import React, { useState, useEffect } from 'react'
import style from '../index.less'
import { Card, Button, Radio, Divider, message, Select, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
import { useSelector, useDispatch, useHistory, } from 'umi';
const Categories = () => {
    const { Search } = Input;
    const [form] = Form.useForm();//
    const { Option } = Select;
    let dispatch = useDispatch()
    let [data, setdata] = useState<any>({})
    const onSearch = (e: any) => {//搜索
    };
    let add = () => {//确定添加
        let values = form.getFieldsValue()
        console.log(values);
        if (values.name) {//添加一级分类
            dispatch({
                type: 'category/addCategory',
                payload: values
            })
            form.resetFields();
        } else { message.error('请填写分类名称') }
    }
    useEffect(() => {
        dispatch({
            type: 'category/getCategory'
        })
    }, [])
    return (
        <div>
            <Card>
                <Search placeholder="请输入分类名称，" onSearch={onSearch} style={{ width: 300 }} />
                <div className="flex">
                    <div className="flex1"></div>
                    <div className="flex1">
                        <div className={`${style.add} flex-sb`}>
                            <div className="font16 font-w7">新增分类</div>
                            <div className={`${style.upload}`} onClick={add}>确定</div>
                        </div>
                        <div className={`${style.formbox}`}>
                            <Form
                                form={form}
                                preserve={false}
                            >
                                <Form.Item className="mar-l15 mat10"
                                    label="分类名称"
                                    name="name"
                                    rules={[{ required: true, message: '内容不能为空' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="上级分类"
                                    name="title"
                                >
                                    <Select
                                        placeholder="请选择上级分类"
                                        allowClear
                                    >
                                        <Option value="male">male</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="分类别名"
                                    name="short_name"
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
