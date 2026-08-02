-- Seed 15 DSA Topics and 175 DSA Problems from Zoho Prep Roadmap

-- 1. Insert 15 Topics
INSERT INTO dsa_topics (id, topic_name, month_number, target_problem_count, description) VALUES
(1, 'Arrays', 1, 24, 'Highest-weight topic covering array manipulations, subarray sums, and interval merging.'),
(2, 'Sorting Techniques', 1, 10, 'Scratch implementations of classic sorting algorithms and counting variants.'),
(3, 'Binary Search', 2, 11, 'Binary search on sorted arrays, rotated arrays, and binary search on answer space.'),
(4, 'Strings', 2, 19, 'Most heavily tested topic at Zoho: string manipulation, anagrams, compression, and KMP.'),
(5, 'Sliding Window / Two Pointer', 3, 11, 'Compact pattern set for array and string window optimization problems.'),
(6, 'Linked List', 3, 15, 'Singly, doubly, and cycle detection list problems asked verbatim in Zoho drives.'),
(7, 'Recursion & Backtracking', 4, 11, 'Permutations, subsets, N-Queens, Rat in a Maze, and Combination Sum.'),
(8, 'Bit Manipulation', 4, 8, 'Bitwise tricks, single non-repeating elements, power set via bitmasks.'),
(9, 'Stack & Queue', 4, 12, 'Custom stack/queue data structures, Next Greater Element, LRU Cache.'),
(10, 'Trees', 5, 14, 'Binary tree traversals, height, diameter, symmetry, and construction.'),
(11, 'Binary Search Trees', 5, 9, 'BST search, insert, delete, floor/ceil, validation, and successor.'),
(12, 'Graphs - Optional Safety Net', 5, 6, 'Adjacency list, BFS/DFS traversal, cycle detection, and Number of Islands.'),
(13, 'Dynamic Programming - Optional Safety Net', 5, 7, 'Climbing Stairs, House Robber, 0/1 Knapsack, LCS, LIS, Coin Change.'),
(14, 'Pattern Printing (Zoho Essentials)', 5, 12, 'Zoho Round 2 essential matrix/symbol pattern printing questions.'),
(15, 'Hashing / HashMap-Based Problems', 5, 6, 'Hash table lookups, frequency sorting, and subarray sum matches.');

-- 2. Insert 175 Problems

-- Topic 1: Arrays (24 problems)
INSERT INTO dsa_problems (topic_id, title, month_number, difficulty, is_new, problem_order) VALUES
(1, 'Find the Largest Element in an Array', 1, 'EASY', false, 1),
(1, 'Find the Second Largest Element (without sorting)', 1, 'EASY', false, 2),
(1, 'Leaders in an Array (element greater than everything to its right)', 1, 'EASY', false, 3),
(1, 'Reverse an Array In-Place (two-pointer swap)', 1, 'EASY', false, 4),
(1, 'Rotate an Array by K Positions', 1, 'MEDIUM', false, 5),
(1, 'Move All Zeroes to the End', 1, 'EASY', false, 6),
(1, 'Find the Missing Number (1 to N)', 1, 'EASY', false, 7),
(1, 'Find Duplicate(s) in an Array', 1, 'EASY', false, 8),
(1, 'Equilibrium Index of an Array', 1, 'EASY', false, 9),
(1, 'Union and Intersection of Two Sorted Arrays', 1, 'MEDIUM', false, 10),
(1, 'Kadane''s Algorithm (Maximum Subarray Sum)', 1, 'MEDIUM', false, 11),
(1, 'Maximum Product Subarray', 1, 'MEDIUM', false, 12),
(1, 'Best Time to Buy and Sell Stock (single transaction)', 1, 'EASY', false, 13),
(1, 'Rearrange Array in Alternating Positive/Negative Order', 1, 'MEDIUM', false, 14),
(1, 'Next Permutation of an Array', 1, 'HARD', false, 15),
(1, 'Print All Permutations of an Array of Numbers', 1, 'MEDIUM', false, 16),
(1, 'Pascal''s Triangle (generate a row / the full triangle)', 1, 'MEDIUM', false, 17),
(1, 'Merge Overlapping Intervals', 1, 'MEDIUM', false, 18),
(1, 'Trapping Rain Water', 1, 'HARD', true, 19),
(1, 'Merge Two Sorted Arrays Without Extra Space', 1, 'HARD', true, 20),
(1, 'Majority Element (Moore''s Voting Algorithm)', 1, 'EASY', true, 21),
(1, 'Find All Pairs with a Given Difference', 1, 'MEDIUM', true, 22),
(1, 'Rearrange Array Such That arr[i] = i', 1, 'MEDIUM', true, 23),
(1, 'Sort an Array by Parity (Even Before Odd)', 1, 'EASY', true, 24);

