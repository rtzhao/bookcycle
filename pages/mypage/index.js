Page({
  data:{
    name:"你好",
    src:"../../images/weixin.jpg",
    is_login:false
  },
  onShow: function(options){
    const userName=wx.getStorageSync('name');
    const userUrl=wx.getStorageSync('src');
    const userId=wx.getStorageSync('openid');
    if(userId){
      this.setData({
        is_login:true,
        name:userName,
        src:userUrl
      })
    }
  }
  ,
  bingGetOpenID() {
    let that = this;
    wx.login({
      success(res) {
        console.log('code:', res.code)
        that.getOpenid(res.code)
      }
    })
  },
  getMyInfo:function(e){
    console.log(e.detail.userInfo)
    let info=e.detail.userInfo;
    this.setData({
      name:info.nickName,
      src:info.avatarUrl,
      is_login:true
    })
    wx.setStorageSync('name', this.data.name);
    wx.setStorageSync('src', this.data.src);
  },
  getOpenid(wxCode) {
    wx.request({
      url: 'https://www.yunkai.ink/BookCycle/index.php/Home/User/getOpenID',
      data: {
        code: wxCode
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log('获取成功', res)
        console.log('openid:'+res.data.openid)
        wx.setStorageSync('openid', res.data.openid)
      },
      fail(res) {
        console.log('获取失败', res)
      }
    })
  }
})
