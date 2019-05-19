# node-reptile
> [cheerio]((https://cheerio.js.org/))是nodejs的抓取页面模块，为服务器特别定制的，快速、灵活、实施的jQuery核心实现。适合各种Web爬虫程序。

> [http](https://nodejs.org/api/http.html)node提供的访问浏览器的api

> [fs](https://nodejs.org/api/fs.html)node处理文件的api

## 需求
我需要爬取这个网站的桌面壁纸来删选一张作为我的壁纸。

## 结果
爬取的图片
![avatar](shotPic/node-reptile5.PNG)

## 解析
就是这个网站

需要爬取的页面是有五个

![avatar](shotPic/node-reptile1.PNG)
![avatar](shotPic/node-reptile2.PNG)
![avatar](shotPic/node-reptile3.PNG)
分别是：
```bash
http://www.win4000.com/wallpaper_0_0_0_0.html
http://www.win4000.com/wallpaper_0_0_0_1.html
http://www.win4000.com/wallpaper_0_0_0_2.html
http://www.win4000.com/wallpaper_0_0_0_3.html
http://www.win4000.com/wallpaper_0_0_0_4.html
http://www.win4000.com/wallpaper_0_0_0_5.html
```
通过比较，可以用一个循环得到所有的页面

![avatar](shotPic/node-reptile4.PNG)
发现，这些图都是在`.clearfix>.Left_bar>a>img`
可以通过`data-original`得到壁纸的url，`alt`得到壁纸的名字。

## 启动
```bash
# 克隆项目
git clone git@github.com:qiufeihong2018/node-reptile.git

# 安装依赖
git install fs http cheerio

# 启动项目
node .\index.js
```