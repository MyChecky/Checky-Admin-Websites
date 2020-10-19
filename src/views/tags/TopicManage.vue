<template>
  <div>
    <Card>
      <div class="table-header">
        <span class="card-title">话题管理</span>
        <span class="total">总数：{{ tagsSize }}</span>
        <button
          style="margin-left: 20px ; padding: 5px 10px; backgroundColor: #2b85e4;color: #fff; border: none; borderRadius: 2px; cursor: pointer "
          @click="modal6=true">
          添加话题
        </button>
        <div class="search-div">
          <SearchBar :search="search" :tableNow="tableNow"></SearchBar>
        </div>
      </div>
      <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder" :stripe="showStripe"
             :show-header="showHeader" :size="tableSize" :data="tableData" :columns="tableColumns"></Table>
    </Card>
    <Page class="pager" :total="tagsSize" :page-size="pageSize" @on-change="changePage"></Page>
    <Modal
      v-model="modal6"
      title="新建话题"
      :loading="loading"
      @on-ok="addTag">
      <Form :model="addForm">
        <Row :gutter="16">
          <Col span="20">
            <FormItem label="话题引领新动态" label-position="top">
              <label>
                <Input placeholder="在这里开启新的话题" v-model="addForm.topicContent"/>
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
import {base} from '../../utils/axios'

export default {
  name: 'TopicManage',
  components: {
    PicViewer: PicViewer,
    SearchBar: SearchBar
  },
  data() {
    return {
      addForm: {
        topicContent: '',
        typeId: '',
      },
      types: [],
      modal6: false,
      loading: true,
      showBorder: false,
      showStripe: false,
      showHeader: true,
      showIndex: true,
      showCheckbox: true,
      fixedHeader: false,
      tableHeight: 600,
      pageSize: 10,
      tableSize: 'default',
      page: 0,
      tagsSize: 0,
      tableData: [],
      cancel: null,
      baseURL: base + '/',
      show: false,
      picList: [],
      index: 0,
      imgUrl: '',
      showItem: {
        imgShow: false,
        audioShow: false,
        videoShow: false,
      },

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
        title: '话题ID',
        key: 'topicId',
      });
      columns.push({
        title: '话题内容',
        key: 'topicContent',
        align: 'center',
      });
      columns.push({
        title: '讨论数量',
        key: 'topicCount',
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
                  this.$api.tags.delTopic({
                    'topicId': this.tableData[params.index].topicId
                  })
                    .then(res => {
                      console.log("删除", res.data.state);
                      if (res.data.state === 'ok') this.tableData.splice(params.index, 1)
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
      return columns;
    },
  },
  beforeMount: function () {
    if (localStorage.essays === 'false') {
      this.$router.push(`/404`)
    }
    this.$api.tags.getSortedTopics({
      "page": this.page,
      "pageSize": this.pageSize,
    }).then((res) => {
        this.tableData = res.data.sortedTopicList;
        this.tagsSize = this.tableData.length;
        console.log(res.data);
      })
    this.$api.tags.getAllType()
      .then(res => {
        this.types = res.data
      })
  },
  mounted() {
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 125;
  },
  methods: {
    // detail(index){
    //   console.log(this.tableData.indexOf(index));
    // }
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
      this.$api.tags.getSortedTopics({
        "page": this.page,
        "pageSize": this.pageSize,
      }).then((res) => {
        this.tableData = res.data.sortedTopicList;
        this.tagsSize = this.tableData.length;
        console.log(res.data);
      })
    },
    addTag() {
      let that = this
      this.$api.tags.addTopic({
        topicContent: that.addForm.topicContent,
      }).then(res => {
        if (res.status === 200) {
          that.modal6 = false
          that.addForm.resetFields
          console.log(res)
          that.$api.tags.getSortedTopics()
            .then((res) => {
              that.tableData = res.data.sortedTopicList;
              that.tagsSize = that.tableData.length;
            })
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
  margin: auto 0px;
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

.pic-container {
}

.cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(100, 100, 100, 0.2);
}

.button-bar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.turn-button {
  border: none;
  padding: 2px 10px;
  background-color: #fff;
  color: dodgerblue;
  font-size: 20px;
  cursor: pointer;
  margin: 2px 5px;
  border-radius: 5px;
}

.turn-button:hover {
  background-color: dodgerblue;
  color: #fff;
}

.pics {
  margin-bottom: 2px;
}

.pic-img {
  max-width: 300px;
  max-height: 400px;
  background-size: cover;
}

.pic-video {
  max-width: 450px;
  max-height: 600px;
  background-size: cover;
}
</style>
