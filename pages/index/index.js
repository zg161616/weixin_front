//index.js
//获取应用实例
const app = getApp()
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
    array:[{message:'001'},{message:'002'}]
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
      this.pop.showPop()
  },
  onReady(){
    this.pop = this.selectComponent("#phone")
  }
})
