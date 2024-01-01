import sj from "./src/index.js"
import te from "./src/typeExtension.js"
import { StateFlag } from "./src/stateFlag.js"

var str = "Hello World!";
console.log(te.StringExtension.asString(str));
console.log(te.Memory.new(str));
console.log(te.NumberExtension.asNumber(1).toUSD());
console.log(te.StringExtension.isUrl("https://www.baidu.com", true));

const stateFlag = new StateFlag();
stateFlag.success = true;
console.log(JSON.stringify(stateFlag));

var json = '{"success":true,"code":0,"data":null,"message":""}';
var flag = StateFlag.load(json);
var flag2 = te.Memory.new(flag);
flag2.success = false;
console.log(JSON.stringify(flag));
console.log(JSON.stringify(flag2));