// Utilidades para calendário

function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

// Função para definir cor do evento
export function getEventColor(event: { title: string }): string {
  const t = normalize(event.title);
  if (t.includes('ceia do senhor')) return 'var(--event-ceia)';
  if (t.includes('mulheres em missao') || t.startsWith('mm ') || t.includes('mm (')) return 'var(--event-mm)';
  if (t.includes('miss')) return 'var(--event-missoes)';
  if (t.includes('juventude') || t.includes('jovens')) return 'var(--event-juventude)';
  if (t.includes('casais')) return 'var(--event-casais)';
  if (t.includes('culto administrativo')) return 'var(--event-culto-adm)';
  if (t.includes('vigilia') || t.includes('treinamento') || t.includes('pgzao') || t.includes('assembleia') || t.includes('acao evangelistica') || t.includes('encontro de promotores') || t.includes('proclamai') || t.includes('feira') || t.includes('estudo biblico') || t.includes('cha de lencos')) return 'var(--event-geral)';
  if (t.includes('instituto biblico') || t.includes('oracao matutina') || t === 'culto') return 'var(--event-fixo)';
  if (t.includes('dia das maes') || t.includes('dia dos pais') || t.includes('criancas') || t.includes('natal') || t.includes('virada')) return 'var(--event-comemorativo)';
  return 'var(--event-geral)';
}
