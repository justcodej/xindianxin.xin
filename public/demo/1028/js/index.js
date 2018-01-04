
	var vm = new Vue({
		el: '#box',
		data: {
			myData: [],
			username: '',
			age: '',
			nowIndex: -1000
		},
		methods: {
			add : function(){
				if (this.username && this.age) {
					this.myData.push({
						name : this.username,
						age : this.age
					})
					this.username = '';
					this.age = '';
				}
			},
			reset : function(){
				this.username = '';
				this.age = '';
			},
			clear : function(){
				this.myData.length = 0;
			},
			del : function(){
				this.myData.splice(this.nowIndex,1);
			}
		}
	});