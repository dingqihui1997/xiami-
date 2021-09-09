import { Effect, Reducer } from 'umi'
import api from '../../http/backstageApi'
import { message, Button } from 'antd';
import { Location } from 'history';
import dayjs from 'dayjs'
// 定义state的数据
export interface ParamsModelState {
    Params: any,
}

export interface ParamsModelType {
    namespace: 'Params'
    state: ParamsModelState
    // 等同于vuex里面的action 用来发请求的
    effects: {
        addParams: Effect,
        getParams: Effect,
        delParams: Effect,
        putParams: Effect,
    },
    // 等同于vuex里面的mutation
    reducers: {
        setParams: Reducer<ParamsModelState>
    }
}

const ParamsModel: ParamsModelType = {
    namespace: 'Params',
    state: {
        Params: {},
    },
    effects: {
        // *等同于async
        // payload请求传递的参数
        *addParams({ payload }, { call, put }) { //增加规格
            let res = yield call(api.addParams, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getParams',
                    payload: {
                        parentId: payload.parentId
                    }
                })
            } else {
                message.error(res.msg)
            }
        },
        *getParams({ payload }, { call, put }) {//获取商品列表
            let res = yield call(api.getParams, payload)
            if (res.code === 200) {
                res.data.map((item: any, index: number) => {
                    item.active = index + 1
                })
                yield put({
                    type: 'setParams',
                    payload: res
                })
            }
            console.log(res)
        },
        *delParams({ payload }, { call, put }) {//删除规格
            let res = yield call(api.delParams, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getParams',
                    payload: {
                        current: payload.current, pageSize: payload.pageSize, query: payload.query
                    }
                })
            } else {
                message.error(res.msg)
            }
        },
        *putParams({ payload }, { call, put }) {
            yield put({
                type: 'setParams',
                payload: {}
            })
        }
    },
    reducers: {
        setParams(state, action) {
            return {
                ...state,
                Params: action.payload,
            }
        },
    }
}

export default ParamsModel

