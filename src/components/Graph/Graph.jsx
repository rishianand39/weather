import styles from "./graph.module.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  YAxis
} from "recharts";
import { useEffect } from "react";



export default function Graph(props) {

  function addDays(){

    props=props?.hourly?.slice(0,20)
    props?.map(data=>{
      const milliseconds = data.dt * 1000;
      const dateObject = new Date(milliseconds);
      const day = dateObject.toLocaleString("en-US", { timeZone: "UTC" });
      data.day=day.split(",")[1];
    })
  }


  useEffect(()=>{
    addDays()
    
  },[])
  return (
    <div className={styles.graph__container}>
    <ResponsiveContainer>
    <LineChart  data={props?.hourly.slice(0,15)}>
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
