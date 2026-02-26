// Utilidades para calendário

// Função para definir cor do evento
export function getEventColor(event: { title: string }): string {
  const t = event.title.toLowerCase();
  if (t.includes('ceia do senhor')) return 'var(--event-ceia)';
  if (t.includes('miss')) return 'var(--event-missoes)';
  if (t.includes('juventude') || t.includes('jovens')) return 'var(--event-juventude)';
  if (t.includes('casais')) return 'var(--event-casais)';
  if (t.includes('culto administrativo')) return 'var(--event-culto-adm)';
  if (t.includes('vigília') || t.includes('treinamento') || t.includes('pgzão') || t.includes('assembleia') || t.includes('ação evangelística') || t.includes('encontro de promotores') || t.includes('proclamai') || t.includes('feira') || t.includes('estudo bíblico') || t.includes('chá de lenços')) return 'var(--event-geral)';
  if (t.includes('instituto bíblico') || t.includes('oração matutina') || t === 'culto') return 'var(--event-fixo)';
  if (t.includes('dia das mães') || t.includes('dia dos pais') || t.includes('crianças') || t.includes('natal') || t.includes('virada')) return 'var(--event-comemorativo)';
  return 'var(--event-geral)';
}
