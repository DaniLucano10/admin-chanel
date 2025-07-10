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

export const TopBar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="w-full h-[75px] flex items-center justify-between gap-4 px-4 bg-gray-200 dark:bg-sidebar text-gray-700 dark:text-gray-400 rounded-b-xl md:rounded-xl">
      {/* Logo o título (opcional para mobile) */}
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
                <p className="text-gray-500 text-xs">Lorem ipsum dolor sit...</p>
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
                <p className="text-gray-500 text-xs">Lorem ipsum dolor sit...</p>
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
            <button className="flex items-center gap-x-2 hover:bg-secondary p-2 rounded-lg transition-colors">
              <img
                src="https://img.freepik.com/foto-gratis/feliz-joven_1098-20869.jpg"
                className="w-6 h-6 object-cover rounded-full"
              />
              <span className="hidden sm:block text-gray-700 dark:text-gray-300">
                Dani Lucano
              </span>
              <RiArrowDownSLine className="hidden sm:block" />
            </button>
          }
        >
          <DropdownItem>
            <Link to="/perfil" className="flex items-center gap-x-4">
              <img
                src="https://img.freepik.com/foto-gratis/feliz-joven_1098-20869.jpg"
                className="w-8 h-8 object-cover rounded-full"
              />
              <div className="flex flex-col text-sm">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Piero
                </span>
                <span className="text-xs text-gray-500">dlucano10@gmail.com</span>
              </div>
            </Link>
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem>
            <Link
              to="/configuracion"
              className="flex items-center gap-x-4 text-gray-700 dark:text-gray-300"
            >
              Configuración
            </Link>
          </DropdownItem>
          <DropdownItem className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900">
            <Link to="/cerrar-sesion" className="flex items-center gap-x-4">
              Cerrar sesión
            </Link>
          </DropdownItem>
        </CustomDropdown>
      </nav>
    </header>
  );
};
