// pages/search/search.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    Name: {},
    Index:0,
    Region:['亚洲','欧洲','日韩','北美','东南亚'],
    userID:'',
    Sinmode:{
      rating:'',
      win:'',
      topten:'',
      killsavg:'',
      ranks:'',
      winrate:'',
      toptenrate:'',
      kda:''
    },
    Duomode:{
      rating: '',
      win: '',
      topten: '',
      killsavg: '',
      ranks: '',
      winrate: '',
      toptenrate: '',
      kda: ''
    },
    Quamode:{
      rating: '',
      win: '',
      topten: '',
      killsavg: '',
      ranks: '',
      winrate: '',
      toptenrate: '',
      kda: ''
    }
  },
  /*
   * 事件
   */
  bindPickerChange: function (e) {
    this.setData({
      Index: e.detail.value
    })
  }, 
  RequestInfo:function(server,mode){
    var that = this
    wx.request({
      url: `https://pubg.op.gg/api/users/${this.data.userID}/ranked-stats?season=2018-04&&server=${server}&&queue_size=${mode}&&mode=tpp`,
      header: {
        "Content-Type": "application/json"
      },
      success:function(res){
        that.setData(
          {
            'Quamode.rating': res.data.stats.rating,
            'Quamode.win': res.data.stats.win_matches_cnt
          }
        )
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo:app.globalData.userInfo,
      userID:options.str
    })
    var that = this
    var server = "as"
    var mode = 4
    wx.request({
      url: `https://pubg.op.gg/api/users/${this.data.userID}/ranked-stats?season=2018-04&&server=${server}&&queue_size=${mode}&&mode=tpp`,
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        that.setData(
          {
            'Quamode.rating': res.data.stats.rating,
            'Quamode.win': res.data.stats.win_matches_cnt,
            'Quamode.topten': res.data.stats.topten_matches_cnt,
            'Quamode.killsavg': (res.data.stats.kills_sum / res.data.stats.matches_cnt).toFixed(2),
            'Quamode.ranks': res.data.ranks.rating,
            'Quamode.winrate': (res.data.stats.win_matches_cnt / res.data.stats.matches_cnt).toFixed(2),
            'Quamode.toptenrate': (res.data.stats.topten_matches_cnt / res.data.stats.matches_cnt).toFixed(2),
            'Quamode.kda': (res.data.stats.kills_sum / res.data.stats.deaths_sum).toFixed(2)
          }
        )
      }
    })
    mode = 1
    wx.request({
      url: `https://pubg.op.gg/api/users/${this.data.userID}/ranked-stats?season=2018-04&&server=${server}&&queue_size=${mode}&&mode=tpp`,
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        that.setData(
          {
            'Sinmode.rating': res.data.stats.rating,
            'Sinmode.win': res.data.stats.win_matches_cnt,
            'Sinmode.topten': res.data.stats.topten_matches_cnt,
            'Sinmode.killsavg': (res.data.stats.kills_sum / res.data.stats.matches_cnt).toFixed(2),
            'Sinmode.ranks': res.data.ranks.rating,
            'Sinmode.winrate': (res.data.stats.win_matches_cnt / res.data.stats.matches_cnt).toFixed(2),
            'Sinmode.toptenrate': (res.data.stats.topten_matches_cnt / res.data.stats.matches_cnt).toFixed(2),
            'Sinmode.kda': (res.data.stats.kills_sum / res.data.stats.deaths_sum).toFixed(2)
          }
        )
      }
    })
    mode = 2
    wx.request({
      url: `https://pubg.op.gg/api/users/${this.data.userID}/ranked-stats?season=2018-04&&server=${server}&&queue_size=${mode}&&mode=tpp`,
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        that.setData(
          {
            'Duomode.rating': res.data.stats.rating,
            'Duomode.win': res.data.stats.win_matches_cnt,
            'Duomode.topten': res.data.stats.topten_matches_cnt,
            'Duomode.killsavg': (res.data.stats.kills_sum / res.data.stats.matches_cnt).toFixed(2),
            'Duomode.ranks': res.data.ranks.rating,
            'Duomode.winrate': (res.data.stats.win_matches_cnt / res.data.stats.matches_cnt).toFixed(2),
            'Duomode.toptenrate': (res.data.stats.topten_matches_cnt / res.data.stats.matches_cnt).toFixed(2),
            'Duomode.kda': (res.data.stats.kills_sum / res.data.stats.deaths_sum).toFixed(2)
          }
        )
      }
    })
    /*wx.request({
      url: `https://pubg.op.gg/api/users/${this.data.userID}/ranked-stats?season=2018-04&&server=as&&queue_size=4&&mode=tpp`,
      header: {
        "Content-Type": "application/json"
      },
      success:function (res){
        var Rating = res.data.stats.rating
        var chicks = res.data.stats.win_matches_cnt
        var topten = res.data.stats.topten_matches_cnt
        var killmax = res.data.stats.kills_max
        var killsum = res.data.stats.kills_sum
        var matchsum = res.data.stats.matches_cnt
        var headshotsum = res.data.stats.headshot_kills_sum
        var deathsum = res.data.stats.deaths_sum
        var rank = res.data.ranks.rating
        var max_rank = res.data.max_ranks.rating
        console.log(Rating)
      }
    })*/

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