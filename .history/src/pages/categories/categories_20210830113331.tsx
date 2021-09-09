import React, { useState, useEffect } from 'react'
import style from '../index.less'
import { Card, Button, Tree, message, Select, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
import { useSelector, useDispatch, useHistory, } from 'umi';
const Categories = () => {
    let Norms = useSelector((state: any) => state.category.category)
    const { Search } = Input;
    const [form] = Form.useForm();//
    const { Option } = Select;
    const { DirectoryTree } = Tree;
    let dispatch = useDispatch()
    let [data, setdata] = useState<any>({})
    let [show, setshow] = useState<any>()
    const onSearch = (e: any) => {//搜索
        dispatch({
            type: 'category/getCategory1',
            payload: e
        })
    };
    let add = () => {//确定添加
        let values = form.getFieldsValue()
        if (values.name) {//添加一级分类
            if (values.parentId) {//有id就是添加二级分类
                dispatch({
                    type: 'category/addSecondCategory',
                    payload: values
                })
            } else {//没有id就是添加一级
                dispatch({
                    type: 'category/addCategory',
                    payload: values
                })
            }
            form.resetFields();
        } else { message.error('请填写分类名称') }
    }
    useEffect(() => {
        dispatch({
            type: 'category/getCategory1',
            payload: ''
        })
    }, [])
    let onSelect = (e: any) => {//
        setshow(e[0])
    }
    let newadd = (data: any, e: any) => {//新增
        e.stopPropagation();
        e.preventDefault()
        form.setFieldsValue({ parentId: data._id })
    }
    let del = (data: any, e: any) => {
        e.stopPropagation();
        e.preventDefault()
        dispatch({
            type: 'category/delCategory',
            payload: data._id
        })
    }
    return (
        <div>
            <Card>
                <Search placeholder="请输入分类名称，" onSearch={onSearch} style={{ width: 300 }} />
                <div className="flex mat20">
                    <div className="flex1 pad1020">
                        <DirectoryTree
                            multiple
                            onSelect={onSelect}
                            treeData={Norms && Norms.data}
                            titleRender={(data: any) => {
                                return <div className={`${style.spantitle} `} style={{ width: 700, zIndex: 999999 }}>
                                    <span> {data.title}</span>
                                    {data.isShow ?
                                        <span className={`${style.spanbox}   flex-end font-w7  margin-r20 ${show === data._id ? style.up : ''}`}>
                                            <span className="margin-r10" onClick={(e) => { newadd(data, e) }}>新增</span>
                                            <span className="margin-r10">禁用</span>
                                            {show === data._id ? <Popconfirm
                                                title="确认删除该分类吗?"
                                                onConfirm={(e) => { del(data, e) }}
                                                okText="确认"
                                                cancelText="取消"
                                            >
                                                <span onClick={(e) => {
                                                    e.stopPropagation()
                                                    e.preventDefault()
                                                }}>删除</span>
                                            </Popconfirm> : <span onClick={(e) => {
                                                e.stopPropagation()
                                                e.preventDefault()
                                            }}>删除</span>}

                                        </span>
                                        : ''}
                                </div>
                            }}
                        />
                    </div>
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
                                    name="parentId"
                                >
                                    <Select
                                        placeholder="请选择上级分类"
                                        allowClear
                                    >
                                        {Norms && Norms.data && Norms.data.map((item: any, index: number) => {
                                            return <Option value={item._id} key={index}>{item.name}</Option>
                                        })}
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
