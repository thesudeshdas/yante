import Pomodoro from "@/components/app/pomodoro/pomodoro";
import TopBar from "@/components/app/top-bar/top-bar";

export default function NewTab() {
  return (
    <main className="h-screen w-screen flex flex-col">
      <TopBar />

      <section className="flex flex-col items-center justify-center h-screen">
        <Pomodoro cycleMinutes={0.1} />
      </section>
    </main>
  );
}
