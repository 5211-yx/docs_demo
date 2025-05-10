import { defineConfig } from 'vitepress'
import { set_sidebar } from "../utils/auto_sidebar.js";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  //网页上方的内容
  head: [["link", { rel: "icon", href: "/logo.png" }]],
  title: "vitepress 演示项目",
  description: "一个文档站点",
  cleanUrls: true,
  themeConfig: {
    outlineTitle: "文章目录",
    // outline: [2, 6],
    logo: '/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: '家', items: [
          {
            text: '首页', link: '/'
          },
          {
            text: 'markdown示例', link: '/markdown-examples'
          }
        ]
      },
      {
        text: '示例', items: [
          { text: '前端', link: '/frontend' },
          { text: '后端', link: '/backend' }
        ]
      }

    ],

    sidebar: {
      "/backend": set_sidebar("/backend"),
      "/frontend": set_sidebar("/frontend")
    },

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],

    socialLinks: [
      { icon: 'gitee', link: 'https://gitee.com/yinxue5211' }
    ],
    //footer这里实现了底部配置
    footer: {
      copyright: "Copyright@ 2025 Albert Li",
    },
    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },

  }
})
