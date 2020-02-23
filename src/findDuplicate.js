import React from "react";
import styles from "./findDuplicate.module.scss";

export class FindDuplicate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checkedSource: [],
			duplicate: { num: -1, index: -1 },
			inputValue: ""
		};
	}

	checkSource = source => {
		const checkedSource = source.filter(
			item => !isNaN(item) && item % 1 === 0 && item !== ""
		);
		if (checkedSource.length >= 2) {
			this.setState(
				{
					checkedSource: checkedSource
				},
				this.findDuplicate
			);
		} else {
			this.setState({
				duplicate: { num: -1, index: -1 }
			});
		}
	};

	findDuplicate = () => {
		const { checkedSource } = this.state;
		let number = -1;
		let numberIndex = -1;

		// 若非寫成input形式, 單純function有更加算法
		checkedSource.forEach((num, index) => {
			if (
				checkedSource.indexOf(num, index + 1) > -1 &&
				(checkedSource.indexOf(num, index + 1) < numberIndex ||
					numberIndex === -1) &&
				number !== num
			) {
				number = num;
				numberIndex = checkedSource.indexOf(num, index + 1);
			}
		});

		this.setState({
			duplicate: {
				num: number,
				index: numberIndex
			}
		});
	};

	render() {
		const { duplicate, inputValue } = this.state;
		return (
			<div className={styles.exam2}>
				<div>
					array: [
					<input
						value={inputValue}
						onChange={e => {
							this.setState({
								inputValue: e.target.value
							});
							// TODO:尚未處理whitespace
							this.checkSource(e.target.value.trim().split(","));
						}}
					/>
					]
				</div>
				<>
					<div>duplicate: {duplicate.num}</div>
					<div>index: {duplicate.index}</div>
				</>
			</div>
		);
	}
}

export default FindDuplicate;
