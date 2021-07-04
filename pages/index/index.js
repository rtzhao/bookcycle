// import { request } from "../../request/index.js";
Page({
  data: {
    bookList:[],
    book_class:"",
  },
  onShow: function(options){

    wx.stopPullDownRefresh()

    var reqTask = wx.request({
      url: 'https://www.yunkai.ink/BookCycle/index.php/Home/Message/get_all_messages',
      success: (result)=>{
        this.setData({
              bookList:result.data.data 
        });
      },
      fail : (err)=>{
        console.log(err);
      }
    });
 
  },

  onPullDownRefresh:function(){
    var that = this;
    this.onShow();
  }
});