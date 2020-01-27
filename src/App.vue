<template>
<div class="app-content">
	<mt-header fixed title="餐饮系统"></mt-header>
	
	<transition>
		<router-view></router-view>
	</transition>
	
	


	<!--底部bar-->
			<nav class="mui-bar mui-bar-tab">
				<router-link class="mui-tab-item-mj mui-active" to="/home">
					<span class="mui-icon mui-icon-home"></span>
					<span class="mui-tab-label">首页</span>
				</router-link>
				<router-link class="mui-tab-item-mj" to="/member">
					<span class="mui-icon mui-icon-contact"><span class="mui-badge">0</span></span>
					<span class="mui-tab-label">会员</span>
				</router-link>
				<router-link class="mui-tab-item-mj" to="/shopcar">
					<span class="mui-icon mui-icon-extra mui-icon-extra-cart"></span>
					<span class="mui-tab-label">购物车</span>
				</router-link>
				<router-link class="mui-tab-item-mj" to="/search">
					<span class="mui-icon mui-icon-search"></span>
					<span class="mui-tab-label">搜索</span>
				</router-link>
			</nav>
</div>
</template>



<script>
</script>


<style>
	.app-content{
		padding-top: 2.5rem;
		padding-bottom: 50px;
		overflow-x: hidden;
		
	}

	.v-enter{
		opacity: 0;
		transform: translateX(100%);
	}

	.v-leave-to{
		opacity: 0;
		transform: translateX(-100%);
		position: absolute;
	}

	.v-enter-active,
	.v-leave-active{
		transition: all 0.5s ease
	}


	<!--解决引入图片导航tabbar无法滑动问题-->
	.mui-bar-tab .mui-tab-item-mj.mui-active {
    color: #007aff;
	}

	.mui-bar-tab .mui-tab-item-mj {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
	.mui-bar-tab .mui-tab-item-mj .mui-icon {
		top: 3px;
		width: 24px;
		height: 24px;
		padding-top: 0;
		padding-bottom: 0;
	}

	.mui-bar-tab .mui-tab-item-mj .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}

</style>
