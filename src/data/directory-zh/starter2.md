---
title: Markdown 演示
description: 这是一个示例列表，帮助您开始使用。
tags:
  - sleep
link: https://test.com
---

## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题


## 水平分隔线

___

---

***


## 排版替换

启用 typographer 选项以查看结果。

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, 双引号" 和 '单引号'


## 强调

**这是粗体文本**

__这是粗体文本__

*这是斜体文本*

_这是斜体文本_

~~删除线~~


## 块引用


> 块引用也可以嵌套...
>> ...通过在彼此旁边使用额外的大于号...
> > > ...或在箭头之间使用空格。


## 列表

无序列表

+ 通过以 `+`、`-` 或 `*` 开始一行来创建列表
+ 子列表是通过缩进 2 个空格创建的：
  - 标记字符更改强制新列表开始：
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ 非常简单！

有序列表

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. 您可以使用顺序编号...
1. ...或将所有数字保持为 `1.`

从偏移量开始编号：

57. foo
1. bar


## 代码

行内 `code`

缩进代码

    // 一些注释
    line 1 of code
    line 2 of code
    line 3 of code


代码块 "fences"

```
示例文本...
```

语法高亮

``` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

## 表格

| 选项 | 描述 |
| ------ | ----------- |
| data   | 数据文件的路径，用于提供将传递到模板中的数据。 |
| engine | 用于处理模板的引擎。默认是 Handlebars。 |
| ext    | 用于目标文件的扩展名。 |

右对齐列

| 选项 | 描述 |
| ------:| -----------:|
| data   | 数据文件的路径，用于提供将传递到模板中的数据。 |
| engine | 用于处理模板的引擎。默认是 Handlebars。 |
| ext    | 用于目标文件的扩展名。 |


## 链接

[链接文本](http://dev.nodeca.com)

[带标题的链接](http://nodeca.github.io/pica/demo/ "标题文本！")

自动转换链接 https://github.com/nodeca/pica (启用 linkify 以查看)


## 图片

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

像链接一样，图片也有脚注样式语法

![Alt text][id]

在文档后面的引用中定义 URL 位置：

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"


## 插件

`markdown-it` 的杀手级功能是非常有效地支持
[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin)。


### [表情符号](https://github.com/markdown-it/markdown-it-emoji)

> 经典标记：:wink: :cry: :laughing: :yum:
>
> 快捷方式（表情符号）：:-) :-( 8-) ;)

请参阅 [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji。


### [下标](https://github.com/markdown-it/markdown-it-sub) / [上标](https://github.com/markdown-it/markdown-it-sup)

- 19^th^
- H~2~O


### [ins>](https://github.com/markdown-it/markdown-it-ins)

++插入的文本++


### [mark>](https://github.com/markdown-it/markdown-it-mark)

==标记的文本==


### [脚注](https://github.com/markdown-it/markdown-it-footnote)

脚注 1 链接[^first]。

脚注 2 链接[^second]。

内联脚注^[内联脚注的文本]定义。

重复的脚注引用[^second]。

[^first]: 脚注 **可以有标记**

    和多个段落。

[^second]: 脚注文本。


### [定义列表](https://github.com/markdown-it/markdown-it-deflist)

术语 1

:   定义 1
带懒继续。

术语 2 带有 *内联标记*

:   定义 2

        { 一些代码，定义 2 的一部分 }

    定义 2 的第三段。

_紧凑样式：_

术语 1
  ~ 定义 1

术语 2
  ~ 定义 2a
  ~ 定义 2b


### [缩写](https://github.com/markdown-it/markdown-it-abbr)

这是 HTML 缩写示例。

它转换 "HTML"，但保持部分条目完整，如 "xxxHTMLyyy" 等。

*[HTML]: Hyper Text Markup Language

### [自定义容器](https://github.com/markdown-it/markdown-it-container)

::: warning
*这里有龙*
:::