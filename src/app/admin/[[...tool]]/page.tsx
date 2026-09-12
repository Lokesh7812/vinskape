"use client";

import { Studio } from "sanity";
import config from "../../../../sanity.config";

export default function AdminStudioPage() {
  return (
    <div style={{ position: "fixed", inset: 0, height: "100vh", width: "100vw", zIndex: 9999, overflow: "hidden" }}>
      <Studio config={config} />
    </div>
  );
}
