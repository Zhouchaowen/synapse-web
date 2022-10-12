<template>
  <div id="hTags" class="hTags">
    <div class="catalog-card" v-if="Object.keys(titles).length > 0">
      <div class="catalog-card-header">
        <div>
          <span><font-awesome-icon
              :icon="['fas', 'bars-staggered']"
              class="catalog-icon"
            /></span>
          <span>目录</span>
        </div>
        <span class="progress">{{ progress }}</span>
      </div>

      <div class="catalog-content">
        <div
          v-for="title in titles"
          :key="title.id"
          @click="scrollToView(title.scrollTop)"
          :class="['catalog-item','not-active']"
          :style="{ marginLeft: title.level * 20 + 'px' }"
          v-show="title.isVisible"
          :title="title.rawName"
        >
          {{ title.name }}
        </div>
      </div>
    </div>
  </div>
  <div id="md" class="md">
<!--    <v-md-editor v-model="markdown" ref="previewRef" mode="preview"  height="100%"></v-md-editor>-->
    <v-md-preview id="v-md-preview" :text="markdown" ref="previewRef" />
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router';
import api from '@/utils'
import {ElMessage} from "element-plus";

export default {
  name: 'md',
  setup(props){
    const router = useRouter()
    const previewRef = ref(null)
    const state=reactive({
      titles: [],
      currentTitle:{},
      progress:0,
      markdown: "",
      nodeId: router.currentRoute.value.query.nodeId
    })


    getMarkDown(state.nodeId)

    onMounted(() => {
      getTitles()

      // state.titles = getTitles()

      // 监听滚动事件并更新样式
      document.getElementById('v-md-preview').addEventListener("scroll", function () {
        let scrollTop = document.getElementById('v-md-preview').scrollTop
        let scrollHeight = document.getElementById('v-md-preview').scrollHeight
        let clientHeight = document.getElementById('v-md-preview').clientHeight
        state.progress = parseInt(( scrollTop/  (scrollHeight-clientHeight) ) * 100) + "%";

        let visibleTitles = [];

        for (let i = state.titles.length - 1; i >= 0; i--) {
          const title = state.titles[i];
          let scrollTop = document.getElementById('v-md-preview').scrollTop
          let clientHeight = document.getElementById('v-md-preview').clientHeight
          console.log(title.scrollTop,scrollTop,clientHeight)
          if (title.scrollTop <= (scrollTop+clientHeight)) {
            if (state.currentTitle.id === title.id) return;

            Object.assign(state.currentTitle, title)

            // 展开节点
            setChildrenVisible(title, true);
            visibleTitles.push(title);

            // 展开父节点
            let parent = title.parent;
            while (parent) {
              setChildrenVisible(parent, true);
              visibleTitles.push(parent);
              parent = parent.parent;
            }

            // 折叠其余节点
            for (const t of state.titles) {
              if (!visibleTitles.includes(t)) {
                setChildrenVisible(t, false);
              }
            }
          }
        }
      });

      // 设置子节点的可见性
      function setChildrenVisible(title, isVisible) {
        for (const child of title.children) {
          child.isVisible = isVisible;
        }
      }
    })

    // 滚动到指定的位置
    function scrollToView(scrollTop) {
      console.log(document.getElementById('v-md-preview'))
      document.getElementById('v-md-preview').scrollTo({ top: scrollTop, behavior: "smooth" });
    }

    // 获取目录的标题
    function getTitles() {
      let titles = [];
      let levels = ["h1", "h2", "h3"];

      setTimeout(() => {
        let children = previewRef.value.$el.querySelectorAll("*")[0].children
        let elements = Array.from(children);

        // 调整标签等级
        let tagNames = new Set(
          elements.map((el) => el.tagName.toLowerCase())
        );
        for (let i = levels.length - 1; i >= 0; i--) {
          if (!tagNames.has(levels[i])) {
            levels.splice(i, 1);
          }
        }

        let serialNumbers = levels.map(() => 0);
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          let tagName = element.tagName.toLowerCase();
          let level = levels.indexOf(tagName);
          if (level == -1) continue;

          let id = tagName + "-" + element.innerText + "-" + i;
          let node = {
            id,
            level,
            parent: null,
            children: [],
            rawName: element.innerText,
            scrollTop: element.offsetTop,
          };
          if (titles.length > 0) {
            let lastNode = titles.at(-1);

            // 遇到子标题
            if (lastNode.level < node.level) {
              node.parent = lastNode;
              lastNode.children.push(node);
            }
            // 遇到上一级标题
            else if (lastNode.level > node.level) {
              serialNumbers.fill(0, level + 1);
              let parent = lastNode.parent;
              while (parent) {
                if (parent.level < node.level) {
                  parent.children.push(node);
                  node.parent = parent;
                  break;
                }
                parent = parent.parent;
              }
            }
            // 遇到平级
            else if (lastNode.parent) {
              node.parent = lastNode.parent;
              lastNode.parent.children.push(node);
            }
          }

          serialNumbers[level] += 1;
          let serialNumber = serialNumbers.slice(0, level + 1).join(".");

          node.isVisible = node.parent == null;
          node.name = serialNumber + ". " + element.innerText;
          titles.push(node);
        }
      state.titles = titles;
      })
    }

    function getMarkDown(nodeId){
      state.markdown = ""
      api.md.getMdById(nodeId).then((ret) =>{
        state.markdown = ret.content
        getTitles(state.markdown)
      },(err) => {
        ElMessage({
          message: err.data.error,
          type: 'error',
          duration: 3 * 1000
        })
      })
    }

    return {
      ...toRefs(state),
      scrollToView,
      previewRef,
    }
  }

}
</script>

<style lang="scss" scoped>
.hTags {
  width: 20%;
  float: left;
  background: #fff;
  height: calc(100% - 20px);
  overflow-y: hidden;
  margin: 10px 0 10px 8%;
}
.md{
  height: calc(100% - 20px);;
  width: 60%;
  margin: 10px 3%;
  float: left;
  background-color: #fff;
}

.v-md-editor-preview {
  height: 100%;
  overflow-y: auto;
}

.catalog-card {
  background: white;
  border-radius: 8px;
  box-shadow: var(--card-box-shadow);
  padding: 20px 24px;
  width: 100%;
  height: 90%;
  margin-top: 25px;
  box-sizing: border-box;
}
.catalog-card-header {
  text-align: left !important;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.catalog-icon {
  font-size: 18px;
  margin-right: 10px;
  color: dodgerblue;
}
.catalog-card-header div > span {
  font-size: 17px;
  color: var(--text-color);
}
.progress {
  color: #a9a9a9;
  font-style: italic;
  font-size: 140%;
}
.catalog-content {
  max-height: calc(100vh - 120px);
  overflow: auto;
  margin-right: -24px;
  padding-right: 20px;
  height: 100%;
}
.catalog-item {
  color: #666261;
  margin: 5px 0;
  line-height: 28px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: 14px;
  padding: 2px 6px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  &:hover {
    color: #0c82e9;
  }
}
.active {
  background-color: #0c82e9;
  color: white;
  &:hover {
    background-color: #0c82e9;
    color: white;
  }
}
</style>