-- Topic 2: Sorting Techniques (10 problems)
INSERT INTO dsa_problems (topic_id, title, month_number, difficulty, is_new, problem_order) VALUES
(2, 'Implement Bubble Sort from scratch', 1, 'EASY', false, 1),
(2, 'Implement Selection Sort from scratch', 1, 'EASY', false, 2),
(2, 'Implement Insertion Sort from scratch', 1, 'EASY', false, 3),
(2, 'Implement Merge Sort (Divide & Conquer)', 1, 'MEDIUM', false, 4),
(2, 'Implement Quick Sort (partition logic)', 1, 'MEDIUM', false, 5),
(2, 'Count Inversions in an Array (using Merge Sort)', 1, 'HARD', false, 6),
(2, 'Sort an Array of 0s, 1s, and 2s (Dutch National Flag)', 1, 'MEDIUM', false, 7),
(2, 'Cyclic Sort (for missing/duplicate number problems)', 1, 'MEDIUM', true, 8),
(2, 'Heap Sort from Scratch', 1, 'HARD', true, 9),
(2, 'Sort a Nearly Sorted (K-Sorted) Array', 1, 'MEDIUM', true, 10);

-- Topic 3: Binary Search (11 problems)
INSERT INTO dsa_problems (topic_id, title, month_number, difficulty, is_new, problem_order) VALUES
(3, 'Binary Search on a Sorted Array (iterative + recursive)', 2, 'EASY', false, 1),
(3, 'First and Last Occurrence of an Element', 2, 'EASY', false, 2),
(3, 'Count Occurrences of an Element in a Sorted Array', 2, 'EASY', false, 3),
(3, 'Search in a Rotated Sorted Array', 2, 'MEDIUM', false, 4),
(3, 'Find the Minimum Element in a Rotated Sorted Array', 2, 'MEDIUM', false, 5),
(3, 'Find the Peak Element', 2, 'MEDIUM', false, 6),
(3, 'Square Root of a Number using Binary Search', 2, 'EASY', false, 7),
(3, 'Search Insert Position (lower bound)', 2, 'EASY', false, 8),
(3, 'Median of Two Sorted Arrays', 2, 'HARD', true, 9),
(3, 'Kth Smallest Element Using Binary Search on Answer', 2, 'HARD', true, 10),
(3, 'Allocate Minimum Number of Pages/Books (Binary Search on Answer)', 2, 'HARD', true, 11);

