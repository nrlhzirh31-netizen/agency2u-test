<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col class="mb-4 pr-4" v-for="(item, i) in ansuranDashboardApplication" :key="i">
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
      <v-col class="mb-4 pa-4" cols="12" v-show="!(`${ANSURAN_DASHBOARD.DASHBOARD}/${ANSURAN_DASHBOARD.SALES}` in error)">
        <v-card class="pa-6">
          <dashboard-title :title="$t('label.salesChart')" class="text-uppercase pb-4"></dashboard-title>
          <AnsuranBarChart />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <!--   <v-col cols="6" v-show="!(`${DASHBOARD.DASHBOARD}/${DASHBOARD.BESTSELLER}` in error)">
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
      </v-col> -->
      <!-- <v-col cols="6" v-show="!(`${ANSURAN_DASHBOARD.DASHBOARD}/${ANSURAN_DASHBOARD.USERACTIVITY}` in error)">
      <v-card class="pa-6">
        <dashboard-title :title="$t('label.userActivity')" class="text-uppercase pb-4"></dashboard-title>
        <v-divider></v-divider>
        <v-data-table :headers="userActivityHeaders" :items="ansuranUserActivity" :sort-by="['value']" :sort-desc="[true]" multi-sort hide-default-footer></v-data-table>
      </v-card>
    </v-col> -->
      <v-col cols="12" v-show="!(`${ANSURAN_DASHBOARD.DASHBOARD}/${ANSURAN_DASHBOARD.COMMISSION}` in error)">
        <v-card class="pa-6">
          <dashboard-title :title="$t('label.commission')" class="text-uppercase pb-4"></dashboard-title>
          <v-divider></v-divider>
          <v-data-table :headers="commissionHeaders" :items="ansuranCommission.downlineCommission" :sort-by="['value']" :sort-desc="[true]" multi-sort hide-default-footer>
            <template v-slot:item.totalCommission="{ item }">
              <div class="text-right pr-14">
                {{ item.totalCommission | moneyFormat }}
              </div>
            </template>
          </v-data-table>
          <v-card-title class="text-right pr-14">
            <h5 style="width: 100%">Total Commission: {{ ansuranCommission.totalCommission | moneyFormat(true) }}</h5>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { BEST_SELLER, COMMISSION } from '@/store/dashboard.module'
import { localizationHelper } from '@/utils'
import { ANSURAN_DASHBOARD_APPLICATION, ANSURAN_USER_ACTIVITY, ANSURAN_COMMISSION } from '@/store/ansuran-dashboard.module'
import { ANSURAN_DASHBOARD } from '@/services/ansuran-dashboard.service'

export default {
  name: 'AnsuranDashboardView',
  components: {},
  props: {},
  data() {
    return {
      chartData: [],
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
      ANSURAN_DASHBOARD: ANSURAN_DASHBOARD,
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
    this.getAnsuranDashboardApplication()
    // this.getBestSeller()
    // this.getAnsuranUserActivity()
    this.getAnsuranCommission()
  },
  mounted() {},
  computed: {
    ansuranDashboardApplication() {
      return this.$store.state.ansuranDashboard.ansuranApplication.data
    },
    bestSeller() {
      return this.$store.state.dashboard.bestSeller.data
    },
    ansuranUserActivity() {
      return this.$store.state.ansuranDashboard.ansuranUserActivity.data
    },
    ansuranCommission() {
      return this.$store.state.ansuranDashboard.ansuranCommission
    },
    error() {
      return this.$store.state.shared.errorMessage
    }
  },
  watch: {},
  methods: {
    getAnsuranDashboardApplication() {
      this.$store.dispatch(`${ANSURAN_DASHBOARD_APPLICATION}`)
    },
    getBestSeller() {
      this.$store.dispatch(`${BEST_SELLER}`)
    },
    getAnsuranUserActivity() {
      this.$store.dispatch(`${ANSURAN_USER_ACTIVITY}`)
    },
    getAnsuranCommission() {
      this.$store.dispatch(`${ANSURAN_COMMISSION}`)
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
