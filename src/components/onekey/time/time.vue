<template>
  <span>
    {{nowTime}}
  </span>
</template>

<script>
export default {
  data() {
    return {
      nowTime: ''
    }
  },
  created() {
    this.init()
    window.setInterval(() => {
      setTimeout(this.init(), 0)
    }, 1000)
  },
  methods: {
    init() {
      this.timeFormate(new Date())
    },
    // 获取当前时间
    timeFormate(timeStamp) {
      const year = new Date(timeStamp).getFullYear()
      const month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1
      const date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate()
      const hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours()
      const mm = new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()
      const sc = new Date(timeStamp).getSeconds() < 10 ? '0' + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds()
      this.nowTime = '当前时间：' + year + '-' + month + '-' + date + ' ' + hh + ':' + mm + ':' + sc
    },
  },
}
</script>

<style scoped>
</style>
