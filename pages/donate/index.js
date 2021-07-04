
Page({

  data: {
    array2:['学士楼自助捐书','A07公寓自助捐书','A14公寓自助捐书'],
    array3:['全新','九成新','八成新','七成新','六成新','五成新','四成新','三成新','二成新','一层新'],
    index: 0,
    index2: 0, 
    index3: 0,
    user_name:'',
    user_url:'',
    user_id:'',
    check:false,

    // 被选中的图片路径 数组
    chooseImgs: [],
    // 文本域的内容
    
    book_name:"",
    book_wear:"",
    book_class:"",
    donation_method:"",
    textVal: "",
    book_press:"",
    author:"",
    book_img:"",
    UpLoadImgs: []
  },
  onShow(){
    const userName=wx.getStorageSync('name');
    const userUrl=wx.getStorageSync('src');
    const userId=wx.getStorageSync('openid');

    this.setData({
      user_name:userName,
      user_url:userUrl,
      user_id:userId
    })
  },


    // 书名的输入的事件
    handleBookNameInput(e) {
      this.setData({
        book_name: e.detail.value
      })
    },

    // 图书分类的输入的事件
    handleBookClassInput(e) {
      this.setData({
        book_class: e.detail.value
      })
    },
  
  bindPickerChange2: function(e) {
    this.setData({
      index2: e.detail.value,
    })
  },
  bindPickerChange3: function(e) {
    this.setData({
      index3: e.detail.value,
    })
  },
  
  //提示建议框
  radiocon:function(e){
    wx.showModal({
      title:'捐书建议',
      content:'由于设备未配套，请自行联系各站点负责人。学士楼：赵子昊，A07：乔永康，A14：商惠',
    });
    var check=this.data.check;
      check=!check;
      this.setData({
          check:check
        })
  },


  // 点击 “+” 选择图片
  handleChooseImg() {
    // 2 调用小程序内置的选择图片api
    wx.chooseImage({
      // 同时选中的图片的数量
      count: 9,
      // 图片的格式  原图  压缩
      sizeType: ['original', 'compressed'],
      // 图片的来源  相册  照相机
      sourceType: ['album', 'camera'],
      success: (result) => {

        this.setData({
          // 图片数组 进行拼接 
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        }),
        console.log(this.data.chooseImgs);
      }
    });

  },
  // 点击 自定义图片组件
  handleRemoveImg(e) {
    // 2 获取被点击的组件的索引
    const { index } = e.currentTarget.dataset;
    // 3 获取data中的图片数组
    let { chooseImgs } = this.data;
    // 4 删除元素
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs
    })
  },
  // 文本域的输入的事件
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
  },
  // 提交按钮的点击
  handleFormSubmit() {
    var that = this;

    const textVal = that.data.textVal;
    let { chooseImgs } = this.data;
    
    if(!textVal.trim()){
      wx.showToast({
        title: '备注内容为空',
        icon: 'none',
        mask: false,
      });
      return;
    }

    wx.showLoading({
      title: '正在上传',
      mask: true
    });

    if(chooseImgs.length!=0){
      chooseImgs.forEach((v,i)=>{
         wx.uploadFile({
          url: 'https://www.yunkai.ink/BookCycle/index.php/Home/Message/upload_pics',
          filePath: v,
          name: 'file',
          formData: {},
          success: (result)=>{
            console.log(result);
            var url = JSON.parse(result.data).url;
            that.data.UpLoadImgs.push(url);
            console.log(that.data.UpLoadImgs);
            if(i===chooseImgs.length -1){

              wx.hideLoading();
              console.log('尝试存储图片地址数组');

              this.setData({
                textVal:"",
                chooseImgs:[]
              })

              wx.navigateBack({
                delta:1
              });
            }
            
            wx.request({
              url: 'https://www.yunkai.ink/BookCycle/index.php/Home/Message/publish_new_message',
              data: {
                UpLoadImgs1:that.data.UpLoadImgs[0].file,
                // UpLoadImgs2:that.data.UpLoadImgs[1].file,
                // UpLoadImgs3:that.data.UpLoadImgs[2].file,
                // UpLoadImgs4:that.data.UpLoadImgs[3].file,
                // UpLoadImgs5:that.data.UpLoadImgs[4].file,
                // UpLoadImgs6:that.data.UpLoadImgs[5].file,
                // UpLoadImgs7:that.data.UpLoadImgs[6].file,
                // UpLoadImgs8:that.data.UpLoadImgs[7].file,
                // UpLoadImgs9:that.data.UpLoadImgs[8].file,
                book_name:that.data.book_name,
                book_wear:that.data.array3[that.data.index3],
                book_class:that.data.book_class,
                donation_method:that.data.array2[that.data.index2],
                content:that.data.textVal,
                book_img:that.data.book_img,
                book_press:that.data.book_press,
                author:that.data.author,
                user_id:that.data.user_id,
                user_name:that.data.user_name,
                user_url:that.data.user_url
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: 'POST',
              success: (result)=>{
                console.log(result);
                console.log('试试上传');
                console.log(that.data);
              },
              fail: (err)=>{
                console.log(err)
              }
              });
            
          },
          fail: (err)=>{
            console.log(err);
          }
        });
      })
    }else{
      wx.request({
        url: 'https://www.yunkai.ink/BookCycle/index.php/Home/Message/publish_new_message',
        data: {
          book_name:that.data.book_name,
          book_wear:that.data.array3[that.data.index3],
          book_class:that.data.book_class,
          donation_method:that.data.array2[that.data.index2],
          content:that.data.textVal,
          book_img:that.data.book_img,
          book_press:that.data.book_press,
          author:that.data.author,
          user_id:that.data.user_id,
          user_name:that.data.user_name,
          user_url:that.data.user_url
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        success: (result)=>{
          wx.hideLoading();
          console.log(result);
          console.log('试试上传');
          console.log(that.data);
          
          this.setData({
            textVal:"",
            chooseImgs:[]
          })

          wx.navigateBack({
            delta:1
          });
        },
        fail: (err)=>{
          console.log(err)
        }
        });
    };
  },

  scanCode:function(e){
    console.log(e);
    this.onShowLoading();
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode'],
      success: (result)=>{
        console.log(result);
        let isbn = result.result;
        console.log(isbn);
        wx.request({
          url: 'https://api.binstd.com/isbn/query?appkey=4ca6829dc59d7093&isbn='+isbn,
          success: (result)=>{
            wx.hideLoading();
            let bookName = result.data.result.title;
            let bookClass = result.data.result.keyword;
            let bookPress = result.data.result.publisher;
            let bookAuthor = result.data.result.author;
            let bookImg = result.data.result.pic;
            this.setData({
              book_name:bookName,
              book_class:bookClass,
              book_press:bookPress,
              author:bookAuthor,
              book_img:bookImg
            })
          },
          fail: (err)=>{
            console.log(err);
            wx.hideLoading();
          }
        });
      },
      fail: (err)=>{
      wx.hideLoading();
       wx.showModal({
         title: '错误',
         content: '条形码扫描失败',
         showCancel: true,
         cancelText: '取消',
         cancelColor: '#000000',
         confirmText: '确定',
         confirmColor: '#3CC51F'
       });
      }
    });
  },

  onShowLoading:function(e){
    wx.showLoading({
      title: '加载约需20s',
      mask: true
    });
  }
})