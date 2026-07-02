import Papa from 'papaparse';
import QRCode from 'qrcode';
import { type Alumno } from '../types/alumno';

export const parseCsvToAlumnos = (file: File): Promise<Alumno[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false, 
      complete: (results) => {
        const datos = results.data as Alumno[];
        
        if (datos.length > 0 && (!datos[0].nombre || !datos[0].documento)) {
          reject(new Error("El formato del CSV es incorrecto. Debe tener las columnas: nombre, apellido, documento"));
        }
        
        resolve(datos);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

export const generateQrCode = async (data: any): Promise<string> => {
  try {
    // El QR necesita un string, convertimos el JSON a texto
    const stringData = typeof data === 'string' ? data : JSON.stringify(data);
    
    // Genera el QR en formato data:image/png;base64,...
    const qrDataUrl = await QRCode.toDataURL(stringData, {
      width: 300,
      margin: 2,
    });
    
    return qrDataUrl;
  } catch (error) {
    console.error("Error generando QR:", error);
    throw error;
  }
};