import Draggable from "./draggable";
import Dropzone from "./dropzone";
import useApp from "@/state/contexts/app-context/useApp";

export default function Dnd() {
  const { appState } = useApp();

  return (
    <section className="flex flex-col items-center justify-center p-6 gap-6">
      <h3>Drag and drop to reorder</h3>

      <div className="flex gap-4">
        {appState.enabledFeatures.map((feature) => (
          <Draggable key={feature.id} feature={feature} />
        ))}
      </div>

      <Dropzone maxWidth={800} />
    </section>
  );
}
