// pages/search/index.js
// import { request } from "../../request/index.js";
Page({
  data: {
    books:[],
    isFocus:false,
    inpValue:""
  },
  handleInput(e){
    const {value}=e.detail;
    // 2 检测合法性
    if(!value.trim()){
      this.setData({
        books:[],
        isFocus:false
      })
      // 值不合法
      return;
    }
    // 3 准备发送请求获取数据
    this.setData({
      isFocus:true
    })

    wx.request({
      url: 'https://www.yunkai.ink/BookCycle/index.php/Home/Message/search',
      data: {
        words:value
      },
      header: {"Content-Type": "application/x-www-form-urlencoded"},
      method: 'POST',
      success: (result)=>{
        console.log(result),
        this.setData({
          books:result.data.data
        })
      }
    });
  },
  
  handleCancel(){
    this.setData({
      inpValue:"",
      isFocus:false,
      books:[]
    })
  }
})