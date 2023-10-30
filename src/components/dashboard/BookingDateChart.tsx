import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { calculateRevenueMonth } from 'src/services/Dashboard';
import { Reservation } from 'src/types/dashboard/reservation.interface';
import './booking.module.css';

interface BookingDateChartProps {
  bookingData?: Reservation[];
}

function createChartOption(revenueList: Array<{ [key: string]: number }>): ApexOptions {
  const options: ApexOptions = {
    chart: {
      id: 'area-datetime',
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: 'Revenue Movement',
      align: 'left',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.2,
        opacityTo: 0.9,
        stops: [0, 100000]
      }
    },
    xaxis: {
      type: 'datetime',
      categories: revenueList.length > 0 ? Object.keys(revenueList[0]): []
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return new Intl.NumberFormat("en-US", {
            style: "decimal",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(value);
        },
      }
    },
    colors: ["#5ECC57", "#FF5733"],
  };

  return options;
}

const BookingDateChart: React.FC<BookingDateChartProps> = (props) => {
  const [results, setResults] = useState<Array<{ [key: string]: number }>>([]);
  useEffect(() => {
    calculateRevenueMonth().then((resp) => {
      setResults(resp.data);
    })
    .catch((ex) => {
      console.error(ex);
    });
  }, [])

  let revenueList: number[] = [];
  let revenueLossList: number[] = [];
  if (results.length > 0) {
    console.log(results);
    
    revenueList = Object.values(results[0])
    revenueLossList = Object.values(results[1])
  }
  
  const series = [
    {
      name: 'Revenue',
      data: revenueList
    },
    {
      name: 'Revenue Loss',
      data: revenueLossList
    }
  ]

  return (
    <div className="chart-container">
      <Chart options={createChartOption(results)} series={series} />
    </div>
  );
};

export default BookingDateChart;
