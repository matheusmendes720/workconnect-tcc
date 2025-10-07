// --- CSV Export Utility ---
function exportTableToCSV(tableId, filename) {
    const table = document.getElementById(tableId);
    let csv = '';
    
    for (let row of table.rows) {
        let rowData = [];
        for (let cell of row.cells) {
            let text = cell.innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/"/g, '""');
            rowData.push('"' + text + '"');
        }
        csv += rowData.join(',') + '\n';
    }
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

