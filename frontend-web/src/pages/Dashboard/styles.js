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
`;

export const ListaLancamento = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  height: 100%;
  margin: 8px;

  div {
    border: 1px solid #000;
    padding: 4px;

    textarea {
      min-width: 522px;
      min-height: 100px;
    }
  }
`;
