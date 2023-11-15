function f1() { // Function
    return "Running F1...";
}

const f2 = function() { // Anonymous function
    return "Running F2...";
}

const f3 = () => { // Arrow function
    return "Running F3...";
}

console.log(`${f1()}\n\t${f2()}\n\t\t${f3()}`);

