"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_eval_1 = require("expr-eval");
class AdvancedConditionMatcher {
    constructor(expression, targetFormGroup) {
        this.expression = expression;
        this.targetFormGroup = targetFormGroup;
    }
    match(context) {
        let fieldsAsKeyValueMap = AdvancedConditionMatcher.getFieldsAsKeyValueMap(context.formGroup);
        if (!!this.targetFormGroup) {
            fieldsAsKeyValueMap = Object.assign(Object.assign({}, fieldsAsKeyValueMap), AdvancedConditionMatcher.getFieldsAsKeyValueMap(this.targetFormGroup));
        }
        let parser = new expr_eval_1.Parser();
        this.addCustomFunctions(parser);
        const cleanedExpression = this.expression.replaceAll("$", "").replaceAll("#", "");
        let expr = parser.parse(cleanedExpression);
        const matched = expr.evaluate(fieldsAsKeyValueMap);
        return { matched: matched, fields: this.getObjectFields(context.formGroup) };
    }
    getObjectFields(form) {
        const fields = this.getFieldNamesFromExpression();
        let result = [];
        fields.forEach(field => {
            var _a;
            if ((_a = this.targetFormGroup) === null || _a === void 0 ? void 0 : _a.controls.hasOwnProperty(field)) {
                result.push({ field: field, targetFormGroup: this.targetFormGroup });
            }
            else {
                result.push({ field: field, targetFormGroup: form });
            }
        });
        return result;
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
        parser.functions.isEmpty = function (term) {
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
