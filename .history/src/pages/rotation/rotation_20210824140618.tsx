import React, { useEffect } from 'react'
import { Card, Button, Modal, Input, Form, Table } from 'antd';
import { UploadOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch, } from 'umi';
import AddRotation from '../../components/addRotation/addRotation';
const Rotation = () => {
    let list = useSelector((state: any) => state.ratation.data)
    let dispatch = useDispatch()
    const { Search } = Input;
    const [value, setvalue] = React.useState('')
    const [visible, setVisible] = React.useState(false);
    const [form] = Form.useForm();//
    const onSearch = (e: any) => { console.log(e), setvalue(e) };//输入框的值
    const [current, setcurrent] = React.useState(1)
    const [pageSize, setpageSize] = React.useState(5)
    let modify = () => { //关闭子组件弹框
        setVisible(false)
    }
    let addok = (e: any) => { //添加轮播图
        dispatch({
            type: 'ratation/getTopics',
            payload: { url: e.url.file.response.data, title: e.title, link: e.link }
        })
        setVisible(false)
    }
    useEffect(() => {
        dispatch({
            type: 'ratation/getdata',
            payload: { current: current, pageSize: pageSize, query: value }
        })
    }, [])
    return (
        <div>
            <Card>
                <Search placeholder="请输入" onSearch={onSearch} style={{ width: 300 }} />
                <Button type="primary" style={{ marginLeft: 20 }} onClick={() => { setVisible(true) }} >添加轮播图</Button>
                <AddRotation visible={visible} modify={modify} addok={addok}></AddRotation>
            </Card>
        </div>
    )
}

export default Rotation
