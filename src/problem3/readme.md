# Wallet Balance Code Review

Found several issues in this React component that would cause runtime errors and performance problems.

## Critical Bugs

**1. Undefined variable on line 25**
```typescript
// This will crash
if (lhsPriority > -99) {
```
The variable `lhsPriority` doesn't exist. Should be `balancePriority`.

**2. Filter logic is backwards**
```typescript
// This includes zero/negative balances (wrong!)
if (balance.amount <= 0) {
  return true;
}
```
The filter should exclude zero/negative amounts, not include them.

**3. Sort function missing return**
```typescript
// What happens when priorities are equal?
if (leftPriority > rightPriority) {
  return -1;
} else if (rightPriority > leftPriority) {
  return 1;
}
// Missing return 0
```

**4. TypeScript interface missing property**
The code accesses `balance.blockchain` but it's not defined in the `WalletBalance` interface.

## Performance Issues

**5. Unused expensive computation**
```typescript
// This runs but the result is never used
const formattedBalances = sortedBalances.map(...)
```

**6. React key using array index**
```typescript
// Bad for React reconciliation
key={index}
```

**7. Unnecessary re-renders**
The `useMemo` includes `prices` in dependencies but doesn't use it, causing extra renders.

**8. No null checks**
```typescript
// Can cause NaN if price is undefined
const usdValue = prices[balance.currency] * balance.amount;
```

## Fixes Applied

- Fixed variable name and filter logic
- Added missing return in sort function
- Added `blockchain` to interface
- Used proper React keys
- Added null checks for price lookups
- Removed unused dependencies
- Added memoization for expensive operations

The refactored version handles edge cases properly and performs better.