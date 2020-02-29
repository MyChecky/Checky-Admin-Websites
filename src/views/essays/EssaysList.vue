<template>
  <div>
    <Card>
      <div class="table-header">
        <span class="card-title">动态列表</span>
        <span class="total">总数：{{essaysSize}}</span>
        <div class="search-div">
          <SearchBar :search="search"></SearchBar>
        </div>
      </div>
      <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder" :stripe="showStripe"
             :show-header="showHeader" :size="tableSize" :data="tableData" :columns="tableColumns"></Table>
    </Card>
    <Page class="pager" :total="essaysSize" :page-size="pageSize" @on-change="changePage"></Page>
    <div class="pic-container" v-if="show" >
      <div class="cover" @click="showing"></div>
      <div :class="['outer-div',]">
        <div class="pics">
          <img :src="this.imgUrl" alt="pic" class="pic-img" v-if="this.showItem.imgShow">
          <audio :src="this.imgUrl" controls="controls" alt="audio" class="pic-audio" v-if="this.showItem.audioShow"></audio>
          <video :src="this.imgUrl" controls="controls" alt="video" class="pic-video" v-if="this.showItem.videoShow"></video>
        </div>
        <div class="button-bar">
          <button class="turn-button fa fa-angle-left" @click="last"></button>
          <span class="index-tag">附件 {{this.index+1}}</span>
          <button class="turn-button fa fa-angle-right" @click="next"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../utils/api'
  import PicViewer from '../../components/PicViewer'
  import SearchBar from '../../components/SearchBar'
  import axios from 'axios'
  import {base} from '../../utils/axios'

  export default {
    components: {
      PicViewer: PicViewer,
      SearchBar: SearchBar
    },
    data() {
      return {
        showBorder: false,
        showStripe: false,
        showHeader: true,
        showIndex: false,
        showCheckbox: true,
        fixedHeader: false,
        tableHeight: 600,
        pageSize: 10,
        tableSize: 'default',
        page: 0,
        essaysSize: 0,
        tableData: [],
        cancel: null,
        kw: "",
        baseURL: base + '/',
        show: false,
        picList: [],
        index: 0,
        imgUrl: '',
        showItem: {
          imgShow: false,
          audioShow: false,
          videoShow: false,
        }
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
            type: 'index',
            width: 60,
            align: 'center'
          })
        }
        columns.push({
          title: '动态ID',
          key: 'essayId',
          width: 200
        });
        columns.push({
          title: '用户昵称',
          key: 'userName',
        });
        columns.push({
          title: '文本',
          key: 'essayContent',
          width: 250,
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                },
                domProps: {
                  title: this.tableData[params.index].essayContent
                }
              }, this.tableData[params.index].essayContent)
            ]);

          }

        });
        columns.push({
          title: '时间',
          key: 'essayTime',
          sortable: true,
          width: 200
        });
        columns.push({
          title: '附件',
          key: 'img',
          render: (h, params) => {
            return h(
              "button", {
                attrs: {
                  picList: params.row.img
                },
                style: {
                  border: "none",
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                  color: 'dodgerblue',
                  cursor: 'pointer',
                },
                domProps: {
                  innerText: '预览'
                },
                on: {
                  click: (e) => {
                    this.index = 0; //index置0
                    this.show = true;
                    this.picList = params.row.img;
                    console.log("picList", this.picList);
                    this.imgUrl = this.baseURL + this.picList[this.index].fileAddr;
                    if (this.picList[this.index].recordType === "audio") {
                      this.showItem.audioShow = true;
                    } else if (this.picList[this.index].recordType === "video") {
                      this.showItem.videoShow = true;
                    } else if (this.picList[this.index].recordType === "image") {
                      this.showItem.imgShow = true
                    }
                    console.log(this.showItem);

                  }

                }
              }
            )
          }
        });
        columns.push({
          title: '点赞数',
          key: 'likeNum',
        });
        columns.push({
          title: '评论数',
          key: 'commentNum',
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
                    this.$api.essays.deleteById({
                      essayId: this.tableData[params.index].essayId
                    })
                      .then(res => {
                        console.log("删除", res.data.state)
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
        return columns;
      },
    },
    beforeMount: function () {
      this.$api.essays.getEssays({
        page: this.page,
        pageSize:this.pageSize
      })
        .then((res) => {
          console.log(res.data);
          this.tableData = res.data.essays;
          this.essaysSize = res.data.total;
        })
    },
    mounted() {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 125;
    },
    methods: {
      // detail(index){
      //   console.log(this.tableData.indexOf(index));
      // }
      search: function (keyword, page) {
        this.page = page;
        this.kw = keyword;
        // 解决异步问题
        if (this.cancel) {// 存在上一次请求则取消
          this.cancel();
        }
        console.log(`搜索${this.kw},页码${this.page}`);
        // 定义CancelToken，它是axios的一个属性，且是一个构造函数
        let CancelToken = axios.CancelToken;

        this.$api.essays.queryByKeyword({username: keyword}, new CancelToken((c) => {
          this.cancel = c;
        }))
          .then(res => {
            console.log(res)
            this.tableData = res.data.essays
          })
          .catch(err => {
            console.log(err)
          })
      },
      changePage(e) {
        this.page = e
        this.$api.essays.getEssays({
          page: this.page,
          pageSize:this.pageSize
        })
          .then((res) => {
            console.log(res.data)
            this.essaysSize = res.data.total
            this.tableData = res.data.essays
          })
      },
      next() {
        this.index = (this.index + 1) % this.picList.length
        this.imgUrl = this.baseURL + this.picList[this.index].fileAddr
        console.log(this.imgUrl);
      },
      last() {
        if (this.index === 0)
          this.index = this.picList.length - 1
        else
          this.index = (this.index - 1) % this.picList.length
        this.imgUrl = this.baseURL + this.picList[this.index].fileAddr
        console.log(this.imgUrl);
        if (this.picList[this.index].recordType === "audio") {
          this.showItem.audioShow = true;
        } else if (this.picList[this.index].recordType === "video") {
          this.showItem.videoShow = true;
        } else if (this.picList[this.index].recordType === "image") {
          this.showItem.imgShow = true
        }
      },
      showing() {
        this.show = false;
        this.showItem.imgShow = false;
        this.showItem.audioShow = false;
        this.showItem.videoShow = false;
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

  .pic-container{}
  .outer-div{
    position: fixed;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 2px 2px 15px 2px rgba(200, 200, 200, 0.8);
    z-index: 1001;
    padding: 5px;
    width: auto;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
