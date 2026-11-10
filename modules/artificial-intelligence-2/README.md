# Artificial Intelligence 2 (probabilistic AI)

62 maths skills for weeks 1-5, each with a variation:

- Week 1: events and probability laws, conditional probability, product rule, total probability, Bayes rule, independence, joint tables, PMF and CDF, binomial and geometric, uniform PDF, expectation and variance, conditional PMFs
- Week 2: likelihood and log-likelihood, maximum likelihood (coin, Poisson), logistic regression (prediction, odds, sigmoid slope, gradient), Naive Bayes (posterior, spam, Laplace smoothing, training by counting), information theory (self-information, entropy, joint and conditional entropy, KL divergence, mutual information)
- Week 3: decision trees (Gini, entropy, information gain, best split), mRMR feature selection, confidence bounds (observed error, binomial tail, test set bound and size, union bound, Occam bound)
- Week 4: Beta prior and posterior, MAP estimate and formula, posterior mean, priors as L2 and L1 penalties, bias and variance of estimators
- Week 5: Bayesian networks (parameter counts, factorised joint, d-separation, Markov blanket, marginalisation, inference by enumeration, learning CPTs by counting)

The module has its own page, `app.html`, built from the Functional Programming design with a maths mode:

- A new skill opens with a 10-second lesson card (`lessons.js`): what it works out and one example of its own, worked step by step. Then **Plug in**, **Fill the gaps** and **Solve it**. A lesson never gives away the answer of either version of its exercise.
- Sets: **Essentials** (44 skills that still meet every idea of each week; `CORE` in `deck.js`), all course questions, or Variations. Focus per topic, a daily goal, a streak and a countdown to the class test (`exams` in `module.json`).
- At Solve it, the hint shows the steps of the working with the numbers left out.
- A **quick test**: 5 Solve it questions in 20 minutes, mostly skills you've met (as their variations, so the numbers are new), marked on the page. Right answers move skills up; missed ones come back in today's practice.

Every exercise is written for Recallr. `SRC` in `variations.js` names the slides or sheet question it practises. Nothing comes from exams, class tests or assignments.

Answers are numbers, formulas or short words, marked by `shared/maths.js`. Fractions, decimals rounded as asked, percentages and typed sums like `1 - 11/36` are accepted.

Check and build:

```sh
node scripts/test-maths.js modules/artificial-intelligence-2
node scripts/build.js
```
