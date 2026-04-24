/**
 * =============================================================================
 * ARQUIVO DE CONFIGURAÇÃO DO JOGO DA MEMÓRIA — FERIDAS E TRATAMENTOS
 * =============================================================================
 *
 * Como editar:
 * - Cada nível contém um array de "pares" (pairs).
 * - Cada par tem:
 *   - id: identificador único do par (string)
 *   - ferida: { imagem, titulo, descricao } — carta azul (tipo de ferida)
 *   - tratamento: { imagem, titulo, descricao } — carta verde (tratamento correto)
 *
 * Como adicionar imagens:
 * 1. Faça o upload da imagem com: manus-upload-file --webdev caminho/da/imagem.png
 * 2. Use a URL retornada no campo "imagem" abaixo.
 * 3. Enquanto não tiver a imagem, deixe o campo "imagem" como "" (string vazia)
 *    e o jogo exibirá um placeholder com o título.
 *
 * Exemplo de estrutura:
 * {
 *   id: "laceracao",
 *   ferida: {
 *     imagem: "https://cdn.exemplo.com/laceracao.png",
 *     titulo: "Laceração",
 *     descricao: "Ferida com bordas irregulares e rasgadas."
 *   },
 *   tratamento: {
 *     imagem: "https://cdn.exemplo.com/limpeza-sutura.png",
 *     titulo: "Limpeza Profunda e Sutura",
 *     descricao: "Remover sujidade e aproximar bordas da ferida."
 *   }
 * }
 * =============================================================================
 */

export interface CardData {
  imagem: string;
  titulo: string;
  descricao: string;
}

export interface Par {
  id: string;
  ferida: CardData;
  tratamento: CardData;
}

export interface Nivel {
  numero: number;
  titulo: string;
  descricao: string;
  pares: Par[];
}

