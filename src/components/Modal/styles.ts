import styled, { css } from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 1000;
`;

export const ModalBox = styled.div<{ $small: boolean }>`
  ${({ $small }) => css`
    background: white;
    border-radius: 12px;
    max-width: ${$small ? "420px" : "760px"};
    width: 100%;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `}
`;

export const ModalHeader = styled.div`
  background: #0f172a;
  color: white;
  padding: 18px 24px;
  h2 {
    font-size: 18px;
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
  overflow: auto;
  color: #334155;
  font-size: 14px;
  line-height: 1.65;
  h3 {
    color: #1e3a8a;
    margin: 14px 0 6px;
    font-size: 15px;
  }
  ul {
    margin: 8px 0 8px 20px;
  }
  hr {
    margin: 18px 0;
    border: none;
    border-top: 1px dashed #cbd5e1;
  }
  strong {
    color: #0f172a;
  }
`;

export const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  label {
    font-size: 13px;
    color: #475569;
    display: flex;
    gap: 8px;
    align-items: center;
    cursor: pointer;
  }
`;
