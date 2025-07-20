import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Pagination,
  TableSkeleton,
} from "../ui/table";
import { Button, IconButton } from "../ui";
import { RiEditLine, RiDeleteBinLine } from "react-icons/ri";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";

const PAGE_SIZE = 5;

export const UserTable = ({
  users,
  onActionClick,
  loading,
  onToggleStatus,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // Detectar si es móvil
  useEffect(() => {
    const checkIsMobile = () => {
      if (window.innerWidth < 768) {
        setPageSize(5); // mobile
      } else {
        setPageSize(8); // desktop
      }
    };

    checkIsMobile(); // llamada inicial

    // Listener para cambios de tamaño
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);
  const firstPageIndex = (currentPage - 1) * pageSize;
  const lastPageIndex = firstPageIndex + pageSize;
  const currentTableData = users.slice(firstPageIndex, lastPageIndex);

  if (loading) {
    return (
      <div className="w-[360px] md:w-full overflow-x-auto bg-gray-200 dark:bg-card p-4 rounded-lg shadow-md border border-border">
        <TableSkeleton columns={6} />
      </div>
    );
  }

  return (
    <div className="w-[360px] md:w-full scrollbar-thin overflow-auto   bg-gray-200 dark:bg-card p-4 rounded-lg shadow-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N°</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Creado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTableData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No hay usuarios para mostrar.
              </TableCell>
            </TableRow>
          ) : (
            currentTableData.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{user.fullname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => onToggleStatus(user)}
                    disabled={loading}
                    className={`px-4 py-2 text-xs font-semibold rounded-full ${
                      user.status === true
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 cursor-pointer hover:bg-green-500/30 dark:hover:bg-green-500/30"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 cursor-pointer hover:bg-red-500/30 dark:hover:bg-red-500/30"
                    }`}
                  >
                    {user.status === true ? "Activo" : "Inactivo"}
                  </Button>
                </TableCell>
                <TableCell>
                  {format(new Date(user.created_at), "dd/MM/yyyy hh:mm a", {
                    locale: es,
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <IconButton
                      variant="outline"
                      size="sm"
                      onClick={() => onActionClick(user, "edit")}
                    >
                      <RiEditLine />
                    </IconButton>
                    <IconButton
                      variant="danger"
                      size="sm"
                      onClick={() => onActionClick(user, "delete")}
                    >
                      <RiDeleteBinLine />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Pagination
        className="mt-6"
        currentPage={currentPage}
        totalCount={users.length}
        pageSize={PAGE_SIZE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
