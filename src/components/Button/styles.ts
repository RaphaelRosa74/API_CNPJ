import styled, { css } from "styled-components";

const color = {
  primary: { default: "#2563eb", hover: "#1d4ed8" },
  secondary: { default: "#475569", hover: "#334155" },
};

export const Btn = styled.button<{ $color?: "primary" | "secondary" }>`
  ${({ $color = "primary" }) => css`
    background: ${color[$color].default};
    color: white;
    border: none;
    padding: 14px 25px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    font-size: 14px;
    &:hover {
      background: ${color[$color].hover};
    }
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `}
`;
