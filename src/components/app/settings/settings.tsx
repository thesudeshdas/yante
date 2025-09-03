import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FEATURES_LIST } from "@/data/features-list";
import useApp from "@/state/contexts/app-context/useApp";
import { SettingsIcon } from "lucide-react";

export default function Settings() {
  const { features, setFeatures } = useApp();

  const handleCheckFeature = (feature: string, checked: boolean) => {
    if (checked) {
      setFeatures((prevFeatures) => [...prevFeatures, feature]);
    } else {
      setFeatures((prevFeatures) => prevFeatures.filter((f) => f !== feature));
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant="link"
          size="icon"
          className="size-8 cursor-pointer hover:bg-foreground/10"
        >
          <SettingsIcon />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[1000px] sm:max-w-full">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>

        <div className="p-4">
          <h2 className="text-lg font-semibold">Choose features to enable</h2>

          <ul className="flex flex-col gap-2 mt-4">
            {FEATURES_LIST.map((feature) => (
              <li key={feature.id} className="flex items-center gap-2">
                <Checkbox
                  id={feature.id}
                  checked={features.includes(feature.id)}
                  onCheckedChange={(checked) =>
                    handleCheckFeature(feature.id, checked as boolean)
                  }
                />
                <label htmlFor={feature.id} className="text-sm">
                  {feature.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
