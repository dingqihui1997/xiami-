import fly from "./index.js"
let token = uni.getStorageSync('token')
export default {
  // 上传
  upload() {
    return fly.post('/app/upload')
  },
  // 获取短信验证码
  getCode({
    mobile
  }) {
    return fly.post('/app/getCode', {
      mobile
    })
  },
  // 注册
  register({
    mobile,
    code,
    username,
    password
  }) {
    return fly.post('/app/register', {
      mobile,
      code,
      username,
      password
    })
  },
  // 手机号登录
  mobileLogin({
    mobile,
    code
  }) {
    return fly.post('/app/mobileLogin', {
      mobile,
      code
    })
  },
  // 用户名登录
  userLogin({
    username,
    password
  }) {
    return fly.post('/app/userLogin', {
      username,
      password
    })
  },
  // 微信登录
  wechatLogin({
    code
  }) {
    return fly.post('/app/wechatLogin', {
      code
    })
  },
  // 获取轮播图
  getBanner() {
    return fly.get('/app/getBanner')
  },
  // 获取导航
  getNav() {
    return fly.get('/app/getNav')
  },
  // 获取全部商品
  getGoods() {
    return fly.get('/app/getGoods')
  },
  // 获取分类
  getCategory() {
    return fly.get('/app/getCategory')
  },
  // 获取优惠券
  getCoupon() {
    return fly.get('/app/getCoupon')
  },
  // 获取秒杀商品
  getSeckill() {
    return fly.get('/app/getSeckill')
  },
  // 获取新品
  getNew() {
    return fly.get('/app/getNew')
  },
  // 获取热销商品
  getHot() {
    return fly.get('/app/getHot')
  },
  // 获取推荐商品
  getRecommend() {
    return fly.get('/app/getRecommend')
  },
  // 获取首页推荐导航
  getRecommendNav() {
    return fly.get('/app/getRecommendNav')
  },
  // 获取导航商品详情
  getNavGoods({
    id
  }) {
    return fly.post('/app/getNavGoods', {
      id
    })
  },
  // 获取搜索热词
  getSearchWords() {
    return fly.get('/app/searchWord')
  },
  // 商品详情
  goodsDetail(id) {
    return fly.post('/app/goodsDetail', {
      id
    })
  },
  // 搜索
  search({
    current,
    pageSize,
    query
  }) {
    return fly.get('/app/search', {
      current,
      pageSize,
      query
    })
  },
  // 获取秒杀商品
  getSeckillGoods() {
    return fly.get('/app/getSeckillGoods')
  },
  // 获取购物车
  getCart(user_id) {
    return fly.post('/app/getCart', {
      user_id
    }, {
      headers: {
        token
      }
    })
  },
  // 添加购物车
  addCart({
    // 用户id
    user_id,
    // 购物车数量
    count,
    // 商品
    goods,
    // 商品规格
    spec
  }) {
    return fly.post('/app/addCart', {
      user_id,
      count,
      goods,
      spec
    })
  },
  delCart({
    // 用户id
    user_id,
    // 商品id
    id
  }) {
    return fly.post('/app/delCart', {
      id,
      user_id
    })
  },
  // 修改购物车
  updateCart({
    // 商品id
    id,
    // 用户id
    user_id,
    // 商品数量
    count,
  }) {
    return fly.post('/app/updateCart', {
      id,
      user_id,
      count,
    })
  },
  addWechatUser(data) {
    return fly.post('/app/addWechatUser', data)
  },
  // 获取用户地址
  getAppAddress(user_id) {
    return fly.post('/app/getAppAddress', {
      // 用户id
      user_id
    })
  },
  getWechatAddress(openid) {
    return fly.post('/app/getWechatAddress', {
      openid
    })
  },
  // 添加地址
  addAddress({
    // 用户id
    user_id,
    // 用户名
    username,
    // 用户电话
    mobile,
    // 用户省市区地址
    address,
    // 用户详细地址
    detailAddress,
    // 是否是默认地址
    isDefault,
  }) {
    return fly.post('/app/addAddress', {
      user_id,
      username,
      mobile,
      address,
      detailAddress,
      isDefault,
    })
  },
  // 删除地址
  delAddress({
    // 地址id
    addressId,
    // 用户id
    user_id
  }) {
    return fly.post('/app/delAddress', {
      addressId,
      user_id
    })
  },
  // 修改地址
  updateAddress({
    // 用户id
    user_id,
    // 用户名
    username,
    // 用户电话
    mobile,
    // 用户省市区地址
    address,
    // 用户详细地址
    detailAddress,
    // 是否是默认地址
    isDefault,
    // 地址id
    id
  }) {
    return fly.post('/app/updateAddress', {
      user_id,
      username,
      mobile,
      address,
      detailAddress,
      isDefault,
      id
    })
  },
  // 设置默认地址
  setDefault({
    // 地址id
    addressId,
    // 用户id
    user_id
  }) {
    return fly.post('/app/setDefault', {
      addressId,
      user_id
    })
  },
  // 订单
  getAppOrder(user_id) {
    return fly.post('/app/getAppOrder', {
      // 用户id
      user_id
    })
  },
  // 添加订单
  addOrder({
    // 用户id
    user_id,
    // 订单总价
    price,
    // 用户地址
    address,
    // 订单商品数量
    count,
    // 支付时间
    pay_time,
    // 商品列表
    goods_list,
    // 用户电话
    mobile,
  }) {
    return fly.post('/app/addOrder', {
      user_id,
      price,
      address,
      count,
      pay_time,
      goods_list,
      mobile,
    })
  },
  // 删除订单
  delOrder({
    // 订单id
    orderId,
    // 用户id
    user_id
  }) {
    return fly.post('/app/delOrder', {
      orderId,
      user_id
    })
  },
  // 评价
  createComment({
    // 用户id
    user_id,
    // 商品id
    goods_id,
    // 订单id
    order_id,
    // 评分
    rate,
    // 评价内容
    content,
    // 评论图片
    pic,
    // 是否匿名
    isAnonymous,
    // 评论时间
    comment_time
  }) {
    return fly.post('/app/createComment', {
      user_id,
      goods_id,
      order_id,
      rate,
      content,
      pic,
      isAnonymous,
      comment_time
    })
  },
  // 通知
  getNotice() {
    return fly.get('/app/getNotice')
  },
  // 获取城市区域
  getAreaList() {
    return fly.get('/app/getAreaList')
  },
  // 搜索城市区域
  searchAreaList(content) {
    return fly.post('/app/searchAreaList', {
      content
    })
  },
  // 小米之家
  getStoreHome({
    // 地区名字
    area_name,
    // 地区id
    area_id
  }) {
    return fly.post('/app/storeHome', {
      area_name,
      area_id
    })
  },
  // 店铺详情
  getStoreDetail(mihome_id) {
    return fly.post('/app/storeDetail', {
      // 店铺id
      mihome_id
    })
  }
}
