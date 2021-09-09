import { Effect, Reducer } from 'umi'
import api from '../../http/backstageApi'
import { message, Button } from 'antd';
import { Location } from 'history';
import dayjs from 'dayjs'
// 定义state的数据
export interface ModelModelState {
    Model: any,
}

export interface ModelModelType {
    namespace: 'Model'
    state: ModelModelState
    // 等同于vuex里面的action 用来发请求的
    effects: {
        addModel: Effect,
        getModel: Effect,
        delModel: Effect,
        updateModel: Effect
    },
    // 等同于vuex里面的mutation
    reducers: {
        setModel: Reducer<ModelModelState>
    }
}

const PatternModel: ModelModelType = {
    namespace: 'Model',
    state: {
        Model: {},
    },
    effects: {
        // *等同于async
        // payload请求传递的参数
        *addModel({ payload }, { call, put }) { //增加通知
            let res = yield call(api.addModel, payload)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getModel',
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
        *getModel({ payload }, { call, put }) {//获取通知
            let res = yield call(api.getModel, payload)
            if (res.code === 200) {
                res.data.map((item: any, index: number) => {
                    item.start_time = dayjs(item.start_time)
                    item.end_time = dayjs(item.end_time)
                })
                yield put({
                    type: 'setModel',
                    payload: res
                })
            }
            console.log(res)
        },
        *delModel({ payload }, { call, put }) {
            let res = yield call(api.delModel, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getModel',
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
        *updateModel({ payload }, { call, put }) {
            let res = yield call(api.updateModel, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getModel',
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
        setModel(state, action) {
            return {
                ...state,
                Model: action.payload,
            }
        },
    }
}

export default PatternModel

