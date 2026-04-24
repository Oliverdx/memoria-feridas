/**
 * GameBoard — Tabuleiro do Jogo da Memória
 * Design: Educational Illustration
 * - Header com pontuação, progresso e nível
 * - Grid responsivo de cartas
 * - Barra de progresso animada
 */

import { motion, AnimatePresence } from "framer-motion";
import { MemoryCard } from "./MemoryCard";
import type { GameCard } from "@/hooks/useMemoryGame";
import type { Nivel } from "@/lib/gameData";

interface GameBoardProps {
  nivelInfo: Nivel;
  cards: GameCard[];
  pontuacao: number;
  tentativas: number;
  acertos: number;
  totalPares: number;
  progresso: number;
  isChecking: boolean;
  nivelAtual: number;
  totalNiveis: number;
  onFlipCard: (uid: string) => void;
  onGoToMenu: () => void;
  onRestartLevel: () => void;
}

export function GameBoard({
  nivelInfo,
  cards,
  pontuacao,
  tentativas,
  acertos,
  totalPares,
  progresso,
  isChecking,
  nivelAtual,
  totalNiveis,
  onFlipCard,
  onGoToMenu,
  onRestartLevel,
}: GameBoardProps) {
  // Determinar colunas do grid com base no número de cartas
  const totalCards = cards.length;
  const gridCols =
    totalCards <= 8
      ? "grid-cols-2 sm:grid-cols-4"
      : totalCards <= 10
      ? "grid-cols-2 sm:grid-cols-5"
      : "grid-cols-3 sm:grid-cols-4 md:grid-cols-6";

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: "#FAFAF5",
        backgroundImage:
          "radial-gradient(circle at 20% 20%, rgba(37,99,235,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(5,150,105,0.04) 0%, transparent 50%)",
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container py-3">
          <div className="flex items-center gap-3">
            {/* Botão menu */}
            <button
              onClick={onGoToMenu}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-lg hover:bg-gray-100"
              title="Voltar ao menu"
            >
              ← Menu
            </button>

            {/* Info do nível */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-serif font-bold text-gray-800 text-sm truncate">
                  {nivelInfo.titulo}
                </span>
                <span className="text-gray-300 hidden sm:inline">|</span>
                <span className="text-gray-400 text-xs hidden sm:inline">
                  {nivelInfo.descricao}
                </span>
              </div>
              {/* Barra de progresso */}
              <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden w-full max-w-xs">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progresso}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Pares */}
              <div className="text-center hidden sm:block">
                <p className="text-xs text-gray-400">Pares</p>
                <p className="font-bold text-gray-700 text-sm">
                  {acertos}/{totalPares}
                </p>
              </div>

              <div className="w-px h-8 bg-gray-200 hidden sm:block" />

              {/* Tentativas */}
              <div className="text-center hidden sm:block">
                <p className="text-xs text-gray-400">Tentativas</p>
                <p className="font-bold text-gray-700 text-sm">{tentativas}</p>
              </div>

              <div className="w-px h-8 bg-gray-200" />

              {/* Pontuação */}
              <div className="text-center">
                <p className="text-xs text-gray-400">Pontos</p>
                <motion.p
                  key={pontuacao}
                  className="font-bold text-blue-700 text-sm"
                  initial={{ scale: 1.3, color: "#059669" }}
                  animate={{ scale: 1, color: "#1d4ed8" }}
                  transition={{ duration: 0.3 }}
                >
                  {pontuacao}
                </motion.p>
              </div>

              {/* Reiniciar */}
              <button
                onClick={onRestartLevel}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-lg hover:bg-gray-100 ml-1"
                title="Reiniciar nível"
              >
                ↺
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabuleiro */}
      <main className="flex-1 container py-6">
        {/* Legenda */}
        <div className="flex items-center justify-center gap-4 mb-5">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-blue-500" />
            <span className="text-xs text-gray-500">Ferida (azul)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-emerald-500" />
            <span className="text-xs text-gray-500">Tratamento (verde)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-400">
              {totalCards} cartas • {totalPares} pares
            </span>
          </div>
        </div>

        {/* Grid de cartas */}
        <div className={`grid ${gridCols} gap-3 max-w-3xl mx-auto`}>
          <AnimatePresence>
            {cards.map((card, index) => (
              <motion.div
                key={card.uid}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.04, duration: 0.3 }}
              >
                <MemoryCard
                  card={card}
                  onClick={onFlipCard}
                  disabled={isChecking}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dica */}
        <p className="text-center text-xs text-gray-400 mt-6">
          💡 Associe cada <span className="text-blue-500 font-medium">ferida</span> ao seu{" "}
          <span className="text-emerald-500 font-medium">tratamento correto</span> para formar um par.
        </p>
      </main>
    </div>
  );
}
