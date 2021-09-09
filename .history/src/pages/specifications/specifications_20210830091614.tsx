import React, { useEffect, useState } from 'react'
import E from 'wangeditor'
import { useSelector, useDispatch, } from 'umi';
import { Form, Input, Button, Upload, Divider } from 'antd';
interface props {
    detail: (val: string) => void
    back: (num: number) => void
}
const Specifications = (props: props) => {
    let dispatch = useDispatch()
    let [discount, setdiscount] = useState<any>()
    let [editor, seteditor] = useState<any>()
    let goods = useSelector((state: any) => state.Goods.Goods)
    let Params = useSelector((state: any) => state.Params.Params)
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
    return (
        <div>
            <div id="div1">
            </div>
            <div className="mat20">
                <Button type="primary">确认</Button>
            </div>

        </div>
    )
}

export default Specifications