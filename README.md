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

#### Example with external FormGroup:
```javascript

    externalFormGroup = new FormGroup({
        firstName: new FormControl('Ahmed')
    });


    new TextboxFormControl({
        key: 'field3',
        label: 'Field 3',
        disabledWhen: [new AdvancedConditionMatcher(`startsWith($firstName, 'Ah')`, externalFormGroup)]
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
|startsWith(x, a)|x start with a|
|endsWith(y, a)|x ends with a|
|contains(x, a)|x contains a|
|notContains(x, a)|x not contains a|
|isNotEmpty(x)|x is not empty|
|isEmpty(x)|x is empty|

|Boolean logic|Description|
|--- |--- |
|x or y|Boolean or|
|x and y|Boolean and|
|not x|Boolean not|
|( x )|Explicity operator precedence|


@Since mf-dynamic-form@2.3.0
