import React from "react";
import styles from "./calendar.module.scss";
import PropTypes from "prop-types";

const getDaysInMonth = (month, year) =>
	new Array(31)
		.fill("")
		.map((v, i) => new Date(year, month - 1, i + 1))
		.filter(v => v.getMonth() === month - 1);
const todayYear = new Date().getFullYear();
const todayMonth = new Date().getMonth();
const todayDate = new Date().getDate();
const Calendar = props => {
	const isTodayMonth = props.year === todayYear && props.index === todayMonth;
	const daysInLastMonth =
		props.index + 1 > 1
			? getDaysInMonth(props.index, props.year)
			: getDaysInMonth(12, props.year - 1);
	const daysInMonth = getDaysInMonth(props.index + 1, props.year);
	const rows = [
		{
			lastMonth:
				daysInMonth[0].getDay() > 0
					? daysInLastMonth.slice(-daysInMonth[0].getDay())
					: [],
			thisMonth: daysInMonth.slice(0, 7 - daysInMonth[0].getDay()),
			nextMonth: []
		},
		{
			lastMonth: [],
			thisMonth: daysInMonth.slice(
				7 - daysInMonth[0].getDay(),
				7 - daysInMonth[0].getDay() + 7
			),
			nextMonth: []
		},
		{
			lastMonth: [],
			thisMonth: daysInMonth.slice(
				7 - daysInMonth[0].getDay() + 7,
				7 - daysInMonth[0].getDay() + 14
			),
			nextMonth: []
		},
		{
			lastMonth: [],
			thisMonth: daysInMonth.slice(
				7 - daysInMonth[0].getDay() + 14,
				7 - daysInMonth[0].getDay() + 21
			),
			nextMonth: []
		},
		{
			lastMonth: [],
			thisMonth: daysInMonth.slice(
				7 - daysInMonth[0].getDay() + 21,
				7 - daysInMonth[0].getDay() + 28
			),
			nextMonth:
				daysInMonth.slice(
					7 - daysInMonth[0].getDay() + 21,
					7 - daysInMonth[0].getDay() + 28
				).length < 7
					? Array(
							7 -
								daysInMonth.slice(
									7 - daysInMonth[0].getDay() + 21,
									7 - daysInMonth[0].getDay() + 28
								).length
					  )
							.fill()
							.map((day, index) => index + 1)
					: []
		},
		{
			lastMonth: [],
			thisMonth: daysInMonth.slice(
				7 - daysInMonth[0].getDay() + 28,
				daysInMonth.length
			),
			nextMonth:
				daysInMonth.slice(
					7 - daysInMonth[0].getDay() + 28,
					daysInMonth.length
				).length > 0
					? Array(
							7 -
								daysInMonth.slice(
									7 - daysInMonth[0].getDay() + 28,
									daysInMonth.length
								).length
					  )
							.fill()
							.map((day, index) => index + 1)
					: Array(7)
							.fill()
							.map(
								(day, index) =>
									index +
									7 -
									daysInMonth.slice(
										7 - daysInMonth[0].getDay() + 21,
										7 - daysInMonth[0].getDay() + 28
									).length +
									1
							)
		}
	];
	return (
		<div className={styles.calendar} key={props.data.month}>
			<div className={styles.month}>{props.data.month}</div>
			<div className={styles.weekrow}>
				<div className={styles.week}>S</div>
				<div className={styles.week}>M</div>
				<div className={styles.week}>T</div>
				<div className={styles.week}>W</div>
				<div className={styles.week}>T</div>
				<div className={styles.week}>F</div>
				<div className={styles.week}>S</div>
			</div>
			<div className={styles.date}>
				{rows.map((row, index) => (
					// TODO: 暫時找不到好的key 先用index
					<div className={styles.daterow} key={index}>
						{row.lastMonth.length > 0 &&
							row.lastMonth.map(day => (
								<div key={day} className={styles.lastmonth}>
									{new Date(day).getDate()}
								</div>
							))}
						{row.thisMonth.length > 0 &&
							row.thisMonth.map(day => {
								console.log(isTodayMonth);
								return (
									<div
										key={day}
										className={
											isTodayMonth &&
											new Date(day).getDate() ===
												todayDate
												? styles.today
												: styles.thismonth
										}
									>
										{new Date(day).getDate()}
									</div>
								);
							})}
						{row.nextMonth.length > 0 &&
							row.nextMonth.map(day => (
								<div key={day} className={styles.nextmonth}>
									{day}
								</div>
							))}
					</div>
				))}
			</div>
		</div>
	);
};

Calendar.propTypes = {
	data: PropTypes.object,
	index: PropTypes.number,
	year: PropTypes.number
};

export default Calendar;
