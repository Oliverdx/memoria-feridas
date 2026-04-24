/**
 * LevelComplete — Modal de conclusão de nível
 * Design: Educational Illustration — badge dourado, confetti, tipografia serifada
 */

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { PONTUACAO } from "@/lib/gameData";

const BADGE_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663596017988/WeP2ABiaiWnTVCRVFYx4pY/level-complete-badge-7FLBgphh623pYHyWWkAreS.webp";

interface LevelCompleteProps {
  nivelNumero: number;
  pontuacao: number;
  tentativas: number;
  acertos: number;
  isLastLevel: boolean;
  onNextLevel: () => void;
  onRestartLevel: () => void;
  onGoToMenu: () => void;
}

function ConfettiPiece({ delay }: { delay: number }) {
  const colors = ["#2563EB", "#059669", "#D97706", "#DC2626", "#7C3AED"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const left = Math.random() * 100;
  const size = 6 + Math.random() * 8;

  return (
    <motion.div
      className="absolute top-0 rounded-sm pointer-events-none"
      style={{ left: `${left}%`, width: size, height: size, backgroundColor: color }}
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{ y: 400, opacity: 0, rotate: 360 * (Math.random() > 0.5 ? 1 : -1) }}
      transition={{ duration: 1.5 + Math.random(), delay, ease: "easeIn" }}
    />
  );
}

export function LevelComplete({
  nivelNumero,
  pontuacao,
  tentativas,
  acertos,
  isLastLevel,
  onNextLevel,
  onRestartLevel,
  onGoToMenu,
}: LevelCompleteProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const precisao = tentativas > 0 ? Math.round((acertos / tentativas) * 100) : 100;

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Confetti */}
        {showConfetti && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 40 }).map((_, i) => (
              <ConfettiPiece key={i} delay={i * 0.04} />
            ))}
          </div>
        )}

        {/* Card de conclusão */}
        <motion.div
          className="relative bg-[#FAFAF5] rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden border border-amber-200"
          initial={{ scale: 0.5, y: 60, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        >
          {/* Faixa superior */}
          <div className="bg-gradient-to-r from-amber-500 to-yellow-400 px-6 py-3 text-center">
            <p className="text-white font-bold text-sm tracking-widest uppercase">
              {isLastLevel ? "🏆 Jogo Completo!" : "Nível Concluído!"}
            </p>
          </div>

          <div className="px-6 py-5 text-center">
            {/* Badge */}
            <motion.img
              src={BADGE_URL}
              alt="Nível Completo"
              className="w-28 h-28 mx-auto mb-3 drop-shadow-lg"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
            />

            <h2 className="font-serif text-2xl font-bold text-gray-800 mb-1">
              {isLastLevel ? "Parabéns!" : `Nível ${nivelNumero} Completo`}
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              {isLastLevel
                ? "Você dominou todos os níveis do jogo!"
                : "Excelente! Você identificou todos os pares."}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                <p className="text-2xl font-bold text-blue-700">{pontuacao}</p>
                <p className="text-xs text-blue-500 mt-0.5">Pontos</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                <p className="text-2xl font-bold text-emerald-700">{precisao}%</p>
                <p className="text-xs text-emerald-500 mt-0.5">Precisão</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                <p className="text-2xl font-bold text-amber-700">{tentativas}</p>
                <p className="text-xs text-amber-500 mt-0.5">Tentativas</p>
              </div>
            </div>

            {/* Bônus info */}
            <p className="text-xs text-gray-400 mb-4">
              +{PONTUACAO.nivel_completo} pontos de bônus por completar o nível
            </p>

            {/* Botões */}
            <div className="flex flex-col gap-2">
              {!isLastLevel && (
                <button
                  onClick={onNextLevel}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                >
                  Próximo Nível →
                </button>
              )}
              {isLastLevel && (
                <button
                  onClick={onGoToMenu}
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                >
                  🏠 Voltar ao Menu
                </button>
              )}
              <div className="flex gap-2">
                <button
                  onClick={onRestartLevel}
                  className="flex-1 bg-white hover:bg-gray-50 text-gray-600 font-semibold py-2.5 px-4 rounded-xl border border-gray-200 transition-all duration-200 text-sm active:scale-95"
                >
                  ↺ Repetir
                </button>
                <button
                  onClick={onGoToMenu}
                  className="flex-1 bg-white hover:bg-gray-50 text-gray-600 font-semibold py-2.5 px-4 rounded-xl border border-gray-200 transition-all duration-200 text-sm active:scale-95"
                >
                  🏠 Menu
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
