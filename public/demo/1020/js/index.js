window.onload = function(){
	var oBox = document.getElementById('box');
	var oText = document.getElementsByTagName('textarea')[0];
	var oPic = document.getElementsByClassName('pic')[0];
	var oBtn = document.getElementsByTagName('p')[0];
	var oList = document.getElementById('list');

	oBtn.onclick = function(){
		var str = oText.value;
		if (str == '') {
			var oLi = document.createElement('li');
			var aImg = oPic.getElementsByTagName('img');
			for (var i = 0; i < aImg.length; i++) {
				var oImg = new Image();
					oImg.src = aImg[i].src;
					oLi.appendChild(oImg);
				oList.appendChild(oLi);
			}
		}else if(oPic.innerHTML == ''){
			var oLi = document.createElement('li');
			var oP = document.createElement('p');
				oP.innerHTML = str;
				oLi.appendChild(oP);
			oList.appendChild(oLi);
		}else{
			var aImg = oPic.getElementsByTagName('img');
			var oLi = document.createElement('li');
			var oP = document.createElement('p');
				oLi.appendChild(oP);
				oP.innerHTML = str;
			for (var i = 0; i < aImg.length; i++) {
				var oImg = new Image();
					oImg.src = aImg[i].src;
					oLi.appendChild(oImg);
			};
			oList.appendChild(oLi);
			
		};
		oPic.innerHTML = '';
		oText.value = '';
	}
	oPic.ondragenter = function(){
		this.style.background = '#bbb';
	}
	oPic.ondragleave = function(){
		this.style.background = '#fff';
	}
	oPic.ondragover = function(e){
		e.preventDefault();
	}
	oPic.ondrop = function(e){
		e = e||event;
		e.preventDefault();
		this.style.background = '#fff';
		var files = e.dataTransfer.files;
		
		for (var i in files) {
			if ( /image/.test(files[i].type) ) {
				var obj = new FileReader();
				obj.readAsDataURL(files[i]);
				obj.onload = function(){
					var oImg = new Image();
						oImg.src = this.result;
					oPic.appendChild(oImg);
				};
			};
		};
	};
};