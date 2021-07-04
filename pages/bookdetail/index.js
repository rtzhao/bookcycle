// import { request } from "../../request/index.js";
Page({
  data: {
    bookList:[],
    book_class:"",
    bookid:""
  },
  onLoad:function(option){
    
    this.setData({
      bookid:option.book_id
    })
  }
  ,
  onShow: function(options){
    
    
    wx.stopPullDownRefresh()
    console.log(this.data.bookid);
    var reqTask = wx.request({
      url: 'https://www.yunkai.ink/BookCycle/index.php/Home/Message/get_one_message',
      data:{
        id:this.data.bookid  
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
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