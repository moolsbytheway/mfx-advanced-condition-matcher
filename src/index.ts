import {ConditionMatcher, ConditionMatcherContext, ConditionMatcherResult, FieldDef} from 'mf-dynamic-form';
import {Parser} from "expr-eval";

export default class AdvancedConditionMatcher implements ConditionMatcher {
    expression: any;
    targetFormGroup: any;

    constructor(expression: string, targetFormGroup?: any) {
        this.expression = expression;
        this.targetFormGroup = targetFormGroup;
    }

    match(context: ConditionMatcherContext): ConditionMatcherResult {
        let fieldsAsKeyValueMap = AdvancedConditionMatcher.getFieldsAsKeyValueMap(context.formGroup);
        fieldsAsKeyValueMap = {...fieldsAsKeyValueMap, ...AdvancedConditionMatcher.getFieldsAsKeyValueMap(this.targetFormGroup)};

        let parser = new Parser();
        this.addCustomFunctions(parser);
        const cleanedExpression = this.expression.replaceAll("$", "").replaceAll("#", "");
        let expr = parser.parse(cleanedExpression);
        const matched = expr.evaluate(fieldsAsKeyValueMap)
        return {matched: matched, fields: this.getObjectFields(context.formGroup)} as ConditionMatcherResult;
    }

    getObjectFields(form): FieldDef[] {
        const fields = this.getFieldNamesFromExpression();
        let result = [] as FieldDef[];
        fields.forEach(field => {
            if (this.targetFormGroup.controls.hasOwnProperty(field)) {
                result.push(
                    {field: field, targetFormGroup: this.targetFormGroup}
                )
            } else {
                result.push(
                    {field: field, targetFormGroup: form}
                )
            }
        })
        return result;
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

        parser.functions.isNotEmpty = function (term) {
            return term != undefined && term != "";
        };

        parser.functions.iEmpty = function (term) {
            return term == null || term == "";
        };
    }

    private getFieldNamesFromExpression() {
        const regex: RegExp = /\$(\w+)/g;
        return (this.expression.match(regex) || []).map(e => e.replace(regex, '$1'));
    }

    private static getFieldsAsKeyValueMap(targetFormGroup) {
        const fieldsAsKeyValue = {};
        Object.keys(targetFormGroup.controls).forEach(field => fieldsAsKeyValue[field] = targetFormGroup.controls[field].value);
        return fieldsAsKeyValue;
    }
}

