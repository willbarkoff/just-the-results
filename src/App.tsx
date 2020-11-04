import * as React from "react";
import ElectionBar from "./ElectionBar";
import { ElectionResults } from "./ElectionResults";
import "bulma/css/bulma.min.css"
import ElectionMap from "./ElectionMap";


interface AppState {
	results?: ElectionResults;
	socket?: WebSocket;
	sid?: String;
}

class App extends React.Component<{}, AppState> {
	static resultsURL = "https://fastcast.semfs.engsvc.go.com/public/websockethost"

	constructor(props: {}) {
		super(props);
		this.state = {
			results: null,
		}
		this.load();
	}

	async onmessage(event) {
		let data = JSON.parse(event.data)
		if (data.pl) {
			let response = await fetch(data.pl);
			if (!response.ok || response.statusText != "OK") {
				alert("an error occured :(")
				console.error(response);
			}

			let respData = await response.json();
			this.setState({
				results: respData,
			})
		}
	}

	async load() {
		let webSocketResp = await fetch(App.resultsURL);
		let webSocketInfo = await webSocketResp.json();
		let webSocket = new WebSocket(`wss://${webSocketInfo.ip}:${webSocketInfo.securePort}/FastcastService/pubsub/profiles/11001?TrafficManager-Token=${webSocketInfo.token}`)

		let sid: string;

		let that = this;

		webSocket.onopen = () => {
			webSocket.send(`{"op":"C"}`)
			webSocket.onmessage = (event) => {
				let data = JSON.parse(event.data);
				sid = data.sid;
				webSocket.send(JSON.stringify({ "op": "S", "sid": sid, "tc": "elections-2020-national-map-electoral" }))
				webSocket.onmessage = this.onmessage.bind(that);
			}
		}
		this.setState({
			socket: webSocket
		})
	}

	render() {
		if (!this.state.results) {
			return <p>Loading...</p>
		}
		return <div className="columns">
			<div className="column is-one-fifth">
				<ElectionBar results={this.state.results.summary} />
			</div>
			<div className="column is-four-fifths">
				<ElectionMap states={this.state.results.states} />
			</div>
		</div>
	}
}

export default App;