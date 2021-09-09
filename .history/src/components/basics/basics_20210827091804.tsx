import React, { useState } from 'react'
import styles from '../index.css'
import { Card, TreeSelect, Select, Switch, Input, Form, Upload, Button } from 'antd';
interface props {
    data: any,
    confirm: (value: any) => void
    back: (num: number) => void
}
const basics = (props: props) => {
    const [form] = Form.useForm();//
    const { TreeNode } = TreeSelect;
    const { Option } = Select;
    const [value, setValue] = useState(undefined);
    let onPreview = async (file: any) => {//点击预览图片 
        let src1 = file.url;
        if (!src1) {
            src1 = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        // setflag(true)
        // setsrc(src1)
    }
    let onFinish = () => {//表单验证成功
        let values = form.getFieldsValue()
        props.confirm(values)
    }
    let back = () => {
        props.back(0)
        form.resetFields()
    }
    let onChange = () => {

    }
    return (
        <div className={`${styles.basics}`}>
            <Form
                form={form}
                preserve={false}
                onFinish={onFinish}
            >
                <Form.Item
                    label="商品名称"
                    name="name"
                    rules={[{ required: true, message: '商品名称为必传项' }]}
                >
                    <Input placeholder="请输入商品名称" />
                </Form.Item>
                <Form.Item
                    label="商品分类"
                    name="category"
                    rules={[{ required: true, message: '商品分类为必传项' }]}
                >
                    <TreeSelect
                        showSearch
                        style={{ width: '100%' }}
                        value={value}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="Please select"
                        allowClear
                        treeDefaultExpandAll
                        onChange={onChange}
                    >
                        {props.data && props.data.map((item: any, index: number) => {
                            return <TreeNode value={item._id} title={item.name} key={item._id}>
                                {
                                    item.list.map((item1: any, index1: number) => {
                                        return <TreeNode value={item1._id} title={item1.name} key={item1._id}></TreeNode>
                                    })
                                }

                            </TreeNode>
                        })}

                    </TreeSelect>
                    {/* <Select
                        placeholder="请选择商品分类"
                    >
                        {props.data && props.data.map((item: any, index: number) => {
                            return <Option value={item._id} key={index}>{item.name}</Option>
                        })}
                    </Select> */}
                </Form.Item>
                <Form.Item
                    label="商品原价"
                    name="originalPrice"
                    rules={[{ required: true, message: '商品原价为必传项' }]}
                >
                    <Input placeholder="请输入商品原价" />
                </Form.Item>
                <Form.Item
                    label="商品现价"
                    name="presentPrice"
                    rules={[{ required: true, message: '商品现价为必传项' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    className="mal10"
                    label="封面图"
                    name="cover"
                    rules={[{ required: true, message: '图片为必传项' }]}
                >
                    <Upload className="mal20" name="logo" headers={{ Authorization: localStorage.getItem('token')! }} action="http://localhost:7001/admin/upload" listType="picture" onPreview={onPreview}>
                        <div className={`${styles.upload}`}>点击上传图片</div>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="商品单位"
                    name="company"
                    rules={[{ required: true, message: '商品单位为必传项' }]}
                >
                    <Input placeholder="请输入商品单位" />
                </Form.Item>
                <Form.Item
                    label="商品库存"
                    name="stock"
                    rules={[{ required: true, message: '商品库存为必传项' }]}
                >
                    <Input placeholder="请输入商品库存" />
                </Form.Item>
                <Form.Item
                    label="商品简介"
                    name="introduction"
                    rules={[{ required: true, message: '商品简介为必传项' }]}
                >
                    <Input.TextArea rows={5} placeholder="请输入商品简介" />
                </Form.Item>
                <Form.Item
                    label="推荐介绍"
                    name="sellDesc"
                    rules={[{ required: true, message: '推荐介绍为必传项' }]}
                >
                    <Input.TextArea rows={5} placeholder="请输入推荐介绍" />
                </Form.Item>
                <Form.Item
                    className="mal10"
                    label="是否新品"
                    name="isNewGood"
                    valuePropName="checked"
                    initialValue
                >
                    <Switch defaultChecked></Switch>
                </Form.Item>
                <Form.Item
                    className="mal10"
                    label="是否热销"
                    name="isHot"
                    valuePropName="checked"
                    initialValue
                >
                    <Switch defaultChecked></Switch>
                </Form.Item>
                <Form.Item
                    className="mal10"
                    label="是否推荐"
                    name="isRecommend"
                    valuePropName="checked"
                    initialValue
                >
                    <Switch defaultChecked></Switch>
                </Form.Item>
                <Form.Item>
                    <Button className="mar15" onClick={back}>取消</Button>
                    <Button type="primary" htmlType="submit">确认</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default basics
