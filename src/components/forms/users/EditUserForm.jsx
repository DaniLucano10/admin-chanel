import React from 'react';
import Form from '../Form'; // Reutilizamos el formulario genérico

// La definición de campos es la misma que para añadir un usuario,
// pero a menudo para editar no se pide la contraseña o se maneja de forma diferente.
// Por simplicidad, aquí la omitiremos.
const userEditFields = [
  {
    name: 'name',
    label: 'Nombre Completo',
    type: 'text',
    placeholder: 'Ej: John Doe',
    required: true,
  },
  {
    name: 'email',
    label: 'Correo Electrónico',
    type: 'email',
    placeholder: 'Ej: john.doe@example.com',
    required: true,
  },
  // Nota: Generalmente no se incluye el campo de contraseña en un formulario de edición
  // a menos que se quiera cambiar. Se manejaría en un formulario separado de "Cambiar Contraseña".
];

/**
 * Componente para editar un usuario existente.
 * @param {object} user - El objeto del usuario a editar.
 * @param {function} onFormSubmit - La función a llamar cuando el formulario se envía.
 */
export const EditUserForm = ({ user, onFormSubmit }) => {
  // El estado inicial se llena con los datos del usuario que se está editando.
  const initialUserState = {
    id: user.id, // Es importante mantener el ID
    name: user.name,
    email: user.email,
  };

  const handleEditUser = (formData) => {
    console.log('Datos del usuario a actualizar:', formData);
    // Aquí iría la lógica para enviar los datos a tu API (ej: PUT /api/users/{user.id})
    alert(`Usuario actualizado (revisa la consola):\n${JSON.stringify(formData, null, 2)}`);
    if (onFormSubmit) {
      onFormSubmit(); // Cerramos el modal o actualizamos la UI
    }
  };

  return (
    <div>
      <Form
        initialState={initialUserState}
        fields={userEditFields}
        onSubmit={handleEditUser}
        buttonText="Guardar Cambios"
      />
    </div>
  );
};
