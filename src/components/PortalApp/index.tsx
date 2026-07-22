import { useEffect, useState } from "react";
import { UF_URLS } from "@/utils/constants";
import { isValidCnpj } from "@/utils/validations";
import { maskCnpj } from "@/utils/mask";
import fotoLogo from "@/assets/agenor.jpeg";
import Modal from "../Modal";
import Button from "../Button";
import * as S from "./styles";

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

type Tela = "cnpj" | "ie" | "simples";

export function PortalApp() {
  const [accepted, setAccepted] = useState<boolean>(false);
  const [tela, setTela] = useState<Tela>("cnpj");
  const [cnpj, setCnpj] = useState("");
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState<any>(null);
  const [alerta, setAlerta] = useState<string | null>(null);
  const [uf, setUf] = useState("");
  const [checked, setChecked] = useState(false);

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
  const cnpjAtual = dados?.estabelecimento?.cnpj ? maskCnpj(dados.estabelecimento.cnpj) : "-";
  return (
    <>
      <S.GlobalStyle />
      {!accepted && (
        <Modal
          title="AVISO LEGAL E TERMO DE RESPONSABILIDADE"
          footer={
            <>
              <label>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
                Li e concordo com os termos acima.
              </label>
              <Button label="Aceitar" disabled={!checked} onClick={aceitar} />
            </>
          }
        >
          <p>
            Esta plataforma foi desenvolvida com o objetivo de centralizar consultas públicas de
            dados cadastrais disponibilizados por órgãos governamentais, proporcionando maior
            praticidade e agilidade aos usuários.
          </p>
          <p style={{ marginTop: 10 }}>
            As informações apresentadas nas consultas de CNPJ, Inscrição Estadual e enquadramento no
            Simples Nacional são obtidas diretamente de bases públicas disponibilizadas pela Receita
            Federal do Brasil, Secretarias de Fazenda Estaduais (SEFAZ) e demais órgãos competentes.
          </p>

          <h3>IMPORTANTE</h3>
          <ul>
            <li>
              Esta plataforma não altera, cria, corrige ou valida qualquer informação consultada.
            </li>
            <li>
              Os dados exibidos refletem exclusivamente as informações disponibilizadas pelos órgãos
              oficiais no momento da consulta.
            </li>
            <li>
              Não nos responsabilizamos por divergências, inconsistências, indisponibilidades,
              atrasos de atualização ou quaisquer erros eventualmente existentes nas bases de dados
              dos órgãos consultados.
            </li>
            <li>
              O usuário é o único responsável pela utilização das informações obtidas através desta
              plataforma, devendo sempre confirmar os dados junto aos órgãos oficiais quando
              necessário.
            </li>
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
              Ao utilizar esta plataforma, o usuário declara estar ciente e de acordo com os termos
              e condições acima descritos.
            </strong>
          </p>
        </Modal>
      )}
      {alerta && (
        <Modal
          title="Atenção"
          small
          onClose={() => setAlerta(null)}
          footer={<Button label="Ok" onClick={() => setAlerta(null)} />}
        >
          {alerta}
        </Modal>
      )}
      <S.Sidebar>
        <S.Logo>
          📋
          <br />
          Pesquisas Cadastrais
        </S.Logo>
        <S.Menu>
          <S.MenuButton $active={tela === "cnpj"} onClick={() => setTela("cnpj")}>
            Consulta CNPJ
          </S.MenuButton>
          <S.MenuButton $active={tela === "ie"} onClick={() => setTela("ie")}>
            Inscrição Estadual
          </S.MenuButton>
          <S.MenuButton $active={tela === "simples"} onClick={() => setTela("simples")}>
            Simples Nacional (tentar por API)
          </S.MenuButton>
        </S.Menu>
      </S.Sidebar>
      <S.Main>
        <S.TopBar>
          <h1>Consulta Fiscal Empresarial</h1>
          <p>Consulta completa de CNPJ, dados fiscais e societários.</p>
        </S.TopBar>

        <S.Dashboard>
          <S.Card>
            <h3>CNPJ Atual</h3>
            <h2>{cnpjAtual}</h2>
          </S.Card>
          <S.Card>
            <h3>Situação</h3>
            <h2>
              <S.Dot $color={dotColor(situacao)} />
              {situacao}
            </h2>
          </S.Card>
          <S.Card>
            <h3>Porte</h3>
            <h2>{porte}</h2>
          </S.Card>
        </S.Dashboard>

        {tela === "cnpj" && (
          <S.Panel>
            <h2 style={{ color: "#1e3a8a", marginBottom: 16 }}>Consulta CNPJ</h2>
            <S.Input
              placeholder="00.000.000/0000-00"
              value={cnpj}
              onChange={(e) => setCnpj(maskCnpj(e.target.value))}
              onKeyDown={(e) => e.key === "Enter" && consultar()}
            />
            <Button
              label={loading ? "Consultando..." : "Consultar"}
              onClick={consultar}
              disabled={loading}
            />
            {dados && <ResultadoCNPJ dados={dados} onSimples={abrirSimples} />}
          </S.Panel>
        )}

        {tela === "ie" && (
          <S.Panel>
            <h2 style={{ color: "#1e3a8a", marginBottom: 16 }}>Consulta de Inscrição Estadual</h2>
            <p style={{ color: "#64748b", marginBottom: 16, fontSize: 14 }}>
              Selecione a UF para abrir o portal oficial da SEFAZ correspondente.
            </p>
            <S.Select value={uf} onChange={(e) => setUf(e.target.value)}>
              <option value="">Selecione a UF</option>
              {Object.keys(UF_URLS)
                .sort()
                .map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
            </S.Select>
            <Button label="Abrir Consulta IE" onClick={abrirIE} />
          </S.Panel>
        )}

        {tela === "simples" && (
          <S.Panel>
            <h2 style={{ color: "#1e3a8a", marginBottom: 16 }}>Simples Nacional</h2>
            <p style={{ color: "#64748b", marginBottom: 16, fontSize: 14 }}>
              Consulte primeiro um CNPJ para ver o enquadramento via API, ou abra o portal oficial
              da Receita Federal.
            </p>
            {dados ? (
              <SimplesInfo dados={dados} />
            ) : (
              <S.Field>
                <div className="label">Nenhuma consulta de CNPJ realizada</div>
                <div className="valor">Vá em "Consulta CNPJ" e informe um CNPJ válido.</div>
              </S.Field>
            )}
            <div style={{ marginTop: 16 }}>
              <Button
                color="secondary"
                label="Abrir portal oficial Simples Nacional"
                onClick={abrirSimples}
              />
            </div>
          </S.Panel>
        )}
      </S.Main>
    </>
  );
}

// ============ Resultado ============
function SimplesInfo({ dados }: { dados: any }) {
  const s = dados?.simples;
  if (!s) {
    return (
      <S.Field>
        <div className="label">Simples Nacional</div>
        <div className="valor">Sem informações disponíveis na API para este CNPJ.</div>
      </S.Field>
    );
  }
  return (
    <S.Grid>
      <S.Field>
        <div className="label">Optante Simples</div>
        <div className="valor">{s.simples || "-"}</div>
      </S.Field>
      <S.Field>
        <div className="label">Data Opção Simples</div>
        <div className="valor">{s.data_opcao_simples || "-"}</div>
      </S.Field>
      <S.Field>
        <div className="label">Data Exclusão Simples</div>
        <div className="valor">{s.data_exclusao_simples || "-"}</div>
      </S.Field>
      <S.Field>
        <div className="label">Optante MEI</div>
        <div className="valor">{s.mei || "-"}</div>
      </S.Field>
      <S.Field>
        <div className="label">Data Opção MEI</div>
        <div className="valor">{s.data_opcao_mei || "-"}</div>
      </S.Field>
      <S.Field>
        <div className="label">Data Exclusão MEI</div>
        <div className="valor">{s.data_exclusao_mei || "-"}</div>
      </S.Field>
    </S.Grid>
  );
}

function ResultadoCNPJ({ dados, onSimples }: { dados: any; onSimples: () => void }) {
  const est = dados.estabelecimento || {};
  const sit = est.situacao_cadastral || "-";
  const simples = dados.simples;
  const optante = simples?.simples ?? "Não informado";

  return (
    <>
      <S.Section>
        <h2>Dados Cadastrais e Endereço</h2>
        <S.Grid>
          <S.Field>
            <div className="label">CNPJ</div>
            <div className="valor">{est.cnpj ? maskCnpj(est.cnpj) : "-"}</div>
          </S.Field>
          <S.Field>
            <div className="label">Situação</div>
            <div className="valor" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <S.Dot $color={dotColor(sit)} /> {sit}
            </div>
          </S.Field>
          <S.Field>
            <div className="label">Razão Social</div>
            <div className="valor">{dados.razao_social || "-"}</div>
          </S.Field>
          <S.Field>
            <div className="label">Nome Fantasia</div>
            <div className="valor">{est.nome_fantasia || "-"}</div>
          </S.Field>
          <S.Field>
            <div className="label">Natureza Jurídica</div>
            <div className="valor">{dados.natureza_juridica?.descricao || "-"}</div>
          </S.Field>
          <S.Field>
            <div className="label">Porte</div>
            <div className="valor">{dados.porte?.descricao || "-"}</div>
          </S.Field>
          <S.Field>
            <div className="label">Capital Social</div>
            <div className="valor">R$ {dados.capital_social || "-"}</div>
          </S.Field>
          <S.Field>
            <div className="label">Data de Abertura</div>
            <div className="valor">{est.data_inicio_atividade || "-"}</div>
          </S.Field>
          <S.Field>
            <div className="label">Logradouro</div>
            <div className="valor">
              {[est.tipo_logradouro, est.logradouro].filter(Boolean).join(" ") || "-"}
            </div>
          </S.Field>
          <S.Field>
            <div className="label">Número</div>
            <div className="valor">{est.numero || "-"}</div>
          </S.Field>
          <S.Field>
            <div className="label">Complemento</div>
            <div className="valor">{est.complemento || "-"}</div>
          </S.Field>
          <S.Field>
            <div className="label">Bairro</div>
            <div className="valor">{est.bairro || "-"}</div>
          </S.Field>
          <S.Field>
            <div className="label">CEP</div>
            <div className="valor">{est.cep || "-"}</div>
          </S.Field>
          <S.Field>
            <div className="label">Município</div>
            <div className="valor">{est.cidade?.nome || "-"}</div>
          </S.Field>
          <S.Field>
            <div className="label">UF</div>
            <div className="valor">{est.estado?.sigla || "-"}</div>
          </S.Field>
          <S.Field>
            <div className="label">Telefone</div>
            <div className="valor">{est.telefone1 || "-"}</div>
          </S.Field>
          <S.Field>
            <div className="label">E-mail</div>
            <div className="valor">{est.email || "-"}</div>
          </S.Field>
          <S.Field>
            <div className="label">Optante do Simples Nacional</div>
            <div className="valor">{optante}</div>
          </S.Field>
        </S.Grid>
      </S.Section>

      {simples && (
        <S.Section>
          <h2>Simples Nacional</h2>
          <SimplesInfo dados={dados} />
        </S.Section>
      )}

      <S.Section>
        <h2>CNAEs</h2>
        {est.atividade_principal && (
          <S.Field style={{ marginBottom: 10 }}>
            <div className="label">CNAE Principal</div>
            <div className="valor">
              {est.atividade_principal.id} - {est.atividade_principal.descricao}
            </div>
          </S.Field>
        )}
        {est.atividades_secundarias?.length ? (
          <S.Grid>
            {est.atividades_secundarias.map((c: any, i: number) => (
              <S.Field key={i}>
                <div className="label">Secundária</div>
                <div className="valor">
                  {c.id} - {c.descricao}
                </div>
              </S.Field>
            ))}
          </S.Grid>
        ) : (
          <S.Field>
            <div className="valor">Sem CNAEs secundárias.</div>
          </S.Field>
        )}
      </S.Section>

      <S.Section>
        <h2>Sócios</h2>
        {dados.socios?.length ? (
          <S.Table>
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
          </S.Table>
        ) : (
          <S.Field>
            <div className="valor">Nenhum sócio encontrado.</div>
          </S.Field>
        )}
      </S.Section>

      <div style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Button color="secondary" label="Abrir portal Simples Nacional" onClick={onSimples} />
      </div>
    </>
  );
}
