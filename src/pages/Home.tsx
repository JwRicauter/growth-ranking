import { useState, useEffect } from "react";
import { Bar } from "../components/Bar/Bar";
import { getData } from "../services/api";


export const Home = () => {

    const [year, setYear] = useState('2019');
    const [measure, setMeasure] = useState('Property Value');
    const [growthPeriod, setGrowthPeriod] = useState('1 Year')
		const [data, setData] = useState([]);


		useEffect(() => {

			const controller = new AbortController();
    	const signal = controller.signal;

			getData({year, measure, growthPeriod, signal}).then(res => {
				setData(res);
			})
			return () => {
				controller.abort();
			}

		}, [year, measure, growthPeriod])


    return (
        <>
					<Bar 
						setYear={setYear}
						setMeasure={setMeasure}
						setGrowthPeriod={setGrowthPeriod}
					/>

					{
						data.length > 0 && data.map((state, index) => {
							let slugState = state[0];
							let growth = state[1]['growth']
							let measureThisYear = state[1][parseInt(year)]

							console.log(slugState)
							console.log(growth)
							console.log(measureThisYear)
							return (
								<></>
							)

						})
					}



					
        </>
    )
}