import generator from "./generateJiraTableData";
import { lancamentoListFake } from "../../../mock/lancamentoMock";

test('Lança erro quando lista invalida', () => {
    expect(() => generator.generate([])).toThrow('Invalid list');
    expect(() => generator.generate(null)).toThrow('Invalid list');
});

test('Gera lista de modelo jira', () => {
    const data = generator.generate(lancamentoListFake);

    expect(data).toMatchSnapshot();
});