const app = getApp()
Page({
  data: {
    nickName: '',
    userInfoAvatar: '',
    list_length: 0,
    item_open: false,
    infoWeight: 0,
    totalCal: 0,
    list: {},
    array: [],
    index: 40
  },

  onShow: function () {
    var that = this
    var list = app.globalData.movementList;
    wx.getStorage({
      key: 'infoWeight',
      success: function (res) {
        console.log("Weight number:" + res.data)
        if (res.data) {
          that.setData({
            //infoWeight: 30 + 0.5 * res.data,
            infoWeight: res.data
          })
        }
      },
      fail: function () {
        wx.showModal({
          content: '这是你第一次使用本功能，请先设置基本信息',
          confirmText: "带我去",
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/bmi/bmi',
              })
            }
          }
        });  
      },
    }),
      wx.getStorage({
        key: 'T.T_run',
          success: function (res) {
          console.log("run_onshow.....", Object.keys(list).length)
            if (Object.keys(list).length == 0 ) {
            that.setData({
              item_open: false
            })
          } else {
              that.setData({
                list: list,
                item_open: true
              })
          }
        }
      })
    this.calculate()  
  },

  onLoad: function () {
    var that = this
    var array = []
    for (var i = 30; i < 150; i++) {
      array.push(i);
      array.push(i + 0.5);
    }
    this.setData({
      array: array 
    })
    wx.getStorage({
      key: 'T.T_run',
      success: function (res) {
        console.log("run_onload.....", Object.keys(res.data).length)
        if (Object.keys(res.data).length == 0) {
          that.setData({
            item_open: false
          })
        } else {
          that.setData({
            list: res.data,
            item_open: true
          })
        }
      }
    })

  },

  confirm: function () {  
    var list = app.globalData.movementList;
    this.setData({
      list: list
    });
    //save run data into local storage T.T_index
    try {
      wx.setStorage({ key: 'T.T_index', data: list })
    } catch (e) {
      console.log("exception save date in run page")
    };
    console.log('chufa1, ready to save')
    wx.switchTab({
      url: '/pages/index/index',
    })
    console.log("Confirm end")
  },

  calculate(){
    var list = app.globalData.movementList;
    var list_length = 0
    var totalCal = 0
    for (var id in list) {
      list_length++
      totalCal += list[id][1] * list[id][2] / 60
    }

    this.setData({
      list: list,
      list_length: list_length,
      item_open: this.data.item_open || list_length,
      totalCal: parseFloat((totalCal * this.data.infoWeight).toFixed(1))
    });

    app.globalData.movement_comsume = this.data.totalCal
    //save run data into local storage T.T_index
      try {
        wx.setStorage({ key: 'T.T_run', data: list })
      } catch (e) {
        console.log("exception save date in T.T_Run page")
      };
      console.log('chufa1, ready to save')
     },

  kindToggle: function (e) {
    this.setData({
      item_open: !this.data.item_open,
    })
  },
  bindPickerChange: function (e) {
    try {
      wx.setStorageSync('infoWeight', e.detail.value)
      this.setData({
        infoWeight: 30 + 0.5 * e.detail.value
      })
    } catch (e) {
    }
    app.globalData.movementList = list
  },
  addMovement: function (id) {
    wx.redirectTo({
      url: '/pages/movement/movement',
    })
  },

  delMovement: function (e) {
    var that=this
    var id = e.currentTarget.id, 
    list = app.globalData.movementList, 
    mlist = app.globalData.movementData
    console.log(id)
    delete list[id]
    mlist[id][2] = 0
    this.calculate()
    wx.getStorage({
      key: 'T.T_run',
      success: function (res) {
        console.log("run_onload.....", Object.keys(list).length)
        if (Object.keys(list).length == 0) {
          try {
            wx.setStorage({ key: 'T.T_index', data: list })
          } catch (e) {
            console.log("exception save date in T.T_Run page")
          };
          console.log('chufa1, ready to save')
          that.setData({
            item_open: false
          })
        } else {
          that.setData({
            list: res.data,
            item_open: true
          })
        }
      }
    })
  }

});