import VueDialog from './components/VueDialog'
import TinymceGallery from './components/TinymceGallery'
import PicMagnify from './components/PicMagnify'
import TinymceMarkdown from './components/TinymceMarkdown'
import StopUpload from './components/StopUpload'
import TableFile from './components/TableFile'
import TableUser from './components/TableUser'
import TableGrid from './components/TableGrid'
import VueTree from './components/VueTree'
import OrganizationUser from './components/OrganizationUser'
import DialogTransfer from './components/DialogTransfer'
import TableHeader from './components/TableHeader'
import TimePicker from './components/TimePicker'

const components = [VueDialog, TinymceGallery, PicMagnify, TinymceMarkdown, StopUpload, TableFile, TableUser, TableGrid,
  VueTree, DialogTransfer, OrganizationUser,  TableHeader, TimePicker
]

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('VueDialog', components)
}

export default VueDialog
export {
  VueDialog,
  TinymceGallery,
  PicMagnify,
  TinymceMarkdown,
  TableFile,
  TableUser,
  TableGrid,
  VueTree,
  DialogTransfer,
  OrganizationUser,
  StopUpload,
  TableHeader,
  TimePicker
}
