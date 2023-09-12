#!/bin/bash

shopt -s nullglob # ワイルドカードがマッチしない場合にエラーを回避するための設定

for file in day2_ページ_*.png.webp; do
  number=$(echo "$file" | sed -n 's/day2_ページ_\([0-9]\{2\}\)\.png\.webp/\1/p')
  if [ -n "$number" ]; then
    new_name="output-$number.webp"
    mv "$file" "$new_name"
    echo "Renamed $file to $new_name"
  fi
done
