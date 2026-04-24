/**
 * MemoryCard — Carta do Jogo da Memória
 * Design: Educational Illustration
 * - Azul cobalto para feridas, verde esmeralda para tratamentos
 * - Flip 3D com perspectiva realista
 * - Verso com imagem de fundo médica (card-back.png)
 */

import { motion } from "framer-motion";
import type { GameCard } from "@/hooks/useMemoryGame";
import { cn } from "@/lib/utils";

const CARD_BACK_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663596017988/WeP2ABiaiWnTVCRVFYx4pY/card-back-5VpzPfNXQYkfZFYLZZMf7R.webp";

interface MemoryCardProps {
  card: GameCard;
  onClick: (uid: string) => void;
  disabled?: boolean;
}

export function MemoryCard({ card, onClick, disabled }: MemoryCardProps) {
  const isWound = card.type === "ferida";
  const canClick = !disabled && !card.isFlipped && !card.isMatched;

  const handleClick = () => {
    if (canClick) onClick(card.uid);
  };

  return (
    <motion.div
      className="relative cursor-pointer"
      style={{ perspective: "1000px" }}
      animate={
        card.isError
          ? { x: [0, -8, 8, -8, 8, 0] }
          : { x: 0 }
      }
      transition={card.isError ? { duration: 0.4 } : {}}
      onClick={handleClick}
      whileHover={canClick ? { scale: 1.04, y: -3 } : {}}
      whileTap={canClick ? { scale: 0.97 } : {}}
    >
      {/* Container de flip 3D */}
      <div
        className="relative w-full"
        style={{
          paddingBottom: "160%",
          transformStyle: "preserve-3d",
          transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: card.isFlipped || card.isMatched ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* VERSO (frente visível quando não virada) */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden shadow-md"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={CARD_BACK_URL}
            alt="Verso da carta"
            className="w-full h-full object-cover"
          />
          {/* Overlay sutil para hover */}
          {canClick && (
            <div className="absolute inset-0 bg-white/0 hover:bg-white/10 transition-colors duration-200" />
          )}
        </div>

        {/* FRENTE (visível quando virada) */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl overflow-hidden shadow-lg flex flex-col",
            isWound
              ? "bg-blue-50 border-2 border-blue-400"
              : "bg-emerald-50 border-2 border-emerald-400",
            card.isMatched && "ring-2 ring-offset-1",
            card.isMatched && (isWound ? "ring-blue-500" : "ring-emerald-500"),
            card.isError && "border-red-400 bg-red-50"
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Header colorido */}
          <div
            className={cn(
              "px-3 py-2 flex items-center gap-2 text-white text-sm font-semibold uppercase tracking-wide",
              isWound ? "bg-blue-600" : "bg-emerald-600",
              card.isError && "bg-red-500"
            )}
          >
            <span className="text-lg leading-none">
              {isWound ? "🩹" : "💊"}
            </span>
            <span>{isWound ? "Ferida" : "Tratamento"}</span>
          </div>

          {/* Imagem ou placeholder */}
          <div className="flex-1 flex items-center justify-center p-2 min-h-0">
            {card.imagem ? (
              <img
                src={card.imagem}
                alt={card.titulo}
                className="w-full h-full object-contain rounded"
                style={{ maxHeight: "100%" }}
              />
            ) : (
              <div
                className={cn(
                  "w-full h-full rounded flex items-center justify-center text-center p-2",
                  isWound ? "bg-blue-100" : "bg-emerald-100"
                )}
              >
                <span
                  className={cn(
                    "text-4xl leading-none",
                    isWound ? "text-blue-300" : "text-emerald-300"
                  )}
                >
                  {isWound ? "🩹" : "💊"}
                </span>
              </div>
            )}
          </div>

          {/* Título e descrição */}
          <div className="px-3 pb-3 pt-2">
            <p
              className={cn(
                "font-bold text-sm leading-snug",
                isWound ? "text-blue-800" : "text-emerald-800",
                card.isError && "text-red-700"
              )}
            >
              {card.titulo}
            </p>
            <p className="text-gray-600 text-xs leading-relaxed mt-1 line-clamp-3">
              {card.descricao}
            </p>
          </div>

          {/* Indicador de par correto */}
          {card.isMatched && (
            <motion.div
              className={cn(
                "absolute inset-0 rounded-xl flex items-center justify-center",
                isWound ? "bg-blue-500/10" : "bg-emerald-500/10"
              )}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-3xl drop-shadow">✅</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
