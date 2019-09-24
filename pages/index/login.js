const app = getApp()
const ctx = wx.createCanvasContext('myCanvas')
var info = wx.getSystemInfoSync()
console.log("小程序基础库版本号为：" + info.SDKVersion)
 function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
Page({
  
  /**
   * 页面的初始数据
   */
  inputValue:"",
  videoContext:"",
  data: {
    isLogin:false,
    inputName:null,
    inputPwd:null,
    src:null,
    webSrc: encodeURI("https://cwc.easy.echosite.cn")
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
  onLoad(options) {
    console.log("load")
    var that = this
    var time = wx.getStorageSync("EXPIREDTIME")
    var session_key = wx.getStorageSync("SESSIONID")
    if(session_key==""){
      wx.login({
        success:res =>{
          if(res.code){
            wx.request({
              url: 'https://cwc.easy.echosite.cn/updateSessionKey',
              data:{code:res.code},
              success:function(res){
                wx.setStorageSync("SESSIONID", res.data.session_key)
                wx.setStorageSync("EXPIREDTIME", +new Date())
              },
              complete:function(){
                console.log("sessionId初始化")
                that.onLoad()
              }
            })
          }
        }
      })
    }
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
    this.videoContext = wx.createVideoContext("myVideo", this)
    ctx.setFillStyle('red')
    ctx.fillRect(10, 10, 150, 75)
    ctx.draw()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { 
    console.log("show")
    wx.connectSocket({
      url: 'https://cwc.easy.echosite.cn/socketTest',
      success(res) {
        console.log("连接成功");
        console.log(JSON.stringify(res))
      },
      fail(res) {
        console.log("连接失败" + res)
      }
    })
    wx.onSocketOpen(function (res) {
      console.log("WebSocket连接已经打开")
    })
    wx.onSocketClose(function (res) {
      console.log("WebSocket连接已经关闭")
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("hide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("unload")

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
  tap(){
    wx.getNetworkType({
      success: function(res) {
        if(res.networkType=="wifi"){
       const downLoadTask =  wx.downloadFile({
            url:'https://cwc.easy.echosite.cn/readFile',
            success:function(res){
              console.log(res)
              wx.openDocument({
                filePath: res.tempFilePath,
              })
         
            },
        
          })
          downLoadTask.onProgressUpdate((res)=>{
            console.log("下载进度"+res.progress)
            console.log("已经下载的数据长度"+res.totalBytesWritten)
            console.log("预期需要下载的数据总长度"+res.totalBytesExpectedToWrite)
          })
        }
      },
    })
  },
   bindButtonTap: function() {
    var that = this
   const video = wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front','back'],
      success: function(res) {
        console.log(res)
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  timeUpdate:function(res){
    console.log(res)
  },
  bindInputBlur: function (e) { 
    this.inputValue = e.detail.value
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color:getRandomColor()
          })
  },

})  
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'sss',
    },
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () { }
  }
})

