<template>
  <div>
    <Card style="margin-bottom: 0.2rem">
      <div class="table-header">
        <span class="card-title">现有类型</span>
        <span class="total"> 总数：{{types.length}}</span>
        <div class="search-div"></div>
      </div>
      <div class="types-div">
        <typeDiv v-for="(item,index) in types" :typeItem=item :i=index :key="item.typeId"
                 :callback="deleteType"></typeDiv>
      </div>
    </Card>
    <Card>
      <div class="table-header">
        <span class="card-title">建议列表</span>
        <span class="total">总数：{{suggestionsSize}}</span>
      </div>
      <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder" :stripe="showStripe"
             :show-header="showHeader" :size="tableSize" :data="typeSuggestions" :columns="suggestionColumn"></Table>
      <Page class="pager" :total="suggestionsSize" :page-size="pageSize" @on-change="changePage"></Page>
    </Card>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import TypeDiv from '../../components/TypeDiv'
  import InputBar from '../../components/InputBar'

  export default {
    components: {
      TypeDiv: TypeDiv,
      InputBar: InputBar
    },
    data() {
      return {
        showBorder: false,
        showStripe: false,
        showHeader: true,
        showIndex: false,
        showCheckbox: false,
        fixedHeader: false,
        tableHeight: 600,
        pageSize: 8,
        tableSize: 'default',
        page: 0,
        essaysSize: 0,
        tableData: [],
        types: [],
        typeSuggestions: [],
        suggestionsSize: 0
      }
    },
    computed: {
      suggestionColumn() {
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
          title: '建议ID',
          key: 'suggestionId',
          width: 240,
        });
        columns.push({
          title: '建议人ID',
          key: 'userId',
          width: 240,
          render: (h, params) => {
            return h(
              "a",
              {
                class: ['fa'],
                attrs: {
                  userId: this.typeSuggestions[params.index].userId,
                },
                on: {
                  click: (e) => {// 点击事件， e 为事件参数
                    e.stopPropagation();
                    console.log(e.target.attributes.userId);
                    this.$router.push('/users/id=' + this.typeSuggestions[params.index].userId)
                  }
                }
              },
              this.typeSuggestions[params.index].userId,
            );
          }
        });
        columns.push({
          title: '建议人昵称',
          key: 'userName',
          width: 120,
          align: 'center',
        });
        columns.push({
          title: '内容',
          key: 'suggestionContent',
          render: (h, params) => {
            return h(
              InputBar, {
                props: {
                  text: params.row.suggestionContent,
                },
                style:{
                  width: 240,
                },
                on: {
                  inputChange: (val) => {
                    params.row.suggestionContent = val;
                    this.typeSuggestions[params.index].suggestionContent = val
                  }
                }
              }
            )
          }
        });
        columns.push({
          title: '建议时间',
          key: 'suggestionTime',
          width: 220,
        });
        columns.push({
          title: '操作',
          key: 'action',
          width: 240,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    console.log(this.typeSuggestions[params.index].suggestionContent)
                    this.$api.tasks.passSuggestion({
                      suggestionId: this.typeSuggestions[params.index].suggestionId,
                      typeContent: this.typeSuggestions[params.index].suggestionContent
                    }).then(res => {
                      if (res.data.state === 'ok') {
                        let temp = this.typeSuggestions;
                        temp.splice(params.index, 1);
                        this.typeSuggestions = temp;
                        this.suggestionsSize = temp.length
                      }
                    })
                  }
                }
              }, '通过'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$api.tasks.denySuggestion({
                      suggestionId: this.typeSuggestions[params.index].suggestionId
                    }).then(res => {
                      if (res.data.state === 'ok') {
                        let temp = this.typeSuggestions;
                        temp.splice(params.index, 1);
                        this.typeSuggestions = temp;
                        this.suggestionsSize = temp.length
                      }
                    })
                  }
                }
              }, '拒绝')
            ]);
          }
        });
        return columns;
      }
    },
    beforeMount: function () {
      if (localStorage.tasks === 'false') {
        this.$router.push(`/404`)
      }
      this.$api.tasks.queryType({})
        .then((res) => {
          this.types = res.data.taskTypes ? res.data.taskTypes : res.data;
          console.log(this.types);
        })
        .catch(err => {
          console.log(err)
        });
      this.$api.tasks.queryTypeSuggestion({
        page: this.page,
        pageSize: this.pageSize
      })
        .then((res) => {
          let tempArr;
          tempArr = res.data.suggestions;
          console.log("before", tempArr, tempArr.length);
          tempArr.forEach((item, i) => {
            if (item.suggestionState === 'waiting') {
              console.log(i, item.suggestionState);
              this.typeSuggestions.splice(0, 0, item)
            }
          });
          console.log("after", this.typeSuggestions, this.typeSuggestions.length);
          this.suggestionsSize = this.typeSuggestions.length;
        })
        .catch(err => {
          console.log(err)
        })
    },
    mounted() {
      //this.tableHeight =  window.innerHeight - this.$refs.table.$el.offsetTop - 125;
    },
    methods: {
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

        this.$api.tasks.querySuggestionByKeyword({username: keyword}, new CancelToken((c) => {
          this.cancel = c;
        }))
          .then((res) => {
            let tempArr;
            tempArr = res.data.suggestions;
            console.log("before", tempArr, tempArr.length);
            tempArr.forEach((item, i) => {
              if (item.suggestionState === 'waiting') {
                console.log(i, item.suggestionState);
                this.typeSuggestions.splice(0, 0, item)
              }
            });
            console.log("after", this.typeSuggestions, this.typeSuggestions.length);
            this.suggestionsSize = this.typeSuggestions.length;
          })
          .catch(err => {
            console.log(err)
          })
      },
      deleteType(id) {
        this.$api.tasks.delType({typeId: id}).then(res => {
          let temp = this.types;
          for (let n = 0; n < temp.length; n++) {
            if (temp[n].typeId === id) {
              temp.splice(n, 1);
              break;
            }
          }

          this.types = temp
        }).catch(err => {
        });
      },
      changePage(e) {
        this.page = e;
        this.$api.tasks.queryTypeSuggestion({
          page: this.page,
          pageSize: this.pageSize
        })
          .then((res) => {
            let tempArr;
            tempArr = res.data.suggestions;
            console.log("before", tempArr, tempArr.length);
            tempArr.forEach((item, i) => {
              if (item.suggestionState === 'waiting') {
                console.log(i, item.suggestionState);
                this.typeSuggestions.splice(0, 0, item)
              }
            });
            console.log("after", this.typeSuggestions, this.typeSuggestions.length);
            this.suggestionsSize = this.typeSuggestions.length;
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>
  .table-header {
    margin-bottom: 10px
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

  .types-div {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
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
    font-size: 0.4rem;
    margin-bottom: 10px;
  }

</style>
