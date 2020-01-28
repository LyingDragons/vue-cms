<template>
    <div class="photoinfo-contain">
        <h3>{{photoinfo.title}}</h3>

        <p class="subtitle">

        <span>发表时间:{{photoinfo.add_time |dateFormat}}</span>
        <span>点击次数：{{photoinfo.click}}次</span>

        </p>

        <hr>

        <!--略缩图-->
        <div class="thumbs">
        <img class="preview-img" v-for="(item,index) in list" :src="item.src" height="100"
         @click="$preview.open(index,list)" :key="item.src">
        </div>


        <!--图片详情-->
        <div class="content" v-html="photoinfo.content"></div> 

        <!--评论子组件-->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
//导入评论子组件
import comment from "../subcomponents/comment.vue"

export default {

    data(){
        return {
            id:this.$route.params.id,
            photoinfo: {},
            list: []  //缩略图

        }
    },
    created () {
        this.getPhotoinfo();
        this.getThumbs();
    },
    methods: {
        getPhotoinfo(){
			this.$http.get('api/getimageInfo/'+this.id).then(result => {
				if(result.body.status===0){
                    this.photoinfo=result.body.message[0];
                    
				}
			})
        },
        getThumbs(){
            	this.$http.get('api/getthumimages/'+this.id).then(result => {
				if(result.body.status===0){
                    //循环图片  增加宽高
                    result.body.message.forEach(item=>{
                        item.w=600;
                        item.h=400;
                    });
                    this.list=result.body.message;
                    
				}
			})
        }
    },
    components: {
        'cmt-box':comment
    }
    
}
</script>

<style lang="scss" scoped>
.photoinfo-contain{
    padding: 3px;
    h3{
        color: lightblue;
        font-size :15px;
        text-align: center;
        margin: 15px 0;
    }

    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }

    .content{
        font-size: 13px;
        line-height: 30px;
    }
    .thumbs{
        img{
            margin: 10px;
            box-shadow: 0 0 8px;
        }
    }
}
</style>