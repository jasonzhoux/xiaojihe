// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Games:{},
    Avatar:{},
    Name:{},
    userID:'',
    hidden:true
  },

  /*事件
  */
  formSubmit: function (e) {
    this.setData({hidden:false})
    var that = this
    var userName = e.detail.value['nameinput']
    /*wx.request({
      url: `https://api.playbattlegrounds.com/shards/pc-as/players?filter[playerNames]=${userName}`,
      header:{
        accept:'application/vnd.api+json',
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0MmMxYThkMC0xOWUxLTAxMzYtOThlNy02MWFjOTE3MDJiMmEiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTIyODEwNDAyLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InhpYW9qaWhlIiwic2NvcGUiOiJjb21tdW5pdHkiLCJsaW1pdCI6MTB9.mEMO1Y_XsBUIwe8TLzVenTJBXhRGL4qwwZaLDQHvzs4'
      },
      success: function (res) {
        console.log(res)
        wx.navigateTo({
          url: '../results/results?str=' + res.data.data.user_id + '&&usr=' + userName
        })
      }
    })*/
    wx.request({
      url: 'http://pubg.ctcuu.com/player',
      data:{
        nickname:userName
      },
      success:function(res){
        that.setData({
          hidden: true
        })
        wx.navigateTo({
          url: '../results/results?str=' + res.data.data.user_id + '&&usr=' + userName
      })
      },
      fail:function(){
        that.setData({
          hidden:true
        })
        wx.showModal({
          content: '没有找到数据呢，请确保用户名输入正确哦',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      }
    })
  },
  /*steamformSubmit:function(){
    var that = this
    wx.request({
      url: 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/',
      data:{
        key:'AFF2231F4F1816863B535150928937CE',
        steamids:'76561198184758041'
      },
      header:{
        "Content-Type": "application/json"
      },
      success:function(res){
        that.setData({
          Avatar: res.data.response.players[0].avatarmedium,
          Name: res.data.response.players[0].personaname
        })
        console.log(that.data.Avatar)
        console.log(that.data.Name)
      }
    })
    wx.navigateTo({
      url:'../results/results'
    })
  },
  //Get pubg details
  pubgformSubmit:function(){
    wx.request({
      url: 'https://api.pubgtracker.com/v2/search/steam',//http://store.steampowered.com/api/appdetails?appids=[]
      data:{
        steamId:'76561198184758041'
      },
      header:{
        'content-type': "application/json",
        'trn-api-key': '7bc594f7-08b6-4f1c-85af-20200bbac64a',
      },
      success:function(res){
        console.log(res)
      }
    })
  },
  //Get Owned Games
  steamgamesformSubmit: function (e) {
    var that = this
    console.log(e.detail.value)
    var id = e.detail.value['idinput']
    console.log(id)
    wx.request({
      url: 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/',
      data: {
        key: 'AFF2231F4F1816863B535150928937CE',
        steamid: '76561198184758041',
        format: 'json'
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res)
        that.setData({
          Games: res.data.response.games
        })
      }
    })
  },
  */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})