/* react functions */
import { useState, useEffect } from "react";

/* components */
import { Bar } from "../components/Bar/Bar";
import { CardFlag } from "../components/Card/Card";

/* services */
import { getData } from "../services/api";


export const Home = () => {

    const [year, setYear] = useState<string>('2019');
    const [measure, setMeasure] = useState<string>('Household Income');
    const [growthPeriod, setGrowthPeriod] = useState<string>('1 Year')
		const [data, setData] = useState<(any)[]>([]);


		useEffect(() => {
			const controller = new AbortController();
    	const signal = controller.signal;
			setData([]);
			getData({year, measure, growthPeriod, signal}).then(res => {
				setData(res);
			})
			return () => {
				controller.abort();
			}

		}, [year, measure, growthPeriod])


    return (
				<div className='d-flex flex-wrap content-width'>
					<Bar 
						setYear={setYear}
						setMeasure={setMeasure}
						setGrowthPeriod={setGrowthPeriod}
					/>

					<div className='flex-column overflow w-75 p-5'>
						<div className='row'>
							{
								data.length > 0 ? data.map((state, index) => {
									let slugState : string = state[0];
									let stateName : string = state[0].split('-').join(' ');
									let growth : number = state[1]['growth']
									let measureThisYear : number = state[1][parseInt(year)]
									return (
										<CardFlag 
											slugState={slugState}
											stateName={stateName}
											growth={growth}
											measureThisYear={measureThisYear}
											index={index}
											key={index}
											measure={measure}
										/>
									)
									}) :
									<img
										src={require('../media/images/spinner.gif')}
										width="20"
										height="20"
										style={{width : '100px', height : 'auto'}}
										className="d-block mx-auto mt-5"
										alt="spinner"
									/>
								}
						</div>						
					</div>

        </div>
    )
}
