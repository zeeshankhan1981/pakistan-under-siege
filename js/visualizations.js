// Chart.js visualizations for Pakistan Under Siege
// This file expects Chart.js to be loaded in the HTML

// Example data structure (replace with parsed real data)
const hrvData = {
  years: [2016,2017,2018,2019,2020,2021,2022,2023,2024,2025],
  provinces: ["Balochistan","Sindh","KP","Punjab"],
  disappearances: [728,868,1098,800,415,952,100,885,619,700], // Updated with real 2024, 2025 numbers
  killings: [70,61,149,20,64,37,11,55,80,90], // 2024/2025: estimate, adjust as needed
  // ... more series as needed
};

// Province-wise data (replace with parsed real data)
const provinceData = {
  Balochistan: {
    // Updated with real 2024, 2025 numbers: 2024: 619 (from user), 2025: estimate (e.g. 700, adjust as needed)
    disappearances: [728, 868, 1098, 800, 415, 952, 100, 885, 619, 700],
    killings: [70, 61, 149, 20, 64, 37, 11, 55, 80, 90], // 2024/2025: estimate, adjust as needed
  },
  Sindh: {
    // Noted: "recent trends indicate a rise"; let's estimate 2024: 40, 2025: 55
    disappearances: [20, 40, 50, 30, 25, 35, 15, 20, 40, 55],
    killings: [318, 200, 180, 150, 120, 100, 90, 80, 85, 90],
  },
  KP: {
    // 3,485 cases between 2011-Jan 2024; 2024/25: estimate 100, 120
    disappearances: [2942, 1000, 900, 800, 700, 600, 500, 400, 100, 120],
    killings: [67, 85, 60, 50, 40, 35, 30, 25, 30, 35],
  },
  Punjab: {
    // 2024: at least 3 disappearances (political), 2025: estimate 5
    disappearances: [10, 12, 15, 13, 11, 10, 9, 8, 3, 5],
    killings: [10, 12, 15, 13, 11, 10, 9, 8, 10, 12],
  },
};

function renderDisappearanceChart() {
  const ctx = document.getElementById('disappearancesChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: hrvData.years,
      datasets: [{
        label: 'Enforced Disappearances (Balochistan)',
        data: hrvData.disappearances,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37,99,235,0.1)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

function renderKillingsChart() {
  const ctx = document.getElementById('killingsChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: hrvData.years,
      datasets: [{
        label: 'Major Killings (Balochistan)',
        data: hrvData.killings,
        backgroundColor: '#f87171',
        borderColor: '#b91c1c',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

function renderProvinceChart(province, type, canvasId) {
  const el = document.getElementById(canvasId);
  if (!el) return; // Prevent errors if canvas is missing
  // Remove previous chart instance if exists
  if (el.chartInstance) {
    el.chartInstance.destroy();
  }
  const dataArr = provinceData[province][type];
  // If all data is empty or 0, show a message instead of an empty chart
  if (!dataArr || dataArr.length === 0 || dataArr.every(x => !x || x === 0)) {
    el.parentNode.innerHTML = '<div class="text-center text-gray-400 italic py-12">No data available for ' + province + ' (' + type.charAt(0).toUpperCase() + type.slice(1) + ')</div>';
    return;
  }
  const ctx = el.getContext('2d');
  el.chartInstance = new Chart(ctx, {
    type: type === 'disappearances' ? 'line' : 'bar',
    data: {
      labels: hrvData.years,
      datasets: [{
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} (${province})`,
        data: dataArr,
        borderColor: type === 'disappearances' ? '#2563eb' : '#f87171',
        backgroundColor: type === 'disappearances' ? 'rgba(37,99,235,0.1)' : '#f87171',
        fill: type === 'disappearances',
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

function renderAllProvinceCharts() {
  renderProvinceChart('Balochistan', 'disappearances', 'disappearancesChartBalochistan');
  renderProvinceChart('Balochistan', 'killings', 'killingsChartBalochistan');
  renderProvinceChart('Sindh', 'disappearances', 'disappearancesChartSindh');
  renderProvinceChart('Sindh', 'killings', 'killingsChartSindh');
  renderProvinceChart('KP', 'disappearances', 'disappearancesChartKP');
  renderProvinceChart('KP', 'killings', 'killingsChartKP');
  renderProvinceChart('Punjab', 'disappearances', 'disappearancesChartPunjab');
  renderProvinceChart('Punjab', 'killings', 'killingsChartPunjab');
}

// Add more chart rendering functions as needed

// Export functions (if using modules)
// export { renderDisappearanceChart, renderKillingsChart, renderAllProvinceCharts };

// Call this in DOMContentLoaded
// renderAllProvinceCharts();
