import { ConditionMatcher, ConditionMatcherContext, ConditionMatcherResult } from 'mf-dynamic-form';
export default class AdvancedConditionMatcher implements ConditionMatcher {
    expression: string;
    constructor(expression: string);
    match(context: ConditionMatcherContext): ConditionMatcherResult;
    private addCustomFunctions;
    private getFieldNames;
    private static getFieldsAsKeyValueMap;
}
