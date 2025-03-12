"use client";

import { useEffect, useState } from "react";
import SwaggerWrapper from "@/components/swagger-wrapper";

export default function ApiDocs() {
  const [spec, setSpec] = useState<any>(null);

  useEffect(() => {
    const fetchSpec = async () => {
      const response = await fetch("/api/docs");
      const data = await response.json();
      setSpec(data);
    };

    fetchSpec();
  }, []);

  if (!spec) {
    return (
      <div className="container mx-auto p-4">
        Chargement de la documentation API...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Documentation API</h1>
      <SwaggerWrapper spec={spec} />
    </div>
  );
}
