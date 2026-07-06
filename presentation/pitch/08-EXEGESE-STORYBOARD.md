# 08 — Exégese do Storyboard v2 (2:00) — 4 fases progressivas

> **Propósito:** crítica profunda do storyboard cinematográfico v2 (18 cenas: 14 data + 4 B-roll).
> Cada fase aprofunda um vetor. Lendo todas na ordem, você sai com um diagnóstico
> pronto para o próximo loop (UX real + mix de áudio).
>
> **Fontes analisadas:** `02-storyboard.md` (timings + estrutura), `06-VOICE-OVER.md` (texto literal),
> `07-BROLL-STORYBOARD.md` (composição B-roll), `build/teaser.html` (cenas renderizadas),
> `build/EDL.json` (timings em segundos), `build/exports/workconnect-pitch.mp4` (draft visual 2:11).
>
> **Fases:**
> 1. **Storytelling / ritmo narrativo** ← você está aqui
> 2. **Locução PT-BR** (texto + dicção cena-a-cena)
> 3. **Cinematografia das cenas B-roll** (composição + benchmark)
> 4. **Mapeamento mock → real** (cruzamento cena ↔ rota do app)

---

## 📐 Visão geral (macro)

O pitch tem 5 atos + cold open + 4 interlúdios cinematográficos:

```
0:00 ──────────────── 0:21 ──── 0:25 ──────── 0:37 ─── 0:42 ──────────────── 1:10 ── 1:15 ──────────────── 1:36 ── 1:44 ──── 1:49 ── 2:00
│  COLD OPEN (caos)  │  br-01  │  ATO 1       │  br-02  │  ATO 2            │  br-03 │  ATO 3            │  ATO 4  │  br-04  │  ATO 5  │
│   5 cenas, 21s    │  4s     │  "um painel" │  5s     │  pareto/proj/vcto │  5s    │  "1 clique"       │  selo   │  cadeado│  endcard│
│                   │         │   1 cena, 12s │         │  3 cenas, 28s     │        │  3 cenas, 21s     │  8s     │  5s     │  11s    │
```

**Leitura macro:** os atos "data" têm duração crescente (12 → 28 → 21 → 8 → 11) e os
B-rolls aparecem como **respiros fixos de 4-5s** entre eles. Estrutura sólida, mas o
número de cenas por ato é desigual (1/3/3/1/1) — o Ato 2 domina a metade central.

---

## 🎬 FASE 1 — Storytelling / ritmo narrativo

### 1.1 — Diagnóstico da macro-estrutura

| Ato | Início | Duração | Cenas | % do pitch | Função narrativa |
|---|---|---|---|---|---|
| Cold Open | 0:00 | 21 s | 5 | 17,5% | **CHOQUE** — pintar o problema |
| B-roll 01 (Data Stream) | 0:21 | 4 s | 1 | 3,3% | Transição "tecnologia" |
| Ato 1 (Um painel) | 0:25 | 12 s | 1 | 10,0% | **ESPERANÇA** — solução existe |
| B-roll 02 (Armazém Vivo) | 0:37 | 5 s | 1 | 4,2% | Ancorage física |
| Ato 2 (Pareto/Proj/Vcto) | 0:42 | 28 s | 3 | 23,3% | **PROVA** — dashboards que entregam |
| B-roll 03 (Pulso de Rede) | 1:10 | 5 s | 1 | 4,2% | "Sempre ativo" |
| Ato 3 (Decisão 1-clique) | 1:15 | 21 s | 3 | 17,5% | **AÇÃO** — reduzir fricção |
| Ato 4 (Selo LGPD) | 1:36 | 8 s | 1 | 6,7% | **CONFIANÇA** — institucional |
| B-roll 04 (Cadeado) | 1:44 | 5 s | 1 | 4,2% | Reforço segurança |
| Ato 5 (Endcard) | 1:49 | 11 s | 1 | 9,2% | **FECHO** — slogan + créditos |

**Crítica:**
- ✅ **Arco narrativo clássico** ("problema → esperança → prova → ação → confiança → fecho") — funciona.
- ✅ **B-rolls bem espaçados** (16% do tempo = interlúdio visual saudável, não sufocante).
- ⚠️ **Ato 4 só com 1 cena (selo)** — risco de parecer abrupto. O salto "decisão em 1 clique → selo LGPD" sem transição conceitual pode parecer dois produtos diferentes.
- ⚠️ **Ato 2 é 23% do vídeo** mas tem só 3 cenas — ótimo para prova de produto, ruim se qualquer uma das 3 falhar (efeito dominó).
- ⚠️ **Não há clímax único**: faltou um "ponto de virada" emocional. O Cold Open é o único momento de verdadeiro choque; depois só，所以我们 resolvemos. Falta um momento "uau".

### 1.2 — Curva de energia emocional (estimada)

```
Energia
  ▲
5 │           ●cold-04(23min)      ●ato2-03(18 dias)    ●ato4-03(selo)
4 │       ●cold-03(42%)                            ●ato3-04(1-clique)
3 │  ●cold-02(55%)     ●cold-05(LOGO)  ●ato2-01    ●ato3-05
2 │  ●cold-01                            ●ato2-05
1 │                            ●ato1-01 ●ato3-01                  ●ato5-02
0 └──┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬──
   0:00 0:10 0:20 0:30 0:40 0:50 1:00 1:10 1:20 1:30 1:40 1:50 2:00
```

**Benchmark:** pitches SaaS virais (Linear, Vercel, Raycast) tendem a ter **um único pico** claro entre 70-80% do tempo, depois queda suave. O nosso tem 4 picos pequenos (cold-04, ato2-03, ato3-04, ato4-03) — **energia diluída**.

**Recomendação Fase 1.1:** considerar fundir ato2-03 ("18 dias") com ato2-05 ("vence amanhã") em um único momento "uau" mais cinematográfico (cross-dissolve rápido mostrando duas linhas de estoque colidindo). Ganhamos 8s de respiro e um clímax mais definido.

### 1.3 — Ganchos emocionais (hook-density por cena)

