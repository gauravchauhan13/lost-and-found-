/* ============================================================
   FindIt UPES — Utility Functions
   ============================================================ */

/**
 * Format a date string to human-readable format
 * @param {string} dateStr - ISO date string
 * @returns {string} Formatted date (e.g., "20 Mar 2026")
 */
export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Get relative time string from date
 * @param {string} dateStr - ISO date string
 * @returns {string} Relative time (e.g., "2h ago")
 */
export function timeAgo(dateStr) {
  const now = new Date();
  const d = new Date(dateStr);
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

/**
 * Format location object to readable string
 * @param {{ block?: string, area?: string, floor?: string }} loc
 * @returns {string} Location string (e.g., "Block A › Canteen › 1st Floor")
 */
export function formatLocation(loc) {
  if (!loc) return "Unknown";
  return [loc.block, loc.area, loc.floor].filter(Boolean).join(" › ");
}

/**
 * Generate a unique ID
 * @param {string} prefix - Prefix for the ID
 * @returns {string} Unique ID
 */
export function generateId(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Validate UPES email format
 * @param {string} email
 * @returns {boolean}
 */
export function isValidUPESEmail(email) {
  return email.trim().toLowerCase().endsWith("@ddn.upes.ac.in");
}

/**
 * Truncate text to specified length
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export function truncate(text, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Capitalize first letter of each word
 * @param {string} str
 * @returns {string}
 */
export function capitalize(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}
