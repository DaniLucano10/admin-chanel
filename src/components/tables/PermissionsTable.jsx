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
import { IconButton, Tooltip } from "../ui";
import { RiEditLine, RiDeleteBinLine } from "react-icons/ri";
import { useEffect, useState } from "react";

const PAGE_SIZE = 5;

export const PermissionsTable = ({ data, loading, onActionClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // Detectar si es móvil
  useEffect(() => {
    const checkIsMobile = () => {
      if (window.innerWidth < 768) {
        setPageSize(5); // mobile
      } else {
        setPageSize(7); // desktop
      }
    };

    checkIsMobile(); // llamada inicial

    // Listener para cambios de tamaño
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);
  console.log(data);
  const firstPageIndex = (currentPage - 1) * pageSize;
  const lastPageIndex = firstPageIndex + pageSize;
  const currentTableData = data?.slice(firstPageIndex, lastPageIndex) || [];

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
            <TableHead>Nombre del permiso</TableHead>
            <TableHead>Permiso</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTableData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No hay permisos para mostrar.
              </TableCell>
            </TableRow>
          ) : (
            currentTableData.map((permission, index) => (
              <TableRow key={permission.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{permission.name}</TableCell>
                <TableCell>{permission.guard_name}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Tooltip text="Editar permiso">
                      <IconButton
                        variant="outline"
                        rounded="md"
                        size="sm"
                        onClick={() => onActionClick(permission, "edit")}
                      >
                        <RiEditLine />
                      </IconButton>
                    </Tooltip>
                    <Tooltip text="Eliminar permiso">
                      <IconButton
                        variant="danger"
                        rounded="md"
                        size="sm"
                        onClick={() => onActionClick(permission, "delete")}
                      >
                        <RiDeleteBinLine />
                      </IconButton>
                    </Tooltip>
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
        totalCount={data?.length || 0}
        pageSize={PAGE_SIZE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
