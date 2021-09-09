import { Effect, Reducer } from 'umi'
import api from '../../http/backstageApi'
import { message, } from 'antd';
import moment from 'moment'
import { Location } from 'history';
import dayjs from 'dayjs'
// 定义state的数据
export interface SeckillModelState {
    Seckill: any,
}

export interface SeckillModelType {
    namespace: 'Seckill'
    state: SeckillModelState
    // 等同于vuex里面的action 用来发请求的
    effects: {
        addSeckill: Effect,
        getSeckill: Effect,
        showSeckill: Effect,
        delSeckill: Effect,
        updateSeckill: Effect
    },
    // 等同于vuex里面的mutation
    reducers: {
        setSeckill: Reducer<SeckillModelState>
    }
}

const SeckillModel: SeckillModelType = {
    namespace: 'Seckill',
    state: {
        Seckill: {},
    },
    effects: {
        // *等同于async
        // payload请求传递的参数
        *addSeckill({ payload }, { call, put }) { //增加通知
            let res = yield call(api.addSeckill, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getSeckill',
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
        *getSeckill({ payload }, { call, put }) {//获取列表
            let res = yield call(api.getSeckill, payload)
            if (res.code === 200) {
                res.data.map((item: any, index: number) => {
                    item.start_time = moment(item.start_time)
                    item.end_time = moment(item.end_time)
                })
                yield put({
                    type: 'setSeckill',
                    payload: res
                })
            }
            console.log(res)
        },
        *showSeckill({ payload }, { call, put }) {//是否显示
            let res = yield call(api.showSeckill, payload)
            if (res.code === 200) {
                message.success(res.msg)
            }
        },
        *delSeckill({ payload }, { call, put }) {
            let res = yield call(api.delSeckill, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getSeckill',
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
        *updateSeckill({ payload }, { call, put }) {
            let res = yield call(api.updateSeckill, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getSeckill',
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
        setSeckill(state, action) {
            return {
                ...state,
                Seckill: action.payload,
            }
        },
    }
}

export default SeckillModel

