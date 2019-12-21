export const truncateString = (s: string, limit: number, after: string = ''): string => (
    s.trim()
        .split(' ')
        .slice(0, limit)
        .join(' ') + after
);
