var ws = new WebSocket("ws://127.0.0.1:3001");
ws.addEventListener("open", function () {
    console.log("连接状态", ws);
    console.log("open");
});

ws.addEventListener("message", function (evt) {
    var data = JSON.parse(evt.data);
    dataConfig.auctionList = data.auctionList;
    dataConfig.maxMoney = data.maxMoney || 0;
});

ws.addEventListener("close", function (evt) {
    console.log("WebSocketClosed!");
    console.log(evt);
});

ws.addEventListener("error", function (evt) {
    console.log("WebSocketError!");
});


function exit() {
    var r = ws.close();
    console.log("退出", r);
}

var dataConfig = {
    username: "",
    auctionMoney: "",
    maxMoney: 0,
    auctionList: []
};


var appVue = new Vue({
    el: ".wrapper",
    data: dataConfig,
    methods: {
        pullAuction: function (username, auctionMoney) {
            if (!auctionMoney) {
                return false;
            }
            if (Number(auctionMoney) > this.maxMoney) {
                var sendModel = {
                    username: username,
                    auctionMoney: auctionMoney
                };
                ws.send(JSON.stringify(sendModel));
            }
        }
    },
    watch: {
        auctionMoney: function (newVal, oldVal) {
            if (isNaN(newVal)) {
                this.auctionMoney = this.maxMoney + 100;
            }
        }
    }
});