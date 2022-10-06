import {Alert} from '@mantine/core';
import {IconAlertOctagon} from '@tabler/icons';
import React from 'react';

const ErrHandler = ({children, isError = false}) => {
	if (isError) {
		return (
			<Alert icon={<IconAlertOctagon size={18} />} title={children} color='red' >
			</Alert>
		);
	}

	return <></>;
};

export default ErrHandler;
