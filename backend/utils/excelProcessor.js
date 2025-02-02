const xlsx = require('xlsx');

const processExcel = (fileBuffer) => {
  const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]]; 
  const data = xlsx.utils.sheet_to_json(sheet); 

  const errors = [];
  
  data.forEach((row) => {
   
    if (row.Date && !isNaN(row.Date)) {
      row.Date = new Date((row.Date - (25567 + 2)) * 86400 * 1000); 
    }

    if (row.Verified === 'Yes') {
      row.Verified = true;
    } else if (row.Verified === 'No') {
      row.Verified = false;
    }
  });

  return { data, errors };
};

module.exports = { processExcel };

