import exportDaily from "./exportDaily";

const textDailyExpected = "os1\n  teste\nOS2\n  teste 2\n  teste 3\nOS3\n  teste 4";

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
    const text = exportDaily(lancamentoListFake)

    expect(text).toBe(textDailyExpected);
});

test('Exporta texto vazio quando lista vazia', () => {
    const text = exportDaily([])

    expect(text).toBe(undefined);
});