-- Topic 4: Strings (19 problems)
INSERT INTO dsa_problems (topic_id, title, month_number, difficulty, is_new, problem_order) VALUES
(4, 'Reverse a String In-Place (no built-in reverse)', 2, 'EASY', false, 1),
(4, 'Check if a String is a Palindrome', 2, 'EASY', false, 2),
(4, 'Toggle Case of Each Character in a String', 2, 'EASY', false, 3),
(4, 'Check if Two Strings are Anagrams', 2, 'EASY', false, 4),
(4, 'Check if a String is a Permutation of Another String', 2, 'MEDIUM', false, 5),
(4, 'Count Frequency of Each Character in a String', 2, 'EASY', false, 6),
(4, 'Find the First Non-Repeating Character in a String', 2, 'EASY', false, 7),
(4, 'Remove Duplicate Characters from a String', 2, 'EASY', false, 8),
(4, 'String Compression / Run-Length Encoding & Decoding', 2, 'MEDIUM', false, 9),
(4, 'Check if One String is a Rotation of Another', 2, 'EASY', false, 10),
(4, 'Check if a String Contains a Permutation of Another String as a Substring', 2, 'MEDIUM', false, 11),
(4, 'Longest Palindromic Substring (expand-around-center)', 2, 'MEDIUM', false, 12),
(4, 'Reverse Words in a Sentence (in-place, no split())', 2, 'MEDIUM', false, 13),
(4, 'Implement atoi() (String to Integer, no library conversion)', 2, 'MEDIUM', false, 14),
(4, 'Longest Common Prefix of an Array of Strings', 2, 'EASY', false, 15),
(4, 'Minimum Window Substring', 2, 'HARD', true, 16),
(4, 'Check if a String is a Valid Shuffle of Two Other Strings', 2, 'MEDIUM', true, 17),
(4, 'KMP Pattern Matching (basic implementation)', 2, 'HARD', true, 18),
(4, 'Group Anagrams from a List of Strings', 2, 'MEDIUM', true, 19);

-- Topic 5: Sliding Window / Two Pointer (11 problems)
INSERT INTO dsa_problems (topic_id, title, month_number, difficulty, is_new, problem_order) VALUES
(5, 'Two Sum on a Sorted Array (two-pointer)', 3, 'EASY', false, 1),
(5, 'Pair with Given Sum in an Unsorted Array (hashing)', 3, 'EASY', false, 2),
(5, 'Maximum Sum Subarray of Size K (fixed window)', 3, 'EASY', false, 3),
(5, 'Longest Substring Without Repeating Characters', 3, 'MEDIUM', false, 4),
(5, 'Smallest Subarray with Sum >= Given Value', 3, 'MEDIUM', false, 5),
(5, 'Longest Substring with At Most K Distinct Characters', 3, 'MEDIUM', false, 6),
(5, 'Triplet Sum to a Given Value (3Sum)', 3, 'MEDIUM', false, 7),
(5, 'Container With Most Water', 3, 'MEDIUM', false, 8),
(5, 'Longest Repeating Character Replacement', 3, 'MEDIUM', true, 9),
(5, 'Subarray with Given XOR', 3, 'MEDIUM', true, 10),
(5, 'Count Subarrays with At Most K Odd Numbers', 3, 'MEDIUM', true, 11);

-- Topic 6: Linked List (15 problems)
INSERT INTO dsa_problems (topic_id, title, month_number, difficulty, is_new, problem_order) VALUES
(6, 'Traverse a Linked List and Find its Length', 3, 'EASY', false, 1),
(6, 'Insert/Delete a Node at a Given Position', 3, 'EASY', false, 2),
(6, 'Reverse a Linked List (iterative)', 3, 'EASY', false, 3),
(6, 'Reverse a Linked List (recursive)', 3, 'EASY', false, 4),
(6, 'Find the Middle of a Linked List (slow/fast pointer)', 3, 'EASY', false, 5),
(6, 'Detect a Cycle in a Linked List (Floyd''s Algorithm)', 3, 'EASY', false, 6),
(6, 'Find the Starting Node of the Loop', 3, 'MEDIUM', false, 7),
(6, 'Merge Two Sorted Linked Lists', 3, 'EASY', false, 8),
(6, 'Remove the N-th Node From the End of the List', 3, 'MEDIUM', false, 9),
(6, 'Check if a Linked List is a Palindrome', 3, 'EASY', false, 10),
(6, 'Add Two Numbers Represented as Linked Lists', 3, 'MEDIUM', false, 11),
(6, 'Intersection Point of Two Linked Lists', 3, 'EASY', true, 12),
(6, 'Clone a Linked List with Random Pointers', 3, 'HARD', true, 13),
(6, 'Sort a Linked List (Merge Sort on Linked List)', 3, 'MEDIUM', true, 14),
(6, 'Flatten a Multilevel Linked List', 3, 'MEDIUM', true, 15);

