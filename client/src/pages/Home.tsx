/**
 * Home — Página principal do Jogo da Memória: Feridas e Tratamentos
 * Design: Educational Illustration
 * - Fundo creme texturizado (#FAFAF5)
 * - Tipografia: Playfair Display (títulos) + Inter (UI)
 * - Paleta: azul cobalto (feridas), verde esmeralda (tratamentos), dourado (conquistas)
 */

import { useMemoryGame } from "@/hooks/useMemoryGame";
import { GameMenu } from "@/components/GameMenu";
import { GameBoard } from "@/components/GameBoard";
import { LevelComplete } from "@/components/LevelComplete";
import { GameOver } from "@/components/GameOver";

export default function Home() {
  const {
    state,
    nivelInfo,
    totalPares,
    progresso,
    isLastLevel,
    totalNiveis,
    startGame,
    startLevel,
    flipCard,
    nextLevel,
    restartLevel,
    goToMenu,
  } = useMemoryGame();

  const { phase } = state;

  // Tela de menu
  if (phase === "menu") {
    return <GameMenu onStartGame={startGame} onStartLevel={startLevel} />;
  }

  // Tela de fim de jogo (todos os níveis)
  if (phase === "game_over") {
    return (
      <GameOver
        pontuacao={state.pontuacao}
        onPlayAgain={startGame}
        onGoToMenu={goToMenu}
      />
    );
  }

  // Tela de jogo ativo (playing ou level_complete)
  if (!nivelInfo) return null;

  return (
    <>
      <GameBoard
        nivelInfo={nivelInfo}
        cards={state.cards}
        pontuacao={state.pontuacao}
        tentativas={state.tentativas}
        acertos={state.acertos}
        totalPares={totalPares}
        progresso={progresso}
        isChecking={state.isChecking}
        nivelAtual={state.nivelAtual}
        totalNiveis={totalNiveis}
        onFlipCard={flipCard}
        onGoToMenu={goToMenu}
        onRestartLevel={restartLevel}
      />

      {/* Modal de nível completo */}
      {phase === "level_complete" && (
        <LevelComplete
          nivelNumero={nivelInfo.numero}
          pontuacao={state.pontuacao}
          tentativas={state.tentativas}
          acertos={state.acertos}
          isLastLevel={isLastLevel}
          onNextLevel={nextLevel}
          onRestartLevel={restartLevel}
          onGoToMenu={goToMenu}
        />
      )}
    </>
  );
}
