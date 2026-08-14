export interface ZohoQuestion {
  id: string;
  round: number;
  title: string;
  description: string;
}

export const ZOHO_QUESTIONS: ZohoQuestion[] = [
  // ROUND 1 QUESTIONS
  {
    id: "r1-1",
    round: 1,
    title: "Nested Loops - Character Printing",
    description: "What is the output of this program?\n\n```c\n#include <iostream>\nusing namespace std;\nint main()\n{\n    int i, j, var = 'A';\n    for (i = 5; i >= 1; i--) {\n        for (j = 0; j < i; j++)\n            printf(\"%c \", (var + j));\n        printf(\"\\n\");\n    }\n    return 0;\n}\n```"
  },
  {
    id: "r1-2",
    round: 1,
    title: "Pointers & String Arrays",
    description: "What is the output of the program?\n\n```c\n#include <stdio.h>\nvoid f(char**);\nint main()\n{\n    char *argv[] = { \"ab\", \"cd\", \"ef\", \"gh\", \"ij\", \"kl\" };\n    f(argv);\n    return 0;\n}\nvoid f(char **p)\n{\n    char *t;\n    t = (p += sizeof(int))[-1];\n    printf(\"%s\\n\", t);\n}\n```"
  },
  {
    id: "r1-3",
    round: 1,
    title: "Variadic Functions",
    description: "What is the output of the following program?\n\n```c\n#include <stdio.h>\nvoid dynamic(int s, ...)\n{\n    printf(\"%d \", s);\n}\nint main()\n{\n    dynamic(2, 4, 6, 8);\n    dynamic(3, 6, 9);\n    return 0;\n}\n```"
  },
  {
    id: "r1-4",
    round: 1,
    title: "Function Pointers",
    description: "Predict the output:\n\n```c\n#include <stdio.h>\nint main()\n{\n    void demo();\n    void (*fun)();\n    fun = demo;\n    (*fun)();\n    fun();\n    return 0;\n}\nvoid demo()\n{\n    printf(\"program \");\n}\n```"
  },
  {
    id: "r1-5",
    round: 1,
    title: "String Initialization and Sizeof",
    description: "What is the output of the following program?\n\n```c\n#include <stdio.h>\nint main()\n{  \n   char str1[] = \"ZohoInterview\";\n   char str2[] = {'t', 'e', 's', 't', 't', 'e', 's', 't', '1'};\n   int n1 = sizeof(str1)/sizeof(str1[0]);\n   int n2 = sizeof(str2)/sizeof(str2[0]);\n   printf(\"n1 = %d, n2 = %d\", n1, n2);\n   return 0;\n}\n```"
  },
  {
    id: "r1-6",
    round: 1,
    title: "Pointer Arithmetic and Array Indexing",
    description: "Predict the Output:\n\n```c\n#include <stdio.h>\nint main()\n{\n    char str[] = \"Aptitude\";\n    printf(\"%s %s %s\\n\", &str[5], &5[str], str+5);\n    printf(\"%c %c %c\\n\", *(str+6), str[6], 6[str]);\n    return 0;\n}\n```"
  },
  {
    id: "r1-7",
    round: 1,
    title: "Macros & Pointer Operations",
    description: "Predict the output of the below program:\n\n```c\n#include <stdio.h>\n#define SIZE(arr) sizeof(arr) / sizeof(*arr)\nvoid fun(int* arr, int n)\n{\n    int i;\n    *arr += *(arr + n - 1) += 10;\n}\nvoid printArr(int* arr, int n)\n{\n    int i;\n    for(i = 0; i < n; ++i)\n        printf(\"%d \", arr[i]);\n}\nint main()\n{\n    int arr[] = {10, 20, 30};\n    int size = SIZE(arr);\n    fun(arr, size);\n    printArr(arr, size);\n    return 0;\n}\n```"
  },
  {
    id: "r1-8",
    round: 1,
    title: "Struct Self-Referencing",
    description: "Print the output:\n\n```c\n#include <stdio.h>\nstruct st\n{\n    int x;\n    struct st next;\n};\nint main()\n{\n    struct st temp;\n    temp.x = 10;\n    temp.next = temp;\n    printf(\"%d\", temp.next.x);\n    return 0;\n}\n```"
  },
  {
    id: "r1-9",
    round: 1,
    title: "Union Size",
    description: "Identify the output of the following:\n\n```c\nunion test\n{\n    int x;\n    char arr[8];\n    int y;\n};\nint main()\n{\n    printf(\"%d\", sizeof(union test));\n    return 0;\n}\n```"
  },

  // ROUND 2 QUESTIONS
  {
    id: "r2-1",
    round: 2,
    title: "Greater on Right Side",
    description: "You are given an array Arr of size N. Replace every element with the next greatest element (greatest element on its right side) in the array. Also, since there is no element next to the last element, replace it with -1.\n\n**Input:** `N = 6, Arr[] = {16, 17, 4, 3, 5, 2}`\n**Output:** `17 5 5 5 2 -1`"
  },
  {
    id: "r2-2",
    round: 2,
    title: "Modify Boolean Matrix",
    description: "Given a Boolean matrix `mat[M][N]` of size M X N, modify it such that if a matrix cell `mat[i][j]` is 1 then make its adjacent cells as 0.\n\n**Input:**\n```\n1 0 1\n0 1 0\n1 1 1\n```\n**Output:**\n```\n0 0 0\n0 0 0\n1 0 1\n```"
  },
  {
    id: "r2-3",
    round: 2,
    title: "Equilibrium Index",
    description: "Equilibrium index of an array is an index such that the sum of elements at lower indexes is equal to the sum of elements at higher indexes.\n\n**Example 1:**\n**Input:** `A[] = {-7, 1, 5, 2, -4, 3, 0}`\n**Output:** `3` (since A[0] + A[1] + A[2] = A[4] + A[5] + A[6])\n\n**Example 2:**\n**Input:** `A[] = {1, 2, 3}`\n**Output:** `-1`"
  },
  {
    id: "r2-4",
    round: 2,
    title: "MS-Paint Bucket Fill",
    description: "Given a 2D screen, location of a pixel in the screen and a color, replace color of the given pixel and all adjacent same colored pixels with the given color."
  },
  {
    id: "r2-5",
    round: 2,
    title: "Zig-Zag Matrix Traversal",
    description: "Given a matrix of 2D array of n rows and m coloumns. Print this matrix in ZIG-ZAG fashion.\n\n**Input:**\n```\n1 2 3\n4 5 6\n7 8 9\n```\n**Output:** `1 2 4 7 5 3 6 8 9`"
  },
  {
    id: "r2-6",
    round: 2,
    title: "Remove Duplicates and Increment",
    description: "Remove the duplicates in the String. If a character is duplicated, replace it with the next logical character.\n\n**Input:** `Java1234`\n**Output:** `Javb1234` (Remove the second 'a' and replace with 'b')"
  },
  {
    id: "r2-7",
    round: 2,
    title: "Version Check",
    description: "Print whether the version is upgraded, downgraded or not changed according to the input given.\n\n**Example:**\nInput: `Version1 4.8.2` `Version2 4.8.4` -> Output: `upgraded`\nInput: `Version1 4.0.2` `Version2 4.8.4` -> Output: `downgraded`"
  },
  {
    id: "r2-8",
    round: 2,
    title: "Subsets with Given Sum",
    description: "Print all possible subsets of the given array whose sum equal to given N.\n\n**Input:** `{1, 2, 3, 4, 5}`, `N=6`\n**Output:** `{1, 2, 3}, {1, 5}, {2, 4}`"
  },
  {
    id: "r2-9",
    round: 2,
    title: "Reverse Words From Substring",
    description: "Reverse the words in the given String1 from the first occurrence of String2 in String1 by maintaining white Spaces.\n\n**Input:** `String1 = This is a test String only`, `String2 = st`\n**Output:** `This is a only String test`"
  },
  {
    id: "r2-10",
    round: 2,
    title: "Chocolate Wrappers Game",
    description: "Calculate Maximum number of chocolates one can eat and Number of wrappers left in hand based on Money, Price per chocolate, Wrappers needed for exchange, and Max visits to the shop."
  },
  {
    id: "r2-13",
    round: 2,
    title: "X Pattern Printing",
    description: "Print the word with odd letters in an 'X' pattern.\n\nInput: `PROGRAM`\n```\nP     P\n R   R\n  O O\n   G\n  R R\n A   A\nM     M\n```"
  },
  {
    id: "r2-14",
    round: 2,
    title: "Alternate Sorting",
    description: "Sort the array in alternate max-min order.\n\n**Input:** `{1, 2, 3, 4, 5, 6, 7}`\n**Output:** `{7, 1, 6, 2, 5, 3, 4}`"
  },
  {
    id: "r2-15",
    round: 2,
    title: "Bike Trips",
    description: "Given an array of values `persons[]` representing weights. A bike accommodates max weight `K` and exactly two persons at a time. Find out the least number of bike trips needed."
  },
  {
    id: "r2-16",
    round: 2,
    title: "Grid Movement",
    description: "Assume there exists infinite grid, you’re given initial position x, y. Inputs will be movements either L or R or U or D. After n inputs, you need to give the current position."
  },
  {
    id: "r2-17",
    round: 2,
    title: "Max Digit Operations",
    description: "Given an array of integers, compute the maximum value for each integer in the index, by either summing all the digits or multiplying all the digits."
  },
  {
    id: "r2-18",
    round: 2,
    title: "Number of Islands",
    description: "-1 represents ocean and 1 represents land. Find the number of islands in the given matrix."
  },
  {
    id: "r2-20",
    round: 2,
    title: "Josephus Problem Variant (Circular Queue)",
    description: "There is a circular queue of processes. Every time there will be a certain number of processes skipped and a particular start position. Find the safe position."
  },
  {
    id: "r2-21",
    round: 2,
    title: "Snake Pattern Matrix",
    description: "Given N, print a snake pattern matrix. **Condition:** must not use arrays (1D array or 2D array like Matrix)."
  },
  {
    id: "r2-22",
    round: 2,
    title: "Latin Matrix",
    description: "Given N, print the Latin Matrix. **Condition:** must not use strings, arrays, or inbuilt rotate functions.\n\nInput: `N=3`\n```\nA B C\nB C A\nC A B\n```"
  },
  {
    id: "r2-24",
    round: 2,
    title: "String Permutations",
    description: "Finding all permutations of a string using backtracking approach."
  },
  {
    id: "r2-26",
    round: 2,
    title: "Sort by Factors",
    description: "Sort the given elements in descending order based on the number of factors of each element."
  },
  {
    id: "r2-31",
    round: 2,
    title: "Pangram Checking",
    description: "Check whether all english alphabets are present in the given sentence or not."
  },
  {
    id: "r2-32",
    round: 2,
    title: "Password Strength",
    description: "Find the strength of the given password string based on conditions (Weak, Medium, Good, Strong) based on presence of caps, small, number, and special character."
  },

  // ROUND 3 QUESTIONS
  {
    id: "r3-1",
    round: 3,
    title: "System Design: Super Store",
    description: "Build an online shopping interface where buyers and sellers can engage in efficient transactions across a wide range of products.\n\n### Modules:\n- Profile Service\n- Inventory Service\n- Order Service\n- Payment Service\n\n### Requirements:\n- Allow sellers to manage inventory (`addItem()`, `updateItem()`)\n- Allow buyers to `addToCart()`, `makePayment()`\n- Validate orders against inventory.\n- Password validation and encryption."
  },
  {
    id: "r3-2",
    round: 3,
    title: "System Design: Call Taxi Booking",
    description: "Design a taxi booking application where customers can book taxis available at certain points in a linear route.\n\n### Rules:\n- 4 Taxis, stationed at Point A initially.\n- Points on Route: A, B, C, D, E, F (each 15 km apart).\n- Travel time: 60 mins between adjacent points.\n- Minimum Rs.100 for the first 5 km, Rs.10 per km thereafter.\n- When a customer books, allocate free taxi at pickup. If none, allocate nearest. If tie, allocate the one with lower earnings."
  },
  {
    id: "r3-3",
    round: 3,
    title: "System Design: Railway Reservation System",
    description: "Develop a railway reservation application with the following types of seats:\n- AC Coach\n- Non-AC Coach\n- Seater\n\nEach seat type has a capacity of 60 seats with a waiting list max of 10 seats.\n\n### Modules:\n1. Booking\n2. Availability Checking\n3. Cancellation\n4. Prepare Chart"
  },
  {
    id: "r3-4",
    round: 3,
    title: "Algorithm: Matrix Game with Ray Rules",
    description: "A matrix-based game where rays interact with atoms inside a grid according to specific rules.\n\n### Rules:\n1. A ray with an atom in its path prints 'H' (Hit).\n2. A ray with an atom in a diagonal adjacent position refracts.\n3. A ray with atoms in both diagonal positions reflects.\n4. Deflection happens in the order of input rays."
  }
];
