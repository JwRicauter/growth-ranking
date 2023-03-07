/* bootstrap */
import Card from 'react-bootstrap/Card';

/* helpers */
import { numberWithCommas } from "../../services/helpers";


type Params = {
	slugState: string; 
	stateName: string;
	measureThisYear: number;
	growth: number;
	index:number;
	measure: string
}

export const CardFlag = ({slugState, stateName, measureThisYear, growth, index, measure}: Params) => {

    return (
        <div className='col-2 p-2' key={index + 1}>
					<Card bg={'dark'} className='w-100'>
						<Card.Img 
							variant="top" 
							src={require(`../../media/images/flags/${slugState}.jpg`)} 
						/>
						<Card.Body>
								<Card.Title>
									<h5 className='text-white mb-0'>
										{index + 1}.   
										<span className='text-capitalize px-2'>{stateName}</span>
									</h5>
								</Card.Title>
								<p className='font-weight-bold text-white mb-0'>
									{measure !== 'Population' && '$ '} 
									{ measureThisYear && numberWithCommas(measureThisYear) } 
									{measure == 'Population' && ' hab'} 
								</p>
									{growth} % Growth
						</Card.Body>
					</Card>
    	</div>
    )
}