import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getAvgDailyRate } from 'src/services/Dashboard';
import { AvgDailyRate } from 'src/types/dashboard/avgDailyRate.interface';

interface BookingRevenueChartProps {
  
}

function createChartOptions(avgDailyRates: AvgDailyRate[]): ApexOptions {
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 230
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: avgDailyRates.map((item) => item.month),
    },
    tooltip: {
      x: {
        formatter: function(val) {
          return "Ar " + val
        }
      }
    }
  }
  return options;
}

const BookingRevenueChart: React.FC<BookingRevenueChartProps> = () => {
  const [avgDailyRates, setavgDailyRates] = useState<Array<AvgDailyRate>>([]);
  useEffect(() => {
    getAvgDailyRate().then((resp) => {
      setavgDailyRates(resp.data);
    }).catch((ex) => {
      console.error(ex);
    })
  }, []);

  const series: any[] = [{
    name: "ADR",
    data: avgDailyRates.map((item) => item.avg.toFixed(2))
  }];
  return (
    <ReactApexChart options={createChartOptions(avgDailyRates)} series={series} type='bar' />
  );
}
 
export default BookingRevenueChart;