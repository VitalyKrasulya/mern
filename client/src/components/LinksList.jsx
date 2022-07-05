import React from 'react';
import {Link} from "react-router-dom";

const LinksList = ({links}) => {
	if (links.length === 0) {
		return <p className="center">No links</p>
	}
	
	return (<table className="highlight">
			<thead>
			<tr>
				<th>#</th>
				<th>Long link</th>
				<th>Short link</th>
				<th>Creation date</th>
				<th>Clicks</th>
				<th></th>
			</tr>
			</thead>
			
			<tbody>
			{links.map((link, ind) => {
				return (
					<tr key={link._id}>
						<td>{ind + 1}</td>
						<td>{link.from}</td>
						<td><a href={link.to} target="_blank" rel="noreferrer noopener">{link.to}</a></td>
						<td>{new Date(link.date).toLocaleString()}</td>
						<td>{link.clicks}</td>
						<td>
							<Link to={`/detail/${link._id}`}>
								Detail
							</Link>
						</td>
					</tr>
				)
			})}
			</tbody>
		</table>);
};

export default LinksList;