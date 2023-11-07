import React, { useEffect, useState } from 'react';
// Material UI components
import { Grid } from '@mui/material';
import { calculateAvgLenStay, calculateAvgRoomRate, getCancellationRate, getTotalRevenue } from 'src/services/Dashboard';
// sections
import {
  AppWidgetSummary,
} from '../stats';

interface StatOverviewCardProps {}

const StatOverviewCard: React.FC<StatOverviewCardProps> = () => {
  const [totalRevenues, setTotalRevenues] = useState<number>(0);
  const [cancellationRate, setCancellationRate] = useState<number>(0);
  const [avgRoomRate, setAvgRoomRate] = useState<number>(0);
  const [avgLenStay, setAvgLenStay] = useState<number>(0);
  useEffect(() => {
    getTotalRevenue().then((resp) => {
      setTotalRevenues(resp.data);
    })
    .catch((ex) => {
      console.error(ex);
    });
    getCancellationRate().then((resp) => {
      setCancellationRate(Number.parseFloat(resp.data));
    }).catch((ex) => {
      console.error(ex);
    });
    calculateAvgRoomRate().then((resp) => {
      setAvgRoomRate(Number.parseFloat(resp.data));
    }).catch((ex) => {
      console.error(ex);
    });
    calculateAvgLenStay().then((resp) => {
      setAvgLenStay(Number.parseFloat(resp.data));
    }).catch((ex) => {
      console.error(ex);      
    })
  }, [])

  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary title="Revenue Total (en Ariary Malagasy)" total={totalRevenues} icon={'ant-design:line-chart-outlined'} sx={undefined} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary
          title="Prix Moyen Chambre"
          total={avgRoomRate}
          color="info"
          icon={'ant-design:home-filled'}
          sx={undefined}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary title="Pourcentage d'annulation (en %)" total={cancellationRate} color="error" icon={'ant-design:close-circle-filled'} sx={undefined} />
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <AppWidgetSummary title="Durée moyenne de séjour (en jours)" total={avgLenStay} color="success" icon={"ant-design:clock-circle-outlined"} sx={undefined} />
      </Grid>
    </>
  );
};

export default StatOverviewCard;
