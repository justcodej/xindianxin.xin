(function(){

	var oBanner = document.querySelectorAll('#banner .img')[0];
	var oUl = document.querySelectorAll('#banner .img ul')[0];
	var aTabLi = document.querySelectorAll('#banner .tab li');
	var index = 0;
	var timer = null;
	var length = aTabLi.length;

	oBanner.ontouchstart = function(e){
		var sX = e.changedTouches[0].pageX;
		var sLeft = parseInt( getComputedStyle(oUl).marginLeft );
		this.ontouchmove = function(e){
			clearInterval(timer);
			var xN = e.changedTouches[0].pageX;
			oUl.style.marginLeft = sLeft + xN - sX + 'px';
		};
		this.ontouchend = function(e){
			var eX = e.changedTouches[0].pageX;
			this.ontouchmove = null;
			this.ontouchend = null;
			if (eX - sX < -30)
			index++;
			else if(eX - sX > 30)
			index--;
			oUl.className = 'tran';
			oUl.style.marginLeft =  -(index+1)*100+'%';
			autoPlay();
		};
	};

	autoPlay();
	function autoPlay(){
		timer = setInterval(function(){
			index++;
			oUl.className = 'tran';
			oUl.style.marginLeft =  -(index+1)*100+'%';
		},3000);
	};

	oUl.addEventListener('transitionend',function(){
		this.className = '';
		if (index == 6) index = 0;
		if (index == -1) index = length-1;
		oUl.style.marginLeft =  -(index+1)*100+'%';
		for (var i = 0; i < length; i++) aTabLi[i].className = '';
		aTabLi[index].className = 'on';
	});
})();