-- Topic 7: Recursion & Backtracking (11 problems)
INSERT INTO dsa_problems (topic_id, title, month_number, difficulty, is_new, problem_order) VALUES
(7, 'Factorial and Power of a Number (recursive)', 4, 'EASY', false, 1),
(7, 'Fibonacci Number (plain recursion)', 4, 'EASY', false, 2),
(7, 'Sum of Digits and Reverse a Number (recursive)', 4, 'EASY', false, 3),
(7, 'Check if a String/Number is a Palindrome (recursive)', 4, 'EASY', false, 4),
(7, 'Print All Subsequences/Subsets of an Array', 4, 'MEDIUM', false, 5),
(7, 'Generate All Permutations of a String/Array', 4, 'MEDIUM', false, 6),
(7, 'Generate Permutations of a String/Array with Duplicate Elements', 4, 'MEDIUM', false, 7),
(7, 'N-Queens (basic - print one valid placement)', 4, 'HARD', false, 8),
(7, 'Rat in a Maze (Path Existence)', 4, 'MEDIUM', true, 9),
(7, 'Combination Sum', 4, 'MEDIUM', true, 10),
(7, 'Print the Power Set of a String (Recursive)', 4, 'MEDIUM', true, 11);

-- Topic 8: Bit Manipulation (8 problems)
INSERT INTO dsa_problems (topic_id, title, month_number, difficulty, is_new, problem_order) VALUES
(8, 'Check if a Number is Even or Odd using Bitwise AND', 4, 'EASY', false, 1),
(8, 'Count the Number of Set Bits in an Integer', 4, 'EASY', false, 2),
(8, 'Check if a Number is a Power of Two', 4, 'EASY', false, 3),
(8, 'Find the Single Non-Repeating Number in an Array (XOR)', 4, 'EASY', false, 4),
(8, 'Swap Two Numbers Without a Temporary Variable (XOR swap)', 4, 'EASY', false, 5),
(8, 'Find the Two Non-Repeating Elements in an Array (XOR-based)', 4, 'MEDIUM', false, 6),
(8, 'Count Total Set Bits from 1 to N', 4, 'MEDIUM', true, 7),
(8, 'Generate Power Set Using Bitmasking', 4, 'MEDIUM', true, 8);

-- Topic 9: Stack & Queue (12 problems)
INSERT INTO dsa_problems (topic_id, title, month_number, difficulty, is_new, problem_order) VALUES
(9, 'Implement a Stack using an Array', 4, 'EASY', false, 1),
(9, 'Implement a Queue using an Array (circular queue)', 4, 'EASY', false, 2),
(9, 'Implement a Stack using a Queue (and vice versa)', 4, 'MEDIUM', false, 3),
(9, 'Valid Parentheses (balanced brackets)', 4, 'EASY', false, 4),
(9, 'Min Stack (retrieve the minimum in O(1))', 4, 'MEDIUM', false, 5),
(9, 'Next Greater Element', 4, 'MEDIUM', false, 6),
(9, 'Evaluate a Postfix Expression', 4, 'EASY', false, 7),
(9, 'Convert Infix to Postfix', 4, 'MEDIUM', false, 8),
(9, 'The Celebrity Problem (stack-based elimination)', 4, 'MEDIUM', false, 9),
(9, 'Sliding Window Maximum (Deque-Based)', 4, 'HARD', true, 10),
(9, 'Largest Rectangle in Histogram', 4, 'HARD', true, 11),
(9, 'Implement an LRU Cache (Queue + HashMap)', 4, 'HARD', true, 12);

