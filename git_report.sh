#!/bin/bash
cd "/c/Users/Jeh.K/OneDrive/Jeh Documents/2026/MobileProg"

echo "=== 1) git --no-pager status ===" 
git --no-pager status
STATUS_OUTPUT=$?

echo ""
echo "=== 2) git --no-pager diff --staged ===" 
git --no-pager diff --staged
STAGED_EMPTY=$?

echo ""
echo "=== 3) git --no-pager diff ===" 
git --no-pager diff
UNSTAGED_EMPTY=$?

echo ""
echo "=== 4) git --no-pager log --oneline -15 ===" 
git --no-pager log --oneline -15

echo ""
# Check if working tree is clean
PORCELAIN=$(git --no-pager status --porcelain)
if [ -z "$PORCELAIN" ]; then
  echo "=== Working tree is clean, running: git --no-pager diff main...HEAD ==="
  git --no-pager diff main...HEAD
else
  echo "=== Working tree NOT clean, skipping diff main...HEAD ==="
fi
