import React, { useState } from 'react'
import { Card, Button, message, Switch, Input, Form, Table, DatePicker, Modal, Upload, Image, Pagination, Popconfirm } from 'antd';
interface props {
    visible: boolean
}
const goodsDetails = (props: props) => {
    console.log(propsvisible);
    return (
        <div>
            <Modal visible={props.visible}>
                dsf
            </Modal>
        </div>
    )
}

export default goodsDetails
