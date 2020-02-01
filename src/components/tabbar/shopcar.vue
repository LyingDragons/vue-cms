<template>
  <div class="shopcar-container">
    <!--列表-->
    <div class="goods-list">
      <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
			  <mt-switch v-model="$store.getters.getGoodsSeleced[item.id]"
			  @change="selectedChange(item.id,$store.getters.getGoodsSeleced[item.id])"></mt-switch>
			  <img :src="item.thumb_path" alt="">
			  <div class="info">
				  <h1>{{item.title}}</h1>
				  <p>
					  <span class="price">{{item.sell_price}}</span>
					  <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
					  <a href="#" @click.prevent="remove(item.id,i)">删除</a>
				  </p>
			  </div>
		  </div>
        </div>
      </div>


      <!--结算-->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
			  <div class="left">
				  <p>总计（不含运费）：</p>
				  <p>已勾选 <span class="red">{{$store.getters.getGoodscountprice.count}}</span>件，
				  总计<span class="red">{{$store.getters.getGoodscountprice.amount}}</span> 元</p>
			  </div>
			  <mt-button type="danger">去结算</mt-button>
		  </div>
		  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from "../subcomponents/shopcar_number_box.vue"

export default{
	data(){
		return{
			goodslist:[]
		}
	},
	created(){
		this.getGoodsList();
	},
	methods:{
		getGoodsList(){
			//获取store所有商品id
			var idArr=[]
			this.$store.state.car.forEach(item=>idArr.push(item.id))
			//没有商品则返回，防止报错
			if(idArr.length<=0){
				return;
			}
			this.$http.get('api/goods/getshopcarlist/'+idArr.join(",")).then(result=>{
				if(result.body.status===0){
					this.goodslist=result.body.message;
					console.log(this.goodslist)
				}
			})
		},
		remove(id,index){
			//点击删除store ，goodslist里的内容
			this.goodslist.splice(index,1);
			this.$store.commit("removeFromCar",id);
		},
		selectedChange(id,val){
			console.log(id+'---'+val)
			this.$store.commit("updategoodsSelected",{id,selected:val})
		}
	},
	components:{
		numbox
	}
};
</script>

<style lang="scss" scoped>
.shopcar-container{
	.mui-card-content-inner{
		display: flex;
		align-items: center;
	}
	background-color: #eee;
	overflow: hidden;
	.goods-list{
		img{
			width: 60px;
			height: 60px;
		}
		h1{
			font-size: 13px;
		}
		.info{
			.price{
				color: red;
				font-weight: bold;
			}
		}
	}
	.jiesuan{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.red{
			font-weight: bold;
			color: red;
			font-size: 16px;
		}
	}
}
</style>
