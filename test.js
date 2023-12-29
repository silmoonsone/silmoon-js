import sj from "./src/index.js"
import te from "./src/typeExtension.js"

var str = "Hello World!";
console.log(te.asString(str));
console.log(te.Memory.new(str));
console.log(te.asNumber(1));