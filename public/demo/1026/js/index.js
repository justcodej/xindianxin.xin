	

var oWrap = document.getElementById('wrap')
var aBtn = oWrap.getElementsByTagName('label');
var oBg = document.getElementById('bg');
var $tip = $('#tip');
var length = aBtn.length;
var timer = null;

(function(){
	for (var i = 0; i < length; i++) {
		aBtn[i].onclick = function(){
			oBg.style.display = 'block';
			$('#bg .alert').stop().animate({
				bottom : '50%',
			},'fast');
		}
	}
	$('button').click(function(){
		$tip.css({
			display : 'none',
		});
		$('#bg').css({
			display : 'none',
		});
		$('#bg .alert').css({
			bottom : '-200px',
		});
	});

	$(document).keydown(function(e){
		e = e||event;
		switch(e.keyCode){
			case 27:
				$tip.find('p').html('这是一个Esc事件');
				break;
			case 112:
				$tip.find('p').html('这是一个F1事件');
				break;
			case 113:
				$tip.find('p').html('这是一个F2事件');
				break;
			case 114:
				$tip.find('p').html('这是一个F3事件');
				break;
			case 115:
				$tip.find('p').html('这是一个F4事件');
				break;
			case 116:
				$tip.find('p').html('这是一个F5事件');
				break;
			case 117:
				$tip.find('p').html('这是一个F6事件');
				break;
			case 118:
				$tip.find('p').html('这是一个F7事件');
				break;
			case 119:
				$tip.find('p').html('这是一个F8事件');
				break;
			case 120:
				$tip.find('p').html('这是一个F9事件');
				break;
			case 121:
				$tip.find('p').html('这是一个F10事件');
				break;
			case 122:
				$tip.find('p').html('这是一个F11事件');
				break;
			case 123:
				$tip.find('p').html('这是一个F12事件');
				break;
			case 112:
				$tip.find('p').html('这是一个F1事件');
				break;
			case 49:
				$tip.find('p').html('这是一个1事件');
				break;
			case 50:
				$tip.find('p').html('这是一个2事件');
				break;
			case 51:
				$tip.find('p').html('这是一个3事件');
				break;
			case 52:
				$tip.find('p').html('这是一个4事件');
				break;
			case 53:
				$tip.find('p').html('这是一个5事件');
				break;
			case 54:
				$tip.find('p').html('这是一个6事件');
				break;
			case 55:
				$tip.find('p').html('这是一个7事件');
				break;
			case 56:
				$tip.find('p').html('这是一个8事件');
				break;
			case 57:
				$tip.find('p').html('这是一个9事件');
				break;
			case 48:
				$tip.find('p').html('这是一个0事件');
				break;
			case 8:
				$tip.find('p').html('这是一个BackSpace事件');
				break;
			case 35:
				$tip.find('p').html('这是一个End事件');
				break;
			case 36:
				$tip.find('p').html('这是一个Home事件');
				break;
			case 9:
				$tip.find('p').html('这是一个Tab事件');
				break;
			case 81:
				$tip.find('p').html('这是一个Q事件');
				break;
			case 87:
				$tip.find('p').html('这是一个W事件');
				break;
			case 69:
				$tip.find('p').html('这是一个E事件');
				break;
			case 82:
				$tip.find('p').html('这是一个R事件');
				break;
			case 84:
				$tip.find('p').html('这是一个T事件');
				break;
			case 89:
				$tip.find('p').html('这是一个Y事件');
				break;
			case 85:
				$tip.find('p').html('这是一个U事件');
				break;
			case 73:
				$tip.find('p').html('这是一个I事件');
				break;
			case 79:
				$tip.find('p').html('这是一个O事件');
				break;
			case 80:
				$tip.find('p').html('这是一个P事件');
				break;
			case 46:
				$tip.find('p').html('这是一个Delete事件');
				break;
			case 220:
				$tip.find('p').html('这是一个\\事件');
				break;
			case 20:
				$tip.find('p').html('这是一个CapsLock事件');
				break;
			case 65:
				$tip.find('p').html('这是一个A事件');
				break;
			case 83:
				$tip.find('p').html('这是一个S事件');
				break;
			case 68:
				$tip.find('p').html('这是一个D事件');
				break;
			case 70:
				$tip.find('p').html('这是一个F事件');
				break;
			case 71:
				$tip.find('p').html('这是一个G事件');
				break;
			case 72:
				$tip.find('p').html('这是一个H事件');
				break;
			case 74:
				$tip.find('p').html('这是一个J事件');
				break;
			case 75:
				$tip.find('p').html('这是一个K事件');
				break;
			case 76:
				$tip.find('p').html('这是一个L事件');
				break;
			case 13:
				$tip.find('p').html('这是一个Enter事件');
				break;
			case 16:
				$tip.find('p').html('这是一个Shift事件');
				break;
			case 90:
				$tip.find('p').html('这是一个Z事件');
				break;
			case 88:
				$tip.find('p').html('这是一个X事件');
				break;
			case 67:
				$tip.find('p').html('这是一个C事件');
				break;
			case 86:
				$tip.find('p').html('这是一个V事件');
				break;
			case 66:
				$tip.find('p').html('这是一个B事件');
				break;
			case 78:
				$tip.find('p').html('这是一个N事件');
				break;
			case 77:
				$tip.find('p').html('这是一个M事件');
				break;
			case 38:
				$tip.find('p').html('这是一个↑事件');
				break;
			case 17:
				$tip.find('p').html('这是一个Ctrl事件');
				break;
			case 18:
				$tip.find('p').html('这是一个Alt事件');
				break;
			case 32:
				$tip.find('p').html('这是一个Space事件');
				break;
			case 37:
				$tip.find('p').html('这是一个←事件');
				break;
			case 39:
				$tip.find('p').html('这是一个→事件');
				break;
			case 40:
				$tip.find('p').html('这是一个↓事件');
				break;
		}
		clearTimeout(timer);
		$tip.css({
			display : 'none',
		});
		$('#bg').css({
			display : 'none',
		});
		$('#bg .alert').css({
			bottom : '-200px',
		});		$tip.stop().fadeIn('fast',function(){
			timer = setTimeout(function(){
				$tip.stop().fadeOut();
			},2000);
		});
	});

})();
