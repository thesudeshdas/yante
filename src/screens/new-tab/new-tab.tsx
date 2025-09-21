import Canvas from "@/components/app/canvas/canvas";
import TopBar from "@/components/app/top-bar/top-bar";
import Wallpaper from "@/components/app/wallpaper/wallpaper";

export default function NewTab() {
  return (
    <main className="relative h-screen w-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 -z-50">
        <Wallpaper />
      </div>

      <TopBar />

      <section className="flex flex-col items-center justify-center h-screen">
        <Canvas />
      </section>
    </main>
  );
}
