<template>
	<div>
		<mt-swipe :auto="4000">
		  <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
			  <img :src="item.img_url" alt=""/>
		  </mt-swipe-item>

		</mt-swipe>
		home
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	
	
	export default{
		data(){
			return {
				lunbotuList:[]
			};
		},
		created() {
			this.getLunbotu()
		},
		methods : {
			getLunbotu(){
				this.$http.get("http://www.liulongbin.top:3005/api/getnewslist").then(result=>{
					console.log(result.body);
					if(result.body.status===0){
						this.lunbotuList=result.body.message;
						Toast('加载轮播图ok')
					}else{
						Toast('加载轮播图失败')
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.mint-swipe{
	height: 12.5rem;
	
	.mint-swipe-item{
		&:nth-child(1){
			background-color: red;
		}
		&:nth-child(2){
			background-color: blue;
		}
		&:nth-child(3){
			background-color: black;
		}
		img{
			width: 100%;
			height: 100%;
		}
	}
}
</style>
