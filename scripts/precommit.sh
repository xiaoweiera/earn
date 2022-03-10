#!/bin/bash

# 检查代码中是否包含 @DEBUG 标识符
if [ "$(git diff --cached --numstat --diff-filter=ACM | wc -l)" -gt 0 ]
then
  FILES=$(grep -in '@DEBUG' --include *.ts --include *.tsx --include *.js --include *.scss --include *.css $(git diff --cached --name-only --diff-filter=ACM) /dev/null)
  if [ -n "$FILES" ]
  then
    echo '\033[33m待提交代码中存在 @DEBUG 标识符，提交终止'
    echo $FILES
    exit 1
  fi
fi

# 执行 lint-staged 中定义的其它检查
npx lint-staged

