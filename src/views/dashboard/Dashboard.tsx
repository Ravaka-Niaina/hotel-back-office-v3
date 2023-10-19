import { useState } from 'react';

/* global DashboardProps, DashboardState */

interface DashboardProps {}

interface DashboardState {}

const Dashboard: React.FC = () => {
  const [state, setState] = useState<DashboardState>({});

  return <h1>Hello Aiolia, Serge Miranda, Steave Leong</h1>;
};

export default Dashboard;
