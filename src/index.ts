import {ConditionMatcher, ConditionMatcherContext, ConditionMatcherResult} from 'mf-dynamic-form';
import {Parser} from "expr-eval";


export default class AdvancedConditionMatcher implements ConditionMatcher {
    expression: string;

    constructor(expression: string) {
        this.expression = expression;
    }

    match(context: ConditionMatcherContext): ConditionMatcherResult {
        const fieldsAsKeyValueMap = AdvancedConditionMatcher.getFieldsAsKeyValueMap(context);

        let parser = new Parser();
        this.addCustomFunctions(parser);
        let expr = parser.parse(this.expression);
        const matched = expr.evaluate(fieldsAsKeyValueMap)
        return {matched: matched, fields: this.getFieldNames()} as ConditionMatcherResult;
    }

    private addCustomFunctions(parser: Parser) {

        parser.functions.startsWith = function (term : string, searchString: string) {
            return term.toLowerCase().startsWith(searchString.toLowerCase());
        };

        parser.functions.endsWith = function (term : string, searchString: string) {
            return term.toLowerCase().endsWith(searchString.toLowerCase());
        };

        parser.functions.contains = function (term : string, searchString: string) {
            return term.toLowerCase().includes(searchString.toLowerCase());
        };

        parser.functions.notContains = function (term : string, searchString: string) {
            return !term.toLowerCase().includes(searchString.toLowerCase());
        };
    }

    private getFieldNames() {
        const regex: RegExp = /\$(\w+)/g;
        return (this.expression.match(regex) || []).map(e => e.replace(regex, '$1'));
    }

    private static getFieldsAsKeyValueMap(context) {
        const fieldsAsKeyValue = {};
        Object.keys(context.formGroup.controls).forEach(field => fieldsAsKeyValue[`$` + field] = context.formGroup.controls[field].value);
        return fieldsAsKeyValue;
    }}
