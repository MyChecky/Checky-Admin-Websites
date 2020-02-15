<template>
  <div>
    <Button @click="value3 = true" type="primary">修改权限</Button>
    <Drawer
      title="用户权限"
      placement="left"
      v-model="value3"
      width="360"
      :mask-closable="false"
      :styles="styles"
    >
      <Form :model="formData">
        <Row :gutter="16">
          <Col span="20">
            <FormItem label="用户名" label-position="top">
              <Input v-model="formData.name" placeholder="please enter user name" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="20">
            <FormItem label="审核权限" label-position="top">
              <Select v-model="formData.owner" placeholder="please select an owner">
                <Option value="jobs">有</Option>
                <Option value="ive">无</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="20">
            <FormItem label="删除权限" label-position="top">
              <Select v-model="formData.approver" placeholder="please choose the approver">
                <Option value="jobs">有</Option>
                <Option value="ive">无</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="20">
            <FormItem label="新建权限" label-position="top">
              <Select v-model="formData.approver" placeholder="please choose the approver">
                <Option value="jobs">有</Option>
                <Option value="ive">无</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="备注" label-position="top">
          <Input type="textarea" v-model="formData.desc" :rows="4" placeholder="please enter the description" />
        </FormItem>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="value3 = false">Cancel</Button>
        <Button type="primary" @click="value3 = false">Submit</Button>
      </div>
    </Drawer>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        value3: false,
        styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '53px',
          position: 'static'
        },
        formData: {
          name: '',
          url: '',
          owner: '',
          type: '',
          approver: '',
          date: '',
          desc: ''
        },
      }
    }
  }
</script>
<style>
  .demo-drawer-footer{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
  }
</style>
