<template>
  <OnekeyIndex :title1="title1"
               :title2="title2"
               :list="list"
               :containerStyle="containerStyle"></OnekeyIndex>
</template>

<script>
import OnekeyIndex from '../components/OnekeyIndex'

export default {
  components: {
    OnekeyIndex
  },
  data() {
    return {
      title2: '智能容灾管理系统',
      title2: '智能容灾管理系统',
      containerStyle: {
        backgroundImage: 'url(' + require('../assets/onekey/2.jpg') + ')'
      },
      list: [
        {
          text: '系统管理',
          bcColor: '#F29500',
          icon: 'fa fa-cog'
        },
        {
          text: '预案管理',
          bcColor: '#C23916',
          icon: 'fa fa-clipboard'
        },
        {
          text: '切换管理',
          bcColor: '#3C7780',
          icon: 'fa fa-arrows-h'
        },
        {
          text: '演练管理',
          bcColor: '#6FA014',
          icon: 'fa fa-youtube-play'
        },
        {
          text: '应急管理',
          bcColor: '#0097AA',
          icon: 'fa fa-unlock-alt'
        },
        {
          text: '运维管理',
          bcColor: '#BE213E',
          icon: 'fa fa-file-o'
        },
        {
          text: '知识管理',
          bcColor: '#3C7780',
          icon: 'fa fa-book'
        },
        {
          text: '安全管理',
          bcColor: '#94C849',
          icon: 'fa fa-plus-square'
        },
        {
          text: '多视图管理',
          bcColor: '#0097AA',
          icon: 'fa fa-bars'
        },
        {
          text: '脚本效率分析',
          bcColor: '#3C7780',
          icon: 'fa fa-bar-chart'
        },
        {
          text: '扫一扫有惊喜',
          bcColor: '#F29500',
          icon: 'fa fa-qrcode'
        },
        {
          text: '关于我们',
          bcColor: '#94C849',
          icon: 'fa fa-weixin'
        },
        {
          bcColor: '#0097AA',
          icon: 'fa fa-facebook-square'
        },
        {
          bcColor: '#0097AA',
          icon: 'fa fa-facebook-square'
        },
        {
          bcColor: '#0097AA',
          icon: 'fa fa-facebook-square'
        },
        {
          bcColor: '#0097AA',
          icon: 'fa fa-facebook-square'
        }
      ]
    }
  },
}
</script>

<style scoped>
</style>
