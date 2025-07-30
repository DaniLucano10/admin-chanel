import React from 'react';
import { Link } from 'react-router-dom';

export const Unauthorized = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>403 - Acceso denegado</h1>
      <p>No tienes permiso para ver esta página.</p>
      <Link to="/admin">Volver al inicio</Link>
    </div>
  );
};
