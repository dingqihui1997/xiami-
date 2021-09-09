import React, { useEffect } from 'react'
import { useSelector, useDispatch, useHistory, } from 'umi';
import { Select, Button, Checkbox, Divider, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';

const Specifi = () => {
    let Nav = useSelector((state: any) => state.Model.Model)
    let Norms = useSelector((state: any) => state.Norms.Norms)//获取规格
    let dispatch = useDispatch()
    const [form] = Form.useForm();//
    const { Option } = Select;
    let getdata = () => {//获取模型
        console.log(999);
        dispatch({
            type: 'Model/getModel',
            payload: { current: 1, pageSize: '', query: '' }
        })
    }
    let onFinish = () => {//欧克按钮
        let values = form.getFieldsValue()
    }
    useEffect(() => {
        getdata()
    }, [])
    let getnorms = (e: String) => {//获取商品规格
        dispatch({
            type: 'Norms/getNorms',
            payload: { parentId: e }
        })
    }
    let onChange = (e: string) => {//选择模型
        console.log(e);
        getnorms(e)
    }
    return (
        <div>
            <Form
                form={form}
                preserve={false}
                onFinish={onFinish}
            >
                <Form.Item
                    className="-mar-l5"
                    label="模型名称"
                    name="spec"
                    rules={[{ required: true, message: '模型名称不能为空' }]}
                >
                    <Select style={{ width: 550 }} onChange={onChange}>
                        {Nav && Nav.data && Nav.data.map((item: any, index: number) => {
                            return <Option value={item._id} key={index}>{item.name}</Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="商品规格">
                    {Norms && Norms.data && Norms.data.map((item: any, index: number) => {
                        return <div className="mal20">
                            <div className="margin-b20"><Checkbox>{item.name}</Checkbox></div>
                            {(item.spec_item.split('，')).map((item1: any, index: number) => {
                                return <Checkbox>{item1}</Checkbox>
                            })}
                            <Divider />
                        </div>
                    })}
                </Form.Item>
            </Form>
        </div>
    )
}

export default Specifi
