// 获取指定目录下所有文件的绝对路径

import fs from fs
import path from path

function getAllFiles(dirPath, arrOfFiles) {
  const files = fs.readdirSync(dirPath, { withFileTypes: true })

  files.forEach(item => {
    if (item.isDirectory()) {
      arrOfFiles.push(getAllFiles(path.resolve(dirPath, file.name)), arrOfFiles)
    } else {
      arrOfFiles.push(path.resolve(dirPath, file.name))
    }
  });

  return arrOfFiles
}

export default getAllFiles

