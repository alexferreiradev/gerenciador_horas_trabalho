import useFuncoes from './useFuncoes';
import { toast } from 'react-toastify';
import exportDaily from '../../services/exportDaily';
import * as clipboard from 'clipboard-polyfill/text';

jest.mock('react-toastify');
jest.mock('../../services/exportDaily');
jest.mock('clipboard-polyfill/text');
const setConfirmStartDayShowing = jest.fn();
const setLancamentoList = jest.fn();
const { handleStartDay } = useFuncoes({
    setConfirmStartDayShowing,
    setLancamentoList,
    lancamentoList: [],
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
    handleStartDay(false)

    expect(setConfirmStartDayShowing).toHaveBeenCalledWith(true);
});