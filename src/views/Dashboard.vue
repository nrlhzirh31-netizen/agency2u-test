<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col class="mb-4 pr-4" v-for="(item, i) in dashboardApplication" :key="i">
        <v-card :style="{ 'background-color': gradientColor[i] }">
          <v-card-text>
            <h2 class="text-center">{{ item.value }}</h2>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text class="pa-2">
            <h3 class="text-center">
              {{ item.moduleName }}
            </h3>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mb-4 pa-4" cols="12" v-show="!(`${DASHBOARD.DASHBOARD}/${DASHBOARD.SALES}` in error)">
        <v-card class="pa-6">
          <dashboard-title :title="$t('label.salesChart')" class="text-uppercase pb-4"></dashboard-title>
          <BarChart />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" v-show="!(`${DASHBOARD.DASHBOARD}/${DASHBOARD.BESTSELLER}` in error)">
        <v-card class="pa-6">
          <dashboard-title :title="$t('label.bestSeller')" class="text-uppercase pb-4"></dashboard-title>
          <v-divider></v-divider>
          <v-data-table :headers="bestSellerHeaders" :items="bestSeller" :sort-by="['value']" :sort-desc="[true]" multi-sort hide-default-footer>
            <template v-slot:item.totalAmount="{ item }">
              <div class="text-right pr-5">
                <v-chip :color="getTotalAmount(item.totalAmount)" dark>
                  {{ item.totalAmount | moneyFormat }}
                </v-chip>
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="6" v-show="!(`${DASHBOARD.DASHBOARD}/${DASHBOARD.USERACTIVITY}` in error)">
        <v-card class="pa-6">
          <dashboard-title :title="$t('label.userActivity')" class="text-uppercase pb-4"></dashboard-title>
          <v-divider></v-divider>
          <v-data-table :headers="userActivityHeaders" :items="userActivity" :sort-by="['value']" :sort-desc="[true]" multi-sort hide-default-footer>
            <!-- <template v-slot:item.totalApplications="{ item }">
              <v-chip :color="getTotalApplications(item.totalApplications)" dark>
                {{ item.totalApplications }}
              </v-chip>
            </template> -->
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="12" v-show="!(`${DASHBOARD.DASHBOARD}/${DASHBOARD.COMMISSION}` in error)">
        <v-card class="pa-6">
          <dashboard-title :title="$t('label.commission')" class="text-uppercase pb-4"></dashboard-title>
          <v-divider></v-divider>
          <v-data-table :headers="commissionHeaders" :items="commission.downlineCommission" :sort-by="['value']" :sort-desc="[true]" multi-sort hide-default-footer>
            <template v-slot:item.totalCommission="{ item }">
              <div class="text-right pr-14">
                {{ item.totalCommission | moneyFormat }}
              </div>
            </template>
          </v-data-table>
          <v-card-title class="text-right pr-14">
            <h5 style="width: 100%">Total Commission: {{ commission.totalCommission | moneyFormat(true) }}</h5>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { DASHBOARD_APPLICATION, BEST_SELLER, USER_ACTIVITY, COMMISSION } from '@/store/dashboard.module'
import { DASHBOARD } from '@/services/dashboard.service'
import { localizationHelper } from '@/utils'

export default {
  name: 'DashboardView',
  components: {},
  props: {},
  data() {
    return {
      chartData: [],
      bestSellerHeaders: [
        {
          text: localizationHelper.getMessage('label.product'),
          class: 'caption',
          value: 'product'
        },
        {
          text: localizationHelper.getMessage('label.totalAmount'),
          class: 'caption',
          value: 'totalAmount'
        }
      ],
      userActivityHeaders: [
        {
          text: localizationHelper.getMessage('label.userCode'),
          class: 'caption',
          value: 'user_code'
        },
        {
          text: localizationHelper.getMessage('label.userName'),
          class: 'caption',
          value: 'user_name'
        },
        {
          text: localizationHelper.getMessage('label.roleName'),
          class: 'caption',
          value: 'role_name'
        },
        {
          text: localizationHelper.getMessage('label.totalApplications'),
          class: 'caption',
          value: 'totalApplications'
        }
      ],
      commissionHeaders: [
        // {
        //   text: localizationHelper.getMessage('label.userId'),
        //   class: 'caption',
        //   value: 'userId'
        // },
        {
          text: localizationHelper.getMessage('label.userCode'),
          class: 'caption',
          value: 'userCode'
        },
        {
          text: localizationHelper.getMessage('label.userName'),
          class: 'caption',
          value: 'userName'
        },
        {
          text: localizationHelper.getMessage('label.totalCommission'),
          class: 'caption',
          align: 'center',
          value: 'totalCommission'
        }
      ],
      DASHBOARD: DASHBOARD,
      gradientColor: [
        //https://coolors.co/gradient-palette/ecf1f8-a7c5eb?number=7
        '#A7C5EB',
        '#B3CCED',
        '#BED4EF',
        '#CADBF2',
        '#D5E2F4',
        '#E1EAF6',
        '#ECF1F8'
      ]
    }
  },
  created() {
    this.getDashboardApplication()
    this.getBestSeller()
    this.getUserActivity()
    this.getCommission()
  },
  mounted() {},
  computed: {
    dashboardApplication() {
      return this.$store.state.dashboard.application.data
    },
    bestSeller() {
      return this.$store.state.dashboard.bestSeller.data
    },
    userActivity() {
      return this.$store.state.dashboard.userActivity.data
    },
    commission() {
      return this.$store.state.dashboard.commission
    },
    error() {
      return this.$store.state.shared.errorMessage
    }
  },
  watch: {},
  methods: {
    getDashboardApplication() {
      this.$store.dispatch(`${DASHBOARD_APPLICATION}`)
    },
    getBestSeller() {
      this.$store.dispatch(`${BEST_SELLER}`)
    },
    getUserActivity() {
      this.$store.dispatch(`${USER_ACTIVITY}`)
    },
    getCommission() {
      this.$store.dispatch(`${COMMISSION}`)
    },
    getTotalAmount(totalAmount) {
      let d = this.bestSeller
      if (totalAmount == d[0].totalAmount) return 'green'
    },
    getTotalApplications(totalApplications) {
      let d = this.userActivity

      if (d != '' && d != 'undefined' && d != null) {
        for (let i = 0; i < d.length; i++) {
          if (totalApplications >= d[i].totalApplications) {
            return 'red'
          } else {
            return 'green'
          }
        }
      }
    }
  },
  beforeDestroy() {}
}
</script>

<style lang="scss" scoped>
.fontColor {
  color: #fff;
}

.subtitle-1 {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
</style>
