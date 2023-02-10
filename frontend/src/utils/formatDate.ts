export function formatDate(dataString: string): string {
    return new Date(dataString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    })
}