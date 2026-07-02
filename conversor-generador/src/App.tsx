import { useState } from 'react'
import './index.css'
import { parseCsvToAlumnos, generateQrCode } from './services/conversor'

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<any[] | null>(null);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleProcessFile = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const parsedJson = await parseCsvToAlumnos(file);
      setJsonData(parsedJson);

      const qrCodeUrl = await generateQrCode(parsedJson);
      setQrUrl(qrCodeUrl);

    } catch (error) {
      alert("Hubo un error al procesar el archivo.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      
      <div className="title">
        <h1>CSV → JSON → QR</h1>
      </div>

      <div className='botones'>
        <input 
          type="file" 
          accept=".csv" 
          onChange={handleFileChange} 
        />

        <button 
          onClick={handleProcessFile} 
          disabled={!file || loading}
        >
          {loading ? 'Procesando...' : 'Generar QR'}
        </button>
      </div>

      <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eee' }} />

      {/* Contenedor de Resultados */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        
        {/* Renderizado del QR */}
        {qrUrl && (
          <div style={{ textAlign: 'center', border: '1px solid #e0e0e0', padding: '20px', borderRadius: '8px', background: '#fff' }}>
            <h3 style={{ marginBottom: '10px' }}>¡QR Generado!</h3>
            <img src={qrUrl} alt="Código QR con datos del CSV" style={{ maxWidth: '100%', height: 'auto' }} />
            <br />
            <a 
              href={qrUrl} 
              download="codigo-qr.png" 
              style={{ display: 'inline-block', marginTop: '10px', color: '#0070f3', textDecoration: 'none', fontWeight: 'bold' }}
            >
              Descargar QR
            </a>
          </div>
        )}

        {/* Vista previa del JSON */}
        {jsonData && (
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h3 style={{ marginBottom: '10px' }}>JSON Resultante ({jsonData.length} conjuntos de datos):</h3>
            <pre style={{ background: '#f4f4f4', padding: '15px', maxHeight: '300px', overflow: 'auto', borderRadius: '8px', fontSize: '14px' }}>
              {JSON.stringify(jsonData, null, 2)}
            </pre>
          </div>
        )}
        
      </div>
    </div>
  )
}

export default App