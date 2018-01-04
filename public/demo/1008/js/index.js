window.onload = function(){
	var oCanvas = document.getElementById('canvas');
	var context = oCanvas.getContext('2d');
	var size = 14;
	var length = document.body.offsetWidth/size;
	var arr = [];
	for (var i = 0; i < length; i++) {
		arr[i] = 0;
	}

	oCanvas.width = window.screen.width;
	oCanvas.height = window.screen.height;



	(function draw(){
		context.beginPath();
		context.fillStyle = 'rgba(0,0,0,.1)';
		context.fillRect(0,0,oCanvas.width,oCanvas.height);

		context.beginPath();
		context.fillStyle = 'orange';
		context.font = 'bold 14px/14px Microsoft yahei';
		
		for (var i = 0; i < length; i++) {
			var x = i*size;
			var y = arr[i];
			var num = parseInt( Math.random()*10 );
			context.fillText(num,x,y);
			arr[i] += size;
			if (y >= oCanvas.height && Math.random() >= 0.9 ) {
				arr[i] = 0;
			}
		}
		window.requestAnimationFrame(draw);
	})();
};