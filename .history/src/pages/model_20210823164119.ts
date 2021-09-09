import { Effect, Reducer } from 'umi'
import api from '../http/backstageApi'
import { message, Button } from 'antd';
import { Location } from 'history';
import Home from './home';

// 定义state的数据
export interface HomeModelState {
    home: any[],
}

export interface HomeModelType {
    namespace: 'home'
    state: HomeModelState
    // 等同于vuex里面的action 用来发请求的
    effects: {
        getHome: Effect,
    },
    // 等同于vuex里面的mutation
    reducers: {
        setHome: Reducer<HomeModelState>
    }
}

const HomeModel: HomeModelType = {
    namespace: 'home',
    state: {
        home: [],
    },
    effects: {
        // *等同于async
        // payload请求传递的参数
        *getHome({ payload }, { call, put }) {
            let res = yield call(api.login)
            console.log(res)
            if (res.code === 200) {
                yield put({
                    type: 'setUser',
                    payload: res.data.data,
                })
            } else {
                message.error(res.msg)
            }
        },
    },
    reducers: {
        setHome(state, action) {
            return {
                ...state,
                home: action.payload,
            }
        },
    }
}

export default HomeModel