
import mockFetch from "./mocks/mocksFetch";
import { 
	getStartingYear, constructURL, growthCalculation, 
	orderByGrowth, numberWithCommas
} from './services/helpers';


/* -------------------------------------------------------------- */
/* --------------------- Testing behaviour ----------------------*/

beforeEach(() => {
   jest.spyOn(window, "fetch").mockImplementation(mockFetch);
})

afterEach(() => {
   jest.restoreAllMocks();
});


/* -------------------------------------------------------------- */
/* ------------------ Testing functionalities --------------------*/


describe('getStartingYear', () => {
  it('Given a growth period of 1 year, test the starting date', () => {
     expect( getStartingYear({year: '2019', growthPeriod:'1 Year'}) ).toStrictEqual('2018');
	})
});
describe('getStartingYear', () => {
  it('Given a growth period of 2 year, test the starting date', () => {
     expect( getStartingYear({year: '2017', growthPeriod:'2 Years'}) ).toStrictEqual('2015');
	})
});
describe('getStartingYear', () => {
  it('Given a growth period of 3 year, test the starting date', () => {
     expect( getStartingYear({year: '2016', growthPeriod:'3 Years'}) ).toStrictEqual('2013');
	})
});

describe('construct URL', () => {
  it('Construct the url to request hosehold income from 2017 to 2019', () => {
    expect( constructURL({year: '2019', measure: 'Household Income', startingYear:'2017'}) ).toStrictEqual(
			'https://datausa.io/api/data?drilldowns=State&measures=Household+Income&year=2017,2019'
		);
	})
});
describe('construct URL', () => {
  it('Construct the url to request population from 2016 to 2017', () => {
    expect( constructURL({year: '2017', measure: 'Population', startingYear:'2016'}) ).toStrictEqual(
			'https://datausa.io/api/data?drilldowns=State&measures=Population&year=2016,2017'
		);
	})
});
describe('construct URL', () => {
  it('Construct the url to request property values from 2017 to 2019', () => {
    expect( constructURL({year: '2019', measure: 'Property Value', startingYear:'2017'}) ).toStrictEqual(
			'https://datausa.io/api/data?drilldowns=State&measures=Property+Value&year=2017,2019'
		);
	})
});

describe('Growth calculation', () => {
  it('Calculates growth of property value that went from $141,300 in 2017 to $147,900 in 2018', () => {
    expect( growthCalculation({'2018': 147900, '2017': 141300} , '2018', '2017')).toStrictEqual( 4.67 );
	})
});

const requestedData = [
	{ "State": "Alabama", "ID Year": 2019, "Year": "2019", "Population": 4876250, "Slug State": "alabama" },
	{ "State": "Alaska", "ID Year": 2019, "Year": "2019", "Population": 737068, "Slug State": "alaska" },
	{ "State": "Arizona", "ID Year": 2019, "Year": "2019", "Population": 7050299, "Slug State": "arizona" },
	{ "State": "Arkansas", "ID Year": 2019, "Year": "2019", "Population": 2999370, "Slug State": "arkansas" },
	{ "State": "Alabama", "ID Year": 2017, "Year": "2017", "Population": 4850771, "Slug State": "alabama" },
	{ "State": "Alaska", "ID Year": 2017, "Year": "2017", "Population": 738565, "Slug State": "alaska" },
	{ "State": "Arizona", "ID Year": 2017, "Year": "2017", "Population": 6809946, "Slug State": "arizona" },
	{ "State": "Arkansas", "ID Year": 2017, "Year": "2017", "Population": 2977944, "Slug State": "arkansas" }
]

const expectedOrderedData = [
	[ 'arizona', {2017: 6809946, 2019: 7050299, "growth": 3.53} ],
	[ 'arkansas', {2017: 2977944, 2019: 2999370, "growth": 0.72} ],
	[ 'alabama', {2017: 4850771, 2019: 4876250, "growth": 0.53} ],
	[ 'alaska', {2017: 738565, 2019: 737068, "growth": -0.2} ]
]

describe('ordering function', () => {
  it('Order by growth a small amount of data', () => {
    expect( orderByGrowth( requestedData, '2019', '2017', 'Population' )).toStrictEqual(
			expectedOrderedData
		);
	})
});


describe('number formatting', () => {
  it('Five digits', () => {
     expect( numberWithCommas(55200) ).toStrictEqual('55,200');
	})
});
describe('number formatting', () => {
  it('One digit', () => {
     expect( numberWithCommas(1) ).toStrictEqual('1');
	})
});
describe('number formatting', () => {
  it('Six digits', () => {
     expect( numberWithCommas(1000000) ).toStrictEqual('1,000,000');
	})
});