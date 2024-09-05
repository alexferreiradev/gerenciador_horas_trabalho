import useEffects from './useEffects';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

jest.mock('react');
jest.mock('react-toastify');
const getItem = jest.fn();
const setItem = jest.fn();
Storage.prototype.getItem = getItem;

beforeEach(() => {
    jest.clearAllMocks()
});

test('should show toast when effect start was called with tarefa list empty', () => {
    const emptyTarefaListJson = '[]';
    getItem.mockReturnValue(emptyTarefaListJson);
    useEffect.mockImplementation((functionArg, arrayDependency) => {
        if (arrayDependency.length == 0) {
            functionArg();
        }
    });

    useEffects({
        lancamentoList: [],
        horaInicio: jest.fn(),
        totalMinutesBH: jest.fn(),
        setLancamentoList: jest.fn(),
        setHoraInicio: jest.fn(),
        setTotalMinutesBH: jest.fn(),
        setCurrentTime: jest.fn(),
        setTotalMinutosBHInput: jest.fn(),
        exportingJSON: jest.fn(),
        setExportingJSON: jest.fn(),
        setTarefaList: jest.fn(),
    });

    expect(getItem).toBeCalledWith('tarefaList');
    expect(toast.warning).toHaveBeenCalledWith('Nenhuma tarefa anterior foi carregada do cache');
    expect(toast.warn).toHaveBeenCalledWith('Nenhuma tarefa anterior foi carregada do cache');
})

test('should set tarefa list when effect start was called', () => {
    useEffect.mockImplementation((functionArg, arrayDependency) => {
        if (arrayDependency.length == 0) {
            functionArg();
        }
    });
    const tarefaItem = {
        key: 'test',
        totalWithoutLancamento: 1,
        description: 'Tarefa x de fazer y'
    };
    const tarefaListJson = `[${JSON.stringify(tarefaItem)}]`;
    getItem.mockReturnValue(tarefaListJson);
    const setTarefaList = jest.fn();

    useEffects({
        lancamentoList: [],
        horaInicio: jest.fn(),
        totalMinutesBH: jest.fn(),
        setLancamentoList: jest.fn(),
        setHoraInicio: jest.fn(),
        setTotalMinutesBH: jest.fn(),
        setCurrentTime: jest.fn(),
        setTotalMinutosBHInput: jest.fn(),
        exportingJSON: jest.fn(),
        setExportingJSON: jest.fn(),
        setTarefaList
    });

    expect(getItem).toBeCalledWith('tarefaList');
    expect(setTarefaList).toBeCalledWith([tarefaItem]);
    expect(toast.success).toHaveBeenCalledWith('Tarefas foram carregadas do cache');
})