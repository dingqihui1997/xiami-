import React, { useEffect } from 'react'
import { useSelector, useDispatch, useHistory, } from 'umi';
import { Select, Button, message, Switch, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';

const Specifi = () => {
    let Nav = useSelector((state: any) => state.Model.Model)
    let Norms = useSelector((state: any) => state.Norms.Norms)//获取规格
    let dispatch = useDispatch()
    const [form] = Form.useForm();//
    const { Option } = Select;
    let getdata = () => {
        console.log(999);
        dispatch({
            type: 'Model/getModel',
            payload: { current: 1, pageSize: 5, query: '' }
        })
    }
    let onFinish = () => {//欧克按钮
        let values = form.getFieldsValue()
    }
    useEffect(() => {
        getdata()
    }, [])
    let onChange = (e: string) => {//获取商品规格

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
                        {Nav.data.map((item: any, index: number) => {
                            return <Option value={item._id} key={index}>{item.name}</Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="商品规格">

                </Form.Item>
            </Form>
        </div>
    )
}

export default Specifi
