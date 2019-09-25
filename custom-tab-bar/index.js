// pages/custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      list:{
        type:Array,
        value: [
          {
            "text": "Tab1",
            "pagePath": "/pages/index/index"
          },
          {
            "text": "Tab2",
            "pagePath": "/pages/index/login"
          },
          {
            "text": "Tab3",
            "pagePath": "/pages/index/webView"
          }
        ]
      }
    
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
