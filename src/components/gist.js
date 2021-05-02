import "../App.css";
import React from "react";

class GistCard extends React.Component {
	render() {
		return (
			<div className="grid-container card">
				<div>ID</div>
				<div>Description</div>
				<div>File Type</div>
				<div className="extended">Forks Users</div>
				<div>{this.props.gist.id}</div>
				<div>{this.props.gist ? this.props.gist.description : ""}</div>
				<div>python.text/json</div>
				{this.props.gist.last3Forks.map((fork, index) => {
					return (
						<div key={index}>
							{fork.owner.login}
							<image src={fork.owner.avatar_url} width="50" height="50" />
						</div>
					);
				})}
			</div>
		);
	}
}

export default GistCard;
