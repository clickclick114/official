<template>
  <Radar
    v-if="chartData"
    :data="chartData"
    :options="chartOptions"
  />
  <div v-else>Loading chart...</div>
</template>

<script setup>
import { Radar } from "vue-chartjs";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    r: {
      angleLines: {
        color: "rgba(0, 0, 0, 0.3)",
      },
      grid: {
        color: "rgba(0, 0, 0, 0.3)",
      },
      pointLabels: {
        color: "rgba(0, 0, 0, 0.7)",
        font: {
          size: 14,
        },
      },
      ticks: {
        beginAtZero: true,
        max: 100,
        stepSize: 20,
      },
    },
  },
};
</script> 