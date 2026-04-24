# Ideias de Design — Jogo da Memória: Feridas e Tratamentos

## Abordagem 1 — Clínica Moderna
<response>
<text>
**Design Movement:** Medical Modernism — clareza clínica com toque de acolhimento educativo.

**Core Principles:**
- Hierarquia visual clara com tipografia forte e espaçamento generoso
- Paleta azul-verde médica com acentos brancos e cinzas suaves
- Cards com bordas arredondadas e sombras sutis para profundidade
- Iconografia limpa e funcional

**Color Philosophy:** Azul hospitalar (#1E6FA5) como primário, verde de tratamento (#2E8B57) como secundário, fundo branco gelo (#F8FAFC). Transmite confiança, higiene e profissionalismo.

**Layout Paradigm:** Grid assimétrico — painel de informações à esquerda, tabuleiro do jogo centralizado, painel de pontuação à direita. Divide a atenção de forma intencional.

**Signature Elements:**
- Cruz médica estilizada como ícone de marca
- Linhas divisórias com gradiente azul→verde
- Cards com indicador colorido (azul = ferida, verde = tratamento)

**Interaction Philosophy:** Feedback imediato com animações de flip suaves. Pares corretos pulsam em verde, incorretos tremem levemente.

**Animation:** Flip 3D nas cartas, pulse em pares corretos, shake em erros, slide-in no início do nível.

**Typography System:** Fonte display "Nunito" (bold, arredondada, amigável) + "Source Sans 3" para corpo. Hierarquia: 2.5rem título, 1.25rem subtítulo, 0.875rem corpo.
</text>
<probability>0.08</probability>
</response>

---

## Abordagem 2 — Ilustração Educativa (ESCOLHIDA)
<response>
<text>
**Design Movement:** Educational Illustration — visual de material didático médico, como um atlas anatômico moderno.

**Core Principles:**
- Fundo levemente texturizado (papel médico) para afastar do "app genérico"
- Tipografia serifada para títulos (autoridade acadêmica) + sans-serif para interface
- Cards com bordas coloridas distintas: azul para feridas, verde para tratamentos
- Animações de flip realistas com perspectiva 3D

**Color Philosophy:** Fundo creme (#FAFAF5), azul cobalto (#2563EB) para feridas, verde esmeralda (#059669) para tratamentos, vermelho coral (#DC2626) para alertas/erros, dourado (#D97706) para pontuação/conquistas.

**Layout Paradigm:** Layout centrado com tabuleiro dominante. Header com logo e placar fixo no topo. Níveis apresentados como "capítulos" de um livro médico.

**Signature Elements:**
- Verso das cartas com padrão de cruz médica em watermark
- Barra de progresso do nível estilizada como "linha do tempo de cura"
- Badges de conquista ao completar níveis

**Interaction Philosophy:** Cada carta virada revela uma ilustração médica. Pares corretos disparam uma animação de "cura" com partículas verdes. Erros mostram um X vermelho sutil.

**Animation:** Flip 3D com perspectiva, bounce ao acertar par, shake ao errar, confetti ao completar nível, slide de transição entre níveis.

**Typography System:** "Playfair Display" para títulos de nível e logo + "Inter" para UI e pontuação. Hierarquia: 3rem logo, 1.5rem nível, 1rem UI.
</text>
<probability>0.09</probability>
</response>

---

## Abordagem 3 — Dashboard Gamificado
<response>
<text>
**Design Movement:** Gamification UI — estética de aplicativo educativo gamificado, inspirado em Duolingo/Kahoot com seriedade médica.

**Core Principles:**
- Fundo escuro azul-marinho com elementos neon suaves
- Sistema de XP, vidas e streaks visíveis durante o jogo
- Cards com efeito holográfico sutil no hover
- Progressão clara com mapa de níveis

**Color Philosophy:** Fundo #0F172A (azul-marinho profundo), primário #38BDF8 (azul céu), sucesso #4ADE80 (verde neon), erro #F87171 (vermelho suave). Transmite seriedade com engajamento.

**Layout Paradigm:** Sidebar de progresso à esquerda, tabuleiro central, mini-painel de stats à direita. Mapa de níveis como tela inicial.

**Signature Elements:**
- Barra de XP animada no topo
- Ícones de "vida" (corações) que diminuem com erros
- Efeito de partículas ao acertar pares

**Interaction Philosophy:** Cada acerto gera XP visível (+10, +20 bônus). Sistema de combo para acertos consecutivos. Timer opcional por nível.

**Animation:** Partículas ao acertar, XP floating ao ganhar pontos, shake + coração perdido ao errar, explosão de confetti ao completar nível.

**Typography System:** "Space Grotesk" para tudo — moderno, técnico, legível. Bold para números e stats, regular para descrições.
</text>
<probability>0.07</probability>
</response>
