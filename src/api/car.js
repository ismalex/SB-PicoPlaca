export default class Car {
	constructor(plateNumber) {
		// Regular Expression to validate plate number ([A-Z]){2,3}-([0-9]){3,4}
		this._plateNumber = plateNumber;
	}


	// Call all the validations to form the result message of the process
	canBeOnTheRoad(dayTimeOfTheWeek) {
		let result = '';
		//Rescriciton on Input date
		let dayAllowed = this.checkDayOfTheWeek(dayTimeOfTheWeek);
		if (!dayAllowed.plates.length) {
			result = dayAllowed.name + ', No restricitons apply on that day. Free to drive along the city.';
		} else {
			//Restictions on Input date and plate number
			if (this.checkPlateNum(dayAllowed)) {
				//Restrictions on Input date, plate number and time of the day
				if (this.checkTimeRestricions(dayTimeOfTheWeek)) {
					result = 'No restricitons for the selected info. Allowed to drive along the city.';
				} else {
					result = 'NOT allowed to drive along city.';
				}
			} else {
				result = 'No restricitons for the selected info. Allowed to drive along the city.';
			}
		}

		return result;
	}

	// Get the restricted plates on the selected day of the week
	// @param dayTimeOfTheWeek user input
	// @return object on the JSON file that matches with the user input
	//
	checkDayOfTheWeek(dayTimeOfTheWeek) {
		//JSON rules coneciton
		var settings = require('../settings.json');
		//Gets number of the day of the week[0-6]
		const dateDay = new Date(dayTimeOfTheWeek).getDay();
		let info = '';
		settings.rules.days.map((day, index) => {
			if (index === dateDay) {
				info = day;
			}
		});
		return info;
	}

	// Get the restricted plates on the selected day of the week
	// @param dayOfWeek object
	// @return bool if the plate number is allowed on the especific day.
	//
	checkPlateNum(dayOfWeek) {
		let lastPlateNum = this._plateNumber.split('').pop();
		let dayName = false;
		dayOfWeek.plates.map((plateNum) => {
			if (plateNum === lastPlateNum) {
				dayName = true;
			}
		});

		return dayName;
	}

	// Add a 0 before a number
	pad(n) {
		return n < 10 ? '0' + n : n;
	}

	// Didive the Input date in day-Month-year-time and prepare it to compare with the rules
	// @param dayOfWeek object
	// @param newHour from rules string
	// @return dateTime object
	//
	prepareDates(dayTimeOfTheWeek, newHour) {
		/* var mmddyyyy = pad(month + 1) + "/" + pad(date) + "/" + year; */
		let test =
			dayTimeOfTheWeek.getFullYear() +
			'-' +
			this.pad(dayTimeOfTheWeek.getMonth() + 1) +
			'-' +
			dayTimeOfTheWeek.getDate() +
			'T' +
			newHour;
		return test;
	}

	// Didive the Input date in day-Month-year-time and prepare it to compare with the rules
	// @param dayOfWeek object
	// @param newHour from rules string
	// @return dateTime object
	//
	checkTimeRestricions(dayTimeOfTheWeek) {
		var settings = require('../settings.json');
		var ret = true;

		const DateTimeInput = new Date(dayTimeOfTheWeek);
		settings.rules.timeAllowance.map((timeRule) => {
			const DateTimeRuleStart = new Date(this.prepareDates(DateTimeInput, timeRule.start));
			const DateTimeRuleEnd = new Date(this.prepareDates(DateTimeInput, timeRule.end));
			console.log(DateTimeRuleStart);
			console.log(DateTimeRuleEnd);

			if (DateTimeInput > DateTimeRuleStart && DateTimeInput < DateTimeRuleEnd) {
				ret = false;
			}
		});
		return ret;
	}
}
