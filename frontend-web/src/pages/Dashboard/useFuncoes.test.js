import useFuncoes from './useFuncoes';
import { toast } from 'react-toastify';
import exportDaily from '../../services/exportDaily';
import { changeFocusTo } from '../../util/jsUtil';
import * as clipboard from 'clipboard-polyfill/text';
import Constantes from './Constantes';

jest.mock('react-toastify');
jest.mock('../../services/exportDaily');
jest.mock('clipboard-polyfill/text');
jest.mock('../../util/jsUtil');

const setConfirmStartDayShowing = jest.fn();
const setLancamentoList = jest.fn();
const setNewLancamento = jest.fn();
const setEditing = jest.fn();
const setOsSelected = jest.fn();
const newLancamento = { ...Constantes.emptyLancamento };
const { handleStartDay, handleEdit, handleCancelar, handleChangeOS } = useFuncoes({
    setConfirmStartDayShowing,
    setLancamentoList,
    setNewLancamento,
    setEditing,
    setOsSelected,
    lancamentoList: [],
    newLancamento,
});

beforeEach(() => {
    jest.clearAllMocks()
});

test('call execute when confirm dialog is showing', () => {
    handleStartDay(true)

    expect(setConfirmStartDayShowing).toHaveBeenCalled();
    expect(setLancamentoList).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Seu dia começou e seus lançamentos anteriores foram exportados para área de transferência");
    expect(exportDaily).toHaveBeenCalledWith([]);
    expect(clipboard.writeText).toHaveBeenCalledWith(undefined);
});

test('set dialog to show when confirm dialog is not showing', () => {
    handleStartDay(false);

    expect(setConfirmStartDayShowing).toHaveBeenCalledWith(true);
});

test('should do actions to edit when call handleEdit', () => {
    const lancamento = {};

    handleEdit(lancamento);

    expect(changeFocusTo).toHaveBeenCalledWith('input-minutos');
    expect(setNewLancamento).toHaveBeenCalledWith(lancamento);
    expect(setEditing).toHaveBeenCalledWith(true);
});

test('should show notification when call handleEdit with lancamento bloqueado', () => {
    const lancamento = {copied: true};

    handleEdit(lancamento);

    expect(toast.warn).toHaveBeenCalledWith("Lançamento bloqueado, desbloqueie antes de editar");
});

test('should do actions to cancelar when call handleCancelar', () => {
    const lancamento = {};

    handleCancelar(lancamento);

    expect(setNewLancamento).toHaveBeenCalledWith(Constantes.emptyLancamento);
    expect(setEditing).toHaveBeenCalledWith(false);
    expect(changeFocusTo).toHaveBeenCalledWith('input-minutos');
});

test('should set os equal null when option is null for changeOs', () => {
    const option = null;

    handleChangeOS(option);

    expect(setNewLancamento).toHaveBeenCalledWith(expect.objectContaining({
        os: null
    }));
});

test('should set os null when option is not null and os is null for changeOs', () => {
    const option = {label: null, value: null};

    handleChangeOS(option);

    expect(setNewLancamento).toHaveBeenCalledWith(expect.objectContaining({
        os: null
    }));
});

test('should set os when os in option is valid for changeOs', () => {
    const validOs = 'test';
    const option = {label: validOs, value: validOs};

    handleChangeOS(option);

    expect(setNewLancamento).toHaveBeenCalledWith(expect.objectContaining({
        os: validOs
    }));
});