<template>
    <div class="cmt-content">
        <h3>发表评论</h3>
        <hr>
        <textarea v-model="msg" placeholder="请输入要评论的内容，最多120字" maxlength="120"></textarea>

        <mt-button type='primary' size='large' @click="postComment">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item"  v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{i+1}}楼 &nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;
                    发表时间：{{item.add_time | dateFormat}}
                </div>
                <div class="cmt-body">{{item.content==='undefined' ? '此用户很懒，没有评论':item.content}}</div>
            </div>
        </div>
        <mt-button type='danger' size='large' plain @click="getmore">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from "mint-ui";
export default {

    data(){
        return{
            pageindex:1,
            comments: [],
            msg: ''
        };
    },
    created(){
        this.getComments();
    },
    methods: {
        getComments(){
            this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageindex).then(result=>{
                if(result.body.status===0){
                
                    this.comments=this.comments.concat(result.body.message);
                }else{
                    Toast("获取评论失败")
                }
            })
        },
        getmore(){
            this.pageindex++;
            this.getComments();
        },
        postComment(){

            if(this.msg.trim().length===0){
                return Toast('评论不能为空')
            }
            //发表评论

            this.$http.post("api/postcomment/" + this.$route.params.id,
                            {content:this.msg.trim()
            }).then(function(result){
                if(result.body.status===0){
                    var comm={
                        user_name: '匿名用户',
                        add_time: Date.now(),
                        content: this.msg.trim()

                    };
                    this.comments.unshift(comm);
                    this.msg='';
                }
            })
        }
    },
    props:["id"]
    
}
</script>

<style lang="scss" scoped>
.cmt-content{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        margin: 10px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                background-color: gray;
                
            }
            .cmt-body{
                line-height: 30px;
                text-indent: 2rem;
            }
        }
    }
}

</style>