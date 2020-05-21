<template>
  <div class="login-container">
    <div class="left">
      <div class="title-box">
        <img src="@/assets/login_icon.png" alt />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- form表单部分 -->
      <!-- 规则和数据 -->
      <el-form class="login-form" :model="ruleForm" :rules="rules" ref="loginfromRef">
        <el-form-item prop="phone">
          <el-input prefix-icon="el-icon-user" placeholder="请输入手机号" v-model="ruleForm.phone"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-row :gutter="18">
            <el-col :span="16">
              <el-input prefix-icon="el-icon-key" placeholder="请输入验证码" v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="captcha" @click="getC" :src="codeURL" />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="ischeck">
          <el-checkbox v-model="ruleForm.ischeck"></el-checkbox>我已阅读并同意
          <el-link type="primary" href="http://www.baidu.com">用户协议</el-link>和
          <el-link type="primary" href="http://www.baidu.com">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="gologin">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="goRegiter">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/login_bg.png" alt />
    </div>
     <regiter ref="regiterRef"></regiter>
  </div>
 
</template>

<script>
import regiter from './regiter.vue'
import {setToken} from '@/utils/token.js'
export default {
  components:{
    regiter
  },
  data() {
    return {
      name: 'login',
      ruleForm: {
        phone: "18511111111",
        password: "12345678",
        code: "",
        ischeck: true
      },
      rules: {
        phone: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("请输入手机号"));
              }
              let reg = /^[1][3456789][0-9]{9}$/;
              if (!reg.test(value)) {
                return callback(new Error("输入的手机号不合法"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "必须输入验证码", trigger: "blur" },
          {
            min: 4,
            max: 4,
            message: "长度必须是4位",
            trigger: "blur"
          }
        ],
        ischeck: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                console.log(value);
                return callback(new Error("请勾选用户协议"));
              }
              callback();
            },
            trigger: "change"
          }
        ]
      },
      codeURL: process.env.VUE_APP_BASEURL + "/captcha?type=login"
    };
  },
  methods: {
    goRegiter(){
      this.$refs.regiterRef.dialogVisible=true;
    },
    getC() {
      this.codeURL =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&r=" + Math.random();
      console.log(this.codeURL);
    },
    gologin() {
      //校验form表单
      this.$refs.loginfromRef.validate(async valid => {
        if (!valid) return;

        const res = await this.$axios.post('/login',this.ruleForm);
          if(res.data.code===200){
             this.$message({
          message: '登录成功',
          type: 'success'
        });
          setToken(res.data.data.token)
          
          this.$router.push('/layout')
          }else{
            
          this.$message.error(res.data.message)
          this.codeURL=
        process.env.VUE_APP_BASEURL + "/captcha?type=login&r=" + Math.random();
          }

        });
      }
    }
  }

</script>

<style lang="less">
.login-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(225deg, #1493fa, #01c6fa);
  .left {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding: 48px;
    margin-left: 73px;
    margin-top: 119px;
    .title-box {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        background-color: #c7c7c7;
        height: 27px;
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
      }
    }
    .login-form {
      margin-top: 29px;
      .captcha {
        width: 100%;
        height: 40px;
      }
    }
  }
}
</style>