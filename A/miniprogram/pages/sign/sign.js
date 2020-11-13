// pages/sign/sign.js

var app = getApp();
var calendarSignData;
var date;
var calendarSignDay;
var is_qd;
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    qdView: false,
    calendarSignData: "",
    calendarSignDay: "",
    is_qd: false,
  },
  quxiaoQd: function (e) {
    var that = this;
    that.setData({
      qdView: false,
      is_qd: true
    })
  },
  //事件处理函数
  calendarSign: function (e) {
    var that = this;
    that.setData({
      qdView: true
    })
    calendarSignData[date] = date;
    console.log(calendarSignData);
    calendarSignDay = calendarSignDay + 1;
    var today = new Date().getDate()
    wx.request({
      url: getApp().data.host + '后台的接口',
      method: "POST",
      data: {
        "user_id": wx.getStorageSync('user_id'),
        "sign_num": today
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //通过post传值，所以要加header
      },
      success: function (res) {
        that.setData({
          rule: res.data.rule,
          integral: res.data.integral,
        })
      }
    })
 
    wx.setStorageSync("calendarSignData", calendarSignData);
    wx.setStorageSync("calendarSignDay", calendarSignDay);
 
    this.setData({
      calendarSignData: calendarSignData,
      calendarSignDay: calendarSignDay
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    var mydate = new Date();
    var year = mydate.getFullYear();
    var month = mydate.getMonth() + 1;
    date = mydate.getDate();
    console.log("date" + date)
    var day = mydate.getDay();
    console.log(day)
    var nbsp = 7 - ((date - day) % 7);
    console.log("nbsp" + nbsp);
    var monthDaySize;
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
      monthDaySize = 31;
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
      monthDaySize = 30;
    } else if (month == 2) {
      // 计算是否是闰年,如果是二月份则是29天
      if ((year - 2000) % 4 == 0) {
        monthDaySize = 29;
      } else {
        monthDaySize = 28;
      }
    };
    // 传ajax
    wx.request({
      url: getApp().data.host + 'index.php?g=api&m=output&a=sign_list',
      method: "POST",
      data: {
        "user_id": wx.getStorageSync('user_id')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // 判断是否签到过   
        if (res.data == null) {
          calendarSignData = new Array(monthDaySize)
          wx.setStorageSync("calendarSignData", calendarSignData);
        } else {
          var is_qd;
          for (var i in res.data) {
            parseInt(res.data[i])
            calendarSignData = new Array(monthDaySize)
            calendarSignData[parseInt(res.data[i])] = parseInt(res.data[i])
            wx.setStorageSync("calendarSignData", calendarSignData);
            console.log(date)
            console.log(parseInt(res.data[i]))
 
            if (parseInt(res.data[i]) == date) {
              console.log(1)
              wx.setStorageSync("calendarSignDay", 1);
              is_qd = true
            } else {
              wx.setStorageSync("calendarSignDay", 0);
              
            }
          }
        }
        console.log(is_qd)
        calendarSignData = wx.getStorageSync("calendarSignData")
        calendarSignDay = wx.getStorageSync("calendarSignDay")
        console.log(calendarSignData);
        console.log(calendarSignDay)
        that.setData({
          is_qd: is_qd,
          year: year,
          month: month,
          nbsp: nbsp,
          monthDaySize: monthDaySize,
          date: date,
          calendarSignData: calendarSignData,
          calendarSignDay: calendarSignDay
        })
      }
    })
 
 
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
    wx.removeStorageSync("calendarSignData")
    wx.removeStorageSync("calendarSignDay")
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
 
  }
})
 
