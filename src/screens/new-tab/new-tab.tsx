import Pomodoro from "@/components/app/pomodoro/pomodoro";

export default function NewTab() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Pomodoro cycleMinutes={0.1} />
    </main>
  );
}
