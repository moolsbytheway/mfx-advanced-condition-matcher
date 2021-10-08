import { ConditionMatcher, ConditionMatcherContext, ConditionMatcherResult } from 'mf-dynamic-form';
export declare class AdvancedConditionMatcher implements ConditionMatcher {
    expression: string;
    constructor(expression: any);
    match(context: ConditionMatcherContext): ConditionMatcherResult;
    private getFieldNames;
    private static getFieldsAsKeyValueMap;
}
