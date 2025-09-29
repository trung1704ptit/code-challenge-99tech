// All have O(1) time complexity

var sum_to_n_a = function(n) {
    // #1: Pure Mathematical Formula
    // Most straightforward and widely understood
    return n * (n + 1) / 2;
};

var sum_to_n_b = function(n) {
    // #2: Bit Manipulation Version
    // Uses bitwise operations: & (AND), >> (right shift)
    return (n & 1) ? ((n + 1) >> 1) * n : (n >> 1) * (n + 1);
};

var sum_to_n_c = function(n) {
    // #3: Shift Division Trick

    return (n * (n + 1)) >> 1;
};
