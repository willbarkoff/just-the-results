import * as React from 'react'
import USAMap from 'react-usa-map';

import "./ElectionMap.css"
import * as ElectionResults from './ElectionResults';

interface ElectionMapProps {
	states: ElectionResults.State[]
}

const ElectionMap: React.FC<ElectionMapProps> = (props) => {
	let states: any = {};

	props.states.forEach((state) => {
		let winner = state.candidates.find((candidate) => candidate.winner);
		if (winner && winner.lastName == "Biden") {
			states[state.abbreviation] = {
				fill: "#2895d6"
			}
		} else if (winner && winner.lastName == "Trump") {
			states[state.abbreviation] = {
				fill: "#db1035"
			}
		} else if (winner) {
			states[state.abbreviation] = {
				fill: "#aa32de"
			}
		} else {
			states[state.abbreviation] = {
				fill: "#cccccc"
			}
		}
	})

	return (
		<div className="electionMap">
			{/* whoever made this is bad at coding, so we need the onClick() handler */}
			<USAMap onClick={() => { }} customize={states} />
		</div>
	);
}

export default ElectionMap;