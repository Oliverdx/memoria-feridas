/**
 * GameMenu — Tela inicial do Jogo da Memória
 * Design: Educational Illustration
 * - Fundo com imagem de atlas médico
 * - Tipografia serifada para títulos
 * - Cards de nível com informações de pares e dificuldade
 */

import { motion } from "framer-motion";
import { NIVEIS, PONTUACAO } from "@/lib/gameData";

const HERO_BG_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663596017988/WeP2ABiaiWnTVCRVFYx4pY/game-hero-bg-fpUayacw8LVhbPptyY4SCU.webp";

interface GameMenuProps {
  onStartLevel: (index: number) => void;
  onStartGame: () => void;
}

const DIFFICULTY_LABELS = ["Básico", "Intermediário", "Avançado"];
const DIFFICULTY_COLORS = [
  { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-300", dot: "bg-emerald-500" },
  { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-300", dot: "bg-amber-500" },
  { bg: "bg-red-100", text: "text-red-700", border: "border-red-300", dot: "bg-red-500" },
];

export function GameMenu({ onStartLevel, onStartGame }: GameMenuProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAFAF5" }}>
      {/* Hero Section */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_BG_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Overlay suave */}
        <div className="absolute inset-0 bg-[#FAFAF5]/60" />

        <div className="relative z-10 container py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge de enfermagem */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-amber-300 rounded-full px-4 py-1.5 mb-4 shadow-sm">
              <span className="text-amber-600 text-sm">🩺</span>
              <span className="text-amber-700 text-xs font-semibold uppercase tracking-wider">
                Jogo Educativo de Enfermagem
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-3 leading-tight">
              Jogo da Memória
              <br />
              <span className="text-blue-700">Feridas</span>
              <span className="text-gray-400 mx-2">&</span>
              <span className="text-emerald-700">Tratamentos</span>
            </h1>

            <p className="text-gray-600 text-base max-w-xl mx-auto mb-6 leading-relaxed">
              Associe cada tipo de ferida ao seu tratamento correto. Teste seus conhecimentos
              em três níveis de dificuldade progressiva.
            </p>

            {/* Como jogar */}
            <div className="inline-flex flex-wrap justify-center gap-4 mb-8">
              {[
                { icon: "🃏", text: "Vire 2 cartas por vez" },
                { icon: "🩹", text: "Associe ferida ao tratamento" },
                { icon: "⭐", text: "Ganhe pontos por acerto" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-gray-200"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm text-gray-600 font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Botão jogar tudo */}
            <motion.button
              onClick={onStartGame}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg py-4 px-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center gap-2"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>▶</span> Jogar do Início
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Seleção de Nível */}
      <div className="container py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-serif text-2xl font-bold text-gray-700 mb-2 text-center">
            Escolha um Nível
          </h2>
          <p className="text-gray-400 text-sm text-center mb-6">
            Ou selecione diretamente o capítulo que deseja praticar
          </p>

          <div className="grid gap-4 md:grid-cols-3 max-w-3xl mx-auto">
            {NIVEIS.map((nivel, index) => {
              const diff = DIFFICULTY_COLORS[index] ?? DIFFICULTY_COLORS[0];
              const label = DIFFICULTY_LABELS[index] ?? "Avançado";
              return (
                <motion.button
                  key={nivel.numero}
                  onClick={() => onStartLevel(index)}
                  className="group text-left bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {/* Faixa de cor do nível */}
                  <div
                    className={`h-1.5 w-full ${
                      index === 0 ? "bg-emerald-400" : index === 1 ? "bg-amber-400" : "bg-red-400"
                    }`}
                  />

                  <div className="p-4">
                    {/* Número e dificuldade */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl font-serif font-black text-gray-200 group-hover:text-gray-300 transition-colors">
                        {nivel.numero}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${diff.bg} ${diff.text} ${diff.border}`}
                      >
                        <span className={`inline-block w-1.5 h-1.5 rounded-full ${diff.dot} mr-1.5`} />
                        {label}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-gray-800 text-base mb-1 leading-tight">
                      {nivel.titulo.replace(/Nível \d+ — /, "")}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-3">
                      {nivel.descricao}
                    </p>

                    {/* Info de cartas */}
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-blue-400" />
                        {nivel.pares.length} feridas
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        {nivel.pares.length} tratamentos
                      </span>
                      <span className="flex items-center gap-1">
                        🃏 {nivel.pares.length * 2} cartas
                      </span>
                    </div>
                  </div>

                  {/* Seta de ação */}
                  <div className="px-4 pb-3">
                    <div className="flex items-center justify-end text-blue-500 text-xs font-semibold group-hover:gap-2 gap-1 transition-all">
                      Jogar <span>→</span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Tabela de pontuação */}
        <motion.div
          className="mt-10 max-w-sm mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="font-serif font-bold text-gray-700 text-base mb-3 text-center">
            ⭐ Sistema de Pontuação
          </h3>
          <table className="w-full text-sm">
            <tbody>
              {[
                { label: "Par correto", value: `+${PONTUACAO.acerto} pts`, color: "text-emerald-600" },
                { label: "Bônus velocidade (< 3s)", value: `+${PONTUACAO.bonus_velocidade} pts`, color: "text-blue-600" },
                { label: "Tentativa errada", value: `${PONTUACAO.erro} pts`, color: "text-red-500" },
                { label: "Nível completo", value: `+${PONTUACAO.nivel_completo} pts`, color: "text-amber-600" },
              ].map((row, i) => (
                <tr key={i} className={i < 3 ? "border-b border-gray-100" : ""}>
                  <td className="py-2 text-gray-500">{row.label}</td>
                  <td className={`py-2 text-right font-bold ${row.color}`}>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}
