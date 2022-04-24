<template>
  <div class="herder_left">
    <a href="javascript:;">
      <div class="herder_icon">
        <el-icon :size="18">
          <fold />
        </el-icon>
      </div>
    </a>
    <a href="javascript:;">
      <div class="herder_icon">
        <el-icon :size="18">
          <refresh-right />
        </el-icon>
      </div>
    </a>
    <div class="herder_left_item">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>{{find_p_route($route.path)}}</el-breadcrumb-item> -->
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
  <div class="herder_right">
    <a href="javascript:;">
      <div class="herder_icon">
        <el-icon :size="18">
          <full-screen />
        </el-icon>
      </div>
    </a>
    <a href="javascript:;">
      <div class="herder_icon">
        <el-icon :size="18">
          <bell />
        </el-icon>
      </div>
    </a>

    <el-dropdown>
      <a href="javascript:;">
        <div class="username_box">
          <img src="http://img.mp.itc.cn/upload/20170808/5861bc790e654d56bc9289c567b44875_th.jpg" alt="" />
          <span class="el-dropdown-link">
            admin
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
        </div>
      </a>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="User">个人中心</el-dropdown-item>
          <el-dropdown-item icon="Lock">修改密码</el-dropdown-item>
          <el-dropdown-item icon="SwitchButton" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script   >

export default {
  name: 'herder',
  methods: {
    // find 上一级路由
    find_p_route (path) {
      let routes = this.$router.routes_data
      let route = routes.filter(route => route.path == path)[0]
      let p_route = routes.filter(item => item.id == route.parentId)[0]
      return p_route.meta.title
    }
  }
}
</script>

<style lang="less">
#herder {
  height: 60px;
  --el-header-padding: 0 10px !important;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f6f6f6;
  .herder_left {
    display: flex;
    .herder_left_item {
      padding: 0px 10px;
      line-height: 60px;
    }
    .el-breadcrumb {
      line-height: 60px;
    }
  }
  .herder_right {
    display: flex;
    .username_box {
      line-height: 60px;
      display: flex;
      color: var(--el-text-color-primary);
      padding: 0px 10px;
      img {
        margin-top: 10px;
        border-radius: 50%;
        height: 35px;
        display: block;
      }
      span {
        padding: 0px 4px;
      }
    }
    .username_box:hover {
      background-color: white;
    }
  }
  .herder_icon {
    padding: 0px 15px;
    line-height: 60px;
    padding-top: 4px;
    overflow: hidden;
    color: var(--el-text-color-regular);
  }
}
</style>
