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
import { Button } from "@/components/ui/button";
import {
  clearWallpaper,
  fileToDataUrl,
  saveWallpaperDataUrl,
} from "@/lib/utils/wallpaper";

export default function Settings() {
  const { appState, appDispatch } = useApp();
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    await saveWallpaperDataUrl(dataUrl);
  };

  const handleRemove = async () => {
    await clearWallpaper();
  };

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

          <div className="mt-8 space-y-3">
            <h3 className="text-md font-semibold">Wallpaper</h3>
            <div className="flex items-center gap-3">
              <Button asChild variant="outline" size="sm">
                <label className="cursor-pointer">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUpload}
                  />
                </label>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleRemove}>
                Remove
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
