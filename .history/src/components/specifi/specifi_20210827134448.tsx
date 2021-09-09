import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, useHistory, } from 'umi';
import { Select, Button, Checkbox, Divider, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';

const Specifi = () => {
    let Nav = useSelector((state: any) => state.Model.Model)
    let Norms = useSelector((state: any) => state.Norms.Norms)//获取规格
    let dispatch = useDispatch()
    let [chekedlist, setchekedlist] = useState<any[]>()
    const [form] = Form.useForm();//
    let [checked, setchecked] = useState(false)
    const { Option } = Select;
    const CheckboxGroup = Checkbox.Group;
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
    let onChange = (e: any) => {//选择模型
        console.log(e);
        getnorms(e)
    }
    let back = () => {//取消
    }
    let choice = (item: any, e: any) => {//规格大类
        console.log(item, e);
        setchecked(e.target.checked)
        console.log(checked);
        if (checked) {
            setchekedlist(e.target.checked ? item.spec_item.split('，') : []);
        }
    }
    let choice1 = (item: any, e: any) => {//规格项
        console.log(item, e);
    }
    return (
        <div>
            <Form
                form={form}
                preserve={false}
                onFinish={onFinish}
            >
                <Form.Item
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
                <Form.Item label="商品规格" className="mal10">
                    {Norms && Norms.data && Norms.data.length && Norms.data.map((item: any, index: number) => {
                        return <div className="mal20" key={index}>
                            <div className="margin-b20"><Checkbox checked={checked} onChange={(e) => choice(item, e)}>{item.name}</Checkbox></div>
                            <CheckboxGroup value={chekedlist} options={item.spec_item.split('，')} onChange={(e) => choice1(item, e)} />
                            <Divider />
                        </div>
                    })}
                </Form.Item>
                <Button className="mar15" onClick={back}>取消</Button>
                <Button type="primary" htmlType="submit">确认</Button>
            </Form>
        </div>
    )
}

export default Specifi
