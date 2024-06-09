import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import DUMMY_MESSAGES from '../../dummyData/dummyMessages.json';

import classes from './PopupMessage.module.css';

const popupMessage = document.getElementById('popup-message');

const PopupMessage = () => {
	return ReactDOM.createPortal(
		<div className={classes['movable-popup']}>
			{/* Header */}

			<div className={classes.header}>
				<h4>Customer Support</h4>
				<button>Let's Chat App</button>
			</div>

			{/* Message content */}

			<div className={classes.message}>
				<ul>
					{DUMMY_MESSAGES.map((mess, ind) => (
						<li
							key={mess.message + ind}
							className={
								mess.person === 'client' ? classes.client : classes.admin
							}
						>
							{mess.person === 'admin' && (
								<FontAwesomeIcon icon={faUser} size='2x' />
							)}
							<p>{`
            ${mess.person === 'admin' ? 'ADMIN: ' : ''}
            ${mess.message}
            `}</p>
						</li>
					))}
				</ul>
			</div>

			{/* Write message */}

			<div className={classes.typing}>
				<FontAwesomeIcon icon={faUser} size='2x' />
				<input type='text' placeholder='Enter Message!' />
				<i className='fa fa-paperclip' />
				<i className='fa fa-smile-o' />
				<i
					className='fa fa-paper-plane-o'
					style={{ color: 'var(--blue-light)' }}
				/>
			</div>
		</div>,
		popupMessage
	);
};

export default PopupMessage;
