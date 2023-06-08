// pages/topList/topList.ts

import {getTopSongs} from '../../api/index'
Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    "songsData":Object,
    "songInfo":Object,
    "bgcolor":""

  },

  /**
   * 生命周期函数--监听页面加载
   */

   //初始化数据
  initData(keywords:string){
    getTopSongs(keywords).then((res:any)=>{
      console.log(res.data.result.songs)
        this.setData({
          "songsData":res.data.result
        })
    })
  },
  onLoad(options:any) {

    this.initData(options.keyWords)
    this.setData({
      songInfo:JSON.parse(decodeURIComponent(options.songInfo)),
      bgcolor:options.bgColor
    })


    wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: this.data.bgcolor.substring(22,29),
        animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  },
  //返回主页
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

  goPlay(event:any){

      wx.navigateTo({
        url:"../palyer/player?id=" + event.currentTarget.dataset.id 
      })
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