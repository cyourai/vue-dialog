<template>
  <div>
    <TimePicker :propMinute="propMinute"
                :propSecond="propSecond"
                @timeSubmit="timeSubmit"></TimePicker>
    <TimePicker :propMinute="propMinute"
                :propSecond="propSecond"
                @timeSubmit="timeSubmit"></TimePicker>
    <el-button @click="setTime1">1</el-button>
    <el-button @click="setTime2">2</el-button>
    <div style="font-size:140px">
      福
    </div>
    <div style="width:200px;height:500px;"></div>
    <div style="width:200px;height:500px;"></div>
    <div style="width:200px;height:500px;"></div>
    <div style="width:200px;height:500px;"></div>
  </div>
</template>

<script>
import TimePicker from '../components/TimePicker'

export default {
  components: { TimePicker },
  data() {
    return {
      propMinute: '2',
      propSecond: '00',
    }
  },
  created() {
    setTimeout(() => {
      // this.propMinute = (parseInt(this.propMinute) + 1).toString()
      // this.propSecond = (parseInt(this.propSecond) + 1).toString()
    }, 1000);
  },
  methods: {
    timeSubmit(time) {
      console.log(time)
    },
    setTime1() {
      this.propMinute = '3'
      this.propSecond = '4'
    },
    setTime2() {
      this.propMinute = '30'
      this.propSecond = '40'
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-input {
  width: 50px;
}
</style>
