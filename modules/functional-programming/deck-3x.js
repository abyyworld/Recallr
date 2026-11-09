// Week 3 extra: type classes and instances (Problem Sheet 3, typeclasses.md,
// more-typeclasses.md, even-more-typeclasses.md). Same shape as deck.js entries.
const SUIT = "data Suit = Clubs | Diamonds | Hearts | Spades";
const SUIT_ES = SUIT + " deriving (Eq, Show)";
const COUNT = "count :: Eq a => a -> [a] -> Int\ncount x xs = length (filter (== x) xs)";
const RMDUPS = "rmdups :: Eq a => [a] -> [a]\nrmdups []     = []\nrmdups (x:xs) = x : filter (/= x) (rmdups xs)";
const PARTY = "data Party = Red | Blue | Green | Yellow deriving (Eq, Ord, Show)";
const PARTY_BE = "data Party = Red | Blue | Green | Yellow deriving (Eq, Show, Enum, Bounded)";
const RESULT = "result :: Ord a => [a] -> [(Int, a)]\nresult vs = sort [(count v vs, v) | v <- rmdups vs]";

const DECK3X = [
// ---------------- Week 3: instances by hand ----------------
{ id: "suitShow", week: 3, topic: "Instances", title: "instance Show for Suit",
  sol: SUIT + "\n\ninstance Show Suit where\n  show Clubs    = \"C\"\n  show Diamonds = \"D\"\n  show Hearts   = \"H\"\n  show Spades   = \"S\"",
  checks: [["show Hearts", "\"H\""], ["[Clubs, Spades]", "[C,S]"]],
  write: { task: "Given the type `Suit` in the box (no deriving), write an `instance Show Suit` by hand so that each suit is shown as its first letter: `show Hearts` is `\"H\"`, and the list `[Clubs, Spades]` is printed as `[C,S]`.", starter: SUIT + "\n\n" },
  fill: { code: SUIT + "\n\ninstance ___ where\n  show Clubs    = \"C\"\n  show Diamonds = \"D\"\n  show Hearts   = \"H\"\n  show Spades   = \"S\"", blanks: [["Show Suit", "(Show Suit)"]] },
  predict: { code: SUIT + "\n\ninstance Show Suit where\n  show Clubs    = \"C\"\n  show Diamonds = \"D\"\n  show Hearts   = \"H\"\n  show Spades   = \"S\"", expr: "[Spades, Diamonds]" },
  explain: "`instance Show Suit where` says how to turn each suit into text: one equation for `show` per value. Lists of suits then print with your `show` for each item, because `Show a` gives `Show [a]`." },

{ id: "suitEq", week: 3, topic: "Instances", title: "instance Eq for Suit",
  sol: SUIT + "\n\ninstance Eq Suit where\n  Clubs    == Clubs    = True\n  Diamonds == Diamonds = True\n  Hearts   == Hearts   = True\n  Spades   == Spades   = True\n  _        == _        = False",
  checks: [["Hearts == Hearts", "True"], ["Clubs == Spades", "False"], ["Diamonds /= Hearts", "True"]],
  write: { task: "Given the type `Suit` in the box (no deriving), write an `instance Eq Suit` by hand: a suit is equal to itself and to nothing else. Define only `==`. `Hearts == Hearts` is `True`, `Clubs == Spades` is `False`, and `Diamonds /= Hearts` is `True` (you get `/=` for free).", starter: SUIT + "\n\n" },
  fill: { code: SUIT + "\n\ninstance Eq Suit where\n  Clubs    == Clubs    = True\n  Diamonds == Diamonds = True\n  Hearts   == Hearts   = True\n  Spades   == Spades   = True\n  ___ = False", blanks: [["_ == _", "_==_", "_        == _"]] },
  predict: { code: SUIT + "\n\ninstance Eq Suit where\n  Clubs    == Clubs    = True\n  Diamonds == Diamonds = True\n  Hearts   == Hearts   = True\n  Spades   == Spades   = True\n  _        == _        = False", expr: "Spades /= Spades" },
  explain: "Four equations say each suit equals itself; the last line `_ == _ = False` catches every other pair. `Eq` only needs one of `==` and `/=`: the other is filled in as its negation." },

{ id: "suitDeriving", week: 3, topic: "Type classes", title: "deriving Enum and Bounded",
  sol: "data Suit = Clubs | Diamonds | Hearts | Spades\n  deriving (Eq, Ord, Show, Enum, Bounded)",
  checks: [["[Diamonds ..]", "[Diamonds,Hearts,Spades]"], ["maxBound :: Suit", "Spades"], ["succ Clubs", "Diamonds"], ["Hearts < Spades", "True"]],
  write: { task: "Make a type `Suit` with the values `Clubs`, `Diamonds`, `Hearts`, `Spades`, in that order. Use one `deriving` clause so suits can be compared with `==` and `<`, printed, stepped through (`succ`, `[x ..]`) and have a first and last value (`minBound`, `maxBound`). `[Diamonds ..]` is `[Diamonds,Hearts,Spades]` and `maxBound :: Suit` is `Spades`.", starter: "" },
  fill: { code: "data Suit = Clubs | Diamonds | Hearts | Spades\n  deriving (Eq, Ord, Show, ___, Bounded)", blanks: [["Enum"]] },
  predict: { code: "data Suit = Clubs | Diamonds | Hearts | Spades\n  deriving (Eq, Ord, Show, Enum, Bounded)", expr: "pred Spades" },
  explain: "`Enum` gives `succ`, `pred` and ranges like `[x ..]`; `Bounded` gives `minBound` and `maxBound`. Derived instances follow the order you wrote the values in." },

// ---------------- Week 3: constraints ----------------
{ id: "count", week: 3, topic: "Constraints", title: "count",
  sol: COUNT,
  checks: [["count 'a' \"banana\"", "3"], ["count 4 [1,2,3]", "0"]],
  write: { task: "Write `count x xs`: it takes a value and a list and gives back an Int, how many times `x` appears in `xs`. It must work for any type whose values can be compared with `==`, so its type needs a class constraint. Use `filter` and `length`, no recursion. `count 'a' \"banana\"` is `3` and `count 4 [1,2,3]` is `0`.", starter: "count :: Eq a => a -> [a] -> Int\n" },
  fill: { code: "count :: Eq a => a -> [a] -> Int\ncount x xs = length (filter ___ xs)", blanks: [["(== x)", "(==x)", "(x ==)", "(x==)", "(\\y -> y == x)"]] },
  predict: { code: COUNT, expr: "count True [True, False, True]" },
  explain: "`(== x)` is a section: a function that tests whether its input equals `x`. `filter` keeps the matches and `length` counts them. Using `==` on an unknown type `a` is why the type needs `Eq a =>`." },

{ id: "palindrome", week: 3, topic: "Lists", title: "palindrome",
  sol: "isPalindrome :: Eq a => [a] -> Bool\nisPalindrome xs = xs == reverse xs",
  checks: [["isPalindrome \"racecar\"", "True"], ["isPalindrome [1,2,3]", "False"]],
  write: { task: "Write `isPalindrome`: it takes a list and gives back a Bool, `True` when the list reads the same forwards and backwards. It must work for any type that can be compared with `==`. `isPalindrome \"racecar\"` is `True` and `isPalindrome [1,2,3]` is `False`.", starter: "isPalindrome :: Eq a => [a] -> Bool\n" },
  fill: { code: "isPalindrome :: Eq a => [a] -> Bool\nisPalindrome xs = xs == ___", blanks: [["reverse xs", "(reverse xs)"]] },
  predict: { code: "isPalindrome xs = xs == reverse xs", expr: "isPalindrome \"ab\"" },
  explain: "Reverse the list and compare it with the original. `==` on lists needs `Eq [a]`, which Haskell gets from `Eq a`, so the constraint is `Eq a`." },

{ id: "mostGeneral", week: 3, topic: "Constraints", title: "most general type: k",
  sol: "k :: Ord a => a -> a -> Bool\nk x y = [x, y] == [y, x] && x < y",
  checks: [["k 1 2", "False"], ["k 'b' 'a'", "False"]],
  write: { task: "Write the most general TYPE for `k x y = [x, y] == [y, x] && x < y` (with its class constraint before `=>`), plus the definition. `k` takes two values of the same type and gives back a Bool. It uses `==` on lists and `<`, but needs only ONE constraint. `k 1 2` is `False`.", starter: "k x y = [x, y] == [y, x] && x < y\n" },
  fill: { code: "k :: ___ => a -> a -> Bool\nk x y = [x, y] == [y, x] && x < y", blanks: [["Ord a", "(Ord a)"]] },
  predict: { code: "k :: Ord a => a -> a -> Bool\nk x y = [x, y] == [y, x] && x < y", expr: "k 5 5" },
  explain: "`<` needs `Ord a`. `==` on `[a]` needs `Eq a`, but `Eq` is a superclass of `Ord` (`class Eq a => Ord a`), so `Ord a` already includes it. (And `k` is always `False`: the lists are equal only when `x == y`, and then `x < y` fails.)" },

// ---------------- Week 3: Bounded and Enum, Ord ----------------
{ id: "allValues", week: 3, topic: "Type classes", title: "allValues",
  sol: PARTY_BE + "\n\nallValues :: (Bounded a, Enum a) => [a]\nallValues = [minBound .. maxBound]",
  checks: [["allValues :: [Bool]", "[False,True]"], ["allValues :: [Party]", "[Red,Blue,Green,Yellow]"]],
  write: { task: "Write `allValues`: it takes no arguments and is the list of every value of a type, from the first to the last. It must work for any type that has a first and last value (`Bounded`) and can be stepped through (`Enum`). Use `minBound`, `maxBound` and a `..` range. `allValues :: [Bool]` is `[False,True]` and `allValues :: [Party]` is `[Red,Blue,Green,Yellow]`.", starter: PARTY_BE + "\n\nallValues :: (Bounded a, Enum a) => [a]\n" },
  fill: { code: PARTY_BE + "\n\nallValues :: (Bounded a, Enum a) => [a]\nallValues = ___", blanks: [["[minBound .. maxBound]", "[minBound..maxBound]", "[minBound ..]", "[minBound..]"]] },
  predict: { code: PARTY_BE + "\n\nallValues :: (Bounded a, Enum a) => [a]\nallValues = [minBound .. maxBound]", expr: "length (allValues :: [Party])" },
  explain: "`minBound` and `maxBound` come from `Bounded`; the range `[a .. b]` comes from `Enum`. The annotation `:: [Bool]` picks which type you mean, because `allValues` alone could be any such type." },

{ id: "suitOrd", week: 3, topic: "Instances", title: "Ord with only compare",
  sol: SUIT_ES + "\n\nrank :: Suit -> Int\nrank Clubs    = 1\nrank Diamonds = 2\nrank Hearts   = 3\nrank Spades   = 4\n\ninstance Ord Suit where\n  compare x y = compare (rank x) (rank y)",
  checks: [["Clubs < Spades", "True"], ["max Hearts Diamonds", "Hearts"], ["maximum [Diamonds, Spades, Clubs]", "Spades"]],
  write: { task: "Given the type `Suit` in the box, write an `instance Ord Suit` that defines ONLY `compare`, ordering suits `Clubs`, `Diamonds`, `Hearts`, `Spades` from smallest to largest. Hint: write a helper `rank` that gives each suit an Int, then compare the numbers. `Clubs < Spades` is `True` and `max Hearts Diamonds` is `Hearts`.", starter: SUIT_ES + "\n\n" },
  fill: { code: SUIT_ES + "\n\nrank :: Suit -> Int\nrank Clubs    = 1\nrank Diamonds = 2\nrank Hearts   = 3\nrank Spades   = 4\n\ninstance Ord Suit where\n  compare x y = ___", blanks: [["compare (rank x) (rank y)", "rank x `compare` rank y"]] },
  predict: { code: "rank Clubs    = 1\nrank Diamonds = 2\nrank Hearts   = 3\nrank Spades   = 4\n\ninstance Ord Suit where\n  compare x y = compare (rank x) (rank y)", expr: "compare Spades Hearts" },
  explain: "`compare` gives `LT`, `EQ` or `GT`. Comparing the ranks reuses `compare` on Int. The class has default definitions of `<`, `<=`, `max`, `min` in terms of `compare`, so they all work without writing them." },

// ---------------- Week 3: naturals as [()] ----------------
{ id: "natAdd", week: 3, topic: "Lists", title: "add naturals as [()]",
  sol: "add :: [()] -> [()] -> [()]\nadd []      ys = ys\nadd (_:xs) ys = () : add xs ys",
  checks: [["add [(),()] [()]", "[(),(),()]"], ["add [] [()]", "[()]"]],
  write: { task: "A natural number can be stored as a list of `()`: `[]` is 0, `[()]` is 1, `[(),()]` is 2, and so on. Write `add`: it takes two such numbers and gives back their sum in the same form. Use recursion on the first list, no Ints. `add [(),()] [()]` is `[(),(),()]` and `add [] [()]` is `[()]`.", starter: "add :: [()] -> [()] -> [()]\n" },
  fill: { code: "add :: [()] -> [()] -> [()]\nadd []      ys = ys\nadd (_:xs) ys = ___", blanks: [["() : add xs ys", "():add xs ys", "() : (add xs ys)", "[()] ++ add xs ys"]] },
  predict: { code: "add []      ys = ys\nadd (_:xs) ys = () : add xs ys", expr: "length (add [(),(),()] [(),()])" },
  explain: "`()` is the only value of the type `()`, so a list of them carries nothing but its length. 0 + y is y; (1 + x) + y is 1 + (x + y). That is exactly `++`, so addition is joining lists." },

// ---------------- Week 3: the election ----------------
{ id: "rmdups", week: 3, topic: "Constraints", title: "rmdups",
  sol: RMDUPS,
  checks: [["rmdups \"banana\"", "\"ban\""], ["rmdups [3,1,3,2,1]", "[3,1,2]"]],
  write: { task: "Write `rmdups`: it takes a list and gives back the same list with repeats removed, keeping the first time each item appears. It must work for any type that can be compared with `==`. Use recursion and `filter`: keep the first item, then remove it from the (already de-duplicated) rest. `rmdups \"banana\"` is `\"ban\"` and `rmdups [3,1,3,2,1]` is `[3,1,2]`.", starter: "rmdups :: Eq a => [a] -> [a]\n" },
  fill: { code: "rmdups :: Eq a => [a] -> [a]\nrmdups []     = []\nrmdups (x:xs) = x : filter ___ (rmdups xs)", blanks: [["(/= x)", "(/=x)", "(x /=)", "(x/=)", "(\\y -> y /= x)"]] },
  predict: { code: RMDUPS, expr: "rmdups [1,1,1]" },
  explain: "Keep `x`, then throw away every other copy of `x` from the rest, which has already had its own repeats removed. `/=` is why the type needs `Eq a`." },

{ id: "compress", week: 3, topic: "Lists", title: "compress repeats",
  sol: "compress :: Eq a => [a] -> [a]\ncompress (x:y:ys)\n  | x == y    = compress (y:ys)\n  | otherwise = x : compress (y:ys)\ncompress xs = xs",
  checks: [["compress \"aaabccaa\"", "\"abca\""], ["compress [1,1,2]", "[1,2]"]],
  write: { task: "Write `compress`: it takes a list and gives back a list where each run of equal items NEXT TO EACH OTHER is squashed to one item (items that repeat later stay). It must work for any type that can be compared with `==`. Use recursion and guards, looking at the first two items. `compress \"aaabccaa\"` is `\"abca\"` and `compress [1,1,2]` is `[1,2]`.", starter: "compress :: Eq a => [a] -> [a]\n" },
  fill: { code: "compress :: Eq a => [a] -> [a]\ncompress (x:y:ys)\n  | x == y    = compress (y:ys)\n  | otherwise = ___\ncompress xs = xs", blanks: [["x : compress (y:ys)", "x:compress (y:ys)", "x : compress (y : ys)", "x : (compress (y:ys))"]] },
  predict: { code: "compress (x:y:ys)\n  | x == y    = compress (y:ys)\n  | otherwise = x : compress (y:ys)\ncompress xs = xs", expr: "compress [5,5,5]" },
  explain: "If the first two are equal, drop the first and carry on. If not, the first one ends a run, so keep it. Lists with fewer than two items have nothing to squash (`compress xs = xs`)." },

{ id: "election", week: 3, topic: "Constraints", title: "election: result and winner",
  sol: "import Data.List (sort)\n\n" + PARTY + "\n\n" + COUNT + "\n\n" + RMDUPS + "\n\n" + RESULT + "\n\nwinner :: Ord a => [a] -> a\nwinner vs = snd (last (result vs))",
  checks: [["result [Red, Blue, Red]", "[(1,Blue),(2,Red)]"], ["winner [Red, Blue, Red]", "Red"], ["result \"abaca\"", "[(1,'b'),(1,'c'),(3,'a')]"]],
  write: { task: "First past the post. Using the given `count` and `rmdups`, write `result`: it takes a list of votes and gives back a list of pairs (number of votes, candidate), one pair per candidate, sorted from fewest to most votes. Use `sort` and a list comprehension. Then write `winner`, which gives back the candidate in the last pair. Both must work for any type that can be ordered. `result [Red, Blue, Red]` is `[(1,Blue),(2,Red)]` and `winner [Red, Blue, Red]` is `Red`.", starter: "import Data.List (sort)\n\n" + PARTY + "\n\n" + COUNT + "\n\n" + RMDUPS + "\n\nresult :: Ord a => [a] -> [(Int, a)]\n\nwinner :: Ord a => [a] -> a\n" },
  fill: { code: "import Data.List (sort)\n\n" + PARTY + "\n\n" + COUNT + "\n\n" + RMDUPS + "\n\nresult :: Ord a => [a] -> [(Int, a)]\nresult vs = sort [___ | v <- rmdups vs]\n\nwinner :: Ord a => [a] -> a\nwinner vs = snd (last (result vs))", blanks: [["(count v vs, v)", "(count v vs,v)"]] },
  predict: { code: "import Data.List (sort)\n\n" + PARTY + "\n\n" + COUNT + "\n\n" + RMDUPS + "\n\n" + RESULT + "\n\nwinner vs = snd (last (result vs))", expr: "winner [Red, Blue]" },
  explain: "Putting the count FIRST in each pair makes `sort` order by votes; ties are then broken by the candidate, using the `Ord` instance (derived: `Red < Blue`). So in a 1-1 tie, `(1,Blue)` sorts last and Blue wins. `sort` is why the type needs `Ord a`." },
];

