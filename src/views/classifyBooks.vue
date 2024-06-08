<script>
export default {
  mounted() {
    // 添加点击事件监听
    document.querySelector('.windowsA').addEventListener('click', this.goToCategoryA);
    document.querySelector('.windowsB').addEventListener('click', this.goToCategoryB);
    document.querySelector('.windowsC').addEventListener('click', this.goToCategoryC);
  },
  beforeUnmount() {
    // 在组件卸载前移除点击事件监听
    document.querySelector('.windowsA').removeEventListener('click', this.goToCategoryA);
    document.querySelector('.windowsB').removeEventListener('click', this.goToCategoryB);
    document.querySelector('.windowsC').removeEventListener('click', this.goToCategoryC);
  },
  methods: {
    goToCategoryA() {
      this.$router.push('/A');
    },
    goToCategoryB() {
      this.$router.push('/B');
    },
    goToCategoryC() {
      this.$router.push('/C');
    },
  }

};
</script>

<template>
  <div>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>书籍借阅管理</el-breadcrumb-item>
      <el-breadcrumb-item>书籍分类管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
<div class="container">
  <div class="windows-box" style="background-color: #a0cfff">
    <div class="windowsA" style="background-color: #79bbff">
      <h1>A</h1>
      <p style="font-size: 50px">区</p>
    </div>
    <div class="a">
      <p>#科幻</p>
      <p>#文学</p>
    </div>
  </div>
  <div class="windows-box" style="background-color: #b3e19d">
    <div class="windowsB" style="background-color: #95d475">
      <h1>B</h1>
      <p style="font-size: 50px">区</p>
    </div>
    <div class="a">
      <p>#教育</p>
      <p>#科学</p>
    </div>
  </div>
  <div class="windows-box" style="background-color: #f3d19e">
    <div class="windowsC" style="background-color: #eebe77">
      <h1>C</h1>
      <p style="font-size: 50px">区</p>
    </div>
    <div class="a">
      <p>#哲学</p>
      <p>#历史</p>
    </div>
  </div>
</div>
</template>

<style scoped>
.container{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.windows-box{
  width: 250px;
  height: 300px;
}
.windowsA{
  width: 250px;
  height: 250px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.windowsB{
  width: 250px;
  height: 250px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.windowsC{
  width: 250px;
  height: 250px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
h1{
  font-size: 90px;
}

.a{
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
}
</style>