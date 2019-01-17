const app = getApp()
Page({
  data: {
    list: {},
    array: {},
    chris_lisst: {},
    movementData: {},
    movementList: {},
    total_takein: 0,
    total_consume: 0
  },
  onShow: function () {
    var that = this
    this.calculate()
    wx.getStorage({
      key: 'T.T_index',
      success: function (res) {
        if (res.data) {
          that.setData({
            chris_list: res.data
          })
        }
      }
    })
  },

  onLoad: function () {
    var that = this
    this.setData({
      //list: app.globalData.list, 
      movementData: app.globalData.movementData,
      movementList: app.globalData.movementList
    });
  },

  calculate: function () {
    var list = app.globalData.list;
    var total_takein = 0
    var consume = 0
    if (app.globalData.base_comsume == 0) {
      if (consume = wx.getStorageSync('infoConsume'))
        app.globalData.base_comsume = consume
    }
    var total_consume = parseFloat(app.globalData.movement_comsume) + parseFloat(app.globalData.base_comsume)
    for (var i in list) {
      list[i].open = list[i].open && list[i].items.length
      total_takein += parseFloat(list[i].total)
    }
    this.setData({
      list: list,
      total_takein: total_takein.toFixed(1),
      total_consume: total_consume.toFixed(1)
    });
  }
  
});
