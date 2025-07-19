import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi";

import { useState } from "react";
import { Link } from "react-router-dom";
import sidebarData from "../../data/sidebar.json";
import { useAuth } from "../../hooks";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi";
const iconPacks = {
  ...RiIcons,
  ...MdIcons,
  ...FaIcons,
  ...HiIcons,
};

const Icon = ({ iconName, size = 20 }) => {
  const IconComponent = iconPacks[iconName];
  if (!IconComponent) return null;
  return <IconComponent className="text-primary" size={size} />;
};

export const Sidebar = () => {
  const [showSubmenu, setShowSubmenu] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePath, setActivePath] = useState(null);
  const { logout, getUser } = useAuth();
  const user = getUser();

  const showText = !isCollapsed;

  const handleSubmenu = (index) => {
    setShowSubmenu(showSubmenu === index ? null : index);
  };

  const handleLogout = () => {
    logout(user.email);
  };

  return (
    <div className="relative">
      {/* Overlay en móvil */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black/30 xl:hidden z-40"
          onClick={() => setShowMenu(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed xl:static top-0 left-0 h-full ${
          isCollapsed ? "w-20" : "w-auto min-w-max"
        } z-[100] flex flex-col text-gray-700 dark:text-gray-400 rounded-e-2xl xl:rounded-xl shadow-2xl bg-gray-300 dark:bg-sidebar p-4 justify-between transform transition-all duration-300 ease-in-out ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0`}
      >
        {/* Botón de colapsar */}
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="absolute top-4 right-[-18px] bg-accent p-1.5 rounded-lg z-50 shadow-lg"
        >
          {isCollapsed ? (
            <HiOutlineChevronDoubleRight size={20} />
          ) : (
            <HiOutlineChevronDoubleLeft size={20} />
          )}
        </button>

        <div>
          {/* Logo / Título */}
          <div
            className={`flex items-center gap-4 justify-center mb-10 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <Link to="/admin" className="flex items-center gap-4">
              {isCollapsed ? (
                // Icono o abreviatura cuando está colapsado
                <div className="bg-accent text-accent-foreground rounded-lg w-10 h-10 flex items-center justify-center font-bold text-xl">
                  A
                </div>
              ) : (
                // Título completo cuando está expandido
                <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-400">
                  Admin<span className="text-primary text-4xl">.</span>
                </h1>
              )}
            </Link>
          </div>

          {/* Menú principal */}
          <ul>
            {sidebarData.map((item, index) => {
              const isActive = activePath === item.route;

              return (
                <li key={index} className="mb-2 relative">
                  {item.child && item.child.length > 0 ? (
                    <>
                      <button
                        onClick={() => handleSubmenu(index)}
                        className={`w-full flex items-center justify-between py-2 px-4 rounded-lg transition-colors hover:bg-sidebar-accent active:bg-sidebar-accent ${
                          isCollapsed ? "justify-center" : ""
                        }`}
                      >
                        <span className="flex items-center gap-4">
                          <Icon
                            iconName={item.icon}
                            size={isCollapsed ? 24 : 20}
                          />
                          {showText && <span>{item.title}</span>}
                        </span>
                        {showText && (
                          <RiIcons.RiArrowRightSLine
                            className={`mt-1 transition-all ${
                              showSubmenu === index ? "rotate-90" : ""
                            }`}
                          />
                        )}
                      </button>

                      {/* Submenú lateral cuando está colapsado */}
                      {isCollapsed && showSubmenu === index && (
                        <ul className="absolute left-18 top-0 bg-gray-300 dark:bg-sidebar shadow-xl z-[999] p-2 min-w-[200px] rounded-lg">
                          {item.child.map((subItem, subIndex) => (
                            <li key={subIndex} className="mb-1">
                              <Link
                                to={subItem.route}
                                onClick={() => {
                                  setActivePath(subItem.route);
                                  setShowMenu(false);
                                }}
                                className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-sidebar-accent"
                              >
                                <Icon iconName={subItem.icon} />
                                <span>{subItem.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Submenú normal cuando está expandido */}
                      {!isCollapsed && showSubmenu === index && (
                        <ul className="py-2 pl-6">
                          {item.child.map((subItem, subIndex) => {
                            const isSubActive = activePath === subItem.route;

                            return (
                              <li key={subIndex} className="mb-1">
                                <Link
                                  to={subItem.route}
                                  onClick={() => {
                                    setActivePath(subItem.route);
                                    setShowMenu(false);
                                  }}
                                  className={`py-2 px-4 flex items-center gap-4 rounded-lg transition-colors hover:bg-sidebar-accent ${
                                    isSubActive ? "bg-sidebar-accent" : ""
                                  }`}
                                >
                                  <Icon iconName={subItem.icon} />
                                  {subItem.title}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.route}
                      onClick={() => {
                        setActivePath(item.route);
                        setShowMenu(false);
                      }}
                      className={`flex items-center gap-4 py-2 px-4 rounded-lg transition-colors hover:bg-sidebar-accent ${
                        isActive ? "bg-sidebar-accent" : ""
                      } ${isCollapsed ? "justify-center" : ""}`}
                    >
                      <Icon
                        iconName={item.icon}
                        size={isCollapsed ? 24 : 20}
                      />
                      {showText && <span>{item.title}</span>}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Cerrar sesión */}
        <nav>
          <Link
            to="/auth/login"
            onClick={handleLogout}
            className={`flex items-center gap-4 py-2 px-4 rounded-lg transition-colors hover:bg-sidebar-accent ${
              activePath === "/login" ? "bg-sidebar-accent" : ""
            } ${isCollapsed ? "justify-center" : ""}`}
          >
            <Icon
              iconName="RiLogoutCircleRLine"
              size={isCollapsed ? 24 : 20}
            />
            {showText && "Cerrar sesión"}
          </Link>
        </nav>
      </div>

      {/* Botón para abrir/cerrar en móvil */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="xl:hidden fixed bottom-4 right-4 bg-primary text-black p-3 rounded-full z-50"
      >
        {showMenu ? <RiIcons.RiCloseLine /> : <RiIcons.RiMenu3Line />}
      </button>
    </div>
  );
};
