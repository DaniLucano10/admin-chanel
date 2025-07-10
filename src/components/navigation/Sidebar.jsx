import * as RiIcons from "react-icons/ri";
import { useState } from "react";
import { Link } from "react-router-dom";
import sidebarData from "../../data/sidebar.json";

const Icon = ({ iconName }) => {
  const IconComponent = RiIcons[iconName];
  return <IconComponent className="text-primary" />;
};

export const Sidebar = () => {
  const [showSubmenu, setShowSubmenu] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const handleSubmenu = (index) => {
    setShowSubmenu(showSubmenu === index ? null : index);
  };

  return (
    <>
      <div
        className={`h-full w-72 top-0 flex flex-col z-50 text-gray-700 dark:text-gray-400 mb-10 rounded-e-2xl md:rounded-xl shadow-2xl transition-all duration-300 bg-gray-300 dark:bg-sidebar p-4 justify-between${
          showMenu ? " left-0" : " -left-full"
        } transition-all`}
      >
        <div>
          <h1 className="text-center text-2xl font-bold text-gray-700 dark:text-gray-400 mb-10">
            Admin<span className="text-primary text-4xl">.</span>
          </h1>
          <ul>
            {sidebarData.map((item, index) => (
              <li key={index}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => handleSubmenu(index)}
                      className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
                    >
                      <span className="flex items-center gap-4">
                        <Icon iconName={item.icon} /> {item.title}
                      </span>
                      <RiIcons.RiArrowRightSLine
                        className={`mt-1 ${
                          showSubmenu === index && "rotate-90"
                        } transition-all`}
                      />
                    </button>
                    {showSubmenu === index && (
                      <ul className="py-2">
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              to={subItem.path}
                              className="py-2 px-4 ml-6 flex items-center gap-4 relative  hover:text-white transition-colors"
                            >
                              <Icon iconName={subItem.icon} /> {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
                  >
                    <Icon iconName={item.icon} /> {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <nav>
          <Link
            to="/"
            className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
          >
            <RiIcons.RiLogoutCircleRLine className="text-primary" /> Cerrar
            sesión
          </Link>
        </nav>
      </div>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="xl:hidden fixed bottom-4 right-4 bg-primary text-black p-3 rounded-full z-50"
      >
        {showMenu ? <RiIcons.RiCloseLine /> : <RiIcons.RiMenu3Line />}
      </button>
    </>
  );
};
