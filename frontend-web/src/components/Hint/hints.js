const hints = {
    horaInicio: "Hora Inicio: horário de início de trabalho. Se você começou a trabalhar 8h da manhã, coloque aqui 8 horas. Este horário será utilizado para calcular o ultimo horário lançado.",
    bancoHoras: "Tempo em minutos que está negativo ou positivo. Se você fez 9h em um dia e tem uma jornada de 8h, quer dizer que fez 1h extra e poderá cadastrar no banco de horas 60 minutos. Caso não tenha feito as 8h, somente 7h, cadastre -60 minutos no banco de horas.",
    ultimaHora: "Está é o total de minutos lançado somado a hora de inicio. Portanto, se você iniciou as 8h e lançou 90 minutos, será mostrado aqui 9:30h.",
    totalLancado: "Total de minutos lançado, excluindo os intervalos. Portanto, é somente o total trabalhado.",
    intervalo: "Este é um lançamento que não será contabilizado no total lançado, somente no calculo da ultima hora. Por exemplo, se você tiver ultima hora como sendo 10:36 e lançar um intervalo de 10 minutos, sua ultima hora será 10:46, mas não irá alterar seu total lançado, pois não foi trabalhado os 10 minutos.",
    minutosGastos: "Total de minutos para o lançamento.",
    desbloquearTodos: "Um lançamento é bloqueado ao clicar em Copiar. Quando um lançamento é bloqueado, não pode ser feita edição, somente remoção. Ao clicar neste botão todos lançamentos bloqueados são desbloqueados.",
    iniciarDia: "Ao clicar neste botão, será copiado para área de transferencia todos lançamentos feitos em formato de tab e será removido todos lançamentos.",
    textoLancamento: "Uma descrição da tarefa feita durante o tempo lançado.",
}

export default hints;