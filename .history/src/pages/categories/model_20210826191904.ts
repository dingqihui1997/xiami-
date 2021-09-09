import { Effect, Reducer } from 'umi'
import api from '../../http/backstageApi'
import { message, Button } from 'antd';
import { Location } from 'history';
import dayjs from 'dayjs'
// 定义state的数据
export interface CategoryModelState {
    category: any,
}

export interface CategoryModelType {
    namespace: 'category'
    state: CategoryModelState
    // 等同于vuex里面的action 用来发请求的
    effects: {
        addCategory: Effect,
        addSecondCategory: Effect,
        getCategory: Effect,
        delCategory: Effect,
    },
    // 等同于vuex里面的mutation
    reducers: {
        setcategory: Reducer<CategoryModelState>
    }
}

const CategoryModel: CategoryModelType = {
    namespace: 'category',
    state: {
        category: {},
    },
    effects: {
        // *等同于async
        // payload请求传递的参数
        *addCategory({ payload }, { call, put }) { //增加一级分类
            let res = yield call(api.addCategory, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getCategory',
                    payload: ''
                })
            } else {
                message.error(res.msg)
            }
        },
        *addSecondCategory({ payload }, { call, put }) {//添加二级分类
            let res = yield call(api.addSecondCategory, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getCategory',
                    payload: ''
                })
            }
        },
        *getCategory({ payload }, { call, put }) {//获取一级分类列表
            let res = yield call(api.getCategory, payload)
            if (res.code === 200) {
                res.data.map((item: any, index: number) => {
                    item.title = item.name
                    item.key = item._id
                    item.list.map((item1: any, index1: number) => {
                        item1.title = item1.name
                        item1.key = item1._id
                        item1.isLeaf = true
                    })
                    item.children = item.list
                })
                yield put({
                    type: 'setcategory',
                    payload: res
                })
            }
            // console.log(res)
        },
        *delCategory({ payload }, { call, put }) {//删除规格
            let res = yield call(api.delCategory, payload)
            console.log(res)
            if (res.code === 200) {
                message.success(res.msg)
                yield put({
                    type: 'getCategory',
                    payload: ''
                })
            } else {
                message.error(res.msg)
            }
        },

    },
    reducers: {
        setcategory(state, action) {
            return {
                ...state,
                category: action.payload,
            }
        },
    }
}

export default CategoryModel

