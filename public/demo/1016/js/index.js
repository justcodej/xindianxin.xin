(function(){
	var $wrap = $('#wrap');
	var $box = $('#box');
	var $list = $('#box .list');
	var $pic = $('#box .list .pic');
	var W = 620,H = 420,$btn;
	var nowTime = 0;
	init();
	move();
	function init(){
		$list.each(function(){
			$(this).css({left : $(this).index()*W+'px'}).find('.pic').each(function(j){
				$(this).css({top : $(this).index()*H+'px'});
			});
		});
		$wrap.append('<div id="btn"></div>');
		$btn = $('#btn');
		$list.each(function(i){
			$btn.append( $('<div></div>').addClass('path'+i).css({left : 15*i+'px'}) );
			$(this).find('.pic').each(function(j){
				$('<a heaf="javascript:;"></a>').attr('rel',j).css({
					top : 15*j+'px'
				}).appendTo( $btn.find('.path'+i) );
			});
		});
		$btn.find('a').eq(0).addClass('on');
	};
	function move(){
		$wrap.find('#btn').find('a').click(function(){
			 $(this).addClass('on').siblings().removeClass('on').parent('div').siblings('div').find('a').removeClass('on');
			 var row = $(this).attr('rel');
			 var line = $(this).parent('div').attr('class').split('path')[1];
			 boxMove( -line*W,-row*H );
		});

		
			
		$(document).keyup(function(e){
			e = e||event;
			if (new Date() - nowTime > 400) {
				nowTime = new Date();
				var row,line,lineLength;
				var boxLeft = parseInt( $box.css('left') );
				var boxTop = parseInt( $box.css('top') );
				$btn.find('div').each(function(i){
					$btn.find('div').eq(i).find('a').each(function(j){
						if (this.className == 'on') {
							row = i;
							line = j;
							lineLength = $btn.find('div').eq(i).find('a').length;
						};
					});
				})
				switch( e.keyCode ){
					case 37: 
						if (row > 0) {
							boxMove(boxLeft + W,-line*H);
							on( row-1,line );
						}
						break;
					case 38: 
						if ( line > 0 ) {
							boxMove( -row*W,boxTop+H );
							on( row,line-1 );
						}
						break;
					case 39:
						if (row < $list.length-1 ) {
							boxMove( boxLeft-W,-line*H );
							on( row+1,line );
						}
						break;
					case 40:
						if (line < lineLength-1) {
							boxMove( -row*W , boxTop-H );
							on( row,line+1 );
						}
						break;
					default:
						return;
				};
			};
		});
	
	};
	function on(i,j){
		$btn.find('div').eq(i).find('a').eq(j).addClass('on').siblings().removeClass('on').parent('div').siblings('div').find('a').removeClass('on');
	}

	function boxMove(l,t){
		$box.stop().animate({
			left : l + 'px',
			top : t + 'px'
		});
	};
})();