var aLi = document.getElementsByTagName('li');
var date = new Date();
var hours = zero( date.getHours() ).toString();
var minutes = zero( date.getMinutes() ).toString();
var seconds = zero( date.getSeconds() ).toString();
var str = hours+minutes+seconds;

for (var i = 0; i < str.length; i++) {
	aLi[i].getElementsByTagName('img')[0].src = 'images/'+ str.charAt( i ) +'.jpg';
	aLi[i].getElementsByTagName('img')[0].index = str.charAt( i );
	play( aLi[i],i);
}
// 时钟开始
function play(obj,index){
	var aImg = obj.getElementsByTagName('img');
	var num = 0;
	setInterval( function(){
		var date = new Date();
		var hours = zero( date.getHours() ).toString();
		var minutes = zero( date.getMinutes() ).toString();
		var seconds = zero( date.getSeconds() ).toString();
		var str2 = hours+minutes+seconds;

		if (str2.charAt(index) != aImg[num].index) {
			move( aImg[num],{top:-179});
			if (num == 1) {
				aImg[num-1].src = 'images/'+ str2.charAt( index ) +'.jpg'
				aImg[num-1].index = str2.charAt( index );
				move( aImg[num-1],{top:0},400,'linear',function(){
					aImg[num].style.top = '179px';
					num--;
				} )
			}else{
				aImg[num+1].index = str2.charAt( index );
				aImg[num+1].src = 'images/'+ str2.charAt( index ) +'.jpg'
				move( aImg[num+1],{top:0},400,'linear',function(){
					aImg[num].style.top = '179px';
					num++;
				})
			};
		}
	},1000);
	
};
// 辅助方法
function zero(n){
	return n < 10? '0'+n : ''+n;
};