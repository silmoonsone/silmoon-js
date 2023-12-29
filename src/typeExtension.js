// 定义扩展方法
String.prototype.nullOrEmpty = function () {
    return this == null || this == undefined || this == "";
};
Number.prototype.ToUSD = function () {
    return "$" + this;
};

class As {
    static string(obj) {
        if (obj == null || obj == undefined) {
            return "";
        } else {
            return String(obj);
        }
    }
    static number(obj) {
        if (obj == null || obj == undefined) {
            return 0;
        } else {
            return Number(obj);
        }
    }
}
class Memory {
    static new(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
}

function asString(s) {
    return As.string(s);
}
function asNumber(n) {
    return As.number(n);
}


export default { asString, asNumber, Memory };
