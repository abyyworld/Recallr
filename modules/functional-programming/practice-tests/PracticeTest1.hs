-- ============================================================
--  Practice Test 1 (weeks 1-3)            50 marks, 60 minutes
--
--  Same format as last year's mock test:
--    * Replace each `undefined` with your own code.
--    * Do NOT change any function name or type signature.
--    * No `main`. Test in ghci:   ghci PracticeTest1.hs   then   checks
--    * Unfinished function? Leave it as `undefined` so the file compiles.
--      A file that doesn't compile gets zero.
--    * Open book: your notes, the course PDFs, Hoogle. No Google, no AI.
--    * Helper functions are fine. Don't add any imports.
-- ============================================================

module PracticeTest1 where

import Control.Exception (SomeException, evaluate, try)   -- only for checks; don't add imports

-- ------------------------------------------------------------
-- QUESTION 1: recursion on lists (10 marks)
-- ------------------------------------------------------------

-- (a) [5 marks] Count how many items pass the test. Use recursion.
--   countIf even [1,2,3,4]  ==  2
--   countIf (> 10) []       ==  0

countIf :: (a -> Bool) -> [a] -> Int
countIf p xs = undefined

-- (b) [5 marks] Pair up neighbouring items. A leftover last item is dropped.
--   pairUp [1,2,3,4]    ==  [(1,2),(3,4)]
--   pairUp "abcde"      ==  [('a','b'),('c','d')]

pairUp :: [a] -> [(a, a)]
pairUp xs = undefined

-- ------------------------------------------------------------
-- QUESTION 2: higher-order functions (10 marks)
-- ------------------------------------------------------------

-- (a) [5 marks] Add up the squares of the odd numbers. Use map and filter
--     (or a fold), not recursion.
--   sumOddSquares [1,2,3,4]  ==  10     (1 + 9)

sumOddSquares :: [Int] -> Int
sumOddSquares xs = undefined

-- (b) [5 marks] Apply a function twice.
--   applyTwice (+3) 10        ==  16
--   applyTwice reverse "abc"  ==  "abc"

applyTwice :: (a -> a) -> a -> a
applyTwice f x = undefined

-- ------------------------------------------------------------
-- QUESTION 3: guards and list comprehensions (10 marks)
-- ------------------------------------------------------------

-- (a) [5 marks] Turn a mark into a grade with guards:
--     70 or more 'A', 60 or more 'B', 50 or more 'C', 40 or more 'D', else 'F'.
--   grade 72  ==  'A'
--   grade 59  ==  'C'
--   grade 12  ==  'F'

grade :: Int -> Char
grade m = undefined

-- (b) [5 marks] All the numbers from 1 to n that divide n exactly.
--     Use a list comprehension.
--   factors 12  ==  [1,2,3,4,6,12]
--   factors 7   ==  [1,7]

factors :: Int -> [Int]
factors n = undefined

-- ------------------------------------------------------------
-- QUESTION 4: types and type classes (10 marks)
-- ------------------------------------------------------------

data Day = Mon | Tue | Wed | Thu | Fri | Sat | Sun
  deriving (Eq, Ord, Show, Enum, Bounded)

-- (a) [4 marks] Is it Saturday or Sunday?
--   isWeekend Sat  ==  True
--   isWeekend Wed  ==  False

isWeekend :: Day -> Bool
isWeekend d = undefined

-- (b) [6 marks] The day after, wrapping round from Sun to Mon.
--   nextDay Mon  ==  Tue
--   nextDay Sun  ==  Mon

nextDay :: Day -> Day
nextDay d = undefined

-- ------------------------------------------------------------
-- QUESTION 5: lists of lists (10 marks)
-- ------------------------------------------------------------

-- (a) [4 marks] The sum of each row.
--   rowSums [[1,2],[3,4],[5,6]]  ==  [3,7,11]

rowSums :: [[Int]] -> [Int]
rowSums rows = undefined

-- (b) [6 marks] True if every row adds up to the same number.
--     (Assume at least one row.)
--   sameRowSums [[1,2],[3,0]]  ==  True
--   sameRowSums [[1,2],[3,4]]  ==  False

sameRowSums :: [[Int]] -> Bool
sameRowSums rows = undefined

-- ============================================================
-- Self-test (do not change). Passing these doesn't guarantee full
-- marks: the markers use more tests.
-- ============================================================

checks :: IO ()
checks = mapM_ check
  [ ("Q1a countIf",       countIf even [1,2,3,4 :: Int] == 2 && countIf (> 10) ([] :: [Int]) == 0)
  , ("Q1b pairUp",        pairUp [1,2,3,4 :: Int] == [(1,2),(3,4)] && pairUp "abcde" == [('a','b'),('c','d')])
  , ("Q2a sumOddSquares", sumOddSquares [1,2,3,4] == 10 && sumOddSquares [] == 0)
  , ("Q2b applyTwice",    applyTwice (+3) (10 :: Int) == 16 && applyTwice reverse "abc" == "abc")
  , ("Q3a grade",         map grade [72,70,65,59,45,12] == "AABCDF")
  , ("Q3b factors",       factors 12 == [1,2,3,4,6,12] && factors 7 == [1,7])
  , ("Q4a isWeekend",     map isWeekend [Mon,Sat,Sun] == [False,True,True])
  , ("Q4b nextDay",       nextDay Mon == Tue && nextDay Sun == Mon)
  , ("Q5a rowSums",       rowSums [[1,2],[3,4],[5,6]] == [3,7,11])
  , ("Q5b sameRowSums",   sameRowSums [[1,2],[3,0]] && not (sameRowSums [[1,2],[3,4]]))
  ]
  where
    check (n, ok) = do
      r <- tryOk ok
      putStrLn (n ++ ": " ++ r)
    tryOk ok = do
      r <- try (evaluate ok) :: IO (Either SomeException Bool)
      return (case r of
                Right True  -> "ok"
                Right False -> "FAILED"
                Left _      -> "not done yet (or crashed)")
