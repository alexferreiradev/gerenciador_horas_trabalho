import Constantes from "../../pages/Dashboard/Constantes";
import updateTarefaCache from "./tarefaCache";
import { toast } from 'react-toastify';

jest.mock('react-toastify');

const setTarefaList = jest.fn();
const setItem = jest.fn();
Storage.prototype.setItem = setItem;

beforeEach(()=> {
    jest.clearAllMocks();
});

test('should remove tarefa from cache when totalWithoutLancamento is higher than 15', () => {
    const tarefaList = [{
        key: 'test',
        totalWithoutLancamento: 15
    }];
    const lancamentoList = [];
    
    updateTarefaCache(tarefaList, setTarefaList, lancamentoList);

    expect(setTarefaList.mock.calls[0]).toMatchSnapshot();
    expect(toast.warn).toHaveBeenCalledWith("Cache de tarefas atualizado");
    expect(toast.info).toHaveBeenCalledWith("Adicionado no cache: 0");
    expect(toast.info).toHaveBeenCalledWith("Removido do cache: 1");
    expect(setItem).toHaveBeenCalled();
});

test('should add tarefa to cache when new key from lancamentoList is not found in cache', () => {
    const newOs = 'newOs';
    const tarefaList = [];
    const lancamentoList = [{...Constantes.emptyLancamento, os: newOs, acao: 'test'}];
    
    updateTarefaCache(tarefaList, setTarefaList, lancamentoList);

    expect(setTarefaList.mock.calls[0]).toMatchSnapshot();
    expect(toast.warn).toHaveBeenCalledWith("Cache de tarefas atualizado");
    expect(toast.info).toHaveBeenCalledWith("Adicionado no cache: 1");
    expect(toast.info).toHaveBeenCalledWith("Removido do cache: 0");
    expect(setItem).toHaveBeenCalled();
});

test('should add tarefa only one time to cache when new key from lancamentoList with two lancamento from same key is not found in cache', () => {
    const newOs = 'newOs';
    const tarefaList = [];
    const lancamentoList = [{...Constantes.emptyLancamento, os: newOs, acao: 'test'},{...Constantes.emptyLancamento, os: newOs, acao: 'test2'}];
    
    updateTarefaCache(tarefaList, setTarefaList, lancamentoList);

    expect(setTarefaList.mock.calls[0]).toMatchSnapshot();
    expect(toast.warn).toHaveBeenCalledWith("Cache de tarefas atualizado");
    expect(toast.info).toHaveBeenCalledWith("Adicionado no cache: 1");
    expect(toast.info).toHaveBeenCalledWith("Removido do cache: 0");
    expect(setItem).toHaveBeenCalled();
});

test('should do nothing when tarefaList dont need to be updated', () => {
    const newOs = 'newOs';
    const tarefaList = [{key: newOs, totalWithoutLancamento: 0}];
    const lancamentoList = [{...Constantes.emptyLancamento, os: newOs}];
    
    updateTarefaCache(tarefaList, setTarefaList, lancamentoList);

    expect(setTarefaList.mock.calls[0]).toMatchSnapshot();
    expect(toast.warn).not.toHaveBeenCalled();
    expect(toast.info).not.toHaveBeenCalled();
    expect(setItem).toHaveBeenCalled();
});

test('should update total when lancamentoList dont have lancamento from some key in tarefa cache', () => {
    const newOs = 'newOs';
    const tarefaList = [{key: 'oldOs', totalWithoutLancamento: 0},{key: newOs, totalWithoutLancamento: 0}];
    const lancamentoList = [{...Constantes.emptyLancamento, os: newOs}];
    
    updateTarefaCache(tarefaList, setTarefaList, lancamentoList);

    expect(setTarefaList.mock.calls[0]).toMatchSnapshot();
    expect(toast.warn).not.toHaveBeenCalled();
    expect(toast.info).not.toHaveBeenCalled();
    expect(setItem).toHaveBeenCalled();
});