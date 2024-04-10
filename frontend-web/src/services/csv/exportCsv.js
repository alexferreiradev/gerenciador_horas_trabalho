import generateCSVFile from "./file/generateCsvFile";
import { format } from 'date-fns';

export default function exportCSV(dataGenerator, lancamentos){
    if (!dataGenerator || !dataGenerator.generate) throw new Error('Invalid generator');
    if (!lancamentos || lancamentos.length <= 0) throw new Error('Empty lancamento list');

    const tableData = dataGenerator.generate(lancamentos);
    const header = "Key,Date Started,Time Spent (h),Work Description\n";
    const fileBody = tableData.reduce((body, row) => {
        return `${body}${row.key.value},${row.date.value},${row.time.value},"${row.description.value}"\n`;
    }, header);
    const file = {
        name: `horas-talento-exported-${format(Date.now(), 'yyyy-MM-dd')}.csv`,
        body: fileBody,
    };
    generateCSVFile(file);
}