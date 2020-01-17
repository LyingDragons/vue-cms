<template>
    <div class="newsibfo-contain">
        <h3 class="title">{{newsinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{newsinfo.add_time | dateFormat}}</span>
            <span>点击次数: {{newsinfo.click}}</span>
        </p>
        <hr>
        <div class="content" v-html="newsinfo.content"></div>
    </div>
</template>

<script>
	import {Toast} from 'mint-ui'
export default {

    data () {
        return {
            id:this.$route.params.id,
            newsinfo:{}
        }
    },
    created () {
        this.getnewsInfo();
    },
    methods: {
        getnewsInfo(){
            this.$http.get("api/getnew/"+this.id).then(result=>{
                if(result.body.status===0){
                    this.newsinfo=result.body.message[0]
                }else{
                    Toast('获取新闻信息失败')
                }
            })
        }
    }
    
}
</script>


<style lang="scss" scoped>
.newsibfo-contain{
    padding: 0 4px;
    .title{
        font-size: 14px;
        text-align: center;
        margin: 15px 0;
        color: red;
    }
    .subtitle{
        font-size: 13px;
        display: flex;
        justify-content: space-between;


    }
    .content{
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>