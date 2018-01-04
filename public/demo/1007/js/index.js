

(function(){
// 生成li
	var oWrap = document.getElementById('wrap');
	var oUl = oWrap.getElementsByTagName('ul')[0];
	var oContent = document.getElementById('content');
	var oCover = document.getElementById('cover');
	var oContentBox = oCover.children[0];
	var oBtn = document.getElementById('btn');
	var aP = oBtn.getElementsByTagName('p');
	var oFrabox = document.getElementById('frame');
	var oFrame = oFrabox.children[0];
	var oBack = oFrabox.getElementsByTagName('p')[0];
	var length = 125;
	init();

	(function(){
		oBtn.onmousedown = function(e){
			e.canceBubble = true;
		};
		aP[0].onclick = null;
		aP[1].onclick = null;
		aP[2].onclick = Helix;
		aP[3].onclick = Grid;
	})();

	setTimeout(Grid,1000);

	function Grid(){
		var aLi = oWrap.getElementsByTagName('li');
		for (var i = 0; i < length; i++) {
			aLi[i].x = i%5;
			aLi[i].y = parseInt(i/5)%5;
			aLi[i].z = parseInt(i/25);
			aLi[i].style.transform = 'translate3d('+( (aLi[i].x-2)*(120+250) )+'px,'+( (aLi[i].y-2)*(160+250) )+'px,'+( (aLi[i].z-2)*1000 )+'px)';
		};
	};
	
	function Helix(){
		var aLi = oWrap.getElementsByTagName('li');
		var arr = [];
		for (var i = 0; i < length; i++) {
			arr[i] = i;
		}
		for (var i = 0; i < length; i++) {
			var a = Math.floor( Math.random()*arr.length );
			aLi[arr[a]].style.transform = 'rotateY('+(i*10)+'deg) translateY('+(i-length/2)*10+'px) translateZ(900px)';
			arr.splice(a,1);
		};
	};

	function init(){
		

		for (var i = 0; i < length; i++) {
			var oLi = document.createElement('li');
			oLi.style.transform = 'translate3d('+( Math.round(Math.random()*(3400-(-2400))+(-2400)) )+'px,'+( Math.round(Math.random()*(2000-(-1500))+(-1500)) )+'px,'+( Math.round(Math.random()*(3000-0)+0) )+'px)';
			var aP1 = document.createElement('p');
			aP1.className = 'title';
			aP1.innerHTML = 'JS';
			var aP2 = document.createElement('p');
			aP2.className = 'teacher';
			aP2.innerHTML = '阿飞';
			var aP3 = document.createElement('p');
			aP3.className = 'date';
			aP3.innerHTML = '2017-3-6';
			oLi.appendChild(aP1);
			oLi.appendChild(aP2);
			oLi.appendChild(aP3);
			oUl.appendChild(oLi);
			oLi.onclick = function(){
				oCover.style.display = 'block';
				oContentBox.children[0].innerHTML = data[0].title;
				oContentBox.children[1].style.backgroundImage = 'url(../Tanzhou3Djs/data/'+( data[0].catalog )+'/index.png)';
				oContentBox.children[2].innerHTML = data[0].teacher;
				oContentBox.children[3].innerHTML = data[0].dec;
				oFrame.src = '../Tanzhou3Djs/data/'+( data[0].catalog )+'/index.html';
				setTimeout(function(){
					oContentBox.className = 'show';
				},10);
			}
		};

		oContentBox.onclick = function(){
			oContent.className = 'left';
			oFrabox.className = 'left';
		}
		oBack.onclick = function(){
			oContent.className = '';
			oFrabox.className = '';
		}

		oCover.onclick = function(){
			oContentBox.className = 'hide';
			setTimeout(function(){
				oCover.style.display = 'none';
				oContentBox.className = '';
			},1000);
		}

		var xS,yS,xM,yM,xD=0,yD=0,xL,yL,timer,timerW,nowDate=0;
		var xRo=0,yRo=0,zRo=-3000;

		oContent.onmousedown = function(e){
			clearInterval(timer);
			e = e||event;
			xS = xL = e.pageX;
			yS = yL = e.pageY;
			this.onmousemove = function(e){
				e = e||event;
				xM = e.pageX;  // 最后一个xy值
				yM = e.pageY;

				xD = xM-xL;   // 理解：代码从上往下执行 从中间取上下获取的值就是最后一个和上一个
				yD = yM-yL;

				xRo -= yD*0.2;
				yRo += xD*0.2;

				xL = e.pageX;
				yL = e.pageY;  // 上一个xy值
				oWrap.style.transform = 'translateZ('+(zRo)+'px) rotateX('+( xRo )+'deg) rotateY('+( yRo )+'deg)';
			}
			this.onmouseup = function(){
				this.onmousemove = null;
				this.onmouseup = null;
				timer = setInterval(function(){
					xD *= 0.95;
					yD *= 0.95;
					xRo -= yD*0.1;
					yRo += xD*0.1;
					if (Math.abs(xD)<=0.1 && Math.abs(yD)<=0.1) {
						clearInterval(timer);
					};
					oWrap.style.transform = 'translateZ('+(zRo)+'px) rotateX('+( xRo )+'deg) rotateY('+( yRo )+'deg)';
				},13);
			};
		};
		document.onmousewheel!==undefined?oContent.onmousewheel=scrollFn:oContent.addEventListener('DoMMouseScroll' , scrollFn);
		function scrollFn(e){
			if (new Date - nowDate >= 300) {
				nowDate = new Date;
				var d = e.wheelDelta || -e.detail;
				d<0?zMove(-1000):zMove(1000);
			};
		};

		function zMove(d){
			var startTime = new Date;
			var start = zRo;
			timerW = setInterval(function(){
				var prop = (new Date - startTime)/200;
				if (prop >= 1) {
					prop = 1;
					clearInterval(timerW);
				};
				zRo = start + prop*d;
				zRo = Math.max( -9000,zRo );
				zRo = Math.min( 0,zRo );
				oWrap.style.transform = 'translateZ('+(zRo)+'px) rotateX('+( xRo )+'deg) rotateY('+( yRo )+'deg)';
			},13);
		};
	};
})();
