<template>
  <!-- tabs标签 -->
  <div id="tabs">
    <el-tabs class="tabs" type="card" v-model="active_tab_name" closable @edit="handleTabsEdit" @tab-click="handleTabsJump">
      <el-tab-pane :key="tab.name" v-for="tab in tabs" :label="tab.title" :name="tab.name">
        <template #label>
          <el-icon :size="14">
            <component :is="tab.icon"></component>
          </el-icon>
          {{ tab.title }}
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script   >
export default {
  data () {
    return {
      active_tab_name: "1",
      tabs: [
        { title: '主页', name: '/admin/test', icon: 'House' },
        { title: '测试', name: '/admin/test', icon: 'Menu' },
        { title: '测试3', name: '/admin/test3', icon: 'Menu' },

      ],
    }
  },
  created () { },
  mounted () {
    this.create_tab(this.$route)
  },
  methods: {
    // 创建tab标签
    create_tab (route) {
      if (this.tabs.filter(i => i.name === route.fullPath).length === 0) {
        this.tabs.push({ title: route.meta.title, name: route.fullPath, icon: route.meta.icon, })
      }
      this.active_tab_name = route.fullPath
    },
    handleTabsJump (tab) {
      this.$router.push(tab.props.name);
    },
    // 编辑tabs
    handleTabsEdit (targetName, action) {
      console.log(targetName, action)
      if (action === "remove") {
        let tabs = this.tabs;
        let activeName = this.active_tab_name;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                this.$router.push(nextTab.name);
                activeName = nextTab.name;
              }
            }
          });
        }

        this.active_tab_name = activeName;
        this.tabs = tabs.filter((tab) => tab.name !== targetName);
      }
    },

  },

}
</script>

<style lang="less">
.tabs {
  .el-icon {
    text-align: center;
  }

  .el-tabs__header {
    margin: 0px !important;

    .el-tabs__item:hover {
      padding: 0 30px 0 30px !important;
      -webkit-mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
      mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;
      background: #dee1e6;
    }
    .el-tabs__item.is-active {
      padding: 0 30px 0 30px;
      -webkit-mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
      mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;
    }
    .el-tabs__nav {
      border: 0px solid var(--el-border-color-light) !important;
    }
    .el-tabs__item {
      height: 40px;
      box-sizing: border-box;
      line-height: 40px;
      display: inline-block;
      list-style: none;
      font-size: 14px;
      font-weight: 500;
      color: var(--el-text-color-primary);
      position: relative;
      padding: 0 30px 0 30px !important;
      margin-top: 5.95px;
      margin-right: -18px;
      text-align: center;
      border: 0;
      outline: none;
      transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
      border-left: 0px solid !important;
    }
    .el-tabs__item.is-active {
      color: var(--el-color-primary);
      background: #e8f4ff;
    }

    .el-tabs__item.is-active:hover {
      color: var(--el-color-primary) !important;
      background: #e8f4ff !important;
    }
  }
}
</style>