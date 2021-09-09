import { Effect, Reducer } from 'umi'
import api from '../../http/backstageApi'

// 定义state的数据
export interface RatationModelState {
    topics: any[],
}

export interface RatationModelType {
    namespace: 'ratation'
    state: RatationModelState
    // 等同于vuex里面的action 用来发请求的
    effects: {
        getTopics: Effect,
    },
    // 等同于vuex里面的mutation
    reducers: {
        setTopics: Reducer<RatationModelState>
    }
}

const RatationModel: RatationModelType = {
    namespace: 'ratation',
    state: {
        topics: [],
    },
    effects: {
        // *等同于async
        // payload请求传递的参数
        *getTopics({ payload }, { call, put }) {
            let res = yield call(api.addBanner, payload)
            console.log(res);
            if (res.data.success) {
                yield put({
                    type: 'setTopics',
                    payload: res.data.data
                })
            }
        },
    },
    reducers: {
        setTopics(state, action) {
            return {
                ...state,
                topics: action.payload,
            }
        },
    }
}

export default RatationModel