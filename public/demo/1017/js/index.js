var oBtn = document.getElementById('btn');
var oCon = document.getElementById('con');
var oSpan = oCon.getElementsByTagName('span')[0];
var oDe = document.getElementById('de');
var oShi = document.getElementById('shi');
var arrUrl = [];
var arrNum = [];
var timer = 0;
var sp = 1;
for (var i = 1; i <= 36; i++) {
	arrUrl.push(''+i+'fix@2x.png');
}
for (var i = 5; i >= 1; i--) {
	arrNum.push( i,-i);
}
arrNum.push( 0 );

oBtn.onclick = function(){
	fn();
};
function fn(){
	var num = Math.round( Math.random()*(36-1)+1 );
	var n = Math.round( Math.random()*(980-20)+20 );
	var newPos = 0;
	oBtn.innerHTML = '游戏中...';
	oSpan.style.top = '-35px';
	oSpan.style.left = n +'px';
	oSpan.style.background = 'url(images/'+ arrUrl[num] +')';
	Move(oSpan,'top',sp,600,function(){
		sp++;
		fn();
	});
	
};
oSpan.onclick = function(){
	var dir = parseInt( getStyle( oSpan,'left' ) );
	var nn = 0;
	oSpan.timer = setInterval(function(){
		oSpan.style.left = dir + arrNum[nn] + 'px';
		nn++;
		if (nn == arrNum.length) {
			nn = arrNum.length-1;
			clearInterval(oSpan.timer);
			oSpan.style.top = '600px';
		};
	},13);
};


function Move( obj,attr,speed,target,endFn ){
	clearInterval( obj.timer );
	speed = parseInt( getStyle( obj,attr ) ) > target? -speed:speed;
	obj.timer = setInterval(function(){
		var n = 0;
		n = parseInt( getStyle( obj,attr ) ) + speed;
		if (n >= target && speed > 0 || n <= target && speed < 0) {
			n = target;
		}
		if (n != target){
			obj.style[attr] = n + 'px';
		}else{
			obj.style[attr] = n + 'px';
			clearInterval( obj.timer );
			endFn && endFn.call(obj);
		}
	},13);
}


function getStyle( obj,attr ){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
};