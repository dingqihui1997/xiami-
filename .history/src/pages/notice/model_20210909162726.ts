import { Effect, Reducer } from 'umi'
import api from '../../http/backstageApi'
import { message, Button } from 'antd';
import { Location } from 'history';

// 定义state的数据
export interface NoticeModelState {
    Notice: any,
}

export interface NoticeModelType {
    namespace: 'Notice'
    state: NoticeModelState
    // 等同于vuex里面的action 用来发请求的
    effects: {
        addNotice: Effect,
        getNotice: Effect,
        showNotice: Effect,
        delNotice: Effect,
        updateNotice: Effect,
        getOrder: Effect,
    },
    // 等同于vuex里面的mutation
    reducers: {
        setNotice: Reducer<NoticeModelState>
    }
}

const NoticeModel: NoticeModelType = {
    namespace: 'Notice',
    state: {
        Notice: {},
    },
    effects: {
        // *等同于async
        // payload请求传递的参数
        *addNotice({ payload }, { call, put }) { //增加通知
            let res = yield call(api.addNotice, payload)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getNotice',
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
        *getNotice({ payload }, { call, put }) {//获取通知
            let res = yield call(api.getNotice, payload)
            if (res.code === 200) {
                res.data.map((item: any, index: number) => {
                    item.active = index + 1
                })
                yield put({
                    type: 'setNotice',
                    payload: res
                })
            }
        },
        *showNotice({ payload }, { call, put }) {//是否显示
            let res = yield call(api.showNotice, payload)
            if (res.code === 200) {
                message.success(res.msg)
            }
        },
        *delNotice({ payload }, { call, put }) {
            let res = yield call(api.delNotice, payload)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getNotice',
                    payload: {
                        current: 1,
                        pageSize: 5,
                        query: ''
                    }
                })
            }
        },
        *updateNotice({ payload }, { call, put }) {
            let res = yield call(api.updateNotice, payload)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getNotice',
                    payload: {
                        current: 1,
                        pageSize: 5,
                        query: ''
                    }
                })
            }
        },
        *getOrder({ payload }, { call, put }) {
            let res = yield call(api.updateNotice, payload)
        }

    },
    reducers: {
        setNotice(state, action) {
            return {
                ...state,
                Notice: action.payload,
            }
        },
    }
}

export default NoticeModel