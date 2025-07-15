import React, { useState } from 'react';
import { Input } from '../ui/input/Input';
import { Button } from '../ui/button/Button';

// Hook personalizado para manejar el estado del formulario
const useFormState = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return { formData, handleChange };
};

/**
 * Componente de formulario genérico y reutilizable.
 *
 * @param {object} initialState - El estado inicial del formulario.
 * @param {Array<object>} fields - Un array de objetos que definen los campos del formulario.
 *   Cada objeto debe tener: name, label, type, placeholder.
 * @param {function} onSubmit - La función a ejecutar cuando se envía el formulario.
 * @param {string} buttonText - El texto para el botón de envío.
 */
const Form = ({ initialState, fields, onSubmit, buttonText = 'Guardar' }) => {
  const { formData, handleChange } = useFormState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label htmlFor={field.name} className="mb-2 font-semibold text-foreground">
            {field.label}
          </label>
          <Input
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={handleChange}
            required={field.required || false}
          />
        </div>
      ))}
      <div className="flex justify-end">
        <Button type="submit" variant="primary" size="md">
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

export default Form;
