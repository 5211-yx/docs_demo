import path from "node:path";
import fs from "node:fs";

// 文件根目录
const DIR_PATH = path.resolve("docs");
// 白名单,过滤不是文章的文件和文件夹
const WHITE_LIST = [
  "index.md",
  ".vitepress",
  "node_modules",
  ".idea",
  "assets",
  "public"
];

// 判断是否是文件夹
const isDirectory = (path) => fs.lstatSync(path).isDirectory();

// 取差值
const intersections = (arr1, arr2) =>
  Array.from(new Set(arr1.filter((item) => !new Set(arr2).has(item))));

// 把方法导出直接使用
function getList(params, path1, pathname) {
  // 存放结果
  const res = [];
  // 开始遍历params
  for (let file in params) {
    // 拼接目录
    const dir = path.join(path1, params[file]);
    // 判断是否是文件夹
    const isDir = isDirectory(dir);
    if (isDir) {
      // 如果是文件夹,读取之后作为下一次递归参数
      const files = fs.readdirSync(dir);
      res.push({
        text: params[file],
        collapsible: true,
        items: getList(files, dir, `${pathname}/${params[file]}`),
      });
    } else {
      // 获取名字
      const name = path.basename(params[file]);
      // 排除非 md 文件
      const suffix = path.extname(params[file]);
      if (suffix !== ".md") {
        continue;
      }
      res.push({
        text: name,
        link: `${pathname}/${name}`,
      });
    }
  }
  // 对name做一下处理，把后缀删除
  // 中文文件名映射
  const nameMap = {
    "入门": "入门指南",
    "精通": "高级教程",
    "前端": "前端开发",
    "后端": "后端开发"
  };

  res.map((item) => {
    item.text = item.text.replace(/\.md$/, "");
    // 应用中文映射
    if (nameMap[item.text]) {
      item.text = nameMap[item.text];
    }
  });

  // 按特定顺序排序
  res.sort((a, b) => {
    const order = ["index", "入门指南", "高级教程"];
    return order.indexOf(a.text) - order.indexOf(b.text);
  });
  return res;
}

export const set_sidebar = (pathname) => {
  try {
    // 获取pathname的路径
    const dirPath = path.join(DIR_PATH, pathname);
    // 读取pathname下的所有文件或者文件夹
    const files = fs.readdirSync(dirPath);
    // 过滤掉
    const items = intersections(files, WHITE_LIST);
    // getList 函数后面会讲到
    return getList(items, dirPath, pathname);
  } catch (error) {
    console.error(`Error generating sidebar for ${pathname}:`, error);
    return [];
  }
};
