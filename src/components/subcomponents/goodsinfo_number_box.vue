
<template>
  <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="max" >
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" 
    @change="countChanged" ref="numbox"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min"
export default {
  mounted(){
    mui(".mui-numbox").numbox();
  },
  methods:{
    countChanged(){
      // console.log('子组件'+this.$refs.numbox.value)
      this.$emit("getcount",parseInt(this.$refs.numbox.value))
    }
  },
  props:["max"],
  watch:{
    //属性监听
    'max':function(newVal,oldVal){
      //使用js的api设置最大值
      mui(".mui-numbox").numbox().setOption("max",newVal);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>