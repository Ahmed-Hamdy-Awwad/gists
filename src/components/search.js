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
					let last3Forks = resp.data.splice(length - 3, length - 1);
					this.setState({data: this.state.data.concat({id: g.id, description: g.description, last3Forks: last3Forks})});
				});
			});
		});
	};

	render() {
		return (
			<div className="app">
				<div>
					<label>Search Here</label>
					<input onChange={this.getSearchValue}></input>
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
