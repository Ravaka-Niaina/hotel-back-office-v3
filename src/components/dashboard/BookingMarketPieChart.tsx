import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getMarketSegmentation } from 'src/services/Dashboard';
import { MarketSegment } from 'src/types/dashboard/marketSegment.interface';

interface BookingMarketPieChartProps {
  
}

function createChartOptions(marketSegments: Array<MarketSegment>): ApexOptions {
  const options: ApexOptions = {
    chart: {
      type: 'pie',
      height: 350
    },
    labels: marketSegments.map((item) => item.segmentName)
  }
  return options;
}
 
const BookingMarketPieChart: React.FC<BookingMarketPieChartProps> = () => {
  const [marketSegments, setMarketSegments] = useState<Array<MarketSegment>>([]);
  useEffect(() => {
    getMarketSegmentation().then((resp) => {
      setMarketSegments(resp.data);
    }).catch((ex) => {
      console.error(ex);
    })
  }, []);

  const series = marketSegments.map((item) => item.marketNumber);
  return (
    <ReactApexChart options={createChartOptions(marketSegments)} series={series} type='pie' />
  );
}
 
export default BookingMarketPieChart;