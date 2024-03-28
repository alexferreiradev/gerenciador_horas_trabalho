import exportCSV from "./exportCsv";
import generateCSVFile from "./file/generateCsvFile";
import { tableMock } from "../../mock/tableMock";
import { lancamentoListFake } from "../../mock/lancamentoMock";

jest.mock('./file/generateCsvFile');

const dataGenerator = jest.fn((list) => [tableMock, tableMock]);
const mockGenerator = {generate: dataGenerator};

test('Lança erro quando generator invalido', () => {
    const invalidGenerator = {
        generator: null
    }

    expect(() => exportCSV(invalidGenerator, lancamentoListFake)).toThrow('Invalid generator');
    expect(() => exportCSV(null, lancamentoListFake)).toThrow('Invalid generator');
});

test('Lança erro quando lista vazia', () => {
    expect(() => exportCSV(mockGenerator, [])).toThrow('Empty lancamento list');
});

test('Exporta texto da daily com a lista com mais de uma os lancada', () => {
    generateCSVFile.mockImplementation((file) => {
        expect(file.name).toMatch(/exported-\d{4}-\d{2}-\d{2}.csv/);
        expect(file.body).toMatchSnapshot();
    });

    exportCSV(mockGenerator, lancamentoListFake);

    expect(mockGenerator.generate).toHaveBeenCalledWith(lancamentoListFake);
});