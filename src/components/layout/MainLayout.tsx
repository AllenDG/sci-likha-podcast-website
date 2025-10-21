// src/components/layout/MainLayout.tsx
import { Outlet } from "react-router-dom";
import MainNavbar from "@/components/shared/MainNavbar";
import FooterLayout from "./FooterLayout";
import background from "@/assets/images/background-sci-likha.png";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F4F4] text-gray-900">
      <MainNavbar />

      {/* ---------- MAIN CONTENT ---------- */}
      <main
        className="flex-1 relative min-h-screen w-full overflow-y-auto bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Optional overlay for better readability — remove if not needed */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content Layer */}
        <div className="relative z-10 container mx-auto px-6 py-10">
          <Outlet /> {/* Nested routes: HomePage, AboutPage, ContentPage */}
        </div>
      </main>

     <div> 
      <FooterLayout/>
     </div>
    </div>
  );
};

export default MainLayout;
