import React, { useState } from 'react'
import { Card, Button, message, Switch, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';

const goodsDetails = () => {
    let [visible, setvisible] = useState(false)
    return (
        <div>
            <Modal visible={visible}>

            </Modal>
        </div>
    )
}

export default goodsDetails
