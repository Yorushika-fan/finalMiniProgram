const baseUrl = "http://10.2.87.39:3000"
// const baseUrl = "http://cloud-music.pl-fe.cn"

//封装微信request
const request = ((url:string,method:any) =>{
  return new Promise((resolve,reject) =>{
    wx.request({
      url:`${baseUrl}${url}`,
      method:method,
      success:((res)=>{
          resolve(res)
      })
    })
})
})
//获取歌曲榜单
export const getTopList = (()=>{
     return request("/toplist","Get")
})

//获取歌曲榜单详细信息
export const getTopListDetail = (()=>{
  return request("/toplist/detail","Get")
})

//榜单歌曲接口失效，搜索歌曲模拟
export const getTopSongs = (()=>{
  return request("/search?keywords=milet","Get")
})

//热搜歌曲列表
export const getHotSongs = (()=>{
  return request("/search/hot/detail","Get")
})

//getMusicDetail,getMusicUrl
export const getMusicDetail =((ids:any)=>{
  return request(`/song/detail?ids=${ids}`,"Get")
})
export const getMusicUrl = ((id:any)=>{
  return request(`/song/url?id=${id}`,"GET")
})