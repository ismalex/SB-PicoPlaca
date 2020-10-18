import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2)
		}
	}
}));

export default function UserAlerts(props) {
	const classes = useStyles();

	return props.show ? (
		<div className={classes.root}>
			<Alert severity="info">{props.message}</Alert>
		</div>
	) : (
		''
	);
}
