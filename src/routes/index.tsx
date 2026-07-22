import { createFileRoute } from "@tanstack/react-router";
import { PortalApp } from "@/components/PortalApp";

export const Route = createFileRoute("/")({
  component: PortalApp,
});
