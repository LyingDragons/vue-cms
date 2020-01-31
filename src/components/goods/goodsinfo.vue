<template>
  <div class="goodsinfo-contain">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!--轮播-->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotulist="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
      <!--购买-->

      <div class="mui-card">
        <div class="mui-card-header">{{goodsinfo.title}}</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p class="price">
              市场价：
              <del>{{goodsinfo.market_price}}</del> &nbsp;&nbsp;
              销售价：
              <span class="now_price">{{goodsinfo.sell_price}}</span>
            </p>
            <p>
              购买数量：
              <numberbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numberbox>
            </p>

            <p>
              <mt-button type="primary" size="small">立即购买</mt-button>
              <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
            </p>
          </div>
        </div>
      </div>

      <!--详情-->

      <div class="mui-card">
        <div class="mui-card-header">商品参数</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p>商品货号：{{goodsinfo.goods_no}}</p>
            <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
            <p>上架时间：{{goodsinfo.add_time | dateFormat}}</p>
          </div>
        </div>
        <div class="mui-card-footer">
          <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
          <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from "../subcomponents/swiper.vue";
import numberbox from "../subcomponents/goodsinfo_number_box.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: [],
      goodsinfo: {},
      ballFlag: false, //小球
      selectedCount: 1 //用户选中数量
    };
  },
  created() {
    this.getlunbo();
    this.getgoodinfo();
  },
  methods: {
    getlunbo() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.img_url = item.src;
          });
          this.lunbotu = result.body.message;
        }
      });
    },
    getgoodinfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    },
    goDesc(id) {
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar() {
      //添加购物车
      this.ballFlag = !this.ballFlag;

      //添加数据
      //拼接出保存到store的car的数据
      var goodsinfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.goodsinfo.sell_price,
        selected: true
      };
      //调用store里的mou方法
      this.$store.commit("addToCar",goodsinfo)
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;
      //获取小球的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      // console.log(xDist)
      // console.log(yDist)
      el.style.transform = "translate(" + xDist + "px," + yDist + "px)";
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count) {
      //子组件传递给父组件
      this.selectedCount = count;
      // console.log(this.selectedCount)
    }
  },
  components: {
    swiper,
    numberbox
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-contain {
  background-color: #eee;
  overflow: hidden;

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;

    button {
      margin: 10px;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 146px;
  }
}
</style>