/**
 * GameOver — Tela de fim de jogo (todos os níveis concluídos)
 * Design: Educational Illustration — celebração com badge dourado
 */

import { motion } from "framer-motion";
import { NIVEIS } from "@/lib/gameData";

const BADGE_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663596017988/WeP2ABiaiWnTVCRVFYx4pY/level-complete-badge-7FLBgphh623pYHyWWkAreS.webp";

interface GameOverProps {
  pontuacao: number;
  onPlayAgain: () => void;
  onGoToMenu: () => void;
}

function StarRating({ pontuacao }: { pontuacao: number }) {
  const maxScore = NIVEIS.reduce((acc, n) => acc + n.pares.length * 15 + 20, 0);
  const pct = Math.min(pontuacao / maxScore, 1);
  const stars = pct >= 0.85 ? 3 : pct >= 0.6 ? 2 : 1;

  return (
    <div className="flex justify-center gap-1 text-3xl mb-2">
      {[1, 2, 3].map((s) => (
        <motion.span
          key={s}
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5 + s * 0.15, type: "spring", stiffness: 300 }}
          className={s <= stars ? "text-amber-400" : "text-gray-200"}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

export function GameOver({ pontuacao, onPlayAgain, onGoToMenu }: GameOverProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#FAFAF5" }}
    >
      <motion.div
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-amber-200"
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Header dourado */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 px-6 py-4 text-center">
          <p className="text-white font-bold text-lg tracking-wide">🏆 Jogo Concluído!</p>
        </div>

        <div className="px-8 py-8 text-center">
          {/* Badge */}
          <motion.img
            src={BADGE_URL}
            alt="Jogo Completo"
            className="w-36 h-36 mx-auto mb-4 drop-shadow-xl"
            animate={{ rotate: [0, -5, 5, -3, 3, 0] }}
            transition={{ delay: 0.8, duration: 0.6 }}
          />

          <h1 className="font-serif text-3xl font-bold text-gray-800 mb-2">
            Parabéns!
          </h1>
          <p className="text-gray-500 mb-4 leading-relaxed">
            Você completou todos os {NIVEIS.length} níveis do Jogo da Memória de
            Feridas e Tratamentos!
          </p>

          {/* Estrelas */}
          <StarRating pontuacao={pontuacao} />

          {/* Pontuação final */}
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-5 mb-6 border border-blue-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-gray-500 text-sm mb-1">Pontuação Final</p>
            <motion.p
              className="text-5xl font-black text-blue-700 font-serif"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
            >
              {pontuacao}
            </motion.p>
            <p className="text-gray-400 text-xs mt-1">pontos acumulados</p>
          </motion.div>

          {/* Mensagem motivacional */}
          <div className="bg-emerald-50 rounded-xl p-4 mb-6 border border-emerald-100 text-left">
            <p className="text-emerald-700 text-sm font-semibold mb-1">
              ✅ Conhecimento Aplicado
            </p>
            <p className="text-emerald-600 text-xs leading-relaxed">
              Identificar corretamente feridas e seus tratamentos é fundamental para
              uma assistência de enfermagem segura e eficaz.
            </p>
          </div>

          {/* Botões */}
          <div className="flex flex-col gap-3">
            <button
              onClick={onPlayAgain}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              ▶ Jogar Novamente
            </button>
            <button
              onClick={onGoToMenu}
              className="w-full bg-white hover:bg-gray-50 text-gray-600 font-semibold py-3 px-6 rounded-xl border border-gray-200 transition-all duration-200 active:scale-95"
            >
              🏠 Voltar ao Menu
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
