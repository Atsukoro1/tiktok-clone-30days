export const randomString = (): String => {
    return [...Array(10)].map(
        _ => (
            ~~(
                Math.random() * 36
            )
        ).toString(36)
    ).join("")
}