/* react functions */
import { useState } from 'react';

/* bootstrap */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

/* styles and media */
import './Bar.scss';
import logo  from '../../media/images/lative-logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';


type Props = {
	setYear: (year: string) => void;
	setMeasure: (measure: string) => void;
	setGrowthPeriod: (growthPeriod: string) => void;
}

export const Bar = ({setYear, setMeasure, setGrowthPeriod}: Props) => {

    const [active, setActive] = useState(true);     /* state variable to toogle the bar */

    return (
      	<div 
				  className={`flex-column ${active ? "bar-active": "bar-inactive"}`}
				>
          <div className='slider-core pt-3'>
						<img
							src={logo}
							width="100"
							height="50"
							className="d-inline-block pb-3"
							alt="Lative Logo"
						/>

						{ /* Toggle button */}
						<Button 
							className='btn' 
							variant='dark' 
							onClick={() => setActive(!active)}
						>
								<FontAwesomeIcon icon={faBars} />
						</Button>
                
          </div>



          <div className='filter-section'>



						<h5 className='mt-3 text-white'>
							Growth Ranking of U.S. States
						</h5>

						{ /* Filters */}

						<p className='text-white mb-0 mt-5'>
							Year
						</p>

						<Form.Select
							aria-label="Select the year" 
							className='px-5 bg-transparent text-white'
							onChange={ (e) => setYear(e.target.value) }
						>
							<option value="2019" className='text-dark'>2019</option>
							<option value="2018" className='text-dark'>2018</option>
							<option value="2017" className='text-dark'>2017</option>
							<option value="2016" className='text-dark'>2016</option>
							<option value="2015" className='text-dark'>2015</option>
						</Form.Select>



						<p className='text-white mb-0 mt-3'>
							Measure
						</p>

						<Form.Select
							aria-label="Select the year" 
							className='px-5 bg-transparent text-white'
							onChange={ (e) => setMeasure(e.target.value) }
						>
							<option value="Household Income" className='text-dark'>Household Income</option>
							<option value="Population" className='text-dark'>Population</option>
							<option value="Property Value" className='text-dark'>Property Value</option>
						</Form.Select>



						<p className='text-white mb-0 mt-3'>
							Growth Period
						</p>

						<Form.Select
							aria-label="Select the year" 
							className='px-5 bg-transparent text-white'
							onChange={ (e) => setGrowthPeriod(e.target.value) }
						>
							<option value="1 Year" className='text-dark'>1 Year</option>
							<option value="2 Years" className='text-dark'>2 Years</option>
							<option value="3 Years" className='text-dark'>3 Years</option>
						</Form.Select>

          </div>
      	</div>
    );
}

