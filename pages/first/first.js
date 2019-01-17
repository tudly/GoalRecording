// pages/first/first.js
Component({
  /**
   * Component properties
   */
  properties: {

  },

  /**
   * Component initial data
   */
  data: {
    text:"打卡小程序",
    btnText: "点我打卡",
    isTextShow: "true",
    news: ['1','2', '3']
  },

  /**
   * Component methods
   */
  methods: {
   btnClick:function(){
    var isTextShow = this.data.isTextShow
    this.setData({text:"谢谢打卡", isTextShow:!isTextShow })
    if (isTextShow) {
      this.setData({ btnText: "打卡成功", isTextShow: !isTextShow }) }
    else {
       this.setData({ btnText: "再次打卡", isTextShow: !isTextShow }) }
    wx.navigateTo({
      url: '/pages/index/index',
    })
    }
   }
})
