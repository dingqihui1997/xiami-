import { Effect, Reducer } from 'umi'
import api from '../../http/backstageApi'
import { message, Button } from 'antd';
import { Location } from 'history';

// 定义state的数据
export interface UserModelState {
    User: any,
}

export interface UserModelType {
    namespace: 'User'
    state: UserModelState
    // 等同于vuex里面的action 用来发请求的
    effects: {
        addUser: Effect,
        getUser: Effect,
        showUser: Effect,
        delUser: Effect,
        updateUser: Effect
    },
    // 等同于vuex里面的mutation
    reducers: {
        setUser: Reducer<UserModelState>
    }
}

const UserModel: UserModelType = {
    namespace: 'User',
    state: {
        User: {},
    },
    effects: {
        // *等同于async
        // payload请求传递的参数
        *addUser({ payload }, { call, put }) { //增加通知
            let res = yield call(api.addUser, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getUser',
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
        *getUser({ payload }, { call, put }) {//获取通知
            let res = yield call(api.getUser, payload)
            console.log(res)
            if (res.code === 200) {
                yield put({
                    type: 'setUser',
                    payload: res
                })
            }
        },
        *showUser({ payload }, { call, put }) {//是否显示
            let res = yield call(api.showUser, payload)
            if (res.code === 200) {
                message.success(res.msg)
            }
        },
        *delUser({ payload }, { call, put }) {
            let res = yield call(api.delUser, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getUser',
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
        *updateUser({ payload }, { call, put }) {
            let res = yield call(api.updateUser, payload)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getUser',
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
        setUser(state, action) {
            return {
                ...state,
                User: action.payload,
            }
        },
    }
}

export default UserModel