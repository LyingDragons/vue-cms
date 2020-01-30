<template>
  <div class="goodsinfo-contain">
    <!--轮播-->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotulist="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
      <!--购买-->

      <div class="mui-card">
        <div class="mui-card-header">商品名称</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p class="price">
              市场价：
              <del>2199</del> &nbsp;&nbsp;
              销售价：
              <span class="now_price">1999</span>
            </p>
            <p>購買數量：</p>
            <p>
              <mt-button type="primary" size="small">立即购买</mt-button>
              <mt-button type="danger" size="small">加入購物車</mt-button>
            </p>
          </div>
        </div>
      </div>

      <!--详情-->

      <div class="mui-card">
        <div class="mui-card-header">页眉</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）</div>
        </div>
        <div class="mui-card-footer">页脚</div>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from "../subcomponents/swiper.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: []
    };
  },
  created() {
    this.getlunbo();
  },
  methods: {
    getlunbo() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.img_url = item.src;
          });
          this.lunbotu = result.body.message;
          console.log(this.lunbotu);
        }
      });
    }
  },
  components: {
    swiper
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-contain {
  background-color: #eee;
  overflow: hidden;

  .now_price{
      color: red;
      font-size: 16px;
      font-weight: bold;
  }
}
</style>