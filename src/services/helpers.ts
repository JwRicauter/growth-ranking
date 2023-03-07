type Params = {
	year: string;
	measure: string;
	growthPeriod: string;
  startingYear: string;
}

/**
 * Handler to get the starting year from a growth period.
 *
 * @param year Selected year
 * @param growthPeriod Period of one, two or three years back
 * 
 * @returns startingYear Starting year
 */
export const getStartingYear = ({year, growthPeriod}: Pick<Params, 'year' | 'growthPeriod'>) => {
    let yearAsInt = parseInt(year);
    let startingYear = yearAsInt - parseInt(growthPeriod.split(' ')[0])
    return startingYear.toString();
}

/**
 * Function to construct the URL given params
 *
 * @param year Selected year
 * @param measure Type of measurement to calculate
 * @param growthPeriod Period of one, two or three years back
 * 
 * @returns uriConstruct string of the uri to request
 */
export const constructURL = ({year, measure, startingYear}: Pick<Params, 'year' | 'measure' | 'startingYear'>) : string => {
    let uriConstruct = process.env.REACT_APP_API_URL as string;
		uriConstruct = uriConstruct + '&measures=' + measure.split(' ').join('+');
    uriConstruct = uriConstruct + '&year=' + startingYear + ',' + year;
    return uriConstruct
}

/**
 * Calculates the growth percentage
 *
 * @param data Array that have the measure of the selected and starting year
 * @param year Selected year
 * @param startingYear Starting year
 * 
 * @returns growth percentage 
 */
export const growthCalculation = (data: Record<string, number>, year: string, startingYear: string) => {
    return +(((data[year] - data[startingYear]) / data[startingYear]) * 100).toFixed(2);
}


/**
 * Calculates the growth percentage
 *
 * @param data Response from the API
 * @param year Selected year
 * @param startingYear Starting year
 * 
 * @returns data Array that have the growth from the starting to the selected year
 */
export const orderByGrowth = (data: Record<string, number>[], year: string, startingYear: string, measure: string) => {


    let statesDict : Record<string, Record<string, number> > = {}
    data.forEach(function (item, index) {
			if (statesDict[item['Slug State']] == undefined) {
				statesDict[item['Slug State']] = {}
			} 
			statesDict[item['Slug State']][item['ID Year']] = item[measure]

			if(Object.keys(statesDict[item['Slug State']]).length === 2) {
				statesDict[item['Slug State']]['growth'] = growthCalculation(statesDict[item['Slug State']], year, startingYear)
			}
    });
		

    let items : any = Object.keys(statesDict).map( (key) => { return [key, statesDict[key]] });
    items.sort(
      (first: any, second: any) => { return second[1].growth - first[1].growth }
    );

    return items


}

/**
 * Format a number with commas
 *
 * @param number Number to convert
 * 
 * @returns number formatted with commas as a string
 */
export const numberWithCommas = (number: number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
