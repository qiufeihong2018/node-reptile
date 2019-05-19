// 引入所需模块
var http = require('http');
var cheerio = require('cheerio');
var fs = require('fs');
// 找到规律爬取这5个页面
for (let i = 0; i <= 5; i++) {
    let Url = `http://www.win4000.com/wallpaper_0_0_0_${i}.html`
    getPageData(Url)
}
// 获取页面数据
function getPageData(Url) {
    http.get(Url, res => {
        let htmlData = '';
        res.on('data', chunk => {
            htmlData += chunk;
        });
        // 数据获取结束
        res.on('end', () => {
            // 过滤出所需的元素
            filterContent(htmlData);
        });
    }).on('error', (error) => {
        console.log(`错误：${error}`);
    });
}

// 过滤页面
function filterContent(htmlData) {
    if (htmlData) {
        let $ = cheerio.load(htmlData);
        // 缩小范围
        let Content = $('.clearfix').find('.Left_bar')
        // 所需的数据
        let ContentData = [];
        // 对每个li进行遍历
        Content.find('li').each(function (item, b) {
            let pic = $(this);
            // src指的是a的href...那么我只能选用data-original
            let src = pic.find('a').children('img').attr('data-original')
            let name = pic.find('a').children('img').attr('alt')
            // 下载图片
            download(src, name)
            // 这里也存一份
            ContentData.push({
                src,
                name
            })
            // 存放了抓取的图片信息
            console.log(ContentData)
        })
    } else {
        console.log('html null');
    }
}

// 图片下载函数
function download(url, name) {
    http.get(url, (res) => {
        let imgData = '';
        //设置图片编码格式
        res.setEncoding("binary");
        //检测请求的数据
        res.on('data', (chunk) => {
            imgData += chunk;
        })
        res.on('end', () => {
            // 没有文件夹则创建 以防报错
            if (!fs.existsSync('./images')) {
                fs.mkdirSync('./images');
            }
            fs.writeFile(`./images/${name}.jpg`, imgData, 'binary', (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(`success-${name}！`)
                }
            })
        })
    })
}