// URLs das imagens geradas
const IMAGES = {
  wound_laceration: "https://d2xsxph8kpxj0f.cloudfront.net/310519663596017988/WeP2ABiaiWnTVCRVFYx4pY/wound-laceration-KWEb9Dp22VtyVjkskvNx4L.webp",
  treatment_suture: "https://d2xsxph8kpxj0f.cloudfront.net/310519663596017988/WeP2ABiaiWnTVCRVFYx4pY/treatment-suture-PMBGPg8PYevxYnudLnJCSS.webp",
  wound_avulsion: "https://d2xsxph8kpxj0f.cloudfront.net/310519663596017988/WeP2ABiaiWnTVCRVFYx4pY/wound-avulsion-8DXQbLpZ98oEs24nwKXQ8D.webp",
  treatment_flap_preservation: "https://d2xsxph8kpxj0f.cloudfront.net/310519663596017988/WeP2ABiaiWnTVCRVFYx4pY/treatment-flap-preservation-EBmGWZQPYQweH2UjeAnNLz.webp",
  wound_bite: "https://d2xsxph8kpxj0f.cloudfront.net/310519663596017988/WeP2ABiaiWnTVCRVFYx4pY/wound-bite-RPMmc5nDaenUHyiyVjAEjd.webp",
  treatment_bite_wash: "https://d2xsxph8kpxj0f.cloudfront.net/310519663596017988/WeP2ABiaiWnTVCRVFYx4pY/treatment-bite-wash-SWHczCsv9WiFtMg3682YcX.webp",
  wound_contusion: "https://d2xsxph8kpxj0f.cloudfront.net/310519663596017988/WeP2ABiaiWnTVCRVFYx4pY/wound-contusion-mf59XehqTbEH2W9otGueDL.webp",
  treatment_ice: "https://d2xsxph8kpxj0f.cloudfront.net/310519663596017988/WeP2ABiaiWnTVCRVFYx4pY/treatment-ice-KKQMRDSMYkEGgLfqXUXXY9.webp",
  wound_evisceration: "https://d2xsxph8kpxj0f.cloudfront.net/310519663596017988/WeP2ABiaiWnTVCRVFYx4pY/wound-evisceration-KgtvGKKNUoMpJtyeYDrshh.webp",
  treatment_evisceration_cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663596017988/WeP2ABiaiWnTVCRVFYx4pY/treatment-evisceration-cover-CWG7T58WrsAp5iqzNaBVii.webp",
  wound_infected: "https://d2xsxph8kpxj0f.cloudfront.net/310519663596017988/WeP2ABiaiWnTVCRVFYx4pY/wound-infected-jRVWqYmnnD5WJaih2phdoS.webp",
  treatment_antibiotics: "https://d2xsxph8kpxj0f.cloudfront.net/310519663596017988/WeP2ABiaiWnTVCRVFYx4pY/treatment-antibiotics-An5YtNbWBYdRuQNbiFbbZi.webp",
  wound_burn_1st: "https://d2xsxph8kpxj0f.cloudfront.net/310519663596017988/WeP2ABiaiWnTVCRVFYx4pY/wound-burn-1st-PZrbhw2dow2YNRPQ8fkcnS.webp",
  treatment_burn_cool: "https://d2xsxph8kpxj0f.cloudfront.net/310519663596017988/WeP2ABiaiWnTVCRVFYx4pY/treatment-burn-cool-gzcYndyc6CZmjHFiNKMNPF.webp",
  wound_burn_2nd: "https://d2xsxph8kpxj0f.cloudfront.net/310519663596017988/WeP2ABiaiWnTVCRVFYx4pY/wound-burn-2nd-KzEZFDf7w6f5myX3tbE5q7.webp",
  treatment_burn_dressing: "https://d2xsxph8kpxj0f.cloudfront.net/310519663596017988/WeP2ABiaiWnTVCRVFYx4pY/treatment-burn-dressing-mVBqQMkS9zTEnEHUno4Pa8.webp",
  wound_burn_3rd: "https://d2xsxph8kpxj0f.cloudfront.net/310519663596017988/WeP2ABiaiWnTVCRVFYx4pY/wound-burn-3rd-KzEZFDf7w6f5myX3tbE5q7.webp",
  treatment_burn_graft: "https://d2xsxph8kpxj0f.cloudfront.net/310519663596017988/WeP2ABiaiWnTVCRVFYx4pY/treatment-burn-graft-8e6db5md3hvFr63RWtHMm8.webp",
  wound_pressure_ulcer: "https://d2xsxph8kpxj0f.cloudfront.net/310519663596017988/WeP2ABiaiWnTVCRVFYx4pY/wound-pressure-ulcer-22KX8WVaYzdDPvPjsqAicN.webp",
  treatment_pressure_relief: "https://d2xsxph8kpxj0f.cloudfront.net/310519663596017988/WeP2ABiaiWnTVCRVFYx4pY/treatment-pressure-relief-M5AQLLKU2RzKDWZLuTUMEV.webp",
};

// =============================================================================
// DADOS DOS NÍVEIS — EDITE AQUI PARA ADICIONAR/MODIFICAR PARES E IMAGENS
// =============================================================================

