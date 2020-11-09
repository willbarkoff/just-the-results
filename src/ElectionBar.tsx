import * as React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import * as ElectionResults from "./ElectionResults";

interface ElectionBarProps {
	results: ElectionResults.Summary;
}

const ElectionBar: React.FC<ElectionBarProps> = (props) => {
	let ecData = [
		{
			name: 'Electoral College',
			republican: props.results.republicans.total.value,
			democratic: props.results.democrats.total.value,
			other: props.results.other.total.value,
			unknown: props.results.total.value - (props.results.republicans.total.value + props.results.democrats.total.value + props.results.other.total.value)
		}
	]
	let popData = [
		{
			name: 'Popular Vote',
			republican: props.results.republicans.votes.value,
			democratic: props.results.democrats.votes.value,
		}
	]

	return <div>
		<div className="columns">
			<div className="column">
				<BarChart
					width={200}
					height={500}
					data={ecData}
					layout="horizontal"
					margin={{ left: 0, right: 0, top: 5 }}
				>
					<Tooltip cursor={false} />
					<XAxis dataKey="name" />
					<YAxis domain={[0, 538]} ticks={[0, 270, 538]} tickFormatter={(value) => value % 538} />
					<Bar dataKey="republican" stackId="a" fill="#db1035" />
					<Bar dataKey="unknown" stackId="a" fill="#cccccc" />
					<Bar dataKey="other" stackId="a" fill="#aa32de" />
					<Bar dataKey="democratic" stackId="a" fill="#2895d6" />
				</BarChart>
			</div>
			<div className="column">
				<BarChart
					width={200}
					height={500}
					data={popData}
					layout="horizontal"
					margin={{ left: 0, right: 0, top: 5 }}
				>
					<Tooltip cursor={false} />
					<XAxis dataKey="name" />
					<YAxis domain={[0, "datamax"]} orientation="right" tickFormatter={(value) => `${Math.round(value / 1000000)}M`} />
					<Bar dataKey="republican" stackId="a" fill="#db1035" />
					<Bar dataKey="democratic" stackId="a" fill="#2895d6" />
				</BarChart>
			</div>
		</div>
	</div>
}

export default ElectionBar;
