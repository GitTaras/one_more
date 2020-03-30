import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  min-width: 255px;
  max-width: 100%;
  min-height: 40px;
  margin: 0 2vh 0 2vh;

  > .postBody {
    width: 100%;
    display: flex;
    flex-direction: column;
    .postBodyHeading {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .postMeta {
        display: flex;
        align-items: center;
        width: 100%;
        .postAuthor {
          margin-left: 10px;
          margin-right: 10px;
        }
        .postCreatedAt {
          line-height: 1.3125;
          color: gray;
          font-size: 15px;
          font-weight: 400;
        }
      }
      .closeButton {
        align-self: end;
        margin-left: 5px;
        margin-right: 5px;
        color: lightgray;
        font-weight: bold;
        font-size: 22px;
        line-height: 20px;
        cursor: pointer;
        transition: 0.3s;
      }
      .closeButton:hover {
        color: black;
      }
    }
    .message {
      background-color: #e6e6fa61;
      font-size: 15px;
      font-weight: 100;
      word-break: break-word;
      color: gray;
      padding: 3px 10px 3px 10px;
      border-radius: 5px;
    }
  }
`;
