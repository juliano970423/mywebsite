#!/bin/bash

# 指定文件夹路径
folder_path="/home/juliano/Documents/Website/website/public/musics/"

# 进入指定文件夹
cd "$folder_path" || exit

# 遍历文件夹中的所有文件
for file in *; do
  # 使用 sed 去除最后一个空格及其后面的内容
  new_file=$(echo "$file" | sed 's/ [^]]*\]$//')

  # 重命名文件
  mv -- "$file" "$new_file"
  echo "文件名已更改：$file -> $new_file"
done
