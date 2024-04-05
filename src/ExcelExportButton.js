import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Button from "react-bootstrap/Button";
import XlsxPopulate from 'xlsx-populate';
import axios from "axios";
import React, { useState, useEffect, props,useCallback } from "react";
const ExcelExportButton = ({ fileName ,Heading,sheetHead,identifier}) => {
const [newExcel,setnewExcel]=useState([]);
const [state,setState]=React.useState([]);

const handleExport = async() => {
const DownloadExcel=async(ExportArray)=>{
  const  data=ExportArray;

  const workbook = await XlsxPopulate.fromBlankAsync(); 
  const worksheet = workbook.sheet(0);
  const headerStyle = {
    bold: true,
    fill: '#a6c1ed',
  };
  const headers = Object.keys(data[0]);
  headers.forEach((header, index) => {
    worksheet.cell(3, index + 1).value(header).style(headerStyle);
  });
  const cellStyle = {

  };
  const headingStyle = {
    bold: true,
    italic: true,
    fontSize: 16,
    fill: '#41e8b0',
    horizontalAlignment: 'center',
  };
  worksheet.cell(1, 3).value(Heading).style(headingStyle);
  worksheet.range('A1:C1').merged(true); 
  data.forEach((item, rowIndex) => {
    Object.entries(item).forEach(([key, value], colIndex) => {
      worksheet.cell(rowIndex + 4, colIndex + 1).value(value).style(cellStyle);
    });
  });
  worksheet.name(sheetHead);
  const excelBuffer = await workbook.outputAsync();
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download =fileName;
  link.click();
  URL.revokeObjectURL(url);
  

}  
if(identifier =='userlistPage'){
  const sample_excel=await axios.get(`http://localhost:5000/userslist/1/1`).then(res => {
    let mainData=(res.data.excel)
    
  
    let ExportArray = mainData.map(item => {
      return {
        Firstname: item.firstname,
        Lastname: item.lastname,
        Email: item.email,
        Mobileno:item.mobileno,
        Country: item.country,
        City: item.city,
        Gender: item.gender,
       
      };
    });
    DownloadExcel(ExportArray)

  
  
    })
}
else{
  const tickets = await axios.get(`http://localhost:5000/ticketList`).then(res => {
  const ticket_data=(res.data.data);

  let ExportArray = ticket_data.map(item => {
    return {
      Message: item.message,
      Subject: item.subject,
     };
  });
  DownloadExcel(ExportArray)
 
})
}
};
return (
      <Button  className="Exportbtn"  onClick={handleExport}>
        Export Excel
      </Button>
    );
  };
export default ExcelExportButton;
  