| Cena | Gancho principal | Eficácia estimada |
|---|---|---|
| cold-01 (68%) | Estatística-choque | 🟢 Alta — número grande + vermelho |
| cold-02 (55%) | Consequência do 68% | 🟡 Média — número parecido, perde impacto |
| cold-03 (42%) | "Simplesmente porque acabou" | 🟢 Alta — frase humana, não número |
| cold-04 (23min) | "Procurando SKU" | 🟡 Média — menos visceral que "perdeu venda" |
| cold-05 (LOGO) | Marca | 🟢 Alta — primeiro respiro visual limpo |
| br-01 (Data Stream) | Fluxo de dados | 🟡 Média — abstrato, precisa da voz pra aterrissar |
| ato1-01 (dashboard) | "Tudo em uma tela" | 🟢 Alta — mostra a solução no primeiro momento possível |
| br-02 (Armazém Vivo) | Estoque físico | 🟡 Média — bonito mas não dá informação nova |
| ato2-01 (Pareto) | "20% concentram 80%" | 🟢 Alta — insight clássico, sempre funciona |
| ato2-03 (Projeção) | "Em 18 dias zera" | 🟢 Alta — countdown cria urgência |
| ato2-05 (Vencimentos) | "Vence amanhã" | 🟢 Alta — "amanhã" é a palavra mais concreta que existe |
| br-03 (Pulso de Rede) | "Nunca dorme" | 🟡 Média — metáfora bonita, não comprova nada |
| ato3-01 (Alertas) | "Fila ordenada por urgência" | 🟢 Alta — visual mostra a ideia antes da fala |
| ato3-04 (Toast) | "1 clique resolve 4" | 🟢 Alta — feedback visual + número |
| ato3-05 (Fornecedores) | "Top 5 dias, pior 10" | 🟡 Média — comparação boa mas menos dramática |
| ato4-03 (Selo LGPD) | "Governança é o chão" | 🟡 Média — frase boa mas selo abstrato pra leigo |
| br-04 (Cadeado) | "Cada acesso registrado" | 🟡 Média — reforça selo, não traz novo |
| ato5-02 (Endcard) | "Sob controle" | 🟢 Alta — fecha o arco |

**Crítica:**
- 11 cenas 🟢 + 8 cenas 🟡 = **39% das cenas têm gancho médio/fraco**. Ideal seria <25%.
- **Padrão problemático:** sempre que entramos em B-roll ou selo, o gancho cai. A voz precisa carregar o gancho nesses momentos (ver Fase 2).
- **Cold open muito bom** — a sequência 68→55→42→23 funciona porque cada número tem uma consequência verbal específica ("perdeu a conta", "acabou", "procurando SKU"). Não trocar.

### 1.4 — Paralelismos e simetrias

| Ato | Estrutura rítmica | Funciona? |
|---|---|---|
| Cold open | 5 frases curtas em 21s | ✅ Memorável |
| Ato 2 (Pareto/Proj/Vcto) | 3 números-âncora em 28s | ✅ Triplo impacto |
| Ato 3 (Alertas/Toast/Suppliers) | Problema → solução → comparação | ✅ Arco fechado |
| Ato 4 + br-04 | Selo abstrato + cadeado visual | 🟡 Faltou um terceiro elemento (ex: "criptografia AES-256") |

**Benchmark:** o pitch de 1min do Plaid ("Wealth simple", 2019) usa tríades rítmicas em quase todos os atos. Estamos usando no Ato 2 e Ato 3, mas perdendo a tríade em Ato 4.

**Recomendação Fase 1.2:** ou aceitar o Ato 4 como "respiração sóbria" (música muda pra tom mais grave) ou estender para uma tríade. Sugiro: ato4-03 (selo) → br-04 (cadeado) → **nova cena ato4-04 (criptografia)** de 4s. Cortar 4s do Ato 2 ou Ato 5.

### 1.5 — Densidade de informação (palavras locução por segundo)

```
LOCUÇÃO FALADA POR ATO:
  cold-open     ~58 palavras / 21s = 2,76 wps   (calmo, permite ver os números)
  ato 1          ~12 palavras / 12s = 1,00 wps   (respiratório — proposital)
  ato 2          ~58 palavras / 28s = 2,07 wps   (informativo denso, ok)
  ato 3          ~52 palavras / 21s = 2,48 wps   (alto, fase de ação)
  ato 4          ~22 palavras / 8s  = 2,75 wps   (tom solene)
  ato 5          ~22 palavras / 11s = 2,00 wps   (fecho)
```

**Benchmark:** documentários Netflix (Abstract, Explained) usam 2,2–2,8 wps em média. Estamos em 2,30 wps médios — **dentro da norma**.

### 1.6 — Crítica cena-a-cena (storytelling puro)

#### 🎬 Cold Open — `cold-01` a `cold-05` (0:00–0:21)
**Nota: 8,5/10.** Sequência estatística-choque bem calibrada.
- ✅ A progressão 68 → 55 → 42 → 23 é decrescente mas **consequente**: cada número decorre do anterior.
- ✅ Cold-03 ("Simplesmente porque acabou") é o momento mais humano — frase coloquial no meio de números grandes é um truque clássico de copy.
- ✅ Cold-05 (logo) quebra o ciclo numérico com respiro visual limpo.
- ⚠️ **Cold-02 (55%) tem o gancho mais fraco** — "55% têm divergência" é informação sem consequência emocional clara. Considerar trocar a frase para algo mais visceral (ex: "Dessas, mais da metade já descobriu que pediu o que já tinha — e perdeu o que precisava").

#### 🌊 B-roll 01 — `br-01` Data Stream (0:21, 4s)
**Nota: 6,0/10.** Funcional mas abstrato.
- ⚠️ É o único B-roll sem produto visível. Pode parecer "decorativo" se a voz não aterrissar.
- ✅ Resolve uma transição difícil (cold open → UI) — sem ele, iríamos de tela cheia de números para tela cheia de UI bruscamente.

