<template>
  <div v-if="pagination.tableRowsCount > 0" class="text-center mt-4">
    <v-pagination
      v-if="!clientSidePagination"
      :value="pagination.pageNumber"
      :length="pagination.lastPage"
      :total-visible="7"
      v-bind="$attrs"
      v-on="$listeners"
      @input="navigatePageInput"
      @next="navigatePage()"
      @previous="navigatePage()"
      prev-icon="$paginationPrevIcon"
      next-icon="$paginationNextIcon"
      class="pagination-wrapper"
      circle
    ></v-pagination>

    <v-pagination
      v-else
      :value="pagination.pageNumber"
      :length="pagination.lastPage"
      :total-visible="7"
      v-bind="$attrs"
      v-on="$listeners"
      prev-icon="$paginationPrevIcon"
      next-icon="$paginationNextIcon"
      class="pagination-wrapper"
      circle
    ></v-pagination>
  </div>
</template>

<script>
export default {
  name: 'AppPagination',
  components: {},
  props: {
    pagination: {
      type: Object,
      required: true,
      default: function () {
        return {
          pageNumber: 0,
          pageSize: 0,
          lastPage: 0,
          tableRowsCount: 0
        }
      }
    },
    clientSidePagination: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    navigatePageInput(pageNumber) {
      this.$emit('pageNavigationEmit', pageNumber)
    },
    navigatePage() {
      this.$emit('pageNavigationEmit', this.pagination.pageNumber)
    }
  },
  beforeDestroy() {}
}
</script>

<style lang="scss" scoped>
.pagination-wrapper ::v-deep .v-pagination {
  width: unset;
  max-width: unset;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  border-radius: 2rem;
  padding: 0 0.75rem;

  button {
    box-shadow: unset;
  }
}

/* Text styling */
.pagination-wrapper ::v-deep .v-pagination__item {
  font-weight: bold;
  font-size: 12px;
  color: var(--v-secondary-base);
}

/* Active item color style */
.pagination-wrapper ::v-deep .v-pagination__item--active {
  background-color: #eff4ed !important;
  color: var(--v-primary-base);
}
</style>
