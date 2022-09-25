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



export default function Graph(props) {


  return (
    <div className={styles.graph__container}>
    <ResponsiveContainer>
    <LineChart  data={props?.hourly.slice(0,20)}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="temp" padding={{ left: 10, right: 30 }} />
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
