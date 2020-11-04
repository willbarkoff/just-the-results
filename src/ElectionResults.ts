export interface ElectionResults {
	displayName: string;
	shortDisplayName: string;
	summary: Summary;
	states: State[];
	lastUpdated: LastUpdated;
	exitPolls: boolean;
}

export interface LastUpdated {
	value: Date;
	displayValue: string;
}

export interface State {
	id: number;
	fips: string;
	name: string;
	abbreviation: string;
	displayName: string;
	shortDisplayName: string;
	availableElectoralVotes: number;
	candidates: Candidate[];
	lastUpdated: LastUpdated;
	status: Status;
	reporting: Needed;
	absenteeReporting: Needed;
	incumbent: Incumbent;
	electoralDistricts?: ElectoralDistrict[];
}

export interface Needed {
	displayText: DisplayText;
	displayValue: string;
	value: number;
	threshold?: number;
}

export enum DisplayText {
	ElectoralVotes = "Electoral Votes",
	OfExpectedVoteReporting = "of Expected Vote Reporting",
	Pct = "Pct.",
	The270ToWin = "270 to win",
	TotalEstimatedToBeEarlyAbsentee = "Total Estimated To Be Early/Absentee:",
	TotalVotes = "Total Votes",
}

export interface Candidate {
	id: number;
	displayName: string;
	shortDisplayName: string;
	firstName: string;
	lastName: string;
	party: Party;
	major: boolean;
	incumbent: boolean;
	winner: boolean;
	order?: number;
	partyOrder?: number;
	statistics?: Statistics;
}

export enum Party {
	Democrats = "democrats",
	Independents = "independents",
	Others = "others",
	Republicans = "republicans",
}

export interface Statistics {
	votes: Needed;
	percent: Needed;
	electoralVotes: Needed;
}

export interface ElectoralDistrict {
	id: number;
	code: string;
	name: string;
	abbreviation: string;
	displayName: string;
	shortDisplayName: string;
	availableElectoralVotes: number;
	incumbent: Incumbent;
}

export interface Incumbent {
	party: Party;
}

export interface Status {
	type: Type;
	value: Value;
}

export enum Type {
	In = "in",
	Pre = "pre",
}

export enum Value {
	PollsOpen = "POLLS_OPEN",
	Scheduled = "SCHEDULED",
}

export interface Summary {
	displayText: string;
	total: Total;
	needed: Needed;
	democrats: PartyResults;
	republicans: PartyResults;
	other: Other;
	lastUpdated: LastUpdated;
	reporting: Needed;
}

export interface PartyResults {
	candidate: Candidate;
	total: Total;
	votes: Total;
	winner: boolean;
}

export interface Total {
	displayValue: string;
	value: number;
}

export interface Other {
	total: Total;
}
