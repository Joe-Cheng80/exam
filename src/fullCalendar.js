import React, { PureComponent } from "react";
import Calendar from "./calendar";
import styles from "./fullcalendar.module.scss";

class FullCalendar extends PureComponent {
	state = {
		year: 2019,
		renderYear: 2019
	};

	dataSource = [
		{
			month: "January"
		},
		{
			month: "February"
		},
		{
			month: "March"
		},
		{
			month: "April"
		},
		{
			month: "May"
		},
		{
			month: "June"
		},
		{
			month: "July"
		},
		{
			month: "August"
		},
		{
			month: "September"
		},
		{
			month: "October"
		},
		{
			month: "November"
		},
		{
			month: "December"
		}
	];

	render() {
		return (
			<div className={styles.fullcalendar}>
				<div className={styles.header}>
					<div className={styles.input}>
						<input
							maxLength="4"
							type="text"
							value={this.state.year}
							onChange={e => {
								this.setState({
									year: e.target.value
								});
							}}
						/>
					</div>
					{!this.state.year.toString().match(/^\d+$/) && (
						<div className={styles.error}>* 請輸入1~9999</div>
					)}
					<div
						className={styles.show}
						onClick={() =>
							this.state.year.toString().match(/^\d+$/) &&
							this.setState({
								renderYear: parseInt(this.state.year)
							})
						}
					>
						SHOW
					</div>
				</div>
				<div className={styles.wrapper}>
					{this.dataSource.map((data, index) => (
						<Calendar
							key={data.month}
							data={data}
							index={index}
							year={this.state.renderYear}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default FullCalendar;
