  Page({
    data: {
      tabFixed: false,
      tabOptions: [{ "text": '全部' }, { "text": '附近' }, { "text": '特别关注' }]
    },
    /**
     * 初始化观察器
     */
    initTabObserver() {
      this.tabObserver = wx.createIntersectionObserver(this)
      this.tabObserver
        // 相对于页面可视区
        .relativeToViewport()
        // 相对于某一个元素
        .observe('.slider', (res) => {
          console.info(res)
          const visible = res.intersectionRatio > 0
          console.log(visible)
          this.setData({ tabFixed: !visible })
        })
    },
    onLoad() {
      this.initTabObserver()
    },
    onUnload() {
      this.tabObserver.disconnect()
    }
    
  })
