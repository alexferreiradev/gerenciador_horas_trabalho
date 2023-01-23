function exportDaily(lancamentoList) {
    if (!lancamentoList || lancamentoList.length === 0) {
        return undefined;
    }

    const key = 'os';
    const lancamentoMap = lancamentoList.reduce(
        (result, item) => ({
          ...result,
          [item[key]]: [
            ...(result[item[key]] || []),
            item,
          ],
        }), 
        {},
      );
    const text = Object.keys(lancamentoMap).map(k => {
        const items = lancamentoMap[k];
        return `${k}\n${items.map(i => `  ${i.acao}`).join('\n')}`
    }).join('\n')
    
    return text;
}

export default exportDaily;