import Settings from "../settings/settings";

export default function TopBar() {
  return (
    <nav className="w-full flex justify-end items-center p-2 relative z-50">
      <Settings />
    </nav>
  );
}
