import React, { useState } from 'react'
import { Card, Button, message, Switch, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
interface props {
    visible: boolean
}
const goodsDetails = (props: props) => {
    return (
        <div>
            <Modal visible={props.visible}>

            </Modal>
        </div>
    )
}

export default goodsDetails