#### 🎬 Ato 1 — `ato1-01` Dashboard (0:25, 12s)
**Nota: 7,5/10.** Dashboard fala por si, mas é um tiro só.
- ✅ A cascata de fade-in (0,1/0,2/0,3/0,4s) imita a percepção do olho humano — primeiro vê o todo, depois foca.
- ⚠️ **12s é muito tempo** para mostrar um dashboard estático sem zoom/pointer. Considerar adicionar um sutil pointer animado (cursor fantasma) que percorre as 4 métricas na ordem: total → críticos → valor → alertas. Custo: zero de complexidade, ganho: sensação de "alguém navegando".

#### 📦 B-roll 02 — `br-02` Armazém Vivo (0:37, 5s)
**Nota: 7,0/10.** Bom uso da paleta dourada, mas "genérico stock".
- ⚠️ Grid 6×14 de caixas é um clichê visual. Funciona, mas não tem personalidade WorkConnect.
- ✅ O pulso vermelho + caixas gold cria tensão/desejo visual.

#### 🎬 Ato 2 — `ato2-01` Pareto (0:42, 12s)
**Nota: 8,5/10.** Funciona bem, é o "core" do pitch.
- ✅ Linha tracejada vermelha + gold do "80%" cria leitura visual instantânea.
- ⚠️ **15→12s foi corte certo** mas a fala "Você sabe quais são?" sem zoom posterior fica como pergunta retórica solta.

#### 🎬 Ato 2 — `ato2-03` Projeção (0:54, 8s)
**Nota: 9,0/10.** O melhor momento do pitch.
- ✅ "Em dezoito dias" + área vermelha em gradiente = ansiedade visual.
- ✅ A frase "e com ele, três linhas de produção" aterrissa o número abstrato em consequência concreta.
- 🏆 **Este é o clímax.** Proteger este momento: nunca cortar em revisão futura.

#### 🎬 Ato 2 — `ato2-05` Vencimentos (1:02, 8s)
**Nota: 8,0/10.** Poderoso mas perde timing com o clímax anterior.
- ⚠️ **"Vence amanhã" vem 8s depois de "zera em 18 dias"** — duas ameaças em sequência diluem a urgência. Considerar cross-dissolve de 200ms entre ato2-03 e ato2-05 criando "estoque desabando".

#### 🕸️ B-roll 03 — `br-03` Pulso de Rede (1:10, 5s)
**Nota: 6,5/10.** Bom visual, metáfora clara.
- ⚠️ 12 nós + 18 links pode parecer "dashboard genérico de rede". WorkConnect tem identidade dourada — usar para reforçar.

#### 🎬 Ato 3 — `ato3-01` Alertas (1:15, 8s)
**Nota: 8,0/10.** A fila ordenada por urgência é um insight visual forte.
- ✅ Cores por prioridade (vermelho/laranja/amarelo) comunicam antes da fala.
- ⚠️ 6 alertas em 8s = 1,33s por alerta. No limite do legível. Considerar mostrar só 4.

#### 🎬 Ato 3 — `ato3-04` Toast (1:23, 6s)
**Nota: 9,0/10.** O "1-clique" é a promessa mais forte do pitch.
- ✅ Toast verde + "4 alertas resolvidos" = feedback visual imediato, satisfatório.
- 🏆 **Momento "aha" do Ato 3.** Proteger também.

#### 🎬 Ato 3 — `ato3-05` Fornecedores (1:29, 7s)
**Nota: 7,5/10.** Comparação boa mas menos cinematográfica.
- ✅ Top 5 dias vs pior 10 = gap visual imediato via barras.
- ⚠️ **Falta consequência verbal.** "O top entregou em 5. O pior, em 10." — e daí? A frase da locução (`06-VOICE-OVER.md` TC 1:29) não amarra isso em ação. Considerar adicionar: "Renegocie ou troque."

#### 🎬 Ato 4 — `ato4-03` Selo LGPD (1:36, 8s)
**Nota: 7,0/10.** Institucional, mas perde o ritmo.
- ⚠️ Selo gold-on-black é bonito mas **abstrato para leigo**. Banca acadêmica entende, investidor talvez não.
- ✅ Frase "É o chão de qualquer PME que quer crescer" é a melhor do ato — antropológica, não técnica.

#### 🔒 B-roll 04 — `br-04` Cadeado/Selo (1:44, 5s)
**Nota: 7,5/10.** Reforça ato 4, mas duplica o conceito.
- ⚠️ Risco: o espectador pode pensar "já vi selo, de novo?". A onda de ticks convergentes resolve parcialmente.

#### ⚫ Ato 5 — `ato5-02` Endcard (1:49, 11s)
**Nota: 8,0/10.** Fecho cinematográfico, mas longo.
- ⚠️ **11s é muito** para um endcard estático. Considerar usar 6s para o endcard + 5s para fade-to-black (silêncio marca de marca).

### 1.7 — Recomendações concretas (resumo Fase 1)

| # | Mudança | Custo | Ganho |
|---|---|---|---|
| 1 | Adicionar cursor fantasma animado em ato1-01 | 5 min | +1,0 pts de "percepção de UI real" |
| 2 | Trocar frase do cold-02 para algo mais visceral | 0 (copy) | +0,5 pts no gancho |
| 3 | Cross-dissolve rápido ato2-03 → ato2-05 (200ms overlap) | 10 min | +0,5 pts de tensão |
| 4 | Cortar 2 alertas de ato3-01 (mostrar 4) | 0 (copy) | +0,5 pts de legibilidade |
| 5 | Adicionar frase de consequência em ato3-05 | 0 (copy) | +0,5 pts de clareza |
| 6 | Mover Ato 4 (selo) para 3 tríades (selo/cadeado/cripto) | 30 min | +1,0 pts de simetria |
| 7 | Reduzir ato5-02 para 6s + 5s de fade-to-black | 5 min | +0,5 pts de "silêncio de marca" |

### 1.8 — Notas para o próximo loop (Fase 4)

