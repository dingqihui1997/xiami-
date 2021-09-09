import React, { useEffect } from 'react'
import { useSelector, useDispatch, useHistory, } from 'umi';

const Specifi = () => {
    let Nav = useSelector((state: any) => state.Model.Model)
    let dispatch = useDispatch()
    let getdata = () => {
        dispatch({
            type: 'Model/getModel',
            payload: { current: 1, pageSize: 9999, query: '' }
        })
    }
    useEffect(() => {
        getdata()
    }, [])
    return (
        <div>
            商品规格
        </div>
    )
}

export default Specifi
