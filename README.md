### Advanced expression matcher

#### mf-dynamic-form plugin

#### Usage

Use it in your dynamic-form spec in `visibleWhen`, `requiredWhen`, `disabledWhen`

#### Example:

```javascript
   new TextboxFormControl({
    key: 'field1',
    label: 'Field 1'
}),
    new TextboxFormControl({
        key: 'field2',
        label: 'Field 2',
        visibleWhen: [new AdvancedConditionMatcher("'$field1' > 5")],
        requiredWhen: [new AdvancedConditionMatcher("'$field1' == 5")]
    }),
    new TextboxFormControl({
        key: 'field3',
        label: 'Field 3',
        disabledWhen: [new AdvancedConditionMatcher(`startsWith($field2, 'Hello') or ($field2 != 'Hi' and $field1 in [10, 20])`)]
    })

```

#### Expressions

The expression language is based on https://www.npmjs.com/package/expr-eval

#### Expression Syntax

Is a logical expression, that evaluates to either “true” or “false.

|Comparisons|Description|
|--- |--- |
|x == y|Equals|
|x != y|Does not equal|
|x < y|Less than|
|x <= y|Less than or equal to|
|x > y|Greater than|
|x >= y|Greater than or equal to|
|x in [a, b, c]|Equivalent to (x == a or x == b or x == c)|
|x not in (a, b, c)|Equivalent to (x != a and x != b and x != c)|
|x.startsWith(a)|x start with a|
|x.endsWith(a)|x ends with a|
|x.contains(a)|x contains a|
|x.notContains(a)|x not contains a|

|Boolean logic|Description|
|--- |--- |
|x or y|Boolean or|
|x and y|Boolean and|
|not x|Boolean not|
|( x )|Explicity operator precedence|



@Since mf-dynamic-form@2.0.0

