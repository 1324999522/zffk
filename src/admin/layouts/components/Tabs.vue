<template>
  <!-- tabs标签 -->
  <div id='tabs'>
    <el-tabs class="tabs" type="card" v-model="active_tab_name" closable @edit="handleTabsEdit" @tab-click="handleTabsJump">
      <el-tab-pane :key="tab.name" v-for="tab in tabs" :label="tab.title" :name="tab.name">
        <template #label>
          <span>
            <span>
              <el-icon :size='14'>
                <component :is="tab.icon"></component>
              </el-icon>
              {{tab.title}}
            </span>

          </span>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script   >
import { Search, Edit, Check, Message, Star, Delete } from '@element-plus/icons-vue'
export default {
  name: 'tabs',
  components: {

  },
  data() {
    return {
      active_tab_name: "1",
      tabs: [
         { title: '主页', name: '/admin/test', icon: 'House' },
        { title: '测试', name: '/admin/test', icon: 'Menu' },
        { title: '测试3', name: '/admin/test3', icon: 'Menu' },

      ],
    }
  },
  created() { },
  mounted() {
    this.create_tab(this.$route)
  },
  methods: {
    // 创建tab标签
    create_tab(route) {
      if (this.tabs.filter(i => i.name === route.fullPath).length === 0) {
        this.tabs.push({ title: route.meta.title, name: route.fullPath, icon: route.meta.icon, })
      }
      this.active_tab_name = route.fullPath
    },
    handleTabsJump(tab) {
      this.$router.push(tab.props.name);
    },
    // 编辑tabs
    handleTabsEdit(targetName, action) {
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
}
</style>