import React from 'react';
import Form from '../Form'; // Importamos el formulario genérico

// Definición de los campos para el formulario de creación de usuarios
const userFields = [
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
  {
    name: 'password',
    label: 'Contraseña',
    type: 'password',
    placeholder: 'Ingrese una contraseña segura',
    required: true,
  },
  // Puedes agregar más campos aquí según tus necesidades
  // Por ejemplo, un campo para el rol del usuario:
  // {
  //   name: 'role',
  //   label: 'Rol',
  //   type: 'text', // O podría ser un 'select' si creas un componente para ello
  //   placeholder: 'Ej: admin, user, editor',
  //   required: true,
  // }
];

// Estado inicial para el formulario de usuarios
const initialUserState = {
  name: '',
  email: '',
  password: '',
  // role: '',
};

export const AddUserForm = ({ onFormSubmit }) => {
  // Esta función se ejecutará al enviar el formulario
  const handleAddUser = (formData) => {
    console.log('Datos del nuevo usuario:', formData);
    // Aquí iría la lógica para enviar los datos a tu API,
    // mostrar una alerta de éxito/error, y posiblemente
    // cerrar un modal y refrescar la tabla de usuarios.
    alert(`Usuario creado (revisa la consola):\n${JSON.stringify(formData, null, 2)}`);
    if (onFormSubmit) {
      onFormSubmit();
    }
  };

  return (
    <div>
      <Form
        initialState={initialUserState}
        fields={userFields}
        onSubmit={handleAddUser}
        buttonText="Crear Usuario"
      />
    </div>
  );
};
