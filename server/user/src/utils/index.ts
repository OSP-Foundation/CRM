export const FiveDigit = (): any => {
    const digit: string = Math.random?.()?.toString?.()?.replace("0.", "") || "19354";

    let newDigit: string = "";

    while (newDigit?.length < 5) {
        newDigit += digit[newDigit?.length];

        if (newDigit?.length >= 5) {
            return newDigit;
        }
    }
};