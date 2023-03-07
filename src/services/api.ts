import { constructURL, orderByGrowth, getStartingYear } from "./helpers"

type Params = {
	year: string;
	measure: string;
	growthPeriod: string;
	signal: AbortSignal;
}

export const getData = async ({year, measure, growthPeriod, signal}: Params)  => {
	
	let startingYear = getStartingYear({year, growthPeriod})
	let uri = await constructURL({year, measure, startingYear});

	let response = await fetch( uri , {
		method: 'GET',
		signal: signal
	}).then(res => res.json())
	.then(res => {
		return orderByGrowth(res.data, year, startingYear, measure) 
	}).catch(
		err => {return err}
	)

	return response;

}

