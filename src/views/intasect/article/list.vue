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

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.gmtCreate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="Author">
        <template slot-scope="scope">
          <span>{{ scope.row.gmtCreateUser }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="Importance">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.contentType | statusFilter">
            {{ row.contentType }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="Title">
        <template slot-scope="{row}">
          <router-link :to="{path: '/intasect/message/update', query: {id: row.id }}"  class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

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
          type="danger"
          icon="el-icon-delete"
          size="mini"
          circle
          plain
          @click.stop="handleDelete(scope.row)"
        />
      </template>
    </el-table-column>

      <!-- <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <router-link :to="{path: '/intasect/message/update', query: {id: scope.row.id }}" >
            <el-button type="primary" size="small" icon="el-icon-edit">
              Edit
            </el-button>
          </router-link>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            circle
            plain
            @click.stop="handleDelete(scope.row)"
          />
        </template>
      </el-table-column> -->
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import {page as fetchPage} from '@/api/intasect/message'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      queryParams: {
        title: undefined,
        disableFlag: undefined
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchPage(this.listQuery).then(response => {
        this.list = response.data.rows
        this.total = response.data.records
        this.listLoading = false
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
      // 跳转
      this.$router.push('/intasect/message/create');
    },
    async handleUpdate(row) {
      var _json = {"id":row.id}
      // 跳转
      this.$router.push({
        path: '/intasect/message/update',
        query: _json
      });
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

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
