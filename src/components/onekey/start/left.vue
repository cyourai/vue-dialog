<template>
  <div class="main-clouds left">

    <!-- 数据统计 -->
    <div v-if="left[0]"
         class="cloud-item">
      <div class="cloud-item-header">
        <div class="cloud-item-title cn">{{left[0].title}}</div>
      </div>
      <div class="cloud-item-text clearfix">
        <div class="cloud-item-column">
          <div v-for="item in left[0].list"
               class="cloud-item-traffic-title cn">
            {{item.text}}
          </div>
        </div>
      </div>
    </div>

    <!-- 查看详细 -->
    <div v-if="left[1]"
         class="cloud-item cloud-ckxx">
      <div class="cloud-item-header">
        <div class="cloud-item-title cn">{{left[1].title}}</div>
      </div>
      <div class="cloud-item-text clearfix"
           style="height: 126px;">
        <div class="cloud-item-column cloud-ckxx-div">
          <img v-if="left[1].imgUrl!=='' && left[1].imgUrl!==undefined"
               class="cloud-ckxx-img-gray"
               :src="[left[1].imgUrl]">
          <img v-else
               class="cloud-ckxx-img-gray"
               src="../../../assets/onekey/metro.png">
        </div>
      </div>
    </div>

    <!-- 待添加... -->
    <div v-if="left[2]"
         class="cloud-item">
      <div class="cloud-item-header">
        <div class="cloud-item-title cn">{{left[2].title}}</div>
      </div>
      <div class="cloud-item-text clearfix">
        <div class="cloud-item-column left">
          <div class="cloud-item-traffic-title cn">{{left[2].data.title}}</div>
          <div class="cloud-item-traffic-number"
               name="tour">{{left[2].data.kb}}</div>
        </div>
        <div class="cloud-item-column right">
          <div v-for="item in left[2].data.list">
            {{item.title}}
            <span class="cloud-item-ecs">{{item.count}}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    // 左侧
    left: {
      type: Array,
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../../styles/onekey/onekeyStart.scss';
</style>
