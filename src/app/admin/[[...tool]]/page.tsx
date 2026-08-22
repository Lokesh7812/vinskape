"use client";

import { Studio } from "sanity";
import config from "../../../../sanity.config";

export default function AdminStudioPage() {
  return <Studio config={config} />;
}
