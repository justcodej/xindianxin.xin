window.onload = function(){
	var oCan = document.getElementById('canvas');
	var cxt = oCan.getContext('2d');
	var num = 200;
	var arr = [];
	var move = {};

	var w = oCan.width = window.innerWidth;
	var h = oCan.height = window.innerHeight;

	document.onmousemove = function(e){
		move.x = e.clientX;
		move.y = e.clientY;
	};
	
	for (var i = 0; i < num; i++) {
		arr[i] = {
			x : parseInt( Math.random()*w ),
			y : parseInt( Math.random()*h ),
			changeX : Math.random()*1-0.5,
			changeY : Math.random()*1-0.5,
		};
		Cricle(arr[i].x,arr[i].y);
	};

	!function draw(){
		cxt.clearRect(0,0,w,h);
		for (var i = 0; i < num; i++) {
			arr[i].x += arr[i].changeX;
			arr[i].y += arr[i].changeY;
			Cricle( arr[i].x , arr[i].y );
			if ( arr[i].x > w || arr[i].x < 0 )arr[i].changeX = -arr[i].changeX;
			if ( arr[i].y > h || arr[i].y < 0 )arr[i].changeY = -arr[i].changeY;
			for (var j = 0; j < num; j++) {
				if ( Math.pow( (arr[i].x - arr[j].x) ,2)+Math.pow( arr[i].y-arr[j].y ,2) <= 80*80) {
					line( arr[i].x,arr[i].y,arr[j].x,arr[j].y );
				};
				if ( Math.pow( move.x - arr[j].x ,2)+Math.pow( move.y-arr[j].y ,2 ) <= 150*150 ) {
					line( move.x,move.y,arr[j].x,arr[j].y );
				};
			};
		};
			
		window.requestAnimationFrame(draw);
	}();
	
	function line( X1,Y1,X2,Y2 ){
		cxt.save();
		cxt.beginPath();
		cxt.strokeStyle = '#333';
		cxt.moveTo(X1,Y1);
		cxt.lineTo(X2,Y2);
		cxt.stroke();
		cxt.restore();
	};

	function Cricle(x,y){
		cxt.save();
		cxt.beginPath();
		cxt.strokeStyle = '#ddd';
		cxt.arc(x,y,.5,0,2*Math.PI,true);
		cxt.stroke();
		cxt.restore();
	};

};