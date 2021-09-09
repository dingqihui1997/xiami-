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
    const [id, setid] = React.useState('');//删除弹框
    const [num, setnum] = React.useState(0)
    let modify = () => { //关闭子组件弹框
        setVisible(false)
    }
    let addok = (e: any) => { //添加轮播图
        // dispatch({
        //     type: 'ratation/getTopics',
        //     payload: { url: e.url.file.response.data, title: e.title, link: e.link }
        // })
        // getdata()
        setVisible(false)
    }
    useEffect(() => {
        dispatch({
            type: 'ratation/getdata',
            payload: { current: current, pageSize: pageSize, query: value }
        })
    }, [])
    let onChange = (text: any, record: any) => {//开关,修改状态
        dispatch({
            type: 'ratation/showBanner',
            payload: { id: record._id, isShow: text }
        })
    }
    let columns = [//表格数据
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
            render: (isShow: boolean, _id: any,) => (<Switch defaultChecked={isShow} onChange={() => { onChange(!isShow, _id,) }} />)
        },
        {
            title: '操作',
            dataIndex: 'isShow',
            key: '_id',
            render: (text: any, record: any) => (<div><Button type="primary" onClick={() => { edit(text, record) }}>编辑</Button> <Button danger onClick={() => { del(text, record) }}>删除</Button></div>)
        },
    ]
    let edit = (text: any, record: any) => {//编辑0
        setVisible(true)
        setnum(0)
        console.log(record);
    }
    let del = (text: any, record: any) => {//删除
        setIsModalVisible(true);
        setid(record._id)
    }
    const handleOk = () => { //删除确定按钮
        setIsModalVisible(false);
        dispatch({
            type: 'ratation/delBanner',
            payload: id
        })
        getdata()
    };
    let getdata = () => {
        dispatch({
            type: 'ratation/getdata',
            payload: { current: current, pageSize: pageSize, query: value }
        })
    }
    return (
        <div>
            <Card>
                <Search placeholder="请输入" onSearch={onSearch} style={{ width: 300 }} />
                <Button type="primary" style={{ marginLeft: 20 }} onClick={() => { setVisible(true), setnum(1) console.log(num); }} >添加轮播图</Button>
                <AddRotation visible={visible} modify={modify} addok={addok} num={num}></AddRotation>
                <Table columns={columns} dataSource={list.data && list.data} rowKey="_id" />
                <Modal title="删除轮播图" visible={isModalVisible} okText="确定" cancelText="取消" onOk={handleOk} onCancel={() => { setIsModalVisible(false); }}>
                    <p>确定删除吗？</p>
                </Modal>
            </Card>
        </div>
    )
}

export default Rotation
