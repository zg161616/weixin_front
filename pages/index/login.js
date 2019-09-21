const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,
    inputName:null,
    inputPwd:null,
  },
  register:function(){
    var that = this
    if (this.data.inputName == null && this.data.inputPwd == null) {
      return;
    }
    wx.login({
      success: res => {
        if (res.code) {
          wx.request({
            url: 'https://cwc.easy.echosite.cn/register',
            data: { name: this.data.inputName, pwd: this.data.inputPwd, code: res.code },
            success: function (res) {
              console.log("SESSIONID已设置")
              wx.setStorageSync("SESSIONID", res.data.session_key)
              wx.setStorageSync("EXPIREDTIME", +new Date())
              if(res.data.code==0){
              wx.showToast({
                title: res.data.msg,
                icon: 'success',
                duration: 1000,
              });
              that.setData({ isLogin: true })
              }
              else if(res.data.code==1){
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1000,
                });
              }
            }
          })
        }
      }
    })
  

  },
  login: function(){
  wx.request({
    url: 'https://cwc.easy.echosite.cn/login',
    data:{name:this.data.inputName,pwd:this.data.inputPwd},
    success:function(res){
      if(res.data){
        wx.showToast({
          title: '登录成功',
          icon:'success',
          duration:5000,
          complete:function(){
            wx.navigateTo({
              url: '/pages/index/index',
            })
          }
        })
      }
    }
  })
  },

  checkName:function(e){
      this.data.inputName = e.detail.value
  },
  checkPwd:function(e){
      this.data.inputPwd = e.detail.value
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = wx.getStorageSync("EXPIREDTIME")
    var session_key = wx.getStorageSync("SESSIONID")
    var util = require("../../utils/util.js")
    if(time==""){
      time = +new Date();
    }
    var now = +new Date()
    var save_time = util.formatHour(now - time)
    var limit = 10*1000;
    if(limit<now-time){
      console.log("sessionID已过期")
      wx.login({
        success:res =>{
          if(res.code){
            wx.request({
              url: 'https://cwc.easy.echosite.cn/updateSessionKey',
              data : {code:res.code},
              success:function(res){
                var data = res.data
                console.log(data)
                  if(res.data.update){
                    console.log("SESSIONID已更新,ID:"+data.session_key)
                    wx.setStorageSync('EXPIREDTIME', +new Date())
                    wx.setStorageSync('SESSIONID', data.session_key)
                  }
              },
              complete:function(){
                 time = wx.getStorageSync("EXPIREDTIME")
                now = +new Date()
                 save_time = util.formatHour(now - time)
                session_key = wx.getStorageSync("SESSIONID")
                console.log("SESSIONID存储时间:" + save_time + "ID:" + session_key);
              }
            })          
          }
        }
      })
    }
    else{
      console.log("SESSIONID存储时间:" + save_time + "ID:" + session_key);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  showUserInfo:function(e){
    
  },
  scanf:function(){
    wx.scanCode({
      success:function(res){
          console.log(res.result)
      }
    })
  },
  showUserInfo:function(e){
    console.log(e.detail.rawData)
  },
  tap:function(){
    wx.getNetworkType({
      success: function(res) {
        if(res.networkType=="wifi"){
          wx.downloadFile({
            url:'',
            success:function(res){
              wx.openDocument({
                filePath: res.tempFilePath,
              })
            }
          })
        }
      },
    })
  }
})