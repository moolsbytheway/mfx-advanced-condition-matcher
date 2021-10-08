"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvancedConditionMatcher = void 0;
const filtrex_1 = require("filtrex");
class AdvancedConditionMatcher {
    constructor(expression) {
        this.expression = expression;
    }
    match(context) {
        const fieldsAsKeyValueMap = AdvancedConditionMatcher.getFieldsAsKeyValueMap(context);
        let compiler = filtrex_1.compileExpression(this.expression);
        const matched = compiler(fieldsAsKeyValueMap) === 1;
        return { matched: matched, fields: this.getFieldNames() };
    }
    getFieldNames() {
        const regex = /'(\w+)'/g;
        return (this.expression.match(regex) || []).map(e => e.replace(regex, '$1'));
    }
    static getFieldsAsKeyValueMap(context) {
        let values = [];
        for (let c in context.formGroup.controls) {
            values[c] = context.formGroup.controls[c]['value'];
        }
        return values;
    }
}
exports.AdvancedConditionMatcher = AdvancedConditionMatcher;
