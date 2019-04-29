<template>
  <OnekeyStart :title="title"
               :animateTitle="animateTitle"
               :left="left"
               :right="right"></OnekeyStart>
</template>

<script>
import OnekeyStart from '../components/OnekeyStart'

export default {
  components: {
    OnekeyStart
  },
  data() {
    return {
      title: '测试演练',
      animateTitle: '业务连续性',
      left: [
        {
          title: '数据统计',
          list: [
            { text: '共有4个切换环节' },
            { text: '3个脚本数' },
            { text: '4个演练环节' }
          ]
        },
        { title: '查看详细', imgUrl: '' },
        {
          title: '待添加...',
          data: {
            title: '今日流量(Kb)',
            kb: '388,615',
            list: [
              {
                title: 'ECS',
                count: 28
              },
              {
                title: 'RDS',
                count: 21
              },
              {
                title: 'SLB',
                count: 11
              }
            ]
          }
        }
      ],
      right: [
        { title: '查看演练进度' },
        { title: '演练流程监控' },
        {
          title: '待添加...',
          data: {
            title: '今日流量(Kb)',
            kb: '263,710',
            list: [
              {
                title: 'ECS',
                count: 6
              },
              {
                title: 'RDS',
                count: 2
              },
              {
                title: 'SLB',
                count: 3
              }
            ]
          }
        }
      ]
    }
  },
}
</script>

<style scoped>
</style>
