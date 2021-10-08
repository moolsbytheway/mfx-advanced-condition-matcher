import {compileExpression} from 'filtrex';
import {
    ConditionMatcher,
    ConditionMatcherContext,
    ConditionMatcherResult
} from 'mf-dynamic-form';


export class AdvancedConditionMatcher implements ConditionMatcher {
    expression: string;

    constructor(expression) {
        this.expression = expression;
    }

    match(context: ConditionMatcherContext): ConditionMatcherResult {
        const fieldsAsKeyValueMap = AdvancedConditionMatcher.getFieldsAsKeyValueMap(context);
        let compiler = compileExpression(this.expression);
        const matched = compiler(fieldsAsKeyValueMap) === 1;

        return {matched: matched, fields: this.getFieldNames()} as ConditionMatcherResult;
    }

    private getFieldNames() {
        const regex: RegExp = /'(\w+)'/g;
        return (this.expression.match(regex) || []).map(e => e.replace(regex, '$1'));
    }

    private static getFieldsAsKeyValueMap(context) {
        let values = [];
        for (let c in context.formGroup.controls) {
            values[c] = context.formGroup.controls[c]['value'];
        }
        return values;
    }
}
