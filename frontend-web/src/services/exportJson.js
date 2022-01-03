import { format } from 'date-fns';

function exportJSON(horaInicio, lancamentoList, totalBHMinutes) {
  const jsonToExport = {
    horaInicio,
    totalBHMinutes,
    lancamentoList,
  };

  const blob = new Blob([JSON.stringify(jsonToExport, null, 2)], {
    type: 'application/json',
  });

  const fileName = `horas_talento-${format(Date.now(), 'yyyy-MM-dd')}.json`;
  const file = new File([blob], fileName);

  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = window.URL.createObjectURL(file);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(a.href);

  return file;
}

export default exportJSON;