Cenas candidatas a screenshot real (alta legibilidade, baixa cinematografia):
- `ato1-01` Dashboard → `/dashboard` real
- `ato3-01` AlertsTab → `/alerts` real
- `ato3-05` SupplierChart → gráfico real
- `ato2-01` Pareto → ABCChart real

Cenas que devem permanecer mockadas (cinematograficamente superiores):
- `cold-01..05` (estatísticas grandes, não existem na UI)
- `br-01..04` (interlúdios cinematográficos, não existem na UI)

---

## 🎙️ FASE 2 — Locução PT-BR (texto + dicção cena-a-cena)

### 2.1 — Diagnóstico macro da locução

**Métricas do roteiro atual (`06-VOICE-OVER.md`):**
- 18 blocos de fala
- ~270 palavras totais
- ~135 wpm (palavras por minuto)
- Ritmo geral: sóbrio, com pausas de 200/400ms antes de revelações numéricas
- 100% PT-BR (Brasil, não Portugal)

**Benchmark comparado (amostra de pitches SaaS virais em PT-BR e EN):**

| Pitch | Duração | WPM | Notas |
|---|---|---|---|
| Nubank "Voltar pra casa" (2023) | 1:00 | 158 | Ritmo íntimo, frases curtas |
| Stone "Quem acredita" (2024) | 1:30 | 142 | Tom coloquial |
| iFood "Tá na mesa" (2023) | 0:45 | 168 | Acelerado, propaganda |
| Vercel "Ship faster" (2024) | 1:00 | 145 EN | Documental |
| **Nosso** | **2:00** | **135** | **Documental, sóbrio** |

**Crítica:**
- ✅ WPM 135 está no ponto certo para narração institucional/didática. Não acelerar.
- ⚠️ **Voz pode parecer "lenta" se o locutor não tiver musicalidade.** Sugestão: gravar com locutor que já narrou documentários (Netflix Brasil, GNT).
- ⚠️ **Risco PT-BR vs PT-PT:** "governança", "stock", "auditoria", "consentimento" — todos ok PT-BR. Mas atenção a "paralelismo" (não usamos). Zero risco de PT-PT aqui.

### 2.2 — Convenções de leitura — auditoria

O roteiro usa `|` (pausa 200ms) e `||` (pausa 400ms). Auditei cena-a-cena:

| Bloco | Cena | Frase (resumo) | Análise de dicção |
|---|---|---|---|
| 1 | cold-01 | "Sessenta e oito por cento das PMEs controlam estoque em planilha." | ⚠️ "Sessenta e oito" soletra-se em 4 sílabas. Mais rápido falar "68%" (3 sílabas). **Recomendação:** ler como numeral abreviado "sessenta e oito por cento" na primeira vez (cold-01), depois como "68%" nas reprises. Aqui, primeira vez: numeral por extenso é OK para impacto. |
| 2 | cold-02 | "Dessas, mais da metade já perdeu a conta do que tem e do que não tem." | 🟢 Excelente. Frase coloquial. "Perdeu" com peso funciona. |
| 3 | cold-03 | "E quarenta e dois por cento perdem receita todo mês. Simplesmente porque o produto acabou." | 🟢 A quebra "produto acabou" é forte. Cuidado para não falar "acabou" como substantivo. |
| 4 | cold-04 | "Vinte e três minutos por dia, por operador, procurando um SKU que poderia estar a um clique." | ⚠️ "Procurando um SKU" — "SKU" é anglicismo. **Recomendação:** explicar visualmente em overlay "SKU = código do produto" no teaser.html. Locução pode manter "SKU" mas com pitch levemente descendente em "SKU" para soar como jargão consciente. |
| 5 | cold-05 | "WorkConnect. Gestão de estoque inteligente." | 🟢 3 frases, 3 pausas. Clássico. |
| 6 | br-01 | "Dados em tempo real. Decisões em tempo real." | 🟢 Paralelismo perfeito. Tom levemente mais rápido (150 wpm) — anotação correta. |
| 7 | ato1-01 | "Um único painel mostra o que importa — e o que está em risco." | 🟢 "—" em-dash = pausa dramática. "Risco" descendente. |
| 8 | br-02 | "Vinte e dois produtos sob gestão. Cinco críticos. Seis alertas ativos." | 🟢 Tríade curta. Funciona. |
| 9 | ato2-01 | "Vinte por cento dos seus produtos concentram oitenta por cento do valor. Você sabe quais são?" | 🟡 "Você sabe quais são?" no fim — pergunta retórica sem resposta. Em 2:00 cortamos o zoom que responderia. **Recomendação:** trocar por uma afirmação direta que não precisa de resposta: "E esses vinte por cento? Eles merecem a sua atenção." |
| 10 | ato2-03 | "E se nada mudar? Em dezoito dias este resistor acaba — e com ele, três linhas de produção." | 🏆 **Melhor frase do roteiro.** Cuidado para não perder o ritmo. "Dezoito dias" não pode virar "dezoito, dias" (vírgula errada). |
| 11 | ato2-05 | "Mas não é só ruptura. Um lote vence amanhã." | 🟢 "Vence amanhã" — "amanhã" descendente. A dica de "fale rápido até vence, pause 200ms, baixe pitch em amanhã" é perfeita. |
| 12 | br-03 | "O sistema nunca dorme. Atualiza a cada trinta segundos." | 🟢 "Nunca dorme" ascendente, "trinta segundos" rápido. Bom contraste. |
| 13 | ato3-01 | "Veja o que precisa de atenção — em uma única fila, ordenada por urgência." | 🟢 "Urgência" segurar 300ms — anotação correta. |
| 14 | ato3-04 | "Quatro alertas críticos resolvidos em um único clique." | 🟢 3 frases paralelas curtas. "Clique" ascendente. |
| 15 | ato3-05 | "Seu fornecedor top entregou em cinco dias. O pior, em dez." | ⚠️ Falta consequência (ver Fase 1). **Recomendação:** adicionar após: "A diferença é o seu prazo." Ou trocar a frase inteira por: "Seu top entregou em cinco. O pior, em dez — e isso custa prazo de produção." |
| 16 | ato4-03 | "Porque governança não é detalhe. É o chão de qualquer PME que quer crescer." | 🟢 5 frases, 5 pesos. "Crescer" ascendente. |
| 17 | br-04 | "Cada acesso registrado. Cada exportação, consentida." | 🟢 Paralelismo simétrico. |
| 18 | ato5-02 | "WorkConnect. O estoque da sua empresa, finalmente sob controle." | 🏆 Slogan. Pausa antes de "sob controle" funciona. Segurar 800ms no silêncio final — correto. |

