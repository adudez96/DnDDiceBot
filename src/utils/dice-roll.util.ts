export function randomNumberGenerator(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

/**
 * Will generate in range min->max inclusive of both min and max
 * @param min 
 * @param max 
 */
export function randomWholeNumberGenerator(min: number, max: number): number {
    let minWhole = Math.ceil(min);
    let maxWhole = Math.floor(max);

    return Math.floor(randomNumberGenerator(minWhole, maxWhole + 1));
}

export function diceRoll(diceType: string): number {
    switch (diceType) {
        case 'd10':
            return randomWholeNumberGenerator(0, 9);
        case 'd100':
            return randomWholeNumberGenerator(0, 9) * 10;
        default:
            if (diceType.startsWith('d')) diceType = diceType.slice(1);
            return randomWholeNumberGenerator(1, parseInt(diceType));
    }
}
