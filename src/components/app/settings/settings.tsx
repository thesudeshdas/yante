import Dnd from "@/components/dnd/dnd";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IFeature } from "@/state/contexts/app-context/app-types";
import useApp from "@/state/contexts/app-context/useApp";
import { SettingsIcon } from "lucide-react";

export default function Settings() {
  const { appState, appDispatch } = useApp();

  const handleCheckFeature = (feature: IFeature, checked: boolean) => {
    if (checked) {
      appDispatch({
        type: "ADD_FEATURE",
        featureId: feature.id,
      });
    } else {
      appDispatch({
        type: "REMOVE_FEATURE",
        featureID: feature.id,
      });
    }
  };

  console.log({ appState });

  return (
    <Sheet>
      <SheetTrigger>
        <SettingsIcon className="size-8 cursor-pointer hover:bg-foreground/10" />
      </SheetTrigger>

      <SheetContent className="w-[1000px] sm:max-w-full">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>

        <div className="p-4">
          <h2 className="text-lg font-semibold">Choose features to enable</h2>

          <ul className="flex flex-col gap-2 mt-4">
            {appState.features.map((feature) => (
              <li key={feature.id} className="flex items-center gap-2">
                <Checkbox
                  id={feature.id}
                  checked={appState.enabledFeatures.some(
                    (f) => f.id === feature.id
                  )}
                  onCheckedChange={(checked) =>
                    handleCheckFeature(feature, checked as boolean)
                  }
                />
                <label htmlFor={feature.id} className="text-sm">
                  {feature.name}
                </label>
              </li>
            ))}
          </ul>

          <Dnd />
        </div>
      </SheetContent>
    </Sheet>
  );
}
