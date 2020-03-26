import styled from 'styled-components';

export default styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  min-height: 400px;
  height: 40vh;
  overflow: auto;

  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    border: 2px solid white;
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
    background-color: rgba(0, 0, 0, 0.5);
  }

  &::-webkit-scrollbar {
    -webkit-appearance: none;
  }

  &::-webkit-scrollbar:vertical {
    width: 11px;
  }

  &::-webkit-scrollbar:horizontal {
    height: 11px;
  }
`;
