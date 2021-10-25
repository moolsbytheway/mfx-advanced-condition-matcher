import { ConditionMatcher, ConditionMatcherContext, ConditionMatcherResult } from 'mf-dynamic-form';
export default class AdvancedConditionMatcher implements ConditionMatcher {
    expression: string;
    targetFormGroup: any;
    constructor(expression: string, targetFormGroup?: any);
    match(context: ConditionMatcherContext): ConditionMatcherResult;
    private addCustomFunctions;
    private getFieldNamesFromExpression;
    private static getFieldsAsKeyValueMap;
}
