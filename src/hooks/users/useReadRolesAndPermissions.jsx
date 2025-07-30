import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../useAuth';

export const useReadRolesAndPermissions = () => {
	const [loading, setLoading] = useState(true);
	const [roles, setRoles] = useState([]);
	const [permissions, setPermissions] = useState([]);
	const [error, setError] = useState(null);
	const { getToken, getUser } = useAuth();

	const fetchRolesAndPermissions = useCallback(async () => {
		setLoading(true);
		setError(null);
		
		try {
			const token = getToken();
			const user = getUser();

			if (!token || !user?.sub) {
				throw new Error('Usuario no autenticado o ID de usuario no encontrado.');
			}

			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/users/roles-and-permissions?user_id=${
					user.sub
				}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			setRoles(response.data.roles || []);
			setPermissions(
				response.data.permissions?.map((p) => p.guard_name) || []
			);
		} catch (err) {
			setRoles([]);
			setPermissions([]);
			setError(
				err.response
					? err.response.data
					: 'A ocurrido un error al listar los datos.'
			);
		} finally {
			setLoading(false);
		}
	}, [getToken, getUser]);

	useEffect(() => {
		fetchRolesAndPermissions();
	}, [fetchRolesAndPermissions]);

	return {
		loading,
		roles,
		permissions,
		error,
		fetchRolesAndPermissions,
	};
};
