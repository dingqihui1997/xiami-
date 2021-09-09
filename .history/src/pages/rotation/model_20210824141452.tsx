import { Effect, Reducer } from 'umi'
import api from '../../http/backstageApi'

// 定义state的数据
export interface RatationModelState {
    topics: any[],
    data: any[]
}

export interface RatationModelType {
    namespace: 'ratation'
    state: RatationModelState
    // 等同于vuex里面的action 用来发请求的
    effects: {
        getTopics: Effect,
        getdata: Effect
    },
    // 等同于vuex里面的mutation
    reducers: {
        setTopics: Reducer<RatationModelState>
        setdata: Reducer<RatationModelState>
    }
}

const RatationModel: RatationModelType = {
    namespace: 'ratation',
    state: {
        topics: [],
        data: []
    },
    effects: {
        // *等同于async
        // payload请求传递的参数
        *getTopics({ payload }, { call, put }) {
            let res = yield call(api.addBanner, payload)
            // console.log(res);
            if (res.data.success) {
                yield put({
                    type: 'setTopics',
                    payload: res.data.data
                })
            }
        },
        *getdata({ payload }, { call, put }) {
            let res = yield call(api.getBanner, payload)
            res.data.map((item: any, index: number) => {
                item.active = index + 1
            })
            console.log(res);
            // if (res.data.success) {
            yield put({
                type: 'setdata',
                payload: res.data.data
            })
            // }
        },
    },
    reducers: {
        setTopics(state, action) {
            return {
                data: state!.data,
                topics: action.payload,
            }
        },
        setdata(state, action) {
            return {
                topics: state!.topics,
                data: action.payload,
            }
        },
    }
}

export default RatationModel