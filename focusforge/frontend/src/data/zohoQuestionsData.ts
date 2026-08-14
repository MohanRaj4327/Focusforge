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
    title: "Greater on right side",
    description: "You are given an array Arr of size N. Replace every element with the next greatest element (greatest element on its right side) in the array. Also, since there is no element next to the last element, replace it with -1.\nInput:\nN = 6\nArr[] = {16, 17, 4, 3, 5, 2}\nOutput:\n17 5 5 5 2 -1\nExplanation: For 16 the greatest element \non its right is 17. For 17 it's 5. \nFor 4 it's 5. For 3 it's 5. For 5 it's 2. \nFor 2 it's -1(no element to its right). \nSo the answer is 17 5 5 5 2 -1\nLink: https://www.geeksforgeeks.org/problems/greater-on-right-side4305/1"
  },
  {
    id: "r2-2",
    round: 2,
    title: "Given a Boolean matrix mat[M][N] of size M X N, modify it such that if a matrix cell mat[i][j] is 1 then make its adjacent cells as 0.",
    description: "Input:\n1 0 1\n0 1 0\n1 1 1\nOutput:\n0 0 0\n0 0 0\n1 0 1\nExplanation:\nFor the cell mat[0][0] which is 1, its adjacent cells (mat[0][1] and mat[1][0]) are modified to 0.\nFor the cell mat[1][1] which is 1, its adjacent cells (mat[0][1], mat[1][0], mat[1][2], and mat[2][1]) are modified to 0.\nThe modification is not applied to the cell mat[2][2] as it doesn't have all four adjacent cells."
  },
  {
    id: "r2-3",
    round: 2,
    title: "Equilibrium index of an array is an index such that the sum of elements at lower indexes is equal to the sum of elements at higher indexes. For example, in an array A:",
    description: "Example :\nInput: A[] = {-7, 1, 5, 2, -4, 3, 0}\nOutput: 3\n3 is an equilibrium index, because:\nA[0] + A[1] + A[2] = A[4] + A[5] + A[6]\nInput: A[] = {1, 2, 3}\nOutput: -1"
  },
  {
    id: "r2-4",
    round: 2,
    title: "In MS-Paint, when we take the brush to a pixel and click, the color of the region of that pixel is replaced with a new selected color. Following is the problem statement to do this task.",
    description: "Given a 2D screen, location of a pixel in the screen and a color, replace color of the given pixel and all adjacent same colored pixels with the given color.\nExample:\nInput:\n       screen[M][N] = {{1, 1, 1, 1, 1, 1, 1, 1},\n                      {1, 1, 1, 1, 1, 1, 0, 0},\n                      {1, 0, 0, 1, 1, 0, 1, 1},\n                      {1, 2, 2, 2, 2, 0, 1, 0},\n                      {1, 1, 1, 2, 2, 0, 1, 0},\n                      {1, 1, 1, 2, 2, 2, 2, 0},\n                      {1, 1, 1, 1, 1, 2, 1, 1},\n                      {1, 1, 1, 1, 1, 2, 2, 1},\n                      };\n    x = 4, y = 4, newColor = 3\nThe values in the given 2D screen indicate colors of the pixels.\nx and y are coordinates of the brush, newColor is the color that\nshould replace the previous color on screen[x][y] and all surrounding\npixels with same color.\n\nOutput:\nScreen should be changed to following.\n       screen[M][N] = {{1, 1, 1, 1, 1, 1, 1, 1},\n                      {1, 1, 1, 1, 1, 1, 0, 0},\n                      {1, 0, 0, 1, 1, 0, 1, 1},\n                      {1, 3, 3, 3, 3, 0, 1, 0},\n                      {1, 1, 1, 3, 3, 0, 1, 0},\n                      {1, 1, 1, 3, 3, 3, 3, 0},\n                      {1, 1, 1, 1, 1, 3, 1, 1},\n                      {1, 1, 1, 1, 1, 3, 3, 1},\n                      };"
  },
  {
    id: "r2-5",
    round: 2,
    title: "Given a matrix of 2D array of n rows and m coloumns. Print this matrix in ZIG-ZAG fashion as shown in figure.",
    description: "Example:\nInput: \n1 2 3\n4 5 6\n7 8 9\nOutput: \n1 2 4 7 5 3 6 8 9"
  },
  {
    id: "r2-6",
    round: 2,
    title: "Remove the duplicates in the String.",
    description: "Testcase 1:\nInput: Java1234\nOutput: Javb1234 (Remove the second ‘a’ as it is duplicated)\nTestcase 2:\nInput: Python1223:\nOutput: Python1234 (Replace the second 2 with 3, and replace 3 with 4 as 3 is replaced for the duplicated 2)\nTestcase 3:\nInput: aBuzZ9900\nOutput: aBuzC9012\n(Replace the second ‘Z’ with ‘C’ as ‘a’ and ‘B’ are already there in the String. Replace with capital C as the letter to be replaced is capital Z. The second 9 turns out to be zero and the zero turns out to ‘1’ and the second zero turns out to ‘2’)"
  },
  {
    id: "r2-7",
    round: 2,
    title: "Print whether the version is upgraded, downgraded or not changed according to the input given.",
    description: "example: Input : Version1 4.8.2 Version2 4.8.4 Output: upgraded, Input : Version1 4.0.2 Version2 4.8.4 Output: downgraded"
  },
  {
    id: "r2-8",
    round: 2,
    title: "Print all possible subsets of the given array whose sum equal to given N.",
    description: "example: Input: {1, 2, 3, 4, 5} N=6 Output: {1, 2, 3}, {1, 5}, {2, 4}"
  },
  {
    id: "r2-9",
    round: 2,
    title: "Reverse the words in the given String1 from the first occurrence of String2 in String1 by maintaining white Spaces.",
    description: "example: String1 = Input: This is a test String only String2 = st Output: This is a only String test"
  },
  {
    id: "r2-10",
    round: 2,
    title: "calculate Maximum number of chocolates can eat and Number of wrappers left in hand.",
    description: "Money: Total money one has to spend.\nPrice: price per chocolate.\nwrappers: minimum number of wrappers for exchange choco: number of chocolate for wrappers.\nMax visit: Maximum number of times one can visit the shop.(if zero consider it infinite)\nexample: input: Money:40 Price:1 wrappers:3 choco:1 Max visit:1 Output: total chocolate can eat: 53 wrappers left in hand:14"
  },
  {
    id: "r2-11",
    round: 2,
    title: "Sample Input-",
    description: "2\nHacker\nRank\nSample Output-\nHce akr\nRn ak"
  },
  {
    id: "r2-13",
    round: 2,
    title: "Print the word with odd letters – PROGRAM",
    description: "Sample Output-+4477\nP     P\n R   R\n  O O\n   G\n  R R\n A   A\nM     M"
  },
  {
    id: "r2-14",
    round: 2,
    title: "Sample Input – Alternate Sorting",
    description: "Input: {1, 2, 3, 4, 5, 6, 7}\noutput: {7, 1, 6, 2, 5, 3, 4}"
  },
  {
    id: "r2-15",
    round: 2,
    title: "Given an array of values persons[], each represents the weight of the persons. There will be infinite bikes available. Given a value K which represents the maximum weight that a bike accommodates. Along with that one more condition, a bike can carry two persons at a time. You need to find out the least number of times, the bike trips are made.",
    description: ""
  },
  {
    id: "r2-16",
    round: 2,
    title: "Assume there exists infinite grid, you’re given initial position x, y. Inputs will be movements either L or R or U or D. After n inputs, you need to give the current position.",
    description: "•\tInput: \n•\t4 5 //initial position x, y\n•\t9 //number of movements\n•\tU L R R D D U L R //7 movements\n•\tOutput:\n5 5\n•\tGiven a matrix NxN, you are initially in the 0, 0 position. The matrix is filled with ones and zeros. Value “one” represents the path is available, while “zero” represents the wall. You need to find the can you able to reach the (N-1)x(N-1) index in the matrix. You can move only along the right and down directions if there’s “one” available.\n•\tInput:\n•\t5 //N value\n•\t1 0 1 0 0\n•\t1 1 1 1 1\n•\t0 0 0 1 0\n•\t1 0 1 1 1\n•\t0 1 1 0 1\n•\tOutput:\nYes"
  },
  {
    id: "r2-17",
    round: 2,
    title: "Given an array of integers, compute the maximum value for each integer in the index, by either summing all the digits or multiplying all the digits. (Choose which operation gives the maximum value)",
    description: "•\tInput:\n•\t5\n•\t120 24 71 10 59\n•\tOutput:\n•\t3 8 8 1 45\nExplanation: For index 0, the integer is 120. Summing the digits will give 3, and whereas Multiplying the digits gives 0. Thus, maximum of this two is 3."
  },
  {
    id: "r2-18",
    round: 2,
    title: "-1 represents ocean and 1 represents land find the number of islands in the given matrix.",
    description: "Input:   n*n matrix\n       1 -1 -1  1\n      -1  1 -1  1\n      -1 -1  1 -1\n      -1 -1 -1  1\nOutput: 2 (two islands that I have \nbold in matrix at 1, 1 and 2, 2)"
  },
  {
    id: "r2-19",
    round: 2,
    title: "Print all the possible subsets of array which adds up to give a sum.",
    description: "Input: array{2, 3, 5, 8, 10}\n       sum=10\nOutput: {2, 3, 5}\n       {2, 8}\n       {10}"
  },
  {
    id: "r2-20",
    round: 2,
    title: "There is a circular queue of processes. Every time there will be certain no of process skipped and a particular start position. Find the safe position.",
    description: "Input: Number of process:5\n       Start position:3\n       Skip: 2nd\nOutput: 1 will be the safest position\n(Logic: 1 2 3 4 5 starting from 3, 5th process will be skipped\n        1 2 3 4 5 process 2 will be skipped\n        1 2 3 4 5 process 4 will be skipped\n        1 2 3 4 5 process 3 will be skipped, so safest process is 1."
  },
  {
    id: "r2-21",
    round: 2,
    title: "Given N. print the following snake pattern (say N = 4). condition:  must not use arrays ( 1D array  or 2D array like Matrix ).",
    description: "1   2   3   4\n8   7   6   5\n9   10  11  12\n16  15  14  13"
  },
  {
    id: "r2-22",
    round: 2,
    title: "Given N. print the Latin Matrix (say N = 3). condition:  must not use strings(aka character literals), arrays (both 1D and 2D), inbuilt functions(like rotate).",
    description: "A   B   C\nB   C   A\nC   A   B"
  },
  {
    id: "r2-23",
    round: 2,
    title: "Given a number N. find the minimum count of numbers in which N can be represented as a sum of numbers x1, x2, … xn. where xi is number whose digits are 0s and 1s.",
    description: "example 1)  i/p :  N = 33\no/p : count = 3.     33( 11 + 11 + 11 )\nsome other possibilities of 33 is (11 + 11 + 10 + 1),   (11 + 10 + 10 + 1 + 1 ), (10 + 10 + 10 + 1 + 1 + 1)"
  },
  {
    id: "r2-24",
    round: 2,
    title: "Finding all permutations of a string. ( backtracking approach ).",
    description: ""
  },
  {
    id: "r2-25",
    round: 2,
    title: "Given an array of integers, write a program to re-arrange the array in the given form.",
    description: "1st_largest, 1st_smallest, 2nd_largest, 2nd_smallest, 3rd_largest ……. etc."
  },
  {
    id: "r2-26",
    round: 2,
    title: "Sort the given elements in decending order based on the number of factors of each element – Solution 1",
    description: ""
  },
  {
    id: "r2-27",
    round: 2,
    title: "Find whether the given number is palindrome or not. Don’t use arrays or strings",
    description: ""
  },
  {
    id: "r2-28",
    round: 2,
    title: "Reverse the given string keeping the position of special characters intact",
    description: ""
  },
  {
    id: "r2-29",
    round: 2,
    title: "Find the shortest path from one element to another element in a matrix using right and down moves alone. The attached solution uses moves in all directions. – Solution 4",
    description: ""
  },
  {
    id: "r2-30",
    round: 2,
    title: "Pattern",
    description: ""
  },
  {
    id: "r2-31",
    round: 2,
    title: "Pangram Checking",
    description: "Check whether all english alphabets are present in the given sentence or not\nI/P: abc defGhi JklmnOP QRStuv wxyz\nO/P: True\nI/P: abc defGhi JklmnOP QRStuv\nO/P: False"
  },
  {
    id: "r2-32",
    round: 2,
    title: "Password Strength",
    description: "Find the strength of the given password string based on the conditions\nFour rules were given based on the type and no. of characters in the string.\nWeak – only Rule 1 is satisfied or Rule 1 is not satisfied\nMedium – Two rules are satisfied\nGood – Three rules satisfied\nStrong – All Four rules satisfied\n\nI/P: Qw!1        O/P: Weak\nI/P: Qwertyuiop  O/P: Medium\nI/P: QwertY123       O/P: Good\nI/P: Qwerty@123    O/P: Strong"
  },
  {
    id: "r2-33",
    round: 2,
    title: "First Occurrences",
    description: "Given two strings, find the first occurrence of all characters of second string in the first string and\nprint the characters between the least and the highest index\nI/P: ZOHOCORPORATION PORT\nO/P: OHOCORPORAT\nExplanation: The index of P in first string is 7, O is 1, R is 6 and T is 11. The largest range is 1 – 11.\nSo print the characters of the first string in this inex range i.e. OHOCORPORAT"
  },
  {
    id: "r2-34",
    round: 2,
    title: "Matrix Diagonal sum",
    description: "Given a matrix print the largest of the sums of the two triangles split by diagonal from top right to bottom left\nI/P:\n3 3\n1 2 3\n4 5 6\n7 8 9\nO/P: 38"
  },
  {
    id: "r2-35",
    round: 2,
    title: "Matrix Addition",
    description: "Given n integer arrays of different size, find the addititon of numbers represented by the arrays\nI/P: 4\n3 5 4 2\n2 4 5\n4 5 6 7 8\n4 9 2 1\n1 2\nO/P: 50856"
  },
  {
    id: "r2-36",
    round: 2,
    title: "Many students will able to solve 3 problems in this round. So make sure you stand apart from the crowd.Their vacancy is going to be 5 for a team. The performance in this round could be taken as a tie breaker for round 3.",
    description: "input : aaabbcc\noutput : abc"
  },
  {
    id: "r2-37",
    round: 2,
    title: "Evaluate the expression and sort and print the output. Getting the input is the tricky part",
    description: "Input:\nNumber of input : 4\n2*3\n2^2^2\n35\n3*1\nOutput:\n3*1\n2*3\n2^2^2\n35"
  },
  {
    id: "r2-38",
    round: 2,
    title: "Given a 6 blocks, of different height h1, …, h6 . Make 2 towers using 3 Blocks for each tower in desired height h1, h2. Print the blocks to be used in ascending order",
    description: "Input:\n1 2 5 4 3  6\nheight of tower: 6 15\nOutput :\n1 2 3 & 4 5 6"
  },
  {
    id: "r2-39",
    round: 2,
    title: "Given a 5X5 chess board as input. 9 knights are placed in the board. Print whether the configuration valid or Invalid.",
    description: ""
  },
  {
    id: "r2-40",
    round: 2,
    title: "Given a number, print all the code that can be formed with z={a=1, .., z=26}.",
    description: "1123\n{1, 1, 2, 3} = aabc\n{11, 2, 3} = kbc\n{1, 1, 23} = aaw\n{11, 23} = kw"
  },
  {
    id: "r2-41",
    round: 2,
    title: "Given a String with or without special characters find if it is Palindrome or Not.. No splitting of array must be done or No additional spaces must be used for storing the array..",
    description: "Eg: RACE CAR\nEg: I DID, DID I ?"
  },
  {
    id: "r2-42",
    round: 2,
    title: "Given an array of integers of size n. Convert the array in such a way that if next valid number is same as current number, double its value and replace the next number with 0. After the modification, rearrange the array such that all 0’s are shifted to the end.",
    description: "Input : arr[] = {2, 2, 0, 4, 0, 8}\nOutput : 4 4 8 0 0 0\nInput : arr[] = {0, 2, 2, 2, 0, 6, 6, 0, 0, 8}\nOutput : 4 2 12 8 0 0 0 0 0 0"
  },
  {
    id: "r2-43",
    round: 2,
    title: "TWISTED PRIME NUMBER",
    description: "A number is said to be twisted prime if it is a prime number and reverse of the number is also a prime number.\nInput : 97\nOutput : Twisted Prime Number\nExplanation: 97 is a prime number\nand its reverse 79 is also a prime\nnumber."
  },
  {
    id: "r2-44",
    round: 2,
    title: "Given an array A[] and a number x, check for pair in A[] with sum as x.",
    description: "Eg : Input {1, 2, 4, 3, 5, 6}\nSUM : 5\nOutput : 2 (1, 4) & (2, 3)"
  },
  {
    id: "r2-45",
    round: 2,
    title: "Largest Sum Contiguous Subarray",
    description: "(Kadane’ Algorithm )"
  },
  {
    id: "r2-46",
    round: 2,
    title: "Diamond pattern : for given input size -> Here 3",
    description: "*\n ***\n*****\n ***\n  *"
  },
  {
    id: "r2-46",
    round: 2,
    title: "Given a text and a wildcard pattern, implement wildcard pattern matching algorithm that finds if wildcard pattern is matched with text. The matching should cover the entire text (not partial text).",
    description: "The wildcard pattern can include the characters ‘?’ and ‘*’\n‘?’ – matches any single character\n‘*’ – Matches any sequence of characters (including the empty sequence)\nExample:\nText = “baaabab”,\nPattern = “*****ba*****ab”,\noutput : true\nPattern = “baaa?ab”, output : true\nPattern = “ba*a?”, output : true\nPattern = “a*ab”, output : false"
  },
  {
    id: "r2-47",
    round: 2,
    title: "Given an input string and a dictionary of words, find out if the input string can be segmented into a space-separated sequence of dictionary words. See following examples for more details.",
    description: "Consider the following dictionary \n{ i, like, sam, sung, samsung, mobile, ice, \n  cream, icecream, man, go, mango}\n\nInput:  ilike\nOutput: Yes \nThe string can be segmented as \"i like\".\n\nInput:  ilikesamsung\nOutput: Yes\nThe string can be segmented as \"i like samsung\" \nor \"i like sam sung\".<>"
  },
  {
    id: "r2-48",
    round: 2,
    title: "Print the following pattern",
    description: "1  \n  3 2\n 6 5 4\n10 9 8 7\n10 9 8 7 \n 6 5 4 \n  3 2 \n   1"
  },
  {
    id: "r2-49",
    round: 2,
    title: "Given an array as input, The condition is if the number is repeated you must add the number and put the next index value to 0. If the number is 0 print it at the last.",
    description: "Eg: arr[] = { 0, 2, 2, 2, 0, 6, 6, 0, 8}\nOutput: 4 2 12 8 0 0 0 0 0 ."
  },
  {
    id: "r2-49",
    round: 2,
    title: "Given two Strings s1 and s2, remove all the characters from s1 which is present in s2.",
    description: "Input: s1=”expErIence”, s2=”En”\noutput: s1=”exprIece”"
  },
  {
    id: "r2-50",
    round: 2,
    title: "Find the next greater element for each element in given array.",
    description: "input: array[]={6, 3, 9, 10, 8, 2, 1, 15, 7};\noutput: {7, 5, 10, 15, 9, 3, 2, _, 8}\nIf we are solving this question using sorting, we need to use any O(nlogn) sorting algorithm."
  },
  {
    id: "r2-51",
    round: 2,
    title: "Print all distinct permutations of a given string with duplicate characters.",
    description: "https://www.geeksforgeeks.org/distinct-permutations-string-set-2"
  },
  {
    id: "r2-52",
    round: 2,
    title: "Given a number, find the next smallest palindrome.",
    description: ""
  },
  {
    id: "r2-53",
    round: 2,
    title: "Given an array with repeated numbers, Find the top three repeated numbers.",
    description: "input: array[]={3, 4, 2, 3, 16, 3, 15, 16, 15, 15, 16, 2, 3}\noutput: 3, 16, 15"
  },
  {
    id: "r2-54",
    round: 2,
    title: "Given two dimensional matrix of integer and print the rectangle can be formed using given indices and also find the sum of the elements in the rectangle",
    description: "Input: mat[M][N] = {{1, 2, 3, 4, 6}, {5, 3, 8, 1, 2}, {4, 6, 7, 5, 5}, {2, 4, 8, 9, 4} };\nindex = (2, 0) and (3, 4)\nOutput:\nRectangle\n4 6 7 5 5\n2 4 8 9 4\nsum 54"
  },
  {
    id: "r2-55",
    round: 2,
    title: "Find the result subtraction, multiplication, division of two integers using + operator.",
    description: "Input: 6 and 4\noutput:\naddition 6+4 = 10,    subtraction  6+(-4) = 2,   multiplication = 24,   division = 1\nInput : -8 and -4\nOutput:\naddition -8+(-4) = -12,    subtraction  (-8)+(-(-4)) = -4,   multiplication = 32,   division = 2"
  },
  {
    id: "r2-56",
    round: 2,
    title: "Given a sentence of string, in that remove the palindrome words and print the remaining.",
    description: "Input:\nHe did a good deed\nOutput:\nHe good\nInput:\nHari speaks malayalam\nOutput:\nHari speaks"
  },
  {
    id: "r2-57",
    round: 2,
    title: "Given two dates, find total number of days between them.",
    description: "Input: dt1 = {10, 2, 2014} dt2 = {10, 3, 2015}\nOutput: 393\ndt1 represents “10-Feb-2014” and dt2 represents “10-Mar-2015” The difference is 365 + 28\nInput: dt1 = {10, 2, 2000} dt2 = {10, 3, 2000}\nOutput: 29\nNote that 2000 is a leap year\nInput: dt1 = {10, 2, 2000} dt2 = {10, 2, 2000}\nOutput: 0\nBoth dates are same\nInput: dt1 = {1, 2, 2000}; dt2 = {1, 2, 2004};\nOutput: 1461\nNumber of days is 365*4 + 1"
  },
  {
    id: "r2-58",
    round: 2,
    title: "Let 1 represent ‘A’, 2 represents ‘B’, etc. Given a digit sequence, count the number of possible decodings of the given digit sequence.",
    description: "Examples:\nInput: digits[] = “121”\nOutput: 3 // The possible decodings are “ABA”, “AU”, “LA”\nInput: digits[] = “1234” Output: 3\n// The possible decodings are “ABCD”, “LCD”, “AWD”"
  },
  {
    id: "r2-59",
    round: 2,
    title: "Print all possible words from phone digits",
    description: ""
  },
  {
    id: "r2-60",
    round: 2,
    title: "Print longest sequence between same character",
    description: "Ex I/p abcccccbba\nO/p 8 (from a to a)\nI/p aaaaaaaa\nO/p 6"
  },
  {
    id: "r2-61",
    round: 2,
    title: "sort the array odd numbers in ascending and even numbers in descending.",
    description: "I/p 5 8 11 6 2 1 7\nO/p 1 5 7 11 8 6 2"
  },
  {
    id: "r2-62",
    round: 2,
    title: "It’s about anagram.i/p was array of strings .and a word was given to find whether it has anagram in given array.",
    description: "I/p catch, got, tiger, mat, eat, Pat, tap, tea\nWord: ate\nO/p eat, tea"
  },
  {
    id: "r2-63",
    round: 2,
    title: "array of numbers were given to find a number which has same sum of numbers in it’s either side.",
    description: "I/p 1, 2, 3, 7, 6\nO/p 7(has 1+ 2+3 in left 6 in right)"
  },
  {
    id: "r2-64",
    round: 2,
    title: "prime number – print n prime numbers",
    description: ""
  },
  {
    id: "r2-65",
    round: 2,
    title: "prime factor – sort the array based on the minimum factor they have.",
    description: ""
  },
  {
    id: "r2-66",
    round: 2,
    title: "adding a digit to all the digits of a number eg digit=4, number = 2875, o/p= 612119",
    description: ""
  },
  {
    id: "r2-67",
    round: 2,
    title: "form the largest possible number using the array of numbers.",
    description: ""
  },
  {
    id: "r2-68",
    round: 2,
    title: "lexicographic sorting.",
    description: ""
  },
  {
    id: "r2-69",
    round: 2,
    title: "given a set of numbers, and a digit in each iteration, if the digit exists in any of  the numbers, remove its occurrences and ask for the next digit till the list becomes empty.",
    description: ""
  },
  {
    id: "r2-70",
    round: 2,
    title: "Check if a number ‘a’ is present in another number ‘b.",
    description: ""
  },
  {
    id: "r2-71",
    round: 2,
    title: "Find the extra element and its index",
    description: "Input : [ 10, 20, 30, 12, 5 ]\n    [ 10, 5, 30, 20 ]\nOutput : 12 is the extra element in array 1 at index 4\n\nInput : [ -1, 0, 3, 2 ]\n    [ 3, 4, 0, -1, 2 ]\nOutput : 4 is the extra element in array 3 at index 5"
  },
  {
    id: "r2-72",
    round: 2,
    title: "Find the least prime number that can be added with first array element that makes them divisible by second array elements at respective index (check for prime numbers under 1000, if exist return -1 as answer) & (Consider 1 as prime number)",
    description: "Input : [ 20, 7 ]\n    [ 11, 5 ]\nOutput : [ 1, 3 ]\n\nExplanation : \n(20 + ?) % 11 \n( 7 + ?) % 5"
  },
  {
    id: "r2-73",
    round: 2,
    title: "Sort the array elements in descending order according to their frequency of occurrence",
    description: "Input : [ 2 2 3 4 5 12 2 3 3 3 12 ]\nOutput : 3 3 3 3 2 2 2 12 12 4 5\nExplanation : 3 occurred 4 times, 2 occurred 3 times, 12 occurred 2 times, 4 occurred 1 time, 5 occurred 1 time\n\nInput : [ 0 -1 2 1 0 ]\nOutput : 0 0 -1 1 2\nNote : sort single occurrence elements in ascending order"
  },
  {
    id: "r2-74",
    round: 2,
    title: "Print true if second string is a substring of first string, else print false.",
    description: "Note : * symbol can replace n number of characters\nInput : Spoon  Sp*n  Output : TRUE\n    Zoho     *o*o  Output : TRUE\n    Man       n*     Output : FALSE\n    Subline  line   Output : TRUE"
  },
  {
    id: "r2-75",
    round: 2,
    title: "Print second frequently occurring number in given series",
    description: "Example :\nInput: 1 1 2 3 1 2 4\nOutput: 2\nExplanation: 1 occurs 3 times, 2 occurs 2 times, 3 occurs 1 time and 4 occurs 1 time. Hence second frequently occurring number in given series is 2"
  },
  {
    id: "r2-76",
    round: 2,
    title: "Print only numbers which is present in Fibonacci series (0 1 1 2 3 5 8 ……..)",
    description: "Example:\n\nInput: 2 10 4 8\nOutput: 2 8 \nInput: 1 10 6 8 13 21\nOutput: 1 8 13 21"
  },
  {
    id: "r2-77",
    round: 2,
    title: "Print pattern like this",
    description: "Example:\nInput: 1\nOutput: 0\n\nInput: 2\nOutput: \n0 0\n0 1\n1 0\n1 1\n\nInput: 3\nOutput:\n0 0 0\n0 0 1\n0 1 0\n0 1 1\n1 0 0\n1 0 1\n1 1 0\n1 1 1"
  },
  {
    id: "r2-78",
    round: 2,
    title: "NxN matrix will be provided. 0->block, 1->Not a block",
    description: "Always starting point is (0,0), Ending point is (N-1,N-1).\nYou have to go from starting point to ending point. One valid solution is enough.\nExample:\n \n   Input:\n   N=4 \n   1 1 0 0\n   1 0 0 1\n   1 1 1 1\n   0 0 0 1\n   Output:\n   _ 1 0 0\n   _ 0 0 1\n   _ _ _ _\n   0 0 0 _"
  },
  {
    id: "r2-79",
    round: 2,
    title: "Insert 0 after consecutive (K times) of 1 is found.",
    description: "Example:\nInput:\nNumber of bits: 12\nBits: 1 0 1 1 0 1 1 0 1 1 1 1\nConsecutive K: 2\n\nOutput:\n1 0 1 1 0 0 1 1 0 0 1 1 0 1 1 0"
  },
  {
    id: "r2-80",
    round: 2,
    title: "Find the maximum of three numbers?",
    description: ""
  },
  {
    id: "r2-81",
    round: 2,
    title: "Print the total number of odd and even digits in the given number.",
    description: "Ex.  Input  :  1234567\n\n    Output  :  ODD 4\n        EVEN 3"
  },
  {
    id: "r2-82",
    round: 2,
    title: "Find the second maximum among the given numbers.",
    description: "Ex.  INPUT  :  \n    \n    Size of Array    :  8\n    Enter the elements  :  2 5 1 6 2 6 7 10\n    \n    OUTPUT  :\n\n    7\n\n  Ex.  INPUT  :\n\n    Size of Array    :  4\n    Enter the elements  :  4 1 2 2\n    \n    OUTPUT  :\n\n    2\n\n  Ex.  INPUT  :\n\n    Size of Array    :  1\n    Enter the elements  :  1\n    \n    OUTPUT  :\n\n    No second maximum"
  },
  {
    id: "r2-83",
    round: 2,
    title: "Print the following pattern",
    description: "Ex.  INPUT  :  5\n\n    OUTPUT  :\n\n            1\n           1 1\n          1 2 1\n         1 3 3 1\n        1 4 6 4 1\n\n  Ex.  INPUT  :  7\n\n    OUTPUT  :\n\n            1\n           1 1\n          1 2 1\n         1 3 3 1\n        1 4 6 4 1\n       1 5 10 10 5 1\n      1 6 15 20 15 6 1"
  },
  {
    id: "r2-84",
    round: 2,
    title: "Given a two dimensional array which consists of only 0’s and 1’s. Print the matrix without duplication.",
    description: "Ex.  INPUT  :\n    \n    Enter Row Size    :  4\n    Enter column size  :  3\n    Enter the matrix  :\n    1 0 1\n    1 1 0\n    1 1 1\n    1 0 1\n    \n    OUTPUT  :\n\n    Unique Matrix  :\n    1 0 1\n    1 1 0\n    1 1 1"
  },
  {
    id: "r2-85",
    round: 2,
    title: "Given an array of positive numbers. Print the numbers which have longest continuous range.",
    description: "Ex.  INPUT  :  \n\n    Enter array size  :  8\n    Enter arryay elements  :  1 3 10 7 9 2 4 6\n    \n    OUTPUT  :\n\n    1 2 3 4\n\n  Ex.  INPUT  :  \n\n    Enter array size  :  8\n    Enter arryay elements  :  1 3 9 7 8 2 4 6\n    \n    OUTPUT  :\n\n    1 2 3 4\n    6 7 8 9"
  },
  {
    id: "r2-86",
    round: 2,
    title: "Given two arrays. Find its union.",
    description: "Input  : \n\n  Enter size of first array  :  6\n  Enter the elements    :  1 2 3 4 5 3\n  Enter size of second array  :  4\n  Enter the elements    :  1 2 7 5\n\n  OUTPUT  :\n\n  1 2 3 4 5 7"
  },
  {
    id: "r2-87",
    round: 2,
    title: "Given an array of numbers. Print the numbers without duplication.",
    description: "INPUT  :  \n  \n  Enter the array size  :  4\n  Enter the elements  :  1 1 2 4\n  \n  OUTPUT  :\n\n  1 2 4"
  },
  {
    id: "r2-88",
    round: 2,
    title: "Given an array of numbers and a number k. Print the maximum possible k digit number which can be formed using given numbers.",
    description: "INPUT  :  \n  \n  Enter the array size  :  4\n  Enter the elements  :  1 4 973 97\n  Enter number of digits  :  3\n  \n  OUTPUT  :\n\n  974 \n\n  INPUT  :  \n  \n  Enter the array size  :  6\n  Enter the elements  :  1 4 89 73 9 7\n  Enter number of digits  :  5\n  \n  OUTPUT  :\n\n  98973"
  },
  {
    id: "r2-89",
    round: 2,
    title: "Given an array of numbers and a window of size k. Print the maximum of numbers inside the window for each step as the window moves from the beginning of the array.",
    description: "INPUT  :\n  \n  Enter the array size  :  8\n  Enter the elements  :  1,3,5,2,1,8,6,9\n  Enter the window size  :  3\n\n  OUTPUT  :\n\n  5 5 5 8 8 9"
  },
  {
    id: "r2-90",
    round: 2,
    title: "Given a string, reverse only vowels in it; leaving rest of the string as it is.",
    description: "Input : abcdef\nOutput : ebcdaf"
  },
  {
    id: "r2-91",
    round: 2,
    title: "Write a program to check if the given words are present in matrix given below. The words can be left to right, top to bottom and the diagonals (in top to bottom direction)",
    description: ""
  },
  {
    id: "r2-92",
    round: 2,
    title: "Write a program to form lines using given set of words. The line formation should follow below rules.",
    description: "i. Total characters in a single line excluding the space between the words and the favorite character should not exceed the given number.\nii. Favorite character is case insensitive.\niii. Words should not be broken up. Complete words alone should be used in a single line. A word should be used in one line only.\n\nInput : Max char per line = 10\n        Favorite character = 'o'\n        Words : Zoho, Eating, Watching, Pogo\n                Loving, Mango\nOutput : Watching Zoho\n         Eating Mango\n         Loving Pogo."
  },
  {
    id: "r2-93",
    round: 2,
    title: "Adding 2 numbers",
    description: "Given 2 huge numbers as separate digits, store them in array and process them and calculate the sum of 2 numbers and store the result in an array and print the sum.\nInput:\nNumber of digits:12\n9 2 8 1 3 5 6 7 3 1 1 6\nNumber of digits:9\n7 8 4 6 2 1 9 9 7\nOutput :\n9 2 8 9 2 0 2 9 5 1 1 3"
  },
  {
    id: "r2-94",
    round: 2,
    title: "Given sorted array check if two numbers sum in it is a given",
    description: "value\nInput\nArray = {1 3 4 8 10 } N = 7\noutput\ntrue"
  },
  {
    id: "r2-95",
    round: 2,
    title: "Compiuting value of sin (x)",
    description: "Input x = 30 n = 10\noutput = 0.5\nHint : The equation sin(x) = x – x^3 / 3! + x^5 / 5! – …."
  },
  {
    id: "r2-96",
    round: 2,
    title: "Write function to find multiplication of 2 numbers using +",
    description: "operator You must use minimum possible iterations.\nInput: 3 , 4\nOutput 12"
  },
  {
    id: "r2-97",
    round: 2,
    title: "Given array find maximum sum of contiguous sub array",
    description: "{-2 -3 4 -1 -2 1 5 -3}\noutput 7 elements [ 4 -1 -2 1 5]"
  },
  {
    id: "r2-98",
    round: 2,
    title: "Given unsorted array find all combination of the element for a given sum. Order should be maintained.",
    description: "Input :\n8 3 4 7 9 N=7\nOutput\n{3 4 } {7}"
  },
  {
    id: "r2-99",
    round: 2,
    title: "Given an odd length word which should be printed from the middle of the word.",
    description: "The output should be in the following pattern.\nExample:\nInput: PROGRAM\nOutput:\n              G\n            GR\n          GRA\n       GRAM\n     GRAMP\n   GRAMPR\nGRAMPRO"
  },
  {
    id: "r2-100",
    round: 2,
    title: "It is a program to implement Least Recently Used (LRU) concept. Given a key, if it is already existed then it should be marked as recently used otherwise a value should be stored which is given as input and marked as recently used. The capacity is to store only 10 key, value pairs. If the table is full and given a new key; the key, value pair which is not recently used should be deleted which gives feasibility to store the new key, value pair.",
    description: ""
  },
  {
    id: "r2-101",
    round: 2,
    title: "Given a few pairs of names in the order child, father. The input is a person name and level number. The output should be the number of children in that particular level for the person given.",
    description: "Example:\nInput:\n[\n{Ram, Syam},\n{Akil, Syam},\n{Nikil, Ram},\n{Subhash, Ram},\n{Karthik, Akil}\n];\nSyam 2\n\nOutput: 3 (Syam has Ram and Akil in level 1 and in level 2 he have Nikil, Subhash, Karthik. So the answer is 3)."
  },
  {
    id: "r2-102",
    round: 2,
    title: "Given an array of positive integers. The output should be the number of occurrences of each number.",
    description: "Example:\nInput: {2, 3, 2, 6, 1, 6, 2}\nOutput:\n1 – 1\n2 – 3\n3 – 1\n6 – 2"
  },
  {
    id: "r2-103",
    round: 2,
    title: "Given an array, find the minimum of all the greater numbers for each element in the array.",
    description: "Sample: \nArray : {2, 3, 7, ¬1, 8, 5, 11} \n   \nOutput: \n{2¬>3, 3¬>5, 7¬>8, ¬1¬>2, 8¬>11, 5¬>7, 11¬>}"
  },
  {
    id: "r2-104",
    round: 2,
    title: "Find the largest sum contiguous subarray which should not have negative numbers. We have to print the sum and the corresponding array elements which brought up the",
    description: "sum.\n\nSample: \nArray : {¬2, 7, 5, ¬1, 3, 2, 9, ¬7} \n\nOutput: \n     Sum : 14 \n     Elements : 3, 2, 9"
  },
  {
    id: "r2-105",
    round: 2,
    title: "Given a string, we have to reverse the string without changing the position of punctuations and spaces.",
    description: "Sample:   house no : 123@ cbe \nOutput:    ebc32 1o :  nes@ uoh"
  },
  {
    id: "r2-106",
    round: 2,
    title: "Given a 2D grid of characters, you have to search for all the words in a dictionary by",
    description: "moving only along two directions, either right or down. Print the word if it occurs.\n \nSample :         \n  a   z  o   l \n  n   x  h   o\n  v   y   i   v \n  o   r   s  e \n Dictionary = {van, zoho, love, are, is} \n \n Output: \n    zoho \n    love \n    Is"
  },
  {
    id: "r2-107",
    round: 2,
    title: "Given a string, change the order of words in the string (last string should come first).",
    description: "Should use RECURSION\n  \nSample:   one two three \nOutput :  three two one"
  },
  {
    id: "r2-108",
    round: 2,
    title: "Input",
    description: "arr: 23, 34, 45, 66, 1, 12\ntarget: 1\n\nOutput\nFounded at the index of: 4\nExplaination:\n     1\n 66      12\n 45      23\n     34\n find the mid element of the array then check the mid with the start index value\n arr[i] <= arr[mid]\n     whether the mid value is greater than or equal to mid then, that part will be \n [23,34,45,66] are one part of sorted element \n or\n if arr is [23,34,45,1,2,12] then [1,2,12] is other part of sorted element\n then check the target value is under the sorted part of other \n according to that change the starting and ending position."
  },
  {
    id: "r2-109",
    round: 2,
    title: "INPUT:",
    description: "Screen length = 20\nSentence = Today is wednesda\n\nOUTPUT:\nToday***is**wednesda\n\nEXPLAINATION:\n first we need to find the number of space in the sentence.\n    remaining screen length should be find by subtracting the screenLength - sentence.length()\n    find the how many space need to add by (remainingScreenLength)/ spaceCount \n    when the addSpaceCount is odd the first space should add +1 than addSpaceValue and other place add normal."
  },
  {
    id: "r2-110",
    round: 2,
    title: "Find the frequence of the array without collection and inbuilt method in java.",
    description: ""
  },
  {
    id: "r2-111",
    round: 2,
    title: "Write a program that will print the sum of diagonal elements of a 10X10 matrix. The program will take a total of 100 numbers as input (10 numbers will be input per line and each number will be separated by a space).",
    description: "Example 1\n\nInput:    1  2 3 4 5 6 7 8 9 0 \n               0 1 2 3 4 5 6 7 8 0\n               3 4 5 6 7 8 9 6 4 0\n               2 3 4 5 6 7 8 9 3 2\n               3 4 5 6 7 4 3 2 1 3\n               3 4 5 6 2 4 4 2 4 6\n               2 3 4 6 2 4 6 2 3 5\n               2 3 5 6 2 4 6 2 3 5\n               2 4 6 2 1 4 3 3 5 2\n               3 3 5 2 4 6 2 1 4 6\nOutput:  42\nExample 2\n\nInput:   1 22 33 44 55 66 77 88 99 100\n              100 1 88 77 66 55 44 33 22 11\n              88 88 1 66 55 44 33 22 11 100\n              88 77 66 1 44 33 22 11 100 99\n              77 66 55 44  1 22  11 88 99 100\n              66 55 44 33 22 1 77 88 99 100\n              44 33 22 11 100 99 1 77 66 55\n              33 22 11 100 99 88 77 1 55 44\n              22 11 100 99 88 77 66 55 1 33\n              100 11 22 33 44 55 99 88 77 1\nOutput: 10"
  },
  {
    id: "r2-112",
    round: 2,
    title: "Input:6",
    description: "Output\n                1 \n              2 4 \n            3 5 7 \n        6 8 10 12 \n    9 11 13 15 17 \n14 16 18 20 22 24"
  },
  {
    id: "r2-113",
    round: 2,
    title: "Input: 5",
    description: "Output:\n1 2 3 4 5 \n2 3 4 5 1 \n3 4 5 1 2\n4 5 1 2 3\n5 1 2 3 4"
  },
  {
    id: "r2-114",
    round: 2,
    title: "Input: 5",
    description: "Output:\n        1 \n      2 1 \n    3 2 1\n  4 3 2 1\n5 4 3 2 1"
  },
  {
    id: "r2-115",
    round: 2,
    title: "Integer to English Words",
    description: "Convert a non-negative integer num to its English words representation.\nExample 1:\n\nInput: num = 123\nOutput: \"One Hundred Twenty Three\"\nExample 2:\n\nInput: num = 12345\nOutput: \"Twelve Thousand Three Hundred Forty Five\"\nExample 3:\n\nInput: num = 1234567\nOutput: \"One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven\""
  },
  {
    id: "r2-116",
    round: 2,
    title: "Remove the palindrome",
    description: "Example 1:\nInput: Malayalam is my mother tongue\nOutput: is my mother tongue"
  },
  {
    id: "r2-117",
    round: 2,
    title: "Compare Version Numbers",
    description: "Given two version strings, version1 and version2, compare them. A version string consists of revisions separated by dots '.'. The value of the revision is its integer conversion ignoring leading zeros.\n\nTo compare version strings, compare their revision values in left-to-right order. If one of the version strings has fewer revisions, treat the missing revision values as 0.\n\nReturn the following:\n\nIf version1 < version2, return -1.\nIf version1 > version2, return 1.\nOtherwise, return 0.\n \nExample 1:\n\nInput: version1 = \"1.2\", version2 = \"1.10\"\n\nOutput: -1\n\nExplanation:\n\nversion1's second revision is \"2\" and version2's second revision is \"10\": 2 < 10, so version1 < version2.\n\nExample 2:\n\nInput: version1 = \"1.01\", version2 = \"1.001\"\n\nOutput: 0\n\nExplanation:\n\nIgnoring leading zeroes, both \"01\" and \"001\" represent the same integer \"1\"."
  },
  {
    id: "r2-118",
    round: 2,
    title: "Print the below output for a given n",
    description: "Example; n = 7\n\n4444444\n4333334\n4322234\n4321234\n4322234\n4333334\n4444444\n\nn = 9\n\n555555555\n544444445\n543333345\n543222345\n543212345\n543222345\n543333345\n544444445\n555555555"
  },
  {
    id: "r2-119",
    round: 2,
    title: "You are given an array prices where prices[i] is the price of a given stock on the ith day.",
    description: "You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n     Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.\n\nExample 1:\n\nInput: prices = [7,1,5,3,6,4]\nOutput: 5\nExplanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.\nNote that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.\n\nExample 2:\n\nInput: prices = [7,6,4,3,1]\nOutput: 0\nExplanation: In this case, no transactions are done and the max profit = 0."
  },
  {
    id: "r2-120",
    round: 2,
    title: "Given an array of integers of length n. Our task is to return the max element",
    description: "if the it is at least twice as much as every other number in the array. \n     If the max element does not satisfy the condition return -1.\n\nInput : arr = {3, 6, 1, 0}\nOutput : 1\nHere, 6 is the largest integer, and for \nevery other number in the array x, 6 is \nmore than twice as big as x. The value is 6\nso we return 6.\n\nInput :   arr = {1, 2, 3, 4}\nOutput : -1\n4 isn't at least as big as twice the value\nof 3, so we return -1."
  },
  {
    id: "r2-121",
    round: 2,
    title: "Convert a non-negative integer num to its English words representation.",
    description: "Example 1:\n\nInput: num = 123\nOutput: \"One Hundred Twenty Three\"\nExample 2:\n\nInput: num = 12345\nOutput: \"Twelve Thousand Three Hundred Forty Five\"\nExample 3:\n\nInput: num = 1234567\nOutput: \"One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven\""
  },
  {
    id: "r2-122",
    round: 2,
    title: "Given an array arr[] containing only 0s and 1s, find the longest subarray which contains equal no of 0s and 1s. return their start and end indexes",
    description: "Examples: \n\nInput: arr[] = [1, 0, 1, 1, 1, 0, 0]\nOutput: 1 , 6\nExplanation: arr[1 ... 6] is the longest subarray with three 0s and three 1s.\n\nInput: arr[] = [0, 0, 1, 1, 0]\nOutput: 0 , 3 ( 1 , 3 is also valid )\nExplanation: arr[0 ... 3] or  arr[1 ... 4] is the longest subarray with two 0s and two 1s.\n\nInput: arr[] = [0]\nOutput: No Sub array found\nExplanation: There is no subarray with an equal number of 0s and 1s."
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
