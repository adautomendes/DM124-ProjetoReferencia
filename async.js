const print = (value) => console.log(value);

print("1");
setTimeout(() => print("2"), 1000);
print("3");