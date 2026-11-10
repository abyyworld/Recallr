// Lesson cards shown before a new skill: what it works out, one example of its own worked
// step by step, and one tip. Every example's final value is recomputed by scripts/test-maths.js
// (value), and no example gives away the answer of either version of its exercise.
const LESSONS = {
 "eventSpace": {
  "what": "The event space F holds every event, that is every subset of Ω (the set of outcomes). With n outcomes, each is in or out of an event, so F has |F| = 2ⁿ events.",
  "example": "A football match ends in a win, a draw or a loss, so Ω = {W, D, L}. How many events are in F?",
  "trace": [
   {
    "line": "Ω = {W, D, L}, so n = 3 outcomes",
    "note": "W win, D draw, L loss"
   },
   {
    "line": "each outcome: in or out = 2 choices",
    "note": ""
   },
   {
    "line": "|F| = 2 × 2 × 2 = 2³",
    "note": "one 2 for each outcome"
   },
   {
    "line": "{}, {W}, {D}, {L},",
    "note": "check by listing them all"
   },
   {
    "line": "{W,D}, {W,L}, {D,L}, {W,D,L}",
    "note": "the empty set {} and Ω itself both count"
   },
   {
    "line": "|F| = 8 events",
    "note": ""
   }
  ],
  "value": "pow(2, 3)",
  "result": "8",
  "tip": "|F| is 2ⁿ, not n² or 2 × n. The empty set {} and Ω itself are events too, so don't stop at 2ⁿ − 1."
 },
 "additionRule": {
  "what": "P(A ∪ B), the chance of A or B or both, is P(A) + P(B) − P(A ∩ B). Add the two chances, then take away the overlap you counted twice.",
  "example": "A bus is late (L) with chance 0.3, crowded (C) with chance 0.4, and both with chance 0.1. What is P(L ∪ C)?",
  "trace": [
   {
    "line": "P(L ∪ C) = P(L) + P(C) − P(L ∩ C)",
    "note": "∪ means 'or', ∩ means 'and'"
   },
   {
    "line": "         = 0.3 + 0.4 − 0.1",
    "note": "take the 'both' part off once"
   },
   {
    "line": "         = 0.7 − 0.1",
    "note": ""
   },
   {
    "line": "         = 0.6",
    "note": ""
   }
  ],
  "value": "0.3 + 0.4 - 0.1",
  "result": "0.6",
  "tip": "P(A) + P(B) alone counts the 'both' cases twice. Only events that can't happen together have P(A ∩ B) = 0."
 },
 "conditional": {
  "what": "P(A | B), the chance of A given B, is P(A ∩ B) / P(B). Keep only the outcomes in B, and find what share of them are also in A.",
  "example": "Roll two fair dice (36 outcomes). A = 'a double', B = 'the total is 11 or more'. What is P(A | B)?",
  "trace": [
   {
    "line": "B = {(5,6), (6,5), (6,6)}",
    "note": "B: total 11 or more"
   },
   {
    "line": "A ∩ B = {(6,6)}",
    "note": "A: a double, both dice the same"
   },
   {
    "line": "P(B) = 3/36,  P(A ∩ B) = 1/36",
    "note": "36 equally likely outcomes"
   },
   {
    "line": "P(A | B) = P(A ∩ B) / P(B)",
    "note": "| means 'given'"
   },
   {
    "line": "         = (1/36) / (3/36)",
    "note": "the /36 cancels"
   },
   {
    "line": "         = 1/3",
    "note": ""
   }
  ],
  "value": "(1/36) / (3/36)",
  "result": "1/3",
  "tip": "Divide by P(B), the event you were told happened. P(A | B) and P(B | A) are usually different: here P(B | A) = 1/6."
 },
 "productRule": {
  "what": "Product rule: P(A₁ ∩ A₂) = P(A₁) × P(A₂ | A₁). Multiply the chance of the first step by the chance of the second, given the first happened.",
  "example": "A bag holds 5 sweets, 3 red and 2 green. You take two without putting the first back. What is the chance both are red?",
  "trace": [
   {
    "line": "P(A₁) = 3/5",
    "note": "A₁: first sweet is red"
   },
   {
    "line": "P(A₂ | A₁) = 2/4",
    "note": "A₂: second is red. 4 left, 2 red"
   },
   {
    "line": "P(A₁ ∩ A₂) = P(A₁) × P(A₂ | A₁)",
    "note": "product rule"
   },
   {
    "line": "           = 3/5 × 2/4",
    "note": ""
   },
   {
    "line": "           = 6/20 = 3/10",
    "note": ""
   }
  ],
  "value": "(3/5) * (2/4)",
  "result": "3/10",
  "tip": "Without replacement the second fraction changes: one fewer sweet, and one fewer red. 3/5 × 3/5 would be with replacement."
 },
 "totalProbability": {
  "what": "Law of total probability: if A₁, A₂, A₃ split everything into cases (a partition), P(B) = sum of P(Aᵢ) × P(B | Aᵢ). Weight each case, then add.",
  "example": "Machines 1, 2, 3 make 60%, 30% and 10% of a factory's bolts, and 1%, 2% and 5% of their bolts are bent. What is P(B), B = 'bent'?",
  "trace": [
   {
    "line": "P(B) = P(A₁)P(B | A₁) + P(A₂)P(B | A₂)",
    "note": "Aᵢ: made by machine i"
   },
   {
    "line": "     + P(A₃)P(B | A₃)",
    "note": "one term per machine"
   },
   {
    "line": "     = 0.6 × 0.01 + 0.3 × 0.02",
    "note": "share × bent rate"
   },
   {
    "line": "     + 0.1 × 0.05",
    "note": ""
   },
   {
    "line": "     = 0.006 + 0.006 + 0.005",
    "note": ""
   },
   {
    "line": "     = 0.017",
    "note": ""
   }
  ],
  "value": "0.6*0.01 + 0.3*0.02 + 0.1*0.05",
  "result": "0.017",
  "tip": "Multiply each case's share by its rate before adding. Adding or averaging the rates alone ignores how common each case is."
 },
 "bayesRule": {
  "what": "Bayes' rule turns P(T | D) around: P(D | T) = P(T | D)P(D) / P(T). The bottom, P(T), adds the true positives and the false positives.",
  "example": "10% of dogs at a shelter have fleas (D). A check is positive (T) for 80% of dogs with fleas and 5% without. What is P(D | T)?",
  "trace": [
   {
    "line": "P(Dᶜ) = 1 − 0.1 = 0.9",
    "note": "Dᶜ: no fleas"
   },
   {
    "line": "P(T) = P(T | D)P(D) + P(T | Dᶜ)P(Dᶜ)",
    "note": "all positives: true + false"
   },
   {
    "line": "     = 0.8 × 0.1 + 0.05 × 0.9",
    "note": ""
   },
   {
    "line": "     = 0.08 + 0.045 = 0.125",
    "note": ""
   },
   {
    "line": "P(D | T) = P(T | D)P(D) / P(T)",
    "note": "Bayes' rule"
   },
   {
    "line": "         = 0.08 / 0.125",
    "note": ""
   },
   {
    "line": "         = 0.64",
    "note": "not 0.8: false positives pull it down"
   }
  ],
  "value": "(0.8*0.1) / (0.8*0.1 + 0.05*0.9)",
  "result": "0.64",
  "tip": "P(D | T) is not P(T | D). When D is rare, false positives from the many without D can be as common as the true ones."
 },
 "independence": {
  "what": "Events A and B are independent if P(A ∩ B) = P(A) P(B): the chance of both equals the product. Then knowing one doesn't change the chance of the other.",
  "example": "P(M) = 0.6 that a friend messages you today, P(S) = 0.7 that it is sunny, and P(M ∩ S) = 0.42. Are M and S independent?",
  "trace": [
   {
    "line": "Independent needs P(M ∩ S) = P(M) P(S)",
    "note": "does 'both' equal the product?"
   },
   {
    "line": "P(M) P(S) = 0.6 × 0.7 = 0.42",
    "note": "M: a message, S: sunny"
   },
   {
    "line": "P(M ∩ S) = 0.42",
    "note": "given"
   },
   {
    "line": "0.42 = 0.42, so independent: yes",
    "note": ""
   }
  ],
  "value": null,
  "result": "yes",
  "tip": "Compare P(A ∩ B) with P(A) × P(B), not with P(A) or P(B) alone. Independent is not the same as 'can't happen together'."
 },
 "jointTable": {
  "what": "From a table of counts: a joint P(x, y) is one cell ÷ total, a marginal P(x) is a whole row ÷ total, and a conditional is joint ÷ marginal.",
  "example": "A café's 20 customers: tea, 6 had cake and 4 didn't; coffee, 2 had cake and 8 didn't. A customer had cake. What is P(tea | cake)?",
  "trace": [
   {
    "line": "          tea  coffee",
    "note": "N = 20 customers"
   },
   {
    "line": "cake        6       2",
    "note": ""
   },
   {
    "line": "no cake     4       8",
    "note": ""
   },
   {
    "line": "P(cake, tea) = 6/20 = 0.3",
    "note": "joint: one cell ÷ N"
   },
   {
    "line": "P(cake) = (6 + 2)/20 = 0.4",
    "note": "marginal: the whole cake row ÷ N"
   },
   {
    "line": "P(tea | cake) = P(cake, tea) / P(cake)",
    "note": "conditional: joint ÷ marginal"
   },
   {
    "line": "              = 0.3 / 0.4 = 0.75",
    "note": ""
   }
  ],
  "value": "(6/20) / ((6 + 2)/20)",
  "result": "0.75",
  "tip": "'Given cake' means look only inside the cake row: 6 of its 8 customers had tea. Don't divide by the tea column instead."
 },
 "pmfCount": {
  "what": "The PMF gives P(X = x), the chance that X takes the value x. With equally likely outcomes, count the outcomes that X turns into x and divide by the total.",
  "example": "A fair coin is tossed 2 times and X is the number of heads. Find P(X = 1), the chance of exactly 1 head.",
  "trace": [
   {
    "line": "Outcomes: 2² = 4, all equally likely",
    "note": "HH, HT, TH, TT"
   },
   {
    "line": "The event X = 1 is {HT, TH}",
    "note": "every outcome with exactly 1 head"
   },
   {
    "line": "It has 2 outcomes, so",
    "note": ""
   },
   {
    "line": "P(X = 1) = 2/4 = 1/2",
    "note": "count ÷ total"
   }
  ],
  "value": "2 / 4",
  "result": "1/2",
  "tip": "Count every order separately: HT and TH are two different outcomes, so both go in the event."
 },
 "cdfValue": {
  "what": "The CDF F(x) = P(X ≤ x) is the chance that X is x or less. Add the PMF P(X = k) for every value k up to and including x.",
  "example": "A weighted three-sided die shows X = 1, 2 or 3 with P(X = 1) = 0.3, P(X = 2) = 0.5 and P(X = 3) = 0.2. Find F(2).",
  "trace": [
   {
    "line": "F(2) = P(X ≤ 2)",
    "note": "the chance X is 2 or less"
   },
   {
    "line": "  = P(X = 1) + P(X = 2)",
    "note": "every value up to and including 2"
   },
   {
    "line": "  = 0.3 + 0.5",
    "note": ""
   },
   {
    "line": "  = 0.8",
    "note": "check: 1 − P(X = 3) = 1 − 0.2 = 0.8"
   }
  ],
  "value": "0.3 + 0.5",
  "result": "0.8",
  "tip": "≤ includes x itself: F(2) adds P(X = 2) too. Quick check: 1 minus the chances of the values above x."
 },
 "binomial": {
  "what": "Binomial(n, p) counts successes in n independent tries, each a success with chance p. P(X = k) = C(n, k) × p^k × (1 − p)^(n − k).",
  "example": "A biased coin lands heads with probability p = 0.1 and is tossed n = 5 times. X is the number of heads, so X ∼ Binomial(5, 0.1) (∼ means 'has the distribution'). Find P(X = 2).",
  "trace": [
   {
    "line": "P(X = k) = C(n, k) × p^k × (1 − p)^(n − k)",
    "note": "C(n, k) = n choose k"
   },
   {
    "line": "n = 5, k = 2, p = 0.1, 1 − p = 0.9",
    "note": "5 tosses, 2 heads wanted"
   },
   {
    "line": "C(5, 2) = 5! / (2! × 3!)",
    "note": "ways to pick which 2 tosses are heads"
   },
   {
    "line": "  = 120 / (2 × 6) = 10",
    "note": "5! = 5 × 4 × 3 × 2 × 1 = 120; 2! = 2, 3! = 6"
   },
   {
    "line": "P(X = 2) = 10 × 0.1^2 × 0.9^3",
    "note": ""
   },
   {
    "line": "  = 10 × 0.01 × 0.729",
    "note": "0.9 × 0.9 × 0.9 = 0.729"
   },
   {
    "line": "  = 0.0729",
    "note": ""
   }
  ],
  "value": "C(5, 2) * pow(0.1, 2) * pow(0.9, 3)",
  "result": "0.0729",
  "tip": "Don't forget C(n, k): p^k × (1 − p)^(n − k) is the chance of one order only, like HHTTT."
 },
 "geometric": {
  "what": "Geometric(p): X is the try on which the first success comes, each try a success with chance p. P(X = k) = (1 − p)^(k − 1) × p.",
  "example": "A biased coin lands heads with probability p = 0.2. X is the toss on which the first head comes, so X ∼ Geometric(0.2) (∼ means 'has the distribution'). Find P(X = 4).",
  "trace": [
   {
    "line": "P(X = k) = (1 − p)^(k − 1) × p",
    "note": "k − 1 tails, then a head"
   },
   {
    "line": "P(X = 4) = 0.8^3 × 0.2",
    "note": "p = 0.2, so 1 − p = 0.8"
   },
   {
    "line": "  = 0.512 × 0.2",
    "note": "0.8 × 0.8 × 0.8 = 0.512"
   },
   {
    "line": "  = 0.1024",
    "note": ""
   }
  ],
  "value": "pow(0.8, 3) * 0.2",
  "result": "0.1024",
  "tip": "Only one order works (tail, tail, tail, head), so there is no C(n, k) here, unlike the binomial."
 },
 "uniformPdf": {
  "what": "Uniform(a, b) is spread evenly from a to b, so its PDF f(x) (the density curve) is flat at height 1/(b − a). The chance of an interval is the rectangle's area: width × height.",
  "example": "X ∼ Uniform(1, 6) (∼ means 'has the distribution'): X is spread evenly between a = 1 and b = 6. Find P(2 ≤ X ≤ 4), the chance that X is between 2 and 4.",
  "trace": [
   {
    "line": "f(x) = 1/(b − a) = 1/(6 − 1) = 1/5",
    "note": "flat height, for 1 ≤ x ≤ 6"
   },
   {
    "line": "P(2 ≤ X ≤ 4) = area under f from 2 to 4",
    "note": ""
   },
   {
    "line": "  = width × height",
    "note": "a rectangle"
   },
   {
    "line": "  = (4 − 2) × 1/5",
    "note": ""
   },
   {
    "line": "  = 2/5 = 0.4",
    "note": ""
   }
  ],
  "value": "(4 - 2) / (6 - 1)",
  "result": "2/5",
  "tip": "The height is 1/(b − a), not 1: multiply it by the interval's width. A single point, like X = 3 exactly, has chance 0."
 },
 "expectation": {
  "what": "E[X], the expected value, is the long-run average of X. Multiply each value x by its chance P(X = x) and add them up: E[X] = Σ x × P(X = x).",
  "example": "X has PMF P(X = 0) = 2/6, P(X = 1) = 3/6 and P(X = 2) = 1/6. Find E[X], the expected value of X.",
  "trace": [
   {
    "line": "E[X] = Σ x × P(X = x)",
    "note": "Σ means add up over every value x"
   },
   {
    "line": "  = 0×2/6 + 1×3/6 + 2×1/6",
    "note": "each value times its chance"
   },
   {
    "line": "  = (0 + 3 + 2) / 6",
    "note": "same bottom, so add the tops"
   },
   {
    "line": "  = 5/6 ≈ 0.833",
    "note": ""
   }
  ],
  "value": "(0 * 2 + 1 * 3 + 2 * 1) / 6",
  "result": "5/6",
  "tip": "Weight each value by its chance: just averaging the values 0, 1 and 2 gives 1, not 5/6."
 },
 "variance": {
  "what": "Var(X) measures how spread out X is around its mean: Var(X) = E[X²] − (E[X])², the average of the squares minus the square of the average.",
  "example": "X is 1 with probability 0.4 and 2 with probability 0.6. Find Var(X) using Var(X) = E[X²] − (E[X])².",
  "trace": [
   {
    "line": "E[X]  = 1×0.4 + 2×0.6 = 1.6",
    "note": "the mean"
   },
   {
    "line": "E[X²] = 1²×0.4 + 2²×0.6",
    "note": "square each value, then weight it"
   },
   {
    "line": "      = 0.4 + 2.4 = 2.8",
    "note": ""
   },
   {
    "line": "Var(X) = E[X²] − (E[X])²",
    "note": ""
   },
   {
    "line": "       = 2.8 − 1.6²",
    "note": "1.6² = 1.6 × 1.6 = 2.56"
   },
   {
    "line": "       = 2.8 − 2.56 = 0.24",
    "note": ""
   }
  ],
  "value": "(1 * 1 * 0.4 + 2 * 2 * 0.6) - pow(1 * 0.4 + 2 * 0.6, 2)",
  "result": "0.24",
  "tip": "A variance is never negative. If you get one, you swapped E[X²] (square first) and (E[X])² (square the mean at the end)."
 },
 "conditionalPmf": {
  "what": "P(X = x | Y = y) is the chance of X = x given Y = y. Keep only the Y = y column (or row) of the joint table and divide the entry by its total, P(Y = y).",
  "example": "X and Y have joint PMF P(0, 0) = 0.1, P(1, 0) = 0.3, P(0, 1) = 0.2 and P(1, 1) = 0.4, where P(x, y) = P(X = x and Y = y). Find P(X = 1 | Y = 0).",
  "trace": [
   {
    "line": "        Y = 0   Y = 1",
    "note": "the joint PMF as a table"
   },
   {
    "line": "X = 0   0.1     0.2",
    "note": ""
   },
   {
    "line": "X = 1   0.3     0.4",
    "note": ""
   },
   {
    "line": "P(Y = 0) = 0.1 + 0.3 = 0.4",
    "note": "add the Y = 0 column"
   },
   {
    "line": "P(X = 1 | Y = 0) = P(1, 0) / P(Y = 0)",
    "note": "the entry ÷ its column total"
   },
   {
    "line": "  = 0.3 / 0.4 = 0.75",
    "note": ""
   }
  ],
  "value": "0.3 / (0.1 + 0.3)",
  "result": "0.75",
  "tip": "Divide by the total of the column you are given, not by 1 or the whole table: the kept column must add up to 1."
 },
 "logLikelihood": {
  "what": "The log-likelihood ℓ(θ) = ln L(θ | x) scores how well θ explains the draws: ln θ for each black draw, ln(1 − θ) for each white, so ℓ = k ln θ + (n − k) ln(1 − θ).",
  "example": "From 5 draws with replacement you get 2 black and 3 white balls; work out ℓ(θ) at θ = 0.4, where θ is the chance of black.",
  "trace": [
   {
    "line": "k = 2 black, n − k = 3 white, n = 5",
    "note": "k counts black draws, n counts all draws"
   },
   {
    "line": "L(θ | x) = θ² (1 − θ)³",
    "note": "θ per black draw, 1 − θ per white draw"
   },
   {
    "line": "ℓ(θ) = 2 ln θ + 3 ln(1 − θ)",
    "note": "ln turns the product into a sum"
   },
   {
    "line": "ℓ(0.4) = 2 ln 0.4 + 3 ln 0.6",
    "note": "1 − 0.4 = 0.6"
   },
   {
    "line": "  = 2 × (−0.9163) + 3 × (−0.5108)",
    "note": "ln 0.4 = −0.9163, ln 0.6 = −0.5108"
   },
   {
    "line": "  = −1.833 − 1.532",
    "note": ""
   },
   {
    "line": "  = −3.365",
    "note": ""
   }
  ],
  "value": "2 * ln(0.4) + 3 * ln(0.6)",
  "result": "−3.365",
  "tip": "ln of a chance is below 0, so ℓ is negative; nearer 0 means θ fits better. L is for this exact list, so do not multiply by the number of orders."
 },
 "mleBernoulli": {
  "what": "The maximum likelihood estimate θ̂ is the θ that makes the draws you saw most likely. For black or white draws it is k / n: black draws over all draws.",
  "example": "You draw a ball 5 times with replacement and see B, W, W, B, W (B = black, W = white); what is the maximum likelihood estimate θ̂ of θ, the chance of black?",
  "trace": [
   {
    "line": "B, W, W, B, W",
    "note": "only the counts matter, not the order"
   },
   {
    "line": "k = 2 black, n − k = 3 white, n = 5",
    "note": ""
   },
   {
    "line": "ℓ(θ) = 2 ln θ + 3 ln(1 − θ)",
    "note": "ln of L(θ | x) = θ² (1 − θ)³"
   },
   {
    "line": "dℓ/dθ = 2/θ − 3/(1 − θ) = 0",
    "note": "the slope is 0 at the peak"
   },
   {
    "line": "2(1 − θ) = 3θ, so 2 = 5θ",
    "note": ""
   },
   {
    "line": "θ̂ = k / n = 2/5",
    "note": ""
   }
  ],
  "value": "2 / 5",
  "result": "2/5",
  "tip": "Divide by all n draws, not by the white ones: 2/3 here would be wrong. θ̂ is simply the share of draws that were black."
 },
 "mleCoinFormula": {
  "what": "To find a maximum likelihood estimate, write the log-likelihood ℓ(p), set its slope dℓ/dp to 0 and solve for p. Here p is the chance of the event on each toss.",
  "example": "A drawing pin is tossed 4 times and lands point up 3 times; find p̂, the MLE of the chance p of point up, by setting the slope of ℓ(p) to zero.",
  "trace": [
   {
    "line": "k = 3 point up, n = 4 tosses",
    "note": "k counts point up, n counts all tosses"
   },
   {
    "line": "L(p) = p³ (1 − p)¹",
    "note": "n − k = 1 point down"
   },
   {
    "line": "ℓ(p) = 3 ln p + 1 ln(1 − p)",
    "note": "ℓ = ln L"
   },
   {
    "line": "dℓ/dp = 3/p − 1/(1 − p) = 0",
    "note": "ln p gives 1/p, ln(1 − p) gives −1/(1 − p)"
   },
   {
    "line": "3(1 − p) = 1p",
    "note": "times p(1 − p); this is k(1 − p) = (n − k)p"
   },
   {
    "line": "3 − 3p = p, so 3 = 4p",
    "note": ""
   },
   {
    "line": "p̂ = k / n = 3/4",
    "note": ""
   }
  ],
  "value": "3 / 4",
  "result": "3/4",
  "tip": "Multiplying by p(1 − p) clears the fractions. A chance lies between 0 and 1, so p̂ = k / n, never n / k."
 },
 "mlePoisson": {
  "what": "For Poisson counts with rate λ, the maximum likelihood estimate λ̂ is the sample mean: add up all the counts and divide by how many counts n there are.",
  "example": "A help desk counts calls in four 1-hour slots: 3, 0, 2, 1; modelling them as Poisson counts with rate λ, what is λ̂?",
  "trace": [
   {
    "line": "xᵢ = calls in slot i, n = 4 slots",
    "note": "Σ means add up"
   },
   {
    "line": "ℓ(λ) = (Σ xᵢ) ln λ − nλ − Σ ln(xᵢ!)",
    "note": "from P(X = x) = λ^x e^(−λ) / x!"
   },
   {
    "line": "dℓ/dλ = (Σ xᵢ)/λ − n = 0",
    "note": "the last term has no λ, so its slope is 0"
   },
   {
    "line": "λ̂ = Σ xᵢ / n",
    "note": "the sample mean"
   },
   {
    "line": "Σ xᵢ = 3 + 0 + 2 + 1 = 6",
    "note": ""
   },
   {
    "line": "λ̂ = 6 / 4 = 1.5",
    "note": ""
   }
  ],
  "value": "(3 + 0 + 2 + 1) / 4",
  "result": "1.5",
  "tip": "A slot with 0 calls still counts in n. Dividing by the 3 slots that had calls gives 2, which is wrong."
 },
 "logisticPredict": {
  "what": "Logistic regression adds up a score z (the log-odds) from the inputs, then the sigmoid σ(z) = 1 / (1 + e^(−z)) turns z into a chance between 0 and 1.",
  "example": "A model scores a bus being late as z = −1 + 0.2X₁ + 0.3X₂, with X₁ = rain in mm and X₂ = trip length in tens of km; find P(late) for 5 mm of rain on a 50 km trip.",
  "trace": [
   {
    "line": "X₂ = 50 km = 5 tens of km",
    "note": "put each input in the model's units"
   },
   {
    "line": "z = −1 + 0.2 × 5 + 0.3 × 5",
    "note": ""
   },
   {
    "line": "  = −1 + 1 + 1.5 = 1.5",
    "note": "z is the log-odds"
   },
   {
    "line": "P(late) = σ(1.5) = 1 / (1 + e^(−1.5))",
    "note": ""
   },
   {
    "line": "e^(−1.5) = 0.2231",
    "note": ""
   },
   {
    "line": "P(late) = 1 / 1.2231 = 0.818",
    "note": ""
   }
  ],
  "value": "sigmoid(-1 + 0.2 * 5 + 0.3 * (50 / 10))",
  "result": "0.818",
  "tip": "Convert inputs to the model's units first: 50 km is X₂ = 5 here, not 50. And σ uses e^(−z), with a minus."
 },
 "logOddsCoefficient": {
  "what": "Logistic regression says ln(odds) = the score, where odds = p / (1 − p). One more unit of an input adds its coefficient to ln(odds), so the odds are multiplied by e^(coefficient).",
  "example": "A model for a parcel arriving late has ln(odds) = −1.5 + 0.3X₁ + 0.4X₂, with X₁ = parcel weight in kg and X₂ = distance in tens of km; by what factor do the odds change if the trip is 10 km longer?",
  "trace": [
   {
    "line": "ln(odds) = −1.5 + 0.3X₁ + 0.4X₂",
    "note": "odds = p / (1 − p), p = chance of late"
   },
   {
    "line": "10 km more: X₂ goes up by 1",
    "note": "X₂ counts tens of km; X₁ stays fixed"
   },
   {
    "line": "so ln(odds) goes up by 0.4",
    "note": "the number in front of X₂"
   },
   {
    "line": "odds multiply by e^(0.4)",
    "note": "adding to ln(odds) multiplies the odds"
   },
   {
    "line": "e^(0.4) = 1.492",
    "note": "about 49% higher odds"
   }
  ],
  "value": "exp(0.4)",
  "result": "1.492",
  "tip": "The factor is e^(coefficient), not the coefficient itself, and it multiplies the odds, not the probability."
 },
 "sigmoidDerivative": {
  "what": "The slope of the sigmoid is σ′(z) = σ(z) × (1 − σ(z)). Work out σ(z) = 1 / (1 + e^(−z)) first, then multiply it by 1 minus itself.",
  "example": "Work out the slope σ′(z) of the sigmoid at z = 0.5.",
  "trace": [
   {
    "line": "σ(0.5) = 1 / (1 + e^(−0.5))",
    "note": ""
   },
   {
    "line": "  = 1 / (1 + 0.6065) = 0.6225",
    "note": "e^(−0.5) = 0.6065"
   },
   {
    "line": "σ′(z) = σ(z)(1 − σ(z))",
    "note": "the slope uses σ's own value"
   },
   {
    "line": "σ′(0.5) = 0.6225 × (1 − 0.6225)",
    "note": ""
   },
   {
    "line": "  = 0.6225 × 0.3775",
    "note": ""
   },
   {
    "line": "  = 0.2350",
    "note": ""
   }
  ],
  "value": "sigmoid(0.5) * (1 - sigmoid(0.5))",
  "result": "0.2350",
  "tip": "Don't stop at σ(z): that is the height, not the slope. The slope is biggest, 0.25, at z = 0 and shrinks as z moves away from 0."
 },
 "logisticGradient": {
  "what": "For one example, the slope of its cost Jᵢ with respect to θ₁ is (p − y) × x₁: the model's error p − y times the input x₁ that goes with θ₁. Here p = σ(θᵀx).",
  "example": "A model has weights θ = (θ₀, θ₁, θ₂) = (1, −0.5, 0.25); one example has x = (1, 2, 4), with x₀ = 1 for the bias, and label y = 1. Find ∂Jᵢ/∂θ₁.",
  "trace": [
   {
    "line": "z = θᵀx = 1 × 1 + (−0.5) × 2 + 0.25 × 4",
    "note": "multiply matching entries and add"
   },
   {
    "line": "  = 1 − 1 + 1 = 1",
    "note": ""
   },
   {
    "line": "p = σ(1) = 1 / (1 + 0.3679) = 0.7311",
    "note": "e^(−1) = 0.3679"
   },
   {
    "line": "∂Jᵢ/∂θ₁ = (p − y) x₁",
    "note": "error times the input that goes with θ₁"
   },
   {
    "line": "  = (0.7311 − 1) × 2",
    "note": ""
   },
   {
    "line": "  = −0.538",
    "note": ""
   }
  ],
  "value": "(sigmoid(1 * 1 + -0.5 * 2 + 0.25 * 4) - 1) * 2",
  "result": "−0.538",
  "tip": "It is p − y, not y − p. Gradient descent subtracts the slope, so a negative slope makes θ₁ bigger."
 },
 "naiveBayesPosterior": {
  "what": "Naive Bayes multiplies the feature chances within each class, then weighs each class by its prior. Divide one class's result by the total of both to get P(class | features).",
  "example": "A dog that scratches S and has red skin R may have fleas F: with P(S | F) = 0.5, P(R | F) = 0.6, P(S | ¬F) = 0.5, P(R | ¬F) = 0.1 and prior P(F) = 0.4, what is P(F | S, R)?",
  "trace": [
   {
    "line": "P(S, R | F) = 0.5 × 0.6 = 0.3",
    "note": "naive: multiply the signs within F"
   },
   {
    "line": "P(S, R | ¬F) = 0.5 × 0.1 = 0.05",
    "note": "¬F means no fleas"
   },
   {
    "line": "P(¬F) = 1 − 0.4 = 0.6",
    "note": ""
   },
   {
    "line": "F:  0.3 × 0.4 = 0.12",
    "note": "each group's product × its prior"
   },
   {
    "line": "¬F: 0.05 × 0.6 = 0.03",
    "note": ""
   },
   {
    "line": "P(F | S, R) = 0.12 / (0.12 + 0.03)",
    "note": "Bayes' rule: divide by the total"
   },
   {
    "line": "            = 0.12 / 0.15 = 0.8",
    "note": ""
   }
  ],
  "value": "(0.5*0.6*0.4) / (0.5*0.6*0.4 + 0.5*0.1*0.6)",
  "result": "0.8",
  "tip": "Multiply each group's product by its prior before you divide: skipping the priors is the classic slip. And P(¬F) = 1 − P(F)."
 },
 "naiveBayesSpam": {
  "what": "Naive Bayes scores each class: its prior times the chance of each word given that class. Divide a class's score by the sum of all the scores to get P(class | x).",
  "example": "A filter has P(Spam) = 0.4 and gets x = “act fast”, with P(act | Spam) = 0.5, P(fast | Spam) = 0.3, P(act | Not spam) = 0.1 and P(fast | Not spam) = 0.5: what is P(Spam | x)?",
  "trace": [
   {
    "line": "score(Spam) = P(Spam) × P(each word | Spam)",
    "note": "prior × each word's chance"
   },
   {
    "line": "  = 0.4 × 0.5 × 0.3 = 0.06",
    "note": ""
   },
   {
    "line": "score(Not spam) = 0.6 × 0.1 × 0.5",
    "note": "P(Not spam) = 1 − 0.4 = 0.6"
   },
   {
    "line": "                = 0.03",
    "note": ""
   },
   {
    "line": "P(Spam | x) = 0.06 / (0.06 + 0.03)",
    "note": "divide by the sum of the scores"
   },
   {
    "line": "            = 0.06 / 0.09 ≈ 0.667",
    "note": "above 0.5, so x is classed as Spam"
   }
  ],
  "value": "(0.4*0.5*0.3) / (0.4*0.5*0.3 + 0.6*0.1*0.5)",
  "result": "0.667",
  "tip": "The scores are only proportional (∝) to the posteriors, so divide by their sum. To just pick the class, the bigger score wins."
 },
 "laplaceSmoothing": {
  "what": "Laplace (add-one) smoothing stops a zero estimate: P̂(v | C) = (count + 1) / (total + K). count: class C examples with feature value v; total: class C examples; K: how many values the feature has.",
  "example": "A filter is trained on 8 Spam messages and none contains “meeting”; the feature “contains meeting” has K = 2 values (yes, no), so what is the smoothed P̂(yes | Spam)?",
  "trace": [
   {
    "line": "count = 0, total = 8, K = 2",
    "note": "K = 2 values: yes or no"
   },
   {
    "line": "plain count: 0/8 = 0",
    "note": "a zero would wipe out the whole Spam score"
   },
   {
    "line": "P̂(v | C) = (count + 1) / (total + K)",
    "note": "add 1 on top, K underneath"
   },
   {
    "line": "P̂(yes | Spam) = (0 + 1) / (8 + 2)",
    "note": ""
   },
   {
    "line": "              = 1/10 = 0.1",
    "note": ""
   }
  ],
  "value": "(0 + 1) / (8 + 2)",
  "result": "0.1",
  "tip": "Add 1 on top but K underneath (2 for yes or no), so no estimate is zero and the K estimates still add to 1."
 },
 "posteriorOdds": {
  "what": "Posterior odds P(D | S) / P(¬D | S) = likelihood ratio × prior odds, that is [P(S | D) / P(S | ¬D)] × [P(D) / P(¬D)]. P(S) cancels.",
  "example": "A condition D affects 25% of patients (¬D means not having D), and a symptom S shows in 90% of patients with D and 10% without: what are the posterior odds P(D | S) / P(¬D | S)?",
  "trace": [
   {
    "line": "likelihood ratio = P(S | D) / P(S | ¬D)",
    "note": "how strongly S points to D"
   },
   {
    "line": "                 = 0.9 / 0.1 = 9",
    "note": ""
   },
   {
    "line": "prior odds = P(D) / P(¬D)",
    "note": "P(¬D) = 1 − 0.25 = 0.75"
   },
   {
    "line": "           = 0.25 / 0.75 = 1/3",
    "note": ""
   },
   {
    "line": "posterior odds",
    "note": "P(S) is the same for D and ¬D, so it cancels"
   },
   {
    "line": "  = likelihood ratio × prior odds",
    "note": ""
   },
   {
    "line": "  = 9 × 1/3 = 3",
    "note": "so P(D | S) = 3 / (1 + 3) = 3/4"
   }
  ],
  "value": "(0.9 / 0.1) * (0.25 / 0.75)",
  "result": "3",
  "tip": "Odds are not a probability: odds o give P = o / (1 + o). A big likelihood ratio can still lose to tiny prior odds."
 },
 "nbTrainCounts": {
  "what": "Training Naive Bayes is counting. P̂(Spam) = Spam messages ÷ all messages, and P̂(word | Spam) = Spam messages with the word ÷ Spam messages.",
  "example": "Spam: “big deal”, “deal ends today”, “last chance”, “click here”; Not spam: “deal me in”, “see you soon”: what is P̂(deal | Spam)?",
  "trace": [
   {
    "line": "4 Spam + 2 Not spam = 6 messages",
    "note": ""
   },
   {
    "line": "P̂(Spam) = 4 / 6 ≈ 0.667",
    "note": "the prior: share of all messages"
   },
   {
    "line": "Spam with “deal”: “big deal”,",
    "note": "look only at the 4 Spam messages"
   },
   {
    "line": "  “deal ends today”: 2 of 4",
    "note": "“deal me in” is Not spam, so skip it"
   },
   {
    "line": "P̂(deal | Spam) = 2 / 4 = 0.5",
    "note": "divide by Spam messages, not all 6"
   }
  ],
  "value": "2 / 4",
  "result": "0.5",
  "tip": "For P̂(word | Spam) divide by the Spam messages only. Dividing by all messages, or by all messages with the word, answers a different question."
 },
 "selfInformation": {
  "what": "Self-information I(x) is how surprising one outcome is, in bits: I(x) = −log₂ P(x), where P(x) is its probability. The rarer the outcome, the more bits.",
  "example": "A raffle has 64 tickets and yours is drawn (probability 1/64): how much self-information I does this outcome carry, in bits?",
  "trace": [
   {
    "line": "I(x) = −log₂ P(x)",
    "note": "P(x) is the outcome's probability"
   },
   {
    "line": "I(win) = −log₂ (1/64)",
    "note": ""
   },
   {
    "line": "       = log₂ 64",
    "note": "the minus sign turns 1/64 into 64"
   },
   {
    "line": "       = 6 bits",
    "note": "because 2⁶ = 64"
   }
  ],
  "value": "-log2(1/64)",
  "result": "6",
  "tip": "Each halving of the probability adds 1 bit, and a certain outcome (P = 1) gives 0 bits. Keep the minus sign: log₂ of a probability is negative."
 },
 "entropyCoin": {
  "what": "Entropy H is the average surprise of an outcome, in bits: H = −Σ P(x) log₂ P(x), with one term for each outcome x (Σ means add them up).",
  "example": "A coin lands heads with probability 0.6 and tails with probability 0.4: what is its entropy H, in bits?",
  "trace": [
   {
    "line": "H = −(0.6 × log₂ 0.6 + 0.4 × log₂ 0.4)",
    "note": "one term per outcome"
   },
   {
    "line": "  = −(0.6 × (−0.7370) + 0.4 × (−1.3219))",
    "note": "log₂ 0.6 = −0.7370, log₂ 0.4 = −1.3219"
   },
   {
    "line": "  = 0.4422 + 0.5288",
    "note": "the minus signs cancel"
   },
   {
    "line": "  = 0.971 bits",
    "note": ""
   }
  ],
  "value": "entropy([0.6, 0.4])",
  "result": "0.971",
  "tip": "log₂ of a probability is negative, so the minus in front makes H positive. A fair 50/50 coin gives the most, 1 bit."
 },
 "entropyDistribution": {
  "what": "Entropy H = Σ P(x) × log₂(1/P(x)): each outcome x adds its probability times its surprise. With n outcomes, H is at most log₂ n.",
  "example": "A cat naps on the bed with probability 1/2, the sofa 1/4 and the floor 1/4: what is the entropy H of where it naps, in bits?",
  "trace": [
   {
    "line": "H = Σ P(x) × log₂(1/P(x))",
    "note": "Σ adds over each spot x"
   },
   {
    "line": "bed:   1/2 × log₂ 2 = 1/2 × 1 = 0.5",
    "note": "log₂ 2 = 1"
   },
   {
    "line": "sofa:  1/4 × log₂ 4 = 1/4 × 2 = 0.5",
    "note": "log₂ 4 = 2, as 2² = 4"
   },
   {
    "line": "floor: same as sofa = 0.5",
    "note": ""
   },
   {
    "line": "H = 0.5 + 0.5 + 0.5 = 1.5 bits",
    "note": ""
   }
  ],
  "value": "entropy([1/2, 1/4, 1/4])",
  "result": "1.5",
  "tip": "For chances 1/2, 1/4, 1/8, log₂(1/P) is just 1, 2, 3. Equal chances give the most: three outcomes give at most log₂ 3 = 1.585 bits."
 },
 "jointEntropy": {
  "what": "Joint entropy H(X, Y) is the uncertainty in X and Y together: treat each (x, y) pair as one outcome and use the entropy formula on P(x, y).",
  "example": "X is the weather (sun or rain) and Y is how Sam gets to work (bike or bus), with P(sun, bike) = 0.3, P(sun, bus) = 0.2, P(rain, bike) = 0.2 and P(rain, bus) = 0.3: what is H(X, Y), in bits?",
  "trace": [
   {
    "line": "H(X, Y) = −Σ Σ P(x, y) log₂ P(x, y)",
    "note": "add over all four (x, y) pairs"
   },
   {
    "line": "log₂ 0.3 = −1.7370, log₂ 0.2 = −2.3219",
    "note": ""
   },
   {
    "line": "H(X, Y) = 2 × (0.3 × 1.7370)",
    "note": "two pairs have P = 0.3"
   },
   {
    "line": "        + 2 × (0.2 × 2.3219)",
    "note": "two pairs have P = 0.2"
   },
   {
    "line": "  = 1.0422 + 0.9288",
    "note": "0.3 × 1.7370 = 0.5211, 0.2 × 2.3219 = 0.4644"
   },
   {
    "line": "  = 1.971 bits",
    "note": ""
   }
  ],
  "value": "entropy([0.3, 0.2, 0.2, 0.3])",
  "result": "1.971",
  "tip": "Add over every cell of the table, not over X or Y alone. The cells must add up to 1."
 },
 "conditionalEntropy": {
  "what": "Conditional entropy H(Y | X) is the uncertainty left in Y once you know X. Chain rule: H(Y | X) = H(X, Y) − H(X).",
  "example": "X says whether a shopper has a loyalty card (card or none) and Y whether they buy (buy or leave), with card and buy 0.6, card and leave 0, none and buy 0.2, none and leave 0.2: what is H(Y | X), in bits?",
  "trace": [
   {
    "line": "H(Y | X) = H(X, Y) − H(X)",
    "note": "chain rule"
   },
   {
    "line": "log₂ 0.6 = −0.7370, log₂ 0.2 = −2.3219",
    "note": ""
   },
   {
    "line": "H(X, Y) = 0.6 × 0.7370 + 2 × (0.2 × 2.3219)",
    "note": "the 0 pair adds 0"
   },
   {
    "line": "        = 0.4422 + 0.9288 = 1.3710 bits",
    "note": ""
   },
   {
    "line": "P(card) = 0.6 + 0 = 0.6, P(none) = 0.4",
    "note": "add each row of the table"
   },
   {
    "line": "H(X) = 0.6 × 0.7370 + 0.4 × 1.3219",
    "note": "log₂ 0.4 = −1.3219"
   },
   {
    "line": "     = 0.4422 + 0.5288 = 0.9710 bits",
    "note": ""
   },
   {
    "line": "H(Y | X) = 1.3710 − 0.9710 = 0.4 bits",
    "note": ""
   }
  ],
  "value": "entropy([0.6, 0.2, 0.2]) - entropy([0.6, 0.4])",
  "result": "0.4",
  "tip": "Subtract H(X), the entropy of the variable you are told, not H(Y). Get P(x) for H(X) by adding each row of the table."
 },
 "klDivergence": {
  "what": "KL divergence D_KL(P ∥ Q) measures how far a model Q is from the truth P: add P(x) × log₂(P(x) / Q(x)) over the outcomes x. The true P goes first.",
  "example": "A machine really makes a good part with probability 0.8 and a faulty one 0.2 (the truth P), and a model Q says good 0.4, faulty 0.6: what is D_KL(P ∥ Q), in bits?",
  "trace": [
   {
    "line": "D_KL(P ∥ Q) = Σ P(x) log₂ (P(x) / Q(x))",
    "note": "P(x): true chance, Q(x): model's chance"
   },
   {
    "line": "good:   0.8 × log₂ (0.8 / 0.4)",
    "note": ""
   },
   {
    "line": "      = 0.8 × log₂ 2 = 0.8",
    "note": "log₂ 2 = 1"
   },
   {
    "line": "faulty: 0.2 × log₂ (0.2 / 0.6)",
    "note": ""
   },
   {
    "line": "      = 0.2 × (−1.585) = −0.317",
    "note": "log₂ (1/3) = −1.585"
   },
   {
    "line": "D_KL(P ∥ Q) = 0.8 − 0.317 = 0.483 bits",
    "note": ""
   }
  ],
  "value": "0.8*log2(0.8/0.4) + 0.2*log2(0.2/0.6)",
  "result": "0.483",
  "tip": "One term can be negative but the total never is, and it is 0 only when Q = P. Swapping P and Q gives a different number: KL is not symmetric."
 },
 "mutualInformation": {
  "what": "Mutual information I(X; Y) is how much knowing X cuts the uncertainty about Y: I(X; Y) = H(Y) − H(Y | X), with H(Y | X) = H(X, Y) − H(X).",
  "example": "X says whether a student did the practice quiz and Y whether they passed the test, with quiz and pass 0.5, quiz and fail 0, no quiz and pass 0.1, no quiz and fail 0.4: what is I(X; Y), in bits?",
  "trace": [
   {
    "line": "I(X; Y) = H(Y) − H(Y | X)",
    "note": "how much knowing X cuts the doubt about Y"
   },
   {
    "line": "P(pass) = 0.5 + 0.1 = 0.6, P(fail) = 0.4",
    "note": "add each column"
   },
   {
    "line": "H(Y) = 0.6 × 0.7370 + 0.4 × 1.3219 = 0.9710",
    "note": "log₂ 0.6 = −0.7370, log₂ 0.4 = −1.3219"
   },
   {
    "line": "H(X, Y) = 0.5 × 1 + 0.1 × 3.3219",
    "note": "log₂ 0.1 = −3.3219; the 0 pair adds 0"
   },
   {
    "line": "        + 0.4 × 1.3219 = 1.3610",
    "note": ""
   },
   {
    "line": "P(quiz) = 0.5, so H(X) = 1",
    "note": "add each row"
   },
   {
    "line": "H(Y | X) = 1.3610 − 1 = 0.3610",
    "note": "chain rule: H(X, Y) − H(X)"
   },
   {
    "line": "I(X; Y) = 0.9710 − 0.3610 = 0.610 bits",
    "note": ""
   }
  ],
  "value": "entropy([0.6, 0.4]) - (entropy([0.5, 0.1, 0.4]) - entropy([0.5, 0.5]))",
  "result": "0.610",
  "tip": "I(X; Y) is never negative and never more than H(Y). A 0 cell adds nothing, as 0 × log₂ 0 counts as 0."
 },
 "giniIndex": {
  "what": "Gini impurity I_G says how mixed a node's classes are. Turn each class count into a fraction p, square each p, add the squares and take the total from 1.",
  "example": "A CART tree node (CART chooses splits by Gini impurity) holds 10 fruit: 6 apples, 2 pears and 2 plums, so what is its Gini impurity I_G?",
  "trace": [
   {
    "line": "p = 6/10, 2/10, 2/10 = 0.6, 0.2, 0.2",
    "note": "fraction of the node in each class"
   },
   {
    "line": "I_G = 1 − (0.6² + 0.2² + 0.2²)",
    "note": "square each fraction and add"
   },
   {
    "line": "    = 1 − (0.36 + 0.04 + 0.04)",
    "note": ""
   },
   {
    "line": "    = 1 − 0.44",
    "note": "then take the sum from 1"
   },
   {
    "line": "    = 0.56",
    "note": ""
   }
  ],
  "value": "1 - (pow(0.6, 2) + pow(0.2, 2) + pow(0.2, 2))",
  "result": "0.56",
  "tip": "Don't stop at the sum of squares: I_G is 1 minus it. A pure node gives 0, and the more mixed the node, the bigger I_G."
 },
 "nodeEntropy": {
  "what": "Entropy H(Y) says how uncertain the label Y is at a node, in bits. Turn the counts into fractions P, add P × log₂ P over the classes, then flip the sign.",
  "example": "A tree node holds 10 apples, 8 ripe and 2 unripe, so what is the entropy H(Y) of the label Y (ripe or unripe) at this node, in bits?",
  "trace": [
   {
    "line": "P(ripe) = 8/10 = 0.8, P(unripe) = 0.2",
    "note": "counts to fractions"
   },
   {
    "line": "H(Y) = −(0.8 × log₂ 0.8 + 0.2 × log₂ 0.2)",
    "note": "one term per class"
   },
   {
    "line": "     = −(0.8 × (−0.322) + 0.2 × (−2.322))",
    "note": "log₂ 0.8 = −0.322, log₂ 0.2 = −2.322"
   },
   {
    "line": "     = 0.258 + 0.464",
    "note": "the minus signs cancel"
   },
   {
    "line": "     = 0.722 bits",
    "note": ""
   }
  ],
  "value": "entropy([0.8, 0.2])",
  "result": "0.722",
  "tip": "log₂ of a fraction is negative, so the minus sign in front makes H positive. A 50/50 node gives 1 bit and a pure node 0."
 },
 "splitEntropy": {
  "what": "H(Y | A) is the entropy of the label Y left after splitting on feature A. Work out each branch's entropy, weight it by the branch's share of the examples, and add.",
  "example": "A tree predicts whether a dog passes its obedience test (Y): of 10 dogs, the 6 that went to puppy class (A = yes) all passed and the 4 that didn't (A = no) had 2 pass and 2 fail, so what is H(Y | A)?",
  "trace": [
   {
    "line": "H(Y | A) = Σ P(A = a) × H(Y | A = a)",
    "note": "weighted average of the branch entropies"
   },
   {
    "line": "A = yes (6 of 10): all pass, H = 0",
    "note": "a pure branch has no uncertainty"
   },
   {
    "line": "A = no (4 of 10): 2 pass, 2 fail, H = 1",
    "note": "half and half gives 1 bit"
   },
   {
    "line": "H(Y | A) = 6/10 × 0 + 4/10 × 1",
    "note": "weight = the branch's share of the dogs"
   },
   {
    "line": "         = 0.4 bits",
    "note": ""
   }
  ],
  "value": "6/10 * 0 + 4/10 * entropy([0.5, 0.5])",
  "result": "0.4",
  "tip": "Weight each branch by its share of the examples, not equally. A pure branch (all one label) adds 0."
 },
 "informationGain": {
  "what": "Information gain IG(Y, X) = H(Y) − H(Y | X): the label's entropy before the split minus the weighted entropy after splitting on feature X, in bits.",
  "example": "A tree predicts whether a cake rises (Y): of 8 cakes 4 rose, and feature F (fresh baking powder) is yes for 5 cakes (4 rose, 1 not) and no for 3 (none rose), so what is IG(Y, F) in bits?",
  "trace": [
   {
    "line": "H(Y) = 1 (4 rose, 4 not)",
    "note": "before the split: half and half is 1 bit"
   },
   {
    "line": "F = yes (5 of 8): 4 rose, 1 not",
    "note": ""
   },
   {
    "line": "  H = 0.8 × 0.322 + 0.2 × 2.322 = 0.722",
    "note": "−log₂ 0.8 = 0.322, −log₂ 0.2 = 2.322"
   },
   {
    "line": "F = no (3 of 8): none rose, H = 0",
    "note": "pure branch"
   },
   {
    "line": "H(Y | F) = 5/8 × 0.722 + 3/8 × 0 = 0.451",
    "note": "weighted entropy after the split"
   },
   {
    "line": "IG(Y, F) = H(Y) − H(Y | F)",
    "note": "before minus after"
   },
   {
    "line": "         = 1 − 0.451 = 0.549 bits",
    "note": ""
   }
  ],
  "value": "1 - (5/8 * entropy([0.8, 0.2]) + 3/8 * 0)",
  "result": "0.549",
  "tip": "H(Y) is 1 bit only when the labels are half and half. The bigger the gain, the better the feature separates the classes."
 },
 "bestSplit": {
  "what": "To choose the root, work out the information gain IG = H(Y) − H(Y | X) of every feature X, then split on the feature with the largest IG.",
  "example": "A tree predicts whether a seed sprouts (Y): of 8 seeds 4 sprouted; L (kept in light) is yes for 5 (4 sprouted, 1 not) and no for 3 (none sprouted); W (watered daily) is yes for 4 (3 sprouted, 1 not) and no for 4 (1 sprouted, 3 not), so which feature goes at the root?",
  "trace": [
   {
    "line": "H(Y) = 1 (4 sprouted, 4 not)",
    "note": "the same for every feature"
   },
   {
    "line": "L: yes (4, 1) H = 0.722; no (0, 3) H = 0",
    "note": "counts are (sprouted, not)"
   },
   {
    "line": "H(Y | L) = 5/8 × 0.722 = 0.451",
    "note": ""
   },
   {
    "line": "W: yes (3, 1), no (1, 3): H = 0.811 each",
    "note": "0.75 × 0.415 + 0.25 × 2 = 0.311 + 0.5"
   },
   {
    "line": "H(Y | W) = 0.811",
    "note": "both halves have the same entropy"
   },
   {
    "line": "IG: L 1 − 0.451 = 0.549, W 1 − 0.811 = 0.189",
    "note": "IG = H(Y) − H(Y | feature)"
   },
   {
    "line": "Largest IG: split on L",
    "note": ""
   }
  ],
  "value": null,
  "result": "L",
  "tip": "H(Y) is the same for every feature, so the feature that leaves the smallest H(Y | X) has the largest gain."
 },
 "mrmrScore": {
  "what": "Greedy feature selection scores a candidate X as relevance minus β × redundancy: I(Y; X) minus β times the sum of X's mutual information with each chosen feature.",
  "example": "You pick features to predict whether a film is a hit (Y) with β = 0.5 (the weight on redundancy); budget B and cast C are chosen, and candidate trailer views T has I(Y; T) = 0.5, I(B; T) = 0.1 and I(C; T) = 0.3 bits, so what is T's score?",
  "trace": [
   {
    "line": "relevance = I(Y; T) = 0.5",
    "note": "what T tells you about the label Y"
   },
   {
    "line": "redundancy = I(B; T) + I(C; T)",
    "note": "T's overlap with each chosen feature"
   },
   {
    "line": "           = 0.1 + 0.3 = 0.4",
    "note": ""
   },
   {
    "line": "score = relevance − β × redundancy",
    "note": ""
   },
   {
    "line": "      = 0.5 − 0.5 × 0.4",
    "note": "β = 0.5"
   },
   {
    "line": "      = 0.5 − 0.2 = 0.3 bits",
    "note": ""
   }
  ],
  "value": "0.5 - 0.5 * (0.1 + 0.3)",
  "result": "0.3",
  "tip": "Add up the redundancy over all chosen features, then multiply by β. Taking away the sum without β is the usual slip."
 },
 "observedError": {
  "what": "The observed error ê is the share of the n test points that classifier c gets wrong: count the points where its prediction c(x) differs from the true label y, then divide by n.",
  "example": "A classifier is tested on n = 5 new points, with (prediction c(x), true label y) = (1, 1), (0, 1), (0, 0), (1, 1), (1, 0), so what is its observed error ê?",
  "trace": [
   {
    "line": "I = 1 where c(x) ≠ y, else 0",
    "note": "the indicator I marks each mistake"
   },
   {
    "line": "I: 0, 1, 0, 0, 1",
    "note": "wrong at points 2 and 5"
   },
   {
    "line": "ê = (1/n) × Σ I[c(xᵢ) ≠ yᵢ]",
    "note": "Σ adds up over all n points"
   },
   {
    "line": "  = (1/5) × (0 + 1 + 0 + 0 + 1)",
    "note": ""
   },
   {
    "line": "  = 2/5 = 0.4",
    "note": ""
   }
  ],
  "value": "(0 + 1 + 0 + 0 + 1) / 5",
  "result": "0.4",
  "tip": "Count the wrong points, not the right ones: I[c(x) ≠ y] is 1 for a mistake and 0 for a hit. Error and accuracy add up to 1."
 },
 "binomialTail": {
  "what": "Bin(n, k, e) is the chance of at most k errors on n test points when the true error is e. Add C(n, i) × e^i × (1 − e)^(n − i) for i = 0, 1, up to k.",
  "example": "A classifier with true error e = 0.1 is tested on n = 3 independent points, so what is Bin(3, 1, 0.1), the chance of at most 1 error?",
  "trace": [
   {
    "line": "Bin(3, 1, 0.1) = P(0) + P(1)",
    "note": "at most 1 error: 0 or 1 errors"
   },
   {
    "line": "P(i) = C(n, i) × e^i × (1 − e)^(n − i)",
    "note": "C(n, i): ways to pick which i points are wrong"
   },
   {
    "line": "P(0) = C(3, 0) × 0.1⁰ × 0.9³",
    "note": ""
   },
   {
    "line": "     = 1 × 1 × 0.729 = 0.729",
    "note": "0.9³ = 0.729"
   },
   {
    "line": "P(1) = C(3, 1) × 0.1¹ × 0.9²",
    "note": ""
   },
   {
    "line": "     = 3 × 0.1 × 0.81 = 0.243",
    "note": "C(3, 1) = 3, 0.9² = 0.81"
   },
   {
    "line": "Bin(3, 1, 0.1) = 0.729 + 0.243 = 0.972",
    "note": ""
   }
  ],
  "value": "choose(3, 0) * pow(0.1, 0) * pow(0.9, 3) + choose(3, 1) * pow(0.1, 1) * pow(0.9, 2)",
  "result": "0.972",
  "tip": "'At most k' means adding every term from 0 errors up to k, not just exactly k. Each term needs its C(n, i)."
 },
 "testSetBound": {
  "what": "With confidence 1 − δ, the true error e is at most ê + √(ln(1/δ) / (2n)): ê is the observed test error, n the number of test points, δ the chance the bound fails.",
  "example": "A classifier gets 3 of the n = 50 points in an independent test set wrong, so how large could its true error e be, at 95% confidence?",
  "trace": [
   {
    "line": "ê = 3 / 50 = 0.06",
    "note": "observed error on the test set"
   },
   {
    "line": "δ = 1 − 0.95 = 0.05",
    "note": "δ: the chance the bound is wrong"
   },
   {
    "line": "ln(1/δ) = ln 20 = 2.996",
    "note": "natural log"
   },
   {
    "line": "e ≤ ê + √(ln(1/δ) / (2n))",
    "note": "n = 50, so 2n = 100"
   },
   {
    "line": "  = 0.06 + √(2.996 / 100)",
    "note": ""
   },
   {
    "line": "  = 0.06 + √0.02996",
    "note": ""
   },
   {
    "line": "  = 0.06 + 0.173",
    "note": ""
   },
   {
    "line": "  = 0.233",
    "note": ""
   }
  ],
  "value": "3/50 + sqrt(ln(1/0.05) / (2 * 50))",
  "result": "0.233",
  "tip": "δ is 1 minus the confidence (0.05 for 95%), and the log is ln. The bound only holds on test data the classifier never trained on."
 },
 "testSetSize": {
  "what": "To get the test set bound's margin √(ln(1/δ) / (2n)) down to at most ε, square and rearrange: you need n ≥ ln(1/δ) / (2ε²) test points, rounded up.",
  "example": "At 90% confidence (δ = 0.1), how many test points n make the margin √(ln(1/δ) / (2n)) at most ε = 0.2?",
  "trace": [
   {
    "line": "√(ln(1/δ) / (2n)) ≤ ε",
    "note": "the margin must be at most ε"
   },
   {
    "line": "ln(1/δ) / (2n) ≤ ε²",
    "note": "square both sides"
   },
   {
    "line": "n ≥ ln(1/δ) / (2ε²)",
    "note": "rearrange for n"
   },
   {
    "line": "δ = 0.1: ln(1/δ) = ln 10 = 2.3026",
    "note": ""
   },
   {
    "line": "ε = 0.2: 2ε² = 2 × 0.04 = 0.08",
    "note": "square ε first"
   },
   {
    "line": "n ≥ 2.3026 / 0.08 = 28.78",
    "note": ""
   },
   {
    "line": "Round up: n = 29",
    "note": "n must be a whole number"
   }
  ],
  "value": "ceil(ln(1/0.1) / (2 * pow(0.2, 2)))",
  "result": "29",
  "tip": "Always round up: one point fewer leaves the margin just above ε. Halving ε needs four times as many test points."
 },
 "unionBound": {
  "what": "Picking the best of M classifiers on one validation set of m points? Give each one δ/M (the union bound): e ≤ ê + √(ln(M/δ) / (2m)) for the one you pick.",
  "example": "You grow trees of depths 1 and 2 (M = 2), score both on a validation set of m = 250 points, get errors 0.12 and 0.08 and pick the better one, so what is the 95% bound on its true error e?",
  "trace": [
   {
    "line": "Pick depth 2: smallest ê = 0.08",
    "note": ""
   },
   {
    "line": "δ = 1 − 0.95 = 0.05",
    "note": "the chance the bound is wrong"
   },
   {
    "line": "δ/M = 0.05 / 2 = 0.025 per tree",
    "note": "union bound: split δ between the M trees"
   },
   {
    "line": "ln(M/δ) = ln 40 = 3.689",
    "note": "M/δ = 2 / 0.05 = 40"
   },
   {
    "line": "e ≤ ê + √(ln(M/δ) / (2m))",
    "note": "m = 250, so 2m = 500"
   },
   {
    "line": "  = 0.08 + √(3.689 / 500)",
    "note": ""
   },
   {
    "line": "  = 0.08 + 0.0859",
    "note": "√0.007378 = 0.0859"
   },
   {
    "line": "  = 0.166",
    "note": ""
   }
  ],
  "value": "0.08 + sqrt(ln(2 / 0.05) / (2 * 250))",
  "result": "0.166",
  "tip": "Use ln(M/δ), not ln(1/δ): with M tries on the same data, one could look good by luck. With M = 1 it is the plain test set bound."
 },
 "occamBound": {
  "what": "Occam's razor bound works on the training set: e ≤ ê + √((ln(1/P(c)) + ln(1/δ)) / (2n)), where P(c) is your prior bet on classifier c and n the training set size.",
  "example": "Your prior bet on classifier c was P(c) = 0.01, and it makes 10 mistakes on its n = 200 training examples, so what is the 95% Occam bound on its true error e?",
  "trace": [
   {
    "line": "ê = 10 / 200 = 0.05",
    "note": "training error: no test set needed"
   },
   {
    "line": "ln(1/P(c)) = ln(1/0.01) = ln 100 = 4.605",
    "note": "the price of your bet on c"
   },
   {
    "line": "δ = 0.05: ln(1/δ) = ln 20 = 2.996",
    "note": "δ = 1 − 0.95: the chance the bound fails"
   },
   {
    "line": "e ≤ ê + √((ln(1/P(c)) + ln(1/δ)) / (2n))",
    "note": ""
   },
   {
    "line": "  = 0.05 + √((4.605 + 2.996) / 400)",
    "note": "2n = 2 × 200 = 400"
   },
   {
    "line": "  = 0.05 + √0.01900",
    "note": "7.601 / 400 = 0.01900"
   },
   {
    "line": "  = 0.05 + 0.1378",
    "note": ""
   },
   {
    "line": "  = 0.188",
    "note": ""
   }
  ],
  "value": "10/200 + sqrt((ln(1/0.01) + ln(1/0.05)) / (2 * 200))",
  "result": "0.188",
  "tip": "It is the test set bound with δ replaced by δ × P(c). A small prior P(c) makes ln(1/P(c)) big and the bound loose."
 },
 "betaPosterior": {
  "what": "Posterior ∝ likelihood × prior (∝: proportional to). Multiplying adds the powers, so a Beta(a, b) prior with k successes in n tries gives Beta(a + k, b + n − k).",
  "example": "A coin has a Beta(2, 1) prior on θ, its chance of heads, and lands heads 3 times in 4 flips, so which Beta distribution is the posterior?",
  "trace": [
   {
    "line": "Prior Beta(2, 1) ∝ θ^1 (1 − θ)^0",
    "note": "the powers are a − 1 and b − 1"
   },
   {
    "line": "Likelihood: θ^3 (1 − θ)^1",
    "note": "θ for each of the 3 heads, 1 − θ for the tail"
   },
   {
    "line": "Multiply: θ^(1 + 3) (1 − θ)^(0 + 1)",
    "note": "multiplying adds the powers"
   },
   {
    "line": "  = θ^4 (1 − θ)^1",
    "note": ""
   },
   {
    "line": "  = θ^(5 − 1) (1 − θ)^(2 − 1)",
    "note": "match the Beta form: add 1 to each power"
   },
   {
    "line": "θ | D ∼ Beta(5, 2)",
    "note": "θ given the data D; ∼: has the distribution"
   },
   {
    "line": "Check: Beta(2 + 3, 1 + 4 − 3) = Beta(5, 2)",
    "note": "shortcut: Beta(a + k, b + n − k)"
   }
  ],
  "value": null,
  "result": "Beta(5, 2)",
  "tip": "Beta(A, B) has powers A − 1 and B − 1, so add 1 back at the end. Heads go to the first number, the n − k tails to the second."
 },
 "mapBeta": {
  "what": "θ̂_MAP is where the posterior peaks. With k successes in n tries and a Beta(a, b) prior: θ̂_MAP = (k + a − 1) / (n + a + b − 2).",
  "example": "A coin lands heads once in 5 flips and the prior on θ, its chance of heads, is Beta(6, 6), so what is θ̂_MAP?",
  "trace": [
   {
    "line": "k = 1 head, n = 5 flips, a = b = 6",
    "note": "a and b are the prior's two numbers"
   },
   {
    "line": "θ̂_MAP = (k + a − 1) / (n + a + b − 2)",
    "note": ""
   },
   {
    "line": "  = (1 + 6 − 1) / (5 + 6 + 6 − 2)",
    "note": ""
   },
   {
    "line": "  = 6 / 15",
    "note": ""
   },
   {
    "line": "  = 0.4",
    "note": "MLE 1/5 = 0.2: the prior pulls towards 0.5"
   }
  ],
  "value": "(1 + 6 - 1) / (5 + 6 + 6 - 2)",
  "result": "0.4",
  "tip": "Keep the − 1 and − 2: without them you get the posterior mean, not the peak. The prior pulls the MLE k/n towards the prior's own peak."
 },
 "mapFormula": {
  "what": "To find θ̂_MAP as a formula, multiply likelihood × prior (the powers add), take ln, set the slope to zero and solve for θ, just as for the MLE.",
  "example": "A coin lands heads k times in n flips, θ is its chance of heads, and the prior is Beta(2, 1), so p(θ) ∝ θ (∝: proportional to): what is θ̂_MAP as a formula in k and n?",
  "trace": [
   {
    "line": "θ^k (1 − θ)^(n − k) × θ",
    "note": "likelihood × prior"
   },
   {
    "line": "  = θ^(k + 1) (1 − θ)^(n − k)",
    "note": "multiplying adds the powers"
   },
   {
    "line": "ln: (k + 1) ln θ + (n − k) ln(1 − θ)",
    "note": "ln has the same peak and is easier"
   },
   {
    "line": "(k + 1)/θ − (n − k)/(1 − θ) = 0",
    "note": "slope set to zero"
   },
   {
    "line": "(k + 1)(1 − θ) = (n − k) θ",
    "note": "multiply both sides by θ(1 − θ)"
   },
   {
    "line": "k + 1 = (n − k + k + 1) θ = (n + 1) θ",
    "note": "move the −(k + 1)θ to the right"
   },
   {
    "line": "θ̂_MAP = (k + 1) / (n + 1)",
    "note": "the prior acts like 1 extra head"
   }
  ],
  "value": null,
  "result": "(k + 1) / (n + 1)",
  "tip": "The slope of ln(1 − θ) is −1/(1 − θ): don't lose that minus sign. A prior's powers act like extra heads and tails."
 },
 "posteriorMean": {
  "what": "The posterior mean E[θ | D] is the average θ under the posterior. Find the posterior Beta(A, B); its mean is A / (A + B) = (k + a) / (n + a + b).",
  "example": "A coin lands heads once in 4 flips and the prior on θ, its chance of heads, is Beta(3, 3), so what is the posterior mean E[θ | D]?",
  "trace": [
   {
    "line": "k = 1 head, n = 4 flips, a = b = 3",
    "note": "D is the data: the 4 flips"
   },
   {
    "line": "Posterior: Beta(a + k, b + n − k)",
    "note": ""
   },
   {
    "line": "  = Beta(3 + 1, 3 + 3) = Beta(4, 6)",
    "note": "the 3 tails go to the second number"
   },
   {
    "line": "E[θ | D] = (k + a) / (n + a + b)",
    "note": "mean of Beta(A, B) is A / (A + B)"
   },
   {
    "line": "  = (1 + 3) / (4 + 3 + 3) = 4 / 10",
    "note": "the same as 4 / (4 + 6)"
   },
   {
    "line": "  = 0.4",
    "note": "MLE 1/4 = 0.25, MAP 3/8 = 0.375"
   }
  ],
  "value": "(1 + 3) / (4 + 3 + 3)",
  "result": "0.4",
  "tip": "The mean adds a and b to the counts; MAP adds a − 1 and b − 1. Mixing them up is the classic slip."
 },
 "priorPenalty": {
  "what": "MAP adds a penalty −ln p(w) from the prior. A zero-centred Gaussian prior with variance τ² on each weight gives (w₁² + w₂² + ...) / (2τ²): an L2 penalty.",
  "example": "A model has weights w = (−2, 1), each with a zero-centred Gaussian prior of variance τ² = 1, so ignoring constants, what is the penalty −ln p(w)?",
  "trace": [
   {
    "line": "−ln p(w_j) = w_j² / (2τ²) + constant",
    "note": "p(w_j) ∝ exp(−w_j²/(2τ²)); −ln undoes the exp"
   },
   {
    "line": "−ln p(w) = (w₁² + w₂²) / (2τ²) + C",
    "note": "priors multiply, so their −ln values add"
   },
   {
    "line": "w₁² + w₂² = (−2)² + 1² = 4 + 1 = 5",
    "note": "squaring removes the minus sign"
   },
   {
    "line": "2τ² = 2 × 1 = 2",
    "note": ""
   },
   {
    "line": "Penalty = 5 / 2 = 2.5",
    "note": "a sum of squares: an L2 penalty"
   }
  ],
  "value": "(pow(-2, 2) + pow(1, 2)) / (2 * 1)",
  "result": "2.5",
  "tip": "Divide by 2τ², not τ². A smaller τ² (a narrower prior) makes the penalty stronger."
 },
 "biasOfEstimator": {
  "what": "Bias = E[θ̂] − θ*: how far the estimator θ̂ is from the true θ* on average. θ̂_MAP is a straight line in k, so put E[k] = nθ* in place of k.",
  "example": "A coin's true chance of heads is θ* = 0.3 and you flip it n = 10 times and get k heads, so what is the bias of θ̂_MAP = (k + a − 1)/(n + a + b − 2) with a Beta(6, 6) prior, a = b = 6?",
  "trace": [
   {
    "line": "E[k] = nθ* = 10 × 0.3 = 3",
    "note": "the average number of heads"
   },
   {
    "line": "MLE: E[k/n] = 3/10 = 0.3, bias 0",
    "note": "the MLE is right on average"
   },
   {
    "line": "E[θ̂_MAP] = (3 + 6 − 1)/(10 + 6 + 6 − 2)",
    "note": "put E[k] = 3 in place of k"
   },
   {
    "line": "  = 8 / 20 = 0.4",
    "note": ""
   },
   {
    "line": "Bias = 0.4 − 0.3 = 0.1",
    "note": "too high: the prior pulls towards 0.5"
   }
  ],
  "value": "(10 * 0.3 + 6 - 1) / (10 + 6 + 6 - 2) - 0.3",
  "result": "0.1",
  "tip": "Bias is E[θ̂] − θ*, in that order, so a negative bias means too low on average. The pull fades as n grows."
 },
 "mseDecomposition": {
  "what": "Mean squared error MSE = Bias² + Var: square how far off the estimator is on average, then add its variance (how much it jumps between datasets).",
  "example": "An estimator θ̂ averages E[θ̂] = 0.5 over many datasets, the true value is θ* = 0.3 and Var(θ̂) = 0.02, so what is its MSE?",
  "trace": [
   {
    "line": "Bias = E[θ̂] − θ* = 0.5 − 0.3 = 0.2",
    "note": "how far off it is on average"
   },
   {
    "line": "Bias² = 0.2² = 0.04",
    "note": "square the bias, not the variance"
   },
   {
    "line": "MSE = Bias² + Var = 0.04 + 0.02",
    "note": ""
   },
   {
    "line": "  = 0.06",
    "note": ""
   }
  ],
  "value": "pow(0.5 - 0.3, 2) + 0.02",
  "result": "0.06",
  "tip": "Square only the bias: the variance is already squared. Forgetting to square 0.2 gives 0.22, far too big."
 },
 "bnParameters": {
  "what": "A parameter is one stored probability. The full joint over n binary variables needs 2ⁿ − 1; a network needs 2^(number of parents) per node. Saved = the difference.",
  "example": "Four binary variables: Alarm rang A, Bus on time B, Arrived on time T and Good mood M, with arrows A → T, B → T and T → M, so how many parameters does the network save?",
  "trace": [
   {
    "line": "Full joint: 2⁴ − 1 = 16 − 1 = 15",
    "note": "16 rows, minus 1 because they add up to 1"
   },
   {
    "line": "A: 2⁰ = 1, B: 2⁰ = 1",
    "note": "no parents: just P(A = 1) and P(B = 1)"
   },
   {
    "line": "T (parents A, B): 2² = 4",
    "note": "one number per combination of parent values"
   },
   {
    "line": "M (parent T): 2¹ = 2",
    "note": ""
   },
   {
    "line": "Network: 1 + 1 + 4 + 2 = 8",
    "note": ""
   },
   {
    "line": "Saved: 15 − 8 = 7",
    "note": "full joint − network"
   }
  ],
  "value": "(pow(2, 4) - 1) - (1 + 1 + pow(2, 2) + pow(2, 1))",
  "result": "7",
  "tip": "A node costs 2 to the power of its number of parents, not its children. Don't forget the − 1 for the full joint."
 },
 "bnJoint": {
  "what": "A Bayesian network's joint probability is a product with one factor per node: its CPT entry P(node | its parents), read at the values asked for.",
  "example": "In the network Holiday H → Shop busy B → Long queue Q, P(H = 1) = 0.25, P(B = 1 | H = 0) = 0.4, P(B = 1 | H = 1) = 0.8 and P(Q = 1 | B = 1) = 0.6, so what is P(H = 0, B = 1, Q = 1)?",
  "trace": [
   {
    "line": "P(H, B, Q) = P(H) P(B | H) P(Q | B)",
    "note": "each node given its parents"
   },
   {
    "line": "P(H = 0) = 1 − 0.25 = 0.75",
    "note": "a 0 value: 1 minus P(H = 1)"
   },
   {
    "line": "P(B = 1 | H = 0) = 0.4",
    "note": "use the row for H = 0"
   },
   {
    "line": "P(Q = 1 | B = 1) = 0.6",
    "note": ""
   },
   {
    "line": "Joint = 0.75 × 0.4 × 0.6",
    "note": ""
   },
   {
    "line": "      = 0.3 × 0.6 = 0.18",
    "note": ""
   }
  ],
  "value": "(1 - 0.25) * 0.4 * 0.6",
  "result": "0.18",
  "tip": "For a value 0, use 1 minus the table's P(X = 1 | ...). Read each node's row at its own parents' values."
 },
 "dSeparation": {
  "what": "On a path A → C ← B, C is a collider (common effect). It blocks the path unless C or a descendant of C is observed. Blocked means A and B are independent.",
  "example": "In the network Burst pipe P → Wet floor F ← Spilt drink D, nothing is observed, so are P and D independent?",
  "trace": [
   {
    "line": "Path: P → F ← D",
    "note": "the only path between P and D"
   },
   {
    "line": "Both arrows point into F: a collider",
    "note": "F is a common effect of P and D"
   },
   {
    "line": "Blocked unless F or a descendant is seen",
    "note": "seen = observed"
   },
   {
    "line": "Nothing observed: the path is blocked",
    "note": "observing F would open it"
   },
   {
    "line": "P and D independent: yes",
    "note": "a burst pipe tells you nothing about a drink"
   }
  ],
  "value": null,
  "result": "yes",
  "tip": "Observe F and the path opens: the causes become dependent (explaining away). A chain or fork is the other way round: observing the middle blocks it."
 },
 "markovBlanket": {
  "what": "A node's Markov blanket is its parents, its children and its children's other parents (co-parents). Given its blanket, a node is independent of every other node.",
  "example": "A network has the arrows A → B, B → C, D → C and C → E, so how many nodes are in the Markov blanket of B?",
  "trace": [
   {
    "line": "Blanket: parents, children, co-parents",
    "note": "co-parents: the children's other parents"
   },
   {
    "line": "Parents of B: A",
    "note": ""
   },
   {
    "line": "Children of B: C",
    "note": ""
   },
   {
    "line": "Other parents of C: D",
    "note": "C's parents are B and D"
   },
   {
    "line": "E is a grandchild of B: left out",
    "note": "E is C's child, not B's"
   },
   {
    "line": "Blanket = {A, C, D}, size = 3",
    "note": ""
   }
  ],
  "value": "1 + 1 + 1",
  "result": "3",
  "tip": "Grandchildren and grandparents are not in it. The only extra nodes are the children's other parents."
 },
 "bnMarginal": {
  "what": "To marginalise (sum out) a variable, add the joint probabilities over every value it can take, keeping the other variables at the values asked for.",
  "example": "The joint of the day D (weekday or weekend) and a café being busy C (1 = busy) is P(weekday, C = 1) = 0.2, P(weekend, C = 1) = 0.25, P(weekday, C = 0) = 0.5, P(weekend, C = 0) = 0.05, so what is P(C = 1)?",
  "trace": [
   {
    "line": "P(C = 1) = Σ_d P(D = d, C = 1)",
    "note": "Σ_d: add over every value d of D"
   },
   {
    "line": "  = P(weekday, 1) + P(weekend, 1)",
    "note": "keep C = 1, let D take each value"
   },
   {
    "line": "  = 0.2 + 0.25",
    "note": ""
   },
   {
    "line": "  = 0.45",
    "note": "check: P(C = 0) = 0.5 + 0.05 = 0.55, total 1"
   }
  ],
  "value": "0.2 + 0.25",
  "result": "0.45",
  "tip": "Add over the variable you remove, keeping the other fixed. The answer is a row or column total of the joint table."
 },
 "bnInference": {
  "what": "Enumeration: P(query | evidence) = P(query, evidence) ÷ P(evidence). Add the joint over every value of the hidden variables. If the evidence has no parents, P(evidence) cancels.",
  "example": "In the network Exam week E → Library busy L → No free seat S, P(E = 1) = 0.15, P(L = 1 | E = 1) = 0.75, P(S = 1 | L = 1) = 0.4 and P(S = 1 | L = 0) = 0.2, so what is P(S = 1 | E = 1)?",
  "trace": [
   {
    "line": "P(S = 1 | E = 1)",
    "note": "L is hidden: neither asked for nor given"
   },
   {
    "line": "  = P(S = 1, E = 1) / P(E = 1)",
    "note": "joint ÷ evidence"
   },
   {
    "line": "  = Σ_l P(l | E = 1) × P(S = 1 | l)",
    "note": "Σ_l: add over l = 0, 1; P(E = 1) cancels"
   },
   {
    "line": "P(L = 0 | E = 1) = 1 − 0.75 = 0.25",
    "note": "P(l | E = 1) is short for P(L = l | E = 1)"
   },
   {
    "line": "l = 0: 0.25 × 0.2 = 0.05",
    "note": "P(L = 0 | E = 1) × P(S = 1 | L = 0)"
   },
   {
    "line": "l = 1: 0.75 × 0.4 = 0.3",
    "note": "P(L = 1 | E = 1) × P(S = 1 | L = 1)"
   },
   {
    "line": "P(S = 1 | E = 1) = 0.05 + 0.3 = 0.35",
    "note": ""
   }
  ],
  "value": "0.25 * 0.2 + 0.75 * 0.4",
  "result": "0.35",
  "tip": "One term per value of the hidden variables: with two hidden variables that is 4 terms, one per pair. You never need P(E = 1) when it cancels."
 },
 "cptFromCounts": {
  "what": "Maximum likelihood by counting: P̂(X = x | parents) = number of cases with X = x and those parent values ÷ number of cases with those parent values.",
  "example": "Over 50 evenings, homework set H and studied late S (1 = yes) were counted: H = 1, S = 1 on 14; H = 1, S = 0 on 6; H = 0, S = 1 on 3; H = 0, S = 0 on 27, so in H → S what is P̂(S = 1 | H = 1)?",
  "trace": [
   {
    "line": "# means 'number of evenings with'",
    "note": ""
   },
   {
    "line": "#(H = 1) = 14 + 6 = 20",
    "note": "only the evenings that match the parent"
   },
   {
    "line": "#(S = 1, H = 1) = 14",
    "note": ""
   },
   {
    "line": "P̂(S = 1 | H = 1) = 14 / 20",
    "note": "not 14 / 50"
   },
   {
    "line": "  = 0.7",
    "note": ""
   }
  ],
  "value": "14 / (14 + 6)",
  "result": "0.7",
  "tip": "Divide by the cases that match the parent's value, not by every case. The hat on P̂ means an estimate from data."
 }
};
const TWIN_LESSONS = {
 "eventSpace": {
  "what": "First count the outcomes n = |Ω| by multiplying the choices. Then each outcome is in or out of an event, so the event space has |F| = 2ⁿ events.",
  "example": "You pick tea or coffee (T or C) and small or large (S or L), such as TS. How many events are in F?",
  "trace": [
   {
    "line": "Ω = {TS, TL, CS, CL}",
    "note": "2 drinks × 2 sizes"
   },
   {
    "line": "n = |Ω| = 2 × 2 = 4 outcomes",
    "note": "first count: the outcomes"
   },
   {
    "line": "|F| = 2ⁿ = 2⁴",
    "note": "second count: the events"
   },
   {
    "line": "2⁴ = 2 × 2 × 2 × 2",
    "note": "each outcome in or out"
   },
   {
    "line": "|F| = 16 events",
    "note": ""
   }
  ],
  "value": "pow(2, 2*2)",
  "result": "16",
  "tip": "Two different counts: multiply the choices to get n, then work out 2ⁿ. Stopping at n, or doubling it, are the usual slips."
 },
 "additionRule": {
  "what": "P(A ∪ B), the chance of A or B or both, is P(A) + P(B) − P(A ∩ B). Add the two chances, then take away the overlap you counted twice.",
  "example": "A number is picked at random from 1 to 10. A = 'even', B = 'a multiple of 5'. What is P(A ∪ B)?",
  "trace": [
   {
    "line": "A = {2, 4, 6, 8, 10}: P(A) = 5/10",
    "note": "A: even"
   },
   {
    "line": "B = {5, 10}: P(B) = 2/10",
    "note": "B: multiple of 5"
   },
   {
    "line": "A ∩ B = {10}: P(A ∩ B) = 1/10",
    "note": "in both lists"
   },
   {
    "line": "P(A ∪ B) = 5/10 + 2/10 − 1/10",
    "note": "take the double count off once"
   },
   {
    "line": "         = 6/10 = 3/5",
    "note": "check: {2, 4, 5, 6, 8, 10} is 6 numbers"
   }
  ],
  "value": "5/10 + 2/10 - 1/10",
  "result": "3/5",
  "tip": "A number in both lists gets counted twice when you add, so subtract P(A ∩ B). Listing A ∪ B and counting is a quick check."
 },
 "conditional": {
  "what": "P(A | B), the chance of A given B, is P(A ∩ B) / P(B). Keep only the outcomes in B, and find what share of them are also in A.",
  "example": "A 2-digit code picks each digit from 1 to 3 (9 codes). A = 'the digits are different', B = 'the sum is even'. What is P(A | B)?",
  "trace": [
   {
    "line": "B = {(1,1), (1,3), (2,2), (3,1), (3,3)}",
    "note": "B: digits add up to an even number"
   },
   {
    "line": "A ∩ B = {(1,3), (3,1)}",
    "note": "A: the two digits are different"
   },
   {
    "line": "P(B) = 5/9,  P(A ∩ B) = 2/9",
    "note": "9 equally likely codes"
   },
   {
    "line": "P(A | B) = P(A ∩ B) / P(B)",
    "note": "| means 'given'"
   },
   {
    "line": "         = (2/9) / (5/9)",
    "note": "the /9 cancels: just count inside B"
   },
   {
    "line": "         = 2/5",
    "note": ""
   }
  ],
  "value": "(2/9) / (5/9)",
  "result": "2/5",
  "tip": "Divide by the size of B, the event you know happened, not by all the outcomes. P(A | B) and P(B | A) are usually different."
 },
 "productRule": {
  "what": "Product rule (chain rule) for three events: P(A₁ ∩ A₂ ∩ A₃) = P(A₁) P(A₂ | A₁) P(A₃ | A₁, A₂). Each step is given all the steps before it.",
  "example": "6 students, 4 of them with a laptop. Pick 3 different students one after another. What is the chance all 3 have a laptop?",
  "trace": [
   {
    "line": "P(A₁) = 4/6",
    "note": "Aᵢ: pick i has a laptop"
   },
   {
    "line": "P(A₂ | A₁) = 3/5",
    "note": "5 left, 3 with a laptop"
   },
   {
    "line": "P(A₃ | A₁, A₂) = 2/4",
    "note": "4 left, 2 with a laptop; A₁, A₂ means both"
   },
   {
    "line": "P(A₁ ∩ A₂ ∩ A₃) = 4/6 × 3/5 × 2/4",
    "note": "multiply the steps"
   },
   {
    "line": "4 × 3 × 2 = 24,  6 × 5 × 4 = 120",
    "note": ""
   },
   {
    "line": "P(A₁ ∩ A₂ ∩ A₃) = 24/120 = 1/5",
    "note": ""
   }
  ],
  "value": "(4/6) * (3/5) * (2/4)",
  "result": "1/5",
  "tip": "After each pick the top and the bottom both go down by 1. Using (4/6)³ forgets that the people already picked are gone."
 },
 "totalProbability": {
  "what": "Law of total probability: if the cases cover everything with no overlap (a partition), P(F) = sum of P(case) × P(F | case). Weight each case, then add.",
  "example": "Ali revises in the library on 30% of evenings, otherwise at home, and finishes the sheet (F) with chance 0.8 there and 0.5 at home. P(F)?",
  "trace": [
   {
    "line": "P(home) = 1 − 0.3 = 0.7",
    "note": "the two cases add up to 1"
   },
   {
    "line": "P(F) = P(lib) P(F | lib)",
    "note": "F: Ali finishes the sheet"
   },
   {
    "line": "     + P(home) P(F | home)",
    "note": "one term per case"
   },
   {
    "line": "     = 0.3 × 0.8 + 0.7 × 0.5",
    "note": ""
   },
   {
    "line": "     = 0.24 + 0.35",
    "note": ""
   },
   {
    "line": "     = 0.59",
    "note": ""
   }
  ],
  "value": "0.3*0.8 + 0.7*0.5",
  "result": "0.59",
  "tip": "Weight each rate by how often its case happens. Averaging 0.8 and 0.5 to get 0.65 would treat both cases as equally common."
 },
 "bayesRule": {
  "what": "Bayes' rule: P(S | F) = P(F | S)P(S) / P(F). The bottom, P(F), is every way F can happen: spam flagged plus normal messages flagged by mistake.",
  "example": "40% of your texts are spam (S). A filter flags (F) 60% of spam texts and 10% of normal ones. A text is flagged. What is P(S | F)?",
  "trace": [
   {
    "line": "P(Sᶜ) = 1 − 0.4 = 0.6",
    "note": "Sᶜ: not spam"
   },
   {
    "line": "P(F) = P(F | S)P(S) + P(F | Sᶜ)P(Sᶜ)",
    "note": "all flagged texts"
   },
   {
    "line": "     = 0.6 × 0.4 + 0.1 × 0.6",
    "note": ""
   },
   {
    "line": "     = 0.24 + 0.06 = 0.3",
    "note": ""
   },
   {
    "line": "P(S | F) = P(F | S)P(S) / P(F)",
    "note": "Bayes' rule"
   },
   {
    "line": "         = 0.24 / 0.3",
    "note": "spam and flagged ÷ all flagged"
   },
   {
    "line": "         = 0.8",
    "note": ""
   }
  ],
  "value": "(0.6*0.4) / (0.6*0.4 + 0.1*0.6)",
  "result": "0.8",
  "tip": "Of all flagged texts, what share is spam? Top: spam and flagged. Bottom: everything flagged. Don't stop at P(F | S)."
 },
 "independence": {
  "what": "Events A and B are independent if P(A ∩ B) = P(A) P(B): the chance of both equals the product. Then knowing one doesn't change the chance of the other.",
  "example": "A number is picked at random from 1 to 8. A = 'even', B = 'a multiple of 4'. Are A and B independent?",
  "trace": [
   {
    "line": "A = {2, 4, 6, 8}: P(A) = 4/8 = 1/2",
    "note": "A: even"
   },
   {
    "line": "B = {4, 8}: P(B) = 2/8 = 1/4",
    "note": "B: multiple of 4"
   },
   {
    "line": "A ∩ B = {4, 8}: P(A ∩ B) = 2/8 = 1/4",
    "note": "in both lists"
   },
   {
    "line": "P(A) P(B) = 1/2 × 1/4 = 1/8",
    "note": "what independence would need"
   },
   {
    "line": "1/4 ≠ 1/8, so independent: no",
    "note": "knowing B makes A certain"
   }
  ],
  "value": null,
  "result": "no",
  "tip": "List the sets, then compare P(A ∩ B) with P(A) × P(B). Equal means yes; any difference means no."
 },
 "jointTable": {
  "what": "From a table of counts: a joint P(x, y) is one cell ÷ total, a marginal is a whole row or column ÷ total, and a conditional is joint ÷ marginal.",
  "example": "50 people by home and pet: flat, 10 cats and 5 dogs; house, 15 cats and 20 dogs. A person has a dog. What is P(flat | dog)?",
  "trace": [
   {
    "line": "        cat  dog",
    "note": "N = 50 people"
   },
   {
    "line": "flat     10    5",
    "note": ""
   },
   {
    "line": "house    15   20",
    "note": ""
   },
   {
    "line": "P(flat, dog) = 5/50 = 0.1",
    "note": "joint: one cell ÷ N"
   },
   {
    "line": "P(dog) = (5 + 20)/50 = 0.5",
    "note": "marginal: the whole dog column ÷ N"
   },
   {
    "line": "P(flat | dog) = P(flat, dog) / P(dog)",
    "note": "conditional: joint ÷ marginal"
   },
   {
    "line": "              = 0.1 / 0.5 = 0.2",
    "note": ""
   }
  ],
  "value": "(5/50) / ((5 + 20)/50)",
  "result": "0.2",
  "tip": "'Given dog' means look down the dog column only: 5 of 25. P(dog | flat) = 5/15 reads along the flat row instead."
 },
 "pmfCount": {
  "what": "The PMF gives P(X = x), the chance that X takes the value x. With equally likely outcomes, count the outcomes that X turns into x and divide by the total.",
  "example": "Two fair three-sided dice (faces 1, 2 and 3) are rolled and X is the sum of the faces. Find P(X = 4).",
  "trace": [
   {
    "line": "Outcomes: 3 × 3 = 9, all equally likely",
    "note": "pairs (first die, second die)"
   },
   {
    "line": "The event X = 4 is {(1,3), (2,2), (3,1)}",
    "note": "every pair that adds up to 4"
   },
   {
    "line": "It has 3 outcomes, so",
    "note": ""
   },
   {
    "line": "P(X = 4) = 3/9 = 1/3",
    "note": "count ÷ total"
   }
  ],
  "value": "3 / 9",
  "result": "1/3",
  "tip": "(1,3) and (3,1) are different outcomes, so both count, but (2,2) counts only once."
 },
 "cdfValue": {
  "what": "The CDF F(x) = P(X ≤ x) is the chance that X is x or less. Add the PMF P(X = k) for every value k up to and including x.",
  "example": "X is the number of texts you get in 10 minutes: P(X = 0) = 0.6, P(X = 1) = 0.3 and P(X = 2) = 0.1. Find F(1), the chance of at most 1 text.",
  "trace": [
   {
    "line": "F(1) = P(X ≤ 1)",
    "note": "at most 1 text"
   },
   {
    "line": "  = P(X = 0) + P(X = 1)",
    "note": "no texts counts too"
   },
   {
    "line": "  = 0.6 + 0.3",
    "note": ""
   },
   {
    "line": "  = 0.9",
    "note": "check: 1 − P(X = 2) = 1 − 0.1 = 0.9"
   }
  ],
  "value": "0.6 + 0.3",
  "result": "0.9",
  "tip": "'At most 1' starts from 0: leaving out P(X = 0) is the usual slip."
 },
 "binomial": {
  "what": "Binomial(n, p) counts successes in n independent tries, each a success with chance p. P(X = k) = C(n, k) × p^k × (1 − p)^(n − k).",
  "example": "A goalkeeper saves each penalty with probability 0.6, independently, and faces 3 penalties, so the number saved is X ∼ Binomial(3, 0.6) (∼ means 'has the distribution'). Find P(X = 1).",
  "trace": [
   {
    "line": "P(X = k) = C(n, k) × p^k × (1 − p)^(n − k)",
    "note": "C(n, k) = n choose k"
   },
   {
    "line": "n = 3, k = 1, p = 0.6, 1 − p = 0.4",
    "note": "a save is a success"
   },
   {
    "line": "C(3, 1) = 3",
    "note": "which of the 3 penalties is the save"
   },
   {
    "line": "P(X = 1) = 3 × 0.6^1 × 0.4^2",
    "note": ""
   },
   {
    "line": "  = 3 × 0.6 × 0.16",
    "note": "0.4 × 0.4 = 0.16"
   },
   {
    "line": "  = 0.288",
    "note": ""
   }
  ],
  "value": "C(3, 1) * 0.6 * pow(0.4, 2)",
  "result": "0.288",
  "tip": "Decide what a success is first: p is its chance, and 1 − p goes with the n − k failures."
 },
 "geometric": {
  "what": "Geometric(p): X is the try on which the first success comes, each try a success with chance p. P(X = k) = (1 − p)^(k − 1) × p.",
  "example": "Each time you scan a crumpled ticket, the gate reads it with probability 0.9, independently. X is the scan on which it first works. Find P(X = 2).",
  "trace": [
   {
    "line": "P(X = k) = (1 − p)^(k − 1) × p",
    "note": "k − 1 fails, then a success"
   },
   {
    "line": "p = 0.9, 1 − p = 0.1",
    "note": "success: the gate reads it"
   },
   {
    "line": "P(X = 2) = 0.1^1 × 0.9",
    "note": "fail once, then work"
   },
   {
    "line": "  = 0.1 × 0.9",
    "note": ""
   },
   {
    "line": "  = 0.09",
    "note": ""
   }
  ],
  "value": "pow(0.1, 1) * 0.9",
  "result": "0.09",
  "tip": "The power is k − 1, the failures before the success, not k: the last try is the success, with chance p."
 },
 "uniformPdf": {
  "what": "Uniform(a, b) is spread evenly from a to b, so its PDF f(x) (the density curve) is flat at height 1/(b − a). The chance of an interval is the rectangle's area: width × height.",
  "example": "A lift arrives at a random time in the next 10 minutes, so your wait X (in minutes) is Uniform(0, 10). Find the chance you wait between 4 and 9 minutes.",
  "trace": [
   {
    "line": "f(x) = 1/(10 − 0) = 0.1",
    "note": "for 0 ≤ x ≤ 10: every time equally likely"
   },
   {
    "line": "P(4 ≤ X ≤ 9) = width × height",
    "note": "area under f from 4 to 9"
   },
   {
    "line": "  = (9 − 4) × 0.1",
    "note": ""
   },
   {
    "line": "  = 5 × 0.1",
    "note": ""
   },
   {
    "line": "  = 0.5",
    "note": ""
   }
  ],
  "value": "(9 - 4) * 1 / (10 - 0)",
  "result": "0.5",
  "tip": "A 5-minute stretch of a 10-minute window gets 5/10 of the chance: width over the whole width."
 },
 "expectation": {
  "what": "E[X], the expected value, is the long-run average of X. Multiply each value x by its chance P(X = x) and add them up: E[X] = Σ x × P(X = x).",
  "example": "A scratch card pays X pounds: £0 with probability 0.7, £1 with probability 0.2 and £10 with probability 0.1. Find E[X].",
  "trace": [
   {
    "line": "E[X] = Σ x × P(X = x)",
    "note": "Σ means add up over every value x"
   },
   {
    "line": "  = 0 × 0.7 + 1 × 0.2 + 10 × 0.1",
    "note": "each payout times its chance"
   },
   {
    "line": "  = 0 + 0.2 + 1.0",
    "note": ""
   },
   {
    "line": "  = 1.2, so £1.20",
    "note": ""
   }
  ],
  "value": "0 * 0.7 + 1 * 0.2 + 10 * 0.1",
  "result": "1.2",
  "tip": "E[X] is a long-run average, so it need not be a value X can take: no card pays exactly £1.20."
 },
 "variance": {
  "what": "Var(X) measures how spread out X is around its mean: Var(X) = E[X²] − (E[X])², the average of the squares minus the square of the average.",
  "example": "X is the number of parcels delivered to your flat in a day: 0 with probability 0.9 and 2 with probability 0.1. Find Var(X).",
  "trace": [
   {
    "line": "E[X]  = 0×0.9 + 2×0.1 = 0.2",
    "note": "the mean"
   },
   {
    "line": "E[X²] = 0²×0.9 + 2²×0.1",
    "note": "square each value, then weight it"
   },
   {
    "line": "      = 0 + 0.4 = 0.4",
    "note": ""
   },
   {
    "line": "Var(X) = E[X²] − (E[X])²",
    "note": ""
   },
   {
    "line": "       = 0.4 − 0.2² = 0.4 − 0.04",
    "note": "0.2² = 0.2 × 0.2 = 0.04"
   },
   {
    "line": "       = 0.36",
    "note": ""
   }
  ],
  "value": "(0 * 0 * 0.9 + 2 * 2 * 0.1) - pow(0 * 0.9 + 2 * 0.1, 2)",
  "result": "0.36",
  "tip": "Square the values for E[X²], but square E[X] only at the end. Mixing the two up is the classic slip."
 },
 "conditionalPmf": {
  "what": "P(X = x | Y = y) is the chance of X = x given Y = y. Keep only the Y = y column (or row) of the joint table and divide the entry by its total, P(Y = y).",
  "example": "S = 1 if it is sunny and 0 if not; B = 1 if you cycle and 0 if not. Their joint PMF (the comma means 'and') is P(S = 0, B = 0) = 0.35, P(S = 0, B = 1) = 0.15, P(S = 1, B = 0) = 0.1 and P(S = 1, B = 1) = 0.4. Find P(B = 1 | S = 1), the chance you cycle given that it is sunny.",
  "trace": [
   {
    "line": "        B = 0   B = 1",
    "note": "the joint PMF as a table"
   },
   {
    "line": "S = 0   0.35    0.15",
    "note": ""
   },
   {
    "line": "S = 1   0.10    0.40",
    "note": ""
   },
   {
    "line": "P(S = 1) = 0.10 + 0.40 = 0.5",
    "note": "add the S = 1 row"
   },
   {
    "line": "P(B = 1 | S = 1)",
    "note": "the entry ÷ its row total"
   },
   {
    "line": "  = P(S = 1, B = 1) / P(S = 1)",
    "note": ""
   },
   {
    "line": "  = 0.40 / 0.5 = 0.8",
    "note": ""
   }
  ],
  "value": "0.40 / (0.10 + 0.40)",
  "result": "0.8",
  "tip": "What comes after | picks the row you keep. Divide by that row's total, not by P(B = 1) overall."
 },
 "logLikelihood": {
  "what": "The log-likelihood ℓ(θ) = ln L(θ | x) scores how well θ explains the data: ln θ for each yes, ln(1 − θ) for each no, so ℓ = k ln θ + (n − k) ln(1 − θ).",
  "example": "A sign-up button is shown to 4 visitors and 1 of them signs up; work out ℓ(θ) at θ = 0.25, where θ is the chance a visitor signs up.",
  "trace": [
   {
    "line": "k = 1 sign-up, n − k = 3 not, n = 4",
    "note": "k counts sign-ups, n counts visitors"
   },
   {
    "line": "ℓ(θ) = k ln θ + (n − k) ln(1 − θ)",
    "note": "one ln per visitor"
   },
   {
    "line": "ℓ(0.25) = 1 ln 0.25 + 3 ln 0.75",
    "note": "1 − 0.25 = 0.75"
   },
   {
    "line": "  = −1.3863 + 3 × (−0.2877)",
    "note": "ln 0.25 = −1.3863, ln 0.75 = −0.2877"
   },
   {
    "line": "  = −1.386 − 0.863",
    "note": ""
   },
   {
    "line": "  = −2.249",
    "note": ""
   }
  ],
  "value": "ln(0.25) + 3 * ln(0.75)",
  "result": "−2.249",
  "tip": "Every visitor adds a negative term, so more data gives a more negative ℓ. Only compare ℓ values worked out from the same data."
 },
 "mleBernoulli": {
  "what": "The maximum likelihood estimate p̂ is the chance p that makes what you saw most likely. For success or failure trials it is k / n: successes over all tries.",
  "example": "A footballer takes 5 penalties, each scored with the same chance p, and gets S, S, M, S, S (S = scored, M = missed); what is p̂?",
  "trace": [
   {
    "line": "k = 4 scored, n − k = 1 missed, n = 5",
    "note": "k counts goals, n counts penalties"
   },
   {
    "line": "ℓ(p) = 4 ln p + 1 ln(1 − p)",
    "note": "ln p per goal, ln(1 − p) per miss"
   },
   {
    "line": "dℓ/dp = 4/p − 1/(1 − p) = 0",
    "note": "set the slope to 0"
   },
   {
    "line": "4(1 − p) = p, so 4 = 5p",
    "note": ""
   },
   {
    "line": "p̂ = k / n = 4/5 = 0.8",
    "note": ""
   }
  ],
  "value": "4 / 5",
  "result": "0.8",
  "tip": "Divide successes by all tries n. Dividing by the misses gives 4/1 = 4, which can't be a chance."
 },
 "mleCoinFormula": {
  "what": "To find a maximum likelihood estimate, write the log-likelihood ℓ(q), set its slope dℓ/dq to 0 and solve for q. Here q is the chance that one email is spam.",
  "example": "Out of 5 emails, 1 is spam; find q̂, the MLE of the spam chance q, by setting the slope of ℓ(q) to zero.",
  "trace": [
   {
    "line": "s = 1 spam, m = 5 emails",
    "note": "s counts spam, m counts all emails"
   },
   {
    "line": "L(q) = q¹ (1 − q)⁴",
    "note": "m − s = 4 not spam"
   },
   {
    "line": "ℓ(q) = 1 ln q + 4 ln(1 − q)",
    "note": "ℓ = ln L"
   },
   {
    "line": "dℓ/dq = 1/q − 4/(1 − q) = 0",
    "note": "set the slope to 0"
   },
   {
    "line": "1(1 − q) = 4q",
    "note": "times q(1 − q); this is s(1 − q) = (m − s)q"
   },
   {
    "line": "1 − q = 4q, so 1 = 5q",
    "note": ""
   },
   {
    "line": "q̂ = s / m = 1/5",
    "note": ""
   }
  ],
  "value": "1 / 5",
  "result": "1/5",
  "tip": "q̂ is spam over all emails. Spam over non-spam (1/4 here) is a common slip: that is the odds, not the chance."
 },
 "mlePoisson": {
  "what": "For Poisson counts with rate λ, the maximum likelihood estimate λ̂ is the average count: add up all the counts and divide by how many there are, n.",
  "example": "A student counts spelling mistakes on 5 pages of notes: 0, 2, 1, 0, 4; modelling them as Poisson counts with rate λ, what is λ̂?",
  "trace": [
   {
    "line": "xᵢ = mistakes on page i, n = 5 pages",
    "note": "Σ means add up"
   },
   {
    "line": "dℓ/dλ = (Σ xᵢ)/λ − n = 0",
    "note": "slope of the log-likelihood set to 0"
   },
   {
    "line": "λ̂ = Σ xᵢ / n",
    "note": "the average count"
   },
   {
    "line": "Σ xᵢ = 0 + 2 + 1 + 0 + 4 = 7",
    "note": ""
   },
   {
    "line": "λ̂ = 7 / 5 = 1.4",
    "note": "mistakes per page"
   }
  ],
  "value": "(0 + 2 + 1 + 0 + 4) / 5",
  "result": "1.4",
  "tip": "Both pages with no mistakes still count: n = 5, not 3. Dividing by 3 would give 2.333."
 },
 "logisticPredict": {
  "what": "Logistic regression adds up a score z (the log-odds) from the inputs, then the sigmoid σ(z) = 1 / (1 + e^(−z)) turns z into a chance between 0 and 1.",
  "example": "A bootcamp scores a learner passing as z = −2 + 1X₁ − 0.5X₂, with X₁ = daily practice and X₂ = daily phone time, both in hours; find P(pass) for 2 hours of practice and 120 minutes of phone.",
  "trace": [
   {
    "line": "X₂ = 120 minutes = 2 hours",
    "note": "convert to the model's units first"
   },
   {
    "line": "z = −2 + 1 × 2 − 0.5 × 2",
    "note": ""
   },
   {
    "line": "  = −2 + 2 − 1 = −1",
    "note": "below 0, so the chance is below 0.5"
   },
   {
    "line": "P(pass) = 1 / (1 + e^(1))",
    "note": "e^(−z) with z = −1 is e^1"
   },
   {
    "line": "  = 1 / (1 + 2.7183) = 1 / 3.7183",
    "note": ""
   },
   {
    "line": "P(pass) = 0.269",
    "note": ""
   }
  ],
  "value": "sigmoid(-2 + 1 * 2 - 0.5 * (120 / 60))",
  "result": "0.269",
  "tip": "Change minutes to hours first: 120 minutes is X₂ = 2, not 120. A negative score z always gives a chance below one half."
 },
 "logOddsCoefficient": {
  "what": "Logistic regression says ln(odds) = the score, where odds = p / (1 − p). One more unit of an input adds its coefficient to ln(odds), so the odds are multiplied by e^(coefficient).",
  "example": "A model for whether a phone screen cracks when dropped has ln(odds) = 0.8 − 0.3X, with X = case thickness in mm; by what factor do the odds change for a case 1 mm thicker?",
  "trace": [
   {
    "line": "ln(odds) = 0.8 − 0.3X",
    "note": "p = chance the screen cracks"
   },
   {
    "line": "1 mm thicker: X goes up by 1",
    "note": ""
   },
   {
    "line": "ln(odds) changes by −0.3",
    "note": "the number in front of X, with its sign"
   },
   {
    "line": "odds multiply by e^(−0.3)",
    "note": ""
   },
   {
    "line": "e^(0.3) = 1.3499",
    "note": ""
   },
   {
    "line": "e^(−0.3) = 1 / 1.3499 = 0.741",
    "note": "the odds fall by about 26%"
   }
  ],
  "value": "exp(-0.3)",
  "result": "0.741",
  "tip": "A negative coefficient gives a factor below 1, so the odds shrink. Work out e^(−0.3) as 1 / e^(0.3)."
 },
 "sigmoidDerivative": {
  "what": "For p = σ(z), the slope dp/dz = σ′(z) = p(1 − p), which is σ(z) × (1 − σ(z)). For a negative z, e^(−z) is e to a positive power.",
  "example": "A model gives an input the score z = −1.5; work out dp/dz = σ′(−1.5), how fast its chance p = σ(z) changes.",
  "trace": [
   {
    "line": "p = σ(−1.5) = 1 / (1 + e^(1.5))",
    "note": "e^(−z) with z = −1.5 is e^(1.5)"
   },
   {
    "line": "  = 1 / (1 + 4.4817) = 0.1824",
    "note": ""
   },
   {
    "line": "dp/dz = p(1 − p)",
    "note": "the same as σ(z)(1 − σ(z))"
   },
   {
    "line": "  = 0.1824 × 0.8176",
    "note": "1 − 0.1824 = 0.8176"
   },
   {
    "line": "  = 0.1491",
    "note": ""
   }
  ],
  "value": "sigmoid(-1.5) * (1 - sigmoid(-1.5))",
  "result": "0.1491",
  "tip": "The slope is never negative, even when z is. It is symmetric: z = 1.5 gives the same 0.1491."
 },
 "logisticGradient": {
  "what": "For one example, the slope of its cost Jᵢ with respect to θ₁ is (p − y) × x₁: the model's error p − y times the input x₁ that goes with θ₁. Here p = σ(θᵀx).",
  "example": "A spam filter has θ = (θ₀, θ₁, θ₂) = (−2, 0.25, 1.5); a text has x₁ = 4 links and x₂ = 0 (no word 'win'), with x₀ = 1, and is not spam (y = 0). Find ∂Jᵢ/∂θ₁.",
  "trace": [
   {
    "line": "z = θᵀx = −2 × 1 + 0.25 × 4 + 1.5 × 0",
    "note": "multiply matching entries and add"
   },
   {
    "line": "  = −2 + 1 + 0 = −1",
    "note": ""
   },
   {
    "line": "p = σ(−1) = 1 / (1 + e^(1))",
    "note": ""
   },
   {
    "line": "  = 1 / 3.7183 = 0.2689",
    "note": "the model's chance of spam"
   },
   {
    "line": "∂Jᵢ/∂θ₁ = (p − y) x₁",
    "note": "y = 0: not spam"
   },
   {
    "line": "  = (0.2689 − 0) × 4",
    "note": ""
   },
   {
    "line": "  = 1.076",
    "note": ""
   }
  ],
  "value": "(sigmoid(-2 * 1 + 0.25 * 4 + 1.5 * 0) - 0) * 4",
  "result": "1.076",
  "tip": "With y = 0 the error is just p, so the slope is p × x₁. Here x₁ = 4 is positive, so gradient descent makes θ₁ smaller."
 },
 "naiveBayesPosterior": {
  "what": "Naive Bayes multiplies the feature chances within each class, then weighs each class by its prior. Divide one class's result by the total of both to get P(class | features).",
  "example": "A car battery may be failing B: with P(S | B) = 0.9 for a slow start S, P(L | B) = 0.3 for dim lights L, P(S | ¬B) = 0.1, P(L | ¬B) = 0.1 and prior P(B) = 0.1, what is P(B | S, L)?",
  "trace": [
   {
    "line": "P(S, L | B) = 0.9 × 0.3 = 0.27",
    "note": "naive: multiply the signs within B"
   },
   {
    "line": "P(S, L | ¬B) = 0.1 × 0.1 = 0.01",
    "note": "¬B means the battery is fine"
   },
   {
    "line": "P(¬B) = 1 − 0.1 = 0.9",
    "note": ""
   },
   {
    "line": "B:  0.27 × 0.1 = 0.027",
    "note": "each group's product × its prior"
   },
   {
    "line": "¬B: 0.01 × 0.9 = 0.009",
    "note": ""
   },
   {
    "line": "P(B | S, L) = 0.027 / (0.027 + 0.009)",
    "note": "Bayes' rule: divide by the total"
   },
   {
    "line": "            = 0.027 / 0.036 = 0.75",
    "note": ""
   }
  ],
  "value": "(0.9*0.3*0.1) / (0.9*0.3*0.1 + 0.1*0.1*0.9)",
  "result": "0.75",
  "tip": "The signs are 27 times as likely with B, but B starts at only 10%. Always weigh each group by its prior, with P(¬B) = 1 − P(B)."
 },
 "naiveBayesSpam": {
  "what": "Naive Bayes scores each class: its prior times the chance of each word given that class. Divide a class's score by the sum of all the scores to get P(class | x).",
  "example": "A school sorts emails into Absence and Other with P(Absence) = 0.1; email x says “off sick”, with P(off | Absence) = 0.6, P(sick | Absence) = 0.5, P(off | Other) = 0.2 and P(sick | Other) = 0.1: what is P(Absence | x)?",
  "trace": [
   {
    "line": "score(Absence) = 0.1 × 0.6 × 0.5",
    "note": "prior × each word's chance"
   },
   {
    "line": "               = 0.03",
    "note": ""
   },
   {
    "line": "score(Other) = 0.9 × 0.2 × 0.1",
    "note": "P(Other) = 1 − 0.1 = 0.9"
   },
   {
    "line": "             = 0.018",
    "note": ""
   },
   {
    "line": "P(Absence | x) = 0.03 / (0.03 + 0.018)",
    "note": "divide by the sum of the scores"
   },
   {
    "line": "               = 0.03 / 0.048 = 0.625",
    "note": "above 0.5, so x is classed as Absence"
   }
  ],
  "value": "(0.1*0.6*0.5) / (0.1*0.6*0.5 + 0.9*0.2*0.1)",
  "result": "0.625",
  "tip": "Don't drop the priors: the words favour Absence 15 to 1 (0.3 against 0.02), but the 1 to 9 prior cuts that to 5 to 3."
 },
 "laplaceSmoothing": {
  "what": "Laplace (add-one) smoothing stops a zero estimate: P̂(v | C) = (count + 1) / (total + K). count: class C examples with feature value v; total: class C examples; K: how many values the feature has.",
  "example": "An ice-cream van had 8 Busy days, 1 of them in winter, and the feature season has K = 4 values: with Laplace smoothing, what is P̂(winter | Busy)?",
  "trace": [
   {
    "line": "count = 1, total = 8, K = 4",
    "note": "K = 4 seasons"
   },
   {
    "line": "plain count: 1/8 = 0.125",
    "note": "the estimate before smoothing"
   },
   {
    "line": "P̂(v | C) = (count + 1) / (total + K)",
    "note": "as if each season had been seen once more"
   },
   {
    "line": "P̂(winter | Busy) = (1 + 1) / (8 + 4)",
    "note": ""
   },
   {
    "line": "                 = 2/12 = 1/6 ≈ 0.167",
    "note": "pulled a little towards 1/4, the even split"
   }
  ],
  "value": "(1 + 1) / (8 + 4)",
  "result": "1/6",
  "tip": "K is how many values the feature can take (here 4 seasons), not the number of classes or of examples."
 },
 "posteriorOdds": {
  "what": "Posterior odds P(D | S) / P(¬D | S) = likelihood ratio × prior odds, that is [P(S | D) / P(S | ¬D)] × [P(D) / P(¬D)]. P(S) cancels.",
  "example": "10% of parcels at a depot are damaged D (¬D means not damaged), and a sensor flags F 90% of damaged parcels and 30% of fine ones: what are the posterior odds P(D | F) / P(¬D | F)?",
  "trace": [
   {
    "line": "likelihood ratio = P(F | D) / P(F | ¬D)",
    "note": "how strongly F points to D"
   },
   {
    "line": "                 = 0.9 / 0.3 = 3",
    "note": ""
   },
   {
    "line": "prior odds = P(D) / P(¬D)",
    "note": "P(¬D) = 1 − 0.1 = 0.9"
   },
   {
    "line": "           = 0.1 / 0.9 = 1/9",
    "note": ""
   },
   {
    "line": "posterior odds",
    "note": "P(F) is the same for D and ¬D, so it cancels"
   },
   {
    "line": "  = likelihood ratio × prior odds",
    "note": ""
   },
   {
    "line": "  = 3 × 1/9 = 1/3",
    "note": "so P(D | F) = (1/3) / (1 + 1/3) = 1/4"
   }
  ],
  "value": "(0.9 / 0.3) * (0.1 / 0.9)",
  "result": "1/3",
  "tip": "Odds are not a probability: odds o give P = o / (1 + o). A flag 3 times as likely for D still leaves fine parcels ahead."
 },
 "nbTrainCounts": {
  "what": "Training Naive Bayes is counting. P̂(class) = examples in the class ÷ all examples, and P̂(word | class) = class examples with the word ÷ class examples.",
  "example": "Bad: “cold food”, “food was cold”, “rude staff”, “slow service”, “never again”, “too loud”; Good: “not cold at all”, “lovely meal”, “great staff”: what is P̂(cold | Bad)?",
  "trace": [
   {
    "line": "6 Bad + 3 Good = 9 reviews",
    "note": ""
   },
   {
    "line": "P̂(Bad) = 6 / 9 ≈ 0.667",
    "note": "the prior: share of all reviews"
   },
   {
    "line": "Bad with “cold”: “cold food”,",
    "note": "look only at the 6 Bad reviews"
   },
   {
    "line": "  “food was cold”: 2 of 6",
    "note": "“not cold at all” is Good, so skip it"
   },
   {
    "line": "P̂(cold | Bad) = 2 / 6 ≈ 0.333",
    "note": "divide by Bad reviews, not all 9"
   }
  ],
  "value": "2 / 6",
  "result": "0.333",
  "tip": "Naive Bayes only sees whether the word is there: “not cold at all” counts towards P̂(cold | Good), not Bad."
 },
 "selfInformation": {
  "what": "Self-information is I(x) = −log₂ P(x) bits. For independent outcomes the probabilities multiply, so the bits add: I(both) = I(first) + I(second).",
  "example": "You toss a fair coin and get tails (probability 1/2) and, separately, roll a fair six-sided die and get a 6 (probability 1/6): what is the total self-information I of both, in bits?",
  "trace": [
   {
    "line": "I(x) = −log₂ P(x)",
    "note": "P(x) is the outcome's probability"
   },
   {
    "line": "I(tails) = −log₂ (1/2) = 1 bit",
    "note": ""
   },
   {
    "line": "I(six) = −log₂ (1/6) = log₂ 6 = 2.585",
    "note": "log₂ 6 = 2.585"
   },
   {
    "line": "Independent, so the bits add:",
    "note": ""
   },
   {
    "line": "I(both) = 1 + 2.585 = 3.585 bits",
    "note": "check: −log₂ (1/2 × 1/6) = −log₂ (1/12) = 3.585"
   }
  ],
  "value": "-log2(1/2) - log2(1/6)",
  "result": "3.585",
  "tip": "Add the bits, don't multiply them. Check: −log₂ of the product of the probabilities gives the same total."
 },
 "entropyCoin": {
  "what": "Entropy H is the average surprise of an outcome, in bits: H = −Σ P(x) log₂ P(x), with one term for each outcome x (Σ means add them up).",
  "example": "A tennis player's first serve goes in with probability 0.9 and is a fault with probability 0.1: what is the entropy H of one serve, in bits?",
  "trace": [
   {
    "line": "H = −(0.9 × log₂ 0.9 + 0.1 × log₂ 0.1)",
    "note": "one term per outcome"
   },
   {
    "line": "  = −(0.9 × (−0.1520) + 0.1 × (−3.3219))",
    "note": "log₂ 0.9 = −0.1520, log₂ 0.1 = −3.3219"
   },
   {
    "line": "  = 0.1368 + 0.3322",
    "note": "the minus signs cancel"
   },
   {
    "line": "  = 0.469 bits",
    "note": ""
   }
  ],
  "value": "entropy([0.9, 0.1])",
  "result": "0.469",
  "tip": "The more lopsided the event, the closer H gets to 0; a 50/50 event gives the most, 1 bit. Keep 4 decimal places until the end."
 },
 "entropyDistribution": {
  "what": "Entropy H = Σ P(x) × log₂(1/P(x)): each outcome x adds its probability times its surprise. With n outcomes, H is at most log₂ n.",
  "example": "The next cinema ticket sold is adult with probability 0.4, student 0.3 and child 0.3: what is the entropy H of the next ticket, in bits?",
  "trace": [
   {
    "line": "log₂ 0.4 = −1.3219, log₂ 0.3 = −1.7370",
    "note": ""
   },
   {
    "line": "H = 0.4 × 1.3219 + 2 × (0.3 × 1.7370)",
    "note": "−Σ P(x) log₂ P(x): the minus signs cancel"
   },
   {
    "line": "  = 0.5288 + 1.0422",
    "note": "student and child both have P = 0.3"
   },
   {
    "line": "  = 1.571 bits",
    "note": ""
   }
  ],
  "value": "entropy([0.4, 0.3, 0.3])",
  "result": "1.571",
  "tip": "Round only at the end. Check your answer: with three outcomes H can't be more than log₂ 3 = 1.585 bits."
 },
 "jointEntropy": {
  "what": "Joint entropy H(X, Y) is the uncertainty in X and Y together: treat each (x, y) pair as one outcome and use the entropy formula on P(x, y).",
  "example": "A bakery records the time X (morning or evening) and the item sold Y (bread, cake or pie), with morning and bread 1/2, morning and cake 1/8, morning and pie 1/16, evening and bread 1/8, evening and cake 1/8, evening and pie 1/16: what is H(X, Y), in bits?",
  "trace": [
   {
    "line": "H(X, Y) = −Σ Σ P(x, y) log₂ P(x, y)",
    "note": "add over all six (x, y) pairs"
   },
   {
    "line": "One pair has P = 1/2: 1/2 × log₂ 2 = 0.5",
    "note": ""
   },
   {
    "line": "Three have P = 1/8: 1/8 × log₂ 8 = 0.375",
    "note": "log₂ 8 = 3"
   },
   {
    "line": "Two have P = 1/16: 1/16 × log₂ 16 = 0.25",
    "note": "log₂ 16 = 4"
   },
   {
    "line": "H(X, Y) = 0.5 + 3 × 0.375 + 2 × 0.25",
    "note": ""
   },
   {
    "line": "        = 0.5 + 1.125 + 0.5 = 2.125 bits",
    "note": ""
   }
  ],
  "value": "entropy([1/2, 1/8, 1/16, 1/8, 1/8, 1/16])",
  "result": "2.125",
  "tip": "Group the pairs with the same probability to save work. Six equally likely pairs would give the most, log₂ 6 = 2.585 bits."
 },
 "conditionalEntropy": {
  "what": "Conditional entropy H(Y | X) is the uncertainty left in Y once you know X. Chain rule: H(Y | X) = H(X, Y) − H(X).",
  "example": "X says whether Cara takes the bus (yes or no) and Y whether Dev does, with P(both) = 0.3, P(only Cara) = 0.2, P(only Dev) = 0.3 and P(neither) = 0.2: what is H(Y | X), the uncertainty left about Dev once you know about Cara, in bits?",
  "trace": [
   {
    "line": "H(Y | X) = H(X, Y) − H(X)",
    "note": "chain rule"
   },
   {
    "line": "log₂ 0.3 = −1.7370, log₂ 0.2 = −2.3219",
    "note": ""
   },
   {
    "line": "H(X, Y) = 2 × (0.3 × 1.7370)",
    "note": "two pairs have P = 0.3"
   },
   {
    "line": "        + 2 × (0.2 × 2.3219)",
    "note": "two pairs have P = 0.2"
   },
   {
    "line": "  = 1.0422 + 0.9288 = 1.9710 bits",
    "note": ""
   },
   {
    "line": "P(Cara yes) = 0.3 + 0.2 = 0.5, so H(X) = 1",
    "note": "add each row; a 50/50 split is 1 bit"
   },
   {
    "line": "H(Y | X) = 1.9710 − 1 = 0.971 bits",
    "note": ""
   }
  ],
  "value": "entropy([0.3, 0.2, 0.3, 0.2]) - entropy([0.5, 0.5])",
  "result": "0.971",
  "tip": "Subtract H(X), the entropy of the variable you are told, not H(Y). Get P(x) for H(X) by adding each row of the table."
 },
 "klDivergence": {
  "what": "KL divergence D_KL(P ∥ Q) measures how far a model Q is from the truth P: add P(x) × log₂(P(x) / Q(x)) over the outcomes x. The true P goes first.",
  "example": "A robot turns left, right or goes straight: its true distribution P is left 1/2, right 1/4, straight 1/4, and a model Q says left 1/4, right 1/4, straight 1/2, so what is D_KL(P ∥ Q), in bits?",
  "trace": [
   {
    "line": "D_KL(P ∥ Q) = Σ P(x) log₂ (P(x) / Q(x))",
    "note": "P(x): true chance, Q(x): model's chance"
   },
   {
    "line": "left:     1/2 × log₂ (1/2 ÷ 1/4)",
    "note": ""
   },
   {
    "line": "        = 1/2 × log₂ 2 = 0.5",
    "note": "log₂ 2 = 1"
   },
   {
    "line": "right:    1/4 × log₂ 1 = 0",
    "note": "the model has right exactly"
   },
   {
    "line": "straight: 1/4 × log₂ (1/4 ÷ 1/2)",
    "note": ""
   },
   {
    "line": "        = 1/4 × (−1) = −0.25",
    "note": "log₂ (1/2) = −1"
   },
   {
    "line": "D_KL(P ∥ Q) = 0.5 + 0 − 0.25 = 0.25 bits",
    "note": ""
   }
  ],
  "value": "1/2*log2((1/2)/(1/4)) + 1/4*log2((1/4)/(1/4)) + 1/4*log2((1/4)/(1/2))",
  "result": "0.25",
  "tip": "Weight each term by the true P(x), and put the true chance on top of the ratio. An outcome the model gets right adds 0."
 },
 "mutualInformation": {
  "what": "Mutual information I(X; Y) is how much knowing X cuts the uncertainty about Y: I(X; Y) = H(Y) − H(Y | X), with H(Y | X) = H(X, Y) − H(X).",
  "example": "X says whether a plant was watered and Y whether it flowered, with watered and flowered 3/8, watered and not 1/8, not watered and flowered 1/8, not watered and not 3/8: what is I(X; Y), in bits?",
  "trace": [
   {
    "line": "I(X; Y) = H(Y) − H(Y | X)",
    "note": "how much knowing X cuts the doubt about Y"
   },
   {
    "line": "P(flowered) = 3/8 + 1/8 = 1/2, so H(Y) = 1",
    "note": "add each column; a 50/50 split is 1 bit"
   },
   {
    "line": "H(X, Y) = 2 × (3/8 × 1.4150)",
    "note": "log₂ (3/8) = −1.4150; two pairs have P = 3/8"
   },
   {
    "line": "        + 2 × (1/8 × 3)",
    "note": "log₂ (1/8) = −3; two pairs have P = 1/8"
   },
   {
    "line": "        = 1.0613 + 0.75 = 1.8113 bits",
    "note": ""
   },
   {
    "line": "P(watered) = 1/2, so H(X) = 1",
    "note": "add each row"
   },
   {
    "line": "H(Y | X) = 1.8113 − 1 = 0.8113",
    "note": "chain rule: H(X, Y) − H(X)"
   },
   {
    "line": "I(X; Y) = 1 − 0.8113 = 0.189 bits",
    "note": ""
   }
  ],
  "value": "entropy([0.5, 0.5]) - (entropy([3/8, 1/8, 1/8, 3/8]) - entropy([0.5, 0.5]))",
  "result": "0.189",
  "tip": "Get H(Y) from the column totals and H(X) from the row totals. If X and Y are independent, I(X; Y) = 0."
 },
 "giniIndex": {
  "what": "Gini impurity I_G says how mixed a node's classes are. Turn each class count into a fraction p, square each p, add the squares and take the total from 1.",
  "example": "A CART tree for a gym has a node with 10 members, 7 renewed and 3 did not, so what is its Gini impurity I_G = 1 − (p₁² + p₂²)?",
  "trace": [
   {
    "line": "p₁ = 7/10 = 0.7, p₂ = 3/10 = 0.3",
    "note": "p₁: renewed, p₂: did not"
   },
   {
    "line": "I_G = 1 − (0.7² + 0.3²)",
    "note": "square each fraction and add"
   },
   {
    "line": "    = 1 − (0.49 + 0.09)",
    "note": ""
   },
   {
    "line": "    = 1 − 0.58",
    "note": "then take the sum from 1"
   },
   {
    "line": "    = 0.42",
    "note": ""
   }
  ],
  "value": "1 - (pow(0.7, 2) + pow(0.3, 2))",
  "result": "0.42",
  "tip": "With two classes I_G is at most 0.5, for a 50/50 node. The answer is 1 − (p₁² + p₂²), not the sum itself."
 },
 "nodeEntropy": {
  "what": "Entropy H(Y) says how uncertain the label Y is at a node, in bits. Turn the counts into fractions P, add P × log₂ P over the classes, then flip the sign.",
  "example": "A node in a tree that sorts parcels holds 8 of them, 4 small, 2 medium and 2 large, so what is the entropy H(Y) of the size label Y, in bits?",
  "trace": [
   {
    "line": "P = 4/8, 2/8, 2/8 = 0.5, 0.25, 0.25",
    "note": "small, medium, large"
   },
   {
    "line": "H(Y) = −Σ P(y) log₂ P(y)",
    "note": "one term per class"
   },
   {
    "line": "     = 0.5 × 1 + 0.25 × 2 + 0.25 × 2",
    "note": "log₂ 0.5 = −1, log₂ 0.25 = −2: signs cancel"
   },
   {
    "line": "     = 0.5 + 0.5 + 0.5",
    "note": ""
   },
   {
    "line": "     = 1.5 bits",
    "note": ""
   }
  ],
  "value": "entropy([0.5, 0.25, 0.25])",
  "result": "1.5",
  "tip": "With more than two classes H can pass 1 bit: k equal classes give log₂ k bits. log₂ of 1/2, 1/4 and 1/8 is −1, −2 and −3."
 },
 "splitEntropy": {
  "what": "H(Y | A) is the entropy of the label Y left after splitting on feature A. Work out each branch's entropy, weight it by the branch's share of the examples, and add.",
  "example": "A tree predicts whether a kite club flies (Y) on 10 days, split three ways on the wind W: calm 2 days (never flew), breezy 6 days (flew on 3) and gusty 2 days (flew on 1), so what is H(Y | W)?",
  "trace": [
   {
    "line": "calm (2 of 10): 0 fly, 2 not, H = 0",
    "note": "a pure branch"
   },
   {
    "line": "breezy (6 of 10): 3 fly, 3 not, H = 1",
    "note": "half and half gives 1 bit"
   },
   {
    "line": "gusty (2 of 10): 1 fly, 1 not, H = 1",
    "note": ""
   },
   {
    "line": "H(Y | W) = 2/10 × 0 + 6/10 × 1 + 2/10 × 1",
    "note": "weight = the branch's share of the days"
   },
   {
    "line": "         = 0 + 0.6 + 0.2",
    "note": ""
   },
   {
    "line": "         = 0.8 bits",
    "note": ""
   }
  ],
  "value": "2/10 * 0 + 6/10 * 1 + 2/10 * 1",
  "result": "0.8",
  "tip": "With three or more branches, weight each by its own share (here 2/10, 6/10 and 2/10), never 1/3 each."
 },
 "informationGain": {
  "what": "Information gain IG(Y, X) = H(Y) − H(Y | X): the label's entropy before the split minus the weighted entropy after splitting on feature X, in bits.",
  "example": "A tree predicts whether a library loan comes back late (Y): of 10 loans 2 were late, and feature R (renewed online) is yes for 4 loans (2 late, 2 not) and no for 6 (none late), so what is IG(Y, R) in bits?",
  "trace": [
   {
    "line": "P(late) = 0.2, P(on time) = 0.8",
    "note": "first H(Y) from the label counts"
   },
   {
    "line": "H(Y) = 0.2 × 2.322 + 0.8 × 0.322 = 0.722",
    "note": "−log₂ 0.2 = 2.322, −log₂ 0.8 = 0.322"
   },
   {
    "line": "R = yes (4 of 10): 2 late, 2 not, H = 1",
    "note": "half and half"
   },
   {
    "line": "R = no (6 of 10): none late, H = 0",
    "note": "pure branch"
   },
   {
    "line": "H(Y | R) = 4/10 × 1 + 6/10 × 0 = 0.4",
    "note": "weighted entropy after the split"
   },
   {
    "line": "IG(Y, R) = 0.722 − 0.4 = 0.322 bits",
    "note": "not 1 − 0.4: H(Y) is below 1 bit here"
   }
  ],
  "value": "entropy([0.2, 0.8]) - (4/10 * 1 + 6/10 * 0)",
  "result": "0.322",
  "tip": "Always work out H(Y) from the label counts first: it is only 1 bit when the labels are half and half."
 },
 "bestSplit": {
  "what": "To choose the root, work out the information gain IG = H(Y) − H(Y | X) of every feature X, then split on the feature with the largest IG.",
  "example": "A tree predicts whether a parcel arrives on time (Y): of 10 parcels 8 were on time; K (sent by courier) is yes for 6 (all on time) and no for 4 (2 on time, 2 late); N (sent before noon) is yes for 2 (both on time) and no for 8 (6 on time, 2 late), so which feature goes at the root?",
  "trace": [
   {
    "line": "H(Y) = 0.8 × 0.322 + 0.2 × 2.322",
    "note": "8 on time, 2 late; −log₂ 0.8 = 0.322, −log₂ 0.2 = 2.322"
   },
   {
    "line": "     = 0.258 + 0.464 = 0.722",
    "note": "not 1 bit: the labels are not half and half"
   },
   {
    "line": "K: yes (6, 0) H = 0; no (2, 2) H = 1",
    "note": "counts are (on time, late)"
   },
   {
    "line": "H(Y | K) = 4/10 × 1 = 0.4",
    "note": ""
   },
   {
    "line": "N: yes (2, 0) H = 0; no (6, 2) H = 0.811",
    "note": "0.75 × 0.415 + 0.25 × 2 = 0.311 + 0.5"
   },
   {
    "line": "H(Y | N) = 8/10 × 0.811 = 0.649",
    "note": "a pure branch, but only 2 of the 10 parcels"
   },
   {
    "line": "IG: K 0.322, N 0.073",
    "note": "IG = 0.722 − H(Y | feature)"
   },
   {
    "line": "Largest IG: split on K",
    "note": ""
   }
  ],
  "value": null,
  "result": "K",
  "tip": "A pure branch helps only as much as its share of the data, so weight every branch before you compare the features."
 },
 "mrmrScore": {
  "what": "Greedy feature selection scores a candidate X as relevance minus β × redundancy: I(Y; X) minus β times the sum of X's mutual information with each chosen feature.",
  "example": "To predict whether a plant flowers (Y) with β = 1 (the weight on redundancy), water W is already chosen; candidate sunlight S has I(Y; S) = 0.5 and I(W; S) = 0.3, and candidate temperature T has I(Y; T) = 0.4 and I(W; T) = 0.1 bits, so which is picked next?",
  "trace": [
   {
    "line": "score(X) = I(Y; X) − β × I(W; X)",
    "note": "relevance minus β × redundancy"
   },
   {
    "line": "score(S) = 0.5 − 1 × 0.3 = 0.2",
    "note": ""
   },
   {
    "line": "score(T) = 0.4 − 1 × 0.1 = 0.3",
    "note": ""
   },
   {
    "line": "0.3 > 0.2, so pick T",
    "note": "S alone tells more about Y, but repeats W"
   }
  ],
  "value": null,
  "result": "T",
  "tip": "The most relevant candidate doesn't always win: a feature that repeats what you already have loses points."
 },
 "observedError": {
  "what": "The observed error ê is the share of the n test points that classifier c gets wrong: count the points where its prediction c(x) differs from the true label y, then divide by n.",
  "example": "A model that sorts recycling gets 45 of n = 50 new items right, so what is its observed (test) error ê?",
  "trace": [
   {
    "line": "mistakes = n − number right",
    "note": "count the wrong ones, not the right ones"
   },
   {
    "line": "         = 50 − 45 = 5",
    "note": ""
   },
   {
    "line": "ê = mistakes / n",
    "note": "the share of test points it gets wrong"
   },
   {
    "line": "  = 5 / 50 = 0.1",
    "note": "accuracy 0.9, so error 0.1"
   }
  ],
  "value": "(50 - 45) / 50",
  "result": "0.1",
  "tip": "Turn the number right into mistakes first (n minus the number right). Error is 1 minus accuracy, never the accuracy itself."
 },
 "binomialTail": {
  "what": "Bin(n, k, e) is the chance of at most k errors on n test points when the true error is e. Add C(n, i) × e^i × (1 − e)^(n − i) for i = 0, 1, up to k.",
  "example": "A classifier that guesses at random (e = 0.5) is tested on n = 3 points, so what is Bin(3, 2, 0.5), the chance of at most 2 errors?",
  "trace": [
   {
    "line": "e^i × (1 − e)^(3 − i) = 0.5³ = 1/8",
    "note": "with e = 0.5 this is the same for every i"
   },
   {
    "line": "Bin(3, 2, 0.5) = P(0) + P(1) + P(2)",
    "note": "at most 2 errors: 0, 1 or 2"
   },
   {
    "line": "  = (C(3, 0) + C(3, 1) + C(3, 2)) × 1/8",
    "note": "C(n, i): ways to pick which i are wrong"
   },
   {
    "line": "  = (1 + 3 + 3) / 8",
    "note": ""
   },
   {
    "line": "  = 7/8 = 0.875",
    "note": ""
   }
  ],
  "value": "(choose(3, 0) + choose(3, 1) + choose(3, 2)) * pow(0.5, 3)",
  "result": "7/8",
  "tip": "When e = 0.5 every pattern of n results has chance 0.5ⁿ, so add up the C(n, i) and divide by 2ⁿ."
 },
 "testSetBound": {
  "what": "With confidence 1 − δ, the true error e is at most ê + √(ln(1/δ) / (2n)): ê is the observed test error, n the number of test points, δ the chance the bound fails.",
  "example": "A model that reads shop receipts gets 2 of n = 50 new receipts wrong, so what is the largest true error e it could have, if you want to be 90% sure?",
  "trace": [
   {
    "line": "ê = 2 / 50 = 0.04",
    "note": "observed error"
   },
   {
    "line": "δ = 1 − 0.90 = 0.1",
    "note": "90% sure leaves a 10% chance of failing"
   },
   {
    "line": "ln(1/δ) = ln 10 = 2.303",
    "note": ""
   },
   {
    "line": "e ≤ 0.04 + √(2.303 / (2 × 50))",
    "note": "e ≤ ê + √(ln(1/δ) / (2n))"
   },
   {
    "line": "  = 0.04 + √0.02303",
    "note": ""
   },
   {
    "line": "  = 0.04 + 0.152",
    "note": ""
   },
   {
    "line": "  = 0.192",
    "note": ""
   }
  ],
  "value": "2/50 + sqrt(ln(1/0.1) / (2 * 50))",
  "result": "0.192",
  "tip": "More confidence means a smaller δ, a bigger ln(1/δ) and a looser bound: 90% uses ln 10 = 2.303, 99% uses ln 100 = 4.605."
 },
 "testSetSize": {
  "what": "To get the test set bound's margin √(ln(1/δ) / (2n)) down to at most ε, square and rearrange: you need n ≥ ln(1/δ) / (2ε²) test points, rounded up.",
  "example": "A bank wants to be 90% sure (δ = 0.1) that its fraud model's true error is at most ε = 0.25 above the error it observes, so how many test cases n does it need?",
  "trace": [
   {
    "line": "n ≥ ln(1/δ) / (2ε²)",
    "note": "from √(ln(1/δ) / (2n)) ≤ ε, squared"
   },
   {
    "line": "δ = 0.1: ln(1/δ) = ln 10 = 2.3026",
    "note": ""
   },
   {
    "line": "ε = 0.25: 2ε² = 2 × 0.0625 = 0.125",
    "note": "square ε first"
   },
   {
    "line": "n ≥ 2.3026 / 0.125 = 18.42",
    "note": ""
   },
   {
    "line": "Round up: n = 19",
    "note": "18 would leave the margin above 0.25"
   }
  ],
  "value": "ceil(ln(1/0.1) / (2 * pow(0.25, 2)))",
  "result": "19",
  "tip": "Square ε before doubling it: for ε = 0.25, 2ε² = 0.125, not 0.5. Then round up, never down."
 },
 "unionBound": {
  "what": "Picking the best of M classifiers on one validation set of m points? Give each one δ/M (the union bound): e ≤ ê + √(ln(M/δ) / (2m)) for the one you pick.",
  "example": "You compare M = 4 models on one held-out set of m = 500 points and pick the best, which makes 25 mistakes, so what is the 90% bound on its true error e, using δ/M?",
  "trace": [
   {
    "line": "ê = 25 / 500 = 0.05",
    "note": "the best model's error"
   },
   {
    "line": "δ = 1 − 0.90 = 0.1",
    "note": "δ: the chance the bound is wrong"
   },
   {
    "line": "δ/M = 0.1 / 4 = 0.025 each",
    "note": "union bound over the M = 4 models"
   },
   {
    "line": "ln(M/δ) = ln(4 / 0.1) = ln 40 = 3.689",
    "note": ""
   },
   {
    "line": "e ≤ 0.05 + √(3.689 / (2 × 500))",
    "note": "e ≤ ê + √(ln(M/δ) / (2m))"
   },
   {
    "line": "  = 0.05 + √0.003689",
    "note": ""
   },
   {
    "line": "  = 0.05 + 0.0607",
    "note": ""
   },
   {
    "line": "  = 0.111",
    "note": ""
   }
  ],
  "value": "25/500 + sqrt(ln(4 / 0.1) / (2 * 500))",
  "result": "0.111",
  "tip": "Turn mistakes into ê = mistakes / m first. Then use ln(M/δ): you chose the best of M on the same data, so one could look good by luck."
 },
 "occamBound": {
  "what": "Occam's razor bound works on the training set: e ≤ ê + √((ln(1/P(c)) + ln(1/δ)) / (2n)), where P(c) is your prior bet on classifier c and n the training set size.",
  "example": "A learner picks one of 64 rules with an equal prior P(c) = 1/64, and its rule makes no mistakes on n = 250 training examples, so what is the 99% bound on its true error e?",
  "trace": [
   {
    "line": "ê = 0",
    "note": "no training mistakes"
   },
   {
    "line": "ln(1/P(c)) = ln 64 = 4.159",
    "note": "equal prior over 64 rules: P(c) = 1/64"
   },
   {
    "line": "δ = 0.01: ln(1/δ) = ln 100 = 4.605",
    "note": "99% sure: δ is the chance the bound fails"
   },
   {
    "line": "e ≤ 0 + √((4.159 + 4.605) / (2 × 250))",
    "note": "e ≤ ê + √((ln(1/P(c)) + ln(1/δ)) / (2n))"
   },
   {
    "line": "  = √(8.764 / 500)",
    "note": ""
   },
   {
    "line": "  = √0.01753",
    "note": ""
   },
   {
    "line": "  = 0.132",
    "note": ""
   }
  ],
  "value": "0 + sqrt((ln(64) + ln(1/0.01)) / (2 * 250))",
  "result": "0.132",
  "tip": "With an equal prior over M classifiers, ln(1/P(c)) is just ln M. Zero training error still leaves a margin above 0."
 },
 "betaPosterior": {
  "what": "Posterior ∝ likelihood × prior (∝: proportional to). Multiplying adds the powers, so a Beta(a, b) prior with k successes in n tries gives Beta(a + k, b + n − k).",
  "example": "An app sends 4 reminders and 1 is opened; with a Beta(1, 2) prior on θ, the chance a reminder is opened, which Beta is the posterior?",
  "trace": [
   {
    "line": "Prior Beta(1, 2) ∝ θ^0 (1 − θ)^1",
    "note": "θ^0 = 1, so the prior is just 1 − θ"
   },
   {
    "line": "Likelihood: θ^1 (1 − θ)^3",
    "note": "1 opened, 3 not opened"
   },
   {
    "line": "Multiply: θ^(0 + 1) (1 − θ)^(1 + 3)",
    "note": "multiplying adds the powers"
   },
   {
    "line": "  = θ^1 (1 − θ)^4",
    "note": ""
   },
   {
    "line": "  = θ^(2 − 1) (1 − θ)^(5 − 1)",
    "note": "add 1 to each power"
   },
   {
    "line": "θ | D ∼ Beta(2, 5)",
    "note": "θ given the data D; ∼: has the distribution"
   },
   {
    "line": "Check: Beta(1 + 1, 2 + 4 − 1) = Beta(2, 5)",
    "note": "shortcut: Beta(a + k, b + n − k)"
   }
  ],
  "value": null,
  "result": "Beta(2, 5)",
  "tip": "Successes add to the first number and failures to the second. Add only the n − k failures to b, not all n."
 },
 "mapBeta": {
  "what": "θ̂_MAP is where the posterior peaks. With k successes in n tries and a Beta(a, b) prior: θ̂_MAP = (k + a − 1) / (n + a + b − 2).",
  "example": "A striker scores 2 of 5 penalties and the coach's prior for θ, her chance of scoring, is Beta(5, 2), so what is θ̂_MAP?",
  "trace": [
   {
    "line": "k = 2 scored, n = 5 penalties",
    "note": ""
   },
   {
    "line": "prior Beta(a, b), a = 5, b = 2",
    "note": "its peak: (5 − 1)/(5 + 2 − 2) = 0.8"
   },
   {
    "line": "θ̂_MAP = (k + a − 1) / (n + a + b − 2)",
    "note": ""
   },
   {
    "line": "  = (2 + 5 − 1) / (5 + 5 + 2 − 2)",
    "note": ""
   },
   {
    "line": "  = 6 / 10 = 0.6",
    "note": "between the MLE 2/5 = 0.4 and the peak 0.8"
   }
  ],
  "value": "(2 + 5 - 1) / (5 + 5 + 2 - 2)",
  "result": "0.6",
  "tip": "A prior pulls towards its own peak (a − 1)/(a + b − 2), not always towards 0.5: here it pulls the estimate up."
 },
 "mapFormula": {
  "what": "Multiply likelihood × prior (the powers add) to get θ^x (1 − θ)^y. Take ln, set the slope to zero and solve: the peak is at θ = x / (x + y).",
  "example": "A newsletter goes to n people and k sign up, θ is the chance a person signs up, and the prior is Beta(1, 3), so p(θ) ∝ (1 − θ)^2 (∝: proportional to): what is θ̂_MAP as a formula in k and n?",
  "trace": [
   {
    "line": "θ^k (1 − θ)^(n − k) × (1 − θ)^2",
    "note": "likelihood × prior"
   },
   {
    "line": "  = θ^x (1 − θ)^y",
    "note": "multiplying adds the powers"
   },
   {
    "line": "x = k, y = n − k + 2",
    "note": ""
   },
   {
    "line": "ln: x ln θ + y ln(1 − θ)",
    "note": "ln has the same peak"
   },
   {
    "line": "x/θ − y/(1 − θ) = 0",
    "note": "slope set to zero"
   },
   {
    "line": "x(1 − θ) = yθ, so θ = x / (x + y)",
    "note": ""
   },
   {
    "line": "x + y = k + n − k + 2 = n + 2",
    "note": "the k's cancel"
   },
   {
    "line": "θ̂_MAP = k / (n + 2)",
    "note": "like 2 extra people who don't sign up"
   }
  ],
  "value": null,
  "result": "k / (n + 2)",
  "tip": "Use the powers x and y, not the Beta numbers: Beta(A, B) has powers A − 1 and B − 1, which is where MAP's − 1s come from."
 },
 "posteriorMean": {
  "what": "The posterior mean E[θ | D] is the average θ under the posterior. Find the posterior Beta(A, B); its mean is A / (A + B) = (k + a) / (n + a + b).",
  "example": "A café sees 16 customers and 4 order cake; with a Beta(5, 4) prior on θ, the chance a customer orders cake, what is E[θ | D]?",
  "trace": [
   {
    "line": "k = 4 cake, n = 16 customers, a = 5, b = 4",
    "note": "D is the data"
   },
   {
    "line": "Posterior: Beta(a + k, b + n − k)",
    "note": ""
   },
   {
    "line": "  = Beta(5 + 4, 4 + 12) = Beta(9, 16)",
    "note": "12 customers didn't order cake"
   },
   {
    "line": "E[θ | D] = 9 / (9 + 16) = 9 / 25",
    "note": "mean of Beta(A, B) is A / (A + B)"
   },
   {
    "line": "  = 0.36",
    "note": "MLE 4/16 = 0.25: the prior pulls it up"
   }
  ],
  "value": "(4 + 5) / (16 + 5 + 4)",
  "result": "0.36",
  "tip": "Find the posterior Beta first; its mean is the first number over the sum of both. MAP would subtract 1 and 2 instead."
 },
 "priorPenalty": {
  "what": "MAP adds a penalty −ln p(w) from the prior. A zero-centred Laplace prior, p(w_j) ∝ exp(−|w_j| / b), gives (|w₁| + |w₂| + ...) / b: an L1 penalty.",
  "example": "A model has weights w = (−1, 2), each with a zero-centred Laplace prior whose spread is b = 2, so ignoring constants, what is the penalty −ln p(w)?",
  "trace": [
   {
    "line": "−ln p(w_j) = |w_j| / b + ln(2b)",
    "note": "−ln undoes the exp; ln(2b) is a constant"
   },
   {
    "line": "−ln p(w) = (|w₁| + |w₂|) / b + C",
    "note": "priors multiply, so their −ln values add"
   },
   {
    "line": "|w₁| + |w₂| = |−1| + |2| = 1 + 2 = 3",
    "note": "|w| is the size without the sign"
   },
   {
    "line": "Penalty = 3 / 2 = 1.5",
    "note": "a sum of absolute values: an L1 penalty"
   }
  ],
  "value": "(abs(-1) + abs(2)) / 2",
  "result": "1.5",
  "tip": "Laplace gives L1 (absolute values over b); Gaussian gives L2 (squares over 2τ²). Don't square the weights here."
 },
 "biasOfEstimator": {
  "what": "Bias = E[θ̂] − θ*: how far the estimator θ̂ is from the true θ* on average. θ̂_MAP is a straight line in k, so put E[k] = nθ* in place of k.",
  "example": "A train is on time with true probability θ* = 0.8 and you count k on-time trains in n = 12 journeys, so what is the bias of θ̂_MAP with a Beta(5, 5) prior, a = b = 5?",
  "trace": [
   {
    "line": "E[k] = nθ* = 12 × 0.8 = 9.6",
    "note": "an average count can be a decimal"
   },
   {
    "line": "MLE: E[k/n] = 9.6/12 = 0.8, bias 0",
    "note": "the MLE is right on average"
   },
   {
    "line": "E[θ̂] = (9.6 + 5 − 1) / (12 + 5 + 5 − 2)",
    "note": "θ̂_MAP = (k + a − 1)/(n + a + b − 2)"
   },
   {
    "line": "  = 13.6 / 20 = 0.68",
    "note": ""
   },
   {
    "line": "Bias = 0.68 − 0.8 = −0.12",
    "note": "too low: the prior pulls towards 0.5"
   }
  ],
  "value": "(12 * 0.8 + 5 - 1) / (12 + 5 + 5 - 2) - 0.8",
  "result": "−0.12",
  "tip": "When θ* is above 0.5, a prior centred on 0.5 drags MAP down, so the bias is negative. The MLE k/n has bias 0."
 },
 "mseDecomposition": {
  "what": "Mean squared error MSE = Bias² + Var: square how far off the estimator is on average, then add its variance (how much it jumps between datasets).",
  "example": "A bakery's estimator λ̂ of loaves sold per hour averages E[λ̂] = 18, the true rate is λ* = 20 and Var(λ̂) = 1.5, so what is the MSE?",
  "trace": [
   {
    "line": "Bias = E[λ̂] − λ* = 18 − 20 = −2",
    "note": "negative: too low on average"
   },
   {
    "line": "Bias² = (−2)² = 4",
    "note": "squaring removes the sign"
   },
   {
    "line": "MSE = Bias² + Var = 4 + 1.5",
    "note": ""
   },
   {
    "line": "  = 5.5",
    "note": ""
   }
  ],
  "value": "pow(18 - 20, 2) + 1.5",
  "result": "5.5",
  "tip": "Too low or too high costs the same once squared. A small bias can be worth it if it cuts the variance a lot."
 },
 "bnParameters": {
  "what": "A parameter is one stored probability. The full joint over n binary variables needs 2ⁿ − 1; a network needs 2^(number of parents) per node. Saved = the difference.",
  "example": "A Naive Bayes network has a binary class Y (will it rain tomorrow?) and three binary features X₁ to X₃, with arrows only from Y to each feature, so how many parameters does it save?",
  "trace": [
   {
    "line": "Full joint: 4 variables, 2⁴ − 1 = 15",
    "note": "Y plus 3 features"
   },
   {
    "line": "Y (no parents): 2⁰ = 1",
    "note": "just P(Y = 1)"
   },
   {
    "line": "Each feature (parent Y): 2¹ = 2",
    "note": "one number for Y = 0, one for Y = 1"
   },
   {
    "line": "3 features: 3 × 2 = 6",
    "note": ""
   },
   {
    "line": "Network: 1 + 6 = 7",
    "note": ""
   },
   {
    "line": "Saved: 15 − 7 = 8",
    "note": "full joint − network"
   }
  ],
  "value": "(pow(2, 4) - 1) - (1 + 3 * pow(2, 1))",
  "result": "8",
  "tip": "In Naive Bayes each feature has one parent, the class, so it costs 2. The full joint doubles with every extra variable."
 },
 "bnJoint": {
  "what": "A Bayesian network's joint probability is a product with one factor per node: its CPT entry P(node | its parents), read at the values asked for.",
  "example": "In the network Cold K → Sneezing S and K → Runny nose R, P(K = 1) = 0.2, P(S = 1 | K = 1) = 0.8, P(S = 1 | K = 0) = 0.1, P(R = 1 | K = 1) = 0.25 and P(R = 1 | K = 0) = 0.1, so what is P(K = 1, S = 1, R = 0)?",
  "trace": [
   {
    "line": "P(K, S, R) = P(K) P(S | K) P(R | K)",
    "note": "S and R both have parent K"
   },
   {
    "line": "P(K = 1) = 0.2",
    "note": ""
   },
   {
    "line": "P(S = 1 | K = 1) = 0.8",
    "note": "use the row for K = 1"
   },
   {
    "line": "P(R = 0 | K = 1) = 1 − 0.25 = 0.75",
    "note": "R = 0: 1 minus the table value"
   },
   {
    "line": "Joint = 0.2 × 0.8 × 0.75",
    "note": ""
   },
   {
    "line": "      = 0.16 × 0.75 = 0.12",
    "note": ""
   }
  ],
  "value": "0.2 * 0.8 * (1 - 0.25)",
  "result": "0.12",
  "tip": "For a value 0, use 1 minus the table's P(X = 1 | ...). Read each node's row at its own parents' values."
 },
 "dSeparation": {
  "what": "On a path A → C ← B, C is a collider (common effect). It blocks the path unless C or a descendant of C is observed. Blocked means A and B are independent.",
  "example": "In the network Phone died P → Missed call M ← In a tunnel T, with M → Friend annoyed F, you know nothing about M or F, so are P and T independent?",
  "trace": [
   {
    "line": "Path: P → M ← T",
    "note": "the only path between P and T"
   },
   {
    "line": "Both arrows point into M: a collider",
    "note": "M is a common effect of P and T"
   },
   {
    "line": "Is M observed? No",
    "note": ""
   },
   {
    "line": "Is a descendant of M observed? No",
    "note": "F is below M, and F is not known either"
   },
   {
    "line": "So the path is blocked",
    "note": ""
   },
   {
    "line": "P and T independent: yes",
    "note": "a dead phone tells you nothing about a tunnel"
   }
  ],
  "value": null,
  "result": "yes",
  "tip": "Learning M, or even just F (below M), opens the path: then P and T are dependent. A chain or fork is the other way round: observing the middle blocks it."
 },
 "markovBlanket": {
  "what": "A node's Markov blanket is its parents, its children and its children's other parents (co-parents). Given its blanket, a node is independent of every other node.",
  "example": "A network has the arrows S → X, S → Y, X → Y, B → Y, X → Z and Z → W, so how many nodes are in the Markov blanket of X?",
  "trace": [
   {
    "line": "Parents of X: S",
    "note": ""
   },
   {
    "line": "Children of X: Y, Z",
    "note": ""
   },
   {
    "line": "Other parents of Y: S, B",
    "note": "Z has no other parent"
   },
   {
    "line": "S is already in: count it once",
    "note": "S is a parent and a co-parent"
   },
   {
    "line": "W is a grandchild of X: left out",
    "note": ""
   },
   {
    "line": "Blanket = {S, Y, Z, B}, size = 4",
    "note": ""
   }
  ],
  "value": "4",
  "result": "4",
  "tip": "One node can play two roles, like S here: write the set out first, then count, so no node is counted twice."
 },
 "bnMarginal": {
  "what": "To marginalise (sum out) a variable, add the joint probabilities over every value it can take, keeping the other variables at the values asked for.",
  "example": "At a gym, M = morning visit, F = came with a friend and S = stayed over an hour (1 = yes); the rows of P(M, F, S) with F = 1 are (0, 1, 0) 0.10, (0, 1, 1) 0.15, (1, 1, 0) 0.05, (1, 1, 1) 0.25, so what is P(F = 1, S = 1)?",
  "trace": [
   {
    "line": "P(F = 1, S = 1)",
    "note": "M is the variable to sum out"
   },
   {
    "line": "  = Σ_m P(M = m, F = 1, S = 1)",
    "note": "Σ_m: add over m = 0 and m = 1"
   },
   {
    "line": "  = P(0, 1, 1) + P(1, 1, 1)",
    "note": "the rows (M, F, S) with F = 1 and S = 1"
   },
   {
    "line": "  = 0.15 + 0.25",
    "note": ""
   },
   {
    "line": "  = 0.4",
    "note": ""
   }
  ],
  "value": "0.15 + 0.25",
  "result": "0.4",
  "tip": "Pick every row that has the kept values, whatever the summed-out variable is: one row for each of its values."
 },
 "bnInference": {
  "what": "Enumeration: P(query | evidence) = P(query, evidence) ÷ P(evidence). Add the joint over every value of the hidden variables. If the evidence has no parents, P(evidence) cancels.",
  "example": "In the network Festival F → Crowds C → Slow trams T, P(F = 1) = 0.05, P(C = 1 | F = 1) = 0.9, P(C = 1 | F = 0) = 0.2, P(T = 1 | C = 1) = 0.6 and P(T = 1 | C = 0) = 0.1; on festival day, what is P(T = 1 | F = 1)?",
  "trace": [
   {
    "line": "P(T = 1 | F = 1)",
    "note": "C is hidden: neither asked for nor given"
   },
   {
    "line": "  = P(T = 1, F = 1) / P(F = 1)",
    "note": "joint ÷ evidence"
   },
   {
    "line": "  = Σ_c P(c | F = 1) × P(T = 1 | c)",
    "note": "Σ_c: add over c = 0, 1; P(F = 1) cancels"
   },
   {
    "line": "P(C = 0 | F = 1) = 1 − 0.9 = 0.1",
    "note": "P(c | F = 1) is short for P(C = c | F = 1)"
   },
   {
    "line": "c = 0: 0.1 × 0.1 = 0.01",
    "note": "P(C = 0 | F = 1) × P(T = 1 | C = 0)"
   },
   {
    "line": "c = 1: 0.9 × 0.6 = 0.54",
    "note": "P(C = 1 | F = 1) × P(T = 1 | C = 1)"
   },
   {
    "line": "P(T = 1 | F = 1) = 0.01 + 0.54 = 0.55",
    "note": ""
   }
  ],
  "value": "0.1 * 0.1 + 0.9 * 0.6",
  "result": "0.55",
  "tip": "One term per value of the hidden variables: with two hidden variables that is 4 terms, one per pair. P(F = 1) = 0.05 is never used."
 },
 "cptFromCounts": {
  "what": "Maximum likelihood by counting: P̂(X = x | parents) = number of cases with X = x and those parent values ÷ number of cases with those parent values.",
  "example": "A café records 40 days: sunny S, weekend W and busy B (1 = yes); counts of (busy, not busy) are S = 1, W = 1: 8 and 2; S = 1, W = 0: 3 and 9; S = 0, W = 1: 5 and 5; S = 0, W = 0: 1 and 7, so in S → B ← W what is P̂(B = 1 | S = 1, W = 0)?",
  "trace": [
   {
    "line": "# means 'number of days with'",
    "note": ""
   },
   {
    "line": "Days with S = 1, W = 0: 3 busy, 9 not",
    "note": "B has two parents: match both"
   },
   {
    "line": "#(S = 1, W = 0) = 3 + 9 = 12",
    "note": ""
   },
   {
    "line": "#(B = 1, S = 1, W = 0) = 3",
    "note": ""
   },
   {
    "line": "P̂(B = 1 | S = 1, W = 0) = 3 / 12",
    "note": "not 3 / 40"
   },
   {
    "line": "  = 0.25",
    "note": ""
   }
  ],
  "value": "3 / (3 + 9)",
  "result": "0.25",
  "tip": "With two parents, each CPT row is learned from its own group: the cases that match both parents' values."
 }
};
if (typeof module !== "undefined") module.exports = { LESSONS, TWIN_LESSONS };
