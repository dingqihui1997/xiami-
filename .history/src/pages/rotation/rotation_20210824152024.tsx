import React, { useEffect } from 'react'
import { Card, Button, Switch, Input, Form, Table, Modal } from 'antd';
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
    const [isModalVisible, setIsModalVisible] = React.useState(false);//删除弹框
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
        console.log(list);
    }, [])
    let onChange = () => {//开关

    }
    let columns = [
        {
            title: '#',
            dataIndex: 'active',
            key: '_id',
        },
        {
            title: '图片',
            dataIndex: 'url',
            key: '_id',
            render: (url: any) => (<img src={url} width="150" height="50" />)
        },
        {
            title: '路径',
            dataIndex: 'url',
            key: '_id',
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: '_id',
        },
        {
            title: '链接',
            dataIndex: 'link',
            key: '_id',
        },
        {
            title: '是否显示',
            dataIndex: 'isShow',
            key: '_id',
            render: (isShow: any) => (<Switch defaultChecked onChange={onChange} />)
        },
        {
            title: '操作',
            dataIndex: 'isShow',
            key: '_id',
            render: (text: any, record: any) => (<div><Button type="primary" onClick={() => { edit(text, record) }}>编辑</Button> <Button danger onClick={() => { del(text, record) }}>删除</Button></div>)
        },
    ]
    let edit = (text: any, record: any) => {//编辑
        console.log(record);
    }
    let del = (text: any, record: any) => {//删除
        setIsModalVisible(true);
        console.log(record);
        // dispatch({
        //     type: 'ratation/delBanner',
        //     payload: { id: record._id }
        // })
        // dispatch({
        //     type: 'ratation/getdata',
        //     payload: { current: current, pageSize: pageSize, query: value }
        // })
    }
    const handleOk = () => { //删除确定按钮
        setIsModalVisible(false);
    };
    return (
        <div>
            <Card>
                <Search placeholder="请输入" onSearch={onSearch} style={{ width: 300 }} />
                <Button type="primary" style={{ marginLeft: 20 }} onClick={() => { setVisible(true) }} >添加轮播图</Button>
                <AddRotation visible={visible} modify={modify} addok={addok}></AddRotation>
                <Table columns={columns} dataSource={list.data && list.data} rowKey="_id" />
                <Modal title="删除轮播图" visible={isModalVisible} okText="确定" cancelText="取消" onOk={handleOk} onCancel={() => { setIsModalVisible(false); }}>
                    <p>确定删除吗？</p>
                </Modal>
            </Card>
        </div>
    )
}

export default Rotation