const SRC3X = {
  suitShow: "Problem Sheet 3, Suit instances (Show)",
  suitEq: "Problem Sheet 3, Suit instances (Eq) · typeclasses.md",
  suitDeriving: "Problem Sheet 3, Suit deriving · Bounded and Enum",
  count: "Problem Sheet 3, election (count)",
  palindrome: "Problem Sheet 3, suggested 99 Haskell Problems 1-10 (palindrome)",
  mostGeneral: "Problem Sheet 3, most general types (k)",
  allValues: "Problem Sheet 3, Bounded and Enum (allValues)",
  suitOrd: "Problem Sheet 3, Suit instances (Ord via compare) · more-typeclasses.md",
  natAdd: "Problem Sheet 3, naturals as [()] · even-more-typeclasses.md",
  rmdups: "Problem Sheet 3, election (rmdups)",
  compress: "Problem Sheet 3, suggested 99 Haskell Problems 1-10 (compress)",
  election: "Problem Sheet 3, election (result and winner)",
};

const TWINS3X = {
suitShow: { title: "instance Show for Money",
  sol: "data Money = Pence Int\n\ninstance Show Money where\n  show (Pence n) = show n ++ \"p\"",
  checks: [["show (Pence 250)", "\"250p\""], ["[Pence 5, Pence 10]", "[5p,10p]"]],
  write: { task: "Given `data Money = Pence Int` (no deriving), write an `instance Show Money` so an amount is shown as its number followed by `p`. `show (Pence 250)` is `\"250p\"` and `[Pence 5, Pence 10]` is printed as `[5p,10p]`.", starter: "data Money = Pence Int\n\n" },
  fill: { code: "data Money = Pence Int\n\ninstance Show Money where\n  show (Pence n) = ___ ++ \"p\"", blanks: [["show n", "(show n)"]] },
  predict: { code: "data Money = Pence Int\n\ninstance Show Money where\n  show (Pence n) = show n ++ \"p\"", expr: "show (Pence 0)" },
  explain: "The pattern `(Pence n)` takes the Int out. `show n` turns it into text (using `Show Int`), and `++ \"p\"` adds the unit." },

suitEq: { title: "instance Eq with only /=",
  sol: "data Bit = O | I\n\ninstance Eq Bit where\n  O /= I = True\n  I /= O = True\n  _ /= _ = False",
  checks: [["O == O", "True"], ["O == I", "False"], ["I /= O", "True"]],
  write: { task: "Given `data Bit = O | I` (no deriving), write an `instance Eq Bit` that defines ONLY `/=` (not equal). Then `==` works for free. `O == O` is `True`, `O == I` is `False` and `I /= O` is `True`.", starter: "data Bit = O | I\n\n" },
  fill: { code: "data Bit = O | I\n\ninstance Eq Bit where\n  O /= I = True\n  I /= O = True\n  _ /= _ = ___", blanks: [["False"]] },
  predict: { code: "instance Eq Bit where\n  O /= I = True\n  I /= O = True\n  _ /= _ = False", expr: "I == I" },
  explain: "`Eq` has default definitions: `x == y = not (x /= y)` and the other way round, so defining either one is enough. Two different bits are not equal; every other pair is." },

suitDeriving: { title: "deriving: Day",
  sol: "data Day = Mon | Tue | Wed | Thu | Fri\n  deriving (Eq, Show, Enum, Bounded)",
  checks: [["[Tue .. Thu]", "[Tue,Wed,Thu]"], ["fromEnum Fri", "4"], ["minBound :: Day", "Mon"], ["succ Mon == Tue", "True"]],
  write: { task: "Make a type `Day` with the values `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, in that order. Use one `deriving` clause so days can be checked with `==`, printed, turned into numbers and back (`fromEnum`, `toEnum`), used in ranges, and have a first and last value (`minBound`, `maxBound`). They do not need `<`. `[Tue .. Thu]` is `[Tue,Wed,Thu]`, `fromEnum Fri` is `4` and `minBound :: Day` is `Mon`.", starter: "" },
  fill: { code: "data Day = Mon | Tue | Wed | Thu | Fri\n  deriving (Eq, Show, Enum, ___)", blanks: [["Bounded"]] },
  predict: { code: "data Day = Mon | Tue | Wed | Thu | Fri\n  deriving (Eq, Show, Enum, Bounded)", expr: "toEnum 2 :: Day" },
  explain: "`Enum` numbers the values from 0 (`fromEnum`, `toEnum`) and gives `succ`, `pred` and ranges; `Bounded` gives `minBound` (the first) and `maxBound` (the last). `Eq` is enough for `==`; you only need `Ord` for `<`, `max` and sorting." },

count: { title: "remove",
  sol: "remove :: Eq a => a -> [a] -> [a]\nremove x xs = filter (/= x) xs",
  checks: [["remove 'a' \"banana\"", "\"bnn\""], ["remove 3 [3,1,3]", "[1]"]],
  write: { task: "Write `remove x xs`: it takes a value and a list and gives back the list without any copies of `x`. It must work for any type that can be compared with `==`. Use `filter`. `remove 'a' \"banana\"` is `\"bnn\"` and `remove 3 [3,1,3]` is `[1]`.", starter: "remove :: Eq a => a -> [a] -> [a]\n" },
  fill: { code: "remove :: Eq a => a -> [a] -> [a]\nremove x xs = filter ___ xs", blanks: [["(/= x)", "(/=x)", "(x /=)", "(x/=)", "(\\y -> y /= x)"]] },
  predict: { code: "remove x xs = filter (/= x) xs", expr: "remove 0 [0,1,0,2]" },
  explain: "`(/= x)` tests \"not equal to `x`\", so `filter` keeps everything else. `/=` belongs to `Eq`, hence the constraint `Eq a`." },

palindrome: { title: "sameEnds",
  sol: "sameEnds :: Eq a => [a] -> Bool\nsameEnds xs = null xs || head xs == last xs",
  checks: [["sameEnds \"abca\"", "True"], ["sameEnds [1,2,3]", "False"], ["sameEnds \"\"", "True"]],
  write: { task: "Write `sameEnds`: it takes a list and gives back a Bool, `True` when its first and last items are equal (an empty list counts as `True`). It must work for any type that can be compared with `==`. Use `null`, `head` and `last`. `sameEnds \"abca\"` is `True` and `sameEnds [1,2,3]` is `False`.", starter: "sameEnds :: Eq a => [a] -> Bool\n" },
  fill: { code: "sameEnds :: Eq a => [a] -> Bool\nsameEnds xs = null xs || head xs == ___", blanks: [["last xs", "(last xs)"]] },
  predict: { code: "sameEnds xs = null xs || head xs == last xs", expr: "sameEnds \"x\"" },
  explain: "`||` stops at `null xs` when the list is empty, so `head` and `last` are never used on `[]`. Comparing two items of type `a` needs `Eq a`." },

mostGeneral: { title: "most general type: h",
  sol: "h :: Integral a => a -> Bool\nh x = x `mod` 2 == 0 && x > 0",
  checks: [["h 4", "True"], ["h (-2)", "False"], ["h (7 :: Int)", "False"], ["h (10 :: Integer)", "True"]],
  write: { task: "Write the most general TYPE for `` h x = x `mod` 2 == 0 && x > 0 `` (with its class constraint before `=>`), plus the definition. `h` takes a whole number of any whole-number type and gives back a Bool: `True` when it is even and above 0. It uses `` `mod` ``, `==`, `>` and number literals, but needs only ONE constraint. `h 4` is `True` and `h (-2)` is `False`.", starter: "h x = x `mod` 2 == 0 && x > 0\n" },
  fill: { code: "h :: ___ => a -> Bool\nh x = x `mod` 2 == 0 && x > 0", blanks: [["Integral a", "(Integral a)"]] },
  predict: { code: "h :: Integral a => a -> Bool\nh x = x `mod` 2 == 0 && x > 0", expr: "h 0" },
  explain: "`mod` needs `Integral a`. `Integral` sits on top of other classes: it extends `Real` (which extends `Num` and `Ord`, and `Ord` extends `Eq`) and `Enum`. So `Integral a` already gives the literals (`Num`), `==` (`Eq`) and `>` (`Ord`): one constraint covers them all." },

allValues: { title: "upTo",
  sol: PARTY_BE + "\n\nupTo :: (Bounded a, Enum a) => a -> [a]\nupTo x = [minBound .. x]",
  checks: [["upTo Green", "[Red,Blue,Green]"], ["upTo True", "[False,True]"], ["upTo EQ", "[LT,EQ]"]],
  write: { task: "Write `upTo`: it takes a value and gives back a list of every value of its type from the first one up to and including that value, in order. It must work for any type that has a first value (`Bounded`) and can be stepped through (`Enum`). Use `minBound` and a `..` range. `upTo Green` is `[Red,Blue,Green]` and `upTo True` is `[False,True]`.", starter: PARTY_BE + "\n\nupTo :: (Bounded a, Enum a) => a -> [a]\n" },
  fill: { code: PARTY_BE + "\n\nupTo :: (Bounded a, Enum a) => a -> [a]\nupTo x = [___ .. x]", blanks: [["minBound"]] },
  predict: { code: "upTo x = [minBound .. x]", expr: "upTo Red" },
  explain: "`minBound` (from `Bounded`) is the first value of the type, and the range `[a .. b]` (from `Enum`) steps from it up to `x`. The type of `minBound` is worked out from `x`, so no annotation is needed here." },

suitOrd: { title: "Ord with only compare: Medal",
  sol: "data Medal = Gold | Silver | Bronze deriving (Eq, Show)\n\npoints :: Medal -> Int\npoints Bronze = 1\npoints Silver = 2\npoints Gold   = 3\n\ninstance Ord Medal where\n  compare a b = compare (points a) (points b)",
  checks: [["maximum [Bronze, Gold, Silver]", "Gold"], ["Silver < Gold", "True"]],
  write: { task: "Given the type `Medal` in the box, write an `instance Ord Medal` that defines ONLY `compare`, so that `Bronze` is smallest and `Gold` is largest (the opposite of the order they are written in). Use a helper `points` that gives each medal an Int. `maximum [Bronze, Gold, Silver]` is `Gold` and `Silver < Gold` is `True`.", starter: "data Medal = Gold | Silver | Bronze deriving (Eq, Show)\n\n" },
  fill: { code: "data Medal = Gold | Silver | Bronze deriving (Eq, Show)\n\npoints :: Medal -> Int\npoints Bronze = 1\npoints Silver = 2\npoints Gold   = 3\n\ninstance Ord Medal where\n  compare a b = ___", blanks: [["compare (points a) (points b)", "points a `compare` points b"]] },
  predict: { code: "points Bronze = 1\npoints Silver = 2\npoints Gold   = 3\n\ninstance Ord Medal where\n  compare a b = compare (points a) (points b)", expr: "min Gold Bronze" },
  explain: "A derived `Ord` would make `Gold` smallest (it is written first). Writing `compare` yourself sets any order you like, and `<`, `max`, `maximum` all follow from it." },

natAdd: { title: "multiply naturals as [()]",
  sol: "mul :: [()] -> [()] -> [()]\nmul []     _  = []\nmul (_:xs) ys = ys ++ mul xs ys",
  checks: [["mul [(),()] [(),(),()]", "[(),(),(),(),(),()]"], ["mul [] [()]", "[]"]],
  write: { task: "Numbers as lists of `()`: `[]` is 0, `[()]` is 1, `[(),()]` is 2. Write `mul`: it takes two such numbers and gives back their product in the same form. Use recursion on the first list and `++` (adding). `mul [(),()] [(),(),()]` is `[(),(),(),(),(),()]` and `mul [] [()]` is `[]`.", starter: "mul :: [()] -> [()] -> [()]\n" },
  fill: { code: "mul :: [()] -> [()] -> [()]\nmul []     _  = []\nmul (_:xs) ys = ___ ++ mul xs ys", blanks: [["ys", "(ys)"]] },
  predict: { code: "mul []     _  = []\nmul (_:xs) ys = ys ++ mul xs ys", expr: "length (mul [(),()] [(),()])" },
  explain: "0 times y is 0; (1 + x) times y is y + x times y. Adding is `++`, so each `()` in the first list adds one more copy of `ys`." },

rmdups: { title: "allDifferent",
  sol: "allDifferent :: Eq a => [a] -> Bool\nallDifferent []     = True\nallDifferent (x:xs) = notElem x xs && allDifferent xs",
  checks: [["allDifferent \"abc\"", "True"], ["allDifferent [1,2,1]", "False"]],
  write: { task: "Write `allDifferent`: it takes a list and gives back a Bool, `True` when no item appears twice. It must work for any type that can be compared with `==`. Use recursion and `notElem`. `allDifferent \"abc\"` is `True` and `allDifferent [1,2,1]` is `False`.", starter: "allDifferent :: Eq a => [a] -> Bool\n" },
  fill: { code: "allDifferent :: Eq a => [a] -> Bool\nallDifferent []     = True\nallDifferent (x:xs) = ___ && allDifferent xs", blanks: [["notElem x xs", "not (elem x xs)", "x `notElem` xs", "not (x `elem` xs)"]] },
  predict: { code: "allDifferent []     = True\nallDifferent (x:xs) = notElem x xs && allDifferent xs", expr: "allDifferent [True, False, True]" },
  explain: "The first item must not appear again in the rest, and the rest must have no repeats either. `notElem` compares with `==`, so the type needs `Eq a`." },

compress: { title: "countRuns",
  sol: "countRuns :: Eq a => [a] -> Int\ncountRuns []  = 0\ncountRuns [_] = 1\ncountRuns (x:y:ys)\n  | x == y    = countRuns (y:ys)\n  | otherwise = 1 + countRuns (y:ys)",
  checks: [["countRuns \"aaabcc\"", "3"], ["countRuns [7]", "1"], ["countRuns ([] :: [Int])", "0"]],
  write: { task: "Write `countRuns`: it takes a list and gives back an Int, how many runs of equal items next to each other it has. It must work for any type that can be compared with `==`. Use recursion and guards on the first two items. `countRuns \"aaabcc\"` is `3` (aaa, b, cc) and `countRuns [7]` is `1`.", starter: "countRuns :: Eq a => [a] -> Int\n" },
  fill: { code: "countRuns :: Eq a => [a] -> Int\ncountRuns []  = 0\ncountRuns [_] = 1\ncountRuns (x:y:ys)\n  | x == y    = countRuns (y:ys)\n  | otherwise = ___", blanks: [["1 + countRuns (y:ys)", "countRuns (y:ys) + 1", "1 + countRuns (y : ys)"]] },
  predict: { code: "countRuns []  = 0\ncountRuns [_] = 1\ncountRuns (x:y:ys)\n  | x == y    = countRuns (y:ys)\n  | otherwise = 1 + countRuns (y:ys)", expr: "countRuns \"abab\"" },
  explain: "When the first two differ, a run has just ended: count it (`1 +`) and carry on. When they are equal, the run continues, so nothing is added yet. The last item always ends a run (`countRuns [_] = 1`)." },

election: { title: "tally",
  sol: "import Data.List (sort)\n\n" + COUNT + "\n\n" + RMDUPS + "\n\ntally :: Ord a => [a] -> [(a, Int)]\ntally vs = [(v, count v vs) | v <- sort (rmdups vs)]",
  checks: [["tally \"abaca\"", "[('a',3),('b',1),('c',1)]"], ["tally [3,1,3]", "[(1,1),(3,2)]"]],
  write: { task: "Using the given `count` and `rmdups`, write `tally`: it takes a list and gives back a list of pairs (item, how many times it appears), one pair per different item, in order of the items (smallest first). It must work for any type that can be ordered. Use `sort` and a list comprehension. `tally \"abaca\"` is `[('a',3),('b',1),('c',1)]`.", starter: "import Data.List (sort)\n\n" + COUNT + "\n\n" + RMDUPS + "\n\ntally :: Ord a => [a] -> [(a, Int)]\n" },
  fill: { code: "import Data.List (sort)\n\n" + COUNT + "\n\n" + RMDUPS + "\n\ntally :: Ord a => [a] -> [(a, Int)]\ntally vs = [(v, count v vs) | v <- ___]", blanks: [["sort (rmdups vs)", "rmdups (sort vs)"]] },
  predict: { code: "tally vs = [(v, count v vs) | v <- sort (rmdups vs)]", expr: "tally [True, True]" },
  explain: "`rmdups` gives each item once and `sort` puts them in order (that needs `Ord a`); the comprehension pairs each item with its count." },
};

if (typeof module !== "undefined") module.exports = { DECK3X, SRC3X, TWINS3X };
