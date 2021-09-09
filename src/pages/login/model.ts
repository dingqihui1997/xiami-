import { Effect, Reducer } from 'umi'
import api from '../../http/backstageApi'
import { message, Button } from 'antd';
import { Location } from 'history';

// 定义state的数据
export interface LoginModelState {
    user: any,
}

export interface LoginModelType {
    namespace: 'login'
    state: LoginModelState
    // 等同于vuex里面的action 用来发请求的
    effects: {
        getUser: Effect,
    },
    // 等同于vuex里面的mutation
    reducers: {
        setUser: Reducer<LoginModelState>
    }
}

const LoginModel: LoginModelType = {
    namespace: 'login',
    state: {
        user: {},
    },
    effects: {
        // *等同于async
        // payload请求传递的参数
        *getUser({ payload }, { call, put }) {
            let res = yield call(api.login, payload)
            if (res.code === 200) {
                yield put({
                    type: 'setUser',
                    payload: res.data.data,
                })
                message.success('登录成功')
                window.location.pathname = "/"
                localStorage.setItem('token', res.token)
                localStorage.setItem('user', JSON.stringify(res.data))
            } else {
                message.error(res.msg)
            }
        },
    },
    reducers: {
        setUser(state, action) {
            return {
                ...state,
                user: action.payload,
            }
        },
    }
}

export default LoginModel