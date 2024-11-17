import React from 'react';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface Prop{ 
    downloadFileName: string
    rootElementId: string 
    children: React.ReactNode
}

const GenericPdfDownloader = ({ downloadFileName, rootElementId = '', children }: Prop) => {

    const downloadPdfDocument = () => {
        const input = document.getElementById(rootElementId);
        if (!input) return;
        // console.log(input);
        
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0, 210, 0);
                pdf.setFont('sans', 'normal')
                pdf.setFontSize(14)
                pdf.setTextColor('black')
                pdf.save(`${downloadFileName}.pdf`);
            })
    }

    return <div onClick={downloadPdfDocument} className='cursor-pointer'>{children}</div>

}

export default GenericPdfDownloader;