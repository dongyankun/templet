<template>
<div>
  <!-- 头部按钮 -->
  <div class="headerBtn">
    <div class="headerBtnLeft">
      <el-button @click="createNews" type="primary">添加用户权限</el-button>
    </div>
  </div>
  <!-- 表格 -->
  <el-table
    :data="websiteTableData"
    border
    stripe
    v-loading="websiteTableDataloading"
    class="websiteTable">
    <el-table-column
      prop="id"
      align="center"
      label="编号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      align="center"
      width="300">
    </el-table-column>
    
    <el-table-column
      prop="description"
      align="center"
      label="权限">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      align="center"
      width="100">
      <template slot-scope="scope">
        <el-button @click.prevent="edit(scope.row)" type="text" size="small">编辑</el-button>
        <el-button @click.prevent="deleteWebsiteTableData(scope.row.id)" type="text" size="small" style="color:#f56c6c">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
    class="mypagination"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    background
    layout="total, sizes, prev, pager, next, jumper"
    :page-sizes="[10,20,30,40,50]"
    :page-size="30"
    :total="pageTotalnum">
  </el-pagination>
  <el-dialog
      :title="updateOrAddTitle"
      :modal-append-to-body="false"
      :visible.sync="puchaDrag"
      width="50%">
      <el-form label-width="140px" class="updateCardForm">
        <el-form-item label="用户邮箱">
          <el-input v-model="updateOrAddName" type="text"></el-input>
        </el-form-item>
      </el-form>
      <el-tree
        ref="tree"
        :data="data3"
        show-checkbox
        node-key="id"
        :default-checked-keys="defaultcheckedkeys"
        accordion
        >
      </el-tree>
      <div slot="footer" class="dialog-footer">
          <el-button @click="puchaDrag=false">取 消</el-button>
          <el-button type="primary" @click="updateNowCardDatas">确认</el-button>
      </div>
    </el-dialog>
</div>
  
</template>

