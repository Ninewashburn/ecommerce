"use client";

import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

interface SwaggerWrapperProps {
  spec: any;
}

// Ce composant désactive le mode strict uniquement pour Swagger UI
export default function SwaggerWrapper({ spec }: SwaggerWrapperProps) {
  return (
    <React.StrictMode key="swagger-strict-mode-disabled">
      <SwaggerUI spec={spec} />
    </React.StrictMode>
  );
}
