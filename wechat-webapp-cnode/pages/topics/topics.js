'use strict';

// posts.js
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');

var isMoveTop = true;
var pageYArray = [0, 0, 0];
var windowHeight = null;

Page({
    data: {
        title: '话题列表',
        postsList: [],
        hidden: false,
        page: 1,
        tab: 'all',
        animationData: {}
    },
    onPullDownRefresh: function onPullDownRefresh() {
        this.fetchData();
        console.log('下拉刷新', new Date());
    },
    onLoad: function onLoad() {
        this.fetchData();
        // 获取设备信息
        wx.getSystemInfo({
            success: function (res) {
                // console.log(res.model)
                // console.log(res.pixelRatio)
                // console.log(res.windowWidth)
                // console.log(res.windowHeight)
                // 获取窗体高度
                windowHeight = res.windowHeight;
                // console.log(res.language)
                // console.log(res.version)
            }
        });
        this.resetStatus();
    },
    onTapTag: function onTapTag(e) {
        var self = this;
        var tab = e.currentTarget.id;
        self.setData({
            tab: tab
        });
        if (tab !== 'all') {
            this.fetchData({
                tab: tab
            });
        } else {
            this.fetchData();
        }
    },
    fetchData: function fetchData(data) {
        var self = this;
        self.setData({
            hidden: false
        });
        if (!data) data = {};
        if (!data.page) data.page = 1;
        if (data.page === 1) {
            self.setData({
                postsList: []
            });
        }
        wx.request({
            url: Api.getTopics(data),
            success: function success(res) {
                self.setData({
                    postsList: self.data.postsList.concat(res.data.data.map(function (item) {
                        item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
                        return item;
                    }))
                });
                setTimeout(function () {
                    self.setData({
                        hidden: true
                    });
                }, 300);
            }
        });
    },
    redictDetail: function redictDetail(e) {
        console.log('我要看详情');
        var id = e.currentTarget.id,
            url = '../detail/detail?id=' + id;
        wx.navigateTo({
            url: url
        });
    },
    lower: function lower(e) {
        var self = this;
        self.setData({
            page: self.data.page + 1
        });
        if (self.data.tab !== 'all') {
            this.fetchData({
                tab: self.data.tab,
                page: self.data.page
            });
        } else {
            this.fetchData({
                page: self.data.page
            });
        }
    },
    upper: function upper(event) {
        isMoveTop = true;
        console.log(isMoveTop, event);
    },
    tapMove: function tapMove(event) {
        if (isMoveTop) {
            if (pageYArray[0] === 0) {
                pageYArray[0] = event.touches[0].pageY;
            } else {
                pageYArray[1] = event.touches[0].pageY;
            }

            var pageYNum = pageYArray[1] - pageYArray[0];

            pageYArray[2] = pageYNum;

            console.log(pageYArray);

            var animation = wx.createAnimation({
                duration: 400,
                timingFunction: 'ease'
            });
            this.animation = animation;

            if (pageYNum < (windowHeight * .8)) {
                // 向下拖拽动画
                animation.translate(0, pageYNum).step({
                    duration: 420,
                    timingFunction: 'ease-in'
                });
            } else {
                this.jumping(animation);
                this.resetStatus();
            }
            this.setData({
                animationData: animation.export(),
            });
        }
    },
    touchstart: function touchend() {
        if (isMoveTop !== false) {
            this.moveToTop();
            this.resetStatus();
        }
    },
    touchend: function touchend() {
        this.moveToTop();
        this.resetStatus();
    },
    moveToTop: function () {
        var animation = wx.createAnimation({
            duration: 400,
            timingFunction: 'ease'
        });
        this.animation = animation;
        this.jumping(animation);
        this.setData({
            animationData: animation.export(),
        });
    },
    jumping: function (animation) {
        animation.translate(0, -(pageYArray[2] * .12)).step({
            duration: 600,
            timingFunction: 'ease-in'
        });
        animation.translate(0, -10).step({
            duration: 600,
            timingFunction: 'ease-out'
        });
    },
    resetStatus: function () {
        console.log('i\'m resetStatus');
        isMoveTop = false;
        pageYArray = [0, 0, 0];
    }
});

// var order = ['red', 'yellow', 'blue', 'green', 'red']
// Page({
//   data: {
//     toView: 'red',
//     scrollTop: 100
//   },
//   upper: function(e) {
//     console.log(e)
//   },
//   lower: function(e) {
//     console.log(e)
//   },
//   scroll: function(e) {
//     console.log(e)
//   },
//   tap: function(e) {
//     for (var i = 0; i < order.length; ++i) {
//       if (order[i] === this.data.toView) {
//         this.setData({
//           toView: order[i + 1]
//         })
//         break
//       }
//     }
//   },
//   tapMove: function(e) {
//     this.setData({
//       scrollTop: this.data.scrollTop + 10
//     })
//   }
// })