-- Topic 10: Trees (14 problems)
INSERT INTO dsa_problems (topic_id, title, month_number, difficulty, is_new, problem_order) VALUES
(10, 'Inorder, Preorder, and Postorder Traversal (recursive)', 5, 'EASY', false, 1),
(10, 'Level Order Traversal (BFS with a Queue)', 5, 'MEDIUM', false, 2),
(10, 'Height / Maximum Depth of a Binary Tree', 5, 'EASY', false, 3),
(10, 'Diameter of a Binary Tree', 5, 'MEDIUM', false, 4),
(10, 'Check if Two Binary Trees are Identical', 5, 'EASY', false, 5),
(10, 'Check if a Binary Tree is Height-Balanced', 5, 'MEDIUM', false, 6),
(10, 'Check if a Binary Tree is Symmetric (Mirror Image)', 5, 'EASY', false, 7),
(10, 'Root-to-Leaf Path Sum (does any path equal a target?)', 5, 'EASY', false, 8),
(10, 'Lowest Common Ancestor in a Binary Tree', 5, 'MEDIUM', false, 9),
(10, 'Zig-Zag (Spiral) Level Order Traversal', 5, 'MEDIUM', false, 10),
(10, 'Iterative Inorder/Preorder Traversal using a Stack', 5, 'MEDIUM', false, 11),
(10, 'Construct Binary Tree from Inorder and Preorder Traversal', 5, 'HARD', true, 12),
(10, 'Vertical Order Traversal of a Binary Tree', 5, 'HARD', true, 13),
(10, 'Boundary Traversal of a Binary Tree', 5, 'MEDIUM', true, 14);

-- Topic 11: Binary Search Trees (9 problems)
INSERT INTO dsa_problems (topic_id, title, month_number, difficulty, is_new, problem_order) VALUES
(11, 'Search for a Value in a BST', 5, 'EASY', false, 1),
(11, 'Insert a Node into a BST', 5, 'EASY', false, 2),
(11, 'Delete a Node from a BST', 5, 'MEDIUM', false, 3),
(11, 'Validate whether a Binary Tree is a Valid BST', 5, 'MEDIUM', false, 4),
(11, 'Find the Floor and Ceil of a Value in a BST', 5, 'MEDIUM', false, 5),
(11, 'Kth Smallest Element in a BST (via inorder traversal)', 5, 'MEDIUM', false, 6),
(11, 'Lowest Common Ancestor in a BST', 5, 'EASY', false, 7),
(11, 'Convert a Sorted Array to a Balanced BST', 5, 'EASY', true, 8),
(11, 'Inorder Successor of a Node in a BST', 5, 'MEDIUM', true, 9);

-- Topic 12: Graphs - Optional Safety Net (6 problems)
INSERT INTO dsa_problems (topic_id, title, month_number, difficulty, is_new, problem_order) VALUES
(12, 'Represent a Graph using an Adjacency List', 5, 'EASY', false, 1),
(12, 'BFS Traversal of a Graph', 5, 'EASY', false, 2),
(12, 'DFS Traversal of a Graph (recursive)', 5, 'EASY', false, 3),
(12, 'Detect a Cycle in an Undirected Graph', 5, 'MEDIUM', true, 4),
(12, 'Detect a Cycle in a Directed Graph', 5, 'MEDIUM', true, 5),
(12, 'Number of Islands (Grid BFS/DFS)', 5, 'MEDIUM', true, 6);

