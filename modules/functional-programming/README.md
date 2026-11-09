# Functional Programming (Haskell)

58 exercises for weeks 1-5, each with a variation:

- Week 1: first functions, tuples and polymorphism, curried functions, Game of Life helpers
- Week 2: guards, `if then else`, pattern matching, `case`, recursion on lists and numbers, quicksort, `map`, `filter`, lambdas, `foldr`, composition, `all`/`any`
- Week 3: `data` and `deriving`, instances by hand, constraints, `Bounded` and `Enum`
- Week 4: list comprehensions (Problem Sheet 4), `map`/`filter`/`foldr` rewrites, `Maybe`, `Either`, binary trees (`Data1`)
- Week 5: binary search trees, merge sort, rose trees, expression trees (`Data2`)

`practice-tests/` has a timed practice test in the vLab format (fill in the `undefined`s, then run `checks`) and a paper-style mock (`paper-1.md`, with `paper-1-answers.md`): types, evaluation, functions by hand, data types and an induction proof. Their PDFs are in `docs/functional-programming/papers/`.

Check and build:

```sh
node scripts/test-haskell.js modules/functional-programming
node scripts/build.js
```
