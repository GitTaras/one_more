import styled from 'styled-components';

export default styled.div`
  > form {
    height: 25vh;
    padding-bottom: 40px;
    display: flex;
    justify-content: space-between;
    .rta {
      textarea {
        font-style: italic;
        width: 100%;
        outline: none;
        color: #000050;
        resize: none;
        border-radius: 2px;
        border: 2px solid rgba(63, 81, 181, 0.5);
      }
      textarea.textAreaDanger {
        border-width: 1px;
        border-color: red;
      }
    }
    .textareaContainer {
      display: flex;
      flex-grow: 8;
      flex-direction: column;
      box-sizing: border-box;
    }
    .textAreaDanger {
      border-width: 1px;
      border-color: red;
    }
    .postMessageFieldError {
      margin: 4px 0 4px 0;
      padding: 5px 0 5px 0;
      color: red;
      font-size: 14px;
    }
    .postSubmitContainer {
      flex-grow: 1;
      display: flex;
      justify-content: flex-end;
    }
    button[type='submit'] {
      height: 100%;
    }
  }
`;
