/**
 * 向一个启用位域的枚举添加一个标志
 * @param {number} val - 原始值
 * @param {number} flag - 要添加的标志
 * @returns {number}
 */
function addFlag(val, flag) {
    if (typeof flag !== 'number') throw new Error('flag must be a number');
    return val | flag;
};

/**
 * 从一个启用位域的枚举中移除一个标志
 * @param {number} val - 原始值
 * @param {number} flag - 要移除的标志
 * @returns {number}
 */
function removeFlag(val, flag) {
    if (typeof flag !== 'number') throw new Error('flag must be a number');
    return val & (~flag);
};

/**
 * 判断一个启用位域的枚举是否包含指定的标志
 * @param {number} val - 原始值
 * @param {...number} flags - 要检查的标志
 * @returns {boolean}
 */
function hasFlagOne(val, ...flags) {
    for (let flag of flags) {
        if (typeof flag !== 'number') throw new Error('flag must be a number');
        if ((val & flag) !== 0) return true;
    }
    return false;
};

/**
 * 判断一个启用位域的枚举是否包含指定的所有标志
 * @param {number} val - 原始值
 * @param {...number} flags - 要检查的标志
 * @returns {boolean}
 */
function hasFlagAll(val, ...flags) {
    for (let flag of flags) {
        if (typeof flag !== 'number') throw new Error('flag must be a number');
        if ((val & flag) !== flag) return false;
    }
    return true;
};

// Number.prototype.test = function () {
//     return this;
// };
// // 静态方法 - 用于将枚举字符串解析为枚举值
// Number.parseEnum = function(enumObject, value) {
//     return enumObject[value];
// };
// // 扩展Number原型以获取标志枚举数组
// Number.prototype.getFlagEnumArray = function(enumObject, includeZeroEnum = false) {
//     const result = [];
//     for (let key in enumObject) {
//         if (enumObject.hasOwnProperty(key)) {
//             const enumValue = enumObject[key];
//             if (!includeZeroEnum && enumValue === 0) continue;
//             if ((this & enumValue) === enumValue) {
//                 result.push(key);
//             }
//         }
//     }
//     return result;
// };

export default {
    /**
     * 向一个启用位域的枚举添加一个标志
     */
    addFlag,
    /**
     * 从一个启用位域的枚举中移除一个标志
     */
    removeFlag,
    /**
     * 判断一个启用位域的枚举是否包含指定的标志
     */
    hasFlagOne,
    /**
     * 判断一个启用位域的枚举是否包含指定的所有标志
     */
    hasFlagAll
}