export function getFormattedTimestamp(): string {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0'); // 01-31
    const month = now.toLocaleString('en-US', { month: 'short' }); // Jan, Feb, ...
    const year = now.getFullYear(); // 2025
    const hours = String(now.getHours()).padStart(2, '0'); // 00-23
    const minutes = String(now.getMinutes()).padStart(2, '0'); // 00-59

    return `${day}-${month}-${year}_${hours}:${minutes}`;
}