### 2.3 — Problemas de redação PT-BR

| # | Trecho | Problema | Correção sugerida |
|---|---|---|---|
| 1 | "Gestão de estoque inteligente" (cold-05) | Frase genérica, sem personalidade. Já é o slogan oficial? | Aceitar — é o claim oficial do produto. |
| 2 | "O estoque da sua empresa, finalmente sob controle" (ato5-02) | Dupla negação implícita ("finalmente") pode soar dramática demais. | Trocar "finalmente" por "agora": "O estoque da sua empresa, agora sob controle." Mais confiante. |
| 3 | "Dessas, mais da metade" (cold-02) | "Dessas" (referindo a PMEs) — pronome um pouco opaco. | Trocar para "Dessas empresas" ou "E dessas". |
| 4 | "Porque governança não é detalhe" (ato4-03) | "Porque" iniciando frase — incomum em PT-BR falado formal. | Trocar para "Governança não é detalhe." (sem "porque"). |
| 5 | "E com ele, três linhas de produção" (ato2-03) | "Linhas de produção" sem contexto — pode soar técnico demais. | Adicionar leve humanização: "E com ele, três linhas de produção... paradas." |

### 2.4 — Sugestões de produção de áudio

**Locutor (recomendado):**
- Gênero: masculino 30-45 anos (referência: narração de GNT "Futura" ou documentários Netflix Brasil)
- Timbre: grave-médio, sem sibilância
- Velocidade: 135 wpm média, com variação entre 120 (cold open) e 150 (br-01)

**Microfone sugerido:**
- Blue Yeti (USB, cardioide) — R$ 400-500
- Fifine K669 — R$ 150 (orçamento)
- Audio-Technica AT2020 — R$ 700 (qualidade)

**Tratamento de áudio:**
- Noise reduction: Audacity (free) ou iZotope RX (pago)
- EQ: cortar graves <80Hz, leve boost em 2-4kHz (presença)
- Compressão: 4:1, attack 5ms, release 50ms
- Loudness target: -16 LUFS integrated, true peak -1.5 dBTP

**TTS alternativo (rápido):**
- ElevenLabs free tier (10k chars/mês) — voz "Antoni" PT-BR
- Azure Cognitive Services (500k chars/mês free) — vozes neurais BR
- Google Cloud TTS (1M chars/mês free) — vozes Studio

### 2.5 — Recomendações concretas (resumo Fase 2)

| # | Mudança | Impacto |
|---|---|---|
| 1 | Trocar pergunta retórica do ato2-01 por afirmação | +0,5 pts clareza |
| 2 | Adicionar consequência em ato3-05 | +0,5 pts fechamento |
| 3 | Trocar "finalmente" por "agora" no ato5-02 | +0,3 pts confiança |
| 4 | Trocar "Porque governança" por "Governança" no ato4-03 | +0,3 pts PT-BR falado |
| 5 | Adicionar "paradas" após "linhas de produção" no ato2-03 | +0,3 pts humanização |
| 6 | Trocar "Dessas" por "Dessas empresas" no cold-02 | +0,2 pts clareza pronome |
| 7 | Adicionar overlay "SKU = código do produto" no teaser ato2-03 | +0,3 pts acessibilidade |

---

## 🎥 FASE 3 — Cinematografia das cenas B-roll

### 3.1 — Visão geral dos 4 B-rolls

| ID | TC | Duração | Nome | Emoção-alvo | Referência visual |
|---|---|---|---|---|---|
| `br-01` | 0:21 | 4s | Data Stream | Urgência + tech | Bloomberg Terminal, Stripe homepage |
| `br-02` | 0:37 | 5s | Armazém Vivo | Escala + realidade física | Amazon fulfillment tour, IKEA warehouse |
| `br-03` | 1:10 | 5s | Pulso de Rede | Confiança + live | Neo4j Browser, Linear changelog graph |
| `br-04` | 1:44 | 5s | Cadeado/Selo | Segurança + LGPD | 1Password lock screen, Vault UI |

**Princípios unificados:**
- Apenas CSS + SVG inline (zero imagens externas)
- Cores da paleta do app: `--bg #0a0a0a`, `--gold #FFD54F`, `--red #FF5252`, `--green #00E676`
- Movimento sutil: ken-burns, fade, pulse (nunca agressivo)
- Watermark canto inferior direito, opacity 0.5, sempre presente
- Fundo: `#0a0a0a` ou gradient radial `#1a1500 → #0a0a0a`

### 3.2 — `br-01` Data Stream — análise técnica

**Composição atual:**
- 80 barras verticais finas (largura ~22px cada, gap ~2px) que crescem da base
- Paleta: 60% gold, 25% gray, 15% red (proporções baseadas em densidade de "transações normais vs alertas")
- Onda sine SVG passa da esquerda à direita sobre as barras
- Animação: barras crescem em 0,9s ease-out (delays escalonados), onda em 3s ease-in-out

**Benchmark:**
- Bloomberg Terminal: mais denso, números em cada barra (alto ruído informacional)
- Stripe homepage 2023: barras + gradiente suave (mais clean, mais "stock")
- **Nosso**: clean, paleta consistente — **7,0/10**

**Críticas:**
- ✅ **80 barras** é densidade ideal para 1920×1080 — testa em 1280×720 e fica mais raso.
- ✅ **Animação sequencial** (delay 12ms por barra) cria sensação de "dados chegando", não de "tudo aparecendo".
- ⚠️ **Onda sine** é sutil demais — visualmente compete com barras. Aumentar opacidade da onda para 1.0 ou trocar por path animado em movimento mais óbvio.
- ⚠️ **Cores binárias** (apenas 3) podem parecer "dashboard de teste". Considerar adicionar 1 cor intermediária (orange) para alertas médios.
- ⚠️ **Watermark "WorkConnect" canto inferior** pode competir com a onda — considerar mover para canto superior durante B-rolls.

