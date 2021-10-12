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

```html
<table>
    <thead>
    <tr>
        <th>Comparisons</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>x == y</td>
        <td>Equals</td>
    </tr>
    <tr>
        <td>x != y</td>
        <td>Does not equal</td>
    </tr>
    <tr>
        <td>x &lt; y</td>
        <td>Less than</td>
    </tr>
    <tr>
        <td>x &lt;= y</td>
        <td>Less than or equal to</td>
    </tr>
    <tr>
        <td>x &gt; y</td>
        <td>Greater than</td>
    </tr>
    <tr>
        <td>x &gt;= y</td>
        <td>Greater than or equal to</td>
    </tr>
    <tr>
        <td>x in [a, b, c]</td>
        <td>Equivalent to (x == a or x == b or x == c)</td>
    </tr>
    <tr>
        <td>x not in (a, b, c)</td>
        <td>Equivalent to (x != a and x != b and x != c)</td>
    </tr>
    <tr>
        <td>x.startsWith(a)</td>
        <td>x start with a</td>
    </tr>
    <tr>
        <td>x.endsWith(a)</td>
        <td>x ends with a</td>
    </tr>
    <tr>
        <td>x.contains(a)</td>
        <td>x contains a</td>
    </tr>
    <tr>
        <td>x.notContains(a)</td>
        <td>x not contains a</td>
    </tr>
    </tbody>

    <table>
        <thead>
        <tr>
            <th>Boolean logic</th>
            <th>Description</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>x or y</td>
            <td>Boolean or</td>
        </tr>
        <tr>
            <td>x and y</td>
            <td>Boolean and</td>
        </tr>
        <tr>
            <td>not x</td>
            <td>Boolean not</td>
        </tr>
        <tr>
            <td>( x )</td>
            <td>Explicity operator precedence</td>
        </tr>
        </tbody>
    </table>
</table>
```


@Since mf-dynamic-form@2.0.0

