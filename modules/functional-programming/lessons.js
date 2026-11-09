// Lesson cards shown before a new skill: what it gives you, one example traced step by step, and one tip.
// Every example's final value was checked with GHC against the solution.
const LESSONS = {
 "double": {
  "what": "double x gives you x added to itself.",
  "example": "double 6",
  "trace": [
   {
    "line": "double 6",
    "note": ""
   },
   {
    "line": "= 6 + 6",
    "note": "x is 6"
   },
   {
    "line": "= 12",
    "note": ""
   }
  ],
  "tip": "Before the = you name the input (x); after it you say what to give back."
 },
 "square": {
  "what": "square x gives you x times itself.",
  "example": "square 5",
  "trace": [
   {
    "line": "square 5",
    "note": ""
   },
   {
    "line": "= 5 * 5",
    "note": "x is 5"
   },
   {
    "line": "= 25",
    "note": ""
   }
  ],
  "tip": "* means times. Int -> Int means: takes a whole number, gives one back."
 },
 "swap": {
  "what": "swap gives you the same pair with its two parts the other way round.",
  "example": "swap (1, 'a')",
  "trace": [
   {
    "line": "swap (1, 'a')",
    "note": ""
   },
   {
    "line": "= ('a',1)",
    "note": "x is 1, y is 'a': flip them"
   }
  ],
  "tip": "a and b mean any type at all, and they can be different."
 },
 "isLive": {
  "what": "isLive c g gives True if cell c is in the list of live cells g.",
  "example": "isLive (1,2) [(1,2),(3,4)]",
  "trace": [
   {
    "line": "isLive (1,2) [(1,2),(3,4)]",
    "note": ""
   },
   {
    "line": "= elem (1,2) [(1,2),(3,4)]",
    "note": "c is (1,2), g is the list"
   },
   {
    "line": "= True",
    "note": "first item matches"
   }
  ],
  "tip": "elem asks: is this in the list? The back-quotes let it sit between its two inputs."
 },
 "neighbours": {
  "what": "neighbours gives you the 8 cells touching a cell, all around it.",
  "example": "neighbours (5,5)",
  "trace": [
   {
    "line": "neighbours (5,5)",
    "note": ""
   },
   {
    "line": "i = -1: (4,4), (4,5), (4,6)",
    "note": "5-1 is 4; j goes -1, 0, 1"
   },
   {
    "line": "i = 0: (5,4), (5,6)",
    "note": "skip (5,5) itself"
   },
   {
    "line": "i = 1: (6,4), (6,5), (6,6)",
    "note": "j goes -1, 0, 1 again"
   },
   {
    "line": "= [(4,4),(4,5),(4,6),(5,4),(5,6),(6,4),(6,5),(6,6)]",
    "note": ""
   }
  ],
  "tip": "i <- [-1..1] means: let i be -1, then 0, then 1."
 },
 "sign": {
  "what": "sign tells you if a number is \"positive\", \"negative\" or \"zero\".",
  "example": "sign (-2)",
  "trace": [
   {
    "line": "sign (-2)",
    "note": ""
   },
   {
    "line": "-2 > 0 is False",
    "note": "first test fails, skip"
   },
   {
    "line": "-2 < 0 is True",
    "note": "second test passes"
   },
   {
    "line": "= \"negative\"",
    "note": ""
   }
  ],
  "tip": "Each | is a test, checked top to bottom; otherwise always passes."
 },
 "orB": {
  "what": "orB x y gives True if x or y (or both) is True.",
  "example": "orB False True",
  "trace": [
   {
    "line": "orB False True",
    "note": ""
   },
   {
    "line": "False == True is False",
    "note": "x is False, skip"
   },
   {
    "line": "= y",
    "note": "otherwise: give back y"
   },
   {
    "line": "= True",
    "note": "y is True"
   }
  ],
  "tip": "== asks: are these two the same? It gives True or False."
 },
 "between": {
  "what": "between k n is True if k is bigger than n but smaller than 2 * n.",
  "example": "between 15 10",
  "trace": [
   {
    "line": "between 15 10",
    "note": ""
   },
   {
    "line": "= 15 > 10 && 15 < 2 * 10",
    "note": "k is 15, n is 10"
   },
   {
    "line": "= True && 15 < 20",
    "note": "15 > 10 is True"
   },
   {
    "line": "= True && True",
    "note": "15 < 20 is True"
   },
   {
    "line": "= True",
    "note": "both True, so True"
   }
  ],
  "tip": "&& means and: both sides must be True."
 },
 "reverse7": {
  "what": "reverse7 flips a list round, but only if it has more than 7 items.",
  "example": "reverse7 [1..8]",
  "trace": [
   {
    "line": "reverse7 [1..8]",
    "note": ""
   },
   {
    "line": "= if 8 > 7 then reverse [1..8] else [1..8]",
    "note": "length is 8"
   },
   {
    "line": "= reverse [1..8]",
    "note": "8 > 7 is True"
   },
   {
    "line": "= [8,7,6,5,4,3,2,1]",
    "note": ""
   }
  ],
  "tip": "[1..8] is short for [1,2,3,4,5,6,7,8]."
 },
 "safetail": {
  "what": "safetail gives you a list without its first item, and [] just stays [].",
  "example": "safetail [1,2,3]",
  "trace": [
   {
    "line": "safetail [1,2,3]",
    "note": ""
   },
   {
    "line": "= safetail (1:[2,3])",
    "note": "1 stuck on front of [2,3]"
   },
   {
    "line": "= [2,3]",
    "note": "_ is 1, xs is [2,3]"
   }
  ],
  "tip": "_ means anything, I don't care what. xs is the rest of the list."
 },
 "third": {
  "what": "third gives you the third item of a list.",
  "example": "third [5,6,7,8]",
  "trace": [
   {
    "line": "third [5,6,7,8]",
    "note": ""
   },
   {
    "line": "= third (5:6:7:[8])",
    "note": "split off three items"
   },
   {
    "line": "= 7",
    "note": "skip 5, skip 6, keep 7"
   }
  ],
  "tip": "_:_:x:_ means skip one, skip one, keep one, ignore the rest."
 },
 "describe": {
  "what": "describe turns 0 into \"zero\", 1 into \"one\", and anything else into \"many\".",
  "example": "describe 9",
  "trace": [
   {
    "line": "describe 9",
    "note": ""
   },
   {
    "line": "= case 9 of ...",
    "note": "n is 9"
   },
   {
    "line": "9 is not 0, 9 is not 1",
    "note": "check lines top to bottom"
   },
   {
    "line": "= \"many\"",
    "note": "_ matches anything"
   }
  ],
  "tip": "case n of checks n against each line in order; first match wins."
 },
 "addTen": {
  "what": "addTen gives you a number plus 10.",
  "example": "addTen 5",
  "trace": [
   {
    "line": "addTen 5",
    "note": ""
   },
   {
    "line": "= add 10 5",
    "note": "addTen is add 10"
   },
   {
    "line": "= 10 + 5",
    "note": "x is 10, y is 5"
   },
   {
    "line": "= 15",
    "note": ""
   }
  ],
  "tip": "Giving add only one input makes a new function waiting for the other."
 },
 "length": {
  "what": "length' counts how many items are in a list.",
  "example": "length' [10,20,30]",
  "trace": [
   {
    "line": "length' [10,20,30]",
    "note": ""
   },
   {
    "line": "= 1 + length' [20,30]",
    "note": "count 10, then the rest"
   },
   {
    "line": "= 1 + 1 + length' [30]",
    "note": "count 20"
   },
   {
    "line": "= 1 + 1 + 1 + length' []",
    "note": "count 30"
   },
   {
    "line": "= 1 + 1 + 1 + 0",
    "note": "empty list gives 0"
   },
   {
    "line": "= 3",
    "note": ""
   }
  ],
  "tip": "(x:xs) splits a list into its first item x and the rest xs."
 },
 "sum": {
  "what": "sum' adds up all the numbers in a list.",
  "example": "sum' [10,20,30]",
  "trace": [
   {
    "line": "sum' [10,20,30]",
    "note": ""
   },
   {
    "line": "= 10 + sum' [20,30]",
    "note": "take 10, add the rest"
   },
   {
    "line": "= 10 + 20 + sum' [30]",
    "note": "take 20"
   },
   {
    "line": "= 10 + 20 + 30 + sum' []",
    "note": "take 30"
   },
   {
    "line": "= 10 + 20 + 30 + 0",
    "note": "empty list gives 0"
   },
   {
    "line": "= 60",
    "note": ""
   }
  ],
  "tip": "The [] line is where it stops: no numbers left means 0."
 },
 "product": {
  "what": "product' multiplies all the numbers in a list together.",
  "example": "product' [2,3,4]",
  "trace": [
   {
    "line": "product' [2,3,4]",
    "note": ""
   },
   {
    "line": "= 2 * product' [3,4]",
    "note": "take 2, times the rest"
   },
   {
    "line": "= 2 * 3 * product' [4]",
    "note": "take 3"
   },
   {
    "line": "= 2 * 3 * 4 * product' []",
    "note": "take 4"
   },
   {
    "line": "= 2 * 3 * 4 * 1",
    "note": "empty gives 1, not 0"
   },
   {
    "line": "= 24",
    "note": ""
   }
  ],
  "tip": "Empty gives 1 because times 1 changes nothing (times 0 would wipe it)."
 },
 "and": {
  "what": "and' gives True only if every item in the list is True.",
  "example": "and' [True,False]",
  "trace": [
   {
    "line": "and' [True,False]",
    "note": ""
   },
   {
    "line": "= True && and' [False]",
    "note": "first item is True"
   },
   {
    "line": "= True && (False && and' [])",
    "note": "next item is False"
   },
   {
    "line": "= True && False",
    "note": "False && anything is False"
   },
   {
    "line": "= False",
    "note": ""
   }
  ],
  "tip": "&& means and: True only if both sides are True."
 },
 "or": {
  "what": "or' gives True if at least one item in the list is True.",
  "example": "or' [False,True]",
  "trace": [
   {
    "line": "or' [False,True]",
    "note": ""
   },
   {
    "line": "= False || or' [True]",
    "note": "first is False, keep looking"
   },
   {
    "line": "= False || (True || or' [])",
    "note": "next item is True"
   },
   {
    "line": "= False || True",
    "note": "True || anything is True"
   },
   {
    "line": "= True",
    "note": ""
   }
  ],
  "tip": "|| means or: True if either side is True."
 },
 "reverse": {
  "what": "reverse' gives you the same items in the opposite order.",
  "example": "reverse' [1,2,3]",
  "trace": [
   {
    "line": "reverse' [1,2,3]",
    "note": ""
   },
   {
    "line": "= reverse' [2,3] ++ [1]",
    "note": "1 goes to the end"
   },
   {
    "line": "= reverse' [3] ++ [2] ++ [1]",
    "note": "2 goes before it"
   },
   {
    "line": "= reverse' [] ++ [3] ++ [2] ++ [1]",
    "note": "then 3"
   },
   {
    "line": "= [] ++ [3] ++ [2] ++ [1]",
    "note": "empty list gives []"
   },
   {
    "line": "= [3,2,1]",
    "note": ""
   }
  ],
  "tip": "++ joins two lists end to end. [x] is a list with one item."
 },
 "take": {
  "what": "take' n list gives you the first n items of a list.",
  "example": "take' 2 [5,6,7]",
  "trace": [
   {
    "line": "take' 2 [5,6,7]",
    "note": ""
   },
   {
    "line": "= 5 : take' 1 [6,7]",
    "note": "keep 5, need 1 more"
   },
   {
    "line": "= 5 : 6 : take' 0 [7]",
    "note": "keep 6, need 0 more"
   },
   {
    "line": "= 5 : 6 : []",
    "note": "0 left, stop"
   },
   {
    "line": "= [5,6]",
    "note": ""
   }
  ],
  "tip": "_ means anything, I don't care what. : sticks an item on the front of a list."
 },
 "drop": {
  "what": "drop' n list gives you the list without its first n items.",
  "example": "drop' 2 [5,6,7]",
  "trace": [
   {
    "line": "drop' 2 [5,6,7]",
    "note": ""
   },
   {
    "line": "= drop' 1 [6,7]",
    "note": "throw away 5"
   },
   {
    "line": "= drop' 0 [7]",
    "note": "throw away 6"
   },
   {
    "line": "= [7]",
    "note": "0 left, keep the rest"
   }
  ],
  "tip": "(_:xs) means: skip the first item, call the rest xs."
 },
 "zip": {
  "what": "myZip pairs up two lists item by item, stopping when either list runs out.",
  "example": "myZip [1,2,3] \"ab\"",
  "trace": [
   {
    "line": "myZip [1,2,3] \"ab\"",
    "note": ""
   },
   {
    "line": "= (1,'a') : myZip [2,3] \"b\"",
    "note": "pair the two fronts"
   },
   {
    "line": "= (1,'a') : (2,'b') : myZip [3] \"\"",
    "note": "pair the next fronts"
   },
   {
    "line": "= (1,'a') : (2,'b') : []",
    "note": "one list is empty, stop"
   },
   {
    "line": "= [(1,'a'),(2,'b')]",
    "note": ""
   }
  ],
  "tip": "\"ab\" is just the list ['a','b']. (x, y) makes a pair."
 },
 "takeWhile": {
  "what": "takeWhile' p list keeps items from the front while they pass the test p.",
  "example": "takeWhile' even [2,4,5,6]",
  "trace": [
   {
    "line": "takeWhile' even [2,4,5,6]",
    "note": ""
   },
   {
    "line": "= 2 : takeWhile' even [4,5,6]",
    "note": "2 is even, keep"
   },
   {
    "line": "= 2 : 4 : takeWhile' even [5,6]",
    "note": "4 is even, keep"
   },
   {
    "line": "= 2 : 4 : []",
    "note": "5 is odd, stop"
   },
   {
    "line": "= [2,4]",
    "note": ""
   }
  ],
  "tip": "| starts a guard: a test, then what to give if it passes."
 },
 "fib": {
  "what": "fib n gives number n (counting from 0) in 0, 1, 1, 2, 3, 5, 8 and so on.",
  "example": "fib 4",
  "trace": [
   {
    "line": "fib 4",
    "note": ""
   },
   {
    "line": "= fib 2 + fib 3",
    "note": "add the two before"
   },
   {
    "line": "= 1 + fib 3",
    "note": "fib 2 = 0 + 1"
   },
   {
    "line": "= 1 + 2",
    "note": "fib 3 = 1 + 1"
   },
   {
    "line": "= 3",
    "note": ""
   }
  ],
  "tip": "The first line that matches wins, so fib 0 and fib 1 stop it."
 },
 "qsort": {
  "what": "qsort sorts a list smallest first by splitting it around its first item.",
  "example": "qsort [3,1,4,2]",
  "trace": [
   {
    "line": "qsort [3,1,4,2]",
    "note": ""
   },
   {
    "line": "= qsort [1,2] ++ [3] ++ qsort [4]",
    "note": "3 in middle, smaller left, bigger right"
   },
   {
    "line": "= (qsort [] ++ [1] ++ qsort [2]) ++ [3] ++ [4]",
    "note": "sort each side the same way"
   },
   {
    "line": "= [1,2] ++ [3] ++ [4]",
    "note": "glue the small bits"
   },
   {
    "line": "= [1,2,3,4]",
    "note": ""
   }
  ],
  "tip": "++ glues two lists together. where names the helpers used just above."
 },
 "map": {
  "what": "tripleAll multiplies every number in a list by 3.",
  "example": "tripleAll [1,2,3]",
  "trace": [
   {
    "line": "tripleAll [1,2,3]",
    "note": ""
   },
   {
    "line": "= map (*3) [1,2,3]",
    "note": ""
   },
   {
    "line": "= [1*3, 2*3, 3*3]",
    "note": "do (*3) to each item"
   },
   {
    "line": "= [3,6,9]",
    "note": ""
   }
  ],
  "tip": "(*3) means times 3, waiting for a number."
 },
 "filter": {
  "what": "bigOnes keeps only the numbers bigger than 10.",
  "example": "bigOnes [5,15,25]",
  "trace": [
   {
    "line": "bigOnes [5,15,25]",
    "note": ""
   },
   {
    "line": "= filter (> 10) [5,15,25]",
    "note": "test each with > 10"
   },
   {
    "line": "= [15,25]",
    "note": "5 fails, 15 and 25 pass"
   }
  ],
  "tip": "(> 10) asks: is it bigger than 10? It waits for a number."
 },
 "lambda": {
  "what": "addOneAll adds 1 to every number in a list.",
  "example": "addOneAll [1,2,3]",
  "trace": [
   {
    "line": "addOneAll [1,2,3]",
    "note": ""
   },
   {
    "line": "= map (\\x -> x + 1) [1,2,3]",
    "note": ""
   },
   {
    "line": "= [1+1, 2+1, 3+1]",
    "note": "add 1 to each"
   },
   {
    "line": "= [2,3,4]",
    "note": ""
   }
  ],
  "tip": "\\x -> x + 1 is a tiny nameless function: give it x, get x + 1."
 },
 "foldr": {
  "what": "sumF adds up a list using foldr, with + to combine and 0 to start.",
  "example": "sumF [10,20,30]",
  "trace": [
   {
    "line": "sumF [10,20,30]",
    "note": ""
   },
   {
    "line": "= foldr (+) 0 [10,20,30]",
    "note": ""
   },
   {
    "line": "= 10 + (20 + (30 + 0))",
    "note": "+ between items, 0 at the end"
   },
   {
    "line": "= 10 + (20 + 30)",
    "note": "brackets close on the right"
   },
   {
    "line": "= 10 + 50",
    "note": "then 20 + 30"
   },
   {
    "line": "= 60",
    "note": ""
   }
  ],
  "tip": "(+) in brackets is plus used like a normal function."
 },
 "compose": {
  "what": "sumsqreven keeps the even numbers, squares them, then adds them up.",
  "example": "sumsqreven [1,2,3,4]",
  "trace": [
   {
    "line": "sumsqreven [1,2,3,4]",
    "note": ""
   },
   {
    "line": "= sum (map (^2) (filter even [1,2,3,4]))",
    "note": "read the dots right to left"
   },
   {
    "line": "= sum (map (^2) [2,4])",
    "note": "keep the evens"
   },
   {
    "line": "= sum [4,16]",
    "note": "square each"
   },
   {
    "line": "= 20",
    "note": "add them up"
   }
  ],
  "tip": "f . g means do g first, then f. (^2) means squared."
 },
 "allany": {
  "what": "allPositive gives True only if every number in the list is above 0.",
  "example": "allPositive [1,-2]",
  "trace": [
   {
    "line": "allPositive [1,-2]",
    "note": ""
   },
   {
    "line": "= all (> 0) [1,-2]",
    "note": ""
   },
   {
    "line": "= 1 > 0 && -2 > 0",
    "note": "test every item"
   },
   {
    "line": "= True && False",
    "note": "-2 fails"
   },
   {
    "line": "= False",
    "note": ""
   }
  ],
  "tip": "&& means and: both sides must be True."
 },
 "deriving": {
  "what": "data makes your own type; deriving gets Haskell to write ==, < and show for you.",
  "example": "Red < Blue",
  "trace": [
   {
    "line": "Red < Blue",
    "note": ""
   },
   {
    "line": "= Red (1st) < Blue (3rd)",
    "note": "order is the order you wrote"
   },
   {
    "line": "= True",
    "note": ""
   }
  ],
  "tip": "| here means or: a Colour is Red or Green or Blue."
 },
 "instanceEq": {
  "what": "instance Eq Coin tells Haskell when two coins count as equal, so == works.",
  "example": "Heads == Tails",
  "trace": [
   {
    "line": "Heads == Tails",
    "note": ""
   },
   {
    "line": "Heads == Heads? no",
    "note": "line 1 doesn't fit"
   },
   {
    "line": "Tails == Tails? no",
    "note": "line 2 doesn't fit"
   },
   {
    "line": "_ == _ = False",
    "note": "line 3 fits anything"
   },
   {
    "line": "= False",
    "note": ""
   }
  ],
  "tip": "_ matches anything, so the last line catches every other case."
 },
 "constraint": {
  "what": "f gives x + 1 if x and y are equal, otherwise y * 2.",
  "example": "f 3 4",
  "trace": [
   {
    "line": "f 3 4",
    "note": ""
   },
   {
    "line": "= if 3 == 4 then 3 + 1 else 4 * 2",
    "note": "put in x = 3, y = 4"
   },
   {
    "line": "= if False then 3 + 1 else 4 * 2",
    "note": "3 and 4 differ"
   },
   {
    "line": "= 4 * 2",
    "note": "take the else part"
   },
   {
    "line": "= 8",
    "note": ""
   }
  ],
  "tip": "(Eq a, Num a) => means a must allow == and also + and *."
 },
 "next": {
  "what": "next x gives the value after x, going back to the first one after the last.",
  "example": "next True",
  "trace": [
   {
    "line": "next True",
    "note": ""
   },
   {
    "line": "True == maxBound?",
    "note": "maxBound for Bool is True"
   },
   {
    "line": "yes, so = minBound",
    "note": "wrap back to the start"
   },
   {
    "line": "= False",
    "note": "minBound for Bool is False"
   }
  ],
  "tip": "succ x is the one after x. minBound is first, maxBound is last."
 },
 "suitShow": {
  "what": "instance Show Suit says how each suit is printed: just its first letter.",
  "example": "[Clubs, Spades]",
  "trace": [
   {
    "line": "[Clubs, Spades]",
    "note": ""
   },
   {
    "line": "show Clubs = \"C\", show Spades = \"S\"",
    "note": "ghci shows each item"
   },
   {
    "line": "= [C,S]",
    "note": "no quotes inside the list"
   }
  ],
  "tip": "instance Show Suit where means: here is show for Suit."
 },
 "suitEq": {
  "what": "instance Eq Suit says each suit equals only itself, so == and /= work.",
  "example": "Diamonds /= Hearts",
  "trace": [
   {
    "line": "Diamonds /= Hearts",
    "note": ""
   },
   {
    "line": "= not (Diamonds == Hearts)",
    "note": "/= is the opposite of =="
   },
   {
    "line": "= not False",
    "note": "only the _ == _ line fits"
   },
   {
    "line": "= True",
    "note": ""
   }
  ],
  "tip": "/= means not equal; you get it free once == works."
 },
 "suitDeriving": {
  "what": "deriving gives Suit ==, <, show, stepping with succ, and a first and last value.",
  "example": "[Diamonds ..]",
  "trace": [
   {
    "line": "[Diamonds ..]",
    "note": ""
   },
   {
    "line": "= Diamonds : [Hearts ..]",
    "note": "succ Diamonds is Hearts"
   },
   {
    "line": "= Diamonds : Hearts : Spades : []",
    "note": "Spades is last, stop"
   },
   {
    "line": "= [Diamonds,Hearts,Spades]",
    "note": ""
   }
  ],
  "tip": "[x ..] counts up from x to the last value."
 },
 "count": {
  "what": "count x xs tells you how many times x shows up in the list xs.",
  "example": "count 'a' \"banana\"",
  "trace": [
   {
    "line": "count 'a' \"banana\"",
    "note": ""
   },
   {
    "line": "= length (filter (== 'a') \"banana\")",
    "note": "keep only the a's"
   },
   {
    "line": "= length \"aaa\"",
    "note": "three a's left"
   },
   {
    "line": "= 3",
    "note": ""
   }
  ],
  "tip": "Eq a => means the items must be comparable with ==."
 },
 "palindrome": {
  "what": "isPalindrome gives True when a list reads the same forwards and backwards.",
  "example": "isPalindrome [1,2,3]",
  "trace": [
   {
    "line": "isPalindrome [1,2,3]",
    "note": ""
   },
   {
    "line": "= [1,2,3] == reverse [1,2,3]",
    "note": "flip it and compare"
   },
   {
    "line": "= [1,2,3] == [3,2,1]",
    "note": "the lists differ"
   },
   {
    "line": "= False",
    "note": ""
   }
  ],
  "tip": "== checks if two things are equal and gives True or False."
 },
 "mostGeneral": {
  "what": "k takes two values of the same type and gives back True or False.",
  "example": "k 1 2",
  "trace": [
   {
    "line": "k 1 2",
    "note": ""
   },
   {
    "line": "= [1,2] == [2,1] && 1 < 2",
    "note": "put 1 for x, 2 for y"
   },
   {
    "line": "= False && True",
    "note": "lists differ, but 1 < 2"
   },
   {
    "line": "= False",
    "note": "&& needs both True"
   }
  ],
  "tip": "Ord a => means a can use < and also ==, since Ord includes Eq."
 },
 "allValues": {
  "what": "allValues is a list of every value of a type, first to last.",
  "example": "allValues :: [Party]",
  "trace": [
   {
    "line": "allValues :: [Party]",
    "note": ""
   },
   {
    "line": "= [minBound .. maxBound]",
    "note": "first value up to last value"
   },
   {
    "line": "= [Red .. Yellow]",
    "note": "Red is first, Yellow is last"
   },
   {
    "line": "= [Red,Blue,Green,Yellow]",
    "note": ".. fills in the middle"
   }
  ],
  "tip": ":: [Party] tells Haskell which type of list you want."
 },
 "suitOrd": {
  "what": "This tells Haskell how to put suits in order, so <, max and sort work on them.",
  "example": "Clubs < Spades",
  "trace": [
   {
    "line": "Clubs < Spades",
    "note": ""
   },
   {
    "line": "= compare Clubs Spades == LT",
    "note": "< is built from compare"
   },
   {
    "line": "= compare (rank Clubs) (rank Spades) == LT",
    "note": "your compare uses rank"
   },
   {
    "line": "= compare 1 4 == LT",
    "note": "swap suits for their ranks"
   },
   {
    "line": "= LT == LT",
    "note": "1 is smaller than 4"
   },
   {
    "line": "= True",
    "note": ""
   }
  ],
  "tip": "compare gives LT (less), EQ (equal) or GT (greater)."
 },
 "natAdd": {
  "what": "add joins two tally lists of () into one, like adding the two numbers.",
  "example": "add [(),()] [()]",
  "trace": [
   {
    "line": "add [(),()] [()]",
    "note": ""
   },
   {
    "line": "= () : add [()] [()]",
    "note": "move one () across"
   },
   {
    "line": "= () : () : add [] [()]",
    "note": "move another ()"
   },
   {
    "line": "= () : () : [()]",
    "note": "first list empty, keep ys"
   },
   {
    "line": "= [(),(),()]",
    "note": ""
   }
  ],
  "tip": "() is a value that holds nothing; here each one is a tally mark."
 },
 "rmdups": {
  "what": "rmdups gives back the list with repeats removed, keeping each item's first appearance.",
  "example": "rmdups [1,2,1]",
  "trace": [
   {
    "line": "rmdups [1,2,1]",
    "note": ""
   },
   {
    "line": "= 1 : filter (/= 1) (rmdups [2,1])",
    "note": "keep 1, remove later 1s"
   },
   {
    "line": "= 1 : filter (/= 1) [2,1]",
    "note": "rmdups [2,1] is just [2,1]"
   },
   {
    "line": "= 1 : [2]",
    "note": "the extra 1 is gone"
   },
   {
    "line": "= [1,2]",
    "note": ""
   }
  ],
  "tip": "/= means not equal."
 },
 "compress": {
  "what": "compress squashes runs of equal items sitting side by side into one item.",
  "example": "compress \"aab\"",
  "trace": [
   {
    "line": "compress \"aab\"",
    "note": ""
   },
   {
    "line": "= compress \"ab\"",
    "note": "a and a match, drop one"
   },
   {
    "line": "= 'a' : compress \"b\"",
    "note": "a and b differ, keep a"
   },
   {
    "line": "= 'a' : \"b\"",
    "note": "one item left, keep it"
   },
   {
    "line": "= \"ab\"",
    "note": ""
   }
  ],
  "tip": "(x:y:ys) grabs the first two items; otherwise means every other case."
 },
 "election": {
  "what": "result counts votes per candidate, fewest first; winner picks the candidate with the most.",
  "example": "winner [Red, Blue, Red]",
  "trace": [
   {
    "line": "winner [Red, Blue, Red]",
    "note": ""
   },
   {
    "line": "= snd (last (sort [(2,Red),(1,Blue)]))",
    "note": "count each candidate's votes"
   },
   {
    "line": "= snd (last [(1,Blue),(2,Red)])",
    "note": "fewest votes first"
   },
   {
    "line": "= snd (2,Red)",
    "note": "last pair has most votes"
   },
   {
    "line": "= Red",
    "note": ""
   }
  ],
  "tip": "snd gives the second part of a pair, so snd (2,Red) is Red."
 },
 "pyths": {
  "what": "pyths n gives every (x, y, z) up to n where x squared plus y squared equals z squared.",
  "example": "pyths 5",
  "trace": [
   {
    "line": "pyths 5",
    "note": ""
   },
   {
    "line": "x=3, y=4, z=5: 9 + 16 == 25",
    "note": "True, keep it"
   },
   {
    "line": "x=4, y=3, z=5: 16 + 9 == 25",
    "note": "True, keep it"
   },
   {
    "line": "every other triple fails",
    "note": "tries all 125 triples"
   },
   {
    "line": "[(3,4,5),(4,3,5)]",
    "note": ""
   }
  ],
  "tip": "x <- [1..n] means try each x from 1 to n; the last part is the test."
 },
 "perfects": {
  "what": "perfects n lists numbers up to n that equal the sum of their factors, not counting themselves.",
  "example": "perfects 6",
  "trace": [
   {
    "line": "perfects 6",
    "note": ""
   },
   {
    "line": "x = 1 to 5 all fail",
    "note": "their sums don't match"
   },
   {
    "line": "x = 6: factors 6 = [1,2,3,6]",
    "note": "numbers that divide 6"
   },
   {
    "line": "sum (init [1,2,3,6]) = sum [1,2,3] = 6",
    "note": "init drops the last item"
   },
   {
    "line": "[6]",
    "note": "6 equals 6, keep it"
   }
  ],
  "tip": "mod gives the remainder, so n mod d == 0 means d divides n."
 },
 "scalar": {
  "what": "scalarProduct multiplies matching items of two lists and adds up the results.",
  "example": "scalarProduct [1,2,3] [4,5,6]",
  "trace": [
   {
    "line": "scalarProduct [1,2,3] [4,5,6]",
    "note": ""
   },
   {
    "line": "= sum [x * y | (x, y) <- [(1,4),(2,5),(3,6)]]",
    "note": "zip pairs up matching items"
   },
   {
    "line": "= sum [4,10,18]",
    "note": "multiply each pair"
   },
   {
    "line": "= 32",
    "note": "4 + 10 + 18"
   }
  ],
  "tip": "zip pairs items up: first with first, second with second."
 },
 "concatC": {
  "what": "concatC joins a list of lists into one long list, in order.",
  "example": "concatC [[1,2],[],[3]]",
  "trace": [
   {
    "line": "concatC [[1,2],[],[3]]",
    "note": ""
   },
   {
    "line": "xs = [1,2] gives 1, 2",
    "note": "take each inner list"
   },
   {
    "line": "xs = [] gives nothing",
    "note": "empty list adds nothing"
   },
   {
    "line": "xs = [3] gives 3",
    "note": ""
   },
   {
    "line": "[1,2,3]",
    "note": ""
   }
  ],
  "tip": "Two <- work like a loop in a loop: each list, then each item."
 },
 "positions": {
  "what": "positions x xs gives every place, counting from 0, where x appears in xs.",
  "example": "positions 'a' \"banana\"",
  "trace": [
   {
    "line": "positions 'a' \"banana\"",
    "note": ""
   },
   {
    "line": "zip gives [('b',0),('a',1),('n',2),('a',3),('n',4),('a',5)]",
    "note": "number each letter"
   },
   {
    "line": "keep i where y == 'a'",
    "note": "only the a's"
   },
   {
    "line": "[1,3,5]",
    "note": ""
   }
  ],
  "tip": "[0..] counts 0, 1, 2 forever; zip stops when the shorter list ends."
 },
 "caesar": {
  "what": "shift n c moves a lowercase letter n places along the alphabet, wrapping after z.",
  "example": "shift 3 'z'",
  "trace": [
   {
    "line": "shift 3 'z'",
    "note": ""
   },
   {
    "line": "= chr (ord 'a' + mod (ord 'z' - ord 'a' + 3) 26)",
    "note": "'z' is lowercase"
   },
   {
    "line": "= chr (97 + mod (25 + 3) 26)",
    "note": "'a' is 97, 'z' is 25 past it"
   },
   {
    "line": "= chr (97 + 2)",
    "note": "28 wraps round to 2"
   },
   {
    "line": "= chr 99",
    "note": ""
   },
   {
    "line": "= 'c'",
    "note": ""
   }
  ],
  "tip": "ord turns a letter into its number; chr turns a number back into a letter."
 },
 "mapFilter": {
  "what": "f1 f p xs keeps the items that pass test p, then applies f to each.",
  "example": "f1 (*2) even [1,2,3,4]",
  "trace": [
   {
    "line": "f1 (*2) even [1,2,3,4]",
    "note": ""
   },
   {
    "line": "= map (*2) (filter even [1,2,3,4])",
    "note": "filter runs first"
   },
   {
    "line": "= map (*2) [2,4]",
    "note": "keep only even ones"
   },
   {
    "line": "= [4,8]",
    "note": "double each one"
   }
  ],
  "tip": "(*2) is a function that doubles its input."
 },
 "altMap": {
  "what": "altMap f g xs uses f on the 1st item, g on the 2nd, f on the 3rd, and so on.",
  "example": "altMap (+10) (+100) [0,1,2]",
  "trace": [
   {
    "line": "altMap (+10) (+100) [0,1,2]",
    "note": ""
   },
   {
    "line": "= 10 : altMap (+100) (+10) [1,2]",
    "note": "0+10, then swap f and g"
   },
   {
    "line": "= 10 : 101 : altMap (+10) (+100) [2]",
    "note": "1+100, swap back"
   },
   {
    "line": "= 10 : 101 : 12 : altMap (+100) (+10) []",
    "note": "2+10"
   },
   {
    "line": "= 10 : 101 : 12 : []",
    "note": "empty list, stop"
   },
   {
    "line": "= [10,101,12]",
    "note": ""
   }
  ],
  "tip": "(+10) is a function that adds 10."
 },
 "mapFoldr": {
  "what": "mapF f xs uses f on every item of a list, built with foldr.",
  "example": "mapF (*3) [1,2,3]",
  "trace": [
   {
    "line": "mapF (*3) [1,2,3]",
    "note": ""
   },
   {
    "line": "= foldr (\\x acc -> x*3 : acc) [] [1,2,3]",
    "note": "f is (*3)"
   },
   {
    "line": "= 1*3 : (2*3 : (3*3 : []))",
    "note": "triple each, stick on front"
   },
   {
    "line": "= [3,6,9]",
    "note": ""
   }
  ],
  "tip": "\\x acc -> is a nameless function: x is the item, acc the finished rest."
 },
 "safeDiv": {
  "what": "safeDiv divides two whole numbers, giving Nothing instead of crashing when dividing by 0.",
  "example": "safeDiv 10 2",
  "trace": [
   {
    "line": "safeDiv 10 2",
    "note": ""
   },
   {
    "line": "= Just (div 10 2)",
    "note": "2 is not 0, second line"
   },
   {
    "line": "= Just 5",
    "note": ""
   }
  ],
  "tip": "Maybe Int means: either Nothing, or Just an Int."
 },
 "firstPosition": {
  "what": "firstPosition x list gives Just the place x first appears (counting from 0), or Nothing if missing.",
  "example": "firstPosition 'b' \"ab\"",
  "trace": [
   {
    "line": "firstPosition 'b' \"ab\"",
    "note": ""
   },
   {
    "line": "= case firstPosition 'b' \"b\" of Just n -> Just (n + 1)",
    "note": "'a' is not 'b', look on"
   },
   {
    "line": "= case Just 0 of Just n -> Just (n + 1)",
    "note": "'b' found at the front"
   },
   {
    "line": "= Just (0 + 1)",
    "note": "one step further along"
   },
   {
    "line": "= Just 1",
    "note": ""
   }
  ],
  "tip": "case x of looks inside x and picks the matching line."
 },
 "either": {
  "what": "checkAge n gives Left with an error message for a negative age, or else Right n.",
  "example": "checkAge (-1)",
  "trace": [
   {
    "line": "checkAge (-1)",
    "note": ""
   },
   {
    "line": "= Left \"negative age\"",
    "note": "-1 is below 0: first line"
   }
  ],
  "tip": "Left usually means something went wrong, Right means it worked (right = correct)."
 },
 "btSize": {
  "what": "size counts how many values (forks) are in a tree.",
  "example": "size (Fork 1 (Fork 2 Empty Empty) Empty)",
  "trace": [
   {
    "line": "size (Fork 1 (Fork 2 Empty Empty) Empty)",
    "note": ""
   },
   {
    "line": "= 1 + size (Fork 2 Empty Empty) + size Empty",
    "note": "count this fork, then both sides"
   },
   {
    "line": "= 1 + (1 + size Empty + size Empty) + size Empty",
    "note": "count the 2 fork"
   },
   {
    "line": "= 1 + (1 + 0 + 0) + 0",
    "note": "Empty counts 0"
   },
   {
    "line": "= 2",
    "note": ""
   }
  ],
  "tip": "Fork x l r is one node: value x, left tree l, right tree r."
 },
 "btHeight": {
  "what": "height counts the forks on the longest path from the top of a tree down.",
  "example": "height (Fork 1 (Fork 2 Empty Empty) Empty)",
  "trace": [
   {
    "line": "height (Fork 1 (Fork 2 Empty Empty) Empty)",
    "note": ""
   },
   {
    "line": "= 1 + max (height (Fork 2 Empty Empty)) (height Empty)",
    "note": "this fork, plus the taller side"
   },
   {
    "line": "= 1 + max (1 + max 0 0) 0",
    "note": "Empty has height 0"
   },
   {
    "line": "= 1 + max 1 0",
    "note": "left side is taller"
   },
   {
    "line": "= 2",
    "note": ""
   }
  ],
  "tip": "max a b gives the bigger of the two."
 },
 "btInorder": {
  "what": "inorder lists a tree's values: everything on the left, then the top value, then the right.",
  "example": "inorder (Fork 2 (Fork 1 Empty Empty) (Fork 3 Empty Empty))",
  "trace": [
   {
    "line": "inorder (Fork 2 (Fork 1 Empty Empty) (Fork 3 Empty Empty))",
    "note": ""
   },
   {
    "line": "= inorder (Fork 1 Empty Empty) ++ [2] ++ inorder (Fork 3 Empty Empty)",
    "note": "left, middle, right"
   },
   {
    "line": "= ([] ++ [1] ++ []) ++ [2] ++ ([] ++ [3] ++ [])",
    "note": "same again inside each side"
   },
   {
    "line": "= [1] ++ [2] ++ [3]",
    "note": "empty lists add nothing"
   },
   {
    "line": "= [1,2,3]",
    "note": ""
   }
  ],
  "tip": "++ joins two lists end to end."
 },
 "btMirror": {
  "what": "mirror flips a tree like a mirror: left and right swap at every fork.",
  "example": "mirror (Fork 1 (Fork 2 Empty Empty) Empty)",
  "trace": [
   {
    "line": "mirror (Fork 1 (Fork 2 Empty Empty) Empty)",
    "note": ""
   },
   {
    "line": "= Fork 1 (mirror Empty) (mirror (Fork 2 Empty Empty))",
    "note": "swap left and right"
   },
   {
    "line": "= Fork 1 Empty (Fork 2 (mirror Empty) (mirror Empty))",
    "note": "swap inside too"
   },
   {
    "line": "= Fork 1 Empty (Fork 2 Empty Empty)",
    "note": "Empty stays Empty"
   }
  ],
  "tip": "The value x stays put; only the two sides trade places."
 },
 "bstInsert": {
  "what": "insert x tree puts x where it belongs: smaller values go left, bigger go right.",
  "example": "insert 2 (Fork 3 Empty Empty)",
  "trace": [
   {
    "line": "insert 2 (Fork 3 Empty Empty)",
    "note": ""
   },
   {
    "line": "= Fork 3 (insert 2 Empty) Empty",
    "note": "2 < 3, so go left"
   },
   {
    "line": "= Fork 3 (Fork 2 Empty Empty) Empty",
    "note": "empty spot: make a new fork"
   }
  ],
  "tip": "Haskell never changes a tree; it builds a new one with x added."
 },
 "bstMember": {
  "what": "member x tree gives True if x is in the tree, going left for smaller, right for bigger.",
  "example": "member 2 (Fork 3 (Fork 2 Empty Empty) Empty)",
  "trace": [
   {
    "line": "member 2 (Fork 3 (Fork 2 Empty Empty) Empty)",
    "note": ""
   },
   {
    "line": "= member 2 (Fork 2 Empty Empty)",
    "note": "2 < 3, so look left"
   },
   {
    "line": "= True",
    "note": "2 equals 2: found"
   }
  ],
  "tip": "otherwise just means in every other case."
 },
 "merge": {
  "what": "merge joins two sorted lists into one sorted list, always taking the smaller front item.",
  "example": "merge [1,4] [2,3]",
  "trace": [
   {
    "line": "merge [1,4] [2,3]",
    "note": ""
   },
   {
    "line": "= 1 : merge [4] [2,3]",
    "note": "1 is smaller, take it"
   },
   {
    "line": "= 1 : 2 : merge [4] [3]",
    "note": "2 is smaller, take it"
   },
   {
    "line": "= 1 : 2 : 3 : merge [4] []",
    "note": "3 is smaller, take it"
   },
   {
    "line": "= 1 : 2 : 3 : [4]",
    "note": "one list empty, keep the other"
   },
   {
    "line": "= [1,2,3,4]",
    "note": ""
   }
  ],
  "tip": "(x:xs) means x is the first item and xs is the rest."
 },
 "msort": {
  "what": "msort sorts a list by cutting it in half, sorting each half, then merging them.",
  "example": "msort [3,1,2]",
  "trace": [
   {
    "line": "msort [3,1,2]",
    "note": ""
   },
   {
    "line": "= merge (msort [3]) (msort [1,2])",
    "note": "cut after 1 item (3 div 2)"
   },
   {
    "line": "= merge [3] (merge (msort [1]) (msort [2]))",
    "note": "[3] is sorted; cut [1,2] too"
   },
   {
    "line": "= merge [3] (merge [1] [2])",
    "note": "one item is already sorted"
   },
   {
    "line": "= merge [3] [1,2]",
    "note": "merge the two sorted halves"
   },
   {
    "line": "= [1,2,3]",
    "note": ""
   }
  ],
  "tip": "div is whole-number division: 3 div 2 is 1."
 },
 "roseSize": {
  "what": "roseSize counts every node in a rose tree, where each node can have any number of children.",
  "example": "roseSize (Branch 1 [Branch 2 [], Branch 3 []])",
  "trace": [
   {
    "line": "roseSize (Branch 1 [Branch 2 [], Branch 3 []])",
    "note": ""
   },
   {
    "line": "= 1 + sum (map roseSize [Branch 2 [], Branch 3 []])",
    "note": "count this node, then children"
   },
   {
    "line": "= 1 + sum [roseSize (Branch 2 []), roseSize (Branch 3 [])]",
    "note": "size each child"
   },
   {
    "line": "= 1 + sum [1, 1]",
    "note": "no children: just 1"
   },
   {
    "line": "= 3",
    "note": ""
   }
  ],
  "tip": "map f xs does f to every item; sum adds a list up."
 },
 "roseLeaves": {
  "what": "leaves lists the values of nodes with no children, from left to right.",
  "example": "leaves (Branch 1 [Branch 2 [], Branch 3 [Branch 4 []]])",
  "trace": [
   {
    "line": "leaves (Branch 1 [Branch 2 [], Branch 3 [Branch 4 []]])",
    "note": ""
   },
   {
    "line": "= concatMap leaves [Branch 2 [], Branch 3 [Branch 4 []]]",
    "note": "1 has children, skip it"
   },
   {
    "line": "= leaves (Branch 2 []) ++ leaves (Branch 3 [Branch 4 []])",
    "note": "do each child, then join"
   },
   {
    "line": "= [2] ++ leaves (Branch 4 [])",
    "note": "keep 2; 3 has children, skip"
   },
   {
    "line": "= [2] ++ [4]",
    "note": "4 has no children: keep it"
   },
   {
    "line": "= [2,4]",
    "note": ""
   }
  ],
  "tip": "concatMap f xs does f to each item and joins the lists."
 },
 "exprEval": {
  "what": "eval works out the number an expression stands for, like a calculator.",
  "example": "eval (Add (Value 2) (Mul (Value 3) (Value 4)))",
  "trace": [
   {
    "line": "eval (Add (Value 2) (Mul (Value 3) (Value 4)))",
    "note": ""
   },
   {
    "line": "= eval (Value 2) + eval (Mul (Value 3) (Value 4))",
    "note": "Add becomes +"
   },
   {
    "line": "= 2 + (eval (Value 3) * eval (Value 4))",
    "note": "Mul becomes *"
   },
   {
    "line": "= 2 + (3 * 4)",
    "note": "Value n is just n"
   },
   {
    "line": "= 14",
    "note": ""
   }
  ],
  "tip": "Value, Add and Mul are labels you match on, like tags."
 },
 "bstInsertMaybe": {
  "what": "insertM x tree gives Just the new tree with x added, or Nothing if x was already there.",
  "example": "insertM 2 (Fork 3 Empty Empty)",
  "trace": [
   {
    "line": "insertM 2 (Fork 3 Empty Empty)",
    "note": ""
   },
   {
    "line": "= case insertM 2 Empty of Just l' -> Just (Fork 3 l' Empty)",
    "note": "2 < 3, so try left"
   },
   {
    "line": "= case Just (Fork 2 Empty Empty) of Just l' -> Just (Fork 3 l' Empty)",
    "note": "empty spot: it fits"
   },
   {
    "line": "= Just (Fork 3 (Fork 2 Empty Empty) Empty)",
    "note": "put the new left side back"
   }
  ],
  "tip": "l' is just a name, said l-prime: the new l."
 },
 "bstCheck": {
  "what": "isBST checks a tree is sorted: its values, read left to right, must keep getting bigger.",
  "example": "isBST (Fork 2 (Fork 3 Empty Empty) Empty)",
  "trace": [
   {
    "line": "isBST (Fork 2 (Fork 3 Empty Empty) Empty)",
    "note": ""
   },
   {
    "line": "= increasing (inorder (Fork 2 (Fork 3 Empty Empty) Empty))",
    "note": ""
   },
   {
    "line": "= increasing [3,2]",
    "note": "values from left to right"
   },
   {
    "line": "= 3 < 2 && increasing [2]",
    "note": "compare the first two"
   },
   {
    "line": "= False",
    "note": "False && anything is False"
   }
  ],
  "tip": "(x:y:zs) grabs the first two items and the rest."
 },
 "bstDeleteMax": {
  "what": "deleteMax gives Just the biggest value and the tree without it, or Nothing for an empty tree.",
  "example": "deleteMax (Fork 5 (Fork 2 Empty Empty) (Fork 8 Empty Empty))",
  "trace": [
   {
    "line": "deleteMax (Fork 5 (Fork 2 Empty Empty) (Fork 8 Empty Empty))",
    "note": ""
   },
   {
    "line": "= case deleteMax (Fork 8 Empty Empty) of Just (m, r') -> Just (m, Fork 5 (Fork 2 Empty Empty) r')",
    "note": "right side not empty: go right"
   },
   {
    "line": "= case Just (8, Empty) of Just (m, r') -> Just (m, Fork 5 (Fork 2 Empty Empty) r')",
    "note": "nothing right of 8: biggest"
   },
   {
    "line": "= Just (8,Fork 5 (Fork 2 Empty Empty) Empty)",
    "note": "put the new right side back"
   }
  ],
  "tip": "(a, b) is a pair: two things kept together."
 },
 "foldTree": {
  "what": "foldBT squashes a tree into one value: you say what to do at each fork, and what Empty gives.",
  "example": "foldBT (\\x l r -> x + l + r) 0 (Fork 1 (Fork 2 Empty Empty) Empty)",
  "trace": [
   {
    "line": "foldBT (\\x l r -> x + l + r) 0 (Fork 1 (Fork 2 Empty Empty) Empty)",
    "note": ""
   },
   {
    "line": "= f 1 (foldBT f 0 (Fork 2 Empty Empty)) (foldBT f 0 Empty)",
    "note": "f is the \\x l r function"
   },
   {
    "line": "= f 1 (f 2 0 0) 0",
    "note": "every Empty gives 0"
   },
   {
    "line": "= 1 + (2 + 0 + 0) + 0",
    "note": "f adds x, l and r"
   },
   {
    "line": "= 3",
    "note": ""
   }
  ],
  "tip": "\\x l r -> ... is a function with no name that takes x, l and r."
 },
 "bstFromSorted": {
  "what": "fromSorted turns a sorted list into a tree, putting the middle item on top, again and again.",
  "example": "fromSorted [1,2,3]",
  "trace": [
   {
    "line": "fromSorted [1,2,3]",
    "note": ""
   },
   {
    "line": "= Fork 2 (fromSorted [1]) (fromSorted [3])",
    "note": "left [1], middle 2, right [3]"
   },
   {
    "line": "= Fork 2 (Fork 1 Empty Empty) (Fork 3 Empty Empty)",
    "note": "one item: fork with Empty sides"
   }
  ],
  "tip": "m:rs takes the first item (m) off the second half."
 },
 "exprShow": {
  "what": "showExpr writes an expression as text, like \"(2+3)\", with brackets round every + and *.",
  "example": "showExpr (Add (Value 2) (Value 3))",
  "trace": [
   {
    "line": "showExpr (Add (Value 2) (Value 3))",
    "note": ""
   },
   {
    "line": "= \"(\" ++ showExpr (Value 2) ++ \"+\" ++ showExpr (Value 3) ++ \")\"",
    "note": "Add: brackets with + between"
   },
   {
    "line": "= \"(\" ++ \"2\" ++ \"+\" ++ \"3\" ++ \")\"",
    "note": "show turns 2 into \"2\""
   },
   {
    "line": "= \"(2+3)\"",
    "note": "glue it all together"
   }
  ],
  "tip": "++ glues two strings together."
 }
};
const TWIN_LESSONS = {
 "double": {
  "what": "half x gives you half of a whole number, rounded down.",
  "example": "half 7",
  "trace": [
   {
    "line": "half 7",
    "note": ""
   },
   {
    "line": "= div 7 2",
    "note": "x is 7"
   },
   {
    "line": "= 3",
    "note": "3.5 rounded down"
   }
  ],
  "tip": "div divides whole numbers and throws away the leftover."
 },
 "square": {
  "what": "cube x gives you x times x times x.",
  "example": "cube 3",
  "trace": [
   {
    "line": "cube 3",
    "note": ""
   },
   {
    "line": "= 3 * 3 * 3",
    "note": "x is 3"
   },
   {
    "line": "= 9 * 3",
    "note": "3 * 3 first"
   },
   {
    "line": "= 27",
    "note": ""
   }
  ],
  "tip": ""
 },
 "swap": {
  "what": "firstOfThree gives you the first thing out of a group of three.",
  "example": "firstOfThree (1, 'a', True)",
  "trace": [
   {
    "line": "firstOfThree (1, 'a', True)",
    "note": ""
   },
   {
    "line": "(x, _, _) matches (1, 'a', True)",
    "note": "x is 1, rest ignored"
   },
   {
    "line": "= 1",
    "note": ""
   }
  ],
  "tip": "_ means anything, I don't care what."
 },
 "isLive": {
  "what": "isDead c g gives you True when cell c is not in the list of live cells.",
  "example": "isDead (0,0) [(1,2)]",
  "trace": [
   {
    "line": "isDead (0,0) [(1,2)]",
    "note": ""
   },
   {
    "line": "= not (elem (0,0) [(1,2)])",
    "note": "is (0,0) in the list?"
   },
   {
    "line": "= not False",
    "note": "no, it isn't"
   },
   {
    "line": "= True",
    "note": "not flips it"
   }
  ],
  "tip": "elem checks if a thing is in a list. not flips True and False."
 },
 "neighbours": {
  "what": "around gives you the 4 cells directly up, down, left and right of a cell.",
  "example": "around (5,5)",
  "trace": [
   {
    "line": "around (5,5)",
    "note": ""
   },
   {
    "line": "(i,j) kept: (-1,0) (0,-1) (0,1) (1,0)",
    "note": "only one step away"
   },
   {
    "line": "= [(5-1,5),(5,5-1),(5,5+1),(5+1,5)]",
    "note": "add each to (5,5)"
   },
   {
    "line": "= [(4,5),(5,4),(5,6),(6,5)]",
    "note": ""
   }
  ],
  "tip": "i <- [-1..1] tries i = -1, then 0, then 1. abs drops a minus sign."
 },
 "sign": {
  "what": "absolute gives you a number without its minus sign.",
  "example": "absolute (-3)",
  "trace": [
   {
    "line": "absolute (-3)",
    "note": ""
   },
   {
    "line": "-3 >= 0 is False",
    "note": "first guard fails"
   },
   {
    "line": "= -(-3)",
    "note": "otherwise always matches"
   },
   {
    "line": "= 3",
    "note": "minus a minus is plus"
   }
  ],
  "tip": "| starts a test (a guard). The first True one wins."
 },
 "orB": {
  "what": "andB x y gives you True only when both x and y are True.",
  "example": "andB True False",
  "trace": [
   {
    "line": "andB True False",
    "note": ""
   },
   {
    "line": "True == False is False",
    "note": "x is True, first guard fails"
   },
   {
    "line": "= y",
    "note": "otherwise: answer is y"
   },
   {
    "line": "= False",
    "note": "y is False"
   }
  ],
  "tip": "If x is True, the answer just depends on y."
 },
 "between": {
  "what": "isTeen age gives you True for ages 13 to 19, and False otherwise.",
  "example": "isTeen 15",
  "trace": [
   {
    "line": "isTeen 15",
    "note": ""
   },
   {
    "line": "15 >= 13 && 15 <= 19",
    "note": "check the first guard"
   },
   {
    "line": "= True && True",
    "note": "both tests pass"
   },
   {
    "line": "= True",
    "note": ""
   }
  ],
  "tip": "&& means and: both sides must be True."
 },
 "reverse7": {
  "what": "shortOnly gives you the list back if it has 3 items or fewer, else an empty list.",
  "example": "shortOnly [1,2,3,4]",
  "trace": [
   {
    "line": "shortOnly [1,2,3,4]",
    "note": ""
   },
   {
    "line": "= if length [1,2,3,4] <= 3 then [1,2,3,4] else []",
    "note": "l is [1,2,3,4]"
   },
   {
    "line": "= if 4 <= 3 then [1,2,3,4] else []",
    "note": "count the items"
   },
   {
    "line": "= if False then [1,2,3,4] else []",
    "note": "4 is too many"
   },
   {
    "line": "= []",
    "note": "False picks the else part"
   }
  ],
  "tip": "if test then A else B gives A when the test is True, else B."
 },
 "safetail": {
  "what": "safehead gives you the first number of a list, or 0 if the list is empty.",
  "example": "safehead [7,8]",
  "trace": [
   {
    "line": "safehead [7,8]",
    "note": ""
   },
   {
    "line": "[] does not match",
    "note": "list isn't empty"
   },
   {
    "line": "(x:_) matches 7 : [8]",
    "note": "x is 7"
   },
   {
    "line": "= 7",
    "note": ""
   }
  ],
  "tip": "(x:_) splits a list: x is the first item, _ is the rest."
 },
 "third": {
  "what": "second gives you the second item of a list.",
  "example": "second [5,6,7]",
  "trace": [
   {
    "line": "second [5,6,7]",
    "note": ""
   },
   {
    "line": "(_:x:_) matches 5 : 6 : [7]",
    "note": "skip 5, x is 6"
   },
   {
    "line": "= 6",
    "note": ""
   }
  ],
  "tip": "_ means anything, I don't care what. : joins an item onto the front of a list."
 },
 "describe": {
  "what": "dayType gives you \"weekend\" for \"Sat\" or \"Sun\", and \"weekday\" for anything else.",
  "example": "dayType \"Sun\"",
  "trace": [
   {
    "line": "dayType \"Sun\"",
    "note": ""
   },
   {
    "line": "case \"Sun\" of ...",
    "note": "try each line in order"
   },
   {
    "line": "\"Sat\" -> no match",
    "note": "\"Sun\" isn't \"Sat\""
   },
   {
    "line": "\"Sun\" -> \"weekend\"",
    "note": "match, stop here"
   },
   {
    "line": "= \"weekend\"",
    "note": ""
   }
  ],
  "tip": "In a case, _ catches anything not matched above it."
 },
 "addTen": {
  "what": "twice gives you double a number, by giving mult its first number (2) ahead of time.",
  "example": "twice 21",
  "trace": [
   {
    "line": "twice 21",
    "note": ""
   },
   {
    "line": "= mult 2 21",
    "note": "twice is just mult 2"
   },
   {
    "line": "= 2 * 21",
    "note": "x is 2, y is 21"
   },
   {
    "line": "= 42",
    "note": ""
   }
  ],
  "tip": "mult 2 is mult still waiting for its second number."
 },
 "length": {
  "what": "countZeros gives you how many 0s are in a list.",
  "example": "countZeros [0,1,0]",
  "trace": [
   {
    "line": "countZeros [0,1,0]",
    "note": ""
   },
   {
    "line": "= 1 + countZeros [1,0]",
    "note": "0 found, count 1"
   },
   {
    "line": "= 1 + countZeros [0]",
    "note": "1 isn't 0, skip it"
   },
   {
    "line": "= 1 + 1 + countZeros []",
    "note": "0 found again"
   },
   {
    "line": "= 1 + 1 + 0",
    "note": "empty list gives 0"
   },
   {
    "line": "= 2",
    "note": ""
   }
  ],
  "tip": "(x:xs) splits a list: x is the first item, xs is the rest."
 },
 "sum": {
  "what": "sumSquares gives you each number times itself, all added up.",
  "example": "sumSquares [1,2,3]",
  "trace": [
   {
    "line": "sumSquares [1,2,3]",
    "note": ""
   },
   {
    "line": "= 1*1 + sumSquares [2,3]",
    "note": "square 1, then do the rest"
   },
   {
    "line": "= 1*1 + 2*2 + sumSquares [3]",
    "note": "square 2, then the rest"
   },
   {
    "line": "= 1*1 + 2*2 + 3*3 + sumSquares []",
    "note": "square 3, then the rest"
   },
   {
    "line": "= 1 + 4 + 9 + 0",
    "note": "empty list gives 0"
   },
   {
    "line": "= 14",
    "note": ""
   }
  ],
  "tip": "(x:xs) splits a list: x is the first item, xs is the rest."
 },
 "product": {
  "what": "totalLength gives you the lengths of all the inner lists, added up.",
  "example": "totalLength [\"ab\",\"cde\"]",
  "trace": [
   {
    "line": "totalLength [\"ab\",\"cde\"]",
    "note": ""
   },
   {
    "line": "= length \"ab\" + totalLength [\"cde\"]",
    "note": "count the first list"
   },
   {
    "line": "= 2 + length \"cde\" + totalLength []",
    "note": "count the next one"
   },
   {
    "line": "= 2 + 3 + 0",
    "note": "empty list gives 0"
   },
   {
    "line": "= 5",
    "note": ""
   }
  ],
  "tip": "A String is a list of characters, so length \"ab\" is 2."
 },
 "and": {
  "what": "allZero gives you True if every number in the list is 0.",
  "example": "allZero [0,3]",
  "trace": [
   {
    "line": "allZero [0,3]",
    "note": ""
   },
   {
    "line": "= 0 == 0 && allZero [3]",
    "note": "first is 0? then check the rest"
   },
   {
    "line": "= True && (3 == 0 && allZero [])",
    "note": "same for the rest"
   },
   {
    "line": "= True && False",
    "note": "3 isn't 0"
   },
   {
    "line": "= False",
    "note": ""
   }
  ],
  "tip": "&& means and: both sides must be True. Empty list gives True."
 },
 "or": {
  "what": "hasNegative gives you True if at least one number in the list is below 0.",
  "example": "hasNegative [1,-2]",
  "trace": [
   {
    "line": "hasNegative [1,-2]",
    "note": ""
   },
   {
    "line": "= 1 < 0 || hasNegative [-2]",
    "note": "first below 0? or the rest?"
   },
   {
    "line": "= False || (-2 < 0 || hasNegative [])",
    "note": "1 isn't, check the rest"
   },
   {
    "line": "= False || True",
    "note": "-2 is below 0"
   },
   {
    "line": "= True",
    "note": ""
   }
  ],
  "tip": "|| means or: one True side is enough."
 },
 "reverse": {
  "what": "myLast gives you the last item of a list.",
  "example": "myLast [1,2,3]",
  "trace": [
   {
    "line": "myLast [1,2,3]",
    "note": ""
   },
   {
    "line": "= myLast [2,3]",
    "note": "more than one, drop first"
   },
   {
    "line": "= myLast [3]",
    "note": "drop first again"
   },
   {
    "line": "= 3",
    "note": "one item left, that's it"
   }
  ],
  "tip": "[x] matches a list with exactly one item in it."
 },
 "take": {
  "what": "takeEvery2 keeps the 1st, 3rd, 5th... items of a list and skips the rest.",
  "example": "takeEvery2 [1,2,3,4,5]",
  "trace": [
   {
    "line": "takeEvery2 [1,2,3,4,5]",
    "note": ""
   },
   {
    "line": "= 1 : takeEvery2 [3,4,5]",
    "note": "keep 1, skip 2"
   },
   {
    "line": "= 1 : 3 : takeEvery2 [5]",
    "note": "keep 3, skip 4"
   },
   {
    "line": "= 1 : 3 : [5]",
    "note": "only 1 left, give it back"
   },
   {
    "line": "= [1,3,5]",
    "note": ""
   }
  ],
  "tip": "(x:_:xs) fits a list of 2 or more: keep x, skip the next one (_), xs is the rest."
 },
 "drop": {
  "what": "removeFirst y xs takes out the first y it finds and keeps everything else.",
  "example": "removeFirst 2 [1,2,3,2]",
  "trace": [
   {
    "line": "removeFirst 2 [1,2,3,2]",
    "note": ""
   },
   {
    "line": "= 1 : removeFirst 2 [2,3,2]",
    "note": "1 is not 2, keep it"
   },
   {
    "line": "= 1 : [3,2]",
    "note": "found 2, drop it, stop"
   },
   {
    "line": "= [1,3,2]",
    "note": ""
   }
  ],
  "tip": "| starts a guard: a yes/no test that picks which line runs."
 },
 "zip": {
  "what": "addPairs adds two lists item by item, stopping when either list runs out.",
  "example": "addPairs [1,2,3] [10,20]",
  "trace": [
   {
    "line": "addPairs [1,2,3] [10,20]",
    "note": ""
   },
   {
    "line": "= 11 : addPairs [2,3] [20]",
    "note": "1 + 10"
   },
   {
    "line": "= 11 : 22 : addPairs [3] []",
    "note": "2 + 20"
   },
   {
    "line": "= 11 : 22 : []",
    "note": "second list empty, stop"
   },
   {
    "line": "= [11,22]",
    "note": ""
   }
  ],
  "tip": "addPairs _ _ means any two lists: it runs when one is empty."
 },
 "takeWhile": {
  "what": "dropWhile' p list throws away items from the front while they pass the test p.",
  "example": "dropWhile' even [2,4,5,6]",
  "trace": [
   {
    "line": "dropWhile' even [2,4,5,6]",
    "note": ""
   },
   {
    "line": "= dropWhile' even [4,5,6]",
    "note": "2 is even, drop it"
   },
   {
    "line": "= dropWhile' even [5,6]",
    "note": "4 is even, drop it"
   },
   {
    "line": "= 5 : [6]",
    "note": "5 is odd, so stop here"
   },
   {
    "line": "= [5,6]",
    "note": ""
   }
  ],
  "tip": "p is the test you pass in, like even. p x asks: does x pass?"
 },
 "fib": {
  "what": "power b n multiplies b by itself n times.",
  "example": "power 2 3",
  "trace": [
   {
    "line": "power 2 3",
    "note": ""
   },
   {
    "line": "= 2 * power 2 2",
    "note": "one 2, need 2 more"
   },
   {
    "line": "= 2 * 2 * power 2 1",
    "note": "need 1 more"
   },
   {
    "line": "= 2 * 2 * 2 * power 2 0",
    "note": "need 0 more"
   },
   {
    "line": "= 2 * 2 * 2 * 1",
    "note": "anything to the power 0 is 1"
   },
   {
    "line": "= 8",
    "note": ""
   }
  ],
  "tip": "power b (n - 1) needs the brackets, or Haskell reads it as (power b n) - 1."
 },
 "qsort": {
  "what": "insert' x puts x into the right spot in a sorted list; isort uses it to sort.",
  "example": "insert' 3 [1,2,4,5]",
  "trace": [
   {
    "line": "insert' 3 [1,2,4,5]",
    "note": ""
   },
   {
    "line": "= 1 : insert' 3 [2,4,5]",
    "note": "3 is bigger than 1, keep going"
   },
   {
    "line": "= 1 : 2 : insert' 3 [4,5]",
    "note": "3 is bigger than 2, keep going"
   },
   {
    "line": "= 1 : 2 : 3 : 4 : [5]",
    "note": "3 <= 4, put 3 here"
   },
   {
    "line": "= [1,2,3,4,5]",
    "note": ""
   }
  ],
  "tip": "isort sorts the rest of the list first, then insert' slots the first item in."
 },
 "map": {
  "what": "lengths gives you how many letters each word in a list has.",
  "example": "lengths [\"hi\",\"there\"]",
  "trace": [
   {
    "line": "lengths [\"hi\",\"there\"]",
    "note": ""
   },
   {
    "line": "= map length [\"hi\",\"there\"]",
    "note": "run length on every word"
   },
   {
    "line": "= [length \"hi\", length \"there\"]",
    "note": "one answer per word"
   },
   {
    "line": "= [2,5]",
    "note": ""
   }
  ],
  "tip": "map f list runs f on every item and gives back a new list."
 },
 "filter": {
  "what": "evensOnly keeps only the even numbers from a list.",
  "example": "evensOnly [1,2,3,4]",
  "trace": [
   {
    "line": "evensOnly [1,2,3,4]",
    "note": ""
   },
   {
    "line": "= filter even [1,2,3,4]",
    "note": "ask each number: is it even?"
   },
   {
    "line": "= [2,4]",
    "note": "keep 2 and 4, drop 1, 3"
   }
  ],
  "tip": "filter test list keeps only the items where the test says True."
 },
 "lambda": {
  "what": "lastDigits gives you the last digit of every number in a list.",
  "example": "lastDigits [123,45,7]",
  "trace": [
   {
    "line": "lastDigits [123,45,7]",
    "note": ""
   },
   {
    "line": "= map (\\x -> mod x 10) [123,45,7]",
    "note": "run the tiny function on each"
   },
   {
    "line": "= [mod 123 10, mod 45 10, mod 7 10]",
    "note": "remainder after dividing by 10"
   },
   {
    "line": "= [3,5,7]",
    "note": ""
   }
  ],
  "tip": "\\x -> ... is a tiny nameless function: give it x, get back the right side."
 },
 "foldr": {
  "what": "productF multiplies all the numbers in a list together.",
  "example": "productF [2,3,4]",
  "trace": [
   {
    "line": "productF [2,3,4]",
    "note": ""
   },
   {
    "line": "= foldr (*) 1 [2,3,4]",
    "note": "multiply, starting value 1"
   },
   {
    "line": "= 2 * (3 * (4 * 1))",
    "note": "brackets close on the right"
   },
   {
    "line": "= 2 * (3 * 4)",
    "note": "4 * 1 first"
   },
   {
    "line": "= 2 * 12",
    "note": "then 3 * 4"
   },
   {
    "line": "= 24",
    "note": ""
   }
  ],
  "tip": "(*) is the times sign used like a normal function. Start at 1: times 1 changes nothing."
 },
 "compose": {
  "what": "countBig counts how many numbers in a list are over 100.",
  "example": "countBig [50,150,200]",
  "trace": [
   {
    "line": "countBig [50,150,200]",
    "note": ""
   },
   {
    "line": "= length (filter (> 100) [50,150,200])",
    "note": "filter runs first, then length"
   },
   {
    "line": "= length [150,200]",
    "note": "50 is not over 100"
   },
   {
    "line": "= 2",
    "note": ""
   }
  ],
  "tip": "f . g means do g first, then f on the result. (> 100) is the test: is it over 100?"
 },
 "allany": {
  "what": "hasSpace tells you True if a string has a space in it, otherwise False.",
  "example": "hasSpace \"hi there\"",
  "trace": [
   {
    "line": "hasSpace \"hi there\"",
    "note": ""
   },
   {
    "line": "= any (== ' ') \"hi there\"",
    "note": "ask each letter: is it a space?"
   },
   {
    "line": "= False || False || True || ...",
    "note": "h no, i no, gap yes"
   },
   {
    "line": "= True",
    "note": "one yes is enough"
   }
  ],
  "tip": "(== ' ') is a test: is this equal to a space? || means or."
 },
 "deriving": {
  "what": "data Size makes a new type with three values; deriving gives you ==, < and show for free.",
  "example": "Small < Large",
  "trace": [
   {
    "line": "Small < Large",
    "note": ""
   },
   {
    "line": "= compare Small Large == LT",
    "note": "< checks if compare says LT"
   },
   {
    "line": "= LT == LT",
    "note": "Small is written before Large"
   },
   {
    "line": "= True",
    "note": ""
   }
  ],
  "tip": "With deriving Ord, values written earlier count as smaller. LT means less than."
 },
 "instanceEq": {
  "what": "This instance tells Haskell how to turn a Light into text: on or off.",
  "example": "show [On, Off]",
  "trace": [
   {
    "line": "show [On, Off]",
    "note": ""
   },
   {
    "line": "= \"[\" ++ show On ++ \",\" ++ show Off ++ \"]\"",
    "note": "a list shows each item inside"
   },
   {
    "line": "= \"[\" ++ \"on\" ++ \",\" ++ \"off\" ++ \"]\"",
    "note": "use your show lines"
   },
   {
    "line": "= \"[on,off]\"",
    "note": ""
   }
  ],
  "tip": "instance Show Light where means: here is how to show a Light."
 },
 "constraint": {
  "what": "g picks the bigger of two values and turns it into text.",
  "example": "g 3 7",
  "trace": [
   {
    "line": "g 3 7",
    "note": ""
   },
   {
    "line": "= show (max 3 7)",
    "note": "max picks the bigger one"
   },
   {
    "line": "= show 7",
    "note": "turn it into text"
   },
   {
    "line": "= \"7\"",
    "note": ""
   }
  ],
  "tip": "(Ord a, Show a) => means a must be comparable (for max) and showable (for show)."
 },
 "next": {
  "what": "prev gives the value just before this one, jumping to the last if you are at the first.",
  "example": "prev False",
  "trace": [
   {
    "line": "prev False",
    "note": ""
   },
   {
    "line": "= maxBound",
    "note": "False is the first Bool, so wrap"
   },
   {
    "line": "= True",
    "note": "True is the last Bool"
   }
  ],
  "tip": "minBound is a type's first value, maxBound its last; pred steps back one."
 },
 "suitShow": {
  "what": "This instance shows a Money amount as its number followed by p.",
  "example": "show (Pence 250)",
  "trace": [
   {
    "line": "show (Pence 250)",
    "note": ""
   },
   {
    "line": "= show 250 ++ \"p\"",
    "note": "n is 250"
   },
   {
    "line": "= \"250\" ++ \"p\"",
    "note": "number turned into text"
   },
   {
    "line": "= \"250p\"",
    "note": "++ joins the two"
   }
  ],
  "tip": "show (Pence n) unpacks the number inside, so n is just the Int."
 },
 "suitEq": {
  "what": "You only say when two Bits are different; Haskell works out == from that.",
  "example": "O == I",
  "trace": [
   {
    "line": "O == I",
    "note": ""
   },
   {
    "line": "= not (O /= I)",
    "note": "== means not different"
   },
   {
    "line": "= not True",
    "note": "your line: O /= I = True"
   },
   {
    "line": "= False",
    "note": ""
   }
  ],
  "tip": "/= means not equal. _ /= _ = False catches every other pair."
 },
 "suitDeriving": {
  "what": "data Day makes five weekday values; deriving gives you ==, show, numbering, ranges, first and last.",
  "example": "[Tue .. Thu]",
  "trace": [
   {
    "line": "[Tue .. Thu]",
    "note": ""
   },
   {
    "line": "= map toEnum [1 .. 3] :: [Day]",
    "note": "Mon is 0, Tue 1, Thu 3"
   },
   {
    "line": "= [Tue,Wed,Thu]",
    "note": "turn numbers back into days"
   }
  ],
  "tip": "Enum numbers the values from 0 and allows ranges; Bounded gives minBound and maxBound."
 },
 "count": {
  "what": "remove x xs gives you the list with every copy of x taken out.",
  "example": "remove 'a' \"banana\"",
  "trace": [
   {
    "line": "remove 'a' \"banana\"",
    "note": ""
   },
   {
    "line": "= filter (/= 'a') \"banana\"",
    "note": "keep letters that are not 'a'"
   },
   {
    "line": "\"bnn\"",
    "note": "every 'a' is dropped"
   }
  ],
  "tip": "/= means not equal, so (/= x) asks: is this item not x?"
 },
 "palindrome": {
  "what": "sameEnds xs tells you True if the first and last items match, or the list is empty.",
  "example": "sameEnds \"abca\"",
  "trace": [
   {
    "line": "sameEnds \"abca\"",
    "note": ""
   },
   {
    "line": "= null \"abca\" || head \"abca\" == last \"abca\"",
    "note": "empty? or ends equal?"
   },
   {
    "line": "= False || 'a' == 'a'",
    "note": "not empty, first and last are 'a'"
   },
   {
    "line": "= False || True",
    "note": "'a' equals 'a'"
   },
   {
    "line": "True",
    "note": ""
   }
  ],
  "tip": "|| means or. null asks: is the list empty?"
 },
 "mostGeneral": {
  "what": "h x tells you True when x is an even whole number above 0.",
  "example": "h 4",
  "trace": [
   {
    "line": "h 4",
    "note": ""
   },
   {
    "line": "= 4 `mod` 2 == 0 && 4 > 0",
    "note": "put 4 in for x"
   },
   {
    "line": "= 0 == 0 && 4 > 0",
    "note": "4 divided by 2 leaves 0"
   },
   {
    "line": "= True && True",
    "note": "both parts are true"
   },
   {
    "line": "True",
    "note": ""
   }
  ],
  "tip": "Integral a means x can be any whole-number type, like Int or Integer."
 },
 "allValues": {
  "what": "upTo x gives you every value of its type, from the first one up to x.",
  "example": "upTo Green",
  "trace": [
   {
    "line": "upTo Green",
    "note": ""
   },
   {
    "line": "= [minBound .. Green]",
    "note": "put Green in for x"
   },
   {
    "line": "= [Red .. Green]",
    "note": "Red is written first, so it is first"
   },
   {
    "line": "[Red,Blue,Green]",
    "note": "step through in written order"
   }
  ],
  "tip": "minBound means the first value of the type. [a .. b] counts from a up to b."
 },
 "suitOrd": {
  "what": "This tells Haskell how to order medals: Bronze smallest, Gold biggest, using points.",
  "example": "compare Silver Gold",
  "trace": [
   {
    "line": "compare Silver Gold",
    "note": ""
   },
   {
    "line": "= compare (points Silver) (points Gold)",
    "note": "use our compare rule"
   },
   {
    "line": "= compare 2 3",
    "note": "look up each medal's points"
   },
   {
    "line": "LT",
    "note": "2 is less than 3"
   }
  ],
  "tip": "compare gives LT (less), EQ (equal) or GT (greater). With compare defined, < and maximum work too."
 },
 "natAdd": {
  "what": "mul xs ys multiplies two numbers, where each number is a list of () marks.",
  "example": "mul [(),()] [(),()]",
  "trace": [
   {
    "line": "mul [(),()] [(),()]",
    "note": ""
   },
   {
    "line": "= [(),()] ++ mul [()] [(),()]",
    "note": "one off the first, add ys"
   },
   {
    "line": "= [(),()] ++ [(),()] ++ mul [] [(),()]",
    "note": "another one off, add ys again"
   },
   {
    "line": "= [(),()] ++ [(),()] ++ []",
    "note": "first list empty, that is 0"
   },
   {
    "line": "[(),(),(),()]",
    "note": "2 times 2 is 4"
   }
  ],
  "tip": "() is a value that carries no info, so each () is just one tally mark. ++ joins two lists."
 },
 "rmdups": {
  "what": "allDifferent xs tells you True when no item appears twice in the list.",
  "example": "allDifferent [1,2,1]",
  "trace": [
   {
    "line": "allDifferent [1,2,1]",
    "note": ""
   },
   {
    "line": "= notElem 1 [2,1] && allDifferent [2,1]",
    "note": "is 1 missing from the rest?"
   },
   {
    "line": "= False && allDifferent [2,1]",
    "note": "no, 1 is there again"
   },
   {
    "line": "False",
    "note": "False && anything is False"
   }
  ],
  "tip": "notElem x xs asks: is x NOT in xs? && means and."
 },
 "compress": {
  "what": "countRuns xs counts the groups of equal items sitting next to each other.",
  "example": "countRuns \"aab\"",
  "trace": [
   {
    "line": "countRuns \"aab\"",
    "note": ""
   },
   {
    "line": "= countRuns \"ab\"",
    "note": "'a' == 'a', same run, no count"
   },
   {
    "line": "= 1 + countRuns \"b\"",
    "note": "'a' /= 'b', a run ends"
   },
   {
    "line": "= 1 + 1",
    "note": "one item left is one run"
   },
   {
    "line": "2",
    "note": ""
   }
  ],
  "tip": "(x:y:ys) grabs the first two items x and y; ys is the rest."
 },
 "election": {
  "what": "tally xs gives you each different item with how many times it appears, smallest first.",
  "example": "tally \"aba\"",
  "trace": [
   {
    "line": "tally \"aba\"",
    "note": ""
   },
   {
    "line": "sort (rmdups \"aba\") = \"ab\"",
    "note": "remove repeats, then sort"
   },
   {
    "line": "= [('a', count 'a' \"aba\"), ('b', count 'b' \"aba\")]",
    "note": "pair each letter with its count"
   },
   {
    "line": "[('a',2),('b',1)]",
    "note": "'a' twice, 'b' once"
   }
  ],
  "tip": "[ result | v <- list ] builds a new list: one result for each v taken from the list."
 },
 "pyths": {
  "what": "sumPairs n gives you every pair (x, y) with x no bigger than y that adds up to n.",
  "example": "sumPairs 4",
  "trace": [
   {
    "line": "sumPairs 4",
    "note": ""
   },
   {
    "line": "x = 1, y from 1 to 4",
    "note": "only 1 + 3 == 4"
   },
   {
    "line": "x = 2, y from 2 to 4",
    "note": "only 2 + 2 == 4"
   },
   {
    "line": "x = 3, then x = 4",
    "note": "no y works"
   },
   {
    "line": "[(1,3),(2,2)]",
    "note": ""
   }
  ],
  "tip": "Two <- in one comprehension work like loops inside loops. The part after the last comma is a filter."
 },
 "perfects": {
  "what": "abundants n gives you the numbers up to n whose smaller factors add up to more than them.",
  "example": "abundants 12",
  "trace": [
   {
    "line": "abundants 12",
    "note": ""
   },
   {
    "line": "factors 12 = [1,2,3,4,6,12]",
    "note": "numbers that divide 12 evenly"
   },
   {
    "line": "sum (init [1,2,3,4,6,12]) = 16",
    "note": "drop 12 itself, add the rest"
   },
   {
    "line": "16 > 12, keep 12",
    "note": "1 to 11 all fail"
   },
   {
    "line": "[12]",
    "note": ""
   }
  ],
  "tip": "init xs is the list without its last item. n `mod` d == 0 means d divides n with nothing left over."
 },
 "scalar": {
  "what": "countMatches xs ys counts the positions where both lists have the same item.",
  "example": "countMatches \"cat\" \"car\"",
  "trace": [
   {
    "line": "countMatches \"cat\" \"car\"",
    "note": ""
   },
   {
    "line": "zip \"cat\" \"car\" = [('c','c'),('a','a'),('t','r')]",
    "note": "pair items at the same spot"
   },
   {
    "line": "= length \"ca\"",
    "note": "keep only pairs that match"
   },
   {
    "line": "2",
    "note": ""
   }
  ],
  "tip": "zip pairs up two lists item by item. (x, y) <- ... splits each pair into x and y."
 },
 "concatC": {
  "what": "allFirsts xss gives you the first item of each inner list, skipping empty ones.",
  "example": "allFirsts [[1,2],[],[3,4]]",
  "trace": [
   {
    "line": "allFirsts [[1,2],[],[3,4]]",
    "note": ""
   },
   {
    "line": "(x:_) <- [1,2]  gives x = 1",
    "note": "fits, take 1"
   },
   {
    "line": "(x:_) <- []",
    "note": "does not fit, skipped"
   },
   {
    "line": "(x:_) <- [3,4]  gives x = 3",
    "note": "fits, take 3"
   },
   {
    "line": "[1,3]",
    "note": ""
   }
  ],
  "tip": "(x:_) means a list with a first item x and any rest. _ means I don't care."
 },
 "positions": {
  "what": "evenPositions xs gives you the items at positions 0, 2, 4 and so on.",
  "example": "evenPositions \"abcde\"",
  "trace": [
   {
    "line": "evenPositions \"abcde\"",
    "note": ""
   },
   {
    "line": "zip \"abcde\" [0..] = [('a',0),('b',1),('c',2),('d',3),('e',4)]",
    "note": "label each item with its position"
   },
   {
    "line": "keep 'a', 'c', 'e'",
    "note": "positions 0, 2, 4 are even"
   },
   {
    "line": "\"ace\"",
    "note": ""
   }
  ],
  "tip": "[0..] counts 0, 1, 2 forever; zip stops when the shorter list ends."
 },
 "caesar": {
  "what": "lowers xs counts how many lowercase letters are in the string.",
  "example": "lowers \"Hey\"",
  "trace": [
   {
    "line": "lowers \"Hey\"",
    "note": ""
   },
   {
    "line": "= length [x | x <- \"Hey\", isLower x]",
    "note": "keep only lowercase letters"
   },
   {
    "line": "= length \"ey\"",
    "note": "'H' is uppercase, dropped"
   },
   {
    "line": "2",
    "note": ""
   }
  ],
  "tip": "isLower 'e' is True and isLower 'H' is False. A String is just a list of Chars."
 },
 "mapFilter": {
  "what": "bigSquares xs keeps the numbers above 3, then squares each one.",
  "example": "bigSquares [1,4,2,5]",
  "trace": [
   {
    "line": "bigSquares [1,4,2,5]",
    "note": ""
   },
   {
    "line": "= map (^2) (filter (> 3) [1,4,2,5])",
    "note": "filter first, then square"
   },
   {
    "line": "= map (^2) [4,5]",
    "note": "1 and 2 are not above 3"
   },
   {
    "line": "= [4^2, 5^2]",
    "note": "square each one"
   },
   {
    "line": "[16,25]",
    "note": ""
   }
  ],
  "tip": "(> 3) is a half-written test: give it x and it asks x > 3. (^2) squares whatever you give it."
 },
 "altMap": {
  "what": "everyOther f xs changes the 1st, 3rd, 5th items with f and leaves the rest.",
  "example": "everyOther (*10) [1,2,3]",
  "trace": [
   {
    "line": "everyOther (*10) [1,2,3]",
    "note": ""
   },
   {
    "line": "= 1*10 : 2 : everyOther (*10) [3]",
    "note": "change 1, leave 2"
   },
   {
    "line": "= 10 : 2 : [3*10]",
    "note": "one item left, change it"
   },
   {
    "line": "= 10 : 2 : [30]",
    "note": ""
   },
   {
    "line": "[10,2,30]",
    "note": ""
   }
  ],
  "tip": "(x:y:zs) takes the first two items at once; zs is everything after them."
 },
 "mapFoldr": {
  "what": "filterF p xs gives you the items that pass the test p, like filter.",
  "example": "filterF even [1,2,3]",
  "trace": [
   {
    "line": "filterF even [1,2,3]",
    "note": ""
   },
   {
    "line": "= filterF even [2,3]",
    "note": "1 is odd, skip it"
   },
   {
    "line": "= 2 : filterF even [3]",
    "note": "2 is even, keep it"
   },
   {
    "line": "= 2 : filterF even []",
    "note": "3 is odd, skip it"
   },
   {
    "line": "= 2 : []",
    "note": "empty list gives start value []"
   },
   {
    "line": "[2]",
    "note": ""
   }
  ],
  "tip": "\\x acc -> ... is a function with no name: x is the item, acc is the answer for the rest."
 },
 "safeDiv": {
  "what": "safeHeadM xs gives you Just the first item, or Nothing if the list is empty.",
  "example": "safeHeadM [4,5]",
  "trace": [
   {
    "line": "safeHeadM [4,5]",
    "note": ""
   },
   {
    "line": "[4,5] is not []",
    "note": "first line does not fit"
   },
   {
    "line": "(x:_) fits with x = 4",
    "note": "second line matches"
   },
   {
    "line": "Just 4",
    "note": ""
   }
  ],
  "tip": "Maybe a means: maybe a value. Just 4 is a value, Nothing means there was none."
 },
 "firstPosition": {
  "what": "lookupAge looks up a name in a list of (name, age) pairs and gives the age if found.",
  "example": "lookupAge \"bo\" [(\"al\",20),(\"bo\",31)]",
  "trace": [
   {
    "line": "lookupAge \"bo\" [(\"al\",20),(\"bo\",31)]",
    "note": ""
   },
   {
    "line": "= lookupAge \"bo\" [(\"bo\",31)]",
    "note": "al is not bo, skip it"
   },
   {
    "line": "Just 31",
    "note": "bo matches, give its age"
   }
  ],
  "tip": "(n, a) pulls the name and age out of a pair. Just x means found x; Nothing means not found."
 },
 "either": {
  "what": "parseBit turns '0' or '1' into a number, or gives an error message for anything else.",
  "example": "parseBit 'x'",
  "trace": [
   {
    "line": "parseBit 'x'",
    "note": ""
   },
   {
    "line": "= Left (\"not a bit: \" ++ ['x'])",
    "note": "not '0' or '1', so error"
   },
   {
    "line": "= Left (\"not a bit: \" ++ \"x\")",
    "note": "['x'] is the text \"x\""
   },
   {
    "line": "Left \"not a bit: x\"",
    "note": "join the two pieces of text"
   }
  ],
  "tip": "Right holds a good answer, Left holds an error message."
 },
 "btSize": {
  "what": "sumTree adds up every number stored in a tree.",
  "example": "sumTree (Fork 1 (Fork 2 Empty Empty) (Fork 3 Empty Empty))",
  "trace": [
   {
    "line": "sumTree (Fork 1 (Fork 2 Empty Empty) (Fork 3 Empty Empty))",
    "note": ""
   },
   {
    "line": "= 1 + sumTree (Fork 2 Empty Empty) + sumTree (Fork 3 Empty Empty)",
    "note": "this value plus both sides"
   },
   {
    "line": "= 1 + (2 + 0 + 0) + (3 + 0 + 0)",
    "note": "Empty counts as 0"
   },
   {
    "line": "= 1 + 2 + 3",
    "note": ""
   },
   {
    "line": "6",
    "note": ""
   }
  ],
  "tip": "Fork x l r is a node: value x, left side l, right side r."
 },
 "btHeight": {
  "what": "leavesBT counts the leaves of a tree: the nodes with nothing below them.",
  "example": "leavesBT (Fork 1 Empty (Fork 2 Empty Empty))",
  "trace": [
   {
    "line": "leavesBT (Fork 1 Empty (Fork 2 Empty Empty))",
    "note": ""
   },
   {
    "line": "= leavesBT Empty + leavesBT (Fork 2 Empty Empty)",
    "note": "1 has a child, check both sides"
   },
   {
    "line": "= 0 + 1",
    "note": "Empty is 0, 2 is a leaf"
   },
   {
    "line": "1",
    "note": ""
   }
  ],
  "tip": "Rules are tried top to bottom, so Fork _ Empty Empty is checked before the last rule."
 },
 "btInorder": {
  "what": "preorder lists a tree's values: the top one first, then the left side, then the right.",
  "example": "preorder (Fork 2 (Fork 1 Empty Empty) (Fork 3 Empty Empty))",
  "trace": [
   {
    "line": "preorder (Fork 2 (Fork 1 Empty Empty) (Fork 3 Empty Empty))",
    "note": ""
   },
   {
    "line": "= [2] ++ preorder (Fork 1 Empty Empty) ++ preorder (Fork 3 Empty Empty)",
    "note": "top first, then left, then right"
   },
   {
    "line": "= [2] ++ ([1] ++ [] ++ []) ++ ([3] ++ [] ++ [])",
    "note": "Empty gives []"
   },
   {
    "line": "= [2] ++ [1] ++ [3]",
    "note": ""
   },
   {
    "line": "[2,1,3]",
    "note": ""
   }
  ],
  "tip": "++ joins two lists end to end. [x] is a list holding just x."
 },
 "btMirror": {
  "what": "mapBT changes every value in a tree with a function, keeping the tree's shape.",
  "example": "mapBT (*2) (Fork 1 (Fork 2 Empty Empty) Empty)",
  "trace": [
   {
    "line": "mapBT (*2) (Fork 1 (Fork 2 Empty Empty) Empty)",
    "note": ""
   },
   {
    "line": "= Fork (1*2) (mapBT (*2) (Fork 2 Empty Empty)) (mapBT (*2) Empty)",
    "note": "double this value, go down both sides"
   },
   {
    "line": "= Fork 2 (Fork (2*2) Empty Empty) Empty",
    "note": "Empty stays Empty"
   },
   {
    "line": "Fork 2 (Fork 4 Empty Empty) Empty",
    "note": ""
   }
  ],
  "tip": "(*2) is a function that doubles a number."
 },
 "bstInsert": {
  "what": "fromList builds a search tree from a list by adding the items one at a time.",
  "example": "fromList [1,3,2]",
  "trace": [
   {
    "line": "fromList [1,3,2]",
    "note": ""
   },
   {
    "line": "= insert 1 (insert 3 (insert 2 Empty))",
    "note": "foldr starts from the right end"
   },
   {
    "line": "= insert 1 (insert 3 (Fork 2 Empty Empty))",
    "note": "2 goes in first, at the top"
   },
   {
    "line": "= insert 1 (Fork 2 Empty (Fork 3 Empty Empty))",
    "note": "3 is bigger, goes right"
   },
   {
    "line": "Fork 2 (Fork 1 Empty Empty) (Fork 3 Empty Empty)",
    "note": "1 is smaller, goes left"
   }
  ],
  "tip": "In a search tree, smaller values sit on the left and bigger ones on the right."
 },
 "bstMember": {
  "what": "smallest finds the smallest value in a search tree by walking left as far as possible.",
  "example": "smallest (Fork 5 (Fork 2 Empty Empty) (Fork 9 Empty Empty))",
  "trace": [
   {
    "line": "smallest (Fork 5 (Fork 2 Empty Empty) (Fork 9 Empty Empty))",
    "note": ""
   },
   {
    "line": "= smallest (Fork 2 Empty Empty)",
    "note": "5 has a left side, go left"
   },
   {
    "line": "Just 2",
    "note": "2 has no left side, stop"
   }
  ],
  "tip": "_ means anything, I don't care what. Fork x Empty _ is a node with nothing on its left."
 },
 "merge": {
  "what": "mergeDesc joins two biggest-first lists into one biggest-first list.",
  "example": "mergeDesc [9,5,1] [8,2]",
  "trace": [
   {
    "line": "mergeDesc [9,5,1] [8,2]",
    "note": ""
   },
   {
    "line": "= 9 : mergeDesc [5,1] [8,2]",
    "note": "9 beats 8, take 9"
   },
   {
    "line": "= 9 : 8 : mergeDesc [5,1] [2]",
    "note": "8 beats 5, take 8"
   },
   {
    "line": "= 9 : 8 : 5 : mergeDesc [1] [2]",
    "note": "5 beats 2, take 5"
   },
   {
    "line": "= 9 : 8 : 5 : 2 : mergeDesc [1] []",
    "note": "2 beats 1, take 2"
   },
   {
    "line": "[9,8,5,2,1]",
    "note": "one list empty, add the rest"
   }
  ],
  "tip": "x:xs splits a list into its first item x and the rest xs."
 },
 "msort": {
  "what": "halve cuts a list into a front half and a back half.",
  "example": "halve [1,2,3,4,5]",
  "trace": [
   {
    "line": "halve [1,2,3,4,5]",
    "note": ""
   },
   {
    "line": "= splitAt (div 5 2) [1,2,3,4,5]",
    "note": "the list has 5 items"
   },
   {
    "line": "= splitAt 2 [1,2,3,4,5]",
    "note": "5 halved, rounded down, is 2"
   },
   {
    "line": "([1,2],[3,4,5])",
    "note": "cut after 2 items"
   }
  ],
  "tip": "div divides and rounds down. splitAt n cuts a list after n items."
 },
 "roseSize": {
  "what": "depth tells you how many levels deep a tree is, counting the top level as 1.",
  "example": "depth (Branch 1 [Branch 2 [], Branch 3 [Branch 4 []]])",
  "trace": [
   {
    "line": "depth (Branch 1 [Branch 2 [], Branch 3 [Branch 4 []]])",
    "note": ""
   },
   {
    "line": "= 1 + maximum [depth (Branch 2 []), depth (Branch 3 [Branch 4 []])]",
    "note": "1 plus the deepest child"
   },
   {
    "line": "= 1 + maximum [1, 1 + maximum [1]]",
    "note": "2 and 4 have no children: 1"
   },
   {
    "line": "= 1 + maximum [1, 2]",
    "note": "3 has one level below: 2"
   },
   {
    "line": "3",
    "note": "biggest is 2, plus 1"
   }
  ],
  "tip": "Branch x ts is a node with value x and a list of children ts."
 },
 "roseLeaves": {
  "what": "flatten lists every value in a tree, each node before its children.",
  "example": "flatten (Branch 1 [Branch 2 [], Branch 3 [Branch 4 []]])",
  "trace": [
   {
    "line": "flatten (Branch 1 [Branch 2 [], Branch 3 [Branch 4 []]])",
    "note": ""
   },
   {
    "line": "= 1 : concatMap flatten [Branch 2 [], Branch 3 [Branch 4 []]]",
    "note": "this node's value first"
   },
   {
    "line": "= 1 : ([2] ++ [3,4])",
    "note": "flatten each child, then join"
   },
   {
    "line": "= 1 : [2,3,4]",
    "note": ""
   },
   {
    "line": "[1,2,3,4]",
    "note": ""
   }
  ],
  "tip": "concatMap f xs runs f on each item and joins the resulting lists."
 },
 "exprEval": {
  "what": "values counts how many numbers are in an expression built from Add and Mul.",
  "example": "values (Add (Value 2) (Mul (Value 3) (Value 4)))",
  "trace": [
   {
    "line": "values (Add (Value 2) (Mul (Value 3) (Value 4)))",
    "note": ""
   },
   {
    "line": "= values (Value 2) + values (Mul (Value 3) (Value 4))",
    "note": "count both sides"
   },
   {
    "line": "= 1 + (values (Value 3) + values (Value 4))",
    "note": "a number counts as 1"
   },
   {
    "line": "= 1 + (1 + 1)",
    "note": ""
   },
   {
    "line": "3",
    "note": ""
   }
  ],
  "tip": "Value _ matches any number: we count it but never look at it."
 },
 "bstInsertMaybe": {
  "what": "depthOf tells you how many steps down a value sits in a search tree, if it's there.",
  "example": "depthOf 2 (Fork 5 (Fork 2 Empty Empty) Empty)",
  "trace": [
   {
    "line": "depthOf 2 (Fork 5 (Fork 2 Empty Empty) Empty)",
    "note": ""
   },
   {
    "line": "= case depthOf 2 (Fork 2 Empty Empty) of ...",
    "note": "2 < 5, search left only"
   },
   {
    "line": "= case Just 0 of Just d -> Just (d + 1)",
    "note": "found 2 at the top there"
   },
   {
    "line": "= Just (0 + 1)",
    "note": "one step deeper from 5"
   },
   {
    "line": "Just 1",
    "note": ""
   }
  ],
  "tip": "case looks at a result and picks what to do: Nothing stays Nothing, Just d becomes Just (d + 1)."
 },
 "bstCheck": {
  "what": "allBT checks whether every value in a tree passes a test.",
  "example": "allBT (< 5) (Fork 1 Empty (Fork 9 Empty Empty))",
  "trace": [
   {
    "line": "allBT (< 5) (Fork 1 Empty (Fork 9 Empty Empty))",
    "note": ""
   },
   {
    "line": "= (1 < 5) && allBT (< 5) Empty && allBT (< 5) (Fork 9 Empty Empty)",
    "note": "test this value, then both sides"
   },
   {
    "line": "= True && True && allBT (< 5) (Fork 9 Empty Empty)",
    "note": "1 passes, Empty passes"
   },
   {
    "line": "= True && True && False",
    "note": "9 fails the test"
   },
   {
    "line": "False",
    "note": ""
   }
  ],
  "tip": "&& means and: True only if both sides are True. (< 5) asks: is it under 5?"
 },
 "bstDeleteMax": {
  "what": "deleteMin removes the smallest value from a search tree, giving you that value and the tree left over.",
  "example": "deleteMin (Fork 5 (Fork 2 Empty Empty) (Fork 8 Empty Empty))",
  "trace": [
   {
    "line": "deleteMin (Fork 5 (Fork 2 Empty Empty) (Fork 8 Empty Empty))",
    "note": ""
   },
   {
    "line": "= case deleteMin (Fork 2 Empty Empty) of ...",
    "note": "5 has a left side, go left"
   },
   {
    "line": "= case Just (2, Empty) of ...",
    "note": "2 has no left side: take it"
   },
   {
    "line": "Just (2,Fork 5 Empty (Fork 8 Empty Empty))",
    "note": "put 5 back, new left is Empty"
   }
  ],
  "tip": "l' is just a name: read it as new l."
 },
 "foldTree": {
  "what": "foldRose squashes a tree into one value, using your function at every node.",
  "example": "foldRose (\\x ys -> x + sum ys) (Branch 1 [Branch 2 [], Branch 3 [Branch 4 []]])",
  "trace": [
   {
    "line": "foldRose (\\x ys -> x + sum ys) (Branch 1 [Branch 2 [], Branch 3 [Branch 4 []]])",
    "note": ""
   },
   {
    "line": "= 1 + sum [foldRose f (Branch 2 []), foldRose f (Branch 3 [Branch 4 []])]",
    "note": "f is the function given above"
   },
   {
    "line": "= 1 + sum [2 + sum [], 3 + sum [4]]",
    "note": "each child does the same"
   },
   {
    "line": "= 1 + sum [2, 7]",
    "note": "sum [] is 0, 3+4 is 7"
   },
   {
    "line": "= 1 + 9",
    "note": ""
   },
   {
    "line": "10",
    "note": ""
   }
  ],
  "tip": "\\x ys -> x + sum ys is a function with no name: this value plus the children's results."
 },
 "bstFromSorted": {
  "what": "rangeTree lo hi builds a search tree of every number from lo to hi, middle number on top.",
  "example": "rangeTree 1 3",
  "trace": [
   {
    "line": "rangeTree 1 3",
    "note": ""
   },
   {
    "line": "= Fork 2 (rangeTree 1 1) (rangeTree 3 3)",
    "note": "middle of 1 and 3 is 2"
   },
   {
    "line": "Fork 2 (Fork 1 Empty Empty) (Fork 3 Empty Empty)",
    "note": "one number each, nothing below"
   }
  ],
  "tip": "where gives a name to a helper value, here m, the middle number."
 },
 "exprShow": {
  "what": "postfix writes an expression as text with each operator after its two sides.",
  "example": "postfix (Mul (Add (Value 1) (Value 2)) (Value 5))",
  "trace": [
   {
    "line": "postfix (Mul (Add (Value 1) (Value 2)) (Value 5))",
    "note": ""
   },
   {
    "line": "= postfix (Add (Value 1) (Value 2)) ++ \" \" ++ postfix (Value 5) ++ \" *\"",
    "note": "both sides first, operator last"
   },
   {
    "line": "= (\"1\" ++ \" \" ++ \"2\" ++ \" +\") ++ \" \" ++ \"5\" ++ \" *\"",
    "note": "show turns 1 into \"1\""
   },
   {
    "line": "= \"1 2 +\" ++ \" \" ++ \"5\" ++ \" *\"",
    "note": ""
   },
   {
    "line": "\"1 2 + 5 *\"",
    "note": ""
   }
  ],
  "tip": "show turns a number into text. ++ joins two pieces of text."
 }
};
if (typeof module !== "undefined") module.exports = { LESSONS, TWIN_LESSONS };
