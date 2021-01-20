- TypeScript 标准库声明
  - tsconfig.json 中 lib 字段配置标准库
  - 标准库就是内置对象所对应的声明，ts 找不到对应的类型就会报错

```json
{
  "lib": ["ES2015", "DOM"] /* DOM 和 BOM 合到一块，写一个 DOM 就好了 */
}
```
