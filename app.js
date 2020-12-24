//app.js
App({
  globalData:{
    test: 1
  },
  onLaunch: function () {
    console.log('小程序启动了....')
  },
  onShow: function(){
    
  },
  getLocation(cb){
    var _this = this;
    wx.getLocation({
      altitude: 'altitude',
      success: function(res){
        wx.request({
          url: 'https://wx.maoyan.com/hostproxy/locate/v2/rgeo',
          method: 'get',
          header:{
            "x-host": "http://apimobile.vip.sankuai.com"
          },
          data: {
            coord:  res.latitude +','+res.longitude+','+'0',
          },
          success: function(data) {
            cb(data.data.data.city)
          }
        })
      }
    })
  }
})