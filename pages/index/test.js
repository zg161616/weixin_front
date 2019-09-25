Page({
  data: {
    tabFixed: false,
    tabOptions: ['全部', '附近', '特别关注']
  },
  /**
   * 初始化观察器
   */
  initTabObserver() {
    this.tabObserver = wx.createIntersectionObserver(this)
    this.tabObserver
      .relativeTo('.fixed-position')
      .observe('.slider', (res) => {
        console.info(res)
        const visible = res.intersectionRatio > 0
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
