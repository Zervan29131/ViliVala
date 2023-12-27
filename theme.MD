# 主题配置

主题的配置在 `.vuepress/config.js`文件的 `themeConfig`字段中，是在原有配置的基础上新增或修改的配置

## 是否打开分类、标签、归档

### category

- 类型：boolean
- 默认值：true

是否打开分类功能。 如打开，会做的事情有：

1. 自动生成的front matter包含分类字段
2. 页面中显示与分类相关的信息和模块
3. 自动生成分类页面（在@pages文件夹）

### tag

- 类型：`boolean`
- 默认值：true

是否打开标签功能。 如打开，会做的事情有：

1. 自动生成的front matter包含标签字段
2. 页面中显示与标签相关的信息和模块
3. 自动生成标签页面（在@pages文件夹）

### archive

- 类型：`boolean`
- 默认值：true

是否打开归档功能。 如打开，会自动生成归档页面（在@pages文件夹）

如果你仅仅是想使用这个主题来搭建知识库，并不想使用分类、标签、归档功能，就可以关闭它们。

### 使用分类页、标签页、归档页链接

当你打开了分类、标签、归档功能，就可以在导航或其他地方添加分类页、标签页、归档页的链接：

- 分类页: `/categories/`
- 标签页: `/tags/`
- 归档页: `/archives/`

## 碎片化文章默认分类值

### categoryText

- 类型：`string`
- 默认值：'随笔'

碎片化文章（_posts文件夹的文章）默认生成的分类值

## body背景大图

### bodyBgImg

- 类型：`string` | `array`
- 默认值：undefined

body背景大图，单张图片使用String，多张图片使用Array, 多张图片时每隔15秒换一张

### bodyBgImgOpacity v1.4.0 +

- 类型：`number`
- 默认值：0.5
- 选值范围：0 ~ 1.0

body背景图透明度

## 文章标题前的图标

### titleBadge

- 类型：`boolean`
- 默认值：true

是否打开文章标题图标

### titleBadgeIcons

- 类型：`array`
- 默认值：内置图标

文章标题图标的地址

## 文章内容块的背景底纹

### contentBgStyle v1.4.0 +

- 类型：`number`
- 默认值：undefined
- 选值：1 => 方格 | 2 => 横线 | 3 => 竖线 | 4 => 左斜线 | 5 => 右斜线 | 6 => 点状

## 侧边栏

### sidebar

- 类型：`srting` | `object` | `array`
- 在默认主题原有的配置上新增两项参数：
  - `structuring` 自动生成结构化侧边栏
  - `{ mode: 'structuring', collapsable: Boolean}` 自动生成结构化侧边栏，并设置侧边栏是否可折叠，默认true

如需构建结构化站点请把此配置设置为 `structuring` 或 `{ mode: 'structuring', collapsable: false}`

### sidebarOpen

- 类型：`boolean`
- 默认值：true

初始状态下是否打开侧边栏

在侧边栏关闭状态下，页面向下滚动时会隐藏顶部导航栏，让用户更专注于阅读。

### 对指定页面禁用侧边栏

你可以通过 front matter 来禁用指定页面的侧边栏：

```yaml
---
sidebar: false
---
```

### 碎片化文章的侧边栏

在_posts文件夹的文章会自动在 front matter 添加 `sidebar: auto`

```yaml
---
sidebar: auto
---
```

## 最近更新栏

### updateBar

- 类型：`object`
- 默认值：

  ```
  {showToArticle: true, moreArticle: '/archives/'}
  ```

  - showToArticle 显示到文章页底部，默认true
  - moreArticle “更多文章”跳转的页面，默认'/archives/'

最近更新栏，显示于文章页底部和简约版首页文章列表

### 非文章页的设置

对于非文章页，如目录页、关于、友情链接等自定义页面，最好在front matter设置 `article: false`，设置之后这个页面将被认定为非文章页，不显示作者、时间，不显示最近更新栏，不会参与到最近更新文章的数据计算中。

