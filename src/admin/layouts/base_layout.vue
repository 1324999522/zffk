<template>
  <el-container>
    <el-aside width="230px" id="aside">
      <div class="aside_title">
        <img src="http://img.mp.itc.cn/upload/20170808/5861bc790e654d56bc9289c567b44875_th.jpg" alt="" />
        <div class="aside_title_text">后台管理系统</div>
      </div>
      <el-menu router :default-active="$route.path" :collapse="isCollapse" background-color="#1e222d" text-color="hsla(0,0%,100%,.9)" active-text-color="#fff">
        <!-- 一级菜单 -->
        <el-sub-menu v-for="(submenu, index) in $router.adminRoutes" :key="index" :index="String(index)">
          <!-- 一级菜单标题和icon -->
          <template #title>
            <el-icon>
              <Menu></Menu>
            </el-icon>
            <span>{{ submenu.meta.title }}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item v-for="(children, index) in submenu.children" :key="index" :index="children.path" icon="Edit">
            <!-- 二级菜单标题和icon -->
            <el-icon :size="20">
              <component :is="children.meta.icon"></component>
            </el-icon>

            {{ children.meta.title }}
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header id="herder">
        <Herder> </Herder>
      </el-header>
      <Tabs ref="Tabs"> </Tabs>
      <el-main>
        <el-config-provider size="large">
          <router-view  />
        </el-config-provider>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Herder from '@/admin/layouts/components/Herder'
import Tabs from '@/admin/layouts/components/Tabs'
export default {
  components: {
    Herder, Tabs,
  },
  data () {
    return {
      isCollapse: false,

    }
  },
  created () {

  },
  beforeRouteUpdate (to, form) {
    this.$store.state.adminPage.change()
    this.$refs.Tabs.create_tab(to);
  },
}
</script>

<style lang="less">
.el-container {
  min-height: 100%;
}

#aside {
  min-height: 100%;
  .el-menu {
    border-right: solid 0px var(--el-menu-border-color) !important;
    .is-active {
      background-color: var(--main_color) !important;
    }
  }
  background-color: #1e222d;
  .aside_title {
    display: flex;
    img {
      height: 42px;
      margin-top: 9px;
      border-radius: 50%;
      padding: 0px 10px;
    }
    .aside_title_text {
      color: white;
      height: 60px;
      text-align: center;
      line-height: 60px;
      font-size: 18px;
      font-weight: 600;
    }
  }
}
</style>
