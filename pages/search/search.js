// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Games:{},
    Avatar:{},
    Name:{},
    userID:''
  },

  /*事件
  */
  formSubmit: function (e) {
    var that = this
    var userName = e.detail.value['nameinput']
    wx.request({
      url: `https://pubg.op.gg/user/${userName}?server=as`,
      success: function (res) {
        var Reg = /data-user_id="([0-9a-z]+)"/
        wx.navigateTo({
          url: '../results/results?str=' + Reg.exec(res.data)[1]
        })
      },
      fail:function(res){
        console.log("no such user")
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