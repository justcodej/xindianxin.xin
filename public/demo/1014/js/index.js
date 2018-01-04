window.onload = function(){
	var oCanvas = document.getElementById('canvas');
	var context = oCanvas.getContext('2d');
	var aBtn = document.getElementById('tool').getElementsByTagName('li');
	var oWrap = document.getElementById('wrap');

	oCanvas.onmousedown = function(e){
		var xS = e.pageX - this.offsetLeft;
		var yS = e.pageY - this.offsetTop;
		var This = this;
		context.lineWidth = '4';
		context.beginPath();
		context.moveTo(xS,yS);
		document.onmousemove = function(e){
			var xN = e.pageX - This.offsetLeft;
			var yN = e.pageY - This.offsetTop;
			context.lineTo(xN,yN);
			context.stroke();
		};
		document.onmouseup = function(){
			this.onmousemove = null;
			this.onmouseup = null;
		};
	};
	aBtn[1].onclick = function(){
		context.clearRect(0,0,oCanvas.offsetWidth,oCanvas.offsetHeight);
	};
	aBtn[2].onclick = function(e){
		var xS = e.pageX - 15;
		var yS = e.pageY - 15;
		var oDiv = document.createElement('div');
		oDiv.className = 'clear';
		oDiv.style.top = yS + 'px';
		oDiv.style.left = xS + 'px';
		document.body.appendChild(oDiv);
		document.onmousemove = function(e){
			var xN = e.pageX - oDiv.offsetWidth/2;
			var yN = e.pageY - oDiv.offsetHeight/2;
			oDiv.className = 'clear';
			oDiv.style.top = yN+'px';
			oDiv.style.left = xN+'px';
		};
		oDiv.onmousedown = function(){
			this.onmousemove = function(e){
				var xN = e.pageX - oCanvas.offsetLeft - 15;
				var yN = e.pageY - oCanvas.offsetTop - 15;
				context.clearRect(xN,yN,30,30)
			}
			document.onmouseup = function(){
				oDiv.onmousemove = null;
				this.onmouseup = null;
			};
		};
		document.onkeydown = function(e){
			if (e.keyCode == 27) {
				this.body.removeChild(oDiv);
				this.onkeydown = null; 
			}
		};
	};

	aBtn[3].onclick = function(){	
		oWrap.style.display = 'block';
		var oDiv = document.createElement('div');
		oWrap.innerHTML = '';
		oWrap.onmousedown = function(e){
			var xS = e.pageX - oCanvas.offsetLeft;
			var yS = e.pageY - oCanvas.offsetTop;
			context.lineWidth = '4';
			context.beginPath();
			var r;
			document.onmousemove = function(e){
				var xN = e.pageX - oCanvas.offsetLeft;
				var yN = e.pageY - oCanvas.offsetTop;
				oDiv.style.cssText = 'position:absolute;top:'+yS+'px;left:'+xS+'px;border-radius:100%;border:1px solid orange;';
				r = Math.max(xN-xS,yN-yS);
				oDiv.style.width = r+'px';
				oDiv.style.height = r+'px';
				oWrap.appendChild(oDiv);
			};
			document.onmouseup = function(){
				this.onmousemove = null;
				var xR = oDiv.offsetLeft + r/2;
				var yR = oDiv.offsetTop + r/2;
					r = r/2;
					console.log(xR +','+ yR)
				context.arc(xR,yR,r,0,2*Math.PI,true);
				context.stroke();
				oWrap.style.display = 'none';
				this.onmouseup = null;
			};
		};
	}
};