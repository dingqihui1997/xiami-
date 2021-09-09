import React from 'react'
import { useSelector, useDispatch, useHistory, } from 'umi';

const Order = () => {
    let goods = useSelector((state: any) => state.Goods.Goods)
    let dispatch = useDispatch()
    return (
        <div>
            订单
        </div>
    )
}

export default Order
