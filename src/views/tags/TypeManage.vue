<template>
  <div>
    <Card>
      <div class="table-header">
        <span class="card-title">类型管理</span>
        <span class="total">总数：{{ tagsSize }}</span>
        <button
          style="margin-left: 20px ; padding: 5px 10px; backgroundColor: #2b85e4;color: #fff; border: none; borderRadius: 2px; cursor: pointer "
          @click="modal6 = true">
          创建新类型
        </button>
<!--        <div class="search-div">-->
<!--          <SearchBar :search="search" :tableNow="tableNow"></SearchBar>-->
<!--        </div>-->
      </div>
      <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder" :stripe="showStripe"
             :show-header="showHeader" :size="tagsSize" :data="tableData" :columns="tableColumns">
      </Table>
    </Card>
    <Page class="pager" :total="tagsSize" :page-size="pageSize" @on-change="changePage"></Page>
    <Modal
      v-model="modal6"
      title="新建类型"
      :loading="loading"
      @on-ok="addType">
      <Form :model="addForm" style="margin-left: 50px">
        <Row :gutter="16">
          <Col span="20">
            <FormItem label="类型内容" label-position="top">
              <label>
                <Input placeholder="请输入新的类型内容" v-model="addForm.typeContent"/>
              </label>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>

<script>
import PicViewer from '../../components/PicViewer'
import SearchBar from '../../components/SearchBar'
import axios from 'axios'

export default {
  name: 'TypeManage',
  components: {
    PicViewer: PicViewer,
    SearchBar: SearchBar
  },
  data() {
    return {
      addForm: {
        tagContent: '',
        typeId: '',
      },
      modal6: false,
      loading: true,
      types: [],
      typeId: '',
      showBorder: false,
      showStripe: false,
      showHeader: true,
      showIndex: true,
      showDetail: true,
      showCheckbox: true,
      tableHeight: 600,
      pageSize: 10,
      tableSize: 'default',
      page: 0,
      tagsSize: 0,
      tableData: [],
      cancel: null,
      show: false,
      tableNow: "timeNickContent",
      startTime: "1970-01-01",
      endTime: "2999-01-01",
      searchType: "",
      keyword: "",
    }
  },
  computed: {
    tableColumns() {
      let columns = [];
      if (this.showCheckbox) {
        columns.push({
          type: 'selection',
          width: 60,
          align: 'center'
        })
      }
      if (this.showIndex) {
        columns.push({
          title: '当前排名',
          type: 'index',
          align: 'center'
        })
      }
      columns.push({
        title: '类型ID',
        key: 'typeId',
      });
      columns.push({
        title: '类型内容',
        key: 'typeContent',
        align: 'center',
      });
      columns.push({
        title: '打卡总数',
        key: 'totalNum',
        align: 'center',
        sortable: true,
      });
      columns.push({
        title: '通过总数',
        key: 'passNum',
        align: 'center',
        sortable: true,
      });
      columns.push({
        title: '子标签数',
        key: 'subTagsNum',
        align: 'center',
        sortable: true,
      });
      columns.push({
        title: '操作',
        key: 'action',
        align: 'center',
        render: (h, params) => {
          return h(
            "button",
            {
              style: {
                padding: '5px 10px',
                backgroundColor: '#e83015',
                color: '#fff',
                border: 'none',
                borderRadius: '2px',
                cursor: 'pointer'
              },
              domProps: {
                innerText: '删除'
              },
              class: ['fa', 'fa-trash-o'],
              attrs: {
                userId: this.tableData[params.index].essayId,
              },
              on: {
                click: (e) => {// 点击事件， e 为事件参数
                  e.stopPropagation();
                  this.$api.tags.delType({
                    'typeId': this.tableData[params.index].typeId
                  })
                    .then(res => {
                      console.log("删除", res.data.state);
                      this.$api.tags.getAllType({
                        "page": this.page,
                        "pageSize": this.pageSize,
                      }).then((res) => {
                        this.tableData = res.data.taskTypes;
                        this.tagsSize = res.data.total;
                        console.log("this.$api.tags.getAllType", res)
                      })

                      // if (res.data.state === 'ok') this.tableData.splice(params.index, 1)
                    })
                    .catch(err => {
                      console.log(err)
                    })
                }
              }
            },
            "删除"
          );
        }
      });
      if(this.showDetail){
        columns.push({
          title: '详情',
          key: 'detail',
          align: 'center',
          render: (h, params) => {
            return h(
              "button",
              {
                style: {
                  padding: '5px 10px',
                  backgroundColor: '#2b85e4',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: 'pointer'
                },
                domProps: {
                  innerText: '详情'
                },
                class: ['fa', 'fa-caret-right'],
                attrs: {
                  typeId: this.tableData[params.index].typeId,
                },
                on: {
                  click: (e) => {// 点击事件， e 为事件参数
                    e.stopPropagation();
                    console.log("goto type detail", this.tableData[params.index].typeId)
                    this.$router.push(`/tags/type/id=${this.tableData[params.index].typeId}`);
                  }
                }
              },
              "详情"
            );
          }
        });
      }

      return columns;
    },
  },
  beforeMount: function () {
    if (localStorage.essays === 'false') {
      this.$router.push(`/404`)
    }
    this.$api.tags.getAllType({
      "page": this.page,
      "pageSize": this.pageSize,
    }).then((res) => {
        this.tableData = res.data.taskTypes;
        this.tagsSize = res.data.total;
        console.log("this.$api.tags.getAllType", res)
      })
  },
  mounted() {
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 125;
  },
  methods: {
    changePage(e) {
      this.page = e;
      this.$api.tags.getAllType({
        "page": this.page,
        "pageSize": this.pageSize,
      }).then((res) => {
        this.tableData = res.data.taskTypes;
        this.tagsSize = res.data.total;
        console.log("this.$api.tags.getAllType", res)
      })
    },
    addType() {
      let that = this
      this.$api.tags.addType({
        typeContent: that.addForm.typeContent,
      }).then(res => {
        if (res.status === 200) {
          that.modal6 = false
          that.addForm.resetFields
          console.log(res)

          this.$api.tags.getAllType({
            "page": this.page,
            "pageSize": this.pageSize,
          }).then((res) => {
            this.tableData = res.data.taskTypes;
            this.tagsSize = res.data.total;
            console.log("this.$api.tags.getAllType", res)
          })
          // that.$api.tags.getSortedTags()
          //   .then((res) => {
          //     that.tableData = res.data.sortedTagList;
          //     that.tagsSize = that.tableData.length;
          //   })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.table-header {
  margin-bottom: 10px;
  display: flex;
  align-items: flex-end;
}

.search-div {
  flex-grow: 5;
  display: flex;
  justify-content: flex-end;
}

.table {
  margin: auto 0;
  height: 100%;
}

.pager {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 5px auto;
}

.card-title {
  font-weight: 600;
  color: #333;
  font-size: 20px;
  margin-right: 10px;
}
</style>
