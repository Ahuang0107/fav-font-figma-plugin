# todo

- [x] 收藏字体的功能
- [x] 单击列表里的字体，将字体样式应用到选中的文字图层上
- [x] 显示当前文字图层的字体样式
- [x] 将同一字体不同style分到一个组，可以展开选择
- [ ] 列表字体可以进行分类
- [ ] 浏览字体时可以实时看到效果
- [x] 展示的字体样例可以切换中英文
- [ ] 定位选中的图层的字体样式在列表的位置
- [ ] 可以切换更多的类型的字体样例，比如繁体，日文，韩文以及特殊字符
- [ ] 可以只筛选本地有的字体

## publish check

- [x] If your plugin is only meant to do something if a certain type of nodes is selected, what happens when:
  - [x] The user has nothing selected?（字体列表是灰色的无法进行操作）
  - [x] The wrong type of node selected?（只处理TEXT类型的node）
  - [x] Multiple things selected?（只处理只选中一个node时的node）
  - [x] A component selected? Are you alright with the change propagating to potentially hundreds of instances?
    （只处理TEXT类型的node）
- [x] If your plugin modifies a text layer, what happens if the font for that text layer is missing?
  （加载字体出问题会调notify并把字体设置回去）
- [ ] If your plugin can edit a component, what happens if the component comes from the team library?
- [x] If your plugin needs to load resources over the network, what happens if the user is temporary offline when they
  run your plugin?（没有加载网络资源）
- [ ] If your plugin stays open for a while:
  - [x] What happens if the user deletes a node you currently have a reference to?（此时选中的node发生变化会触发灰度字体列表行为）
  - [ ] What happens a multiplayer even causes changes in the document?
- [ ] If your plugin is concerned with the position of layers, what happens if something is rotated?
- [ ] If your plugin can traverse large parts of the document (e.g. search for a node), what happens if the document is
  very large?
- [ ] If you're using a bundler, have you checked the output size of your plugin? Could you make it smaller (e.g. by
  running your bundler in release mode)?
