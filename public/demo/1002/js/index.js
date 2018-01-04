$(document).ready(function(){
	var $content = $('#content');
	var $close = $('#content .ctrl .list .close');
	var $listUp = $('#content .ctrl .icon-fenlei');
	var $list = $('#content .ctrl .list');
	var $cd = $('#content .show .first .cd');
	var $cd2 = $('#content .show .first .cd2');
	var $cd3 = $('#content .show .first .cd3');
	var $haibao = $('#content .show .first .haibao');
	var $first = $('#content .show .first');
	var $second = $('#content .show .second');
	var $lyric = $('#content .show .second .lyric');
	var $lyricCon = $('#content .show .second .lyric .con');
	var $header = $('#content .header');
	var $ul = $('#content .ctrl .list ul');
	var $contentBg = $('#content>.bg');
	var $play = $('#content .ctrl>.iconfont:nth-child(3)');
	var $musicStart = $('#content .music-time .music-start');
	var $musicEnd = $('#content .music-time .music-end');
	var $titleTop = $('#content .header .bottom .title .bigtitle');
	var $titleBottom = $('#content .header .bottom .title .subtitle');
	var $previousPlay = $('#content .ctrl .icon-shangyishou');
	var $nextPlay = $('#content .ctrl .icon-xiayishou');
	var $randomPlay = $('#content .ctrl>.iconfont:nth-child(1)');
	var $volumeBtn = $('#content .show .second .volume .line .volume-btn');
	var $volumeLine = $('#content .show .second .volume .line');
	var $processLine = $('#content .music-time .music-line');
	var $processBtn = $('#content .music-time .music-line .process-btn');
	var oAudio = document.getElementById('audio');
	var onOff = true;
	var timer = null;
	var Minutes = 0;
	var n = 0;

	// 生成歌曲列表
	for (var i = 0; i < requestData().length; i++) $ul.append('<li>'+( requestData()[i].Name )+'</li>');
	var $li = $('#content .ctrl .list ul li');

	// 更换封面图片和歌曲src
	$li.each(function(i){
		$li.eq(i).click(function(){playing(i)});
	});

	

	// 歌曲列表弹出
	$listUp.click(function(){
		$content.append('<div class="zzc"></div>').find('.zzc').css({background : 'rgba(0,0,0,.5)'});
		$list.css({bottom : '0px'});
		document.getElementsByClassName('zzc')[0].onclick = function(){
			this.style.background = 'rgba(0,0,0,0)';
			this.parentNode.childNodes[13].childNodes[11].style.bottom = '-440px';
			var This = this;
			setTimeout(function(){
				This.parentNode.removeChild(This)
			},200);
		}
	});

	// 歌曲列表事件
	$li.mousedown(function(){
		$(this).css({background : '#090909'});
	}).mouseup(function(){
		$(this).css({background : '#191919'});
	}).hover(function(){
		$(this).css({background : '#191919'});
	},function(){
		$(this).css({background : '#292929'});
	});

	// 歌曲列表隐藏
	$close.click(function(){
		var $zzc = $('#content .zzc');
		$zzc.css({background : 'rgba(0,0,0,0)'});
		setTimeout(function(){$zzc.remove();},200);
		$list.css({bottom : '-440px'});
	}).mousedown(function(){
		$(this).css({background : '#090909',color : 'rgba(255,255,255,.9)'})
	}).mouseup(function(){
		$(this).css({background : '#191919',color : 'rgba(255,255,255,.7)'});
	});


	// 查看歌词
	$cd.click(function(){
		$first.stop().fadeOut('1000','linear',function(){$(this).css('display','none');});
		$second.stop().fadeIn('fast','linear',function(){$(this).css('display','block');})
	});
	// 查看歌曲
	$lyric.click(function(){
		$second.stop().fadeOut('1000','linear',function(){$(this).css('display','none');});
		$first.stop().fadeIn('fast','linear',function(){$(this).css('display','block');})
	});

	// 上一首
	$previousPlay.click(function(){
		if ( $randomPlay.attr('class') == 'iconfont icon-ttpodicon') {
			n = Math.round( Math.random()*($li.length-0)+0 )
			playing( n );
		}else{
			n--;
			if (n < 0) n = $li.length-1;
			playing( n );
		};
	});

	// 下一首
	$nextPlay.click(function(){
		if ( $randomPlay.attr('class') == 'iconfont icon-ttpodicon') {
			n = Math.round( Math.random()*($li.length-0)+0 )
			playing( n );
		}else{
			n++;
			if (true) n %= $li.length;
			playing( n );
		}
	});

	//随机播放
	$randomPlay.click(function(){
		if ($(this).attr('class') == 'iconfont icon-ttpodicon') {
			$(this).removeClass('icon-ttpodicon').addClass('icon-liebiaoxunhuan');
		}else if($(this).attr('class') == 'iconfont icon-liebiaoxunhuan'){
			$(this).removeClass('icon-liebiaoxunhuan').addClass('icon-ttpodicon2');
		}else{
			$(this).removeClass('icon-ttpodicon2').addClass('icon-ttpodicon');
		}
		
	});

	// 播放
	$play.click(function(){
		clearInterval( timer );
		autoPlay();
	});

	// 音量
	var $volumeBtnWidh = $volumeBtn.width();
	var $volumeLineWidh = $volumeLine.width();
	$volumeBtn.mousedown(function(e){
		e = e || event;
		var xS = e.clientX - $(this).get(0).offsetLeft;
		$(document).mousemove(function(e){
			e = e || event;
			var xN = e.clientX - xS;
			if (xN > $volumeLineWidh )xN = $volumeLineWidh;else if(xN < 0)xN = 0;
			$volumeBtn.css({left : xN + 'px'})
			oAudio.volume = Math.floor( xN/($volumeLineWidh - $volumeBtnWidh) *10)/10;
		})
		$(document).mouseup(function(){
			$(this).off('mousemove');
			$(this).off('mouseup');
		});
	})

	// 进度条

	setInterval(processMove,1000);
	function processMove(){
		var s = oAudio.currentTime / oAudio.duration;
		$processBtn.css({
			left :.72* s * ( $processLine.width() - $processBtn.width() )+'px'
		});
	};
	

		
	// 歌词
	function currentLrc( txt ){
		var lrcArr = txt.split('[');
		var str = '';
		for (var i = 0; i < lrcArr.length; i++) {
			var arr = lrcArr[i].split(']')
			var time = arr[0].split('.') 
			var timer = time[0].split(':'); // 分钟和秒钟用数组存起来
			var ms = timer[0]*60 + timer[1]*1; // 每个歌词对应的时间转换成秒
			var text = arr[1];
			if (text) { // 生成歌词文本
				str += '<p id="gc'+ms+'">'+text+'</p>';
			}
		};
		$lyricCon.html(str);// 放入歌词
		var curTime = 0;
		var sum = 0;
		audio.currentTime ++
		var p = $lyric.find('p');
		audio.addEventListener(
			'timeupdate',  // 在音频或视频 播放位置发生改变的时候触发
			function(){
				curTime = parseInt( this.currentTime );
				if( document.getElementById('gc'+curTime) )
				{
					for (var i=0;i<p.length;i++ )
					{
						p[i].style.cssText = 'color:#fff;font-size:16px;font-weight:400';
					};
					document.getElementById('gc'+curTime).style.cssText = 'color:#0f0;font-size:16px;font-weight:600';
					if( p[sum+8] && p[sum+8].id == 'gc'+curTime )
					{
						$lyricCon.css({marginTop : 30 - sum*28 + 'px'})
						sum ++;
					}
				}
			}
		);
	}

	// 键盘监听
	$(document).keyup(function(e){
		e = e || event;
		switch( e.keyCode ){
			case 32:
				autoPlay();
			break;
		};
	});

	// 附加方法

	// 播放暂停
	function autoPlay(){
		if (onOff) {
			$play.removeClass('icon-iconfont31').addClass('icon-pause');
			oAudio.play();
			//$li.eq(0).css({color : 'red'}).siblings().css({color:'rgba(255,255,255,.7)'});
			var txt = requestData()[n].Lyric
			currentLrc( txt );
			setTimeout( function(){
				$musicEnd.html( time( parseInt( oAudio.duration )  ) );
			},300)
			setTimeout(function(){
				$haibao.css('animation','cd 15s linear infinite');
				$cd.css('animation','cd 15s linear infinite');
			},500);

			$cd2.css({animation : 'cd2 .5s linear',animationFillMode : 'forwards'});
			$cd3.css({animation : 'cd2 .5s linear',animationFillMode : 'forwards'});
			
			timer = setInterval(function(){
				$musicStart.html(time( parseInt( oAudio.currentTime+1 ) ));
				if (parseInt( oAudio.currentTime+1 ) >= parseInt( oAudio.duration )){
					clearInterval(timer);
					$haibao.css('animationPlayState','paused');
					$cd.css('animationPlayState','paused');
					$play.removeClass('icon-pause').addClass('icon-iconfont31');
					$cd2.css({animation : 'cd3 .5s linear',animationFillMode : 'forwards'});
					$cd3.css({animation : 'cd3 .5s linear',animationFillMode : 'forwards'});
				}
			},1000);
			
		}else{
			$play.removeClass('icon-pause').addClass('icon-iconfont31');
			oAudio.pause();
			clearInterval(timer);
			$haibao.css('animationPlayState','paused');
			$cd.css('animationPlayState','paused');
			$cd2.css({animation : 'cd3 .5s linear',animationFillMode : 'forwards'});
			$cd3.css({animation : 'cd3 .5s linear',animationFillMode : 'forwards'});
		}
		onOff = !onOff;
	};

	// 播放
	function playing( n ){
		clearInterval( timer );
		onOff = true;
		var txt = requestData()[n].Lyric
		currentLrc( txt );
		oAudio.src = requestData()[n].Src;
		setTimeout( function(){
			$musicEnd.html( time( parseInt( oAudio.duration )  ) );
		},300)
			
		$li.eq(n).css({color : 'red'}).siblings().css({color:'rgba(255,255,255,.7)'});
		setTimeout(function(){
			$haibao.css('animation','cd 15s linear infinite');
			$cd.css('animation','cd 15s linear infinite');
		},500);
		$cd2.css({animation : 'cd2 .5s linear',animationFillMode : 'forwards'});
		$cd3.css({animation : 'cd2 .5s linear',animationFillMode : 'forwards'});

		$titleTop.html(requestData()[n].Name);
		$titleBottom.html( requestData()[n].Singer );

		$haibao.css({
			background : 'url('+( requestData()[n].Img )+')',
			backgroundRepeat : 'no-repeat',
			backgroundPosition : 'center',
			backgroundSize : '100% 100%'
		});
		$contentBg.css({
			background : 'url('+( requestData()[n].Img )+')',
			backgroundRepeat : 'no-repeat',
			backgroundPosition : 'center',
			backgroundSize : '100% 100%'
		});
		autoPlay();
	};
	// 时间格式转换
	function time( num ){
		var m = zero( Math.floor(num%3600/60) ); // 分钟
		var s = zero( num%60 ); // 秒钟
		return m +':'+ s;
	};
	function zero( num ){
		return num <= 9?'0'+num:num+'';
	}
});

	
