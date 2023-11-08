import React from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import './dash.css';


export default function LineChartComponent() {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
        name: 'Page A',
        uv: 4000,
        pv: 10000,
        amt: 2400,
      },
      {
        name: 'Page A',
        uv: 4000,
        pv: 20000,
        amt: 2400,
      },
      {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
      }
  ];

  return (
    
        <div>
          <ResponsiveContainer width="100%" height={50}>
            <LineChart data={data}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 80, y: 30 }}
              />
              <Line type="monotone" dataKey="pv" stroke="#eceff1" strokeWidth={1} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      
      
  );
}






