<template>
  <div class='organization-contain'>
    <organization-user>
    </organization-user>
  </div>
</template>

<script>
  import OrganizationUser from '../components/OrganizationUser'
  export default {
    name: 'TestOrganization',
    components: { OrganizationUser },
    data() {
      return {
        dialogVisible: false
      }
    },
    created() {
    },
    methods: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
