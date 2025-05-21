/**
 * Maps an address string to one of the five NYC boroughs using basic pattern matching
 * @param {string} address - The address string to map
 * @return {string} - The borough name or "Unknown"
 */
export function getBorough(address) {
  if (!address) return 'Unknown';

  // Convert to lowercase for case-insensitive matching
  const addr = address.toLowerCase();

  // Check for direct borough mentions
  if (addr.includes('manhattan')) return 'Manhattan';
  if (addr.includes('brooklyn')) return 'Brooklyn';
  if (addr.includes('queens')) return 'Queens';
  if (addr.includes('bronx')) return 'Bronx';
  if (addr.includes('staten island')) return 'Staten Island';

  // Quick check for common ZIP code prefixes
  if (addr.match(/\b10[01]\d{2}\b/)) return 'Manhattan'; // Manhattan: 100xx, 101xx
  if (addr.match(/\b112\d{2}\b/)) return 'Brooklyn'; // Brooklyn: 112xx
  if (addr.match(/\b113\d{2}\b/)) return 'Queens'; // Queens: 113xx
  if (addr.match(/\b104[567]\d\b/)) return 'Bronx'; // Bronx: 1045x, 1046x, 1047x
  if (addr.match(/\b103[01]\d\b/)) return 'Staten Island'; // Staten Island: 1030x, 1031x

  // Fall back to "Unknown" if we can't determine the borough
  return 'Unknown';
}
