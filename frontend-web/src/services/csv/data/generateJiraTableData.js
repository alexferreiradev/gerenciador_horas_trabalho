import { format } from 'date-fns';

const groupBy = (items, key) => items.reduce(
    (result, item) => ({
        ...result,
        [item[key]]: [
        ...(result[item[key]] || []),
        item,
        ],
    }), 
    {},
    );
    
const jiraGenerator = function generateTableData(lancamentos) {
    if (!lancamentos || lancamentos.length <= 0) throw new Error('Invalid list');

    const groups = groupBy(lancamentos, 'os');
    return Object.keys(groups).reduce((acc, key) => {
        const actualGroup = groups[key];
        const totalMinutes = actualGroup.reduce((total, lancamento) => {
            return total + Number.parseInt(lancamento.intervalo, 10)
        }, 0);
        const workDescription = actualGroup.reduce((text, lancamento) => {
            return text + '- ' + lancamento.acao + '\n'
        }, '');
        
        return [...acc, {
            key: {
                col: 'Key',
                value: key,
            }, 
            date: {
                col: 'Date Started',
                value: format(groups[key][0].hora, "yyyy-MM-dd"),
            }, 
            time: {
                col: 'Time Spent (h)',
                value: totalMinutes,
            }, 
            description: {
                col: 'Work Description',
                value: workDescription,
            },
        }];
    }, []);
}


export default {
    generate: jiraGenerator,
};