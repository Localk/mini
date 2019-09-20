//index.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        geo: {}, // 地理位置对象
        msg: { // 天气信息,填充默认值
            "basic": {
                "cid": "CN101011600",
                "location": "东城",
                "parent_city": "北京",
                "admin_area": "北京",
                "cnty": "中国",
                "lat": "39.91754532",
                "lon": "116.41875458",
                "tz": "+8.00"
            },
            "update": {
                "loc": "2019-09-20 19:12",
                "utc": "2019-09-20 11:12"
            },
            "status": "ok",
            "now": {
                "cloud": "91",
                "cond_code": "101",
                "cond_txt": "多云",
                "fl": "25",
                "hum": "53",
                "pcpn": "0.0",
                "pres": "1012",
                "tmp": "24",
                "vis": "16",
                "wind_deg": "173",
                "wind_dir": "南风",
                "wind_sc": "1",
                "wind_spd": "4"
            }

        },
        search: "", // 所有其他的城市
        dayMsg: { // 往后 3天的天气预报

        }

    },
    // 在搜索框搜索了一个城市
    inputCity(e) {
        this.setData({
            search: e.detail
        })
    },
    // 搜索框失焦，搜索城市
    searchCity() {
        console.log("查询城市：", this.data.search);
        wx.showLoading({
            title: '查询中...',
            mask: true,
            success: () => {
                wx.showToast({
                    title: '查询成功'
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.getLocation({ // 获取位置
            success: (res) => {
                this.setData({
                    geo: res
                });
                this.getWeatherMsg();
            }
        })
    },
    /**
     * 从服务端获取天气信息的函数
     */
    getWeatherMsg(rtype) {
        console.log('获取温度')
        wx.cloud.callFunction({
            name: "weather",
            data: {
                longitude: this.data.geo.longitude,
                latitude: this.data.geo.latitude,
                rtype,
            }
        }).then(r => {
            this.setData({
                msg: (r.result)[0]
            })
            console.log(this.data);
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})