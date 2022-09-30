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
  <div id="md" class="md" ref="previewRef">
    <v-md-editor :model-value="markdown" mode="preview"  height="100%"></v-md-editor>
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router';
export default {
  name: 'md',
  setup(props){
    const router = useRouter()
    const state=reactive({
      titles: [],
      currentTitle:{},
      progress:0,
      markdown: "@[toc](目录)\n" +
        "\n" +
        "Markdown 语法简介\n" +
        "=============\n" +
        "> [语法详解](http://commonmark.org/help/)\n" +
        "\n" +
        "## **粗体**\n" +
        "```\n" +
        "**粗体**\n" +
        "__粗体__\n" +
        "```\n" +
        "## *斜体*\n" +
        "```\n" +
        "*斜体*\n" +
        "_斜体_\n" +
        "```\n" +
        "## 标题\n" +
        "```\n" +
        "# 一级标题 #\n" +
        "一级标题\n" +
        "====\n" +
        "## 二级标题 ##\n" +
        "二级标题\n" +
        "----\n" +
        "### 三级标题 ###\n" +
        "#### 四级标题 ####\n" +
        "##### 五级标题 #####\n" +
        "###### 六级标题 ######\n" +
        "```\n" +
        "## 分割线\n" +
        "```\n" +
        "***\n" +
        "---\n" +
        "```\n" +
        "****\n" +
        "## ^上^角~下~标\n" +
        "```\n" +
        "上角标 x^2^\n" +
        "下角标 H~2~0\n" +
        "```\n" +
        "## ++下划线++ ~~中划线~~\n" +
        "```\n" +
        "++下划线++\n" +
        "~~中划线~~\n" +
        "```\n" +
        "## ==标记==\n" +
        "```\n" +
        "==标记==\n" +
        "```\n" +
        "## 段落引用\n" +
        "```\n" +
        "> 一级\n" +
        ">> 二级\n" +
        ">>> 三级\n" +
        "...\n" +
        "```\n" +
        "\n" +
        "## 列表\n" +
        "```\n" +
        "有序列表\n" +
        "1.\n" +
        "2.\n" +
        "3.\n" +
        "...\n" +
        "无序列表\n" +
        "-\n" +
        "-\n" +
        "...\n" +
        "```\n" +
        "\n" +
        "## 任务列表\n" +
        "\n" +
        "- [x] 已完成任务\n" +
        "- [ ] 未完成任务\n" +
        "\n" +
        "```\n" +
        "- [x] 已完成任务\n" +
        "- [ ] 未完成任务\n" +
        "```\n" +
        "\n" +
        "## 链接\n" +
        "```\n" +
        "[链接](www.baidu.com)\n" +
        "![图片描述](http://www.image.com)\n" +
        "```\n" +
        "## 代码段落\n" +
        "\\``` type\n" +
        "\n" +
        "代码段落\n" +
        "\n" +
        "\\```\n" +
        "\n" +
        "\\` 代码块 \\`\n" +
        "\n" +
        "```c++\n" +
        "int main()\n" +
        "{\n" +
        "    printf(\"hello world!\");\n" +
        "}\n" +
        "```\n" +
        "`code`\n" +
        "## 表格(table)\n" +
        "```\n" +
        "| 标题1 | 标题2 | 标题3 |\n" +
        "| :--  | :--: | ----: |\n" +
        "| 左对齐 | 居中 | 右对齐 |\n" +
        "| ---------------------- | ------------- | ----------------- |\n" +
        "```\n" +
        "| 标题1 | 标题2 | 标题3 |\n" +
        "| :--  | :--: | ----: |\n" +
        "| 左对齐 | 居中 | 右对齐 |\n" +
        "| ---------------------- | ------------- | ----------------- |\n" +
        "## 脚注(footnote)\n" +
        "```\n" +
        "hello[^hello]\n" +
        "```\n" +
        "\n" +
        "见底部脚注[^hello]\n" +
        "\n" +
        "[^hello]: 一个注脚\n" +
        "\n" +
        "## 表情(emoji)\n" +
        "[参考网站: https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)\n" +
        "```\n" +
        ":laughing:\n" +
        ":blush:\n" +
        ":smiley:\n" +
        ":)\n" +
        "...\n" +
        "```\n" +
        ":laughing::blush::smiley::)\n" +
        "\n" +
        "## $\\KaTeX$公式\n" +
        "\n" +
        "我们可以渲染公式例如：$x_i + y_i = z_i$和$\\sum_{i=1}^n a_i=0$\n" +
        "我们也可以单行渲染\n" +
        "$$\\sum_{i=1}^n a_i=0$$\n" +
        "具体可参照[katex文档](http://www.intmath.com/cg5/katex-mathjax-comparison.php)和[katex支持的函数](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)以及[latex文档](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)\n" +
        "\n" +
        "## 布局\n" +
        "\n" +
        "::: hljs-left\n" +
        "`::: hljs-left`\n" +
        "`居左`\n" +
        "`:::`\n" +
        ":::\n" +
        "\n" +
        "::: hljs-center\n" +
        "`::: hljs-center`\n" +
        "`居中`\n" +
        "`:::`\n" +
        ":::\n" +
        "\n" +
        "::: hljs-right\n" +
        "`::: hljs-right`\n" +
        "`居右`\n" +
        "`:::`\n" +
        ":::\n" +
        "\n" +
        "## 定义\n" +
        "\n" +
        "术语一\n" +
        "\n" +
        ":   定义一\n" +
        "\n" +
        "包含有*行内标记*的术语二\n" +
        "\n" +
        ":   定义二\n" +
        "\n" +
        "        {一些定义二的文字或代码}\n" +
        "\n" +
        "    定义二的第三段\n" +
        "\n" +
        "```\n" +
        "术语一\n" +
        "\n" +
        ":   定义一\n" +
        "\n" +
        "包含有*行内标记*的术语二\n" +
        "\n" +
        ":   定义二\n" +
        "\n" +
        "        {一些定义二的文字或代码}\n" +
        "\n" +
        "    定义二的第三段\n" +
        "\n" +
        "```\n" +
        "\n" +
        "## abbr\n" +
        "*[HTML]: Hyper Text Markup Language\n" +
        "*[W3C]:  World Wide Web Consortium\n" +
        "HTML 规范由 W3C 维护\n" +
        "```\n" +
        "*[HTML]: Hyper Text Markup Language\n" +
        "*[W3C]:  World Wide Web Consortium\n" +
        "HTML 规范由 W3C 维护\n" +
        "```\n" +
        "\n",
      id: router.currentRoute.value.query.id
    })

    onMounted(() => {
      state.titles = getTitles()
      console.log(state.titles)
      // 监听滚动事件并更新样式
      document.getElementsByClassName('scrollbar__wrap')[2].addEventListener("scroll", function () {
        state.progress =
          parseInt(
            (document.getElementsByClassName('scrollbar__wrap')[2].scrollTop / (document.getElementsByClassName('scrollbar__wrap')[2].scrollHeight - document.getElementsByClassName('scrollbar__wrap')[2].clientHeight)) *
            100
          ) + "%";

        let visibleTitles = [];

        for (let i = state.titles.length - 1; i >= 0; i--) {
          const title = state.titles[i];
          let scrollTop = document.getElementsByClassName('scrollbar__wrap')[2].scrollTop
          let clientHeight = document.getElementsByClassName('scrollbar__wrap')[2].clientHeight
          console.log(title.scrollTop,scrollTop,clientHeight)
          if (title.scrollTop <= (scrollTop+clientHeight)) {
            if (state.currentTitle.id === title.id) return;

            Object.assign(state.currentTitle, title);

            console.log()

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
        console.log(document.getElementsByClassName('scrollbar__wrap')[2])
        document.getElementsByClassName('scrollbar__wrap')[2].scrollTo({ top: scrollTop, behavior: "smooth" });
      }
    // 获取目录的标题
    function getTitles() {
      let titles = [];
      let levels = ["h1", "h2", "h3"];

      let articleElement = document.getElementById('md');
      if (!articleElement) {
        return titles;
      }

      let elements = Array.from(articleElement.querySelectorAll("*"));

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

      return titles;
    }

    return {
      ...toRefs(state),
      scrollToView
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
  overflow-y: auto;
  margin: 10px 0 10px 8%;
}
.md{
  height: calc(100% - 20px);;
  width: 60%;
  margin: 10px 3%;
  float: left;
}

.catalog-card {
  background: white;
  border-radius: 8px;
  box-shadow: var(--card-box-shadow);
  padding: 20px 24px;
  width: 100%;
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
