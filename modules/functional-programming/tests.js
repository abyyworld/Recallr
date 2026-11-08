// Mock tests in the vLab format: one file, every function starts as `undefined`.
// `solution` is the model answer used for marking; checks are [expression, expected show output].
const TESTS = [
 {
  "id": "practice-test-1",
  "title": "Practice Test 1",
  "scope": "weeks 1-3",
  "minutes": 60,
  "file": "PracticeTest1.hs",
  "template": "-- ============================================================\n--  Practice Test 1 (weeks 1-3)            50 marks, 60 minutes\n--\n--  Same format as last year's mock test:\n--    * Replace each `undefined` with your own code.\n--    * Do NOT change any function name or type signature.\n--    * No `main`. Press \"Run checks\" (or on vLab: ghci PracticeTest1.hs, then checks)\n--    * Unfinished function? Leave it as `undefined` so the file compiles.\n--      A file that doesn't compile gets zero.\n--    * Open book: your notes, the course PDFs, Hoogle. No Google, no AI.\n--    * Helper functions are fine. Don't add any imports.\n-- ============================================================\n\nmodule PracticeTest1 where\n\n-- ------------------------------------------------------------\n-- QUESTION 1: recursion on lists (10 marks)\n-- ------------------------------------------------------------\n\n-- (a) [5 marks] Count how many items pass the test. Use recursion.\n--   countIf even [1,2,3,4]  ==  2\n--   countIf (> 10) []       ==  0\n\ncountIf :: (a -> Bool) -> [a] -> Int\ncountIf p xs = undefined\n\n-- (b) [5 marks] Pair up neighbouring items. A leftover last item is dropped.\n--   pairUp [1,2,3,4]    ==  [(1,2),(3,4)]\n--   pairUp \"abcde\"      ==  [('a','b'),('c','d')]\n\npairUp :: [a] -> [(a, a)]\npairUp xs = undefined\n\n-- ------------------------------------------------------------\n-- QUESTION 2: higher-order functions (10 marks)\n-- ------------------------------------------------------------\n\n-- (a) [5 marks] Add up the squares of the odd numbers. Use map and filter\n--     (or a fold), not recursion.\n--   sumOddSquares [1,2,3,4]  ==  10     (1 + 9)\n\nsumOddSquares :: [Int] -> Int\nsumOddSquares xs = undefined\n\n-- (b) [5 marks] Apply a function twice.\n--   applyTwice (+3) 10        ==  16\n--   applyTwice reverse \"abc\"  ==  \"abc\"\n\napplyTwice :: (a -> a) -> a -> a\napplyTwice f x = undefined\n\n-- ------------------------------------------------------------\n-- QUESTION 3: guards and list comprehensions (10 marks)\n-- ------------------------------------------------------------\n\n-- (a) [5 marks] Turn a mark into a grade with guards:\n--     70 or more 'A', 60 or more 'B', 50 or more 'C', 40 or more 'D', else 'F'.\n--   grade 72  ==  'A'\n--   grade 59  ==  'C'\n--   grade 12  ==  'F'\n\ngrade :: Int -> Char\ngrade m = undefined\n\n-- (b) [5 marks] All the numbers from 1 to n that divide n exactly.\n--     Use a list comprehension.\n--   factors 12  ==  [1,2,3,4,6,12]\n--   factors 7   ==  [1,7]\n\nfactors :: Int -> [Int]\nfactors n = undefined\n\n-- ------------------------------------------------------------\n-- QUESTION 4: types and type classes (10 marks)\n-- ------------------------------------------------------------\n\ndata Day = Mon | Tue | Wed | Thu | Fri | Sat | Sun\n  deriving (Eq, Ord, Show, Enum, Bounded)\n\n-- (a) [4 marks] Is it Saturday or Sunday?\n--   isWeekend Sat  ==  True\n--   isWeekend Wed  ==  False\n\nisWeekend :: Day -> Bool\nisWeekend d = undefined\n\n-- (b) [6 marks] The day after, wrapping round from Sun to Mon.\n--   nextDay Mon  ==  Tue\n--   nextDay Sun  ==  Mon\n\nnextDay :: Day -> Day\nnextDay d = undefined\n\n-- ------------------------------------------------------------\n-- QUESTION 5: lists of lists (10 marks)\n-- ------------------------------------------------------------\n\n-- (a) [4 marks] The sum of each row.\n--   rowSums [[1,2],[3,4],[5,6]]  ==  [3,7,11]\n\nrowSums :: [[Int]] -> [Int]\nrowSums rows = undefined\n\n-- (b) [6 marks] True if every row adds up to the same number.\n--     (Assume at least one row.)\n--   sameRowSums [[1,2],[3,0]]  ==  True\n--   sameRowSums [[1,2],[3,4]]  ==  False\n\nsameRowSums :: [[Int]] -> Bool\nsameRowSums rows = undefined\n",
  "solution": "-- QUESTION 1: recursion on lists (10 marks)\n-- ------------------------------------------------------------\n\n-- (a) [5 marks] Count how many items pass the test. Use recursion.\n--   countIf even [1,2,3,4]  ==  2\n--   countIf (> 10) []       ==  0\n\ncountIf :: (a -> Bool) -> [a] -> Int\ncountIf _ [] = 0\ncountIf p (x:xs) | p x = 1 + countIf p xs\n                 | otherwise = countIf p xs\n\n-- (b) [5 marks] Pair up neighbouring items. A leftover last item is dropped.\n--   pairUp [1,2,3,4]    ==  [(1,2),(3,4)]\n--   pairUp \"abcde\"      ==  [('a','b'),('c','d')]\n\npairUp :: [a] -> [(a, a)]\npairUp (a:b:rest) = (a,b) : pairUp rest\npairUp _ = []\n\n-- ------------------------------------------------------------\n-- QUESTION 2: higher-order functions (10 marks)\n-- ------------------------------------------------------------\n\n-- (a) [5 marks] Add up the squares of the odd numbers. Use map and filter\n--     (or a fold), not recursion.\n--   sumOddSquares [1,2,3,4]  ==  10     (1 + 9)\n\nsumOddSquares :: [Int] -> Int\nsumOddSquares xs = sum (map (^2) (filter odd xs))\n\n-- (b) [5 marks] Apply a function twice.\n--   applyTwice (+3) 10        ==  16\n--   applyTwice reverse \"abc\"  ==  \"abc\"\n\napplyTwice :: (a -> a) -> a -> a\napplyTwice f x = f (f x)\n\n-- ------------------------------------------------------------\n-- QUESTION 3: guards and list comprehensions (10 marks)\n-- ------------------------------------------------------------\n\n-- (a) [5 marks] Turn a mark into a grade with guards:\n--     70 or more 'A', 60 or more 'B', 50 or more 'C', 40 or more 'D', else 'F'.\n--   grade 72  ==  'A'\n--   grade 59  ==  'C'\n--   grade 12  ==  'F'\n\ngrade :: Int -> Char\ngrade m | m >= 70 = 'A' | m >= 60 = 'B' | m >= 50 = 'C' | m >= 40 = 'D' | otherwise = 'F'\n\n-- (b) [5 marks] All the numbers from 1 to n that divide n exactly.\n--     Use a list comprehension.\n--   factors 12  ==  [1,2,3,4,6,12]\n--   factors 7   ==  [1,7]\n\nfactors :: Int -> [Int]\nfactors n = [d | d <- [1..n], n `mod` d == 0]\n\n-- ------------------------------------------------------------\n-- QUESTION 4: types and type classes (10 marks)\n-- ------------------------------------------------------------\n\ndata Day = Mon | Tue | Wed | Thu | Fri | Sat | Sun\n  deriving (Eq, Ord, Show, Enum, Bounded)\n\n-- (a) [4 marks] Is it Saturday or Sunday?\n--   isWeekend Sat  ==  True\n--   isWeekend Wed  ==  False\n\nisWeekend :: Day -> Bool\nisWeekend d = d == Sat || d == Sun\n\n-- (b) [6 marks] The day after, wrapping round from Sun to Mon.\n--   nextDay Mon  ==  Tue\n--   nextDay Sun  ==  Mon\n\nnextDay :: Day -> Day\nnextDay d | d == maxBound = minBound | otherwise = succ d\n\n-- ------------------------------------------------------------\n-- QUESTION 5: lists of lists (10 marks)\n-- ------------------------------------------------------------\n\n-- (a) [4 marks] The sum of each row.\n--   rowSums [[1,2],[3,4],[5,6]]  ==  [3,7,11]\n\nrowSums :: [[Int]] -> [Int]\nrowSums rows = map sum rows\n\n-- (b) [6 marks] True if every row adds up to the same number.\n--     (Assume at least one row.)\n--   sameRowSums [[1,2],[3,0]]  ==  True\n--   sameRowSums [[1,2],[3,4]]  ==  False\n\nsameRowSums :: [[Int]] -> Bool\nsameRowSums rows = all (== head (rowSums rows)) (rowSums rows)\n",
  "questions": [
   {
    "id": "Q1a",
    "fn": "countIf",
    "marks": 5,
    "checks": [
     [
      "countIf even [1,2,3,4 :: Int]",
      "2"
     ],
     [
      "countIf (> 10) ([] :: [Int])",
      "0"
     ]
    ]
   },
   {
    "id": "Q1b",
    "fn": "pairUp",
    "marks": 5,
    "checks": [
     [
      "pairUp [1,2,3,4 :: Int]",
      "[(1,2),(3,4)]"
     ],
     [
      "pairUp \"abcde\"",
      "[('a','b'),('c','d')]"
     ]
    ]
   },
   {
    "id": "Q2a",
    "fn": "sumOddSquares",
    "marks": 5,
    "checks": [
     [
      "sumOddSquares [1,2,3,4]",
      "10"
     ],
     [
      "sumOddSquares []",
      "0"
     ]
    ]
   },
   {
    "id": "Q2b",
    "fn": "applyTwice",
    "marks": 5,
    "checks": [
     [
      "applyTwice (+3) (10 :: Int)",
      "16"
     ],
     [
      "applyTwice reverse \"abc\"",
      "\"abc\""
     ]
    ]
   },
   {
    "id": "Q3a",
    "fn": "grade",
    "marks": 5,
    "checks": [
     [
      "map grade [72,70,65,59,45,12]",
      "\"AABCDF\""
     ]
    ]
   },
   {
    "id": "Q3b",
    "fn": "factors",
    "marks": 5,
    "checks": [
     [
      "factors 12",
      "[1,2,3,4,6,12]"
     ],
     [
      "factors 7",
      "[1,7]"
     ]
    ]
   },
   {
    "id": "Q4a",
    "fn": "isWeekend",
    "marks": 4,
    "checks": [
     [
      "map isWeekend [Mon,Sat,Sun]",
      "[False,True,True]"
     ]
    ]
   },
   {
    "id": "Q4b",
    "fn": "nextDay",
    "marks": 6,
    "checks": [
     [
      "nextDay Mon",
      "Tue"
     ],
     [
      "nextDay Sun",
      "Mon"
     ]
    ]
   },
   {
    "id": "Q5a",
    "fn": "rowSums",
    "marks": 4,
    "checks": [
     [
      "rowSums [[1,2],[3,4],[5,6]]",
      "[3,7,11]"
     ]
    ]
   },
   {
    "id": "Q5b",
    "fn": "sameRowSums",
    "marks": 6,
    "checks": [
     [
      "sameRowSums [[1,2],[3,0]]",
      "True"
     ],
     [
      "sameRowSums [[1,2],[3,4]]",
      "False"
     ]
    ]
   }
  ]
 }
];
if (typeof module !== "undefined") module.exports = TESTS;
