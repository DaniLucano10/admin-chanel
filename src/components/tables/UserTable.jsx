import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Pagination,
} from "../ui/table";
import { IconButton } from "../ui";
import { RiEditLine, RiDeleteBinLine } from "react-icons/ri";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const PAGE_SIZE = 5;

export const UserTable = ({ users, currentPage, onPageChange, onEdit }) => {
  const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
  const lastPageIndex = firstPageIndex + PAGE_SIZE;
  const currentTableData = users.slice(firstPageIndex, lastPageIndex);
  console.log(users);

  return (
    <div className="w-[360px] md:w-full overflow-x-auto bg-gray-200 dark:bg-card p-4 rounded-lg shadow-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N°</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            {/* <TableHead>Rol</TableHead> */}
            <TableHead>Estado</TableHead>
            <TableHead>Creado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTableData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell className="font-medium">{user.fullname}</TableCell>
              <TableCell>{user.email}</TableCell>
              {/* <TableCell>{user.role}</TableCell> */}
              <TableCell>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.status === true
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 cursor-pointer"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 cursor-pointer"
                  }`}
                >
                  {user.status === true ? "Activo" : "Inactivo"}
                </span>
              </TableCell>

              <TableCell>
                {format(new Date(user.created_at), "dd/MM/yyyy hh:mm a", {
                  locale: es,
                })}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <IconButton variant="outline" size="sm" onClick={() => onEdit(user)}>
                    <RiEditLine />
                  </IconButton>
                  <IconButton variant="danger" size="sm">
                    <RiDeleteBinLine />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        className="mt-6"
        currentPage={currentPage}
        totalCount={users.length}
        pageSize={PAGE_SIZE}
        onPageChange={onPageChange}
      />
    </div>
  );
};
