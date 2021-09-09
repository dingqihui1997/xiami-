import React, { useEffect, useState } from 'react'
import E from 'wangeditor'
import { useSelector, useDispatch, } from 'umi';
import { Form, Input, Button, Upload, Select, message } from 'antd';
import api from "@/http/backstageApi"

const Specifications = () => {
    let dispatch = useDispatch()
    let [discount, setdiscount] = useState<any>()
    let [editor, seteditor] = useState<any>()
    let goods = useSelector((state: any) => state.Goods.Goods)
    let [parentId, setparentId] = useState('')
    let [content, setcontent] = useState('')
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
    let choice = (e: string) => {//选择
        setparentId(e)
        api.getSpecParams({ parentId: e }).then((res: any) => {
            console.log(res);
            setcontent(res.data)
        }).catch(err => {
            console.log(err);
        })
    }
    let confirm = () => {//确认
        if (!discount && !parentId) {
            message.error('表单填写有误请检查')
        } else {
            api.addSpecParams({ parentId: parentId, specParams: discount }).then((res: any) => {
                console.log(res);
                if (res.code === 200) {
                    editor.txt.clear()
                    form.resetFields()
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }
    return (
        <div className="flex-d">
            <div>
                <Form
                    form={form}
                    preserve={false}>
                    <Form.Item label="所属商品" name="parentId" rules={[{ required: true, message: '请选择详情图' }]}>
                        <Select style={{ width: 300 }} onChange={choice}>
                            {goods && goods.data && goods.data.map((item: any, index: number) => {
                                return <option value={item._id} key={index}>{item.name}</option>
                            })}
                        </Select>
                    </Form.Item>
                </Form>
            </div>
            <div id="div1" style={{ zIndex: 999 }}>
                <p dangerouslySetInnerHTML={{ __html: content }}></p>
            </div>
            <div className="mat20 flex-end">
                <Button htmlType="submit" type="primary" size="middle" onClick={confirm}>确认</Button>
            </div>
        </div>
    )
}

export default Specifications