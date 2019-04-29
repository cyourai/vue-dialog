<template>
  <div>
    <div v-for="(picUrl, index) in picList">
      <el-input v-model="picList[index]"
                placeholder="刊例图片"
                :ref="'pic'-index"
                @focus="activePicDialogHandler(index)"></el-input>
      <pic-magnify :picUrl="picUrl"
                   :onerror="errorUrl"></pic-magnify>
    </div>
    <vue-dialog :visible="visible"
                :title='"图片库"'
                :type='"PhotoGallery"'
                :width='"80%"'
                @closeHandler="visible=false"
                @confirmHandler="confirmHandler"></vue-dialog>
  </div>
</template>

<script>
// import PicMagnify from 'cyourai-vue-dialog' // 开发替换引用
import PicMagnify from '@/components/PicMagnify'
import VueDialog from '@/components/VueDialog'

export default {
  name: 'TestPicMagnify',
  components: { PicMagnify, VueDialog },
  mounted() {},
  data() {
    return {
      // 显示选择库弹窗
      visible: false,
      // 激活的控件
      activeIndex: '',
      // 图片路径
      picList: [
        'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=ce791734b6096b63951456026d5aec21/b03533fa828ba61e6cec18344934970a304e59af.jpg',
        'https://gss0.bdstatic.com/5bVWsj_p_tVS5dKfpU_Y_D3/res/r/image/2017-09-26/352f1d243122cf52462a2e6cdcb5ed6d.png',
        'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=4276611231,3231675248&fm=173&app=25&f=JPEG?w=550&h=323&s=D103F2115A243C0B4C104FC20300F09C',
        'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=550303708,136584433&fm=173&app=25&f=JPEG?w=550&h=411&s=E700F104F2731F96B67C558B0300E080',
        'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3654902013,2620387193&fm=173&app=25&f=JPEG?w=550&h=330&s=3895A1547C661F07D73AA0830300309B',
        'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3149361383,683717160&fm=173&app=25&f=JPEG?w=600&h=392&s=D69702655FCB4F7C00217158030070F0'
      ],
      errorUrl:
        'http://yaqun-smart.oss-cn-beijing.aliyuncs.com/1534236315440404.png'
    }
  },
  created() {},
  methods: {
    activePicDialogHandler(index) {
      this.visible = true
      this.activeIndex = index
      // console.debug('activePicDialogHandler: %s' + formField)
    },
    confirmHandler(params) {
      // 确认按钮回调
      this.visible = false
      this.visible = false
      if (Array.isArray(params.galleryList) && params.galleryList.length > 0) {
        this.picList[this.activeIndex] = params.galleryList[0]
        // console.debug('confirmHandler: %s', params.galleryList.length)
        // console.debug('confirmHandler: %s', params.galleryList.join(','))
        // console.debug('confirmHandler: %s', params.galleryList[0])
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
