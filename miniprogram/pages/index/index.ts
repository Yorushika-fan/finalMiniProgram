// index.ts
// 获取应用实例

import {getTopList,getTopListDetail} from '../../api/index'
type Colors = Record<string,string>
Page({
  data: {
    songs:[] as Object,
    songsDetails:[] as Object,
    bgColors:{
      "飙升榜":"linear-gradient(90deg,#ee8dba,#ee6a9f);",
      "新歌榜":"linear-gradient(90deg,#38a8b0,#8adcc9);",
      "原创榜":"linear-gradient(90deg,#5688cb,#7fd3f3);",
      "热歌榜":"linear-gradient(90deg,#d5433c,#f4a292);"
    } as Colors

  },
  // 事件处理函数
  bindViewTap() {

  },

  //跳转榜单页面
  goTopList(event:any){
    let toplist =  event.currentTarget.dataset.toplist
    console.log(event.currentTarget.dataset.toplist.name)
      wx.navigateTo({
        url:"../topList/topList?songInfo=" + encodeURIComponent(JSON.stringify(toplist))  + "&&bgColor=" + this.data.bgColors[toplist.name]
      })
  },

  //跳转搜素页面
  goSearch(){
    wx.navigateTo({
      url:"../search/search"
    })

  },

  //
  initData(){
     //获取榜单信息
    getTopList().then((res:any)=>{
     
        this.setData({
          "songs":res.data.list
        })
    })
    //获取榜单详细信息
    getTopListDetail().then((res:any) =>{
      this.setData({"songsDetails":res.data.list})
    })
  },

  onLoad() {
      this.initData()   
  }

})
