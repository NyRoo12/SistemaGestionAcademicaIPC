export const fetchAndDownloadPdf = async (id) => {
  try {
    const url =
      id === "nomina"
        ? "http://localhost:3001/api/pdf/nomina"
        : `http://localhost:3001/api/pdf/detallado/${id}`;
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error("Error fetching PDF");
    }

    const blob = await response.blob();
    const urlBlob = window.URL.createObjectURL(blob);

    // Crear el enlace para descargar
    const link = document.createElement("a");
    link.href = urlBlob;
    link.download = "detallado.pdf"; // Nombre del archivo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
};
  