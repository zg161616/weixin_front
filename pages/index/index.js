//index.js
//获取应用实例
const app = getApp()
var util = require("../../utils/util.js")
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    length:5,
    item: {
      index: 0,
      msg: 'this is a template',
      time: '2016-06-18'
    },
    array: ['美国', '中国', '巴西', '日本'],
    index: 0,
    multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],
    multiIndex: [0, 0, 0],
    time:"06:00",
    date:null,
    region:["广东省","广东省","广东省"],
    customItem:["全部"]
      },
  onPullDownRefresh:function(){
  },
  checkUserName:function(){
    var util = require("../../utils/util.js");
    var number = util.formatTime(Date.now());
    console.log(number)
  },
  flush:function(){
    this.onLoad();
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  jump:function(){
    wx.navigateTo({
      url: '/pages/index/home',
    })
  },
  handleTap: function (evt) {
    console.log(evt)
  },
  touchStart(){
    console.log("touchStart")
  },
  onLoad: function () {
    console.log("load00")
   var date = util.dateToStr(new Date())
   this.setData({
     date:date
   })
    wx.getSetting({
      success(res) {
        res.authSetting = {
          "scope.userInfo": true,
          "scope.userLocation": true
        }
        console.log(res.authSetting)
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  
  handleTap1: function (e) {
    console.log(e)
    console.log("handleTap1")
  },
  handleTap2: function (e) {
    console.log(e)
    console.log("handleTap2")
  },
  handleTap3: function (e) {
    console.log("handleTap3")
  },
  handleTap4: function (e) {
    console.log("handleTap4")
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onReachBottom:function(){
    console.log("reach")
  },
  showPop(){
    this.pop.showPopup()
  },
  onReady(){
    this.pop = this.selectComponent("#phone")
  },
  error(res){
    console.log("error")
  },
  success(){
    console.log("success")
  },
  showModal(){
    wx.showModal({
      title: '',
      content: '',
      success(res){
        console.log(res)
      }
    })
  },
  showSheet(){
    wx.showActionSheet({
      itemList: ["A", "B", "C"],
      success(res) {
        console.log(res)
      }
    })
  },
  bindPickerChange: function (e) {
    console.log('picker下拉项发生变化后，下标为：', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindMultiPickerChange(e){
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange(e){
    console.log(e)
  },
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
            break;
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            data.multiArray[2] = ['鲫鱼', '带鱼'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                break;
              case 1:
                data.multiArray[2] = ['蛔虫'];
                break;
              case 2:
                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                break;
              case 3:
                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                break;
              case 4:
                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['鲫鱼', '带鱼'];
                break;
              case 1:
                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                break;
              case 2:
                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        // console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindDateChange(e){
    this.setData({
      date:e.detail.value
    })
  },
bindRegionChange(e){
  this.setData({
    region:e.detail.value
  })
},
test(){
  console.log("test")
},
  bindTapView(res){
    console.log(res)
  },
  initTabObserver() {
    this.tabObserver = wx.createIntersectionObserver(this)
    this.tabObserver
      // 相对于页面可视区
      .relativeToViewport()
      // 相对于某一个元素
      .observe('.slider', (res) => {
        console.info(res)
        const visible = res.intersectionRatio > 0
        this.setData({ tabFixed: !visible })
      })
  },
  onLoad(){
    console.log("load01")
    this.initTabObserver()
  },

    onUnload() {
    this.tabObserver.disconnect()
  }
})