```yaml
---
article: false
---
```

## 右侧文章大纲栏

### rightMenuBar v1.6.3 +

- 类型：boolean
- 默认值：true

是否显示右侧文章大纲栏。设置为 `false`或屏宽小于 `1300px`时，文章大纲将与左侧侧边栏混合在一起。 (注：在屏宽小于 `1300px`下无论如何都不显示右侧文章大纲栏。)

## 快捷翻页按钮

### pageButton v1.4.3 +

- 类型：boolean
- 默认值：true

是否显示快捷翻页按钮 (此按钮是文章页左右两边的箭头按钮，小屏中不会显示。)

## 文章作者信息

### 文章默认的作者信息

- 类型：`string` | `{name: String, link: String}`
- 默认值：undefined
  - name 作者名称
  - link 作者链接

### 指定的文章作者信息

你也可以在指定的文章front matter设置作者信息，优先级比默认作者信息高，示例：

```yaml
---
author:
  name: 作者名
  link: https://xxx.com
---
 或
---
author: 作者名
---
```

## 博主信息

### blogger

- 参数和类型：`{avatar: String, name: String, slogan: String}`
- 默认值：undefined
  - avatar 头像，必需
  - name 博主名称，必需
  - slogan 标语，可选

博主信息显示于首页博主信息栏

## 社交图标

### social

- 参数和类型：`{iconfontCssFile: String, icons: [{iconClass: String, title: String, link: String}]}`
- 默认值：undefined
  - iconfontCssFile 可选，阿里图标库（或其他）的在线css字体图标文件地址，对于主题没有的图标可自由添加
  - icons 图标列表，数量自由
    - iconClass 图标的Class名称
    - title 图标的title
    - link 图标的跳转链接

社交图标显示于博主信息栏和页脚栏

### 主题内置的社交图标 v1.2.2+, 部分v1.7.2+

| 微信icon-weixin       | QQicon-QQ      | 邮件icon-youjian | npmicon-npm           | githubicon-github   | giteeicon-gitee       | 微博icon-weibo      |
| --------------------- | -------------- | ---------------- | --------------------- | ------------------- | --------------------- | ------------------- |
|                       |                |                  |                       |                     |                       |                     |
| 知乎icon-zhihu        | 语雀icon-yuque | 豆瓣icon-douban  | 掘金icon-juejin       | 简书icon-jianshu    | 思否icon-sf           | 博客园icon-bokeyuan |
|                       |                |                  |                       |                     |                       |                     |
| CSDNicon-csdn         | v2exicon-v2ex  | 抖音icon-douyin  | 哔哩哔哩icon-bilibili | youtubeicon-youtube | facebookicon-facebook | twittericon-twitter |
|                       |                |                  |                       |                     |                       |                     |
| telegramicon-telegram | RSSicon-rss    | 耳机icon-erji    | 猫咪icon-mao          | 书本icon-shuben     | 相册icon-xiangce      |                     |

## 页脚版权栏

### footer

- 参数和类型：`{createYear: Number | String, copyrightInfo: String}`
- 默认值：undefined
  - createYear 博客创建的年份
  - copyrightInfo 可以配置包括版权信息、备案信息在内的所有信息，支持a标签

页脚版权栏信息，原默认主题在首页的front matter中的 `footer`配置项已弃用。

## 自定义html模块

> 可用于插入广告模块

### htmlModules v1.7.0 +

