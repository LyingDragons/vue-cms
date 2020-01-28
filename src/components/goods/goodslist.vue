<template>
    <div class="good-list">
        <router-link class="good-item" v-for="item in goodsList" :key="item.id" 
        :to="'/home/goodsinfo/'+item.id" tag="div">

            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="new">{{item.sell_price}}</span>
                    <span class="old">{{item.market_price}}</span>    
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link>

        <mt-button type="danger" size="large" @click="getmore">加载更多</mt-button>

    </div>
</template>

<script>
export default {
    data(){
        return{
            pageindex:1,
            goodsList:[]
        }
    },
    created () {
        this.getGoodsList();
    },
    methods: {
        getGoodsList(){
			this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result => {
				if(result.body.status===0){
                    this.goodsList=this.goodsList.concat(result.body.message);
                
                    
				}
			})
        },
        getmore(){
            this.pageindex++;
            this.getGoodsList();
        }
    }
    
}
</script>

<style lang="scss" scoped>
.good-list{
    display: flex;
    flex-wrap: wrap;
    padding: 8px;
    justify-content: space-between;
    margin: 4px 0;
    .good-item{
        width: 49%;
        border:1px solid #ccc;
        padding: 2px;
        box-shadow: 0 0 8px #ccc;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img{
            width: 100%;
        }

        .title{
            font-size: 14px;
        }

        .info{
            background-color: #eee;
            p{
                margin: 0;
                padding: 5px;
            }
            .price{
                .new{
                    color: red;
                    font-size: 16px;
                    font-weight: bold;
                }

                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }

            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }
        }
    }
}
</style>