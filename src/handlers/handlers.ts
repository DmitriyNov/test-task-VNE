export function errorChance(callback: Function, errorCallback: Function) {
    const chance: number = Math.random();
    // Сделал высокую вероятность ошибки, чтобы точно выпадала при тестировании прототипа
    if (chance > 0.5) {
        errorCallback();
    } else {
        callback();
    }
}