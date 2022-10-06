<template>
  <div id="graph" ref="graph" class="graph">

  </div>
  <el-dialog
    v-model="dialogVisibleAddNodeFrom"
    title="添加节点"
    width="30%"
  >
    <addNodeFrom ref="addNodeFromRef"></addNodeFrom>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisibleAddNodeFrom = false">Cancel</el-button>
        <el-button type="primary" @click="addNode"
        >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>

  <el-dialog
    v-model="dialogVisibleMdEditor"
    width="90%"
    custom-class="md-editor-dialog"
    :close-on-click-modal="false"
    top="10vh"
    @close="closeMdDialog"
    @open="openMdDialog"
  >
    <mdEditor ref="editorMdRef"></mdEditor>
  </el-dialog>
</template>
<script>
import * as d3 from 'd3'
import { onMounted, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import addNodeFrom from './add-node-from'
import mdEditor from './md-editor'
import api from '@/utils'

export default {
  name: 'graph',
  components: {
    addNodeFrom,
    mdEditor
  },
  setup () {
    const router = useRouter()
    const state = reactive({
      dialogVisibleAddNodeFrom: false, // 弹框是否显示
      dialogVisibleMdEditor: false,
      bookId: router.currentRoute.value.query.id
    })

    const addNodeFromRef = ref(null)
    const editorMdRef = ref(null)


    const defaultRadius = 30
    const graph = ref(null)

    let data = []
    let tmpNodes = []
    let tmpEdges = []

    let svg
    let svgContext
    let marker
    let force
    let lines
    let circles
    let texts
    let color

    let currentSelectCircle
    onMounted(() => {
      api.node.getNodesByBookId(state.bookId).then((ret) =>{
        data = ret

        console.log(data)

        tmpNodes = JSON.parse(JSON.stringify(genCircles(data)))
        tmpEdges = JSON.parse(JSON.stringify(genEdges(data)))

        console.log(genCircles(data))
        console.log(genEdges(data))

        const width = graph.value.offsetWidth   //SVG绘制区域的宽度
        const height = graph.value.offsetHeight //SVG绘制区域的高度

        svg = d3.selectAll('#graph')               //选择<body>
          .append('svg')             //在<body>中添加<svg>
          .attr('oncontextmenu', () => 'self.event.returnValue=false')
          .attr('width', "100%")      //设定<svg>的宽度属性
          .attr('height', "100%")    //设定<svg>的高度属性
          .on('click', function () {
            removeArcMenu('arcMenu')
          })

        svgContext = svg.append('g')

        svg.call(d3.zoom().scaleExtent([0.5, 1.5]).on('zoom', () => {
          svgContext.attr('transform', d3.event.transform)
        })).on('dblclick.zoom', function (){
          circles.each(d =>{ // 取消节点固定
            d.fx = null;
            d.fy = null;
          })
        });

        // 通过布局来转换数据，然后进行绘制
        force = d3.forceSimulation(tmpNodes)
          .force("link", d3.forceLink(tmpEdges).distance(140).strength(2))
          .force("charge", d3.forceManyBody().strength(-1000))
          .force("collision", d3.forceCollide(defaultRadius+0.5))
          .force("x",d3.forceX(width / 2))
          .force("y",d3.forceY(height / 2))

        console.log(tmpNodes)
        console.log(tmpEdges)

        // 生成20种随机颜色
        color = d3.scaleOrdinal(d3.schemeCategory20);

        //箭头
        marker = svg.append('marker')
          .attr('id', function (d) {
            return d
          })
          .attr('id', 'resolved')
          .attr('markerUnits', 'strokeWidth')//设置为strokeWidth箭头会随着线的粗细发生变化
          .attr('markerUnits', 'userSpaceOnUse')
          .attr('viewBox', '0 -5 10 10')//坐标系的区域
          .attr('refX', 33)// 箭头坐标
          .attr('refY', 0) // 箭头偏移量
          .attr('markerWidth', 12)//标识的大小
          .attr('markerHeight', 12)
          .attr('orient', 'auto')//绘制方向，可设定为：auto（自动确认方向）和 角度值
          .attr('stroke-width', 2)//箭头宽度
          .append('path')
          .attr('d', 'M0,-5L10,0L0,5')//箭头的路径
          .attr('fill', '#6c6c6c')//箭头颜色

        //绘制连线
        lines = svgContext.append('g')
          .attr('class', 'line')
          .selectAll('.forceLine')
          .data(tmpEdges)
          .enter()
          .append('line')
          .attr('class', 'forceLine')
          .attr('marker-end', 'url(#resolved)')
          .style('stroke', '#6c6c6c')

        //绘制节点
        circles = svgContext.append('g')
          .attr('class', 'circle')
          .selectAll('.forceCircle')
          .data(tmpNodes)
          .enter()
          .append('circle')
          .attr('class', 'forceCircle')
          .attr('isOpen', function (d){
            return d.isOpen
          })
          .attr('r', defaultRadius)
          .attr('color',function (d, i) {
            return color(i)
          })
          .style('fill', function (d, i) {
            return color(i)
          })
          .on('contextmenu', function (d) {
            d.fx = d.x;
            d.fy = d.y;
            currentSelectCircle = d
            removeArcMenu('arcMenu')
            addArc('open',d.index,45, 0, 0.49, d.x, d.y, defaultRadius + 2, defaultRadius * 2)
            addArc('close',d.index,-45, 0.5, 0.99, d.x, d.y, defaultRadius + 2, defaultRadius * 2)
            addArc('add',d.index,45, 1, 1.49, d.x, d.y, defaultRadius + 2, defaultRadius * 2)
            addArc('edit',d.index,-45, 1.5, 1.99, d.x, d.y, defaultRadius + 2, defaultRadius * 2)
          })
          .on('mousemove',function (d){
            mousemoveCircles(d)
          })
          .on("mouseout",function (d){
            mouseoutCircles()
          })
          .on('dblclick', function () {
            let url = router.resolve({
              path: '/md',
              query: {
                id: '1'
              }
            })
            window.open(url.href,'_blank')
          })
          .call(drag) //允许拖动

        circles.append("svg:title")
          .text(function (d) {
            return d.name
          })

        //绘制文字
        texts = svgContext.append('g')
          .attr('class', 'text')
          .selectAll('.forceText')
          .data(tmpNodes)
          .enter()
          .append('text')
          .attr('class', 'forceText')
          .attr('pointer-events', 'none')
          .attr('x', function (d) {
            return d.x
          })
          .attr('y', function (d) {
            return d.y
          })
          .attr('dy', '.5em')
          .attr('font-size', '12px')
          .style('fill', '#111111')
          .text(function (d) {
            return limitText(d.name)
          })

        //tick事件的监听器
        force.on('tick', function () {
          //更新连线的端点坐标
          lines.attr('x1', function (d) {
            return d.source.x
          })
          lines.attr('y1', function (d) {
            return d.source.y
          })
          lines.attr('x2', function (d) {
            return d.target.x
          })
          lines.attr('y2', function (d) {
            return d.target.y
          })

          //更新节点坐标
          circles.attr('cx', function (d) {
            return d.x
          })
          circles.attr('cy', function (d) {
            return d.y
          })

          //更新节点文字的坐标
          texts.attr('x', function (d) {
            return d.x - 25
          })
          texts.attr('y', function (d) {
            return d.y
          })
        })
      })
    })

    // 拖拽事件函数
    let drag = d3.drag()
      .on('start', function (d) {
        if (!d3.event.active)
          force.alphaTarget(0.1).restart();
        d.fx = d.x;
        d.fy = d.y;
        // 停止事件,处理缩放
        d3.event.sourceEvent.stopPropagation()
        // 清楚弧菜单
        removeArcMenu('arcMenu')
      })
      .on('end', function (d, i) {
        if (!d3.event.active)
          force.alphaTarget(0);
        //拖曳结束后变为原来的颜色
        d3.select(this).style('fill', color(i))
      })
      .on('drag', function (d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
        //拖曳中对象变为黄色
        d3.select(this).style('fill', 'yellow')
      })

    function genEdges(data) {
      let edges = []
      data.forEach(item => {
        if (item.source+item.target>0) {
          edges.push({
            index:item.target-1,
            source: item.source,
            target: item.target,
          })
        }
      })
      return edges
    }

    function genCircles(data) {
      let circles = []
      data.forEach(item => {
        circles.push({
          group_id:item.group_id,
          name:item.name,
          index:item.index,
          parent:item.parent,
          id:item.id,
          isOpen:1
        })
      })
      return circles
    }

    function limitText(text) {
      // 如果小于四个字符，不换行
      // if (text.length > 6){
      //   return text.substring(0, 6)
      // }
      return text
    }

    let menuGroups
    // 添加弧菜单
    function addArc(operation,index, rotate,startA, endA, x, y, innerR = 25, outerR = 60,func) {
      //创建一个弧生成器
      var arcPath = d3.arc()
        .innerRadius(innerR)
        .outerRadius(outerR)
        .startAngle(Math.PI * startA)
        .endAngle(Math.PI * endA)

      // 如果menu组没有创建则创建
      if (svgContext.select('#arcMenu').size() === 0) {
        menuGroups = svgContext.append('g')
          .attr('id', 'arcMenu')
          .attr('transform', svgContext.select('g').attr('transform'))
      }

      // 构建单个menu,将弧和文字组合
      let menuGroup = menuGroups.append('g')
        .attr('operation', operation)
        .attr('index',index)
        .on('click', function () {
          let operationType = d3.select(this).attr('operation')
          console.log("currentSelectCircle:",currentSelectCircle)
          menuOperation(operationType,currentSelectCircle.index)
        })
      menuGroup.append('path') // 构建menu弧
        .attr('d', arcPath)
        .attr('transform', 'translate(' + x + ',' + y + ')')
        // .attr("stroke","black")
        .attr('fill', color(Math.random()));
      menuGroup.append('text') // 构建menu弧上的文字
        .text(operation)
        .attr('cursor', 'pointer')
        .attr('text-anchor', 'middle')
        .attr('font-size', '14px')
        .attr('fill', 'white')
        .attr('transform', function (d) {
          return 'translate(' + x + ',' + y + ')' + 'translate(' + arcPath.centroid(d) + ')' +'rotate('+rotate+')' //圆位置+弧的中心位置
        })
    }

    // 清除menu
    function removeArcMenu(id) {
      svgContext.select('#' + id).remove()
    }

    // menu对应操作
    function menuOperation(type,index) {
      if (type === 'edit') {
        console.log(type)
        state.dialogVisibleMdEditor = true
        return
      }

      if (type === 'add') {
        state.dialogVisibleAddNodeFrom = true
        return
      }

      if (type === 'open') {
        console.log(type)
        openCircle(index)
        return
      }

      if (type === 'close') {
        console.log(type)
        closeCircle(index)
        return
      }
    }

    // 添加节点
    function addCircle(node) {
      data.push(node)
      tmpNodes.push(genCircles([node])[0])
      tmpEdges.push(genEdges([node])[0])

      circles = svgContext.select('.circle').selectAll(".forceCircle")
        .data(tmpNodes)
      circles = circles.enter()
        .append('circle')
        .merge(circles)
        .attr('class', 'forceCircle')
        .attr('isOpen', function (d){
          return d.isOpen
        })
        .attr('r', defaultRadius)
        .attr('color',function (d, i) {
          return color(i)
        })
        .style('fill', function (d, i) {
          return color(i)
        })
        .on('contextmenu', function (d) {
          d.fx = d.x;
          d.fy = d.y;
          currentSelectCircle = d
          removeArcMenu('arcMenu')
          addArc('open',d.index,45, 0, 0.49, d.x, d.y, defaultRadius + 2, defaultRadius * 2)
          addArc('close',d.index,-45, 0.5, 0.99, d.x, d.y, defaultRadius + 2, defaultRadius * 2)
          addArc('add',d.index,45, 1, 1.49, d.x, d.y, defaultRadius + 2, defaultRadius * 2)
          addArc('edit',d.index,-45, 1.5, 1.99, d.x, d.y, defaultRadius + 2, defaultRadius * 2)
        })
        .on('click', function (d) {
          console.log(d3)
        })
        .on('mousemove',function (d){
          mousemoveCircles(d)
        })
        .on("mouseout",function (d){
          mouseoutCircles()
        })
        .on('dblclick', function () {
          console.log(this)
          let url = router.resolve({
            path: '/md',
            query: {
              id: '1'
            }
          })
          window.open(url.href,'_blank')
        })
        .call(drag) //允许拖动

      lines = svgContext.select('.line').selectAll(".forceLine")
        .data(tmpEdges)
      lines = lines.enter()
        .append('line')
        .merge(lines)
        .attr('class', 'forceLine')
        .attr('marker-end', 'url(#resolved)')
        .style('stroke', '#6c6c6c');

      texts = svgContext.select('.text').selectAll(".forceText")
        .data(tmpNodes)
      texts = texts.enter()
        .append('text')
        .merge(texts)
        .attr('class', 'forceText')
        .attr('pointer-events', 'none')
        .attr('x', function (d) {
          return d.x
        })
        .attr('y', function (d) {
          return d.y
        })
        .attr('dy', '.5em')
        .attr('font-size', '12px')
        .style('fill', '#111111')
        .text(function (d) {
          return limitText(d.name)
        })

      force.nodes(tmpNodes)
      force.force("link").links(tmpEdges)
      force.alpha(1).restart()
    }

    // 收起节点
    function closeCircle(index){
      tmpNodes = closeAssociatedCircle(tmpNodes,[index])
      tmpEdges = closeAssociatedEdge(tmpEdges,[index])


      d3.selectAll('.forceCircle').filter(function (d,i){
        let ok = false
        for (i = 0;i<tmpNodes.length;i++){
          if (tmpNodes[i].id == d.id){
            ok = true
            break;
          }
        }
        if (!ok) {
          return d
        }
      }).remove()

      d3.selectAll('.forceText').filter(function (d,i){
        let ok = false
        for (i = 0;i<tmpNodes.length;i++){
          if (tmpNodes[i].id == d.id){
            ok = true
            break;
          }
        }
        if (!ok) {
          return d
        }
      }).remove()

      d3.selectAll('.forceLine').filter(function (d,i){
        let ok = false
        for (i = 0;i<tmpEdges.length;i++){
          if (tmpEdges[i].index == d.index){
            ok = true
            break;
          }
        }
        if (!ok) {
          return d
        }
      }).remove()


      // d3.selectAll('.forceCircle')
      //   .data(tmpNodes)
      //   .exit()
      //   .remove();
      // d3.selectAll('.forceText')
      //   .data(tmpNodes)
      //   .exit()
      //   .remove();
      //
      // d3.selectAll('.forceLine')
      //   .data(tmpEdges)
      //   .exit()
      //   .remove();
    }

    // 不能有环
    function closeAssociatedCircle(tmpNodes,closeIndex){
      closeIndex.forEach(i => {
        let tmp = []
        tmpNodes = tmpNodes.filter(item => {
          if (item.parent != i) {
            return item
          }
          tmp.push(item.index)
        })
        if (tmp.length > 0)
          tmpNodes = closeAssociatedCircle(tmpNodes,tmp);
      })
      return tmpNodes
    }

    function closeAssociatedEdge(tmpEdges,closeIndex){
      closeIndex.forEach(i => {
        let tmp = []
        tmpEdges = tmpEdges.filter(item => {
          if (item.source.index != i) {
            return item
          }
          tmp.push(item.target.index)
        })
        if (tmp.length > 0)
          tmpEdges = closeAssociatedEdge(tmpEdges,tmp);
      })
      return tmpEdges
    }

    // 展开节点
    function openCircle(index){
      tmpNodes = openAssociatedCircle(tmpNodes,[index])
      tmpEdges = openAssociatedEdge(tmpEdges,[index])

      tmpNodes.sort(function (a,b){
        return a.index - b.index
      })
      tmpEdges.sort(function (a,b){
        return a.index - b.index
      })

      circles = svgContext.select('.circle').selectAll(".forceCircle")
        .data(tmpNodes)


      circles = circles
        .enter()
        .append('circle')
        .merge(circles)
        .attr('class', 'forceCircle')
        .attr('isOpen', function (d){
          return d.isOpen
        })
        .attr('r', defaultRadius)
        .attr('color',function (d, i) {
          return color(i)
        })
        .style('fill', function (d, i) {
          return color(i)
        })
        .on('contextmenu', function (d) {
          d.fx = d.x;
          d.fy = d.y;
          currentSelectCircle = d
          removeArcMenu('arcMenu')
          addArc('open',d.index,45, 0, 0.49, d.x, d.y, defaultRadius + 2, defaultRadius * 2)
          addArc('close',d.index,-45, 0.5, 0.99, d.x, d.y, defaultRadius + 2, defaultRadius * 2)
          addArc('add',d.index,45, 1, 1.49, d.x, d.y, defaultRadius + 2, defaultRadius * 2)
          addArc('edit',d.index,-45, 1.5, 1.99, d.x, d.y, defaultRadius + 2, defaultRadius * 2)
        })
        .on('click', function (d) {
          console.log(d3)
        })
        .on('mousemove',function (d){
          mousemoveCircles(d)
        })
        .on("mouseout",function (d){
          mouseoutCircles()
        })
        .on('dblclick', function () {
          console.log(this)
          let url = router.resolve({
            path: '/md',
            query: {
              id: '1'
            }
          })
          window.open(url.href,'_blank')
        })
        .call(drag) //允许拖动

      lines = svgContext.select('.line').selectAll(".forceLine")
        .data(tmpEdges)

      lines = lines
        .enter()
        .append('line')
        .merge(lines)
        .attr('class', 'forceLine')
        .attr('marker-end', 'url(#resolved)')
        .style('stroke', '#6c6c6c');

      texts = svgContext.select('.text').selectAll(".forceText")
        .data(tmpNodes)

      texts = texts
        .enter()
        .append('text')
        .merge(texts)
        .attr('class', 'forceText')
        .attr('pointer-events', 'none')
        .attr('x', function (d) {
          return d.x
        })
        .attr('y', function (d) {
          return d.y
        })
        .attr('dy', '.5em')
        .attr('font-size', '12px')
        .style('fill', '#111111')
        .text(function (d) {
          return limitText(d.name)
        })

      force.nodes(tmpNodes)
      force.force("link").links(tmpEdges)
      force.alpha(1).restart()
    }

    function openAssociatedCircle(tmpNodes,addIndex){
      addIndex.forEach(i => {
        let tmp = []
        data.forEach(item => {
          if (item.parent == i) {
            tmp.push(item.index)
            tmpNodes.push(genCircles([item])[0])
          }
        })
        if (tmp.length > 0)
          tmpNodes = openAssociatedCircle(tmpNodes,tmp);
      })

      return tmpNodes
    }

    function openAssociatedEdge(tmpEdges,addIndex){
      addIndex.forEach(i => {
        let tmp = []
        data.forEach(item => {
          if (item.parent == i) {
            tmp.push(item.index)
            tmpEdges.push(genEdges([item])[0])
          }
        })
        if (tmp.length > 0)
          tmpEdges = openAssociatedEdge(tmpEdges,tmp);
      })
      return tmpEdges
    }

    // 移动到圆上
    function mousemoveCircles(circle){
      // mousemove时改变圆圈背景色
      circles.style("fill", function (node) {
        if (circle.index == node.parent ||
          circle.index == node.index ||
          circle.parent == node.index) {
          return d3.select(this).attr('color');
        }
        return '#FFFAF0';
      });

      lines.style("stroke", function (line) {
        if (circle.index == line.target.index ||
          circle.index == line.source.index) {
          return '#6c6c6c';
        }
        return '#FFFAF0';
      });

      lines.attr("marker-end", function (line) {
        if (circle.index == line.target.index ||
          circle.index == line.source.index) {
          return 'url(#resolved)';
        }
        return "";
      });

      texts.style("fill", function (node) {
        if (circle.index == node.parent ||
          circle.index == node.index ||
          circle.parent == node.index) {
          return '#111111';
        }
        return '#fff0fa';
      });


    }

    // 移出圆
    function mouseoutCircles(){
      //单击时圆圈背景色
      circles.style("fill", function () {
        return d3.select(this).attr('color');
      });

      lines.style("stroke", function () {
        return '#6c6c6c';
      });
      lines.attr("marker-end", function () {
        return 'url(#resolved)';
      });

      texts.style("fill", function () {
        return '#111111';
      });
    }

    function addNode(){
      let node = {
        group_id:currentSelectCircle.group_id,
        name:addNodeFromRef.value.nodeFrom.name,
        parent:currentSelectCircle.index,
        source:currentSelectCircle.index,
      }
      api.node.addNode(JSON.stringify(node)).then((ret) =>{
        addCircle(ret)
      })


      state.dialogVisibleAddNodeFrom = false
    }

    function mdEditor(){

    }

    function closeMdDialog(){
      console.log("closeMdDialog")
    }

    function openMdDialog(){
      console.log("openMdDialog")
    }

    return {
      ...toRefs(state),
      addNodeFromRef,
      editorMdRef,
      addNode,
      closeMdDialog,
      openMdDialog,
      graph
    }
  }
}
</script>

<style scoped lang="scss">
.graph{
  height: 100%;
  width: 100%;
}

</style>
<style>
.md-editor-dialog.el-dialog {
  height: 80%;
  overflow: hidden;
}
.md-editor-dialog .el-dialog__body {
  height: calc(100% - 90px);
  padding-bottom: 30px;
}
</style>
