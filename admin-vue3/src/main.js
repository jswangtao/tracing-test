import { createApp } from 'vue'

import Cookies from 'js-cookie'

import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn' // 中文语言

import '@/assets/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import directive from './directive' // directive

// import draggable from 'dd-form-draggable'
// import VFormDesigner from '@/assets/draggable/dist/designer.es'
// import '@/assets/draggable/dist/designer.style.css'

// 注册指令
import plugins from './plugins' // plugins
import { download } from '@/utils/request'

// svg图标
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon'
import elementIcons from '@/components/SvgIcon/svgicon'

import './permission' // permission control

import submitNoEnter from '@/utils/submitNoEnter' //取消回车提交

import { useDict } from '@/utils/dict'
import { parseTime, resetForm, addDateRange, handleTree, selectDictLabel, selectDictLabels } from '@/utils/ruoyi'

// 分页组件
import Pagination from '@/components/Pagination'
// 自定义表格工具组件
import RightToolbar from '@/components/RightToolbar'
// 富文本组件
import Editor from '@/components/Editor'
// 文件上传组件
import FileUpload from '@/components/FileUpload'
// 图片上传组件
import ImageUpload from '@/components/ImageUpload'
// 图片预览组件
import ImagePreview from '@/components/ImagePreview'
// 自定义树选择组件
import TreeSelect from '@/components/TreeSelect'
// 字典标签组件
import DictTag from '@/components/DictTag'

import WebTracing from '@web-tracing/vue3'

const app = createApp(App)

// 全局方法挂载
app.config.globalProperties.useDict = useDict
app.config.globalProperties.download = download
app.config.globalProperties.parseTime = parseTime
app.config.globalProperties.resetForm = resetForm
app.config.globalProperties.handleTree = handleTree
app.config.globalProperties.addDateRange = addDateRange
app.config.globalProperties.selectDictLabel = selectDictLabel
app.config.globalProperties.selectDictLabels = selectDictLabels

// 全局组件挂载
app.component('DictTag', DictTag)
app.component('Pagination', Pagination)
app.component('TreeSelect', TreeSelect)
app.component('FileUpload', FileUpload)
app.component('ImageUpload', ImageUpload)
app.component('ImagePreview', ImagePreview)
app.component('RightToolbar', RightToolbar)
app.component('Editor', Editor)
// app.component('draggable', draggable)

app.use(router)
app.use(store)
app.use(plugins)
app.use(elementIcons)
// app.use(VFormDesigner)
app.component('svg-icon', SvgIcon)
app.mixin(submitNoEnter)
directive(app)

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
  locale: locale,
  // 支持 large、default、small
  size: Cookies.get('size') || 'default'
})

app.use(WebTracing, {
  dsn: 'http://localhost:8080/system/tracing',
  appName: 'nest-admin',
  debug: true,
  pv: true,
  performance: true,
  error: true,
  event: true,
  cacheMaxLength: 10,
  cacheWatingTime: 1000,

  // 查询埋点信息、清除埋点信息、获取埋点基础信息 不需要进行捕获
  ignoreRequest: [/getAllTracingList/, /cleanTracingList/, /getBaseInfo/, /getSourceMap/],

  // 发送埋点数据后，拉起弹窗提示用户已发送
  afterSendData(data) {
    console.log('🚀🚀🚀======>>>data', data)
  }
})

app.mount('#app')
