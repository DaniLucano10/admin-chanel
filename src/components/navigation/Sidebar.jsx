import * as RiIcons from "react-icons/ri";
import { useState } from "react";
import { Link } from "react-router-dom";
import sidebarData from "../../data/sidebar.json";
import { useAuth } from "../../hooks";

const Icon = ({ iconName }) => {
  const IconComponent = RiIcons[iconName];
  return <IconComponent className="text-primary" />;
};

export const Sidebar = () => {
  const [showSubmenu, setShowSubmenu] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [activePath, setActivePath] = useState(null);
  const { logout, getUser } = useAuth();
  const user = getUser();
  console.log("user", user?.fullname)

  const handleSubmenu = (index) => {
    setShowSubmenu(showSubmenu === index ? null : index);
  };

  const handleLogout = () => {
    logout(user.email);
  };

  return (
    <div className="relative">
      {/* Overlay en mobile */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black/30 xl:hidden z-40"
          onClick={() => setShowMenu(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed xl:static top-0 left-0 h-full w-72 z-50 flex flex-col text-gray-700 dark:text-gray-400 rounded-e-2xl xl:rounded-xl shadow-2xl bg-gray-300 dark:bg-sidebar p-4 justify-between
        transform transition-transform duration-300 ease-in-out
        ${showMenu ? "translate-x-0" : "-translate-x-full"} xl:translate-x-0`}
      >
        <div>
          <h1 className="text-center text-2xl font-bold text-gray-700 dark:text-gray-400 mb-10">
            Admin<span className="text-primary text-4xl">.</span>
          </h1>
          <ul>
            {sidebarData.map((item, index) => {
              const isActive = activePath === item.route;

              return (
                <li key={index}>
                  {item.child && item.child.length > 0 ? (
                    <>
                      <button
                        onClick={() => handleSubmenu(index)}
                        className="w-full flex items-center justify-between py-2 px-4 rounded-lg transition-colors hover:bg-sidebar-accent active:bg-sidebar-accent"
                      >
                        <span className="flex items-center gap-4">
                          <Icon iconName={item.icon} /> {item.title}
                        </span>
                        <RiIcons.RiArrowRightSLine
                          className={`mt-1 transition-all ${
                            showSubmenu === index ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                      {showSubmenu === index && (
                        <ul className="py-2">
                          {item.child.map((subItem, subIndex) => {
                            const isSubActive = activePath === subItem.route;

                            return (
                              <li key={subIndex}>
                                <Link
                                  to={subItem.route}
                                  onClick={() => {
                                    setActivePath(subItem.route);
                                    setShowMenu(false);
                                  }}
                                  className={`py-2 px-4 ml-6 flex items-center gap-4 rounded-lg transition-colors hover:bg-sidebar-accent active:bg-sidebar-accent ${
                                    isSubActive ? "bg-sidebar-accent" : ""
                                  }`}
                                >
                                  <Icon iconName={subItem.icon} />{" "}
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
                      className={`flex items-center gap-4 py-2 px-4 rounded-lg transition-colors hover:bg-sidebar-accent active:bg-sidebar-accent ${
                        isActive ? "bg-sidebar-accent" : ""
                      }`}
                    >
                      <Icon iconName={item.icon} /> {item.title}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <nav>
          <Link
            onClick={handleLogout} 
            className={`flex items-center gap-4 py-2 px-4 rounded-lg transition-colors hover:bg-sidebar-accent active:bg-sidebar-accent ${
              activePath === "/" ? "bg-sidebar-accent" : ""
            }`}
          >
            <RiIcons.RiLogoutCircleRLine className="text-primary" /> 
            Cerrar sesión
          </Link>
        </nav>
      </div>

      {/* Botón flotante para mostrar sidebar en móvil */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="xl:hidden fixed bottom-4 right-4 bg-primary text-black p-3 rounded-full z-50"
      >
        {showMenu ? <RiIcons.RiCloseLine /> : <RiIcons.RiMenu3Line />}
      </button>
    </div>
  );
};
