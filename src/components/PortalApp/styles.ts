import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{margin:0;padding:0;box-sizing:border-box;font-family:'Segoe UI',Arial,sans-serif;}
  body{background:#f1f5f9;overflow-x:hidden;}
`;

export const Sidebar = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  width: 250px;
  height: 100%;
  background: #0f172a;
  color: white;
  padding: 24px 20px;
  overflow: auto;
`;
export const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
  color: #60a5fa;
  line-height: 1.3;
`;
export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const MenuButton = styled.button<{ $active?: boolean }>`
  width: 100%;
  padding: 12px;
  background: ${(p) => (p.$active ? "#2563eb" : "#1e293b")};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  transition: background 0.15s;
  &:hover {
    background: #2563eb;
  }
`;
export const Main = styled.main`
  margin-left: 250px;
  padding: 24px;
`;
export const TopBar = styled.div`
  background: white;
  padding: 22px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  h1 {
    color: #1e3a8a;
    margin-bottom: 4px;
  }
  p {
    color: #64748b;
    font-size: 14px;
  }
`;
export const Dashboard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`;
export const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  h3 {
    font-size: 12px;
    color: #64748b;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  h2 {
    font-size: 20px;
    color: #0f172a;
    display: flex;
    align-items: center;
    gap: 8px;
    word-break: break-all;
  }
`;
export const Panel = styled.div`
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;
export const Input = styled.input`
  width: 100%;
  padding: 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  margin-bottom: 15px;
  font-size: 16px;
`;
export const Select = styled.select`
  width: 100%;
  padding: 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  margin-bottom: 15px;
  font-size: 16px;
  background: white;
`;

export const Section = styled.section`
  margin-top: 24px;
  h2 {
    color: #1e3a8a;
    font-size: 18px;
    margin-bottom: 14px;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 8px;
  }
`;
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
`;
export const Field = styled.div`
  background: #f8fafc;
  padding: 12px 14px;
  border-radius: 8px;
  border-left: 4px solid #2563eb;
  .label {
    font-size: 11px;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .valor {
    font-size: 14px;
    font-weight: 600;
    margin-top: 4px;
    color: #0f172a;
    word-break: break-word;
  }
`;
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  th {
    background: #2563eb;
    color: white;
    padding: 10px;
    text-align: left;
    font-size: 13px;
  }
  td {
    padding: 10px;
    border: 1px solid #e2e8f0;
    font-size: 13px;
  }
`;

export const Dot = styled.span<{ $color: string }>`
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  box-shadow: 0 0 0 3px ${(p) => p.$color}33;
`;
