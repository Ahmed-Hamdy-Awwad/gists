import "../App.css";
import React from "react";
import axios from "axios";

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: "",
			hideTable: true,
		};
	}

	getSearchValue = (e) => {
		this.setState({searchValue: e.target.value});
	};

	getUserGists = () => {
		axios.get(`https://api.github.com/users/` + this.state.searchValue + `/gists`).then((res) => {
			console.log(res.data);
		});
	};

	render() {
		return (
			<div className="app">
				<label>Search Here</label>
				<input onChange={this.getSearchValue}></input>
				<button onClick={this.getUserGists}>Search</button>
			</div>
		);
	}
}

export default Search;
