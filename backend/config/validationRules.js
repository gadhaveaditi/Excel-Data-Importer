const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
};
const validateData = (sheetData) => {
    let validData = [];
    let validationErrors = [];

    sheetData.forEach((row, index) => {
        let errors = [];

        if (!row.Date || !isValidDate(row.Date)) errors.push(`Row ${index + 1}: Invalid date`);
        if (!row.Name) errors.push(`Row ${index + 1}: Missing Name`);
        if (row.Amount && isNaN(row.Amount)) errors.push(`Row ${index + 1}: Amount should be a number`);

        if (errors.length > 0) {
            validationErrors.push({ row: index + 1, errors });
        } else {
            validData.push(row);
        }
    });

    console.log("Validation Errors:", validationErrors);
    return { validData, validationErrors };
};

module.exports = { validateData };
