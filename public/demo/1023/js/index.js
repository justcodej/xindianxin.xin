var oWrap = document.getElementById('wrap');
var $ul = $('#wrap ul');
var $Li = $('#wrap ul li')
var length = $Li.length;
var num = 0;

// 加载10个

show();
function show(){
	var oDiv = create();
	$Li.eq(getShort()).append(oDiv);
	var oImg = oDiv.getElementsByTagName('img')[0];
	$(oDiv).fadeIn();
	oImg.onload = function(){
		if (num < 10) {
			num++;
			show();
		};
	};
}

$(document).scroll(function(){

	var scrollH = $ul.offset().top+$ul.height()-$(document).scrollTop();
	var pageH = $(window).height()+500;

	if (scrollH <= pageH){
		var oDiv = document.createElement('div');
			oDiv.className = 'loading';
		var oP = document.createElement('p');
			oP.innerHTML = '正在加载中...';
		oDiv.appendChild(oP);
		oWrap.appendChild(oDiv);
		show();
	}
});
	


function getShort(){
	var a = 0;
	var FH = $Li.eq(0).height();

	for (var i = 1; i < length; i++) {

		var NH = $Li.eq(i).height();
		if (NH < FH) {
			a = i;
			FH = NH;
		}
	}
	return a;
}

function create(){
	var oDiv = document.createElement('div');
		oDiv.className = 'detail';
	var oImg = new Image();
		oImg.src = 'images/1.jpg';
	var oA = document.createElement('a');
		oA.href = 'javascript:;';
	var oP = document.createElement('p');
		oP.className = 'text';
		oP.innerHTML = '服渡 春装新款2016男士工装服宽松版型帆布夹克男装青年上衣外套';
	var oSpan1 = document.createElement('span');
		oSpan1.innerHTML = '加入豆列37';
	var oSpan2 = document.createElement('span');
		oSpan2.innerHTML = '喜欢74';
	var oSpan3 = document.createElement('span');
		oSpan3.innerHTML = '评论2';
	oA.appendChild(oP);
	oDiv.appendChild(oImg);
	oDiv.appendChild(oA);
	oDiv.appendChild(oSpan1);
	oDiv.appendChild(oSpan2);
	oDiv.appendChild(oSpan3);
	return oDiv;
}
/*

	<div class="detail">
		<img src="images/1.jpg" alt="">
		<a href="#"><p class='text'>服渡 春装新款2016男士工装服宽松版型帆布夹克男装青年上衣外套</p></a>
		<span>加入豆列37</span>
		<span>喜欢74</span>
		<span>评论2</span>
	</div>
*/