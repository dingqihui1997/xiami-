import { Effect, Reducer } from 'umi'
import api from '../../http/backstageApi'
import { message, Button } from 'antd';
import { Location } from 'history';
import dayjs from 'dayjs'
// 定义state的数据
export interface CouponModelState {
    Coupon: any,
}

export interface CouponModelType {
    namespace: 'Coupon'
    state: CouponModelState
    // 等同于vuex里面的action 用来发请求的
    effects: {
        addCoupon: Effect,
        getCoupon: Effect,
        showCoupon: Effect,
        delCoupon: Effect,
        updateCoupon: Effect
    },
    // 等同于vuex里面的mutation
    reducers: {
        setCoupon: Reducer<CouponModelState>
    }
}

const CouponModel: CouponModelType = {
    namespace: 'Coupon',
    state: {
        Coupon: {},
    },
    effects: {
        // *等同于async
        // payload请求传递的参数
        *addCoupon({ payload }, { call, put }) { //增加通知
            let res = yield call(api.addCoupon, payload)
            // console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getCoupon',
                    payload: {
                        current: 1,
                        pageSize: 5,
                        query: ''
                    }
                })
            } else {
                message.error(res.msg)
            }
        },
        *getCoupon({ payload }, { call, put }) {//获取通知
            let res = yield call(api.getCoupon, payload)
            console.log(res)
            if (res.code === 200) {
                res.data.map((item: any, index: number) => {
                    item.start_time1 = dayjs(item.start_time).format(`YYYY-MM-DD HH:mm:ss`)
                    item.end_time1 = item.end_time
                })
                yield put({
                    type: 'setCoupon',
                    payload: res
                })
            }
        },
        *showCoupon({ payload }, { call, put }) {//是否显示
            let res = yield call(api.showCoupon, payload)
            if (res.code === 200) {
                message.success(res.msg)
            }
        },
        *delCoupon({ payload }, { call, put }) {
            let res = yield call(api.delCoupon, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getCoupon',
                    payload: {
                        current: 1,
                        pageSize: 5,
                        query: ''
                    }
                })
            } else {
                message.error(res.msg)
            }
        },
        *updateCoupon({ payload }, { call, put }) {
            let res = yield call(api.updateCoupon, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getCoupon',
                    payload: {
                        current: 1,
                        pageSize: 5,
                        query: ''
                    }
                })
            }
        }

    },
    reducers: {
        setCoupon(state, action) {
            return {
                ...state,
                Coupon: action.payload,
            }
        },
    }
}

export default CouponModel

