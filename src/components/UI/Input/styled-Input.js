import styled from 'styled-components';

export default styled.div`
  width: 70%;
  margin: 0px 0 15px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .label {
    font-size: 18px !important;
    text-shadow: -1px -1px 2px rgba(150, 150, 150, 0.31);
    font-weight: 500;
    letter-spacing: 0.4px;
  }
  .error {
    margin: 4px 0 4px 0;
    padding: 5px 0 5px 0;
    color: red;
    font-size: 14px;
  }
  .inputContainer {
    flex: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    input {
      padding: 10px 10px 10px 10px;
      min-width: 300px;
      box-sizing: border-box;
      border-radius: 2px;
      border: 1px solid #ccc;
      line-height: normal;
      background-color: white;
    }
    input:focus {
      border-color: blue;
    }
    .inputDanger {
      border-width: 1px;
      border-color: red;
    }
  }
`;
