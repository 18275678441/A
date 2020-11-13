// pages/jun/jun.js
const app=getApp()
wx.cloud.init();

Page({

  /**
   * 页面的初始数据
   */
  data: {
ne:[],
imgList:[],
card:0,
  },
  btn(){
    wx.navigateTo({
      url: '/pages/preview/preview',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
     var _this = this;
     //1、引用数据库   
     const db = wx.cloud.database({
       //这个是环境ID不是环境名称     
       env: 'jungle-and-dog-3gxl27fpb91f968f'
     })
     //2、开始查询数据了  news对应的是集合的名称 
     let that=this //异步请求，所以let一个that
     
      wx.cloud.database().collection("APP").get({ ///查询prize数据表中的数据（所有商品）
        success(res){       
          that.setData({ //通过setData，将res中的数据存入到imgList数组当中
            imgList:res.data           
          }),
          console.log(res.data)   ///打印看一下   
        }
      })  
     db.collection('APP').get({
       //如果查询成功的话    
       success: res => {
         console.log(res.data)
         //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
         this.setData({
           ne: res.data
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