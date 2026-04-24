/**
 * Hook principal da lógica do Jogo da Memória — Feridas e Tratamentos
 * Design: Educational Illustration — fundo texturizado, tipografia serifada
 */

import { useState, useCallback, useEffect, useRef } from "react";
import { NIVEIS, PONTUACAO, type Par } from "@/lib/gameData";

// Tipos internos do jogo
export type CardType = "ferida" | "tratamento";

export interface GameCard {
  uid: string;         // identificador único da carta no tabuleiro
  pairId: string;      // id do par ao qual pertence
  type: CardType;
  titulo: string;
  descricao: string;
  imagem: string;
  isFlipped: boolean;
  isMatched: boolean;
  isError: boolean;    // animação de erro (shake)
}

export type GamePhase = "menu" | "playing" | "level_complete" | "game_over";

export interface GameState {
  phase: GamePhase;
  nivelAtual: number;
  pontuacao: number;
  tentativas: number;
  acertos: number;
  cards: GameCard[];
  selectedCards: string[];   // uids das cartas selecionadas (máx 2)
  isChecking: boolean;       // bloqueio durante verificação de par
  tempoInicio: number | null;
  tempoUltimaVirada: number | null;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildCards(pares: Par[]): GameCard[] {
  const cards: GameCard[] = [];
  pares.forEach((par) => {
    cards.push({
      uid: `${par.id}_ferida`,
      pairId: par.id,
      type: "ferida",
      titulo: par.ferida.titulo,
      descricao: par.ferida.descricao,
      imagem: par.ferida.imagem,
      isFlipped: false,
      isMatched: false,
      isError: false,
    });
    cards.push({
      uid: `${par.id}_tratamento`,
      pairId: par.id,
      type: "tratamento",
      titulo: par.tratamento.titulo,
      descricao: par.tratamento.descricao,
      imagem: par.tratamento.imagem,
      isFlipped: false,
      isMatched: false,
      isError: false,
    });
  });
  return shuffleArray(cards);
}

const initialState: GameState = {
  phase: "menu",
  nivelAtual: 0,
  pontuacao: 0,
  tentativas: 0,
  acertos: 0,
  cards: [],
  selectedCards: [],
  isChecking: false,
  tempoInicio: null,
  tempoUltimaVirada: null,
};

export function useMemoryGame() {
  const [state, setState] = useState<GameState>(initialState);
  const checkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Limpar timeout ao desmontar
  useEffect(() => {
    return () => {
      if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
    };
  }, []);

  const startLevel = useCallback((nivelIndex: number) => {
    const nivel = NIVEIS[nivelIndex];
    if (!nivel) return;
    const cards = buildCards(nivel.pares);
    setState((prev) => ({
      ...prev,
      phase: "playing",
      nivelAtual: nivelIndex,
      cards,
      selectedCards: [],
      isChecking: false,
      tentativas: 0,
      acertos: 0,
      tempoInicio: Date.now(),
      tempoUltimaVirada: null,
    }));
  }, []);

  const startGame = useCallback(() => {
    setState({ ...initialState, phase: "playing", pontuacao: 0 });
    startLevel(0);
  }, [startLevel]);

  const goToMenu = useCallback(() => {
    setState(initialState);
  }, []);

  const flipCard = useCallback(
    (uid: string) => {
      setState((prev) => {
        if (prev.isChecking) return prev;
        const card = prev.cards.find((c) => c.uid === uid);
        if (!card || card.isFlipped || card.isMatched) return prev;
        if (prev.selectedCards.length >= 2) return prev;

        const newSelected = [...prev.selectedCards, uid];
        const newCards = prev.cards.map((c) =>
          c.uid === uid ? { ...c, isFlipped: true } : c
        );

        return {
          ...prev,
          cards: newCards,
          selectedCards: newSelected,
          tempoUltimaVirada: Date.now(),
        };
      });
    },
    []
  );

  // Verificar par quando 2 cartas estão selecionadas
  useEffect(() => {
    if (state.selectedCards.length !== 2 || state.isChecking) return;

    setState((prev) => ({ ...prev, isChecking: true }));

    checkTimeoutRef.current = setTimeout(() => {
      setState((prev) => {
        const [uid1, uid2] = prev.selectedCards;
        const card1 = prev.cards.find((c) => c.uid === uid1);
        const card2 = prev.cards.find((c) => c.uid === uid2);

        if (!card1 || !card2) return { ...prev, isChecking: false, selectedCards: [] };

        const isMatch =
          card1.pairId === card2.pairId &&
          card1.type !== card2.type;

        let pontuacaoGanha = 0;
        let newCards: GameCard[];

        if (isMatch) {
          // Calcular bônus de velocidade
          const tempoVirada = prev.tempoUltimaVirada
            ? (Date.now() - prev.tempoUltimaVirada) / 1000
            : 999;
          pontuacaoGanha = PONTUACAO.acerto;
          if (tempoVirada < 3) pontuacaoGanha += PONTUACAO.bonus_velocidade;

          newCards = prev.cards.map((c) =>
            c.uid === uid1 || c.uid === uid2
              ? { ...c, isMatched: true, isFlipped: true, isError: false }
              : c
          );
        } else {
          pontuacaoGanha = PONTUACAO.erro;
          // Marcar erro temporariamente
          newCards = prev.cards.map((c) =>
            c.uid === uid1 || c.uid === uid2
              ? { ...c, isError: true }
              : c
          );
        }

        const novaPontuacao = Math.max(0, prev.pontuacao + pontuacaoGanha);
        const novoAcertos = isMatch ? prev.acertos + 1 : prev.acertos;
        const novasTentativas = prev.tentativas + 1;

        // Verificar se nível foi completado
        const totalPares = NIVEIS[prev.nivelAtual].pares.length;
        const nivelCompleto = novoAcertos === totalPares;

        let novaPontuacaoFinal = novaPontuacao;
        if (nivelCompleto) {
          novaPontuacaoFinal += PONTUACAO.nivel_completo;
        }

        // Agendar remoção do estado de erro
        if (!isMatch) {
          setTimeout(() => {
            setState((s) => ({
              ...s,
              cards: s.cards.map((c) =>
                c.uid === uid1 || c.uid === uid2
                  ? { ...c, isFlipped: false, isError: false }
                  : c
              ),
              isChecking: false,
              selectedCards: [],
            }));
          }, 800);

          return {
            ...prev,
            cards: newCards,
            pontuacao: novaPontuacaoFinal,
            tentativas: novasTentativas,
            acertos: novoAcertos,
          };
        }

        return {
          ...prev,
          cards: newCards,
          selectedCards: [],
          isChecking: false,
          pontuacao: novaPontuacaoFinal,
          tentativas: novasTentativas,
          acertos: novoAcertos,
          phase: nivelCompleto ? "level_complete" : "playing",
        };
      });
    }, 600);
  }, [state.selectedCards, state.isChecking]);

  const nextLevel = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.nivelAtual + 1;
      if (nextIndex >= NIVEIS.length) {
        return { ...prev, phase: "game_over" };
      }
      const nivel = NIVEIS[nextIndex];
      const cards = buildCards(nivel.pares);
      return {
        ...prev,
        phase: "playing",
        nivelAtual: nextIndex,
        cards,
        selectedCards: [],
        isChecking: false,
        tentativas: 0,
        acertos: 0,
        tempoInicio: Date.now(),
        tempoUltimaVirada: null,
      };
    });
  }, []);

  const restartLevel = useCallback(() => {
    setState((prev) => {
      const nivel = NIVEIS[prev.nivelAtual];
      const cards = buildCards(nivel.pares);
      return {
        ...prev,
        phase: "playing",
        cards,
        selectedCards: [],
        isChecking: false,
        tentativas: 0,
        acertos: 0,
        tempoInicio: Date.now(),
        tempoUltimaVirada: null,
      };
    });
  }, []);

  const nivelInfo = NIVEIS[state.nivelAtual] ?? null;
  const totalPares = nivelInfo?.pares.length ?? 0;
  const progresso = totalPares > 0 ? (state.acertos / totalPares) * 100 : 0;
  const isLastLevel = state.nivelAtual >= NIVEIS.length - 1;

  return {
    state,
    nivelInfo,
    totalPares,
    progresso,
    isLastLevel,
    totalNiveis: NIVEIS.length,
    startGame,
    startLevel,
    flipCard,
    nextLevel,
    restartLevel,
    goToMenu,
  };
}
