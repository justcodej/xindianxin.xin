var aInput = document.getElementsByTagName('input');
var oSpan = document.getElementsByTagName('span')[0];

aInput[0].onfocus = function(){ // 获取到焦点事件
	fn.call(this);
}
aInput[0].onkeyup = function(){ // 键盘up事件
	fn.call(this);
}
aInput[0].onblur = function(){ // 失去焦点事件
	var oTip = this.parentNode.getElementsByClassName('tip')[0];
	var oTrue = this.parentNode.getElementsByClassName('true')[0];
	var oB = this.parentNode.getElementsByTagName('b')[0];
	if (this.value == '') {
		oTip.style.display = 'none';
		oB.style.display = 'none';
	};
}
}
function fn(){
var val = this.value;
var reg = /^[A-Za-z][a-zA-Z][a-z0-9][a-z0-9][a-z0-9]\d{6,14}$/;
var oB = this.parentNode.getElementsByTagName('b')[0];
var oTip = this.parentNode.getElementsByClassName('tip')[0];
var oTrue = this.parentNode.getElementsByClassName('true')[0];
if (reg.test(val)) {
	oTrue.style.display = 'inline-block';
	oB.style.display = 'none';
	oTip.style.display = 'none';
}else{
	oTip.style.display = 'inline-block';
	oB.style.display = 'inline-block';
	oTrue.style.display = 'none';
};