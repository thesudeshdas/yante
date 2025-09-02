import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: "CRXJS from scratch",
  version: "1.0.0",
  permissions: ["storage"],
  action: {
    default_popup: "popup.html",
  },
  chrome_url_overrides: {
    newtab: "index.html",
  },
});
