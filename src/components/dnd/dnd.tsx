import { FEATURES_LIST } from "@/data/features-list";
import Draggable from "./draggable";
import Dropzone from "./dropzone";

export default function Dnd() {
  return (
    <section className="flex flex-col items-center justify-center p-6 gap-6">
      <h3>Drag and drop to reorder</h3>

      <div className="flex gap-4">
        {FEATURES_LIST.map((feature) => (
          <Draggable key={feature.id} feature={feature} />
        ))}
      </div>

      <Dropzone />
    </section>
  );
}
