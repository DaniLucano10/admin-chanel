import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/navigation/Sidebar";
import { TopBar } from "../components/navigation/TopBar";

export const AdminLayout = () => {
  return (
    <div className="w-full h-screen flex bg-gray-100 dark:bg-sky-900 md:p-4 gap-4 ">
      <Sidebar />
      <div className="w-full h-full flex flex-col transition-all">
        <TopBar />
        <main className="w-full overflow-y-auto scrollbar scrollbar-1 md:scrollbar space-y-4 mt-4">
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
