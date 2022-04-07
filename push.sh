
git add .
printf  '输入备注:'
while read mark
do
  break
done
git commit -m "${mark}"
git push origin