- 类型：`object`
- 默认值：undefined
- 属性：

  - `homeSidebarB` 首页侧边栏底部
  - `sidebarT` 所有左侧边栏顶部
  - `sidebarB` 所有左侧边栏底部
  - `pageT` 页面顶部
  - `pageB` 页面底部
  - `pageTshowMode`页面顶部的显示方式

    - `未配置` 默认所有页面显示
    - `'article'` 仅文章页①显示
    - `'custom'` 仅自定义页①显示
  - `pageBshowMode`页面底部的显示方式

    - `未配置` 默认全局显示
    - `'article'` 仅文章页①显示
    - `'custom'` 仅自定义页①显示
  - `windowLB` 全局窗口左下角②
  - `windowRB` 全局窗口右下角②

  > ①注：在.md文件front matter配置 `article: false`的页面是自定义页，未配置的默认是文章页（首页除外）。
  >
  > ②注：windowLB 和 windowRB：1.展示区块最大宽高200px*400px。2.请给自定义元素定一个不超过200px*400px的宽高。3.在屏幕宽度小于960px时无论如何都不会显示。
  >
- 格式：

```js
htmlModules: {
   homeSidebarB: htmlString,
   sidebarT: htmlString,
   sidebarB: htmlString,
   pageT: htmlString,
   pageB: htmlString,
   pageTshowMode: 'article' | 'custom',
   pageBshowMode: 'article' | 'custom',
   windowLB: htmlString,
   windowRB: htmlString,
 }
```

# 目录页配置

## 目录页说明

目录页数据需要依赖于结构化的侧边栏数据，就是说你需要在 `config.js`配置 `sidebar: 'structuring'` 或 `sidebar: { mode: 'structuring', collapsable: false}` 才能实现目录页数据的获取。

> - 目录页文件(`.md`文件)可以放置在 `二级目录`、`三级目录`和 `四级目录`。
> - 如果你不想在侧边栏显示目录页，你可以在 `一级目录`中单独创建一个文件夹放置你的目录页(`.md`文件)，并在front matter中设置 `sidebar: false`。
> - 如果你想让目录页和其他页面一起出现在侧边栏，你可以和其他页面共同放置在相应的文件夹。(不要设置 `sidebar: false`)
> - 参照下面的示例配置好front matter，然后就可以在导航栏或首页添加目录页链接了。

**示例**：

```yaml
---
pageComponent: # 使用页面组件
  name: Catalogue # 组件名：Catalogue => 目录页组件
  data: # 组件所需数据
    path:  01.学习笔记/01.前端 # 设置为`docs/`下面的某个文件夹相对路径，如‘01.学习笔记/01.前端’ 或 ’01.学习笔记‘ (有序号的要带序号)
    imgUrl: /img/web.png # 目录页内的图片
    description: JavaScript、ES6、Vue框架等前端技术 # 目录描述（可加入a标签）

title:  # 页面标题
date: 2020-01-12 11:51:53 # 创建日期
permalink: /note/javascript # 永久链接
sidebar: false # 不显示侧边栏
article: false # 不是文章页 (不显示面包屑栏、最近更新栏等)
comment: false # 不显示评论栏
editLink: false # 不显示编辑按钮
---
```

配置好目录页之后，点击文章页将会跳转到目录页。

## 配置项

### pageComponent.name

- 组件名，必需
- 使用目录页时 **必须** 设置为 `Catalogue`

### pageComponent.data

- 组件所需数据，必需

### pageComponent.data.path

- 要为其生成目录页的文件夹的相对路径，必需
- 必须是在 `docs`目录底下的文件夹相对路径
- 示例：`01.学习笔记`或 `01.学习笔记/01.前端`(有序号的要带序号)

在 `v1.8.2`版本之前，没有 `path`属性，使用 `key`代替。但 `key`只支持指定 `一级目录`的文件夹名称。

### pageComponent.data.imgUrl

- 目录页内的图片，可选。(v1.9.4之前必填)
- 图片尺寸在页面中显示为80px*80px

### pageComponent.data.description

- 目录描述，必需
- 可加a标签（如需加入a标签时，标签内部的引号请使用单引号）

## 如何在导航栏中添加目录页链接

