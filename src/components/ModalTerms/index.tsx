import { useState } from "react";
import Modal from "../Modal";
import Button from "../Button";

const ModalTerms = ({ aceitar }: { aceitar: () => void }) => {
  const [checked, setChecked] = useState(false);

  return (
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
          <Button label="Aceite" disabled={!checked} onClick={aceitar} />
        </>
      }
    >
      <p>
        Esta plataforma foi desenvolvida com o objetivo de centralizar consultas públicas de dados
        cadastrais disponibilizados por órgãos governamentais, proporcionando maior praticidade e
        agilidade aos usuários.
      </p>
      <p style={{ marginTop: 10 }}>
        As informações apresentadas nas consultas de CNPJ, Inscrição Estadual e enquadramento no
        Simples Nacional são obtidas diretamente de bases públicas disponibilizadas pela Receita
        Federal do Brasil, Secretarias de Fazenda Estaduais (SEFAZ) e demais órgãos competentes.
      </p>

      <h3>IMPORTANTE</h3>
      <ul>
        <li>Esta plataforma não altera, cria, corrige ou valida qualquer informação consultada.</li>
        <li>
          Os dados exibidos refletem exclusivamente as informações disponibilizadas pelos órgãos
          oficiais no momento da consulta.
        </li>
        <li>
          Não nos responsabilizamos por divergências, inconsistências, indisponibilidades, atrasos
          de atualização ou quaisquer erros eventualmente existentes nas bases de dados dos órgãos
          consultados.
        </li>
        <li>
          O usuário é o único responsável pela utilização das informações obtidas através desta
          plataforma, devendo sempre confirmar os dados junto aos órgãos oficiais quando necessário.
        </li>
      </ul>

      <h3>CONSULTA DE INSCRIÇÃO ESTADUAL</h3>
      <p>
        Devido às particularidades de cada unidade federativa, nem todas as Secretarias de Fazenda
        disponibilizam APIs ou serviços de integração para consulta automática de Inscrição
        Estadual.
      </p>
      <p style={{ marginTop: 8 }}>
        Nesses casos, quando não houver integração disponível, o usuário poderá ser redirecionado
        para o portal oficial da respectiva SEFAZ, onde a consulta deverá ser realizada diretamente
        no ambiente do órgão responsável.
      </p>

      <h3>DISPONIBILIDADE DOS SERVIÇOS</h3>
      <p>
        A disponibilidade das consultas depende integralmente do funcionamento dos sistemas e
        serviços fornecidos pelos órgãos governamentais responsáveis pelas informações. Eventuais
        interrupções, manutenções ou indisponibilidades desses serviços poderão impactar
        temporariamente o funcionamento desta plataforma.
      </p>

      <hr />
      <p>
        <strong>
          Ao utilizar esta plataforma, o usuário declara estar ciente e de acordo com os termos e
          condições acima descritos.
        </strong>
      </p>
    </Modal>
  );
};

export default ModalTerms;
