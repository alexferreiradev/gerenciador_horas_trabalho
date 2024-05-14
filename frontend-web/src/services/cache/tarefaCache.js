import { toast } from 'react-toastify';

function updateTarefaCache(tarefaList, setTarefaList, lancamentoList) {
    const tarefaListWithoutOldCache = tarefaList.filter(i => i.totalWithoutLancamento < 15);
    const tarefaListForCachingMap = lancamentoList.filter(i => !tarefaListWithoutOldCache.some(t => t.key === i.os))
      .map(i => ({ key: i.os, description: i.acao, totalWithoutLancamento: 0 }))
      .filter(i => i.key !== undefined)
      .reduce((acc, i) => {
        acc.set(i.key, {...i});
        return acc;
      }, new Map());
    const tarefaListForCaching = [...tarefaListForCachingMap.values()]
    const tarefaListWithTotalUpdated = tarefaListWithoutOldCache
      .map(i => {
        if (!lancamentoList.some(l => l.os === i.key)) {
          return ({ ...i, totalWithoutLancamento: i.totalWithoutLancamento + 1 });
        }
        
        return i;
      });
    const tarefaListToStorage = [...tarefaListWithTotalUpdated, ...tarefaListForCaching];
    notifyWhenUpdated(tarefaListForCaching, tarefaList, tarefaListWithoutOldCache);
    setTarefaList(tarefaListToStorage);
    localStorage.setItem('tarefaList', JSON.stringify(tarefaListToStorage));
}

export default updateTarefaCache;

function notifyWhenUpdated(tarefaListForCaching, tarefaList, tarefaListWithoutOldCache) {
  const totalAddInCache = tarefaListForCaching.length;
  const totalRemovedFromCache = tarefaList.length - tarefaListWithoutOldCache.length;
  if (totalRemovedFromCache > 0 || totalAddInCache > 0) {
    toast.warn("Cache de tarefas atualizado");
    toast.info(`Adicionado no cache: ${totalAddInCache}`);
    toast.info(`Removido do cache: ${totalRemovedFromCache}`);
  }
}
