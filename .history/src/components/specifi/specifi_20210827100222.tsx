import React, { useEffect } from 'react'
import { useSelector, useDispatch, useHistory, } from 'umi';

const Specifi = () => {
    let Nav = useSelector((state: any) => state.Model.Model)
    let dispatch = useDispatch()
    let getdata = () => {
        console.log(999);
        dispatch({
            type: 'Model/getModel',
            payload: { current: 1, pageSize: 5, query: '' }
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
