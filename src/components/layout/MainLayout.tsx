import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-64 min-h-screen p-6 lg:p-8">
        {/* Decorative bubbles */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/10 animate-bubble"
              style={{
                left: `${15 + i * 20}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${8 + i * 2}s`,
              }}
            />
          ))}
        </div>
        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
};