```js
 // config.js
module.exports = {
    themeConfig: {
        nav:  [
            // 没有二级导航时可以直接添加
           {text: '目录页', link: '/web/'},

          // 有二级导航时
           {text: '页面',
               link: '/ui/',   //目录页， vilivala主题新增的配置项，有二级导航时，可以点击一级导航跳到目录页
               items: [
                 {text: 'HTML', link: '/pages/11/'},
                 {text: 'CSS', link: '/pages/22/'},
               ]
            },
       ]
    }
}
```

# 添加摘要

文章摘要会显示于首页的详细版文章列表中，在编写文章时（`.md`文件中）在合适的位置添加一个 `<!-- more -->`注释。注释前面的内容将会暴露在摘要中。

```md
# 如何根据系统主题自动响应CSS深色模式

![Dark](https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200427163531.jpg)

很多人喜欢选择APP或网站中的深色模式，也许他们更喜欢这样的外观，或者他们想让自己的眼睛免受疲劳。这篇文章将告诉你如何在网站中实现一个自动的CSS深色模式，根据访客的系统主题来自动响应。

<!-- more -->

## CSS 深色模式 (Dark Mode)

...
```

如示例的内容，在 `<!-- more -->`注释前面的除了标题之外所有内容将显示到摘要中。

值得注意的是摘要的内容也是文章内容的一部分，会显示在文章详情页中。

# 修改主题颜色和样式

## 主题样式变量

下面是vilivala主题使用的css变量，你可以在 `.vuepress/styles/palette.styl`修改这些变量覆盖它们：

```stylus
//***vilivala主题-CSS变量***//

// 颜色
$bannerTextColor = #fff // 首页banner区(博客标题区)的文本颜色
$accentColor = #11A8CD
$activeColor = #ff5722
$arrowBgColor = #ccc
$badgeTipColor = #42b983
$badgeWarningColor = darken(#ffe564, 35%)
$badgeErrorColor = #DA5961

// 布局
$navbarHeight = 3.6rem
$sidebarWidth = 18rem
$contentWidth = 860px
$homePageWidth = 1100px
$rightMenuWidth = 230px // 右侧菜单

// 代码块
$lineNumbersWrapperWidth = 2.5rem

// 浅色模式
.theme-mode-light
  --bodyBg: #f4f4f4
  --mainBg: rgba(255,255,255,1)
  --sidebarBg: rgba(255,255,255,.8)
  --blurBg: rgba(255,255,255,.9)
  --textColor: #004050
  --textLightenColor: #0085AD
  --borderColor: rgba(0,0,0,.15)
  // 代码块浅色主题
  --codeBg: #f6f6f6
  --codeColor: #525252
  codeThemeLight()
  // 代码块深色主题
  // --codeBg: #252526
  // --codeColor: #fff
  // codeThemeDark()

// 深色模式
.theme-mode-dark
  --bodyBg: rgb(39,39,43)
  --mainBg: rgba(30,30,34,1)
  --sidebarBg: rgba(30,30,34,.8)
  --blurBg: rgba(30,30,34,.8)
  --textColor: rgb(140,140,150)
  --textLightenColor: #0085AD
  --borderColor: #2C2C3A
  --codeBg: #252526
  --codeColor: #fff
  codeThemeDark()

// 阅读模式
.theme-mode-read
  --bodyBg: rgb(240,240,208)
  --mainBg: rgba(245,245,213,1)
  --sidebarBg: rgba(245,245,213,.8)
  --blurBg: rgba(245,245,213,.9)
  --textColor: #004050
  --textLightenColor: #0085AD
  --borderColor: rgba(0,0,0,.15)
  --codeBg: #282c34
  --codeColor: #fff
  codeThemeDark()
```

## 样式修改与适配

当你想修改主题某个地方的样式时，或者你在给博客添加了一些新的模块或插件，发现样式和主题的样式不协调时，都可以在 `.vuepress/styles/index.styl` 添加css样式来做修改。 需要注意的是，你在自己写的css样式中，请尽量使用主题提供的变量来进行适配。
