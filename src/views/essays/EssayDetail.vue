<template>
  <div class="container">
    <div v-if="exist">
      <div class="inner-div">
        <Card>
          <span class="card-title">基本信息</span>
          <div class="inner-card">
            <!-- <Avatar :source="userInfo.userAvatar" :size="80"></Avatar> -->
            <div class="info-div">
              <span class="info-item">动态ID：{{taskInfo.essayId}}</span>
              <span class="info-item">动态内容：{{taskInfo.essayContent}}</span>
              <span class="info-item">发布时间：{{taskInfo.essayTime}}</span>
            </div>
            <!-- <Avatar :source="userInfo.userAvatar" :size="80"></Avatar> -->
            <div class="info-div">
              <span class="info-item">发布用户：{{taskInfo.userName}}</span>
              <span class="info-item">获赞数：{{taskInfo.likeNum}}</span>
              <span class="info-item">评论人数：{{taskInfo.commentNum}}</span>
            </div>
          </div>
        </Card>
      </div>
      <div class="inner-div">
        <Card class="others">
          <div class="table-header">
            <span class="card-title">附件列表</span>
            <span class="total">总数：{{essayInfo.length}}</span>
            <div class="search-div">
              <SearchBar></SearchBar>
            </div>
          </div>
          <div class="task-list">
            <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder"
                   :stripe="showStripe" :show-header="showHeader" :size="tableSize" :data="essayInfo"
                   :columns="supervisorColumns"></Table>
          </div>
        </Card>
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

  export default {

    name: "EssayDetail",
    components: {
      Avatar: Avatar,
      Credit: Credit,
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
        essayInfo: {},
      }
    },
    computed: {
      attchfileColumns() {
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
        })
        .catch((err) => {
          console.log(err)
        });
    },
    methods: {
      search(keyword) {
      },
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
</style>
