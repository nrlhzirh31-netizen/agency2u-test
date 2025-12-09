<template>
  <div>
    <v-row>
      <v-col cols="10">
        <h2>
          <b>{{ sales.currentSalesOverTime | moneyFormat(true) }}</b>
        </h2>
        <p>Sales Over Time</p>
      </v-col>
      <v-col cols="2" class="text-right">
        <h2>
          <v-icon :style="{ color: activeColor }" v-if="sales.percentSinceLastMonth > 0">mdi-arrow-up-thin</v-icon>
          <v-icon :style="{ color: activeColor }" v-if="sales.percentSinceLastMonth < 0">mdi-arrow-down-thin</v-icon>
          <b :style="{ color: activeColor }">{{ sales.percentSinceLastMonth }}%</b>
        </h2>
        <p>Since Last Month</p>
      </v-col>
    </v-row>
    <Bar
      :chart-options="chartOptions"
      :chart-data="sales.chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
import { SALES } from '@/store/dashboard.module'

export default {
  name: 'BarChart',
  components: {
    Bar
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#0000FF',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          },
          {
            label: 'Data Two',
            backgroundColor: '#f87979',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  created() {
    this.getSales()
  },
  computed: {
    sales() {
      return this.$store.state.dashboard.sales
    },
    activeColor() {
      return this.sales.percentSinceLastMonth >= 0 ? '#6ce52ede' : 'red'
    }
  },
  watch: {},
  methods: {
    getSales() {
      this.$store.dispatch(`${SALES}`)
    }
  }
}
</script>
