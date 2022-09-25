import styles from "./graph.module.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";

export default function Graph(props) {
  const [data, setData] = useState(null);


  // adding time key in graph data
  function addDays() {
    let data = props?.hourly?.slice(0, 15);
    data?.map((data) => {
      const milliseconds = data.dt * 1000;
      const dateObject = new Date(milliseconds);
      const day = dateObject.toLocaleString("en-US", { timeZone: "UTC" });
      data.day = day.split(",")[1];
    });
    setData(data);
  }

  useEffect(() => {
    addDays();
  }, [props]);


  return (
    <div className={styles.graph__container}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" padding={{ left: 10, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
