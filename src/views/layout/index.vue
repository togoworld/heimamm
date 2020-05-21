<template>
  <el-container>
    <el-header>
      <div class="left" style="float:left">
        <img :src="touxiang"  @click="isCollapse =!isCollapse"  />
        黑马面面
      </div>
      <div class="right" style="float:left;margin-left:1200px">
        <img :src="touxiang" alt style="width:43px;height:43px" />
        <span style="height:15px;width:63px">{{username}}</span>
        <el-button style="margin-left:10px" type="primary" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <el-menu
        router
        :collapse="isCollapse"
          default-active="/layout/chart"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-menu-item index="/layout/chart">
           
              <i class="el-icon-location"></i>
              <span slot="title">数据概览</span>
           
          </el-menu-item>

           <el-menu-item index="/layout/user">
          
              <i class="el-icon-location"></i>
              <span slot="title">用户列表</span>
            
          </el-menu-item>

           <el-menu-item index="/layout/question">
            
              <i class="el-icon-location"></i>
              <span slot="title">题库列表</span>
            
          </el-menu-item>

           <el-menu-item index="/layout/enterprise">
            
              <i class="el-icon-location"></i>
              <span slot="title">企业列表</span>
            
          </el-menu-item>
          <el-menu-item index="/layout/subject">
            
              <i class="el-icon-location"></i>
              <span slot="title">学科列表</span>
           
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {removeToken} from '@/utils/token.js'
import router from '@/router'
export default {
  data() {
    return {
      touxiang: "",
      username: "",
      isCollapse: false
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
   async logout(){
      const res = await this.$axios.get('/logout')
        if(res.data.code==200){
          this.$message({
            message:'退出成功',
            type:'success'
          })

            removeToken();
            this.$router.push('/login')
        }
    },
    async getInfo() {
      const res = await this.$axios.get("Info");

      if (res.data.code === 200) {
        this.touxiang =
          process.env.VUE_APP_BASEURL + "/" + res.data.data.avatar;
        this.username = res.data.data.username;
      }
    },
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    

  }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>