<template>
  <div>
    <Card>
      <div class="table-header">
        <span class="card-title">标签管理</span>
        <span class="total">总数：{{ tagsSize }}</span>
        <button
          style="margin-left: 20px ; padding: 5px 10px; backgroundColor: #2b85e4;color: #fff; border: none; borderRadius: 2px; cursor: pointer "
          @click="modal6 = true">
          添加标签
        </button>
<!--        <div class="search-div">-->
<!--          <SearchBar :search="search" :tableNow="tableNow"></SearchBar>-->
<!--        </div>-->
      </div>
      <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder" :stripe="showStripe"
             :show-header="showHeader" :size="tableSize" :data="tableData" :columns="tableColumns"></Table>
    </Card>
    <Page class="pager" :total="tagsSize" :page-size="pageSize" @on-change="changePage"></Page>
    <Modal
      v-model="modal6"
      title="新建标签"
      :loading="loading"
      @on-ok="addTag">
      <Form :model="addForm" style="margin-left: 50px">
        <Row :gutter="16">
          <Col span="20">
            <FormItem label="标签内容" label-position="top">
              <label>
                <Input placeholder="请输入新的标签内容" v-model="addForm.tagContent"/>
              </label>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="20">
            <FormItem label="关联类型" label-position="top">
              <label>
                <Select v-model="addForm.typeId">
                  <Option v-for="(item,index) in types" :value="item.typeId" :key="index">{{ item.typeContent }}</Option>
                </Select>
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
  name: 'TagManage',
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
      showDetail: false,
      showCheckbox: true,
      tableHeight: 600,
      pageSize: 10,
      tableSize: 'default',
      page: 1,
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
        title: '标签ID',
        key: 'tagId',
      });
      columns.push({
        title: '标签内容',
        key: 'tagContent',
        align: 'center',
      });
      columns.push({
        title: '打卡总数',
        key: 'tagCount',
        align: 'center',
        sortable: true,
      });
      columns.push({
        title: '通过总数',
        key: 'passCount',
        align: 'center',
        sortable: true,
      });
      columns.push({
        title: '所属类型',
        key: 'tagBelongedTypes',
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
                  this.$api.tags.delTag({
                    'tagId': this.tableData[params.index].tagId
                  })
                    .then(res => {
                      console.log("删除", res.data.state);
                      this.$api.tags.getSortedTags({
                        "page": this.page,
                        "pageSize": this.pageSize,
                      }).then((res) => {
                        this.tableData = res.data.sortedTagList;
                        this.tagsSize = res.data.total;
                      })

                      // if (res.data.state === 'ok') this.tableData.splice(params.index, 1)
                    })
                    .catch(err => {
                      console.log("删除失败", err)
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
                  userId: this.tableData[params.index].essayId,
                },
                on: {
                  click: (e) => {// 点击事件， e 为事件参数
                    e.stopPropagation();
                    // this.$router.push(`/essays/id=${this.tableData[params.index].essayId}`);
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
    this.$api.tags.getSortedTags({
      "page": this.page,
      "pageSize": this.pageSize,
    }).then((res) => {
        this.tableData = res.data.sortedTagList;
        this.tagsSize = res.data.total;
      })
    this.$api.tags.getAllTypeWithoutPage().then(res => {
        console.log("getAllTypeWithoutPage", res.data.taskTypes);
        this.types = res.data.taskTypes;
      })
  },
  mounted() {
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 125;
  },
  methods: {
    search: function (startTime, endTime, keyword, searchType, page) {
      this.startTime = startTime;
      this.endTime = endTime;
      this.searchType = searchType;
      this.page = page;
      this.keyword = keyword;
      // 解决异步问题
      if (this.cancel) {// 存在上一次请求则取消
        this.cancel();
      }
      console.log(`搜索${this.keyword},页码${this.page}`);
      // 定义CancelToken，它是axios的一个属性，且是一个构造函数
      let CancelToken = axios.CancelToken;

      this.$api.essays.queryByKeyword({
        startTime: this.startTime, endTime: this.endTime, searchType: this.searchType,
        keyword: this.keyword, page: this.page, pageSize: this.pageSize
      }, new CancelToken((c) => {
        this.cancel = c;
      }))
        .then(res => {
          console.log(res);
          this.tableData = res.data.essays;
          this.tagsSize = res.data.total;
        })
        .catch(err => {
          console.log(err)
        })
    },
    changePage(e) {
      this.page = e;

      this.$api.tags.getSortedTags({
        "page": this.page,
        "pageSize": this.pageSize,
      }).then((res) => {
        this.tableData = res.data.sortedTagList;
        this.tagsSize = res.data.total;
      })
    },
    addTag() {
      let that = this
      this.$api.tags.addTag({
        tagContent: that.addForm.tagContent,
        typeId: that.addForm.typeId
      }).then(res => {
        if (res.status === 200) {
          that.modal6 = false
          that.addForm.resetFields
          console.log("addTagRes", res);

          this.$api.tags.getSortedTags({
            "page": this.page,
            "pageSize": this.pageSize,
          }).then((res) => {
            this.tableData = res.data.sortedTagList;
            this.tagsSize = res.data.total;
          })

        }
      }).catch(err => {
        console.log("addTagErr", err)
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
