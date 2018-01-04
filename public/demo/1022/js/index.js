window.onload = function(){
	(function(){
		var oWrap = document.getElementById('wrap');
		var aLi = oWrap.getElementsByTagName('li');
		var length = aLi.length;
		var Deg = 360/11
		var timer,xD,yD,xM,yM,xN,yN,xL,yL,xO,yO,xC,yC;
		var xRo = -15,yRo = 0;

		for (var i = 0; i < length; i++) {
			aLi[i].style.transform = 'rotateY('+ i*Deg +'deg) translateZ(350px)';
		}

		document.onmousedown = function(e){
			clearInterval(timer);
			e = e || event;
			xD = e.pageX;
			yD = e.pageY;

			this.onmousemove = function(e){
				xM = e.pageX;
				yM = e.pageY;
				xN = (xM-xD)*0.2;
				yN = (yM-yD)*0.1;
				xL = e.pageX;
				yL = e.pageY;
				xC = xL-xO;
				yC = yL-yO;
				oWrap.style.transform = 'translate(-50%,-50%) translateZ(-100px) rotateX('+ (xRo-yN) +'deg) rotateY('+ (xN+yRo) +'deg)';
				xO = e.pageX;
				yO = e.pageY;
			}
			this.onmouseup = function(){
				xRo = xRo-yN;
				yRo = xN+yRo;
				timer = setInterval(function(){
					xC *= 0.95;
					yC *= 0.95;
					xRo -= yC * 0.1;
					yRo += xC * 0.1;
					if (Math.abs( xC ) <= 0.1 && Math.abs( yC ) <= 0.1) {
						clearInterval(timer);
					}
					oWrap.style.transform = 'translate(-50%,-50%) translateZ(-100px) rotateX('+ (xRo) +'deg) rotateY('+ (yRo) +'deg)';
				},13)
				this.onmousemove = null;
				this.onmouseup = null;
			}
		}
	})();
}