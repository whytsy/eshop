import { randomInt } from "crypto"

export const generateSixDigitCode = () => {
    const code = randomInt(0, 1000000)
    return code.toString().padStart(6, '0')
}