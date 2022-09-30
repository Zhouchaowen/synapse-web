<template>
  <div id="md" class="md" ref="previewRef">
    <v-md-editor :model-value="markdown" height="100%"></v-md-editor>
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router';
export default {
  name: 'md-editor',
  setup(){
    const router = useRouter()
    const state=reactive({
      titles:[],
      id: router.currentRoute.value.query.id,
      markdown: "## 映射Map\n" +
        "\n" +
        "**d3.map**([object][, key])构造映射。第一个参数是源数组，第二个参数用于指定映射的key。\n" +
        "\n" +
        "**map.has**(key)如果指定的key存在，则返回true；反之，则返回false。\n" +
        "\n" +
        "**map.get**(key)如果指定的key存在，则返回该key的value；否则，返回undefined。\n" +
        "\n" +
        "**map.set**(key, value)对指定的key设定value，如果该key已经存在，则新value会覆盖旧value；如果该key不存在，则会添加一个新的value。\n" +
        "\n" +
        "**map.remove**(key)如果指定的key存在，则将此key和value删除，并返回true；如果不存在，则返回false。\n" +
        "\n" +
        "**map.keys**()以数组形式返回该map所有的key。\n" +
        "\n" +
        "**map.values**()以数组形式返回该map所有的value。\n" +
        "\n" +
        "**map.entries**()以数组形式返回该map所有的key和value。\n" +
        "\n" +
        "**map.forEach**(function)分别对该映射中的每一项调用function函数，function函数传入两个参数：key和value。分别代表每一项的key和value。\n" +
        "\n" +
        "**map.empty**()如果该映射为空，返回true；否则，返回false。\n" +
        "\n" +
        "**map.size**()返回该映射的大小。\n" +
        "\n" +
        "```js\n" +
        "/用于构建映射的数组\n" +
        "var dataset = [ { id: 1000, color:\"red\" },\n" +
        "                { id: 1001, color:\"green\" },\n" +
        "                { id: 1002, color:\"blue\" } ];\n" +
        "\n" +
        "//以数组dataset构建映射，并以其中各项的id作为键\n" +
        "var map = d3.map(dataset, function(d){ return d.id; });\n" +
        "\n" +
        "map.has(1001);  //返回true\n" +
        "map.has(1003);  //返回false\n" +
        "\n" +
        "map.get(1001);  //返回{ id: 1001, color:\"green\" }\n" +
        "map.get(1003);  //返回undefined\n" +
        "\n" +
        "//将1001键的值设置为 { id: 1001, color:\"yellow\" }\n" +
        "map.set(1001, { id: 1001, color:\"yellow\" } );\n" +
        "\n" +
        "//将1003键的值设置为 { id: 1003, color:\"white\" }\n" +
        "map.set(1003, { id: 1003, color:\"white\" } );\n" +
        "\n" +
        "map.remove(1001); //删除键为1001的键和值\n" +
        "\n" +
        "map.keys();       //返回[\"1000\", \"1002\", \"1003\"]\n" +
        "map.values();     //返回所有的值\n" +
        "map.entries();    //返回所有的键和值\n" +
        "\n" +
        "//该循环会进行三次，键依次为1000、1002、1003\n" +
        "map.forEach(function(key,value){\n" +
        "   console.log(key);\n" +
        "   console.log(value);\n" +
        "});\n" +
        "\n" +
        "map.empty();  //返回false\n" +
        "map.size();   //返回3\n" +
        "```\n" +
        "\n" +
        "## 集合Set\n" +
        "\n" +
        "**d3.set**([array])使用数组来构建集合，如果数组里有重复的元素，则只添加其中一项。\n" +
        "\n" +
        "**set.has**(value)如果集合中有指定元素，则返回true；如果没有，返回false。\n" +
        "\n" +
        "**set.add**(value)如果该集合中没有指定元素，则将其添加到集合中，并返回该元素；如果有，则不添加。\n" +
        "\n" +
        "**set.remove**(value)如果该集合中有指定元素，则将其删除并返回true；否则，返回false。\n" +
        "\n" +
        "**set.values**()以数组形式返回该集合中所有的元素。\n" +
        "\n" +
        "**set.forEach**(function)对每一个元素都调用function函数，函数里传入一个参数，即该元素的值。\n" +
        "\n" +
        "**set.empty**()如果该集合为空，则返回true；否则，返回false。\n" +
        "\n" +
        "**set.size**()返回该集合的大小。",
    })




    // function save() {
    //   console.log(state.markdown)
    // }
    return {
      ...toRefs(state),
    }
  }

}
</script>

<style scoped>
.md {
  height: 100%;
}
</style>
