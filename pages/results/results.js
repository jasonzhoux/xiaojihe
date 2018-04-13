// pages/search/search.js
const app = getApp()
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    Name: '',
    Index:0,
    Region:['亚洲','欧洲','日韩','北美','东南亚'],
    userID:'',
    Sinmode:{
    },
    Duomode:{
    },
    Quamode:{
    },
    matches:{},
    staticsvisibility:'flex',
    matchesvisibility:'none',
    analysisvisibility:'none',
    getmatches:false,
    time:'',
    template: {
    "stats": {
      "matches_cnt": 0,
      "win_matches_cnt": 0,
      "topten_matches_cnt": 0,
      "kills_sum": 0,
      "kills_max": 0,
      "assists_sum": 0,
      "headshot_kills_sum": 0,
      "deaths_sum": 0,
      "longest_kill_max": 0,
      "rank_avg": 0,
      "damage_dealt_avg": 0,
      "time_survived_avg": 0,
      "rating": 0
    },
    "ranks": {
      "rating": 0
    },
    "max_ranks": {
      "rating": 0
    }
  },
  region:'as'
  },
  /*
   * 事件
   */
  regionchange:function(e){
    this.setData({
      Index: e.detail.value,
      getmatches:false,
      staticsvisibility: 'flex',
      matchesvisibility: 'none',
      analysisvisibility: 'none',
    })
    switch(e.detail.value){
      case '0':this.inforequest('as',1)
        this.inforequest('as', 2)
        this.inforequest('as', 4)
        this.setData({ region:'as'})
        break;
      case '1': this.inforequest('eu', 1)
        this.inforequest('eu', 2)
        this.inforequest('eu', 4)
        this.setData({ region: 'eu' })
        break;
      case '2': this.inforequest('krjp', 1)
        this.inforequest('krjp', 2)
        this.inforequest('krjp', 4)
        this.setData({ region: 'krjp' })
        break;
      case '3':
      this.inforequest('na', 1)
        this.inforequest('na', 2)
        this.inforequest('na', 4)
        this.setData({ region: 'na' })
        break;
      case '4': this.inforequest('sea', 1)
        this.inforequest('sea', 2)
        this.inforequest('sea', 4)
        this.setData({ region: 'sea' })
        break;
      default:console.log("no")
      break;
    }
  },

  inforequest:function(server,mode){
    var that = this
    wx.request({
      url: `https://pubg.op.gg/api/users/${this.data.userID}/ranked-stats?season=2018-04&&server=${server}&&queue_size=${mode}&&mode=tpp`,
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        switch(mode){
          case 1: if (res.statusCode == '404') {
            that.setData({
              'Sinmode': that.data.template
            })
          }
          else {
            that.setData(
              {
                'Sinmode': res.data
              }
            )
          }
          break;
          case 2: if (res.statusCode == '404') {
            that.setData({
              'Duomode': that.data.template
            })
          }
          else {
            that.setData(
              {
                'Duomode': res.data
              }
            )
          }
          break;
          case 4: if (res.statusCode == '404') {
            that.setData({
              'Quamode': that.data.template
            })
          }
          else {
            that.setData(
              {
                'Quamode': res.data
              }
            )
          }
          break;
          default:console.log("no data")
          break;
        }
      },
      fail: function () {
        console.log("failed")
      }
    })
  },
  showanalysis: function (e) {
    this.setData({
      staticsvisibility: 'none',
      matchesvisibility: 'none',
      analysisvisibility:'flex',
    })
  },
  showstatics:function(e){
    this.setData({
      staticsvisibility:'flex',
      matchesvisibility:'none',
      analysisvisibility:'none',
    })
  },
  showmatches:function(e){
    if(this.data.getmatches){
      this.setData({
        staticsvisibility: 'none',
        matchesvisibility: 'flex',
        analysisvisibility:'none',
      })
    }
    else{
    var that = this
    wx.request({
      url: `https://pubg.op.gg/api/users/${this.data.userID}/matches/recent?server=${this.data.region}`,
      header: {
        "Content-Type": "application/json"
      },
      success:function(res){
        that.setData(
          {
            matches:res.data.matches.items,
            staticsvisibility:'none',
            matchesvisibility:'flex',
            getmatches:true,
          }
        )
        console.log(that.data.matches[0])
      }
    })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo:app.globalData.userInfo,
      userID:options.str,
      time: util.formatTime(new Date()),
      Name:options.usr
    })
    console.log(this.data.userID)
    var that = this
    var server = "as"
    var mode = 4
    wx.request({
      url: `https://pubg.op.gg/api/users/${this.data.userID}/ranked-stats?season=2018-04&&server=${server}&&queue_size=${mode}&&mode=tpp`,
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        if(res.statusCode=='404'){
          that.setData({
            'Quamode': that.data.template
          })
        }
        else{
        that.setData(
          {
            'Quamode': res.data
          }
        )
        console.log(res)
        }
      },
      fail:function(){
        console.log("failed")
      }
    })
    mode = 1
    wx.request({
      url: `https://pubg.op.gg/api/users/${this.data.userID}/ranked-stats?season=2018-04&&server=${server}&&queue_size=${mode}&&mode=tpp`,
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        if (res.statusCode == '404') {
          that.setData({
            'Sinmode': that.data.template
          })
          console.log(that.data.Sinmode)
        }
        else{
        that.setData(
          {
            'Sinmode':res.data
          }
        )
        console.log(res)
        }
      },
      fail: function () {
        console.log(failed)
      }
    })
    mode = 2
    wx.request({
      url: `https://pubg.op.gg/api/users/${this.data.userID}/ranked-stats?season=2018-04&&server=${server}&&queue_size=${mode}&&mode=tpp`,
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        if (res.statusCode == '404') {
          that.setData({
            'Duomode': that.data.template
          })
        }
        else{
        that.setData(
          {
            'Duomode':res.data
          }
        )}
      },
      fail: function () {
        console.log("failed")
      }
    })
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