//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tabIndex: 'hots',
    hots: {
      items: []
    },
    hotsStatus: 0,
    comingStatus: 0
  },
  switch(e){
    this.setData({
      tabIndex: e.target.dataset.val
    })
    var status = e.target.dataset['comingStatus'];
    var _this = this
    if(status === 0) {
      wx.request({
        url: 'https://wx.maoyan.com/mmdb/movie/v1/list/wish/order/coming.json',
        method:'get',
        data: {
          ci: 1,
          limit: 30,
          offset: 0
        },
        success: function(v1){
          wx.request({
            url: 'https://wx.maoyan.com/mmdb/movie/v2/list/rt/order/coming.json',
            method: 'get',
            data: {
              ci: 1,
              limit: 10
            },
            success: function(v2){
              v1.data.data.coming.forEach(function (val) {
                val.img = val.img.replace('w.h','170.230')
                val.comingTitle = val.comingTitle.slice(0,-3).split('年').length > 1 ? val.comingTitle.slice(0,-3).split('年')[1]:val.comingTitle.slice(0,-3).split('年')[0]
              })
              var title = ''
              v2.data.data.coming.forEach(function (val) {
                if(title !== val.comingTitle){
                  title = val.comingTitle
                } else {
                  val.comingTitle = ''
                }
                val.img = val.img.replace('w.h','128.180')
              })
              console.log(v2)
              _this.setData({
                comingStatus: 1,
                v1:{
                  items:v1.data.data.coming
                },
                v2:{
                  items:v2.data.data.coming
                }
              })
            }
          })
        }
      })
      
    }
  },
  onLoad: function () {
    var _this = this;
    var app = getApp();
    app.getLocation(function(locate){
      _this.setData({
        locate: locate,
      })
      // 根据用户所在城市查询数据
      wx.request({
        url: 'https://wx.maoyan.com/mmdb/movie/v2/list/hot.json',
        method: 'get',
        data: {
          limit: 12,
          offset: 0,
          ct: locate
        },
        success: function(info) {
          info.data.data.hot.forEach(function (val) {
            val.img = val.img.replace('w.h','128.180')
          })
          _this.setData({
            hots: {
              items: info.data.data.hot
            }
          });
          _this.setData({hotsStatus: 1})
        }
      })
    })
  },
  
})
