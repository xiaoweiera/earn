git add .
printf  '输入tag版本号:'
while read numbertxt
do
  break
done
printf  '输入备注:'
while read mark
do
  break
done
git tag -a "${numbertxt}" -m "${mark}"
git push origin "${numbertxt}"
