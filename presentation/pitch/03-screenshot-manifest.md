# 03 — Manifesto de Screenshots

> **Cada cena do storyboard precisa de um asset.** Este manifesto
> lista cada screenshot necessário, em que estado do app capturar,
> resolução, naming convention e como reproduzir.

---

## 📐 Convenções

- **Resolução nativa:** 1920×1080.
- **Device pixel ratio:** 2 (Retina simulado) — gera PNG 3840×2160,
  downscale no editor para nitidez.
- **Viewport Playwright:** `width: 1920, height: 1080`.
- **Navegador:** Chromium (default do Playwright).
- **Bypass de auth:** a rota `/dashboard?debug=true` pula o `AuthWrapper`.
- **Naming:** `scene_<ato>_<numero>_<slug>.png` (snake_case).

---

## 🎬 SCENE LIST — Cold Open (0:00 – 0:25)

| # | Slug | Estado | Resolução | Como capturar | Notas |
|---|---|---|---|---|---|
| 01 | `scene_00_cold_01_stat_68.png` | Tela preta, texto branco _"68% das PMEs..."_ | 1920×1080 | HTML estático ou canvas (sem app) | Texto centralizado, fonte Poppins 64px |
| 02 | `scene_00_cold_02_stat_55.png` | Tela preta, _"55% divergência..."_ | 1920×1080 | idem | – |
| 03 | `scene_00_cold_03_stat_42.png` | Tela preta, _"42% perdem receita..."_ | 1920×1080 | idem | – |
| 04 | `scene_00_cold_04_stat_23min.png` | Tela preta, _"23 min/dia procurando SKU"_ | 1920×1080 | idem | – |
| 05 | `scene_00_cold_05_logo.png` | Logo `WorkConnect` gold-on-black | 1920×1080 | `public/workconnect_logo_1773647062649.png` centralizado | Logo scale-in |

---

## 🎬 SCENE LIST — Ato 1: Um único painel (0:25 – 1:05)

| # | Slug | Estado | Resolução | Como capturar | Notas |
|---|---|---|---|---|---|
| 10 | `scene_01_01_dashboard_full.png` | Dashboard carregado completo, aba "dashboard" | 1920×1080 | `npm run dev` → abrir `http://localhost:3000/dashboard?debug=true` → screenshot fullpage | Esperar cascata de fade-in completar (~1.5 s) |
| 11 | `scene_01_02_metric_total.png` | Crop: hero metric "Total de Produtos" (canto sup. esq.) | 600×320 | Crop do #10 | Crop exato: x=0 y=180 w=480 h=300 |
| 12 | `scene_01_03_metric_critical.png` | Crop: hero metric "Produtos Críticos" | 600×320 | Crop do #10 | Sparkline vermelha visível |
| 13 | `scene_01_04_metric_value.png` | Crop: hero metric "Valor Total Estoque" | 600×320 | Crop do #10 | Número R$ 8.842 (soma do mock) |
| 14 | `scene_01_05_metric_alerts.png` | Crop: hero metric "Alertas Pendentes" com badge Live | 600×320 | Crop do #10 | Badge "Live" pulsante |

---

## 🎬 SCENE LIST — Ato 2: Pareto, projeção, prevenção (1:05 – 2:15)

| # | Slug | Estado | Resolução | Como capturar | Notas |
|---|---|---|---|---|---|
| 20 | `scene_02_01_abc_chart.png` | `ABCChart` totalmente renderizado | 800×500 | Dashboard, scroll até o chart ABC | 80% line traçada |
| 21 | `scene_02_02_abc_highlight_A.png` | Mesmo chart, com categoria A em destaque (overlay) | 800×500 | Pós-produção: adicionar box-shadow gold nos 4 top SKUs | – |
| 22 | `scene_02_03_projection_chart.png` | `ProjectionChart` | 800×500 | Dashboard, scroll | Linha descendente visível |
| 23 | `scene_02_04_projection_zoom.png` | Zoom no SKU RES-100K-001 chegando a zero | 600×400 | Crop do #22 com callout desenhado em pós | Tooltip visível |
| 24 | `scene_02_05_expirations.png` | Aba "Vencimentos" → `ExpirationTimelineChart` | 1920×1080 | `http://localhost:3000/dashboard?debug=true&tab=vencimentos` | Barra "vence amanhã" em vermelho |
| 25 | `scene_02_06_inventory_health_live.png` | `InventoryHealthChart` com badge Live | 800×500 | Dashboard, scroll | Badge pulsante visível |

---

## 🎬 SCENE LIST — Ato 3: Decisão em um clique (2:15 – 2:55)

