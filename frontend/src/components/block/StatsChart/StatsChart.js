import {LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip} from "recharts";

export default function StatsChart (props) {

    const formatY = (tick) => {
        return `$${(tick / 100).toFixed(2)}`
    }

    const formatX = (tick) => {
        return tick.slice(0, 10)
    }

    return (
        <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart data={props.data} margin={{top: 20}}>
                <Line type={"monotone"} name={"price"} dataKey={'new_price'} stroke={"#006d77"} />
                <Legend/>
                <Tooltip formatter={(price) => formatY(price)} labelFormatter={(date) => formatX(date)}/>
                <CartesianGrid stroke={"#ccc"} />
                <XAxis dataKey={"created_at"} tickFormatter={formatX}/>
                <YAxis tickFormatter={formatY}/>
            </LineChart>
        </ResponsiveContainer>
    );

}