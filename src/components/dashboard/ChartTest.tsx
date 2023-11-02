import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Reservation } from 'src/types/reservation/reservation.interface';
import { testService } from '../../services/Dashboard';

function about(setResults: any) {
  testService()
    .then((resp) => {
      console.log(resp);
      setResults(resp.data);
    })
    .catch((ex) => {
      console.error(ex);
    });
}

const ChartTest: React.FC = () => {
  const [results, setResults] = useState<Reservation[]>();
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    about(setResults);
  }, []);

  // const bookingDateList: any = results?.map(resv => resv.AvgDailyRate);
  const options: {
    chart: { id: string; height: number };
    xaxis: { categories: string[] };
    series: { name: string; data: number[]; fill: (value: any) => string }[];
  } = {
    chart: {
      id: 'basic-bar',
      height: 400,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    },
    series: [
      {
        name: 'Sales',
        data: [10000, 12000, 15000, 17000, 20000],
        fill: (value) => ['#00FF00', '#FFFF00', '#FF0000'][value],
      },
    ],
  };

  // Type assertion
  const apexOptions: ApexOptions = options as ApexOptions;

  return (
    <>
      <main>
        <Chart options={apexOptions} series={apexOptions.series} type="line" width="500" />
      </main>
    </>
  );
};

export default ChartTest;
