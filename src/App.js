import React, { useState, useRef } from 'react';
import Car from './api/car';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Alert from './Components/UserAlerts';

// validations.carplateValidation
// en la carpeta Car add the validations, and the class

export default function App() {
	const [ ResultMessage, setResultMessage ] = useState('');
	const [ showMessage, setShowMessage ] = useState(false);
	const dateTimeInput = useRef();
	const plateInput = useRef();

	/* ADD THE INPUT REF TO THE STATE
	TO CREATE MORE COMPONENTS */

	function HandleClick() {
		// create a new instance of the Car Class
		if (plateInput.current.value !== '') {
			let carObj = new Car(plateInput.current.value);
			setResultMessage(carObj.canBeOnTheRoad(dateTimeInput.current.value));
			setShowMessage(true);
		}
	}

	return (
		<div>
			<Grid container direction="row">
				<Grid item xs />
				<Grid item xs xs={5} justify="center" alignItems="center">
					<Typography variant="h2" component="h2">
						Pico y Placa Predictor
					</Typography>
					<br/>
					<Grid container direction="row" justify="center" alignItems="center" spacing={3}>
						<Grid item xs>
							<TextField
								id="outlined-basic"
								label="License Plate"
								variant="outlined"
								defaultValue="7"
								inputRef={plateInput}
							/>
						</Grid>
						<Grid item xs>
							<TextField
								id="datetime-local"
								label="Date to check"
								type="datetime-local"
								variant="outlined"
								defaultValue="2020-05-21T10:30"
								InputLabelProps={{
									shrink: true
								}}
								inputRef={dateTimeInput}
							/>
						</Grid>
						<Grid item xs>
							<Button variant="contained" disableElevation onClick={HandleClick}>
								check
							</Button>
						</Grid>
						<Alert message={ResultMessage} show={showMessage} />
					</Grid>
				</Grid>

				<Grid item xs />
			</Grid>
		</div>
	);
}