export const NIVEIS: Nivel[] = [
  // ---------------------------------------------------------------------------
  // NÍVEL 1 — Básico (4 pares = 8 cartas)
  // ---------------------------------------------------------------------------
  {
    numero: 1,
    titulo: "Nível 1 — Básico",
    descricao: "Feridas comuns do dia a dia e seus primeiros socorros.",
    pares: [
      {
        id: "laceracao",
        ferida: {
          imagem: IMAGES.wound_laceration,
          titulo: "Laceração",
          descricao: "Ferida com bordas irregulares e rasgadas causada por trauma.",
        },
        tratamento: {
          imagem: IMAGES.treatment_suture,
          titulo: "Limpeza Profunda e Sutura",
          descricao: "Remover sujidade e aproximar as bordas da ferida com suturas.",
        },
      },
      {
        id: "avulsao",
        ferida: {
          imagem: IMAGES.wound_avulsion,
          titulo: "Avulsão",
          descricao: "Arrancamento parcial ou total da pele e tecidos adjacentes.",
        },
        tratamento: {
          imagem: IMAGES.treatment_flap_preservation,
          titulo: "Preservar Retalho e Socorro Imediato",
          descricao: "Manter o tecido úmido em gaze estéril e buscar cirurgião especializado.",
        },
      },
      {
        id: "mordedura",
        ferida: {
          imagem: IMAGES.wound_bite,
          titulo: "Mordedura",
          descricao: "Lesão causada por dentes de animal ou humano com risco de infecção.",
        },
        tratamento: {
          imagem: IMAGES.treatment_bite_wash,
          titulo: "Lavagem Intensa e Profilaxia",
          descricao: "Lavar com água e sabão; verificar necessidade de vacinas contra Raiva e Tétano.",
        },
      },
      {
        id: "contusao",
        ferida: {
          imagem: IMAGES.wound_contusion,
          titulo: "Contusão / Hematoma",
          descricao: "Impacto sem rompimento da pele, com equimose (roxo) e inchaço.",
        },
        tratamento: {
          imagem: IMAGES.treatment_ice,
          titulo: "Compressas Frias / Gelo",
          descricao: "Aplicação de frio terapêutico para reduzir dor e formação de edema.",
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // NÍVEL 2 — Intermediário (5 pares = 10 cartas)
  // ---------------------------------------------------------------------------
  {
    numero: 2,
    titulo: "Nível 2 — Intermediário",
    descricao: "Feridas mais complexas com tratamentos específicos.",
    pares: [
      {
        id: "evisceração",
        ferida: {
          imagem: IMAGES.wound_evisceration,
          titulo: "Evisceração",
          descricao: "Ferida abdominal grave com exposição de órgãos internos.",
        },
        tratamento: {
          imagem: IMAGES.treatment_evisceration_cover,
          titulo: "Cobertura Úmida e Não Reintroduzir",
          descricao: "Cobrir com gaze úmida e estéril; jamais tentar recolocar os órgãos.",
        },
      },
      {
        id: "ferida_infectada",
        ferida: {
          imagem: IMAGES.wound_infected,
          titulo: "Ferida Infectada",
          descricao: "Presença de pus, calor local, rubor, edema e odor desagradável.",
        },
        tratamento: {
          imagem: IMAGES.treatment_antibiotics,
          titulo: "Avaliação para Antibióticos",
          descricao: "Coletar cultura da secreção e iniciar antimicrobianos conforme prescrição.",
        },
      },
      {
        id: "queimadura_1",
        ferida: {
          imagem: IMAGES.wound_burn_1st,
          titulo: "Queimadura 1º Grau",
          descricao: "Atinge apenas a epiderme; vermelhidão sem bolhas, como um queimadura solar.",
        },
        tratamento: {
          imagem: IMAGES.treatment_burn_cool,
          titulo: "Resfriamento com Água Corrente",
          descricao: "Resfriar a área por 10-20 minutos com água fria corrente.",
        },
      },
      {
        id: "queimadura_2",
        ferida: {
          imagem: IMAGES.wound_burn_2nd,
          titulo: "Queimadura 2º Grau",
          descricao: "Atinge derme; formação de bolhas e dor intensa com eritema.",
        },
        tratamento: {
          imagem: IMAGES.treatment_burn_dressing,
          titulo: "Curativo Não Aderente",
          descricao: "Não romper bolhas; cobrir com curativo estéril não aderente.",
        },
      },
      {
        id: "abrasao",
        ferida: {
          imagem: IMAGES.wound_contusion,
          titulo: "Abrasão / Escoriação",
          descricao: "Raspagem superficial da pele por atrito ou queda.",
        },
        tratamento: {
          imagem: IMAGES.treatment_ice,
          titulo: "Limpeza e Curativo Simples",
          descricao: "Lavar com soro fisiológico e aplicar curativo protetor.",
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // NÍVEL 3 — Avançado (6 pares = 12 cartas)
  // ---------------------------------------------------------------------------
  {
    numero: 3,
    titulo: "Nível 3 — Avançado",
    descricao: "Feridas graves e situações de emergência clínica.",
    pares: [
      {
        id: "queimadura_3",
        ferida: {
          imagem: IMAGES.wound_burn_3rd,
          titulo: "Queimadura 3º Grau",
          descricao: "Destruição total da pele; área esbranquiçada ou carbonizada.",
        },
        tratamento: {
          imagem: IMAGES.treatment_burn_graft,
          titulo: "Internação e Enxertia",
          descricao: "Tratamento hospitalar com desbridamento e enxerto de pele.",
        },
      },
      {
        id: "ferida_necrotica",
        ferida: {
          imagem: IMAGES.wound_infected,
          titulo: "Ferida Necrótica",
          descricao: "Tecido morto (necrose) de coloração escura na ferida.",
        },
        tratamento: {
          imagem: IMAGES.treatment_antibiotics,
          titulo: "Desbridamento",
          descricao: "Remoção do tecido necrótico para estimular cicatrização.",
        },
      },
      {
        id: "ulcera_pressao",
        ferida: {
          imagem: IMAGES.wound_pressure_ulcer,
          titulo: "Úlcera por Pressão",
          descricao: "Lesão por compressão prolongada em proeminências ósseas.",
        },
        tratamento: {
          imagem: IMAGES.treatment_pressure_relief,
          titulo: "Alívio de Pressão e Cobertura Especial",
          descricao: "Reposicionamento frequente e uso de coberturas hidrocoloides.",
        },
      },
      {
        id: "ferida_cirurgica",
        ferida: {
          imagem: IMAGES.wound_laceration,
          titulo: "Ferida Cirúrgica Deiscente",
          descricao: "Abertura parcial ou total de sutura pós-operatória.",
        },
        tratamento: {
          imagem: IMAGES.treatment_suture,
          titulo: "Curativo Úmido e Reavaliação Cirúrgica",
          descricao: "Manter úmido com soro e encaminhar para reavaliação cirúrgica.",
        },
      },
      {
        id: "fistula",
        ferida: {
          imagem: IMAGES.wound_infected,
          titulo: "Fístula",
          descricao: "Canal anormal entre dois órgãos ou entre órgão e pele.",
        },
        tratamento: {
          imagem: IMAGES.treatment_antibiotics,
          titulo: "Proteção Perilesional e Cirurgia",
          descricao: "Proteger pele ao redor e tratar cirurgicamente a causa.",
        },
      },
      {
        id: "sindrome_compartimental",
        ferida: {
          imagem: IMAGES.wound_contusion,
          titulo: "Síndrome Compartimental",
          descricao: "Pressão elevada em compartimento muscular fechado.",
        },
        tratamento: {
          imagem: IMAGES.treatment_ice,
          titulo: "Fasciotomia de Emergência",
          descricao: "Incisão cirúrgica imediata para aliviar a pressão do compartimento.",
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // NÍVEL 4 — Especializado (4 pares = 8 cartas)
  // ---------------------------------------------------------------------------
  {
    numero: 4,
    titulo: "Nível 4 — Especializado",
    descricao: "Feridas especializadas em cuidados de enfermagem avançada.",
    pares: [
      {
        id: "ferida_diabetica",
        ferida: {
          imagem: IMAGES.wound_pressure_ulcer,
          titulo: "Ferida Diabética",
          descricao: "Úlcera em pé de diabético com risco de infecção e gangrena.",
        },
        tratamento: {
          imagem: IMAGES.treatment_pressure_relief,
          titulo: "Controle Glicêmico e Desbridamento",
          descricao: "Manter glicemia controlada, desbridar tecido necrótico e usar coberturas especiais.",
        },
      },
      {
        id: "ferida_vascular",
        ferida: {
          imagem: IMAGES.wound_laceration,
          titulo: "Ferida com Hemorragia Arterial",
          descricao: "Sangramento abundante e pulsátil de artéria lesionada.",
        },
        tratamento: {
          imagem: IMAGES.treatment_suture,
          titulo: "Compressão Direta e Hemostasia",
          descricao: "Aplicar compressão direta, elevar membro e ligar artéria se necessário.",
        },
      },
      {
        id: "ferida_contaminada",
        ferida: {
          imagem: IMAGES.wound_bite,
          titulo: "Ferida Contaminada",
          descricao: "Ferida com presença de material estranho ou sujidade visível.",
        },
        tratamento: {
          imagem: IMAGES.treatment_bite_wash,
          titulo: "Limpeza Rigorosa e Irrigação",
          descricao: "Irrigar abundantemente com soro fisiológico e remover todo material estranho.",
        },
      },
      {
        id: "ferida_queloide",
        ferida: {
          imagem: IMAGES.wound_avulsion,
          titulo: "Cicatriz Queloide",
          descricao: "Cicatrização excessiva com crescimento além dos limites da ferida original.",
        },
        tratamento: {
          imagem: IMAGES.treatment_flap_preservation,
          titulo: "Tratamento Preventivo e Terapêutico",
          descricao: "Usar silicone, compressão e possível tratamento com laser ou injeções.",
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // NÍVEL 5 — Crítico (5 pares = 10 cartas)
  // ---------------------------------------------------------------------------
  {
    numero: 5,
    titulo: "Nível 5 — Crítico",
    descricao: "Feridas críticas que requerem intervenção imediata.",
    pares: [
      {
        id: "ferida_penetrante_torax",
        ferida: {
          imagem: IMAGES.wound_evisceration,
          titulo: "Ferida Penetrante de Tórax",
          descricao: "Lesão que atravessa a parede torácica com risco de pneumotórax.",
        },
        tratamento: {
          imagem: IMAGES.treatment_evisceration_cover,
          titulo: "Oclusão com Curativo Selado",
          descricao: "Cobrir com curativo oclusivo em 3 lados para evitar pneumotórax aberto.",
        },
      },
      {
        id: "ferida_penetrante_abdomen",
        ferida: {
          imagem: IMAGES.wound_evisceration,
          titulo: "Ferida Penetrante de Abdômen",
          descricao: "Lesão profunda com risco de lesão de órgãos internos.",
        },
        tratamento: {
          imagem: IMAGES.treatment_evisceration_cover,
          titulo: "Cobertura Estéril e Transporte Urgente",
          descricao: "Cobrir com gaze estéril e transportar imediatamente para cirurgia.",
        },
      },
      {
        id: "ferida_esmagamento",
        ferida: {
          imagem: IMAGES.wound_contusion,
          titulo: "Ferida de Esmagamento",
          descricao: "Lesão por compressão severa com destruição de tecidos múltiplos.",
        },
        tratamento: {
          imagem: IMAGES.treatment_ice,
          titulo: "Suporte de Membro e Monitoramento",
          descricao: "Imobilizar, elevar, resfriar e monitorar sinais de síndrome compartimental.",
        },
      },
      {
        id: "ferida_animal_grande",
        ferida: {
          imagem: IMAGES.wound_bite,
          titulo: "Ferida por Animal Grande",
          descricao: "Lesão extensa causada por ataque de animal com risco de raiva.",
        },
        tratamento: {
          imagem: IMAGES.treatment_bite_wash,
          titulo: "Limpeza Agressiva e Profilaxia",
          descricao: "Lavar abundantemente, iniciar imunoglobulina anti-rábica e vacina.",
        },
      },
      {
        id: "queimadura_extensa",
        ferida: {
          imagem: IMAGES.wound_burn_3rd,
          titulo: "Queimadura Extensa (>20% SCBA)",
          descricao: "Queimadura grave afetando grande área corporal com risco de choque.",
        },
        tratamento: {
          imagem: IMAGES.treatment_burn_graft,
          titulo: "Reposição Volêmica e Transporte",
          descricao: "Iniciar acesso venoso, reposição de fluidos e transporte para centro especializado.",
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // NÍVEL 6 — Reconstrução (4 pares = 8 cartas)
  // ---------------------------------------------------------------------------
  {
    numero: 6,
    titulo: "Nível 6 — Reconstrução",
    descricao: "Feridas em fase de cicatrização e reconstrução tecidual.",
    pares: [
      {
        id: "ferida_granulacao",
        ferida: {
          imagem: IMAGES.wound_pressure_ulcer,
          titulo: "Ferida em Granulação",
          descricao: "Ferida em fase de cicatrização com tecido de granulação vermelho.",
        },
        tratamento: {
          imagem: IMAGES.treatment_pressure_relief,
          titulo: "Cobertura Úmida Mantida",
          descricao: "Usar coberturas que mantêm umidade adequada para estimular cicatrização.",
        },
      },
      {
        id: "ferida_epitelizacao",
        ferida: {
          imagem: IMAGES.wound_laceration,
          titulo: "Ferida em Epitelização",
          descricao: "Ferida em fase final de cicatrização com formação de epiderme.",
        },
        tratamento: {
          imagem: IMAGES.treatment_suture,
          titulo: "Proteção e Hidratação",
          descricao: "Proteger de trauma e manter hidratada para evitar ressecamento.",
        },
      },
      {
        id: "cicatriz_hipertrofica",
        ferida: {
          imagem: IMAGES.wound_avulsion,
          titulo: "Cicatriz Hipertrófica",
          descricao: "Cicatrização excessiva dentro dos limites da ferida original.",
        },
        tratamento: {
          imagem: IMAGES.treatment_flap_preservation,
          titulo: "Massagem e Silicone",
          descricao: "Usar géis de silicone, compressão e massagem para melhorar cicatriz.",
        },
      },
      {
        id: "ferida_recorrente",
        ferida: {
          imagem: IMAGES.wound_infected,
          titulo: "Ferida Recorrente",
          descricao: "Ferida que reabre ou não cicatriza adequadamente.",
        },
        tratamento: {
          imagem: IMAGES.treatment_antibiotics,
          titulo: "Investigação de Causa e Tratamento",
          descricao: "Investigar causa (infecção, isquemia, etc) e ajustar tratamento.",
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // NÍVEL 7 — Complicações (5 pares = 10 cartas)
  // ---------------------------------------------------------------------------
  {
    numero: 7,
    titulo: "Nível 7 — Complicações",
    descricao: "Complicações de feridas e suas intervenções.",
    pares: [
      {
        id: "ferida_celulite",
        ferida: {
          imagem: IMAGES.wound_infected,
          titulo: "Celulite Periferida",
          descricao: "Inflamação e infecção dos tecidos ao redor da ferida.",
        },
        tratamento: {
          imagem: IMAGES.treatment_antibiotics,
          titulo: "Antibióticos Sistêmicos",
          descricao: "Iniciar antibióticos de amplo espectro e elevar membro afetado.",
        },
      },
      {
        id: "ferida_osteomielite",
        ferida: {
          imagem: IMAGES.wound_pressure_ulcer,
          titulo: "Osteomielite",
          descricao: "Infecção do osso adjacente à ferida com risco de sepse.",
        },
        tratamento: {
          imagem: IMAGES.treatment_pressure_relief,
          titulo: "Antibióticos IV e Possível Cirurgia",
          descricao: "Antibióticos intravenosos prolongados e possível desbridamento ósseo.",
        },
      },
      {
        id: "ferida_gangrena",
        ferida: {
          imagem: IMAGES.wound_burn_3rd,
          titulo: "Gangrena",
          descricao: "Morte tecidual extensa com risco de sepse e morte.",
        },
        tratamento: {
          imagem: IMAGES.treatment_burn_graft,
          titulo: "Amputação e Suporte Sistêmico",
          descricao: "Amputação do tecido necrótico, antibióticos e suporte hemodinâmico.",
        },
      },
      {
        id: "ferida_seroma",
        ferida: {
          imagem: IMAGES.wound_laceration,
          titulo: "Seroma",
          descricao: "Acúmulo de líquido seroso sob a ferida cirúrgica.",
        },
        tratamento: {
          imagem: IMAGES.treatment_suture,
          titulo: "Drenagem e Compressão",
          descricao: "Drenar o seroma e aplicar compressão para evitar recorrência.",
        },
      },
      {
        id: "ferida_hematoma",
        ferida: {
          imagem: IMAGES.wound_contusion,
          titulo: "Hematoma Pós-operatório",
          descricao: "Acúmulo de sangue sob a ferida cirúrgica.",
        },
        tratamento: {
          imagem: IMAGES.treatment_ice,
          titulo: "Drenagem Cirúrgica",
          descricao: "Drenar o hematoma cirurgicamente se sintomático ou volumoso.",
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // NÍVEL 8 — Especial (4 pares = 8 cartas)
  // ---------------------------------------------------------------------------
  {
    numero: 8,
    titulo: "Nível 8 — Especial",
    descricao: "Feridas especiais e situações clínicas únicas.",
    pares: [
      {
        id: "ferida_radiacao",
        ferida: {
          imagem: IMAGES.wound_burn_3rd,
          titulo: "Ferida por Radiação",
          descricao: "Lesão tecidual causada por exposição a radiação ionizante.",
        },
        tratamento: {
          imagem: IMAGES.treatment_burn_graft,
          titulo: "Proteção e Reconstrução",
          descricao: "Proteger de infecção e considerar reconstrução cirúrgica.",
        },
      },
      {
        id: "ferida_quimica",
        ferida: {
          imagem: IMAGES.wound_burn_2nd,
          titulo: "Ferida Química",
          descricao: "Lesão causada por contato com substância química corrosiva.",
        },
        tratamento: {
          imagem: IMAGES.treatment_burn_cool,
          titulo: "Irrigação Abundante",
          descricao: "Irrigar abundantemente com água ou soro fisiológico por 15-20 minutos.",
        },
      },
      {
        id: "ferida_eletrica",
        ferida: {
          imagem: IMAGES.wound_laceration,
          titulo: "Ferida Elétrica",
          descricao: "Lesão por queimadura elétrica com entrada e saída de corrente.",
        },
        tratamento: {
          imagem: IMAGES.treatment_suture,
          titulo: "Monitoramento Cardíaco e Cirurgia",
          descricao: "Monitorar coração, investigar lesão profunda e possível cirurgia.",
        },
      },
      {
        id: "ferida_frio",
        ferida: {
          imagem: IMAGES.wound_contusion,
          titulo: "Queimadura por Frio (Congelamento)",
          descricao: "Lesão tecidual causada por congelamento e cristalização celular.",
        },
        tratamento: {
          imagem: IMAGES.treatment_ice,
          titulo: "Reaquecimento Gradual",
          descricao: "Reaquecer gradualmente em água morna (37-40°C) e evitar fricção.",
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // NÍVEL 9 — Avançado Plus (5 pares = 10 cartas)
  // ---------------------------------------------------------------------------
  {
    numero: 9,
    titulo: "Nível 9 — Avançado Plus",
    descricao: "Feridas complexas com múltiplos fatores de risco.",
    pares: [
      {
        id: "ferida_imunodeprimido",
        ferida: {
          imagem: IMAGES.wound_infected,
          titulo: "Ferida em Imunodeprimido",
          descricao: "Ferida em paciente com sistema imunológico comprometido.",
        },
        tratamento: {
          imagem: IMAGES.treatment_antibiotics,
          titulo: "Antibióticos Agressivos",
          descricao: "Usar antibióticos de amplo espectro e considerar antifúngicos.",
        },
      },
      {
        id: "ferida_anticoagulacao",
        ferida: {
          imagem: IMAGES.wound_laceration,
          titulo: "Ferida em Paciente Anticoagulado",
          descricao: "Ferida com risco aumentado de hemorragia em paciente em anticoagulação.",
        },
        tratamento: {
          imagem: IMAGES.treatment_suture,
          titulo: "Compressão Prolongada",
          descricao: "Aplicar compressão prolongada e considerar reversão de anticoagulante.",
        },
      },
      {
        id: "ferida_diabetes_grave",
        ferida: {
          imagem: IMAGES.wound_pressure_ulcer,
          titulo: "Ferida Diabética Grave",
          descricao: "Úlcera diabética com infecção profunda e risco de amputação.",
        },
        tratamento: {
          imagem: IMAGES.treatment_pressure_relief,
          titulo: "Desbridamento Agressivo",
          descricao: "Desbridamento cirúrgico agressivo e controle glicêmico rigoroso.",
        },
      },
      {
        id: "ferida_insuficiencia_vascular",
        ferida: {
          imagem: IMAGES.wound_avulsion,
          titulo: "Ferida com Insuficiência Vascular",
          descricao: "Ferida em membro com circulação arterial comprometida.",
        },
        tratamento: {
          imagem: IMAGES.treatment_flap_preservation,
          titulo: "Revascularização Vascular",
          descricao: "Investigar circulação e considerar revascularização ou amputação.",
        },
      },
      {
        id: "ferida_multipla",
        ferida: {
          imagem: IMAGES.wound_evisceration,
          titulo: "Feridas Múltiplas",
          descricao: "Paciente com várias feridas de diferentes tipos e gravidades.",
        },
        tratamento: {
          imagem: IMAGES.treatment_evisceration_cover,
          titulo: "Priorização e Tratamento Sequencial",
          descricao: "Priorizar feridas por gravidade e tratar conforme protocolo.",
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // NÍVEL 10 — Maestria (6 pares = 12 cartas)
  // ---------------------------------------------------------------------------
  {
    numero: 10,
    titulo: "Nível 10 — Maestria",
    descricao: "Desafio máximo: feridas complexas com múltiplas variáveis.",
    pares: [
      {
        id: "ferida_trauma_grave",
        ferida: {
          imagem: IMAGES.wound_evisceration,
          titulo: "Trauma Grave Multissistêmico",
          descricao: "Múltiplas feridas com trauma de órgãos e risco de morte.",
        },
        tratamento: {
          imagem: IMAGES.treatment_evisceration_cover,
          titulo: "Suporte Vital e Cirurgia Emergencial",
          descricao: "Manter vias aéreas, circulação, respiração e transporte urgente.",
        },
      },
      {
        id: "ferida_queimadura_total",
        ferida: {
          imagem: IMAGES.wound_burn_3rd,
          titulo: "Queimadura Crítica (>40% SCBA)",
          descricao: "Queimadura massiva com risco de morte por choque e infecção.",
        },
        tratamento: {
          imagem: IMAGES.treatment_burn_graft,
          titulo: "Reposição Volêmica Agressiva",
          descricao: "Reposição de fluidos conforme Parkland, transporte para centro queimado.",
        },
      },
      {
        id: "ferida_necrose_total",
        ferida: {
          imagem: IMAGES.wound_burn_3rd,
          titulo: "Necrose Tecidual Extensa",
          descricao: "Morte tecidual em grande extensão com risco de sepse.",
        },
        tratamento: {
          imagem: IMAGES.treatment_burn_graft,
          titulo: "Desbridamento Total e Reconstrução",
          descricao: "Desbridamento cirúrgico total e planejamento de reconstrução.",
        },
      },
      {
        id: "ferida_complicada_multipla",
        ferida: {
          imagem: IMAGES.wound_infected,
          titulo: "Ferida Complicada com Múltiplas Infecções",
          descricao: "Ferida com infecção polimicrobiana e resistência a antibióticos.",
        },
        tratamento: {
          imagem: IMAGES.treatment_antibiotics,
          titulo: "Antibióticos Direcionados",
          descricao: "Cultura com antibiograma e antibióticos conforme sensibilidade.",
        },
      },
      {
        id: "ferida_cicatricial_grave",
        ferida: {
          imagem: IMAGES.wound_avulsion,
          titulo: "Cicatriz Grave com Restrição Funcional",
          descricao: "Cicatriz que limita movimento e função do membro.",
        },
        tratamento: {
          imagem: IMAGES.treatment_flap_preservation,
          titulo: "Reconstrução Cirúrgica Complexa",
          descricao: "Enxertos, retalhos e possível cirurgia plástica reconstrutiva.",
        },
      },
      {
        id: "ferida_paliatva_complexa",
        ferida: {
          imagem: IMAGES.wound_pressure_ulcer,
          titulo: "Ferida Paliativa Complexa",
          descricao: "Ferida em paciente terminal com múltiplas comorbidades.",
        },
        tratamento: {
          imagem: IMAGES.treatment_pressure_relief,
          titulo: "Conforto e Controle de Sintomas",
          descricao: "Focar em conforto, controle de dor e odor, e dignidade do paciente.",
        },
      },
    ],
  },
];

// =============================================================================
// CONFIGURAÇÕES DE PONTUAÇÃO
// =============================================================================

export const PONTUACAO = {
  acerto: 10,          // pontos por par correto
  bonus_velocidade: 5, // pontos extras por acertar em menos de 3 segundos
  erro: -2,            // penalidade por tentativa errada
  nivel_completo: 20,  // bônus por completar o nível
};
