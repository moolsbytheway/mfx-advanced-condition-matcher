"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_eval_1 = require("expr-eval");
class AdvancedConditionMatcher {
    constructor(expression) {
        this.expression = expression;
    }
    match(context) {
        const fieldsAsKeyValueMap = AdvancedConditionMatcher.getFieldsAsKeyValueMap(context);
        let parser = new expr_eval_1.Parser();
        this.addCustomFunctions(parser);
        const cleanedExpression = this.expression.replace("$", "").replace("#", "");
        let expr = parser.parse(cleanedExpression);
        const matched = expr.evaluate(fieldsAsKeyValueMap);
        return { matched: matched, fields: this.getFieldNamesFromExpression() };
    }
    addCustomFunctions(parser) {
        parser.functions.startsWith = function (term, searchString) {
            return term.toLowerCase().startsWith(searchString.toLowerCase());
        };
        parser.functions.endsWith = function (term, searchString) {
            return term.toLowerCase().endsWith(searchString.toLowerCase());
        };
        parser.functions.contains = function (term, searchString) {
            return term.toLowerCase().includes(searchString.toLowerCase());
        };
        parser.functions.notContains = function (term, searchString) {
            return !term.toLowerCase().includes(searchString.toLowerCase());
        };
        parser.functions.isNotEmpty = function (term) {
            return term != undefined && term != "";
        };
        parser.functions.iEmpty = function (term) {
            return term == null || term == "";
        };
    }
    getFieldNamesFromExpression() {
        const regex = /\$(\w+)/g;
        return (this.expression.match(regex) || []).map(e => e.replace(regex, '$1'));
    }
    static getFieldsAsKeyValueMap(context) {
        const fieldsAsKeyValue = {};
        Object.keys(context.formGroup.controls).forEach(field => fieldsAsKeyValue[field] = context.formGroup.controls[field].value);
        return fieldsAsKeyValue;
    }
}
exports.default = AdvancedConditionMatcher;