-- Topic 13: Dynamic Programming - Optional Safety Net (7 problems)
INSERT INTO dsa_problems (topic_id, title, month_number, difficulty, is_new, problem_order) VALUES
(13, 'Climbing Stairs / Fibonacci with Memoization', 5, 'EASY', false, 1),
(13, 'Maximum Subarray Sum, Revisited as DP (Kadane''s)', 5, 'EASY', false, 2),
(13, 'House Robber (Maximum Sum, No Two Adjacent)', 5, 'MEDIUM', false, 3),
(13, '0/1 Knapsack (basic 2D DP)', 5, 'MEDIUM', false, 4),
(13, 'Longest Common Subsequence', 5, 'MEDIUM', true, 5),
(13, 'Longest Increasing Subsequence', 5, 'MEDIUM', true, 6),
(13, 'Coin Change (Minimum Number of Coins)', 5, 'MEDIUM', true, 7);

-- Topic 14: Pattern Printing (Zoho Essentials) (12 problems)
INSERT INTO dsa_problems (topic_id, title, month_number, difficulty, is_new, problem_order) VALUES
(14, 'Print a String in an ''X'' Format (most frequently asked Zoho pattern question)', 5, 'EASY', false, 1),
(14, 'Print a Diamond Pattern (stars and incrementing numbers)', 5, 'EASY', false, 2),
(14, 'Print a Hollow Square / Rectangle Pattern (tests boundary conditions in loops)', 5, 'EASY', false, 3),
(14, 'Print a Number Pyramid / Floyd''s Triangle', 5, 'EASY', false, 4),
(14, 'Print a Butterfly Pattern (mirrored loops)', 5, 'MEDIUM', false, 5),
(14, 'Print a Spiral Matrix (numbers 1 to N^2 in a spiral)', 5, 'MEDIUM', false, 6),
(14, 'Print a Snake Pattern Matrix (left-right row 1, right-left row 2)', 5, 'EASY', false, 7),
(14, 'Print Concentric Squares (center 1, surrounded by 2s, surrounded by 3s)', 5, 'MEDIUM', false, 8),
(14, 'Look-and-Say Sequence Pattern (1, 11, 21, 1211, 111221...)', 5, 'MEDIUM', false, 9),
(14, 'Print a Right-Angled Triangle with Continuously Increasing Numbers', 5, 'EASY', false, 10),
(14, 'Print a Staircase Pattern', 5, 'EASY', true, 11),
(14, 'Print a Zig-Zag / Wave Number Pattern', 5, 'MEDIUM', true, 12);

-- Topic 15: Hashing / HashMap-Based Problems (6 problems)
INSERT INTO dsa_problems (topic_id, title, month_number, difficulty, is_new, problem_order) VALUES
(15, 'Two Sum (Unsorted Array, using HashMap)', 5, 'EASY', true, 1),
(15, 'Longest Consecutive Sequence', 5, 'MEDIUM', true, 2),
(15, 'Subarray Sum Equals K', 5, 'MEDIUM', true, 3),
(15, 'First Missing Positive', 5, 'HARD', true, 4),
(15, 'Check for Duplicates Within K Distance in an Array', 5, 'EASY', true, 5),
(15, 'Sort Characters in a String by Frequency', 5, 'MEDIUM', true, 6);

-- 3. Seed Default Aptitude Topics
INSERT INTO aptitude_topics (id, category, title, description, total_questions) VALUES
(1, 'QUANTITATIVE', 'Averages & Mixtures', 'Problems on weighted averages and allegation rule.', 15),
(2, 'QUANTITATIVE', 'Percentages & Profit/Loss', 'Percentage increases, cost price, marked price, and discount calculations.', 15),
(3, 'QUANTITATIVE', 'Time & Work / Pipes & Cisterns', 'Combined work efficiency and rates of filling/emptying.', 15),
(4, 'LOGICAL_REASONING', 'Coding & Decoding', 'Letter shufflings, alphabet shifts, and pattern logic.', 15),
(5, 'LOGICAL_REASONING', 'Blood Relations', 'Family tree logic and relationship decoding.', 15),
(6, 'VERBAL', 'Sentence Correction & Grammar', 'Error spotting and subject-verb agreement.', 15);
