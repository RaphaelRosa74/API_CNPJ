import { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

// ============ Global ============
const GlobalStyle = createGlobalStyle`
  *{margin:0;padding:0;box-sizing:border-box;font-family:'Segoe UI',Arial,sans-serif;}
  body{background:#f1f5f9;overflow-x:hidden;}
`;

// ============ Layout ============
const Sidebar = styled.aside`
  position:fixed;left:0;top:0;width:250px;height:100%;
  background:#0f172a;color:white;padding:24px 20px;overflow:auto;
`;
const Logo = styled.div`
  font-size:20px;font-weight:bold;margin-bottom:30px;text-align:center;color:#60a5fa;
  line-height:1.3;
`;
const Menu = styled.div`display:flex;flex-direction:column;gap:10px;`;
const MenuButton = styled.button<{ $active?: boolean }>`
  width:100%;padding:12px;background:${(p) => (p.$active ? "#2563eb" : "#1e293b")};
  color:white;border:none;border-radius:8px;cursor:pointer;font-size:14px;
  text-align:left;transition:background .15s;
  &:hover{background:#2563eb;}
`;
const Main = styled.main`margin-left:250px;padding:24px;`;
const TopBar = styled.div`
  background:white;padding:22px;border-radius:12px;margin-bottom:20px;
  box-shadow:0 2px 8px rgba(0,0,0,.08);
  h1{color:#1e3a8a;margin-bottom:4px;}
  p{color:#64748b;font-size:14px;}
`;
const Dashboard = styled.div`
  display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
  gap:15px;margin-bottom:20px;
`;
const Card = styled.div`
  background:white;padding:20px;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.08);
  h3{font-size:12px;color:#64748b;margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px;}
  h2{font-size:20px;color:#0f172a;display:flex;align-items:center;gap:8px;word-break:break-all;}
`;
const Panel = styled.div`
  background:white;padding:25px;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.08);
`;
const Input = styled.input`
  width:100%;padding:14px;border:1px solid #d1d5db;border-radius:8px;
  margin-bottom:15px;font-size:16px;
`;
const Select = styled.select`
  width:100%;padding:14px;border:1px solid #d1d5db;border-radius:8px;
  margin-bottom:15px;font-size:16px;background:white;
`;
const Btn = styled.button`
  background:#2563eb;color:white;border:none;padding:14px 25px;
  border-radius:8px;cursor:pointer;font-weight:bold;font-size:14px;
  &:hover{background:#1d4ed8;}
  &:disabled{opacity:.6;cursor:not-allowed;}
`;
const SecondaryBtn = styled(Btn)`background:#475569;&:hover{background:#334155;}`;

// ============ Section Result ============
const Section = styled.section`
  margin-top:24px;
  h2{color:#1e3a8a;font-size:18px;margin-bottom:14px;border-bottom:2px solid #e2e8f0;padding-bottom:8px;}
`;
const Grid = styled.div`
  display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;
`;
const Field = styled.div`
  background:#f8fafc;padding:12px 14px;border-radius:8px;border-left:4px solid #2563eb;
  .label{font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:.5px;}
  .valor{font-size:14px;font-weight:600;margin-top:4px;color:#0f172a;word-break:break-word;}
`;
const Table = styled.table`
  width:100%;border-collapse:collapse;margin-top:10px;
  th{background:#2563eb;color:white;padding:10px;text-align:left;font-size:13px;}
  td{padding:10px;border:1px solid #e2e8f0;font-size:13px;}
`;

// ============ Status Dot ============
type Situacao = "Ativa" | "Suspensa" | "Inapta" | "Baixada" | "Nula" | string;
const dotColor = (s: string) => {
  const v = (s || "").toLowerCase();
  if (v.includes("ativ")) return "#16a34a";
  if (v.includes("susp")) return "#eab308";
  if (v.includes("inapt")) return "#dc2626";
  if (v.includes("baix")) return "#000";
  if (v.includes("nul")) return "#7c3aed";
  return "#94a3b8";
};
const Dot = styled.span<{ $color: string }>`
  display:inline-block;width:14px;height:14px;border-radius:50%;
  background:${(p) => p.$color};
  box-shadow:0 0 0 3px ${(p) => p.$color}33;
`;

// ============ Modal ============
const Overlay = styled.div`
  position:fixed;inset:0;background:rgba(15,23,42,.7);display:flex;
  align-items:center;justify-content:center;padding:20px;z-index:1000;
`;
const ModalBox = styled.div`
  background:white;border-radius:12px;max-width:760px;width:100%;
  max-height:90vh;display:flex;flex-direction:column;overflow:hidden;
`;
const ModalHeader = styled.div`
  background:#0f172a;color:white;padding:18px 24px;
  h2{font-size:18px;}
`;
const ModalBody = styled.div`
  padding:24px;overflow:auto;color:#334155;font-size:14px;line-height:1.65;
  h3{color:#1e3a8a;margin:14px 0 6px;font-size:15px;}
  ul{margin:8px 0 8px 20px;}
  hr{margin:18px 0;border:none;border-top:1px dashed #cbd5e1;}
  strong{color:#0f172a;}
`;
const ModalFooter = styled.div`
  padding:16px 24px;border-top:1px solid #e2e8f0;display:flex;
  align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;
  label{font-size:13px;color:#475569;display:flex;gap:8px;align-items:center;cursor:pointer;}
`;
const SmallModal = styled(ModalBox)`max-width:420px;`;

// ============ UFs ============
const UF_URLS: Record<string, string> = {
  RS: "https://www.sefaz.rs.gov.br/consultas/contribuinte",
  SC: "https://sat.sef.sc.gov.br/tax.NET/Sat.Cadastro.Web/ComprovanteIE/Consulta.aspx",
  PR: "http://www.sintegra.fazenda.pr.gov.br/sintegra/",
  SP: "https://www.cadesp.fazenda.sp.gov.br/(S(pc3a50cpzerlhzfkxdqvjoo1))/Pages/Cadastro/Consultas/ConsultaPublica/ConsultaPublica.aspx",
  MG: "https://dfe-portal.svrs.rs.gov.br/NFE/CCC",
  RJ: "https://sucief-sincad-web.fazenda.rj.gov.br/sincad-web/index.jsf",
  ES: "http://www1.sefaz.ms.gov.br/Cadastro/sintegra/cadastromsCCI.asp",
  BA: "https://portal.sefaz.ba.gov.br/scripts/cadastro/cadastroBa/consultaBa.asp",
  SE: "https://security.sefaz.se.gov.br/SIC/sintegra/index.jsp",
  AL: "https://cadastro.sefaz.al.gov.br/#/fic",
  PE: "https://www.sintegra.sefaz.pe.gov.br/servdados/login.php",
  PB: "https://www4.sefaz.pb.gov.br/sintegra/SINf_ConsultaSintegra.jsp",
  RN: "https://dfe-portal.svrs.rs.gov.br/NFE/CCC",
  CE: "https://consultapublica.sefaz.ce.gov.br/sintegra/preparar-consultar",
  PI: "https://sistemas1.sefaz.ma.gov.br/sintegra/jsp/consultaSintegra/consultaSintegraFiltro.jsf",
  MA: "https://dfe-portal.svrs.rs.gov.br/NFE/CCC",
  AM: "https://online.sefaz.am.gov.br/sintegra/index.asp",
  AC: "https://sefazonline.ac.gov.br/sefazonline/app.wmsintegralista",
  RR: "https://portalweb.sefaz.rr.gov.br/sintegra/servlet/wp_siate_consultasintegra",
  AP: "https://www.sefaz.ap.gov.br/sate/seg/SEGf_AcessarFuncao.jsp?cdFuncao=CAD_011",
  PA: "https://app.sefa.pa.gov.br/sintegra/",
  TO: "https://sintegra.sefaz.to.gov.br/",
  RO: "https://portalcontribuinte.sefin.ro.gov.br/Publico/parametropublica.jsp",
  DF: "https://ww1.receita.fazenda.df.gov.br/icms/sintegra-consulta",
  GO: "https://appasp.sefaz.go.gov.br/Sintegra/Consulta/default.html",
  MT: "https://www.sefaz.mt.gov.br/cadastro/emissaocartao/emissaocartaocontribuinteacessodireto",
  MS: "http://www1.sefaz.ms.gov.br/Cadastro/sintegra/cadastromsCCI.asp",
};

// ============ Helpers ============
const maskCnpj = (v: string) =>
  v
    .replace(/\D/g, "")
    .substring(0, 14)
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");

const isValidCnpj = (raw: string) => {
  const cnpj = raw.replace(/\D/g, "");
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
  const calc = (base: string) => {
    let sum = 0;
    let pos = base.length - 7;
    for (let i = base.length; i >= 1; i--) {
      sum += parseInt(base.charAt(base.length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };
  const d1 = calc(cnpj.substring(0, 12));
  const d2 = calc(cnpj.substring(0, 12) + d1);
  return d1 === parseInt(cnpj.charAt(12)) && d2 === parseInt(cnpj.charAt(13));
};

// ============ Disclaimer ============
function Disclaimer({ onAccept }: { onAccept: () => void }) {
  const [checked, setChecked] = useState(false);
  return (
    <Overlay>
      <ModalBox>
        <ModalHeader>
          <h2>AVISO LEGAL E TERMO DE RESPONSABILIDADE</h2>
        </ModalHeader>
        <ModalBody>
          <p>
            Esta plataforma foi desenvolvida com o objetivo de centralizar consultas públicas
            de dados cadastrais disponibilizados por órgãos governamentais, proporcionando maior
            praticidade e agilidade aos usuários.
          </p>
          <p style={{ marginTop: 10 }}>
            As informações apresentadas nas consultas de CNPJ, Inscrição Estadual e enquadramento
            no Simples Nacional são obtidas diretamente de bases públicas disponibilizadas pela
            Receita Federal do Brasil, Secretarias de Fazenda Estaduais (SEFAZ) e demais órgãos
            competentes.
          </p>

          <h3>IMPORTANTE</h3>
          <ul>
            <li>Esta plataforma não altera, cria, corrige ou valida qualquer informação consultada.</li>
            <li>Os dados exibidos refletem exclusivamente as informações disponibilizadas pelos órgãos oficiais no momento da consulta.</li>
            <li>Não nos responsabilizamos por divergências, inconsistências, indisponibilidades, atrasos de atualização ou quaisquer erros eventualmente existentes nas bases de dados dos órgãos consultados.</li>
            <li>O usuário é o único responsável pela utilização das informações obtidas através desta plataforma, devendo sempre confirmar os dados junto aos órgãos oficiais quando necessário.</li>
          </ul>

          <h3>CONSULTA DE INSCRIÇÃO ESTADUAL</h3>
          <p>
            Devido às particularidades de cada unidade federativa, nem todas as Secretarias de
            Fazenda disponibilizam APIs ou serviços de integração para consulta automática de
            Inscrição Estadual.
          </p>
          <p style={{ marginTop: 8 }}>
            Nesses casos, quando não houver integração disponível, o usuário poderá ser
            redirecionado para o portal oficial da respectiva SEFAZ, onde a consulta deverá ser
            realizada diretamente no ambiente do órgão responsável.
          </p>

          <h3>DISPONIBILIDADE DOS SERVIÇOS</h3>
          <p>
            A disponibilidade das consultas depende integralmente do funcionamento dos sistemas e
            serviços fornecidos pelos órgãos governamentais responsáveis pelas informações.
            Eventuais interrupções, manutenções ou indisponibilidades desses serviços poderão
            impactar temporariamente o funcionamento desta plataforma.
          </p>

          <hr />
          <p>
            <strong>
              Ao utilizar esta plataforma, o usuário declara estar ciente e de acordo com os
              termos e condições acima descritos.
            </strong>
          </p>
        </ModalBody>
        <ModalFooter>
          <label>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            Li e concordo com os termos acima.
          </label>
          <Btn disabled={!checked} onClick={onAccept}>
            Aceite
          </Btn>
        </ModalFooter>
      </ModalBox>
    </Overlay>
  );
}

// ============ Alert Modal ============
function AlertModal({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <Overlay onClick={onClose}>
      <SmallModal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>Atenção</h2>
        </ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter style={{ justifyContent: "flex-end" }}>
          <Btn onClick={onClose}>OK</Btn>
        </ModalFooter>
      </SmallModal>
    </Overlay>
  );
}

// ============ Main App ============
type Tela = "cnpj" | "ie" | "simples";

export function PortalApp() {
  const [accepted, setAccepted] = useState<boolean>(false);
  const [tela, setTela] = useState<Tela>("cnpj");
  const [cnpj, setCnpj] = useState("");
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState<any>(null);
  const [alerta, setAlerta] = useState<string | null>(null);
  const [uf, setUf] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAccepted(localStorage.getItem("disclaimer_aceito") === "1");
    }
  }, []);

  const aceitar = () => {
    localStorage.setItem("disclaimer_aceito", "1");
    setAccepted(true);
  };

  const consultar = async () => {
    const raw = cnpj.replace(/\D/g, "");
    if (!isValidCnpj(raw)) {
      setAlerta("Dados inválidos. Digite um CNPJ válido.");
      return;
    }
    setLoading(true);
    setDados(null);
    try {
      const r = await fetch(`https://publica.cnpj.ws/cnpj/${raw}`);
      if (!r.ok) throw new Error("CNPJ não encontrado.");
      const d = await r.json();
      setDados(d);
    } catch (e: any) {
      setAlerta(e.message || "Erro na consulta.");
    } finally {
      setLoading(false);
    }
  };

  const abrirIE = () => {
    if (!uf) {
      setAlerta("Selecione uma UF.");
      return;
    }
    const url = UF_URLS[uf];
    if (url) window.open(url, "_blank");
  };

  const abrirSimples = () =>
    window.open("https://consopt.www8.receita.fazenda.gov.br/consultaoptantes", "_blank");

  const situacao = dados?.estabelecimento?.situacao_cadastral ?? "-";
  const porte = dados?.porte?.descricao ?? "-";
  const cnpjAtual = dados?.estabelecimento?.cnpj
    ? maskCnpj(dados.estabelecimento.cnpj)
    : "-";

  return (
    <>
      <GlobalStyle />
      {!accepted && <Disclaimer onAccept={aceitar} />}
      {alerta && <AlertModal message={alerta} onClose={() => setAlerta(null)} />}

      <Sidebar>
        <Logo>
          📋
          <br />
          Pesquisas Cadastrais
        </Logo>
        <Menu>
          <MenuButton $active={tela === "cnpj"} onClick={() => setTela("cnpj")}>
            Consulta CNPJ
          </MenuButton>
          <MenuButton $active={tela === "ie"} onClick={() => setTela("ie")}>
            Inscrição Estadual
          </MenuButton>
          <MenuButton $active={tela === "simples"} onClick={() => setTela("simples")}>
            Simples Nacional (tentar por API)
          </MenuButton>
        </Menu>
      </Sidebar>

      <Main>
        <TopBar>
          <h1>Consulta Fiscal Empresarial</h1>
          <p>Consulta completa de CNPJ, dados fiscais e societários.</p>
        </TopBar>

        <Dashboard>
          <Card>
            <h3>CNPJ Atual</h3>
            <h2>{cnpjAtual}</h2>
          </Card>
          <Card>
            <h3>Situação</h3>
            <h2>
              <Dot $color={dotColor(situacao)} />
              {situacao}
            </h2>
          </Card>
          <Card>
            <h3>Porte</h3>
            <h2>{porte}</h2>
          </Card>
        </Dashboard>

        {tela === "cnpj" && (
          <Panel>
            <h2 style={{ color: "#1e3a8a", marginBottom: 16 }}>Consulta CNPJ</h2>
            <Input
              placeholder="00.000.000/0000-00"
              value={cnpj}
              onChange={(e) => setCnpj(maskCnpj(e.target.value))}
              onKeyDown={(e) => e.key === "Enter" && consultar()}
            />
            <Btn onClick={consultar} disabled={loading}>
              {loading ? "Consultando..." : "Consultar"}
            </Btn>

            {dados && <ResultadoCNPJ dados={dados} onSimples={abrirSimples} />}
          </Panel>
        )}

        {tela === "ie" && (
          <Panel>
            <h2 style={{ color: "#1e3a8a", marginBottom: 16 }}>Consulta de Inscrição Estadual</h2>
            <p style={{ color: "#64748b", marginBottom: 16, fontSize: 14 }}>
              Selecione a UF para abrir o portal oficial da SEFAZ correspondente.
            </p>
            <Select value={uf} onChange={(e) => setUf(e.target.value)}>
              <option value="">Selecione a UF</option>
              {Object.keys(UF_URLS).sort().map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </Select>
            <Btn onClick={abrirIE}>Abrir Consulta IE</Btn>
          </Panel>
        )}

        {tela === "simples" && (
          <Panel>
            <h2 style={{ color: "#1e3a8a", marginBottom: 16 }}>Simples Nacional</h2>
            <p style={{ color: "#64748b", marginBottom: 16, fontSize: 14 }}>
              Consulte primeiro um CNPJ para ver o enquadramento via API, ou abra o portal
              oficial da Receita Federal.
            </p>
            {dados ? (
              <SimplesInfo dados={dados} />
            ) : (
              <Field>
                <div className="label">Nenhuma consulta de CNPJ realizada</div>
                <div className="valor">Vá em "Consulta CNPJ" e informe um CNPJ válido.</div>
              </Field>
            )}
            <div style={{ marginTop: 16 }}>
              <SecondaryBtn onClick={abrirSimples}>
                Abrir portal oficial Simples Nacional
              </SecondaryBtn>
            </div>
          </Panel>
        )}
      </Main>
    </>
  );
}

// ============ Resultado ============
function SimplesInfo({ dados }: { dados: any }) {
  const s = dados?.simples;
  if (!s) {
    return (
      <Field>
        <div className="label">Simples Nacional</div>
        <div className="valor">Sem informações disponíveis na API para este CNPJ.</div>
      </Field>
    );
  }
  return (
    <Grid>
      <Field>
        <div className="label">Optante Simples</div>
        <div className="valor">{s.simples || "-"}</div>
      </Field>
      <Field>
        <div className="label">Data Opção Simples</div>
        <div className="valor">{s.data_opcao_simples || "-"}</div>
      </Field>
      <Field>
        <div className="label">Data Exclusão Simples</div>
        <div className="valor">{s.data_exclusao_simples || "-"}</div>
      </Field>
      <Field>
        <div className="label">Optante MEI</div>
        <div className="valor">{s.mei || "-"}</div>
      </Field>
      <Field>
        <div className="label">Data Opção MEI</div>
        <div className="valor">{s.data_opcao_mei || "-"}</div>
      </Field>
      <Field>
        <div className="label">Data Exclusão MEI</div>
        <div className="valor">{s.data_exclusao_mei || "-"}</div>
      </Field>
    </Grid>
  );
}

function ResultadoCNPJ({ dados, onSimples }: { dados: any; onSimples: () => void }) {
  const est = dados.estabelecimento || {};
  const sit = est.situacao_cadastral || "-";
  const simples = dados.simples;
  const optante = simples?.simples ?? "Não informado";

  return (
    <>
      <Section>
        <h2>Dados Cadastrais e Endereço</h2>
        <Grid>
          <Field>
            <div className="label">CNPJ</div>
            <div className="valor">{est.cnpj ? maskCnpj(est.cnpj) : "-"}</div>
          </Field>
          <Field>
            <div className="label">Situação</div>
            <div className="valor" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Dot $color={dotColor(sit)} /> {sit}
            </div>
          </Field>
          <Field>
            <div className="label">Razão Social</div>
            <div className="valor">{dados.razao_social || "-"}</div>
          </Field>
          <Field>
            <div className="label">Nome Fantasia</div>
            <div className="valor">{est.nome_fantasia || "-"}</div>
          </Field>
          <Field>
            <div className="label">Natureza Jurídica</div>
            <div className="valor">{dados.natureza_juridica?.descricao || "-"}</div>
          </Field>
          <Field>
            <div className="label">Porte</div>
            <div className="valor">{dados.porte?.descricao || "-"}</div>
          </Field>
          <Field>
            <div className="label">Capital Social</div>
            <div className="valor">R$ {dados.capital_social || "-"}</div>
          </Field>
          <Field>
            <div className="label">Data de Abertura</div>
            <div className="valor">{est.data_inicio_atividade || "-"}</div>
          </Field>
          <Field>
            <div className="label">Logradouro</div>
            <div className="valor">
              {[est.tipo_logradouro, est.logradouro].filter(Boolean).join(" ") || "-"}
            </div>
          </Field>
          <Field>
            <div className="label">Número</div>
            <div className="valor">{est.numero || "-"}</div>
          </Field>
          <Field>
            <div className="label">Complemento</div>
            <div className="valor">{est.complemento || "-"}</div>
          </Field>
          <Field>
            <div className="label">Bairro</div>
            <div className="valor">{est.bairro || "-"}</div>
          </Field>
          <Field>
            <div className="label">CEP</div>
            <div className="valor">{est.cep || "-"}</div>
          </Field>
          <Field>
            <div className="label">Município</div>
            <div className="valor">{est.cidade?.nome || "-"}</div>
          </Field>
          <Field>
            <div className="label">UF</div>
            <div className="valor">{est.estado?.sigla || "-"}</div>
          </Field>
          <Field>
            <div className="label">Telefone</div>
            <div className="valor">{est.telefone1 || "-"}</div>
          </Field>
          <Field>
            <div className="label">E-mail</div>
            <div className="valor">{est.email || "-"}</div>
          </Field>
          <Field>
            <div className="label">Optante do Simples Nacional</div>
            <div className="valor">{optante}</div>
          </Field>
        </Grid>
      </Section>

      {simples && (
        <Section>
          <h2>Simples Nacional</h2>
          <SimplesInfo dados={dados} />
        </Section>
      )}

      <Section>
        <h2>CNAEs</h2>
        {est.atividade_principal && (
          <Field style={{ marginBottom: 10 }}>
            <div className="label">CNAE Principal</div>
            <div className="valor">
              {est.atividade_principal.id} - {est.atividade_principal.descricao}
            </div>
          </Field>
        )}
        {est.atividades_secundarias?.length ? (
          <Grid>
            {est.atividades_secundarias.map((c: any, i: number) => (
              <Field key={i}>
                <div className="label">Secundária</div>
                <div className="valor">{c.id} - {c.descricao}</div>
              </Field>
            ))}
          </Grid>
        ) : (
          <Field>
            <div className="valor">Sem CNAEs secundárias.</div>
          </Field>
        )}
      </Section>

      <Section>
        <h2>Sócios</h2>
        {dados.socios?.length ? (
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Qualificação</th>
                <th>Data Entrada</th>
              </tr>
            </thead>
            <tbody>
              {dados.socios.map((s: any, i: number) => (
                <tr key={i}>
                  <td>{s.nome || "-"}</td>
                  <td>{s.qualificacao?.descricao || s.qualificacao || "-"}</td>
                  <td>{s.data_entrada || "-"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Field>
            <div className="valor">Nenhum sócio encontrado.</div>
          </Field>
        )}
      </Section>

      <div style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <SecondaryBtn onClick={onSimples}>Abrir portal Simples Nacional</SecondaryBtn>
      </div>
    </>
  );
}
