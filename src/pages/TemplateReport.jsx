import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import config from '../config';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function TemplateReport() {
    const [area, setArea] = useState('');
    const { id } = useParams();
    const [information, setInformation] = useState({
        scope1: [],
        scope2: [],
        scope3: [],
        separate: [],
        removal: []
    });

    const fetchDataReport = useCallback(async () => {
        try {
            const res = await axios.get(`${config.urlApi}/report/api/${id}`);
            const res2 = await axios.get(`${config.urlApi}/activity/area/${id}`);
            setArea(res2.data.total_area);
            setInformation(res.data.result);
        } catch (e) {
            console.log(e.message);
        }
    }, [id]);

    useEffect(() => {
        fetchDataReport();
    }, [fetchDataReport]);

    const calculateTotal = (scope) => {
        const total = scope.reduce((acc, item) => acc + parseFloat(item.tCO2e), 0);
        return total;
    };

    const renderTable = (data, title) => (
        <div className="border-1 mt-3">
            <p className='h6'>{title}</p>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th className='text-center'>แหล่งปล่อยก๊าซเรือนกระจก</th>
                        <th className='text-center'>รวมปริมาณ ก๊าซเรือนกระจก (tCO<sub>2</sub>e)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className='text-start'>{index + 1}. {item.head_name}</td>
                            <td className='text-center'>
                                {item.head_name === 'ภาคการดูดกลับ (GHG Removal)' ? (<>-</>) :(<></>)}
                                {parseFloat(item.tCO2e).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th className='text-center'>รวม</th>
                        <th className='text-center'>
                        {data.some(item => item.head_name === 'ภาคการดูดกลับ (GHG Removal)') ? '-' : ''}
                        {data.reduce((acc, item) => acc + parseFloat(item.tCO2e), 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );

    const exportPDF = () => {
        const input = document.getElementById('reportContent');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const imgWidth = 210;
                const imgHeight = canvas.height * imgWidth / canvas.width;
                const pageHeight = 295; // A4 page height in mm
                let heightLeft = imgHeight;
                let position = 0;

                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
                
                while (heightLeft >= 0) {
                    position -= pageHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                pdf.save('report.pdf');
            });
    };

    const printReport = () => {
        const printWindow = window.open('', '', 'height=800,width=600');
        printWindow.document.write('<html><head><title>Net Zero Campus</title>');
        printWindow.document.write('<style>table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid black; padding: 8px; text-align: center; } th { background-color: #f2f2f2; }</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write('<h5>สรุปปริมาณการปล่อยก๊าซเรือนกระจก</h5>');
        printWindow.document.write(document.getElementById('reportContent').innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    return (
        <div className='d-flex flex-column justify-content-center'>
            <div className='mb-3'>
                <button className='btn btn-primary me-2' onClick={exportPDF}>Export to PDF</button>
                <button className='btn btn-secondary' onClick={printReport}>Print Report</button>
            </div>
            <div id='reportContent'>
                {renderTable(information.scope1, "การปล่อยก๊าซเรือนกระจก จากขอบเขตการดำเนินงานประเภทที่ 1")}
                {renderTable(information.scope2, "การปล่อยก๊าซเรือนกระจก จากขอบเขตการดำเนินงานประเภทที่ 2")}
                {renderTable(information.scope3, "การปล่อยก๊าซเรือนกระจก จากขอบเขตการดำเนินงานประเภทที่ 3")}
                {renderTable(information.separate, "การปล่อยก๊าซเรือนกระจก สำหรับรายงานแยก")}
                {renderTable(information.removal, "การดูดกลับภาคป่าไม้")}

                <div className="border-1 mt-3">
                    <p className='h6'>Carbon Intensity</p>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th className='text-center'>แหล่งปล่อยก๊าซเรือนกระจก</th>
                                <th className='text-center'>ปริมาณ</th>
                                <th className='text-center'>หน่วย</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='text-start'>ประเภทที่ 1</td>
                                <td className='text-center'>{calculateTotal(information.scope1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                <td className='text-center'>tCO<sub>2</sub>e</td>
                            </tr>
                            <tr>
                                <td className='text-start'>ประเภทที่ 2</td>
                                <td className='text-center'>{calculateTotal(information.scope2).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                <td className='text-center'>tCO<sub>2</sub>e</td>
                            </tr>
                            <tr>
                                <td className='text-start'>ประเภทที่ 3</td>
                                <td className='text-center'>{calculateTotal(information.scope3).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                <td className='text-center'>tCO<sub>2</sub>e</td>
                            </tr>
                            <tr>
                                <td className='text-start'>รายงานแยก</td>
                                <td className='text-center'>{calculateTotal(information.separate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                <td className='text-center'>tCO<sub>2</sub>e</td>
                            </tr>
                            <tr>
                                <td className='text-start'>ภาคดูดกลับ</td>
                                <td className='text-center'>-{calculateTotal(information.removal).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                <td className='text-center'>tCO<sub>2</sub>e</td>
                            </tr>
                            <tr>
                                <td className='text-start'>ผลผลิต(พื้นที่ใช้สอย)</td>
                                <td className='text-center'>{parseFloat(area).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                <td className='text-center'>m<sup>2</sup></td>
                            </tr>
                            <tr>
                                <td className='text-start'>Carbon Intensity (Scope 1 + 2)</td>
                                <td className='text-center'>
                                {((parseFloat(calculateTotal(information.scope1)) + parseFloat(calculateTotal(information.scope2))) / parseFloat(area)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td className='text-center'>tCO<sub>2</sub>e/m<sup>2</sup></td>
                            </tr>
                            <tr>
                                <td className='text-start'>Carbon Intensity (Scope 1 + 2 + 3)</td>
                                <td className='text-center'>
                                    {((parseFloat(calculateTotal(information.scope1)) + parseFloat(calculateTotal(information.scope2)) + parseFloat(calculateTotal(information.scope3))) / parseFloat(area)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td className='text-center'>tCO<sub>2</sub>e/m<sup>2</sup></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
