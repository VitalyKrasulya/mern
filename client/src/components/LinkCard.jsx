import React from 'react';

const LinkCard = ({link}) => {
	return (
		<>
			<h2>Detail minified link</h2>
			<p>Long link: <a href={link.from} target="_blank" rel="noreferrer noopener">{link.from}</a></p>
			<p>Short link: <a href={link.to} target="_blank" rel="noreferrer noopener">{link.to}</a></p>
			<p>Creation date: <strong>{new Date(link.date).toLocaleString()}</strong></p>
			<p>Clicks count: <strong>{link.clicks}</strong></p>
		</>
	);
};

export default LinkCard;