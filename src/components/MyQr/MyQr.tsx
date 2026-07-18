import React, { useState } from 'react';
import type { FC } from 'react';
import QRCode from "react-qr-code";
import "./MyQr.css";

// 1. Definimos qué datos puede recibir el componente desde fuera (opcionales)
interface MyQrProps {
    urlBase?: string;
}

// 2. Funciones auxiliares (fuera del componente para que estén limpias)
function generarIDUnico(): string {
    return crypto.randomUUID(); 
}

const generarNumeroString = (): string => {
    // Genera un número de 7 dígitos rellenado con ceros
    return Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
};

const MyQr: FC<MyQrProps> = ({ urlBase = "https://google.com" }) => {
    // 3. Usamos useState para que el número y el UUID se generen UNA sola vez al cargar
    const [codigoNumerico] = useState(() => generarNumeroString());
    const [uuidUnico] = useState(() => generarIDUnico());

    // 4. Creamos la URL final combinando tu web base con el UUID único como parámetro
    const urlFinal = `${urlBase}?id=${uuidUnico}`;

    return (
        <div id="Container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}> 
            {/* El código QR escaneable (guarda la URL con el UUID único) */}
            <QRCode 
                value={urlFinal} 
                size={200} 
                viewBox={`0 0 256 256`}
            />
            
            {/* El código numérico de 7 dígitos visible justo abajo */}
            <div className="qr-numeric-code" style={{ fontWeight: 'bold', fontSize: '22px', fontFamily: 'monospace', letterSpacing: '2px' }}>
                {codigoNumerico}
            </div>
        </div>
    );
};

export default MyQr;