| # | Slug | Estado | Resolução | Como capturar | Notas |
|---|---|---|---|---|---|
| 30 | `scene_03_01_alerts_full.png` | Aba "Alertas" com lista de 6 alertas | 1920×1080 | `?tab=alertas` | Cards coloridos por prioridade |
| 31 | `scene_03_02_alerts_zoom_urgentes.png` | Crop: top 3 cards URGENTE | 1200×400 | Crop do #30 | – |
| 32 | `scene_03_03_alerts_checked.png` | Mesma cena com 3 checkboxes marcados (estado pós-clique) | 1200×400 | Interação Playwright: clicar checkboxes | – |
| 33 | `scene_03_04_alerts_toast.png` | Toast verde _"4 alerta(s) resolvido(s)!"_ | 600×200 | Crop após clicar "Resolver Selecionados" | – |
| 34 | `scene_03_05_supplier_ranking.png` | Aba "Fornecedores" → `SupplierChart` | 1920×1080 | `?tab=fornecedores` | Barras ordenadas |
| 35 | `scene_03_06_supplier_worst.png` | Crop com fornecedor "Segurança Total" em destaque vermelho | 1000×400 | Crop do #34 + pós | – |

---

## 🎬 SCENE LIST — Ato 4: A prova institucional (2:55 – 3:20)

| # | Slug | Estado | Resolução | Como capturar | Notas |
|---|---|---|---|---|---|
| 40 | `scene_04_01_login_screen.png` | `/login` (rota não-debug) com AuthWrapper | 1920×1080 | `http://localhost:3000/login` ou `/` se redireciona | Header `LoginEnhanced` visível |
| 41 | `scene_04_02_login_filled.png` | Form com email/senha preenchidos | 1920×1080 | Interação Playwright: type | – |
| 42 | `scene_04_03_seal_lgpd.png` | Selo `LGPD Conforme` em tela preta | 1920×1080 | HTML estático (sem app) | Mesmo estilo do logo WorkConnect |
| 43 | `scene_04_04_dashboard_zoomout.png` | Dashboard em zoom-out (ken burns final) | 1920×1080 | Reutilizar #10 com efeito aplicado na timeline | – |

---

## 🎬 SCENE LIST — Ato 5: Cartão de visita (3:20 – 3:30)

| # | Slug | Estado | Resolução | Como capturar | Notas |
|---|---|---|---|---|---|
| 50 | `scene_05_01_card_lines_1_2.png` | Tela preta com _"WorkConnect."_ + _"Sistema de Gestão..."_ | 1920×1080 | HTML estático | Poppins Bold 72px gold |
| 51 | `scene_05_02_card_line_3.png` | Mesma tela + linha 3 com créditos | 1920×1080 | HTML estático | Inter Regular 24px cinza |

---

## 🛠️ Pipeline Playwright sugerido (alto-nível)

> **Status:** ainda não executado. O spec fica aqui para que o script
> `build-pitch.ps1` (ou a IA em uma próxima sessão) possa capturar
> tudo de uma vez.

```ts
// pseudo-spec — slides de orientação
const shots = [
  { name: 'scene_00_cold_01_stat_68.png', url: 'static://cold_open/01', wait: 0 },
  { name: 'scene_01_01_dashboard_full.png', url: '/dashboard?debug=true', wait: 2000 },
  { name: 'scene_01_02_metric_total.png', url: '/dashboard?debug=true', clip: { x:0, y:180, w:480, h:300 } },
  { name: 'scene_02_01_abc_chart.png', url: '/dashboard?debug=true', scroll: 1200, wait: 800 },
  // ...
];

for (const s of shots) {
  await page.goto(s.url);
  if (s.scroll) await page.evaluate(y => window.scrollTo(0, y), s.scroll);
  if (s.wait) await page.waitForTimeout(s.wait);
  await page.screenshot({ path: `build/frames/${s.name}`, fullPage: !!s.fullPage });
}
```

> **Nota:** o script de captura real será implementado em
> `build/build-pitch.ps1` (etapa 2) usando `playwright test` + uma
> spec gerada dinamicamente.

---

## 🖼️ Asset alternativo — `teaser.html`

Para não bloquear o pipeline de produção de vídeo, **`build/teaser.html`**
é uma página cinematográfica HTML5 + CSS + JS que renderiza toda a
narrativa sem precisar do app rodando. Ela serve como:

1. **Master visual** — pré-visualização do pitch na web.
2. **Fonte de vídeo** — pode ser capturada via Playwright
   (`page.goto('build/teaser.html')`) e encodada em MP4 pelo mesmo
   pipeline FFmpeg.
3. **Deliverable público** — linkável direto no README ou LinkedIn.

---

## ✅ Checklist de captura

- [ ] Cold open: 5 telas estáticas (cold-01 a cold-05)
- [ ] Ato 1: 5 assets (dashboard + 4 hero crops)
- [ ] Ato 2: 6 assets (ABC × 2, projection × 2, expirations, health)
- [ ] Ato 3: 6 assets (alerts × 4, supplier × 2)
- [ ] Ato 4: 4 assets (login × 2, selo LGPD, dashboard final)
- [ ] Ato 5: 2 telas de cartão
- [ ] **Total:** 28 assets (1920×1080 @ 2x = 3840×2160 PNG)