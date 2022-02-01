import { useEffect } from 'react';

const messageStyle = {
	border: '2px solid green',
	borderRadius: '10px',
	color: 'green',
	marginTop: '10px',
	padding: '5px',
	backgroundColor: '#aaa',
};

const MessageAdded = ({ contact, showMessage, message }) => {
	useEffect(() => {
		const showTime = setTimeout(() => showMessage(), 5000);
		return () => clearTimeout(showTime);
	}, [showMessage]);

	return (
		<div style={messageStyle}>
			<h3 style={{ padding: 0, margin: 0 }}>
				{message} {contact.name}
			</h3>
		</div>
	);
};

export default MessageAdded;
