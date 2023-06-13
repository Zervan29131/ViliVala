import { resolve } from 'path'
import { defineConfig4CustomTheme } from 'vuepress/config'
import { VilivalaThemeConfig } from 'vuepress-theme-vilivala/types'
import dayjs from 'dayjs'
// import baiduCode from './config/baiduCode' // 百度统计hm码
import htmlModules from './config/htmlModules' // 自定义插入的html块


export default defineConfig4CustomTheme<VilivalaThemeConfig>({
  // theme: 'vilivala', // 使用npm包主题
  theme: resolve(__dirname, '../../vilivala'), // 使用本地主题

  locales: {


    '/': {
      lang: 'zh-CN',
      title: "Zervan的小站",
      description: 'Zervanのblog',
    }
    
  },
  // base: '/vilivala-gh/',
  // base: '/', // 默认'/'。如果你想将你的网站部署到如 https://foo.github.io/bar/，那么 base 应该被设置成 "/bar/",（否则页面将失去样式等文件）
  

  // 主题配置
  themeConfig: {
    // 导航配置
    nav: [
      { text: '首页', link: '/' },
      {
        text: 'code',
        link: '/code/', //目录页链接，此处link是vilivala主题新增的配置项，有二级导航时，可以点击一级导航跳到目录页
        items: [
         
         // 说明：以下所有link的值只是在相应md文件头部定义的永久链接（不是什么特殊编码）。另外，注意结尾是有斜杠的
         {
          text: '测评',
          items: [
            { text: '蓝牙耳机测评', link: '/pages/7634a/' },         
          ],
        },

         {
            text: '渗透',
            items: [
              { text: '网络渗透学习指南', link: '/pages/a1bc29/' },         
            ],
          },
          {
            text: '前端',
            items: [
              { text: '学习web开发', link: '/pages/a2bcd1/' },         
            ],
          },          
          {
            text: '版本控制与管理',
            items: [
              { text: 'Github入门与实践', link: '/pages/c6d7d2/' },         
            ],
          }, 
          {
            text: '博客开发指南',
            items: [
              { text: '利用GitHub建立博客', link: '/pages/7e6c99/' },         
            ],
          }, 

        ],
      },
      {
        text: 'ToRead',
        link: '/toread/',
        items: [
          {
          text: '网文梗概-序', link: '/pages/a3f315/',
           },
           {
            text: '我们的文学之路', link: '/pages/acd006/',
            },
            {
              text: '《世界观体系》', link: '/note/worldview/',
              },

           {
            text: '《人物设定集》', link: '/note/design/',
            },
            {
              text: '《诗集》', link: '/note/poem/',
              },

        {
         text: '《素材》', link: '/note/material/',
         },
  
        ],
      },
      {
        text: 'fun',
        link: '/fun/',
        items: [
          {
            text: 'universe',
            items: [
              { text: '新冠疫情与外星人', link: '/pages/3ed0f5/' },         
            ],
          },
          {
            text: 'human',
            items: [
              { text: '人的自由意志论', link: '/pages/2f8f9b/' },         
            ],
          },
          {
            text: 'social',
            items: [
              { text: '科技的未来', link: '/pages/75357c/' },         
            ],
          },
          {
            text: 'school',
            items: [
              { text: '我们的大学', link: '/pages/3a9c4d/' },         
            ],
          },
          {
            text: 'philosophy',
            items: [
              { text: '关于虚无主义', link: '/pages/776796/' },         
            ],
          },

      ],
      },
      {
        text: 'more',
        link: '/more/',
        items: [
          { text: '日志', link: '/date/' },
          { text: '支持我们', link: '/money/' },
          { text: '友情链接', link: '/friends/' },
        ],
      },
      { text: 'about', link: '/about/' },
      {
        text: '收藏',
        link: '/pages/beb6c0bd8a66cea6/',
        // items: [
        //   { text: '网站', link: '/pages/beb6c0bd8a66cea6/' },
        //   { text: '资源', link: '/pages/eee83a9211a70f9d/' },
        //   { text: 'Vue资源', link: '/pages/12df8ace52d493f6/' },
        // ],
      },
      {
        text: '索引',
        link: '/archives/',
        items: [
          { text: '分类', link: '/categories/' },
          { text: '标签', link: '/tags/' },
          { text: '归档', link: '/archives/' },
        ],
      },
    ],
    sidebarDepth: 2, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
    logo: '/img/console.png', // 导航栏logo
    repo: 'Zervan29131/vilivala', // 导航栏右侧生成Github链接
    searchMaxSuggestions: 10, // 搜索结果显示最大数
    lastUpdated: '上次更新', // 开启更新时间，并配置前缀文字   string | boolean (取值为git提交时间)
    docsDir: 'docs', // 编辑的文件夹
    editLinks: true, // 启用编辑
    editLinkText: '编辑',

    //*** 以下是vilivala主题相关配置，文档：https://doc.xugaoyi.com/pages/a20ce8/ ***//

    // category: false, // 是否打开分类功能，默认true
    // tag: false, // 是否打开标签功能，默认true
    // archive: false, // 是否打开归档功能，默认true
    // categoryText: '随笔', // 碎片化文章（_posts文件夹的文章）预设生成的分类值，默认'随笔'

    // bodyBgImg: [
    //   'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175828.jpeg',
    //   'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175845.jpeg',
    //   'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175846.jpeg'
    // ], // body背景大图，默认无。 单张图片 String | 多张图片 Array, 多张图片时每隔15秒换一张。
    // bodyBgImgOpacity: 0.5, // body背景图透明度，选值 0.1~ 1.0, 默认0.5
    // titleBadge: false, // 文章标题前的图标是否显示，默认true
    // titleBadgeIcons: [ // 文章标题前图标的地址，默认主题内置图标
    //   '图标地址1',
    //   '图标地址2'
    // ],
    // contentBgStyle: 6 , // 文章内容块的背景风格，默认无. 1 方格 | 2 横线 | 3 竖线 | 4 左斜线 | 5 右斜线 | 6 点状

    // updateBar: { // 最近更新栏
    //   showToArticle: false, // 显示到文章页底部，默认true
    //   moreArticle: '/archives' // “更多文章”跳转的页面，默认'/archives'
    // },
    // rightMenuBar: false, // 是否显示右侧文章大纲栏，默认true (屏宽小于1300px下无论如何都不显示)
    // sidebarOpen: false, // 初始状态是否打开左侧边栏，默认true
    // pageButton: false, // 是否显示快捷翻页按钮，默认true

    // 侧边栏  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto' | <自定义>    温馨提示：目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页
    sidebar: 'structuring',

    // 文章默认的作者信息，(可在md文件中单独配置此信息) string | {name: string, link?: string}
    author: {
      name: 'Zervan', // 必需
      link: 'https://zervan.cn', // 可选的
    },

    // 博主信息 (显示在首页侧边栏)
    blogger: {
      avatar: '/img/console.jpg',
      name: 'Zervan',
      slogan: '天下最普通的人之一',
      
    },
    

    // 社交图标 (显示于博主信息栏和页脚栏。内置图标：https://doc.xugaoyi.com/pages/a20ce8/#social)
    social: {
      // iconfontCssFile: '//at.alicdn.com/t/xxx.css', // 可选，阿里图标库在线css文件地址，对于主题没有的图标可自己添加。阿里图片库：https://www.iconfont.cn/
      icons: [
        {
          iconClass: 'icon-weibo',
          title: '微博',
          link: 'https://weibo.com/zervan',
        },  
        {
          iconClass: 'icon-bilibili',
          title: 'bilibili',
          link: 'https://space.bilibili.com/1650366974',
        }, 
        {
          iconClass: 'icon-zhihu',
          title: '知乎',
          link: 'https://www.zhihu.com/people/zervan',
        },
        {
          iconClass: 'icon-douyin',
          title: '抖音',
          link: 'https://v.douyin.com/L7jT1xp/',
        },       
        {
          iconClass: 'icon-youjian',
          title: '发邮件',
          link: 'mailto:nickmechlin01@outlook.com',
        },
      ],
    },

    // 页脚信息
    footer: {
      createYear: 2021, // 博客创建年份
      copyrightInfo:
        ' | <a href="http://www.beian.gov.cn" target="_blank">鲁ICP备2021036977号-1</a>', 
        // 博客版权信息，支持a标签或换行标签</br>
    },

    // 自定义hmtl(广告)模块
    htmlModules
  },

  // 注入到页面<head>中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
  head: [
    ['link', { rel: 'icon', href: '/img/console.png' }], //favicons，资源放在public文件夹
    [
      'meta',
      {
        name: 'keywords',
        content: 'Be the change you want to see in the World',
      },
    ],
    // ['meta', { name: 'baidu-site-verification', content: '7F55weZDDc' }], // 百度统计的站长验证（你可以去掉）
    ['meta', { name: 'theme-color', content: '#28282d' }], // 移动浏览器主题颜色
    // [
    //   'script',
    //   {
    //     'data-ad-client': 'ca-pub-7828333725993554',
    //     async: 'async',
    //     src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
    //   },
    // ], // 网站关联Google AdSense 与 html格式广告支持（你可以去掉）
  ],

// .vuepress/config.ts
// export default {
//   plugins: [
//     [
//       "@mr-hope/reading-time",
//       {
//         // 配置选项
//       },
//     ],
//   ],
// };


// interface ReadingTimeLocaleData {
//   /**
//    * 字数模板，模板中 `$word` 会被自动替换为字数
//    */
//   word: string;

//   /**
//    * 小于一分钟文字
//    */
//   less1Minute: string;

//   /**
//    * 时间模板
//    */
//   time: string;
// }


  // 插件配置
  plugins: {
    // 导入本地插件（供学习参考）
    // [resolve(__dirname, './plugins/love-me')]: { // 鼠标点击爱心特效
    //   color: '#11a8cd', // 爱心颜色，默认随机色
    //   excludeClassName: 'theme-vilivala-content' // 要排除元素的class, 默认空''
    // },

    // 百度自动推送
    // 'vuepress-plugin-baidu-autopush': {},

    // // 百度统计
    // 'vuepress-plugin-baidu-tongji': {
    //   hm: baiduCode,
    // },
    //字数统计    export default 
//     module.exports =
// {
//       plugins: [
   
//           "@mr-hope/reading-time",
//           {
//             // 配置选项
//           },
//         ],
 
//     },
'@mr-hope/reading-time':{},
    // 全文搜索
    'fulltext-search': {},

    // 可以添加第三方搜索链接的搜索框（继承原官方搜索框的配置参数）
    // 'thirdparty-search': {
    //   thirdparty: [
    //     {
    //       title: '在MDN中搜索',
    //       frontUrl: 'https://developer.mozilla.org/zh-CN/search?q=', // 搜索链接的前面部分
    //       behindUrl: '', // 搜索链接的后面部分，可选，默认 ''
    //     },
    //     {
    //       title: '在Runoob中搜索',
    //       frontUrl: 'https://www.runoob.com/?s=',
    //     },
    //     {
    //       title: '在Vue API中搜索',
    //       frontUrl: 'https://cn.vuejs.org/v2/api/#',
    //     },
    //     {
    //       title: '在Bing中搜索',
    //       frontUrl: 'https://cn.bing.com/search?q=',
    //     },
    //     {
    //       title: '通过百度搜索本站的',
    //       frontUrl: 'https://www.baidu.com/s?wd=site%3Axugaoyi.com%20',
    //     },
    //   ],
    // },

    // 代码块复制按钮
    'one-click-copy': {
      copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
      copyMessage: '复制成功', // default is 'Copy successfully and then paste it for use.'
      duration: 1000, // prompt message display time.
      showInMobile: false, // whether to display on the mobile side, default: false.
    },

    // DEMO演示模块, API: https://github.com/xiguaxigua/vuepress-plugin-demo-block
    'demo-block': {
      settings: {
        // jsLib: ['http://xxx'], // 在线示例(jsfiddle, codepen)中的js依赖
        // cssLib: ['http://xxx'], // 在线示例中的css依赖
        // vue: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js', // 在线示例中的vue依赖
        jsfiddle: false, // 是否显示 jsfiddle 链接
        codepen: true, // 是否显示 codepen 链接
        horizontal: false, // 是否展示为横向样式
      },
    },

    // 放大图片
    'vuepress-plugin-zooming': {
      selector: '.theme-vilivala-content img:not(.no-zoom)', // not排除class是no-zoom的图片
      options: {
        bgColor: 'rgba(0,0,0,0.6)',
      },
    },

    // 评论区
    // 'vuepress-plugin-comment': {
    //   choosen: 'gitalk',
    //   options: {
    //     clientID: '0a0ba3159c4c845642a0',
    //     clientSecret: '8c55fd00b9cf605aa0ca5dc475fec5c1b5830053',
    //     repo: 'vilivala-gh', // GitHub 仓库
    //     owner: 'Zervan29131', // GitHub仓库所有者
    //     admin: ['Zervan29131'], // 对仓库有写权限的人
    //     // distractionFreeMode: true,
    //     pagerDirection: 'first', // 'first'正序 | 'last'倒序
    //     id: '<%- (frontmatter.permalink || frontmatter.to.path).slice(-16) %>', //  页面的唯一标识,长度不能超过50
    //     title: '「评论」<%- frontmatter.title %>', // GitHub issue 的标题
    //     labels: ['Gitalk', 'Comment'], // GitHub issue 的标签
    //     body:
    //       '页面：<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>', // GitHub issue 的内容
    //   },
    // },

          'vuepress-plugin-comment':
          {
            choosen: 'valine', 
            // options选项中的所有参数，会传给Valine的配置
            options: {
              el: '#valine-vuepress-comment',
              appId: 'UE360SE1ES9aEB0K8maYqslL-gzGzoHsz',
              appKey: 'HesnSsC7MOcY97iIaMgDchnS'
            },
          
          //   'new Valine':{
          //     el:'#vcomments',
          //     appId: 'UE360SE1ES9aEB0K8maYqslL-gzGzoHsz',
          //     appKey: 'HesnSsC7MOcY97iIaMgDchnS',
          //     visitor: true // 阅读量统计
          // },

    // "上次更新"的时间格式
    '@vuepress/last-updated': {
      transformer: (timestamp, lang) => {
        return dayjs(timestamp).format('YYYY/MM/DD, HH:mm:ss')
      },
    },
  },

  markdown: {
    lineNumbers: true
  },
  // // 监听文件变化并重新构建
  // extraWatchFiles: [
  //   '.vuepress/config.ts',
  //   '.vuepress/config/htmlModules.ts',
  // ]
}})
