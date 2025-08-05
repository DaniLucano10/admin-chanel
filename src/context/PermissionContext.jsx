import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
// import { useReadRolesAndPermissions } from '../hooks/users/useReadRolesAndPermissions';

const PermissionContext = createContext();

export const usePermissions = () => {
	const context = useContext(PermissionContext);
	if (!context) {
		throw new Error(
			'usePermissions debe ser utilizado dentro de un PermissionProvider'
		);
	}
	return context;
};

export const PermissionProvider = ({ children }) => {
	// const { permissions, loading, error } = useReadRolesAndPermissions();
	const permissions = [];
	const loading = false;
	const error = null;

	return (
		<PermissionContext.Provider value={{ permissions, loading, error }}>
			{children}
		</PermissionContext.Provider>
	);
};

PermissionProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
