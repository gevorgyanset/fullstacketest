function commonPrefix(inputs) {
    function commonPrefixLength(s1, s2) {
        let length = 0;
        for (let i = 0; i < Math.min(s1.length, s2.length); i++) {
            if (s1[i] === s2[i]) {
                length++;
            } else {
                break;
            }
        }
        return length;
    }

    const result = [];
    for (const string of inputs) {
        let totalSum = 0;
        for (let i = 0; i < string.length; i++) {
            const suffix = string.slice(i);
            totalSum += commonPrefixLength(string, suffix);
        }
        result.push(totalSum);
    }

    return result;
}

// Пример тестов
console.log(commonPrefix(['ababaa']));
console.log(commonPrefix(['aa']));
console.log(commonPrefix(['abcabcd']));
