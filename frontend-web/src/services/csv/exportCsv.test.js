import exportCSV from "./exportCsv";
import generateCSVFile from "./file/generateCsvFile";

jest.mock('./file/generateCsvFile');

const lancamentoListFake = [{
    os: 'os1',
    acao: 'teste',
}, {
    os: 'OS2',
    acao: 'teste 2',
}, {
    os: 'OS3',
    acao: 'teste 4',
}, {
    os: 'OS2',
    acao: 'teste 3',
}];

test('Lança erro quando generator invalido', () => {
    const generator = {
        generator: () => {}
    }

    exportCSV(generator, lancamentoListFake);

    expect(generator.generate).toHaveBeenCalledWith(lancamentoListFake);
    expect(generateCSVFile).toHaveBeenCalledWith(fakeFile);
});

test('Lança erro quando lista vazia', () => {
    const generator = {
        generator: () => {}
    }

    exportCSV(generator, []);

    expect(generator.generate).toHaveBeenCalledWith(lancamentoListFake);
    expect(generateCSVFile).toHaveBeenCalledWith(fakeFile);
});

test('Exporta texto da daily com a lista com mais de uma os lancada', () => {
    const lancamentoListFake = [{
        os: 'os1',
        acao: 'teste',
    }, {
        os: 'OS2',
        acao: 'teste 2',
    }, {
        os: 'OS3',
        acao: 'teste 4',
    }, {
        os: 'OS2',
        acao: 'teste 3',
    }]

    const generator = {
        generator: () => {}
    }

    exportCSV(generator, lancamentoListFake);

    expect(generator.generate).toHaveBeenCalledWith(lancamentoListFake);
    expect(generateCSVFile).toHaveBeenCalledWith(fakeFile);
});