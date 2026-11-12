/**
 * Asset manager for Ducky Productions
 * Handles Vite asset bundling and dynamic resolution for GitHub Pages deployment.
 */

import heroStadium from './images/hero_roblox_stadium_concert_1794244583969.jpg';
import venueStadium from './images/venue_ducky_stadium_1794244584727.jpg';
import venueNexus from './images/venue_ducky_nexus_1794244585585.jpg';
import venueDome from './images/venue_ducky_dome_1794244586856.jpg';
import concertNeon from './images/concert_neon_night_1794244586284.jpg';

export const ASSET_IMAGES = {
  heroStadium,
  venueStadium,
  venueNexus,
  venueDome,
  concertNeon,
};

/**
 * Resolves an image URL safely:
 * - If it's an external URL (http/https/data), returns it directly.
 * - If it references a known internal preset, returns the Vite-bundled URL with proper base path.
 * - Otherwise prepends Vite's BASE_URL so relative paths work on GitHub Pages.
 */
export function resolveAssetUrl(url: string | undefined): string {
  if (!url) return heroStadium;

  // External URLs or inline data URIs
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }

  // Preset filename matches
  if (url.includes('hero_roblox_stadium_concert')) return heroStadium;
  if (url.includes('venue_ducky_stadium')) return venueStadium;
  if (url.includes('venue_ducky_nexus')) return venueNexus;
  if (url.includes('venue_ducky_dome')) return venueDome;
  if (url.includes('concert_neon_night')) return concertNeon;

  // Prepend base URL for custom relative paths
  const base = import.meta.env.BASE_URL || '/';
  if (url.startsWith('/')) {
    const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
    return `${cleanBase}${url}`;
  }

  return url;
}
