import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { Input, Button, Modal, ConfirmDeleteDialog } from "../../components/ui";

import {
  AddCountryForm,
  CountryTable,
  EditCountryForm,
} from "../../components";
import {
  useCreateCountry,
  useDeleteCountry,
  useFetchCountry,
  useUpdateCountry,
} from "../../hooks";

export const Country = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleActionClick = (country, action) => {
    setSelectedItem(country);
    switch (action) {
      case "edit":
        setOpenEditModal(true);
        break;
      case "delete":
        setOpenDeleteModal(true);
        break;
      default:
        break;
    }
  };

  const { data, fetchCountries, loading } = useFetchCountry();

  const filteredCountries = data?.filter((country) => {
    const term = searchTerm.toLowerCase();
    return (
      country.name?.toLowerCase().includes(term) ||
      country.dial_code?.toLowerCase().includes(term)
    );
  });

  const {
    register,
    loading: loadingRegister,
    setError: setErrorRegister,
  } = useCreateCountry({
    fetch: fetchCountries,
    close: () => setOpenAddModal(false),
  });

  const {
    update,
    loading: loadingUpdate,
  } = useUpdateCountry({
    id: selectedItem?.id,
    fetch: fetchCountries,
    close: () => setOpenEditModal(false),
  });

  const {
    remove: deleteCountry,
    loading: loadingDelete,
  } = useDeleteCountry({
    id: selectedItem?.id,
    fetch: fetchCountries,
    close: () => setOpenDeleteModal(false),
  });

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteCountry();
  };

  return (
    <div className="space-y-4 w-full">
      {/* <h1 className="text-2xl text-black dark:text-white font-bold">
        Lista de Usuarios
      </h1> */}
      <div className="flex flex-col p-2 md:p-0 md:flex-row md:items-center md:justify-between gap-4 w-full">
        <div className="relative w-full">
          <RiSearchLine className="absolute top-1/2 -translate-y-1/2 left-3 text-muted-foreground" />
          <Input
            placeholder="Buscar usuario..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-auto">
          <Button
            className="w-full md:w-64"
            variant="primary"
            onClick={() => setOpenAddModal(true)}
          >
            Crear Pais
          </Button>
        </div>
      </div>

      <CountryTable
        data={filteredCountries}
        loading={loading}
        onActionClick={handleActionClick}
      />

      {/* Modales */}
      <Modal
        size="sm"
        open={openAddModal}
        onOpenChange={() => {
          setOpenAddModal(false);
          setErrorRegister(null);
        }}
        title="Crear nuevo pais"
      >
        <AddCountryForm
          onFormSubmit={(formData) => register(formData)}
          loading={loadingRegister}
        />
      </Modal>

      <Modal
        size="sm"
        open={openEditModal}
        onOpenChange={() => setOpenEditModal(false)}
        title="Editar pais"
      >
        <EditCountryForm
          data={selectedItem}
          onUpdate={update}
          loading={loadingUpdate}
        />
      </Modal>

      <ConfirmDeleteDialog
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
        onConfirm={handleDelete}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que deseas eliminar a ${selectedItem?.name}?`}
        loading={loadingDelete}
      />
    </div>
  );
};
