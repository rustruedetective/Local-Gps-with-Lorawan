export const data = {
    datasets: [{
      label: 'Gate A',
      data: [{
        x: -10,
        y: 10,
        r: 15
      }],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(255, 177, 193)'
    },{
      label: 'Gate B',
      data: [{
        x: 10,
        y: 10,
        r: 15
      }],
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgb(154, 208, 244)'
    },{
      label: 'Gate C',
      data: [{
        x: 20,
        y: 20,
        r: 15
      }],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgb(165, 223, 223)'
    },{
      label: 'Node',
      data: [{
        x: 10,
        y: 20,
        r: 15
      }],
      borderColor: 'rgba(247, 202, 24)',
      backgroundColor: 'rgba(240, 240, 214, 1)'
    }]
  };

export const config = {
    type: 'bubble',
    data: data,
    options: {
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false
          },
          max: 50,
          min: -50
        },
        y: {
          grid: {
            display: false,
            drawBorder: false
          },
          max: 50,
          min: -50
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  };

export function updateBubbleGraph(chart ,gax, gay, gbx, gby, gcx, gcy, nx, ny){
    data.datasets[0].data[0].x = gax;
    data.datasets[0].data[0].y = gay;

    data.datasets[1].data[0].x = gbx;
    data.datasets[1].data[0].y = gby;

    data.datasets[2].data[0].x = gcx;
    data.datasets[2].data[0].y = gcy

    data.datasets[3].data[0].x = nx;
    data.datasets[3].data[0].y = ny;
  
    chart.update();
    // console.log("Updated location chart");
  }

export function updateBubbleGraphAxis(chart, maxX, minX, maxY, minY){
  config.options.scales.x.max = maxX+1;
  config.options.scales.x.min = minX-1;
  config.options.scales.y.max = maxY+2;
  config.options.scales.y.min = minY-2;
  chart.update();
  // console.log("Updated axis in chart");
  }