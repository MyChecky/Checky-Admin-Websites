<template>
  <div class="container">
    <div v-if="exist">
      <div class="inner-div">
        <Card>
          <span class="card-title">动态详情</span>
          <div class="inner-card">
            <!-- <Avatar :source="userInfo.userAvatar" :size="80"></Avatar> -->
            <div class="info-div">
              <span class="info-item">动态ID：{{essayInfo.essayId}}</span>
              <span class="info-item">动态内容：{{essayInfo.essayContent}}</span>
              <span class="info-item">发布时间：{{essayInfo.essayTime}}</span>
            </div>
            <!-- <Avatar :source="userInfo.userAvatar" :size="80"></Avatar> -->
            <div class="info-div">
              <span class="info-item">发布用户：{{essayInfo.userName}}</span>
              <span class="info-item">评论人数：{{essayInfo.commentNum}}</span>
              <span class="info-item">获赞数：{{essayInfo.likeNum}}</span>
            </div>
          </div>
        </Card>
      </div>
      <div class="inner-div">
        <Card class="others">
          <span class="card-title">动态列表</span>
          <Row>
            <Col span="11">
              <Card>
                <p slot="title">{{this.imgInfo[0].recordContent}} <span
                  class="info-item"> -{{imgInfo[0].recordTime}}</span></p>
                <div class="info-div">
                  <span class="info-item">动态ID：{{imgInfo[0].essayId}}</span>
                  <span class="info-item">打卡ID：{{imgInfo[0].checkId}}</span>
                  <span class="info-item">动态内容：{{imgInfo[0].recordContent}}</span>
                  <span class="info-item">发布时间：{{imgInfo[0].recordTime}}</span>
                  <span class="info-item">附件类型：{{imgInfo[0].recordType}}</span>
                  <img :src="imgInfo[0].fileAddr" alt="pic" class="pic-img">
                </div>
              </Card>
            </Col>
            <Col span="11" offset="1">
              <Card>
                <p slot="title">{{this.imgInfo[1].recordContent}} <span
                  class="info-item"> -{{imgInfo[1].recordTime}}</span></p>
                <div class="info-div">
                  <span class="info-item">动态ID：{{imgInfo[1].essayId}}</span>
                  <span class="info-item">打卡ID：{{imgInfo[1].checkId}}</span>
                  <span class="info-item">动态内容：{{imgInfo[1].recordContent}}</span>
                  <span class="info-item">发布时间：{{imgInfo[1].recordTime}}</span>
                  <span class="info-item">附件类型：{{imgInfo[1].recordType}}</span>
                  <img :src="imgInfo[1].fileAddr" alt="pic" class="pic-img">
                </div>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
      <div class="inner-div">
        <Card class="others">
          <div class="table-header">
            <span class="card-title">动态附件列表</span>
            <span class="total">总数：{{imgInfo.length}}</span>
          </div>
          <div class="task-list">
            <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder"
                   :stripe="showStripe" :show-header="showHeader" :size="imgInfo.length" :data="imgInfo"
                   :columns="img_Columns"></Table>
          </div>
        </Card>
      </div>
      <div class="inner-div">
        <Card class="others">
          <div class="table-header">
            <span class="card-title">附件列表</span>
            <span class="total">总数：{{imgInfo.length}}</span>
          </div>
          <div class="task-list">
            <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder"
                   :stripe="showStripe" :show-header="showHeader" :size="imgInfo.length" :data="imgInfo"
                   :columns="imgColumns"></Table>
          </div>
        </Card>
      </div>
      <div class="inner-div">
        <Card class="others">
          <div class="table-header">
            <span class="card-title">评论列表</span>
            <span class="total">总数：{{commentInfo.length}}</span>
          </div>
          <div class="task-list">
            <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder"
                   :stripe="showStripe" :show-header="showHeader" :size="commentInfo.length" :data="commentInfo"
                   :columns="commentsColumns"></Table>
          </div>
        </Card>
      </div>
      <div class="pic-container" v-if="show">
        <div class="cover" @click="showing"></div>
        <div :class="['outer-div',]">
          <div class="pics">
            <img :src="imgUrl" alt="pic" class="pic-img" v-if="showItem.imgShow">
            <audio :src="imgUrl" controls="controls" alt="audio" class="pic-audio" v-if="showItem.audioShow"></audio>
            <video :src="imgUrl" controls="controls" alt="video" class="pic-video" v-if="showItem.videoShow"></video>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="notice">
        <i class="fa fa-question-circle"></i>
        <span class="tag">用户不存在</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Avatar from '../../components/Avatar'
  import Credit from '../../components/Credit'
  import SearchBar from '../../components/SearchBar'
  import MoneyTag from '../../components/MoneyTag'
  import {base} from '../../utils/axios'
  import image from "../../components/image";

  export default {

    name: "EssayDetail",
    components: {
      Avatar: Avatar,
      Credit: Credit,
      image: image,
      SearchBar: SearchBar,
      MoneyTag: MoneyTag
    },
    data() {
      return {
        showBorder: false,
        showStripe: false,
        showHeader: true,
        showIndex: false,
        showCheckbox: false,
        fixedHeader: false,
        tableHeight: 400,
        pageSize: 10,
        page: 0,
        tableSize: 'default',
        exist: true,
        score: -1,
        essayInfo: [],
        commentInfo: [],
        imgInfo: [],
        show: false,
        baseURL: base + '/',
        imgUrl: '',
        showItem: {
          imgShow: false,
          audioShow: false,
          videoShow: false,
        }
      }
    },
    computed: {
      imgColumns() {
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
          title: '记录ID',
          key: 'recordId'
        });
        columns.push({
          title: '打卡ID',
          key: 'checkId'
        });
        columns.push({
          title: '附件类型',
          key: 'recordType'
        });
        columns.push({
          title: '记录内容',
          key: 'recordContent'
        });
        columns.push({
          title: '发布时间',
          key: 'recordTime',
          align: 'center',
          sortable: true
        });
        columns.push({
          title: '附件',
          key: 'img',
          render: (h, params) => {
            return h(
              "button", {
                attrs: {
                  fileAddr: this.imgInfo[params.index].fileAddr
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
                    this.show = true;
                    this.imgUrl = this.baseURL + this.imgInfo[params.index].fileAddr;
                    console.log("fileAddr", this.imgUrl);
                    if (this.imgInfo[params.index].recordType === "audio") {
                      this.showItem.audioShow = true;
                    } else if (this.imgInfo[params.index].recordType === "video") {
                      this.showItem.videoShow = true;
                    } else if (this.imgInfo[params.index].recordType === "image") {
                      this.showItem.imgShow = true
                    }
                    console.log(this.showItem);
                  }

                }
              }
            )
          }
        });
        return columns;
      },
      img_Columns() {
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
          title: '记录内容',
          key: 'recordContent'
        });
        columns.push({
          title: '发布时间',
          key: 'recordTime',
          align: 'center',
          sortable: true
        });
        columns.push({
          title: '照片',
          key: 'fileAddr',
          render: (h, params) => {
            return h(
              image,
              {
                props: {
                  source: this.imgInfo[params.index].fileAddr
                }
              }
            )
          }
        });
        return columns;
      },
      commentsColumns() {
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
          title: '评论ID',
          key: 'commentId'
        });
        columns.push({
          title: '用户ID',
          key: 'userId',
          render: (h, params) => {
            return h(
              "a",
              {
                class: ['fa'],
                attrs: {
                  userId: this.commentInfo[params.index].userId,
                },
                on: {
                  click: (e) => {// 点击事件， e 为事件参数
                    e.stopPropagation();
                    console.log(e.target.attributes.userId);
                    this.$router.push('/users/id=' + this.commentInfo[params.index].userId)
                  }
                }
              },
              this.commentInfo[params.index].userId,
            );
          }
        });
        columns.push({
          title: '头像',
          key: 'userAvatar',
          render: (h, params) => {
            return h(
              Avatar,
              {
                props: {
                  source: params.row.userAvatar
                }
              }
            )
          }
        });
        columns.push({
          title: '昵称',
          key: 'userName'
        });
        columns.push({
          title: '动态ID',
          key: 'commentId',
        });
        columns.push({
          title: '评论内容',
          key: 'commentContent'
        });
        columns.push({
          title: '评论时间',
          key: 'commentTime',
          align: 'center',
          sortable: true
        });
        return columns;
      },
    },
    beforeMount() {
      //查询当前登录用户的部门
      if (localStorage.essays === 'false') {
        this.$router.push(`/404`)
      }
      let id = this.$route.params.essayId;
      this.$api.essays.queryEssay({essayId: id})
        .then((res) => {
          console.log(res.data);
          this.essayInfo = res.data.essay;
          this.commentInfo = res.data.comments;
          this.imgInfo = res.data.essay.img;
        })
        .catch((err) => {
          console.log(err)
        });
    },
    methods: {
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
  .container {
    display: flex;
    flex-direction: column;
  }

  .inner-div {
    display: flex;
    justify-content: space-between;
    margin: 15px auto;
    padding: 0px 10px;
    width: 100%;
  }

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

  .notice {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 5px;
    width: 300px;
    height: 100px;
    color: #e83015;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tag {
    margin: auto 20px;
    color: #999999;
  }

  .card-title {
    font-weight: 600;
    color: #333;
    font-size: 20px;
    margin-right: 10px;
  }

  .inner-card {
    flex-grow: 2;
    display: flex;
    margin: 5px;
    align-items: center;
    justify-content: flex-start;
  }

  .info-div {
    padding: 5px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .info-item {
    margin: 5px 2px;
  }

  .others {
    display: flex;
    width: 100%;
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
