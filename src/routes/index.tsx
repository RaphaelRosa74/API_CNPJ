import { createFileRoute } from "@tanstack/react-router";
import { PortalApp } from "@/components/PortalApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pesquisas Cadastrais" },
      { name: "description", content: "Consulta de CNPJ, Inscrição Estadual e Simples Nacional." },
    ],
  }),
  component: PortalApp,
});
