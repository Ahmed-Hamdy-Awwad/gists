import "../App.css";
import React from "react";
import axios from "axios";
import GistCard from "./gist";

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			searchValue: "",
		};
	}

	getSearchValue = (e) => {
		this.setState({searchValue: e.target.value});
	};

	getUserGists = () => {
		this.setState({data: []});
		axios.get(`https://api.github.com/users/` + this.state.searchValue + `/gists`).then((res) => {
			res.data.forEach((g) => {
				axios.get(g.forks_url).then((resp) => {
					let length = resp.data.length;
					let filesKeys = Object.keys(g.files);
					let last3Forks = resp.data.splice(length - 3, length - 1);
					this.setState({
						data: this.state.data.concat({
							id: g.id,
							files: g.files,
							keys: filesKeys,
							last3Forks: last3Forks,
							description: g.description,
						}),
					});
				});
			});
		});
	};

	render() {
		return (
			<div className="app">
				<div>
					<label className="lable">Enter a user name to get his / her public gists</label>
					<br></br>
					<input onChange={this.getSearchValue} className="input"></input>
					<button onClick={this.getUserGists}>Search</button>
					{this.state.data.map((gist, index) => {
						return <GistCard gist={gist} key={index} />;
					})}
				</div>
			</div>
		);
	}
}

export default Search;
