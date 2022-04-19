import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  {
    name: '22:00 - 05:59',
    total_car: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '06:00 - 07:59',
    total_car: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '08:00 - 10:59',
    total_car: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '11:00 - 12:59',
    total_car: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '13:00 - 15:59',
    total_car: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '16:00 - 18:59',
    total_car: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: '19:00 - 22:59',
    total_car: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={750}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Bar type="monotone" dataKey="pv" stroke="#8884d8" /> */}
          <Bar type="monotone" dataKey="total_car" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}