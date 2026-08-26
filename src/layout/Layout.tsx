import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type LayoutProps = {
  children: React.ReactNode;
  roomId?: number;
};

export default function Layout({ children, roomId }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar roomId={roomId} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
