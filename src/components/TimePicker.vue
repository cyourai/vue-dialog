<template>
  <div>
    <el-input value="public-choice"
              placeholder="请选择预期时间"
              v-model="time"
              id="timeInput"
              @focus="selectListShow = true"
              @keyup.enter.native="timeSubmit"
              @change="timeChange">
      <i class="el-icon-error el-input__icon"
         slot="suffix"
         @click="clearTime">
      </i>
    </el-input>

    <div v-if="selectListShow"
         class="time-picker-container">
      <!-- minute -->
      <div class="time-picker-list">
        <div class="time-picker-minute"
             :style="{'top':topMinute+'px'}">
          <div class="time-picker-item"
               v-for="(minute,i) in minutelist"
               :key="minute.value"
               @click="handleSelectMinute(i)"
               @mouseenter="handleEnterMinute(i)"
               @mouseleave="handleLeaveMinute(i)"
               @mousewheel.prevent="handleScrollMinute"
               :style="{'color':minute.select?'#409EFF':'#606266',
                      'fontWeight':minute.select?'700':'400',
                      'background':minute.select?'#f5f7fa':'transparent'}">
            {{minute.value}}
          </div>
        </div>
      </div>
      <!-- second -->
      <div class="time-picker-list">
        <div class="time-picker-minute"
             :style="{'top':topSecond+'px'}">
          <div class="time-picker-item"
               @click="handleSelectSecond(i)"
               @mouseenter="handleEnterSecond(i)"
               @mouseleave="handleLeaveSecond(i)"
               @mousewheel.prevent="handleScrollSecond"
               :style="{'color':second.select?'#409EFF':'#606266',
                      'fontWeight':second.select?'700':'400',
                      'background':second.select?'#f5f7fa':'transparent'}"
               v-for="(second,i) in secondlist"
               :key="second.value">{{second.value}}
          </div>
        </div>
      </div>
      <!-- arrow -->
      <i class="el-icon-caret-top time-picker-arrow"></i>
      <!-- button -->
      <el-button type="primary"
                 @click="timeSubmit">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 父组件传来的分
    propMinute: {
      type: String,
      default: '00'
    },
    // 父组件传来的秒
    propSecond: {
      type: String,
      default: '00'
    }
  },
  data() {
    return {
      selectListShow: false,
      // 分列表
      minutelist: [
        {
          value: 0
        },
        {
          value: 1
        },
        {
          value: 2
        },
        {
          value: 3
        },
        {
          value: 4
        },
        {
          value: 5
        },
        {
          value: 6
        },
        {
          value: 7
        },
        {
          value: 8
        },
        {
          value: 9
        },
        {
          value: 10
        },
        {
          value: 11
        },
        {
          value: 12
        },
        {
          value: 13
        },
        {
          value: 14
        },
        {
          value: 15
        },
        {
          value: 16
        },
        {
          value: 17
        },
        {
          value: 18
        },
        {
          value: 19
        },
        {
          value: 20
        },
        {
          value: 21
        },
        {
          value: 22
        },
        {
          value: 23
        },
        {
          value: 24
        },
        {
          value: 25
        },
        {
          value: 26
        },
        {
          value: 27
        },
        {
          value: 28
        },
        {
          value: 29
        },
        {
          value: 30
        },
        {
          value: 31
        },
        {
          value: 32
        },
        {
          value: 33
        },
        {
          value: 34
        },
        {
          value: 35
        },
        {
          value: 36
        },
        {
          value: 37
        },
        {
          value: 38
        },
        {
          value: 39
        },
        {
          value: 40
        },
        {
          value: 41
        },
        {
          value: 42
        },
        {
          value: 43
        },
        {
          value: 44
        },
        {
          value: 45
        },
        {
          value: 46
        },
        {
          value: 47
        },
        {
          value: 48
        },
        {
          value: 49
        },
        {
          value: 50
        },
        {
          value: 51
        },
        {
          value: 52
        },
        {
          value: 53
        },
        {
          value: 54
        },
        {
          value: 55
        },
        {
          value: 56
        },
        {
          value: 57
        },
        {
          value: 58
        },
        {
          value: 59
        }
      ],
      // 秒列表
      secondlist: [
        {
          value: 0
        },
        {
          value: 1
        },
        {
          value: 2
        },
        {
          value: 3
        },
        {
          value: 4
        },
        {
          value: 5
        },
        {
          value: 6
        },
        {
          value: 7
        },
        {
          value: 8
        },
        {
          value: 9
        },
        {
          value: 10
        },
        {
          value: 11
        },
        {
          value: 12
        },
        {
          value: 13
        },
        {
          value: 14
        },
        {
          value: 15
        },
        {
          value: 16
        },
        {
          value: 17
        },
        {
          value: 18
        },
        {
          value: 19
        },
        {
          value: 20
        },
        {
          value: 21
        },
        {
          value: 22
        },
        {
          value: 23
        },
        {
          value: 24
        },
        {
          value: 25
        },
        {
          value: 26
        },
        {
          value: 27
        },
        {
          value: 28
        },
        {
          value: 29
        },
        {
          value: 30
        },
        {
          value: 31
        },
        {
          value: 32
        },
        {
          value: 33
        },
        {
          value: 34
        },
        {
          value: 35
        },
        {
          value: 36
        },
        {
          value: 37
        },
        {
          value: 38
        },
        {
          value: 39
        },
        {
          value: 40
        },
        {
          value: 41
        },
        {
          value: 42
        },
        {
          value: 43
        },
        {
          value: 44
        },
        {
          value: 45
        },
        {
          value: 46
        },
        {
          value: 47
        },
        {
          value: 48
        },
        {
          value: 49
        },
        {
          value: 50
        },
        {
          value: 51
        },
        {
          value: 52
        },
        {
          value: 53
        },
        {
          value: 54
        },
        {
          value: 55
        },
        {
          value: 56
        },
        {
          value: 57
        },
        {
          value: 58
        },
        {
          value: 59
        }
      ],
      // 选择的分
      minuteSelected: this.propMinute,
      // 鼠标移入前选择的分
      minuteSelectedOrg: this.propMinute,
      // 选择的秒
      secondSelected: this.propSecond,
      // 鼠标移入前选择的秒
      secondSelectedOrg: this.propSecond,
      // minute块对于顶部距离
      topMinute: 0,
      // second块对于顶部距离
      topSecond: 0,
      // 最终选定的时间
      confirmTime: 0,
      inputTime: 0
    };
  },
  computed: {
    time: {
      get: function () {
        return this.inputTime !== 0 ? this.inputTime : this.minuteSelected + '分' + this.secondSelected + '秒'
      },
      set: function () {
        return this.inputTime !== 0 ? this.inputTime : this.minuteSelected + '分' + this.secondSelected + '秒'
      }
    }
  },
  watch: {
    // 动态监测分的变化
    propMinute: {
      deep: true,
      handler: function (newVal) {
        this.minuteSelected = newVal
      }
    },
    // 动态监测秒的变化
    propSecond: {
      deep: true,
      handler: function (newVal) {
        this.secondSelected = newVal
      }
    }
  },
  mounted() {
    // 监听滚轮事件
    window.addEventListener('scroll', this.handleScrollMinute, true);
    window.addEventListener('scroll', this.handleScrollSecond, true);
  },
  methods: {
    // 选择分钟
    handleSelectMinute(i) {
      // 找出已选择项，并重置之
      const index = this.minutelist.findIndex(function (value, index, arr) {
        return value.select === true;
      })
      if (index !== -1) {
        this.minutelist[index].select = false
      }
      // 解构value,并设定select为true
      const { value } = this.minutelist[i]
      this.minuteSelected = this.minuteSelectedOrg = value
      this.minutelist[i].select = true
    },
    // 选择秒钟
    handleSelectSecond(i) {
      // 找出已选择项，并重置之
      const index = this.secondlist.findIndex(function (value, index, arr) {
        return value.select === true;
      })
      if (index !== -1) {
        this.secondlist[index].select = false
      }
      // 解构value,并设定select为true
      const { value } = this.secondlist[i]
      this.secondSelected = this.secondSelectedOrg = value
      this.secondlist[i].select = true
    },
    // 重置时间
    clearTime() {
      this.minuteSelected = this.secondSelected = this.minuteSelectedOrg = this.secondSelectedOrg = '00'
      const indexMinute = this.minutelist.findIndex(function (value, indexMinute, arr) {
        return value.select === true;
      })
      if (indexMinute !== -1) {
        this.minutelist[indexMinute].select = false
      }
      const indexSecond = this.secondlist.findIndex(function (value, indexSecond, arr) {
        return value.select === true;
      })
      if (indexSecond !== -1) {
        this.secondlist[indexSecond].select = false
      }
    },
    // 鼠标移入：分钟改变
    handleEnterMinute(i) {
      // 解构value,并设定select为true
      const { value } = this.minutelist[i]
      this.minuteSelected = value
    },
    // 鼠标移出：分钟还原
    handleLeaveMinute(i) {
      this.minuteSelected = this.minuteSelectedOrg
    },
    // 鼠标移入：秒钟改变
    handleEnterSecond(i) {
      // 解构value,并设定select为true
      const { value } = this.secondlist[i]
      this.secondSelected = value
    },
    // 鼠标移出：秒钟还原
    handleLeaveSecond(i) {
      this.secondSelected = this.secondSelectedOrg
    },
    // 鼠标滚轮：选择分
    handleScrollMinute(e) {
      // wheelDelta兼容IE,Opera,Chrome，detail兼容Firefox
      if (e.wheelDelta > 0 || e.detail > 0) {
        // 向上滚动
        if (this.minuteSelected > 0) {
          if (this.topMinute < 0) {
            this.topMinute += 30
          }
        }
      } else if (e.wheelDelta < 0 || e.detail < 0) {
        // 向下滚动
        if (this.minuteSelected < 59) {
          if (this.topMinute > -(54 * 30)) {
            this.topMinute -= 30
          }
        }
      }
    },
    // 鼠标滚轮：选择秒
    handleScrollSecond(e) {
      // wheelDelta兼容IE,Opera,Chrome，detail兼容Firefox
      if (e.wheelDelta > 0 || e.detail > 0) {
        // 向上滚动
        if (this.secondSelected > 0) {
          if (this.topSecond < 0) {
            this.topSecond += 30
          }
        }
      } else if (e.wheelDelta < 0 || e.detail < 0) {
        // 向下滚动
        if (this.secondSelected < 59) {
          if (this.topSecond > -(54 * 30)) {
            this.topSecond -= 30
          }
        }
      }
    },
    // 提交
    timeSubmit() {
      // console.log(this.time)
      const inputValue = this.time
      var indexMinute = inputValue.indexOf('分')
      var indexSecond = inputValue.indexOf('秒')
      const minute = indexMinute !== -1 ? inputValue.substring(0, indexMinute) : 0
      const second = indexSecond !== -1 ? inputValue.substring(indexMinute + 1, indexSecond) : 0
      this.confirmTime = parseInt(minute * 60) + parseInt(second)
      this.$emit('timeSubmit', this.confirmTime)
      this.inputTime = 0
      this.selectListShow = false
    },
    // 从input框输入数据
    timeChange(value) {
      this.inputTime = value
      var indexMinute = this.inputTime.indexOf('分')
      var indexSecond = this.inputTime.indexOf('秒')
      this.minuteSelected = indexMinute !== -1 ? this.inputTime.substring(0, indexMinute) : 0
      this.secondSelected = indexSecond !== -1 ? this.inputTime.substring(indexMinute + 1, indexSecond) : 0
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../styles/timepicker.scss';
</style>
