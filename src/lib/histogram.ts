import Chart from 'chart.js/auto';

export const calculateHistogram = (image: any, ref: any) => {
    const canvas: any = ref;
    canvas.width = image.width;
    canvas.heigth = image.height;

    const ctx: any = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // const data = new Array(256).fill(0);

    // for (let i = 0; i < imageData.data.length; i += 4) {
    //     const r = imageData.data[i];
    //     const g = imageData.data[i + 1];
    //     const b = imageData.data[i + 2];
    //     const grayValue = Math.round((r + g + b) / 3); // Convert to grayscale
    //     data[grayValue]++;
    // }

    // return data;

    const redData = new Array(256).fill(0);
    const greenData = new Array(256).fill(0);
    const blueData = new Array(256).fill(0);

    for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];

        redData[r]++;
        greenData[g]++;
        blueData[b]++;
    }

    return { redData, greenData, blueData };
};

export const renderHistogram = (image: any, ref: any, redData: any, greenData: any, blueData: any) => {
    const canvas: any = ref;

    const ctx: any = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Array.from({ length: 256 }, (_, i) => i.toString()),
          datasets: [{
            label: 'Red',
            data: redData,
            backgroundColor: 'red',
            borderColor: 'red',
            borderWidth: 1,
            barThickness: 2
          }, {
            label: 'Green',
            data: greenData,
            backgroundColor: 'green',
            borderColor: 'green',
            borderWidth: 1,
            barThickness: 2
          }, {
            label: 'Blue',
            data: blueData,
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderWidth: 1,
            barThickness: 2
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    
      return chart;
};