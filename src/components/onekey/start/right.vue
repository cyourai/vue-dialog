<template>
  <div class="main-clouds right">

    <!-- 演练流程监控 -->
    <div class="cloud-item">
      <div class="cloud-item-header">
        <div class="cloud-item-title cn">{{right[0].title}}</div>
      </div>
      <div class="cloud-item-text clearfix">
        <div class="cloud-item-column left">
          <div class="cloud-item-traffic-title cn"></div>
          <div class="cloud-item-traffic-number"
               name="people"></div>
        </div>
        <div class="cloud-item-column right">
          <div>
            <span class="cloud-item-ecs">点击查看</span>
          </div>
          <div>
            <span class="cloud-item-rds">&nbsp;</span>
          </div>
          <div>
            <span class="cloud-item-slb">&nbsp;</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 演练流程监控 -->
    <div class="cloud-item">
      <div class="cloud-item-header">
        <div class="cloud-item-title cn">{{right[1].title}}</div>
      </div>
      <div class="cloud-item-text clearfix">
        <div class="cloud-item-column left">
          <div class="cloud-item-traffic-title cn">当前环节</div>
          <div class="cloud-item-traffic-number"
               name="human"></div>
        </div>
        <div class="cloud-item-column right">
          <div>
            <span class="cloud-item-ecs">剩余环节: </span>
          </div>
          <div>
            <span class="cloud-item-rds">&nbsp;</span>
          </div>
          <div>
            <span class="cloud-item-slb">&nbsp;</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 待添加... -->
    <div class="cloud-item">
      <div class="cloud-item-header">
        <div class="cloud-item-title cn">{{right[2].title}}</div>
      </div>
      <div class="cloud-item-text clearfix">
        <div class="cloud-item-column left">
          <div class="cloud-item-traffic-title cn">{{right[2].data.title}}</div>
          <div class="cloud-item-traffic-number"
               name="radiotelivision">{{right[2].data.kb}}</div>
        </div>
        <div class="cloud-item-column right">
          <div v-for="item in right[2].data.list">
            {{item.title}}
            <span class="cloud-item-ecs"> {{item.count}}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    // 右侧
    right: {
      type: Array
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../../styles/onekey/onekeyStart.scss';
</style>
