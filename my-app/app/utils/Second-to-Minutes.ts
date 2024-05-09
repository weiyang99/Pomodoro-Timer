const zeroLeft = (n: number): string =>
    Math.floor(n).toString().padStart(2, '0')

export function secondsToMinutes(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;

    const minStr = minutes === 60 ? '60' : zeroLeft(minutes);
    const secStr = zeroLeft(secondsRemaining);

    return `${minStr}:${secStr}`;
}