(function(){
    var $backTop = $('#backTop');
// 鼠标滚轮监听
	$(document).scroll(function(){
		if ($(document).scrollTop() > 20) {
			$backTop.stop().fadeIn();
		}else{
			$backTop.stop().fadeOut();
		}
	});
// 点击回到顶部
    $backTop.on('click',function(){
        $('body').stop().animate({
            scrollTop : 0,
        });
    });
})();


// 判断浏览器版本
(function(){
	if (checkBrower().ie) {
		if ( checkBrower().ie == '8.0' ) {
			alert( '抱歉，此博客暂不支持IE'+checkBrower().ie+'及以下浏览器，请升级。' )
		}else if(checkBrower().ie == '7.0'){
			alert( '抱歉，此博客暂不支持IE'+checkBrower().ie+'、IE8.0及以下浏览器，请升级。' )
		}
	}
	
	function checkBrower() {
	    var Sys = {};
	    var ua = navigator.userAgent.toLowerCase();
	    if (window.ActiveXObject) {
	        Sys.ie = ua.match(/msie ([\d.]+)/)[1];
	        //获取版本
	        var ie_version = 6;
	        if (Sys.ie.indexOf("7") > -1) {
	            ie_version = 7;
	        }
	        if (Sys.ie.indexOf("8") > -1) {
	            ie_version = 8;
	        }
	        // if (Sys.ie.indexOf("9") > -1) {
	        //     ie_version = 9;
	        // }
	        // if (Sys.ie.indexOf("10") > -1) {
	        //     ie_version = 10;
	        // }
	        // if (Sys.ie.indexOf("11") > -1) {
	        //     ie_version = 11;
	        // }
	    }
	    // else if (ua.indexOf("firefox") > -1)
	    //     Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1];
	    // else if (ua.indexOf("chrome") > -1)
	    //     Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1];
	    // else if (window.opera)
	    //     Sys.opera = ua.match(/opera.([\d.]+)/)[1];
	    // else if (window.openDatabase)
	    //     Sys.safari = ua.match(/version\/([\d.]+)/)[1];
	     return Sys;
	}
})();
	