import React, { useEffect, useState } from "react";
import { RedocStandalone } from "redoc";

function APIDocs() {
  const [specUrl, setSpecUrl] = useState(null);

  useEffect(() => {
    setSpecUrl("http://localhost:4000/openapi.json");
  }, []);

  if (!specUrl) return <p>Loading docs...</p>;

  return (
    <RedocStandalone
      specUrl={specUrl}
      options={{
        theme: {
          colors: {
            primary: { main: "#007acc" }, // Your brand blue
            text: { primary: "#ffffff" }, // Darker text
          },
          typography: {
            fontFamily: "Poppins, sans-serif",
            headings: {
              fontWeight: "600",
            },
          },
          sidebar: {
            backgroundColor: "#f9f9f9",
          },
        },
      }}
    />
  );
}

export default APIDocs;
