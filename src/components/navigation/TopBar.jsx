import {
  RiNotification3Line,
  RiArrowDownSLine,
  RiSunLine,
  RiMoonLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import {
  CustomDropdown,
  DropdownItem,
  DropdownSeparator,
} from "../ui/dropdown";
import { useAuth, useFetchUsers } from "../../hooks";

export const TopBar = () => {
  const { logout, getUser } = useAuth();
  const user = getUser();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { data: usersData } = useFetchUsers();

  const currentUserData = usersData?.find((u) => u.email === user.email);

  const handleLogout = () => {
    if (user) {
      logout(user.email);
    }
  };

  return (
    <header className="w-full flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-gray-200 dark:bg-sidebar text-gray-700 dark:text-gray-400 rounded-b-xl md:rounded-xl">
      <div className="md:hidden font-bold text-lg text-primary">Admin</div>

      <nav className="flex items-center gap-2 sm:gap-4 ml-auto">
        {/* Botón tema */}
        <button
          onClick={toggleTheme}
          className="relative hover:bg-secondary p-2 rounded-lg transition-colors"
        >
          {theme === "light" ? <RiMoonLine /> : <RiSunLine />}
        </button>

        {/* Notificaciones */}
        <CustomDropdown
          trigger={
            <button className="relative hover:bg-secondary p-2 rounded-lg transition-colors">
              <RiNotification3Line />
              <span className="absolute -top-0.5 right-0 bg-primary py-0.5 px-[5px] box-content text-gray-200 dark:text-black rounded-full text-[8px] font-bold">
                2
              </span>
            </button>
          }
        >
          <DropdownItem>
            <h1 className="text-gray-500 dark:text-gray-300 text-center font-medium">
              Notificaciones (2)
            </h1>
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem>
            <Link to="/" className="flex items-center gap-4">
              <img
                src="https://img.freepik.com/foto-gratis/feliz-joven_1098-20869.jpg"
                className="w-8 h-8 object-cover rounded-full"
              />
              <div className="text-sm flex flex-col">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-gray-700 dark:text-gray-300">
                    Dani Lucano
                  </span>
                  <span className="text-[8px] text-gray-500 dark:text-gray-400">
                    12/12/2022
                  </span>
                </div>
                <p className="text-gray-500 text-xs">
                  Lorem ipsum dolor sit...
                </p>
              </div>
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link to="/" className="flex items-center gap-4">
              <img
                src="https://img.freepik.com/foto-gratis/retrato-hermoso-mujer-joven-posicion-pared-gris_231208-10760.jpg"
                className="w-8 h-8 object-cover rounded-full"
              />
              <div className="text-sm flex flex-col">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-gray-700 dark:text-gray-300">Mery</span>
                  <span className="text-[8px] text-gray-500 dark:text-gray-400">
                    12/12/2022
                  </span>
                </div>
                <p className="text-gray-500 text-xs">
                  Lorem ipsum dolor sit...
                </p>
              </div>
            </Link>
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem className="flex justify-center">
            <Link
              to="/"
              className="text-gray-500 dark:text-gray-400 text-sm hover:text-primary transition-colors"
            >
              Todas las notificaciones
            </Link>
          </DropdownItem>
        </CustomDropdown>

        {/* Perfil */}
        <CustomDropdown
          trigger={
            <button className="flex items-center gap-x-3 hover:bg-secondary p-2 rounded-lg transition-colors">
              {/* Avatar con iniciales */}
              <div className="w-8 h-8 bg-primary dark:bg-gray-700 text-white rounded-full flex items-center justify-center font-semibold text-sm uppercase">
                {user?.username
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              {/* Nombre y correo */}
              <div className="hidden md:flex flex-col text-left min-w-0">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                  {user?.username}
                </span>
                <span className="text-xs text-gray-500 truncate">
                  {currentUserData?.roles && currentUserData.roles.length > 0
                    ? currentUserData.roles[0].name
                    : "Sin rol"}
                </span>
              </div>

              {/* Flecha */}
              <RiArrowDownSLine className="text-gray-500 text-lg ml-auto" />
            </button>
          }
        >
          <DropdownItem>
            <Link className="flex items-center gap-x-4">
              <div className="flex flex-col text-sm">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {user.username}
                </span>
                <span className="text-xs text-gray-500">{user.email}</span>
              </div>
            </Link>
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem>
            <Link
              to=""
              className="flex items-center gap-x-4 text-gray-700 dark:text-gray-300"
            >
              Perfil
            </Link>
          </DropdownItem>
          <DropdownItem className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900">
            <Link
              to="/auth/login"
              onClick={handleLogout}
              className="flex items-center gap-x-4"
            >
              Cerrar sesión
            </Link>
          </DropdownItem>
        </CustomDropdown>
      </nav>
    </header>
  );
};
