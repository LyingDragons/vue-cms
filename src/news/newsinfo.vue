<template>
    <div class="newsibfo-contain">
        <!-- 大标题-->
        <h3 class="title">{{newsinfo.title}}</h3>

         <!-- 小标题-->
        <p class="subtitle">
            <span>发表时间：{{newsinfo.add_time | dateFormat}}</span>
            <span>点击次数: {{newsinfo.click}}</span>
        </p>
        <hr>

         <!-- 内容-->
        <div class="content" v-html="newsinfo.content"></div>


         <!-- 评论-->
         <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
	import {Toast} from 'mint-ui'
    import comment from "../components/subcomponents/comment.vue"


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
    },
    components: {
        //注册子组件的节点
        'comment-box' : comment
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