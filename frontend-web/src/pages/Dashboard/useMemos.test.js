import useMemos from './useMemos';
import { useMemo } from 'react';
import Constantes from './Constantes';

jest.mock('react');

beforeEach(() => {
    jest.clearAllMocks()
    useMemo.mockImplementation((func, deps) => {
        return func();
    });
});

test('return minutes formated when is not editing', () => {
    const newLancamento = {...Constantes.emptyLancamento, intervalo: 10};
    const lancamentoList = [newLancamento, newLancamento];
    const horaInicio = new Date(1677600000000); // 28-02-2023--13:00 GMT3

    const { horaFinalFormatted  } = useMemos({
        lancamentoList,
        horaInicio,
        totalMinutesBH: 0,
        currentTime: new Date(),
        exportingJSON: false,
        newLancamento,
        editing: false,
    });

    expect(horaFinalFormatted).toBe("13:30");
});

test('return minutes with newLancamento when is editing', () => { 
    const lancamentoExample = {...Constantes.emptyLancamento, intervalo: 10, id: 1};
    const lancamentoList = [lancamentoExample, {...lancamentoExample, intervalo: 10, id: 2}];
    const newLancamento = {...Constantes.emptyLancamento, intervalo: 15, id: 1};
    const horaInicio = new Date(1677600000000); // 28-02-2023--13:00 GMT3

    const { horaFinalFormatted  } = useMemos({
        lancamentoList,
        horaInicio,
        totalMinutesBH: 0,
        currentTime: new Date(),
        exportingJSON: false,
        newLancamento,
        editing: true,
    });

    expect(horaFinalFormatted).toBe("13:25");
});

test('return minutes without newLancamento when intervalo is lower than zero', () => { 
    const lancamentoExample = {...Constantes.emptyLancamento, intervalo: 10};
    const lancamentoList = [lancamentoExample, lancamentoExample];
    const newLancamento = {...Constantes.emptyLancamento, intervalo: -1};
    const horaInicio = new Date(1677600000000); // 28-02-2023--13:00 GMT3

    const { horaFinalFormatted  } = useMemos({
        lancamentoList,
        horaInicio,
        totalMinutesBH: 0,
        currentTime: new Date(),
        exportingJSON: false,
        newLancamento,
        editing: false,
    });

    expect(horaFinalFormatted).toBe("13:20");
});

test('throw error when is editing and index not found', () => { 
    const lancamentoExample = {...Constantes.emptyLancamento, intervalo: 10, id: 1};
    const lancamentoList = [lancamentoExample, lancamentoExample];
    const newLancamento = {...Constantes.emptyLancamento, intervalo: 10, id: 100};
    const horaInicio = new Date(1677600000000); // 28-02-2023--13:00 GMT3

    expect(() => {
        useMemos({
            lancamentoList,
            horaInicio,
            totalMinutesBH: 0,
            currentTime: new Date(),
            exportingJSON: false,
            newLancamento,
            editing: true,
        });
    }).toThrow('Lancamento invalido');
});
