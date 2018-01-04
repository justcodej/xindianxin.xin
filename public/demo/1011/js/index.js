window.onload = function(){
	(function(){
		//con到页面左边和上边的距离
		var cLeft = con.offsetLeft;
		var cTop = con.offsetTop;
		// con的宽高
		var cWidth = con.offsetWidth;
		var cHeight = con.offsetHeight;
		// 调整宽度的时候
		window.onresize = function(){
			var cLeft = con.offsetLeft;
			var cTop = con.offsetTop;
		};
		init();
		// 初始化
		function init(){
			con.innerHTML = '';
			for (var i = 0; i <= 2; i++) {
				var oP = document.createElement('p');
				var html = '';
				switch(i){
					case 0:
					html = '普通难度';
					oP.bSpeed = 100;
						break;
					case 1:
					html = '中等难度';
					oP.bSpeed = 300;
						break;
					case 2:
					html = '开挂模式';
					oP.bSpeed = 50;
						break;
				};
				oP.innerHTML = html;
				oP.className = 'menu';
				con.appendChild(oP);
				oP.onclick = function(e){
					e = e || event;
					startGame(e,this.bSpeed);
				}
			};
		};

		// 开始生成游戏
		function startGame(e, bSpeed){
			// 计数器
			con.innerHTML = '';
			var score = 0;
			var oS = document.createElement('span');
			oS.className = 'score';
			oS.innerHTML = score;
			con.appendChild(oS);
			// 生成飞机
			var oPlane = document.createElement('img');
			oPlane.src = 'images/plane.png';
			oPlane.className = 'plane';
			oPlane.width = 60;
			oPlane.height = 36;
			oPlane.style.left = e.clientX - cLeft - 5 -oPlane.offsetWidth/2+'px';
			oPlane.style.top = e.clientY - cTop - 5 -oPlane.offsetHeight/2+'px';
			con.appendChild(oPlane);
			// 鼠标移动
			var leftMin = -oPlane.width/2+5,
				leftMax = parseFloat(getStyle(con,'width'))-oPlane.width/2-5,
				topMin = 0,
				topMax = con.offsetHeight-oPlane.height-10;
			document.onmousemove = function(e){
				e = e || event;
				var x = e.pageX-cLeft-5-oPlane.width/2;
				var y = e.pageY-cTop-5-oPlane.height/2;

				x = Math.max(leftMin,x);
				x = Math.min(leftMax,x);

				y = Math.max(topMin,y);
				y = Math.min(topMax,y);
				
				oPlane.style.cssText = 'left:'+x+'px;top:'+y+'px;';
			}

			// 生成子弹
			var bTimer = setInterval(function(){
				var oBullet = document.createElement('img');
				oBullet.src = 'images/bullet.png';
				oBullet.className = 'bullet';
				oBullet.width = 6;
				oBullet.height = 22;
				con.appendChild(oBullet);
				oBullet.style.left = oPlane.offsetLeft-5 + oPlane.offsetWidth/2+oBullet.offsetWidth/2+'px';
				oBullet.style.top = oPlane.offsetTop - oBullet.offsetHeight+'px';
				var zd = setInterval(function(){
					oBullet.style.top =  oBullet.offsetTop -10 +'px';
					if (oBullet.offsetTop < -oBullet.offsetHeight) {
						clearInterval(zd);
					 	con.removeChild(oBullet);
					}
				},13);
			},bSpeed);

			// 生成敌方飞机
			var eTimer = setInterval(function(){
				var a = Math.round( Math.random()*(8-2)+1 );
				var enemy = document.createElement('img');
				enemy.className = 'enemy';
				enemy.src = 'images/enemy.png';
				enemy.width = 22;
				enemy.height = 30;
				enemy.style.left = Math.round( Math.random()*(400-0)+0 )+'px';
				con.appendChild(enemy);
				var timer = setInterval(function(){
					enemy.style.top = enemy.offsetTop + a +'px';
					if (enemy.offsetTop >= con.offsetHeight ) {
						clearInterval( timer );
						con.removeChild(enemy);
					};
					if (!enemy.parentNode) {
						clearInterval(timer);
					};
				},13)
				// 敌方飞机和我方飞机检测
				var pzTimer = setInterval(function(){
					if (pz(oPlane,enemy) && /enemy/.test(enemy.src)) {
						oPlane.src = 'images/boom2.png';
						enemy.src = 'images/boom.png';
						clearInterval(eTimer);	// 停止生成地方飞机
						clearInterval(pzTimer); // 停止飞机碰撞检测
						clearInterval(bTimer); // 清除生成子弹
						clearInterval(timer);	// 停止敌方飞机移动
						document.onmousemove = null;
						setTimeout(function(){
							GAMEOVER();
						},1000);
					};
					// 敌方飞机和指弹检测
					var allbiu = getClass('bullet');
					for (var i = 0; i < allbiu.length; i++) {
						
						if ( pz(enemy,allbiu[i])){
							enemy.src = 'images/boom.png';
							clearInterval(timer); // 停止地方飞机移动
							clearInterval(pzTimer); // 停止飞机碰撞检测
							score += 100;
							oS.innerHTML = score;
							allbiu[i].parentNode.removeChild(allbiu[i]);
							setTimeout(function(){
								if (enemy.parentNode) {
									con.removeChild(enemy);
								};
							},400);
						};
					};
				},13);
			},50);


			// 碰撞检测
			function pz(obj1,obj2){  // 这里是物体1
				var T1 = obj1.offsetTop,
					R1 = obj1.offsetLeft+obj1.clientWidth,
					B1 = obj1.offsetTop+obj1.clientHeight,
					L1 = obj1.offsetLeft;

				var T2 = obj2.offsetTop, // 这里是物体2
					R2 = obj2.offsetLeft+obj2.clientWidth,
					B2 = obj2.offsetTop+obj2.clientHeight,
					L2 = obj2.offsetLeft;
				if (B2 < T1 || L2 > R1 || T2 > B1 || R2 < L1) {
					return false;
				}else{
					return true;
				};
			};
			function GAMEOVER(){
				con.innerHTML = '';
				var oDiv = document.createElement('div');
				oDiv.className = 'box';
				var oH = document.createElement('h2');
				oH.innerHTML = '游戏结束';
				oH.className = 'Gover';
				var oP = document.createElement('p');
				oP.innerHTML = '重新开始';
				oP.className = 'reStart';
				oP.onclick = function(){
					con.removeChild(oDiv);
					init();
				};
				var oSpan = document.createElement('span');
				oSpan.className = 'fs';
				oSpan.innerHTML = '得分：'+score;
				oDiv.display = 'none';

				con.appendChild(oDiv);
				oDiv.appendChild(oH);
				oDiv.appendChild(oP);
				oDiv.appendChild(oSpan);
			};
			// 扩展方法
			function getStyle(obj,attr){
				return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
			}
			// getClass
			function getClass(cName){
				if (document.getElementsByClassName) {
					return document.getElementsByClassName(cName);
				}else{
					var all = document.getElementsByClassName('*');
					var arr = [];
					for (var i = 0; i < all.length; i++) {
						var className = all[i].className;
						var arrClass = className.pcript(' ');
						for (var j = 0; j < arrClass.length; j++) {
							if (arrClass[j] == cName) {
								arr.push(all[i]);
							};
						};
					};
				};
			};
		};
	})();
}