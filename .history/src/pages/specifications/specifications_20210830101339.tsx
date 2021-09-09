import React, { useEffect, useState } from 'react'
import E from 'wangeditor'
import { useSelector, useDispatch, } from 'umi';
import { Form, Input, Button, Upload, Select } from 'antd';
interface props {
    detail: (val: string) => void
    back: (num: number) => void
}
const Specifications = (props: props) => {
    let dispatch = useDispatch()
    let [discount, setdiscount] = useState<any>()
    let [editor, seteditor] = useState<any>()
    let goods = useSelector((state: any) => state.Goods.Goods)
    const [form] = Form.useForm();//
    useEffect(() => {
        if (!editor) {
            const editor1 = new E(document.getElementById('div1'))
            editor1.create()
            seteditor(editor1)
            editor1.config.onchange = function (newHtml: any) {
                discount = newHtml
                setdiscount(discount);
                form.setFieldsValue({ detail: discount })
            };
        }
    }, [])
    useEffect(() => {
        getgoods()
    }, [])

    let getgoods = () => {//获取商品列表
        dispatch({
            type: 'Goods/getGoods',
            payload: { current: '', pageSize: 9999, query: '' }
        })
    }
    let choice = () => {//选择

    }
    return (
        <div className="flex-d">
            <div>
                <Form
                    preserve={false}>
                    <Form.Item label="所属商品" name="parentId" rules={[{ required: true, message: '请选择商品' }]}>
                        <Select style={{ width: 300 }} onChange={choice}>
                            {goods && goods.data && goods.data.map((item: any, index: number) => {
                                return <option value={item._id} key={index}>{item.name}</option>
                            })}
                        </Select>
                    </Form.Item>
                </Form>
            </div>
            <div id="div1" style={{ zIndex: 999 }}>
            </div>
            <div className="mat20 flex-end">
                <Button type="primary" size="middle">确认</Button>
            </div>

        </div>
    )
}

export default Specifications