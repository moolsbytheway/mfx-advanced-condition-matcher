"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_eval_1 = require("expr-eval");
class AdvancedConditionMatcher {
    constructor(expression, targetFormGroup) {
        this.expression = expression;
        this.targetFormGroup = targetFormGroup;
    }
    match(context) {
        const targetFormGroup = this.targetFormGroup || context.formGroup;
        const fieldsAsKeyValueMap = AdvancedConditionMatcher.getFieldsAsKeyValueMap(targetFormGroup);
        let parser = new expr_eval_1.Parser();
        this.addCustomFunctions(parser);
        const cleanedExpression = this.expression.replace("$", "").replace("#", "");
        let expr = parser.parse(cleanedExpression);
        const matched = expr.evaluate(fieldsAsKeyValueMap);
        return { matched: matched, fields: this.getFieldNamesFromExpression(), targetFormGroup: targetFormGroup };
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
    static getFieldsAsKeyValueMap(targetFormGroup) {
        const fieldsAsKeyValue = {};
        Object.keys(targetFormGroup.controls).forEach(field => fieldsAsKeyValue[field] = targetFormGroup.controls[field].value);
        return fieldsAsKeyValue;
    }
}
exports.default = AdvancedConditionMatcher;
