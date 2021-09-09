import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, useHistory, } from 'umi';
import { Select, Button, Checkbox, Divider, Input, Form, Tag, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
interface props {
    spec: (val: any, spec: string[]) => void
}
const Specifi = (props: props) => {
    let Nav = useSelector((state: any) => state.Model.Model)
    let Norms = useSelector((state: any) => state.Norms.Norms)//获取规格
    let dispatch = useDispatch()
    const [form] = Form.useForm();//
    const { Option } = Select;
    let [checkedSpec, setCheckedSpec] = useState<string[]>([])
    let getdata = () => {//获取模型
        console.log(999);
        dispatch({
            type: 'Model/getModel',
            payload: { current: 1, pageSize: '', query: '' }
        })
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
    let changeAllCheck = (e: any, item: any) => {//规格大类
        let list = item.spec_item.split('，')
        if (e.target.checked) {
            item.checkList = [...list]
            setCheckedSpec([...checkedSpec, ...item.checkList])
        } else {
            let arr: string[] = []
            item.checkList = []
            checkedSpec.map(s => {
                let flag = true
                list.map((i: any) => {
                    if (s === i) {
                        flag = false
                    }
                })
                if (flag) {
                    arr.push(s)
                }
            })
            setCheckedSpec([...arr])
        }
    }
    let changeCheck = (e: any, i: string, item: any) => {//规格项
        let arr: string[] = []
        if (e.target.checked) {
            item.checkList && item.checkList.push(i)
            arr.push(i)
            setCheckedSpec([...checkedSpec, ...arr])
        } else {
            item.checkList = item.checkList.filter((s: any) => {
                return s !== i
            })
            let arr: string[] = []
            arr = checkedSpec.filter((s: any) => {
                return s !== i
            })
            console.log(arr);
            setCheckedSpec(arr)
        }
    }
    let onFinish = () => {//欧克按钮
        let values = form.getFieldsValue()
        console.log(values);
        console.log(checkedSpec);
        props.spec(values.spec, checkedSpec)
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
                <Form.Item label="商品规格" name="spec1" className="mal10">

                    {Norms && Norms.data && Norms.data.length ? Norms.data.map((item: any, index: number) => {
                        return <div className="mal20" key={item._id}>
                            <div className="margin-b20"><Checkbox checked={item.checkList && item.checkList.length === (item.spec_item.split('，')).length} onChange={(e) => changeAllCheck(e, item)}>{item.name}</Checkbox></div>
                            {
                                (item.spec_item.split('，')).map((i: string) => {
                                    return <span key={i}>
                                        <span>
                                            <Checkbox checked={item.checkList!.includes(i)} onChange={(e) => changeCheck(e, i, item)} >
                                                <Tag>{i}</Tag>
                                            </Checkbox>
                                        </span>
                                    </span>

                                })
                            }
                            <Divider />
                        </div>
                    }) : ''}
                </Form.Item>
                <Button className="mar15" onClick={back}>取消</Button>
                <Button type="primary" htmlType="submit">确认</Button>
            </Form>
        </div>
    )
}

export default Specifi
