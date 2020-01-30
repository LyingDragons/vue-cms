<template>
    <div>
            <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotulist" :key="item.url">
        <img :src="item.img_url"  :class="{'full':isfull}"/>
      </mt-swipe-item>
    </mt-swipe>
    </div>
</template>

<script>
export default {
    props: ["lunbotulist","isfull"]
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 12.5rem;
  text-align: center;
  .mint-swipe-item {

    img {
    //   width: 100%;
      height: 100%;
    }
  }
}

.full{
    width: 100%;
}
</style>