// Chart.js visualizations for Pakistan Under Siege
// This file expects Chart.js to be loaded in the HTML

// Example data structure (replace with parsed real data)
const hrvData = {
  years: [2016,2017,2018,2019,2020,2021,2022,2023,2024,2025],
  provinces: ["Balochistan","Sindh","KP","Punjab"],
  disappearances: [728,868,1098,800,415,952,100,885,0,0], // Example numbers
  killings: [70,61,149,20,64,37,11,55,0,0], // Example numbers
  // ... more series as needed
};

// Province-wise data (replace with parsed real data)
const provinceData = {
  Balochistan: {
    disappearances: [728,868,1098,800,415,952,100,885,0,0],
    killings: [70,61,149,20,64,37,11,55,0,0],
  },
  Sindh: {
    disappearances: [20,40,50,30,25,35,15,20,0,0], // Example numbers
    killings: [318,200,180,150,120,100,90,80,0,0],
  },
  KP: {
    disappearances: [2942,1000,900,800,700,600,500,400,0,0],
    killings: [67,85,60,50,40,35,30,25,0,0],
  },
  Punjab: {
    disappearances: [10,12,15,13,11,10,9,8,0,0],
    killings: [10,12,15,13,11,10,9,8,0,0],
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
