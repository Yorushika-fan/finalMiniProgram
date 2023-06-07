import {getMusicDetail,getMusicUrl} from '../../api/index'
let music:any = null;
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
      musicDetail:{} as any,
      musicName:'',
      musicAuthor:'',
      picUrl:'',
      musicUrl:[],
      isPlay:false,  //是否播放
      currentBtn:true,
      PlayStartTime:"00:00",//播放开始时间 
       PlayEndTime:"00:00",//播放结束时间
       ProValue:'0'//进度条值
  },

  goHome(){
    let pages = getCurrentPages()
    if(pages.length >= 2){
      wx.navigateBack({
        delta:1
  })
    }else{
      wx.reLaunch({
        url:"../index/index"
      })
    }
    
  },
// 转换时间格式
 s_to_hs(s:any){
    //计算分钟
    //算法：将秒数除以60，然后下舍入，既得到分钟数
    let h = Math.floor(s/60);
    //计算秒
    //算法：取得秒%60的余数，既得到秒数
    s=Math.trunc(s%60);
    //将变量转换为字符串
    h+='';
    s+='';
    //如果只有一位数，前面增加一个0
    h  =   (h.length==1)?'0'+h:h;
    s  =   (s.length==1)?'0'+s:s;
    return h+':'+s;
},

timer(){
  // 定时器
 setTimeout(() => {
  music.currentTime
  music.onTimeUpdate(() => {
    let startTime = this.s_to_hs(music.currentTime)
    let endTime = this.s_to_hs(music.duration)
    let value = (music.currentTime/music.duration)*100
    this.setData({
      PlayStartTime:startTime,
      PlayEndTime:endTime,
      ProValue:value
    })
  })
}, 1000)
},

// music实例创建
music(){
  music = wx.createInnerAudioContext();
      if (wx.setInnerAudioOption) {
        wx.setInnerAudioOption({
          obeyMuteSwitch: false,
          autoplay: true
        })
      }else {
        music.obeyMuteSwitch = false;
        music.autoplay = true;
      }
      music.src = this.data.musicUrl.url;
      app.music = music
      music.onPlay(()=>{
        console.log('音乐播放');
        this.setData({
          isPlay:true
        })

      })
      music.onStop(()=>{
        console.log('音乐停止');
   

      })
      music.onPause(()=>{
        console.log('音乐暂停');
        this.setData({
          isPlay:false
        })
      })
      music.onError((res:any)=>{
        console.log(music);
        console.log(res.errMsg);
        console.log(res.errCode);
      })

      music.onWaiting(()=>{
        console.log('音频加载中...');
      })

},

  // 播放按钮切换

  play(){
    // 判断是否有music实例，如果有不用重新创建实例
    // if(!music){
    
    // }
    this.timer();
    if(this.data.currentBtn){
      music.play();
      this.setData({
        currentBtn:false
      })
      let image = wx.createSelectorQuery().select('.qiyue_title .imgUrl image')
      console.log(image);
 
      // ios静音模式下可以播放音频
      wx.setInnerAudioOption({
        obeyMuteSwitch: false,
            success: function (e) {
            console.log(e)
            console.log('play success')
        },
        fail: function (e) {
            console.log(e)
            console.log('play fail')
        }
    })
   
    }else{
      music.pause();
      this.setData({
        currentBtn:true
      })
   
  
    }
  },


  // 拖动进度条
  sliderChange(e:any){

let val = e.detail.value
let second = music.duration * val/100
this.setData({
  PlayStartTime: this.s_to_hs(second)  
})
music.currentTime = second;
this.timer();

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取歌曲详情
    console.log(options.id);
    // 判断进入的方式，如果只有ids，为歌单进入，
    // 如果传递有播放时间，为控制栏进入
    if(!options.id){
      this.setData({
        musicName:app.musicName,
        musicAuthor:app.musicAuthor,
        picUrl : app.picUrl,
        currentBtn:app.currentBtn,
      })
      // this.timer();
    }else{
      // 结束上一首歌曲
      if(music){
        music.destroy();

      }
      
    
       getMusicDetail(options.id).then((res:any)=>{
        this.setData({
          musicDetail:res.data.songs[0],
          musicName:res.data.songs[0].name,
          musicAuthor:res.data.songs[0].ar[0].name,
          picUrl : res.data.songs[0].al.picUrl
        })
      })

      app.musicName = this.data.musicName
      app.musicAuthor = this.data.musicAuthor
      app.picUrl = this.data.picUrl
    // 获取歌曲url
    getMusicUrl(options.id).then((res:any)=>{
      console.log("1111")
      console.log(res.data)
      console.log("1111")
      musicUrl:res.data.data[0]
    })
 


 

      // app.music();
      // 进入页面自动播放
      this.music();
      // this.timer();
      this.play();
    }
   
    
     
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // const music = {"name":this.data.musicDetail.name,"author":this.data.musicDetail.ar[0].name,"picUrl":this.data.musicDetail.al.picUrl}
    // wx.setStorageSync('music', music)
    app.currentBtn = this.data.currentBtn

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})