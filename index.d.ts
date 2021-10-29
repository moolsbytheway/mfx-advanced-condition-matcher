import { ConditionMatcher, ConditionMatcherContext, ConditionMatcherResult, TargetField } from 'mf-dynamic-form';
export default class AdvancedConditionMatcher implements ConditionMatcher {
    expression: any;
    targetFormGroup: any;
    constructor(expression: string, targetFormGroup?: any);
    match(context: ConditionMatcherContext): ConditionMatcherResult;
    getObjectFields(form: any): TargetField[];
    private addCustomFunctions;
    private getFieldNamesFromExpression;
    private static getFieldsAsKeyValueMap;
}
