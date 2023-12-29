/**
 * 表示状态标志的类，用于存储操作的结果状态。
 */
class StateFlag {
    /**
     * 表示是否成功
     * @type {boolean}
     */
    success = false;
    /**
     * 表示状态所含的数据。
     * @type {object}
     */
    data = null;
    /**
     * 表示一个状态代码。
     * @type {number}
     */
    code = 0;
    /**
     * 表示状态的消息。
     * @type {string}
     */
    message = "";
    /**
     * 从一个JSON对象或者JSON字符串中加载或者恢复一个StateFlag对象。
     * @param {object | string} obj - 要加载的JSON对象或者JSON字符串。
     * @returns {StateFlag}
     */
    static load(obj) {
        if (typeof obj == "StateFlag") return obj;

        if (typeof obj === "string") obj = JSON.parse(obj);
        var flag = new StateFlag();

        if (typeof obj.Success == "boolean") flag.success = obj.Success;
        else if (typeof obj.success == "boolean") flag.success = obj.success;

        if (typeof obj.Code == "number") flag.code = obj.Code;
        else if (typeof obj.code == "number") flag.code = obj.code;

        if (typeof obj.Data == "undefined" || obj.Data == null) flag.data = obj.data;
        else flag.data = obj.Data;

        if (typeof obj.Message == "undefined" || obj.Message == null) flag.message = obj.message;
        else flag.message = obj.Message;

        return flag;
    }
}

export { StateFlag };