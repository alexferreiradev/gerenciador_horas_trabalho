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
  }

  & > div {
    margin-bottom: 8px;

    button {
      margin-left: 8px;
      padding: 2px;
    }
  }
`;
