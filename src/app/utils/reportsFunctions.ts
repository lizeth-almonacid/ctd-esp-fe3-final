import { ReportData } from "../types/types";
//@ts-ignore
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
export const generarPDF = async (reportData: ReportData[]) => {
  const doc = new jsPDF();

  const element = document.getElementById("my-table");

  if (!element) {
    console.error("Html table not found with id: my-table");
    return;
  }
  //@ts-ignore
  autoTable(doc, { html: element });
  doc.save("informe.pdf");
};

export const descargarCSV = (datos: ReportData[], nombreArchivo: string) => {
  const datosArray = datos.map((obj) => Object.values(obj));
  const encabezados = Object.keys(datos[0]);
  datosArray.unshift(encabezados);

  const csv = datosArray.map((fila) => fila.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const elemento = document.createElement("a");
  elemento.href = url;
  elemento.download = nombreArchivo;
  elemento.click();
};
