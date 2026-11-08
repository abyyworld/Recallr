# Functional Programming (Haskell)

58 exercises for weeks 1-5, each with a variation:

- Week 1: first functions, tuples and polymorphism, curried functions, Game of Life helpers
- Week 2: guards, `if then else`, pattern matching, `case`, recursion on lists and numbers, quicksort, `map`, `filter`, lambdas, `foldr`, composition, `all`/`any`
- Week 3: `data` and `deriving`, instances by hand, constraints, `Bounded` and `Enum`
- Week 4: list comprehensions (Problem Sheet 4), `map`/`filter`/`foldr` rewrites, `Maybe`, `Either`, binary trees (`Data1`)
- Week 5: binary search trees, merge sort, rose trees, expression trees (`Data2`)

`practice-tests/` has timed practice tests in the usual vLab format: fill in the `undefined`s, then run `checks` in ghci.

Check and build:

```sh
node scripts/test-haskell.js modules/functional-programming
node scripts/build.js
```
