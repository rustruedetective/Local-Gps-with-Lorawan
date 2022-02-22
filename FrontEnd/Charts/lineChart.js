import * as Utils from "./Utils.js";

export const data = {
    labels: Utils.labels,
    datasets: [
      {
        label: 'Gate A',
        data: Utils.numbers(Utils.NUMBER_CFG),
        borderColor: Utils.CHART_COLORS.blue,
        tension: 0.4,
        fill: true,
        backgroundColor: 'rgb(154, 208, 244, 0.3)',
      },
      {
        label: 'Gate B',
        data: Utils.numbers(Utils.NUMBER_CFG),
        borderColor: Utils.CHART_COLORS.green,
        tension: 0.4,
        fill: true,
        backgroundColor: 'rgb(165, 223, 223, 0.4)',
      },
      {
        label: 'Gate C',
        data: Utils.numbers(Utils.NUMBER_CFG),
        borderColor: Utils.CHART_COLORS.yellow,
        tension: 0.4,
        fill: true,
        backgroundColor: 'rgb(255, 230, 170, 0.5)',
      } 
    ]
  };

export const config = {
    type: 'line',
    data: data,
    options: {
      elements: {
        point:{
            radius: 0
        }
      },
      animations: {
        radius: {
          duration: 400,
          easing: 'linear',
          loop: (context) => context.active
        }
      },
      hoverRadius: 0,
      hoverBackgroundColor: 'yellow',
      interaction: {
        mode: 'nearest',
        intersect: false,
        axis: 'x'
      },
      plugins: {
        tooltip: {
          enabled: false
        }
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false
          },
          ticks: {
            display: false
          }
        },
        y: {
          grid: {
            display: false,
            drawBorder: false
          },
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    },
  };

export function updateLineGraph(chart, rssA, rssB, rssC){
  data.datasets[0].data.push(rssA);
  data.datasets[0].data.shift();
  data.datasets[1].data.push(rssB);
  data.datasets[1].data.shift();
  data.datasets[2].data.push(rssC);
  data.datasets[2].data.shift();
  
  chart.update('none');
  }