<script>
  export default {
    data() {
      return {
        websiteTableData: [],//表格数据
        pageTotalnum:0,//数据总数
        pageNum:1,//页码
        pageSize:30,//默认每页数据量
        typeIndex:1,//序号开始
        keyword:'',//搜索
        websiteTableDataloading:true,//表格数据展示
        defaultcheckedkeys:[],
        updateOrAddTitle:'添加用户权限信息',
        updateOrAddName:'',
        nameId:'',
        puchaDrag:false,
        data3: [{
          id: 1,
          label: '审核',
          children: [{
              id: 11,
              label: '学校数据审核',
            },{
              id: 12,
              label: '机构数据审核',
            },{
              id: 13,
              label: '人才库审核',
            },{
              id: 14,
              label: '外教黑名单审核',
            },{
              id: 15,
              label: '简历审核',
            },{
              id: 16,
              label: '招聘单位审核',
            },{
              id: 17,
              label: '项目审核',
            },{
              id: 18,
              label: '用户反馈',
            }]
        },{
          id: 2,
          label: '数据库',
          children: [{
              id: 21,
              label: '学校库',
            },{
              id: 22,
              label: '机构库',
            },{
              id: 23,
              label: '外教黑名单',
            },{
              id: 24,
              label: '人才库',
            },{
              id: 25,
              label: '项目库',
            }]
        },{
          id: 3,
          label: '人员库',
          children: [{
              id: 31,
              label: '人员库(名片)',
            },{
              id: 32,
              label: '专家库',
            }]
        },{
          id: 4,
          label: '咨询项目库(内部)',
          children: [{
              id: 41,
              label: '咨询项目库',
            },{
              id: 42,
              label: '财务回款',
            }]
        },{
          id: 5,
          label: '新学说课堂',
          children: [{
              id: 51,
              label: '课程概览',
            },{
              id: 52,
              label: '直播配置&用户信息',
            },{
              id: 53,
              label: '发布教师信息',
            },{
              id:54,
              label: '发布课程基本信息',
            },{
              id: 55,
              label: '发布课程详细信息',
            },{
              id: 56,
              label: '作业管理',
            },{
              id: 57,
              label: '评论管理',
            }]
        },{
          id: 8,
          label: '新学说课堂(录播)',
          children: [{
              id: 81,
              label: '课程管理',
            },{
              id: 82,
              label: '子课程管理',
            }]
        },{
          id: 6,
          label: '签到',
          children: [{
              id: 61,
              label: '签到管理',
            }]
        },{
          id: 7,
          label: '其他',
          children: [{
              id: 71,
              label: '服务器log',
            },{
              id: 72,
              label: '权限管理',
            }]
        }],
      }
    },
    methods:{
      //获取表格数据
      getWebsiteTable(){
        var that=this
        this.websiteTableDataloading=true
        let url=this.baseUrl + "/manager/role/list.do"+"?pageNum="+this.pageNum+"&pageSize="+this.pageSize
        this.$axios.get(url).then(function(response){
          that.pageTotalnum=response.data.data.total
          that.websiteTableData=response.data.data.list
          let websiteTableDataLength=that.websiteTableData.length
          let flagNum=0
          that.websiteTableDataloading=false
        }).catch(function (response){
          that.websiteTableDataloading=false
          that.$message({
            message: '数据请求失败',
            type: 'error'
          });
        });
      },
      updateNowCardDatas(){
        var that=this
        let CheckedKeys=this.$refs.tree.getCheckedKeys()
        let url=that.baseUrl + "/manager/role/add.do"
        var formData =new URLSearchParams();
        if(that.nameId==''){
          url=that.baseUrl + "/manager/role/add.do"
        }else{
          url=that.baseUrl + "/manager/role/modify.do"
          formData.append('id',that.nameId );
        }
        formData.append('name',that.updateOrAddName );
        formData.append("description", CheckedKeys.join(','));
        that.$axios.post(url,formData).then(function(response){
         if(response.data.code==0){
            that.$message({
              message: response.data.data,
              type: 'sucess'
            });
         }else{
            that.$message({
              message: response.data.data,
              type: 'error'
            });
         }
         that.puchaDrag=false
         that.getWebsiteTable()
        }).catch(function (response){
          that.puchaDrag=false
          that.$message({
            message: '请求接口失败',
            type: 'error'
          });
        });
      },
      //页码改变
      handleCurrentChange(num){
        this.pageNum=num
        this.getWebsiteTable()
      },
      //一页数据量改变
      handleSizeChange(num){ 
        this.pageSize=num
        this.getWebsiteTable()
      },
      //编辑用户权限
      edit(scopeRow){
        console.log(scopeRow)
        this.updateOrAddTitle='修改 '+scopeRow.name+' 用户的权限信息'
        this.nameId=scopeRow.id
        this.updateOrAddName=scopeRow.name

        this.defaultcheckedkeys=scopeRow.description.split(',')

        this.puchaDrag=true
        this.$refs.tree.setCheckedKeys(this.defaultcheckedkeys,false)
        console.log(this.defaultcheckedkeys)
      },
      //删除用户权限
      deleteWebsiteTableData(articleId){
        var that=this
        that.$confirm('此操作将删除该用户所有权限,且无法恢复, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          let url=that.baseUrl + "/manager/role/del.do"+"?roleId="+articleId
          that.$axios.get(url).then(function(response){
            if(response.data.code==0){
              that.$message({
                message: '删除成功',
                type: 'sucess'
              });
            }else{
              that.$message({
                message: '删除失败',
                type: 'error'
              });
            }
            that.getWebsiteTable()
          }).catch(function (response){
            that.$message({
              message: '数据请求失败',
              type: 'error'
            });
          });
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      //添加用户权限
      createNews(){
        //this.$refs.tree.getCheckedKeys()
        
        this.updateOrAddName=''
        this.nameId=''
        this.updateOrAddTitle='添加用户权限信息'
        this.puchaDrag=true
        this.$refs.tree.setCheckedKeys([],false)
      },

    },
    created(){
      //初始化表格数据
      this.getWebsiteTable()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.mypagination {
  text-align: center;
}
.headerBtn{
  margin-bottom: 20px;
}
</style>
