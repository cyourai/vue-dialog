import Vue from 'vue'
import Router from 'vue-router'
import TestUploadExcel from '@/test/TestUploadExcel'
import TestPhotoGallery from '@/test/TestPhotoGallery'
import TestTinymceGallery from '@/test/TestTinymceGallery'
import TestTinymceMarkdown from '@/test/TestTinymceMarkdown'
import TestPicMagnify from '@/test/TestPicMagnify'
import TestScript from '@/test/TestScript'
import TestScriptCreate from '@/test/TestScriptCreate'
import TestStopUpload from '@/test/TestStopUpload'
import TestTableFile from '@/test/TestTableFile'
import TestTableUser from '@/test/TestTableUser'
import TestTableGrid from '@/test/TestTableGrid'
import TestTree from '@/test/TestTree'
import TestOrganization from '@/test/TestOrganization'
import TestDialogTransfer from '@/test/TestDialogTransfer'
import TestDialogTransferPro from '@/test/TestDialogTransferPro'
import TestTableHeader from '@/test/TestTableHeader'
import TestTimePicker from '@/test/TestTimePicker'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'APP'
    },
    {
      path: '/excel',
      name: 'TestUploadExcel',
      component: TestUploadExcel
    },
    {
      path: '/photo',
      name: 'TestPhotoGallery',
      component: TestPhotoGallery
    },
    {
      path: '/tinymce',
      name: 'TestTinymceGallery',
      component: TestTinymceGallery
    },
    {
      path: '/markdown',
      name: 'TestTinymceMarkdown',
      component: TestTinymceMarkdown
    },
    {
      path: '/magnify',
      name: 'TestTinymceGallery',
      component: TestPicMagnify
    },
    {
      path: '/script',
      name: 'TestScript',
      component: TestScript
    },
    {
      path: '/scriptCreate',
      name: 'TestScriptCreate',
      component: TestScriptCreate
    },
    {
      path: '/tableFile',
      name: 'TestTableFile',
      component: TestTableFile
    },
    {
      path: '/tableUser',
      name: 'TestTableUser',
      component: TestTableUser
    },
    {
      path: '/tableGrid',
      name: 'TestTableGrid',
      component: TestTableGrid
    },
    {
      path: '/stopupload',
      name: 'TestStopUpload',
      component: TestStopUpload
    },
    {
      path: '/stopupload',
      name: 'TestStopUpload',
      component: TestStopUpload
    },
    {
      path: '/tree',
      name: 'TestTree',
      component: TestTree
    },
    {
      path: '/organization',
      name: 'TestOrganization',
      component: TestOrganization
    },
    {
      path: '/dialogTransferUser',
      name: 'TestDialogTransfer',
      component: TestDialogTransfer
    },
    {
      path: '/dialogTransferProcess',
      name: 'TestDialogTransferPro',
      component: TestDialogTransferPro
    },
    {
      path: '/timePicker',
      name: 'TestTimePicker',
      component: TestTimePicker
    },
    {
      path: '/tableHeader',
      name: 'TestTableHeader',
      component: TestTableHeader
    },
  ]
})
