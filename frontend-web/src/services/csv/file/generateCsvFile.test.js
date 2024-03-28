import generateCSVFile from "./generateCsvFile";

// jest.mock(document)
function mockDocumentFunction(property, mock) {
    Object.defineProperty(global.document, property, {value: mock});
}
function mockWindowFunction(property, mock) {
    Object.defineProperty(global.window, property, {value: mock});
}

test('Lança erro quando fileInfo é invalido', () => {
    expect(() => generateCSVFile(null)).toThrow('File invalid');
    expect(() => generateCSVFile({})).toThrow('File invalid');
});

test('Cria link para download de arquivo quando file é válido', () => {
    const click = jest.fn();
    const elementA = {
        style: { 
            display: undefined
        },
        href: undefined,
        download: undefined,
        click: click
    };
    const createElement = jest.fn(element => elementA);
    const hrefExpected = "href";
    const createUrl = jest.fn(()=> hrefExpected);
    const revokeObjectURL = jest.fn();
    const appendChild = jest.fn();
    const fileInfo = {name: 'Test', body: 'test'};
    mockDocumentFunction('createElement', createElement);
    mockDocumentFunction('body', {appendChild: appendChild});
    mockWindowFunction('URL', {createObjectURL: createUrl, revokeObjectURL});

    generateCSVFile(fileInfo);

    expect(createElement).toBeCalled();
    expect(elementA.style.display).toEqual('none');
    expect(elementA.href).toEqual(hrefExpected);
    expect(elementA.download).toEqual(fileInfo.name);
    expect(appendChild).toHaveBeenCalledWith(elementA);
    expect(click).toBeCalled();
    expect(revokeObjectURL).toBeCalled();
});