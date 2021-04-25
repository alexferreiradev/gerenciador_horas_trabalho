import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  background: #ccc;
  height: 100%;
  width: 100%;

  h1 {
    font-size: 14px;
    align-self: center;
    margin-bottom: 16px;
  }
`;

export const Resumo = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  height: 100%;
  margin: 8px;

  ul {
    list-style: none;
  }
`;

export const ListaLancamento = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  height: 100%;
  margin: 8px;

  .container-new {
    display: flex;
    border: 1px solid #000;
    padding: 4px;
    flex-direction: column;
    justify-content: space-evenly;

    textarea {
      min-width: 522px;
      min-height: 100px;
    }
    .createOS {
      width: 200px;
    }
    .container-first-line {
      display: flex;
      flex: 1;
      flex-direction: row;
      align-content: space-around;

      input {
        border: none;
        border-radius: 4px;
        padding: 4px;
      }

      & > div {
        margin: 10px;
      }
    }
  }

  & > div {
    margin-bottom: 8px;

    button {
      margin-left: 8px;
      padding: 2px;
    }
  }
`;

const makeBackground = (props) => {
  const { tarefaEvolutiva, copied } = props;
  if (copied) return '#eee';
  if (tarefaEvolutiva) return '#bbb';
  return 'transparent';
};

export const LancamentoItem = styled.div`
  display: flex;
  flex-direction: column;

  background: ${(props) => makeBackground(props)};
  border: 1px solid #999;
  padding: 2px;

  div.infos {
    display: flex;
    flex-direction: row;

    flex-wrap: wrap;
  }

  div.acoes {
    display: flex;
    flex-direction: row;
  }
`;
