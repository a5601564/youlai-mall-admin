<template>
  <div class="app-container">
    <el-form ref="queryForm" size="small" :inline="true" :model="queryParams">
      <el-form-item>
        <el-button icon="el-icon-plus" type="success" @click="handleAdd">新增</el-button>
      </el-form-item>

      <el-form-item>
        <el-input
          v-model="queryParams.title"
          placeholder="标题"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
<!--         
        <el-input
          v-model="queryParams.caller"
          placeholder="标题"
          clearable
          @keyup.enter.native="handleQuery"
        /> -->
      </el-form-item>
      <el-form-item>
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleQuery"
        >搜索
        </el-button>
        <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      :data="pageList"
      row-key="id"
      default-expand-all
      border
    >
      <el-table-column prop="title" label="标题"/>
      <el-table-column prop="gmtCreate" label="公开日" width="200"/>
      <el-table-column prop="gmtCreateUser" label="负责人" width="200"/>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            circle
            plain
            @click.stop="handleUpdate(scope.row)"
          />
          <el-button
            type="success"
            icon="el-icon-plus"
            size="mini"
            circle
            plain
            @click.stop="handleAdd(scope.row)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            circle
            plain
            @click.stop="handleDelete(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改公告对话框 -->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      width="600px"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题"/>
        </el-form-item>

        <el-form-item label="公告状态">
          <el-radio-group v-model="form.disable">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="dialog.visible=false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {list, detail, update, add, del} from '@/api/intasect/message'

  export default {
    data() {
      return {
        loading: true,
        pageList: [],
        deptOptions: [],
        queryParams: {
          title: undefined,
          disableFlag: undefined
        },
        dialog: {
          title: undefined,
          visible: false
        },
        form: {
          title: undefined,
          gmtCreate: 1,
          gmtCreateUser: undefined,
          disableFlag: 1
        },
        rules: {
          title: [
            {required: true, message: '公告名称不能为空', trigger: 'blur'}
          ],
        }
      }
    },
    created() {
      this.handleQuery()
    },
    methods: {
      handleQuery() {
        this.queryParams.queryMode = 'list'
        list(this.queryParams).then(response => {
          this.pageList = response.data
          this.loading = false
        })
      },
      handleReset() {
        this.queryParams = {
          title: undefined,
          disableFlag: undefined
        }
        this.handleQuery()
      },
      async handleAdd(row) {
        this.resetForm()
        this.dialog = {
          title: '新增公告',
          visible: true
        }
      },
      async handleUpdate(row) {
        this.resetForm()
        this.dialog = {
          title: '修改公告',
          visible: true
        }
        detail(row.id).then(response => {
          this.form = response.data
        })
      },
      handleSubmit: function () {
        this.$refs['form'].validate(valid => {
          if (valid) {
            const id = this.form.id
            console.log(this.form)
            if (id != undefined) {
              update(id, this.form).then(() => {
                this.$message.success('修改成功')
                this.dialog.visible = false
                this.handleQuery()
              })
            } else {
              add(this.form).then(() => {
                this.$message.success('新增成功')
                this.dialog.visible = false
                this.handleQuery()
              })
            }
          }
        })
      },
      handleDelete(row) {
        const ids = [row.id || this.ids].join(',')
        this.$confirm('确认删除已选中的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          del(ids).then(() => {
            this.$message.success('删除成功')
            this.handleQuery()
          })
        }).catch(() =>
          this.$message.info('已取消删除')
        )
      },
      resetForm() {
        this.form = {
          title: undefined,
        }
        if (this.$refs['form']) {
          this.$refs['form'].resetFields()
        }
      },
    }
  }
</script>