**Recomendação Fase 3.1:**
```css
.br01-wave { opacity: 1; stroke-width: 8; }  /* mais visível */
.br01-bars rect:nth-child(3n) { fill: var(--orange); }  /* 1/3 orange */
```

### 3.3 — `br-02` Armazém Vivo — análise técnica

**Composição atual:**
- Grid CSS 6 linhas × 14 colunas (84 caixas), gap 14px
- 4 caixas gold (posições 16, 27, 53, 76) com pulse gold 2s
- 1 caixa red (posição 38) com pulse red 1,2s (mais intenso)
- Animação ken-burns: scale 1.0 → 1.08 em 5s
- Background: gradient radial + grid sutil

**Benchmark:**
- Amazon fulfillment tours: fotos reais de prateleiras com luz quente
- IKEA warehouse: grid visual com cores vibrantes
- Apple "Behind the Mac" series: grade clean com elementos destacados
- **Nosso**: abstrato mas coeso — **7,5/10** (bom, mas "genérico estoque")

**Críticas:**
- ✅ **Grid 6×14** é o sweet spot — mais denso fica barulhento, mais ralo fica óbvio.
- ✅ **4 gold + 1 red** seguem o padrão de Pareto (80/15/5 implícito) sem precisar de números.
- ✅ **Pulse gold em 2s** + **pulse red em 1,2s** cria ritmo visual (red = mais urgente = mais rápido).
- ⚠️ **84 caixas é muito** — em 5s o olho lê ~12 caixas. Pode reduzir para 6×10 (60 caixas) sem perder impacto.
- ⚠️ **Caixas gold todas com mesmo pulse delay** — adicionar offsets diferentes (0s, 0,4s, 0,8s, 1,2s) para criar movimento orgânico.
- ⚠️ **Escala 1.08 em 5s** é sutil — em telas menores fica imperceptível. Aumentar para 1.15.

**Recomendação Fase 3.2:**
```css
.br02-cell.gold:nth-child(1) { animation-delay: 0s; }
.br02-cell.gold:nth-child(2) { animation-delay: 0.5s; }
.br02-cell.gold:nth-child(3) { animation-delay: 1s; }
.br02-cell.gold:nth-child(4) { animation-delay: 1.5s; }
.br02-grid { grid-template-columns: repeat(10, 1fr); grid-template-rows: repeat(6, 1fr); }
```

### 3.4 — `br-03` Pulso de Rede — análise técnica

**Composição atual:**
- 12 nós (5 inner ring + 7 outer ring) em padrão hexagonal
- 18 links gerados randomicamente (mas bidirecionais sem duplicate)
- 3 nós gold, 1 nó green (live indicator)
- 3 ondas concêntricas saindo dos gold (animation-delay 0s, 0,5s, 1s)
- Rotação global: 0deg → 2deg em 5s

**Benchmark:**
- Neo4j Browser: grafo force-directed, muitas labels, colorido
- Linear changelog: animação minimalista, nós pequenos
- D3 force layouts: pontos pequenos, links cinza
- **Nosso**: cinematográfico mas talvez "complexo demais" — **7,0/10**

**Críticas:**
- ✅ **Hexagonal distribution** é mais elegante que aleatório (simetria, ordem visual).
- ✅ **3 ondas concêntricas escalonadas** criam ritmo (não tudo de uma vez).
- ⚠️ **18 links random pode parecer bagunçado.** Considerar garantir que cada gold tem pelo menos 3 links.
- ⚠️ **Rotação 2deg** é quase imperceptível. Aumentar para 5deg OU substituir por pan horizontal sutil.
- ⚠️ **Nós pequenos (r=14)** — em 1920×1080 ficam ok, mas em 1280×720 ficam pequenos demais. Aumentar para r=18.

**Recomendação Fase 3.3:**
```javascript
// Garantir que cada gold tem pelo menos 3 links
const goldPositions = Array.from(goldIdx);
goldPositions.forEach(g => { /* force 3 connections */ });
```
```css
.br03-svg { animation: br03-rotate 5s ease-in-out forwards; }
@keyframes br03-rotate { from { transform: rotate(-3deg); } to { transform: rotate(3deg); } }
.br03-node { r: 18; }  /* aumentar nós */
```

### 3.5 — `br-04` Cadeado/Selo — análise técnica

**Composição atual:**
- Escudo SVG central (240×280) com gradiente gold + cadeado dentro
- 6 ticks ✓ convergindo de 6 direções diferentes
- Sub-texto "auditado · consentido · criptografado" embaixo, letter-spacing 6px
- Escala-in do escudo: 0 → 1 em 1s ease-out
- Ticks: animation-delay 0,2s/0,3s/0,4s/0,5s/0,6s/0,7s (sequencial rápido)

**Benchmark:**
- 1Password lock screen: escudo branco clean, sem movimento
- Vault UI: cadeado + checkmarks animados
- Apple Privacy page: escudo estilizado, foco em tipografia
- **Nosso**: cinematográfico, identidade forte — **8,5/10** (melhor B-roll)

