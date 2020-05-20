<template>
  <el-dialog :visible.sync="dialogVisible" width="40%" center>
    <div slot="title">注册</div>
    <el-form label-width="100px" :model="registerForm" :rules="rules" ref="registerForm">
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          name="image"
          :action="uploadURL"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageURL" :src="imageURL" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="registerForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerForm.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="registerForm.password"   show-password></el-input>
      </el-form-item>
      <el-form-item label="图形码" prop="code">
        <el-row :gutter="10">
          <el-col :span="16">
            <el-input v-model="registerForm.code"></el-input>
          </el-col>
          <el-col :span="7">
            <img :src="codeURL" @click="getpic" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="rcode">
        <el-row :gutter="10">
          <el-col :span="16">
            <el-input v-model.number="registerForm.rcode"></el-input>
          </el-col>
          <el-col :span="7">
            <el-button @click="goCode">获取验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible= false">取消</el-button>
      <el-button @click="zhuce" type="primary">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      //上传地址
      uploadURL: process.env.VUE_APP_BASEURL + "/uploads",
      codeURL: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",
      imageURL: "",
      dialogVisible: false,
      registerForm: {
        username: "",
        phone: "",
        email: "",
        avatar: "",
        password: "",
        code: "",
        rcode: ""
      },
      rules: {
        avatar: [{ required: true, message: "请添加头像", trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              const reg = /^1[3546789][0-9]{9}$/;
              if (!reg.test(value)) {
                callback(new Error("手机号不合法"));
                return;
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        email: [
          {
            validator: (rule, value, callback) => {
              const reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;
              if (!reg.test(value)) {
                callback(new Error("邮箱不合法"));
                return;
              }
              callback();
            },
            trigger: "blur",
            required: true
          },
          { required: true, message: "请输入邮箱", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码不能少于6位", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入图形码", trigger: "blur" },
          { min: 4, max: 4, message: "图形码必须为4位", trigger: "blur" }
        ],
        rcode: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("验证码不能为空"));
                return;
              }
              if (!Number.isInteger(value)) {
                callback(new Error("验证码必须是数字"));
                return;
              }
              if (!value.length == 4) {
                callback(new Error("验证码必须是4位"));
                return;
              }
              callback();
            }
          }
        ]
      }
    };
  },
  methods: {
    zhuce() {
      
      this.$refs.registerForm.validate(async valid => {
        if (!valid) {
            return ;
        } else {
            const res = await this.$axios.post("/register", this.registerForm);
          if (res.data.code == 200) {
              this.$message({
              message: '注册成功',
              type:'success'
            });
            this.dialogVisible = false;
          }else{
            this.$message.error(res.data.message)
          }
        }
      });
    },
    async goCode() {
      const res = await this.$axios.post("/sendsms", {
        code: this.registerForm.code,
        phone: this.registerForm.phone
      });

      if (res.data.code == 200) {
        this.registerForm.rcode = res.data.data.captcha;
      }
    },
    getpic() {
      this.codeURL =
        process.env.VUE_APP_BASEURL +
        "/captcha?type=sendsms&r=" +
        Math.random();
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res) {
      if (res.code == 200) {
        this.imageURL = process.env.VUE_APP_BASEURL + "/" + res.data.file_path;
        this.registerForm.avatar = res.data.file_path;
      } else {
        this.$message({
          message: res.message
        });
      }
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>