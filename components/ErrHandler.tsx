import {Alert} from '@mantine/core';
import {IconAlertOctagon} from '@tabler/icons';
import React from 'react';
import PropTypes from 'prop-types';

const ErrHandler = ({children, isError = false}) => {
	if (isError) {
		return (
			<Alert icon={<IconAlertOctagon size={18} />} title={children as string} color='red' >
			</Alert>
		);
	}

	return <></>;
};

ErrHandler.propTypes = {
	children: PropTypes.string,
	isError: PropTypes.bool,
};

export default ErrHandler;

