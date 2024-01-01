// 定义扩展方法
String.prototype.nullOrEmpty = function () {
    return this == null || this == undefined || this == "";
};
Number.prototype.toUSD = function (digits = 2) {
    return "$" + this.toFixed(digits);
};

class As {
    /**
     * 将一个对象转换为字符串，如果传入的是undefined或者是null，则返回空字符串。
     * @param {object} obj 
     * @returns {string}
     */
    static string(obj) {
        if (obj == null || obj == undefined) {
            return "";
        } else {
            return String(obj);
        }
    }
    /**
     * 将一个对象转换为数字，如果传入的是undefined或者是null，则返回0。
     * @param {object} obj 
     * @returns {number}
     */
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

class StringExtension {
    /**
     * 将一个对象转换为字符串，如果传入的是undefined或者是null，则返回空字符串。
     * @param {object} s 
     * @returns {string}
     */
    static asString(s) {
        return As.string(s);
    }

    /**
     * 将一个参数作为string类型处理，并且将其内容转换成boolean类型。
     * @param {object} str 
     * @returns {boolean}
     */
    static toBool(str) {
        if (str == null || str == undefined) {
            return false;
        } else {
            switch (str.toLowerCase()) {
                case null:
                case "":
                case "0":
                case "n":
                case "no":
                case "off":
                case "否":
                case "错":
                case "假":
                case "禁用":
                case "false":
                case "disable":
                case "disabled":
                case "close":
                case "closed":
                case "stop":
                case "stoped":
                    return false;
                case "1":
                case "y":
                case "yes":
                case "ok":
                case "not":
                case "on":
                case "是":
                case "对":
                case "真":
                case "启用":
                case "true":
                case "enable":
                case "enabled":
                case "open":
                case "openning":
                case "opening":
                case "start":
                case "started":
                    return true;
                default:
                    return false;
            }
        }
    }
    /**
     * 将一段HTML代码中的标签全部去掉。
     * @param {string} str 
     * @returns {string}
     */
    static stripHtml(str) {
        return str.replace(/<.*?>/g, '');
    }
    /**
     * 测试一个字符串是否是一个有效的电子邮件地址。
     * @param {string} email 
     * @returns {boolean}
     */
    static isEmail(email) {
        if (!email) return false;
        const regex = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return regex.test(email);
    }
    /**
     * 测试一个字符串是否是一个有效的手机号码。
     * @param {string} mobilePhone 
     * @returns {boolean}
     */
    static isMobilePhone(mobilePhone) {
        if (!mobilePhone) return false;
        const regex = /^((1[3,5,6,8][0-9])|(14[5,7])|(17[0,1,3,5,6,7,8])|(19[1,8,9]))\d{8}$/;
        return regex.test(mobilePhone);
    }
    /**
     * 测试一个字符串是否是一个有效的固定电话号码。
     * @param {string} phone 
     * @returns {boolean}
     */
    static isPhone(phone) {
        if (!phone) return false;
        const regex = /^(\d{3,4}-)?\d{6,8}$/;
        return regex.test(phone);
    }
    /**
     * 测试一个字符串是否是一个有效的身份证号码。
     * @param {string} cardId 
     * @returns {boolean}
     */
    static isCardId(cardId) {
        if (!cardId || cardId.trim().length !== 18) return false;

        // 数字验证
        if (!/^\d{17}[\dXx]$/.test(cardId)) {
            return false;
        }

        // 省份验证
        const address = "11x22x35x44x53x12x23x36x45x54x13x31x37x46x61x14x32x41x50x62x15x33x42x51x63x21x34x43x52x64x65x71x81x82x91";
        if (!address.includes(cardId.substring(0, 2))) {
            return false;
        }

        // 生日验证
        const birth = cardId.substring(6, 14);
        const year = birth.substring(0, 4);
        const month = birth.substring(4, 6);
        const day = birth.substring(6, 8);
        const birthday = new Date(year + '-' + month + '-' + day);
        if (birthday.getFullYear() != year || (birthday.getMonth() + 1) != month || birthday.getDate() != day) {
            return false;
        }

        // 校验码验证
        const arrVarifyCode = ["1", "0", "x", "9", "8", "7", "6", "5", "4", "3", "2"];
        const Wi = ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"];
        const Ai = cardId.substring(0, 17).split('');
        let sum = 0;
        for (let i = 0; i < 17; i++) {
            sum += Wi[i] * Ai[i];
        }
        const y = sum % 11;
        if (arrVarifyCode[y] !== cardId.substring(17).toLowerCase()) {
            return false;
        }
        return true;
    }
    /**
     * 测试一个字符串是否是一个有效的营业执照号码。
     * @param {string} businessLicense 
     * @returns {boolean}
     */
    static isBusinessLicense(businessLicense) {
        if (!businessLicense) return false;
        const regex = /^[0-9A-Z]{8}-[0-9A-Z]$/;
        return regex.test(businessLicense);
    }
    /**
     * 测试一个字符串是否是一个有效的URL地址。
     * @param {string} url 
     * @param {boolean} requireHttps 是否强制要求使用HTTPS协议
     * @returns {boolean}
     */
    static isUrl(url, requireHttps = false) {
        if (!url) return false;

        const pattern = requireHttps
            ? /^https:\/\/([\da-z.-]+)\.([a-z.]{2,6})(:[0-9]{1,5})?(\/[\w .-]*)*\/?$/
            : /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(:[0-9]{1,5})?(\/[\w .-]*)*\/?$/;

        return pattern.test(url);
    }
    /**
     * 测试一个字符串是否是一个有效的IPv4地址。
     * @param {string} ip 
     * @returns {boolean}
     */
    static isIPv4Address(ip) {
        if (!ip) return false;

        const regex = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
        if (regex.test(ip)) {
            if (/^0\.\d+\.0\.\d+$/.test(ip)) return false;

            const arr = ip.split('.');
            return arr.every(num => num >= 0 && num < 256);
        }
        return false;
    }
    /**
     * 测试一个字符串是否是一个有效的IPv6地址。
     * @param {string} ip 
     * @returns {boolean}
     */
    static isIPv6Address(ip) {
        if (!ip) return false;
        const regex = /^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$/;
        return regex.test(ip);
    }
    /**
     * 测试字符串是否是一个有效的版本号。
     * @param {string} str 
     * @returns 
     */
    static isValidVersionNumber(str) {
        if (!str) {
            return false;
        }

        const regex = /^\d+(\.\d+){0,3}$/;
        return regex.test(str);
    }
    /**
     * 比对两个版本号，判断是否是新版本。
     * @param {string} str 原始版本号
     * @param {string} str2 比对版本号
     * @param {boolean} equalIsNewer 是否认为相等的版本号是新版本
     * @returns 
     */
    static isNewerVersionThan(str, str2, equalIsNewer = false) {
        if (!isValidVersionNumber(str) || !isValidVersionNumber(str2)) {
            return false;
        }

        const version1Parts = str.split('.').map(Number);
        const version2Parts = str2.split('.').map(Number);

        const maxLength = Math.max(version1Parts.length, version2Parts.length);

        for (let i = 0; i < maxLength; i++) {
            const version1Part = i < version1Parts.length ? version1Parts[i] : 0;
            const version2Part = i < version2Parts.length ? version2Parts[i] : 0;

            if (version1Part < version2Part) {
                return false;
            } else if (version1Part > version2Part) {
                return true;
            }
        }

        return equalIsNewer;
    }
    /**
     * 向URL地址中添加查询字符串。
     * @param {string} url 
     * @param {*} keyOrQueryString 如果只有两个参数，则假设第二个参数是完整的查询字符串；如果有三个参数，则假设第二个参数是键，第三个参数是值。
     * @param {*} value 如果有三个参数，则假设第二个参数是键，第三个参数是值。
     * @returns 返回一个新的URL地址。
     */
    static appendQueryString(url, keyOrQueryString, value) {
        if (typeof value === "undefined") {
            // 当只有两个参数时，假设第二个参数是完整的查询字符串
            return url.includes("?") ? `${url}&${keyOrQueryString}` : `${url}?${keyOrQueryString}`;
        } else {
            // 当有三个参数时，假设第二个参数是键，第三个参数是值
            const encodedKey = encodeURIComponent(keyOrQueryString);
            const encodedValue = encodeURIComponent(value);
            return url.includes("?") ? `${url}&${encodedKey}=${encodedValue}` : `${url}?${encodedKey}=${encodedValue}`;
        }
    }
    /**
     * 移除URL地址中的查询字符串。
     * @param {string} url 
     * @param {*} key 
     * @returns 返回一个新的URL地址。
     */
    static removeQueryString(url, key) {
        if (!url.includes("?") || !key) return url;

        const [baseUrl, queryString] = url.split("?");
        const queryParams = new URLSearchParams(queryString);
        queryParams.delete(key);

        const newQueryString = queryParams.toString();
        return newQueryString ? `${baseUrl}?${newQueryString}` : baseUrl;
    }
    /**
     * 获取URL地址中的查询字符串。
     * @param {string} url 
     * @param {*} key 
     * @returns 返回一个新的URL地址。
     */
    static getQueryStringValue(url, key) {
        if (!url || !key) return null;

        const queryString = url.includes("?") ? url.split("?")[1] : url;
        const queryParams = new URLSearchParams(queryString);
        return queryParams.get(key);
    }
    /**
     * 
     * @param {string} str 
     * @param {string} encoding 编码方式，默认为utf-8
     * @returns 
     */
    static getBytes(str, encoding = 'utf-8') {
        const encoder = new TextEncoder(encoding);
        return encoder.encode(str);
    }





}
class NumberExtension {
    /**
     * 将一个对象转换为数字，如果传入的是undefined或者是null，则返回0。
     * @param {object} n 
     * @returns {number}
     */
    static asNumber(n) {
        return As.number(n);
    }
}

export default {
    StringExtension,
    NumberExtension,
    Memory
};
