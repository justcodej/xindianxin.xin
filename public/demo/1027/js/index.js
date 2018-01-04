var oWrap = document.querySelectorAll('#wrap')[0];
var aLi = document.querySelectorAll('#wrap .show ul li');
var oImg = document.querySelectorAll('#wrap .show .img')[0];
var oView = document.querySelectorAll('#wrap .show .view')[0];
var length = aLi.length;

for (var i = 0; i < length; i++) {
	aLi[i].i = i;
	aLi[i].onmouseenter = function(){
		for (var j = 0; j < length; j++)aLi[j].className = '';
		this.className = 'img-hover';
		oImg.src = 'images/'+(this.i+1)+'-'+(this.i+1)+'.jpg';
	}
}

oView.onmouseenter = function(){
	var oDiv1 = document.createElement('div');
		oDiv1.className = 'bigImg';
	var oDiv2 = document.createElement('div');
		oDiv2.className = 'drag';
	var oImg = new Image();
		oImg.src = this.getElementsByTagName('img')[0].src;
		oDiv1.appendChild(oImg);
	document.getElementById('wrap').appendChild(oDiv1);
	this.appendChild(oDiv2);

	this.onmousemove = function(e){
		e = e||event;
		var x = e.clientX-oWrap.offsetLeft-oDiv2.offsetWidth/2;
		var y = e.clientY-oWrap.offsetTop-oDiv2.offsetHeight/2;

		x = Math.max(0,x);
		x = Math.min(140,x);
		y = Math.max(0,y);
		y = Math.min(140,y);

		oDiv2.style.cssText = 'top:'+(y)+'px;left:'+(x)+'px;';
		oImg.style.cssText = 'top:'+-(y*1.9)+'px;left:'+-(x*1.9)+'px;';
	}
	this.onmouseleave = function(){
		this.parentNode.parentNode.removeChild(oDiv1);
		this.removeChild(oDiv2);
	}
}