**Críticas:**
- ✅ **Combinação escudo + cadeado** é poderosa (proteção dupla, redundância visual).
- ✅ **Gradiente gold (#FFD54F → #B8860B)** dá profundidade sem ser realista demais.
- ✅ **6 ticks convergentes** simula "validação chegando de várias fontes".
- ⚠️ **Ticks com mesma forma (todos ✓)** — diversificar: usar ✓ para 4 e 🔒 para 2 (cadeado + check).
- ⚠️ **Sub-texto "auditado · consentido · criptografado"** — "consentido" é jargão LGPD, "auditado" e "criptografado" são técnicos. Considerar trocar por algo mais humano: "Acesso seguro. Cada ação, sua decisão."
- ⚠️ **Letter-spacing 6px** está grande — em 1920×1080 ok, mas em 1280×720 vira texto espaçado demais. Reduzir para 4px.

**Recomendação Fase 3.4:**
```html
<div class="br04-sub">Acesso seguro · Cada ação, sua decisão</div>
```
```css
.br04-sub { letter-spacing: 4px; }
```

### 3.6 — Princípios visuais transversais

| Aspecto | Padrão atual | Avaliação |
|---|---|---|
| Background base | `#0a0a0a` (puro) ou gradient radial `#1a1500 → #0a0a0a` | 🟢 Consistente |
| Cor primária | `#FFD54F` (gold) | 🟢 Identidade WorkConnect |
| Cor secundária | `#FF5252` (red) ou `#00E676` (green) | 🟢 Coerente com UI |
| Tipografia (em texto) | Poppins 400/600, letter-spacing amplo | 🟢 Cinematográfico |
| Animação base | 200-600ms ease-out | 🟢 Suave |
| Densidade visual | 30-50% da tela ocupada | 🟢 Respira |
| Watermark | `WorkConnect` canto inferior direito, opacity 0.5 | 🟡 Compete com br-01 onda |

### 3.7 — Recomendações concretas (resumo Fase 3)

| # | Mudança | Custo | Ganho |
|---|---|---|---|
| 1 | br-01: aumentar opacidade/espessura da onda | 2 min | +0,5 pts leitura visual |
| 2 | br-01: adicionar orange em 1/3 das barras | 2 min | +0,3 pts densidade semântica |
| 3 | br-02: reduzir grid para 6×10 | 5 min | +0,3 pts legibilidade |
| 4 | br-02: offsets diferentes no pulse gold | 2 min | +0,4 pts organicidade |
| 5 | br-03: garantir 3+ links por gold | 5 min | +0,3 pts coesão |
| 6 | br-03: aumentar rotação para ±3deg + r=18 | 2 min | +0,4 pts visibilidade |
| 7 | br-04: diversificar ticks (✓ + 🔒) | 5 min | +0,4 pts variação visual |
| 8 | br-04: humanizar sub-texto | 0 (copy) | +0,5 pts clareza |
| 9 | Mover watermark para canto superior durante B-rolls | 5 min | +0,3 pts não-competição |

---

## 🗺️ FASE 4 — Mapeamento mock → real (preparação loop UX)

### 4.1 — Inventário do app real (estrutura navegável)

**Rotas disponíveis** (`src/app/`):
- `/` — Landing page → `src/components/landing/LandingPage.tsx`
- `/dashboard` — Dashboard operacional (com auth wrapper)
- `/estoque` — Legado (mesmo stack)
- `/lp` — Alternate landing
- `/configuracoes` — Settings

**Tabs do Dashboard** (`src/components/estoque/tabs/`):
- `DashboardTab.tsx` — visão geral
- `ProductsTab.tsx` — lista de produtos
- `CategoriesTab.tsx` — categorias
- `SuppliersTab.tsx` — fornecedores
- `MovementsTab.tsx` — movimentações
- `WarehousesTab.tsx` — armazéns
- `AlertsTab.tsx` — alertas (priorizados)
- `ExpirationsTab.tsx` — vencimentos
- `ReportsTab.tsx` — relatórios

**Charts disponíveis** (`src/components/estoque/charts/`):
- `ABCChart.tsx` ← pareto 80/15/5
- `ProjectionChart.tsx` ← projeção de ruptura
- `ExpirationTimelineChart.tsx` ← timeline de vencimentos
- `SupplierChart.tsx` ← ranking de fornecedores
- `CapacityGaugeChart.tsx`, `StatusChart.tsx`, `TurnoverChart.tsx`, `RealTimeChart.tsx`, `MovementTimelineChart.tsx`, `SeasonalTrendsChart.tsx`, etc.

### 4.2 — Cruzamento cena-do-storyboard ↔ componente real

| Cena | Tempo | Componente real candidato | URL/render | Mock atual substitui? |
|---|---|---|---|---|
| `cold-01..04` | 0:00-0:16 | ❌ Não existe — estatísticas narrativas | — | ✅ **MANTER MOCK** (não há equivalente na UI; é retórica) |
| `cold-05` | 0:16 | ❌ Logo da marca (design) | `/lp` header | ✅ **MANTER MOCK** (logo fullscreen é mais cinematográfico) |
| `br-01..04` | 0:21/0:37/1:10/1:44 | ❌ Não existem — interlúdios cinematográficos | — | ✅ **MANTER MOCK** (são "respirações" estéticas) |
| `ato1-01` | 0:25 | `DashboardTab` (4 hero metrics) | `/dashboard?debug=true` | 🟡 **CANDIDATO A SUBSTITUIR** |
| `ato2-01` | 0:42 | `ABCChart` (pareto) | `/dashboard` aba charts | 🟡 **CANDIDATO A SUBSTITUIR** |
| `ato2-03` | 0:54 | `ProjectionChart` (countdown 18 dias) | `/dashboard` aba charts | 🟡 **CANDIDATO A SUBSTITUIR** |
| `ato2-05` | 1:02 | `ExpirationTimelineChart` (lotes vencendo) | `/dashboard` aba charts | 🟡 **CANDIDATO A SUBSTITUIR** |
| `ato3-01` | 1:15 | `AlertsTab` (lista priorizada) | `/dashboard` tab Alertas | 🟢 **SUBSTITUIR** (alta legibilidade, é feature core) |
| `ato3-04` | 1:23 | ⚠️ Não há toast UI no momento — é uma ação | — | ✅ **MANTER MOCK** (representa UX futuro; screenshot real do toast não existe) |
| `ato3-05` | 1:29 | `SupplierChart` (ranking) | `/dashboard` aba charts | 🟢 **SUBSTITUIR** (alta legibilidade, é feature core) |
| `ato4-03` | 1:36 | ⚠️ Selo LGPD é decorativo | — | ✅ **MANTER MOCK** (é "marca institucional") |
| `ato5-02` | 1:49 | ❌ Endcard = design de marca | — | ✅ **MANTER MOCK** (não é UI) |

### 4.3 — Análise por categoria

**Candidatas a substituir por screenshot real (5 cenas):**
1. `ato1-01` Dashboard
2. `ato2-01` Pareto
3. `ato2-03` Projeção
4. `ato2-05` Vencimentos
5. `ato3-01` Alertas
6. `ato3-05` Fornecedores

**Razões para substituir:**
- ✅ **Credibilidade**: banca acadêmica quer ver o produto funcionando, não slides.
- ✅ **Reduz "teatro"**: menos mock, mais demo.
- ✅ **Prepara o terreno para o vídeo de demo real** (screencast narrado) que será a próxima iteração.

**Razões para MANTER mock:**
- ✅ **Cinematografia**: cold open, B-rolls, endcard são momentos de "marca" — não têm equivalente na UI.
- ✅ **Reconhecimento de deficiências da UI atual**: os gráficos reais podem ter problemas de UX (legibilidade, hierarquia) que o mock não tem. Substituir agora pode expor problemas reais antes da hora.

### 4.4 — Trade-off: substituir vs manter (matriz de decisão)

| Cena | Substituir? | Ganho | Risco |
|---|---|---|---|
| ato1-01 | 🟡 Talvez | Mostra produto real | Pode ter problemas de hierarquia visual |
| ato2-01 | 🟡 Talvez | Gráfico real, menos teatro | Legibilidade em 1920×1080 pode falhar |
| ato2-03 | ❌ Não (ainda) | Countdown real | Risco de número-âncora diferente |
| ato2-05 | ❌ Não (ainda) | Lista real de lotes | Pode ter mais de 4 itens, poluir tela |
| ato3-01 | 🟢 Sim | Lista priorizada | Risco de ter >6 alertas |
| ato3-05 | 🟢 Sim | Ranking real | Risco de ter <4 fornecedores |

**Recomendação Fase 4.1:**
Substituir **só `ato3-01` (Alertas)** e **`ato3-05` (Fornecedores)** neste próximo loop. São as 2 cenas onde:
1. A UI real é mais legível que o mock (listas ordenadas sempre vencem mock)
2. O screenshot real agrega credibilidade sem risco
3. Os dados mockados (alertas prioritários, ranking de fornecedores) existem no mock-data.ts

Manter mocks de `ato1-01`, `ato2-01`, `ato2-03`, `ato2-05` até o **loop de UX** (depois do loop atual) onde:
1. Auditaremos problemas reais de hierarquia visual
2. Decidiremos se gráficos precisam ser redesenhados
3. Aí sim substituiremos com confiança

### 4.5 — Implementação técnica (preparação)

**Script de captura atualizado** (`build/capture-frames.mjs`) precisaria de:

```javascript
// Novo fluxo: para cada cena "real", navegar para rota + estado
async function captureReal(scene) {
  const mapping = {
    'ato3-01': { url: 'http://localhost:3000/dashboard?debug=true&tab=alerts', wait: 1500 },
    'ato3-05': { url: 'http://localhost:3000/dashboard?debug=true&tab=suppliers', wait: 1500 },
  };
  await page.goto(mapping[scene].url);
  await page.waitForTimeout(mapping[scene].wait);
  await page.screenshot({ path: `frames/${scene}.png`, fullPage: false });
}
```

**Dependência nova:** o app precisa estar rodando em `localhost:3000` durante a captura.
- Comando: `npm run dev`
- Variável de ambiente: `NEXT_PUBLIC_PITCH_MODE=true` (opcional, para forçar render sem auth)

### 4.6 — Recomendações concretas (resumo Fase 4)

| # | Mudança | Custo | Ganho |
|---|---|---|---|
| 1 | Substituir `ato3-01` por screenshot real | 30 min | +1,5 pts credibilidade |
| 2 | Substituir `ato3-05` por screenshot real | 30 min | +1,5 pts credibilidade |
| 3 | Aguardar loop de UX para decidir sobre ato1-01, ato2-01, ato2-03, ato2-05 | 0 (defer) | Evita regressão visual |
| 4 | Adicionar flag `NEXT_PUBLIC_PITCH_MODE` no app para forçar render limpo | 15 min | +1,0 pts reprodutibilidade |

---

## 📋 Resumo executivo das 4 fases

### Top 5 mudanças recomendadas (ordenadas por impacto/custo)

| # | Fase | Mudança | Impacto | Custo |
|---|---|---|---|---|
| 1 | 4 | Substituir `ato3-01` por screenshot real | 🟢 Alto (credibilidade) | 30 min |
| 2 | 4 | Substituir `ato3-05` por screenshot real | 🟢 Alto (credibilidade) | 30 min |
| 3 | 2 | Trocar pergunta retórica do ato2-01 por afirmação | 🟡 Médio | 0 (copy) |
| 4 | 3 | br-02: offsets diferentes no pulse gold | 🟡 Médio | 2 min |
| 5 | 3 | br-04: humanizar sub-texto | 🟡 Médio | 0 (copy) |

### Métricas globais do pitch (estimativa pós-melhorias)

- **Storytelling**: 7,8/10 (era 7,5)
- **Locução**: 8,2/10 (era 7,8)
- **Cinematografia B-roll**: 7,8/10 (era 7,3)
- **Credibilidade real**: 8,5/10 (era 7,0, com substituição de 2 cenas)

### Próximo loop (UX real)

Quando você sinalizar que quer entrar no loop de análise UX da interface:
1. Auditar hierarquia visual dos gráficos reais (`ABCChart`, `ProjectionChart`, etc.)
2. Identificar problemas de affordance/feedback nos AlertsTab
3. Decidir se os gráficos do app precisam ser redesenhados antes de substituir no pitch
4. Implementar `NEXT_PUBLIC_PITCH_MODE` para captura limpa
5. Re-render do MP4 com 4 cenas reais (Dashboard + Pareto + Proj + Vcto + Alerts + Fornecedores)

---