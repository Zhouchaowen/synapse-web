import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ElButton, ElInput, ElTabs, ElTabPane, ElRate, ElEmpty, ElDropdown, ElDropdownMenu, ElDropdownItem, ElDialog, ElForm, ElFormItem, ElRadioGroup, ElRadio } from 'element-plus'
import 'element-plus/dist/index.css'
import './static/iconfont.css'

import VMdEditor from '@kangc/v-md-editor';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index';
import '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css';

// 路由跳转后，页面滚动到顶部
router.afterEach(() => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
})
// highlightjs
import hljs from 'highlight.js';
VMdEditor.use(githubTheme, {
  Hljs: hljs,
}).use(createHighlightLinesPlugin());

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});
const app = createApp(App)

app.use(store)
  .use(router)
  .use(ElButton)
  .use(ElInput)
  .use(ElTabs)
  .use(ElTabPane)
  .use(ElRate)
  .use(ElEmpty)
  .use(ElDropdown)
  .use(ElDropdownMenu)
  .use(ElDropdownItem)
  .use(ElDialog)
  .use(ElForm)
  .use(ElFormItem)
  .use(ElRadioGroup)
  .use(ElRadio)
  .use(VMdEditor)
  .use(VMdPreview)
  .mount('#app')
