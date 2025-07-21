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
import { useEffect, useState } from "react";

const PAGE_SIZE = 5;

export const CountryTable = ({ data, loading }) => {
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
            <TableHead>País</TableHead>
            <TableHead>Codigo</TableHead>
            <TableHead>Dial Code</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTableData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No hay paises para mostrar.
              </TableCell>
            </TableRow>
          ) : (
            currentTableData.map((country, index) => (
              <TableRow key={country.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{country.name}</TableCell>
                <TableCell>{country.code}</TableCell>
                <TableCell>{country.dial_code}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <IconButton variant="outline" size="sm" onClick={false}>
                      <RiEditLine />
                    </IconButton>
                    <IconButton variant="danger" size="sm" onClick={false}>
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
        totalCount={data?.length || 0}
        pageSize={PAGE_SIZE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
