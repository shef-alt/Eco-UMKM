export function formatRupiah(angka: number): string {
  return 'Rp ' + Math.round(angka).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function getTodayDate(): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
  const d = new Date();
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function getNowDateTime(): string {
  return (
    getTodayDate() +
    ' ' +
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
}

export function getCategoryIcon(cat: string): string {
  switch (cat) {
    case 'pakaian': return 'fa-tshirt';
    case 'elektronik': return 'fa-microchip';
    case 'plastik': return 'fa-wine-bottle';
    case 'kertas': return 'fa-box';
    case 'logam': return 'fa-cog';
    case 'organik': return 'fa-leaf';
    default: return 'fa-recycle';
  }
}
