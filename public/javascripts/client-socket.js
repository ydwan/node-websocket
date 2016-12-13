var ws = io.connect('http://127.0.0.1:3000');
var sendMsg = function (msg) {
	ws.emit('send.message', msg);
}
var addMessage = function (from, msg) {
	var li = document.createElement('li');
	li.innerHTML = '<span>' + from + '</span>' + ' : ' + msg;
	document.querySelector('#chat_conatiner').appendChild(li);

	// 设置内容区的滚动条到底部
	document.querySelector('#chat').scrollTop = document.querySelector('#chat').scrollHeight;

	// 并设置焦点
	document.querySelector('textarea').focus();

}

var send = function () {
	var ele_msg = document.querySelector('textarea');
	var msg = ele_msg.value.replace('\r\n', '').trim();
	console.log(msg);
	if (!msg) return;
	sendMsg(msg);
	// 添加消息到自己的内容区
	addMessage('你', msg);
	ele_msg.value = '';
}

ws.on('connect', function () {
	var nickname = window.prompt('输入你的昵称!');
	while (!nickname) {
		nickname = window.prompt('昵称不能为空，请重新输入!')
	}
	ws.emit('join', nickname);
});

// 昵称有重复
ws.on('nickname', function () {
	var nickname = window.prompt('昵称有重复，请重新输入!');
	while (!nickname) {
		nickname = window.prompt('昵称不能为空，请重新输入!')
	}
	ws.emit('join', nickname);
});

ws.on('send.message', function (from, msg) {
	addMessage(from, msg);
});

ws.on('announcement', function (from, msg) {
	addMessage(from, msg);
});

document.querySelector('textarea').addEventListener('keypress', function (event) {
	if (event.which == 13) {
		send();
	}
});
document.querySelector('textarea').addEventListener('keydown', function (event) {
	if (event.which == 13) {
		send();
	}
});
document.querySelector('#send').addEventListener('click', function () {
	send();
});

document.querySelector('#clear').addEventListener('click', function () {
	document.querySelector('#chat_conatiner').innerHTML = '';
});