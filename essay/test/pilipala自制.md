1.装好数据库和net

2.preview-demo启动之后，会暴露一大堆API，然后你前端js调用就行了

![photo_17@03-01-2023_23-59-35.jpg (648×569)](file:///Users/zervan/Downloads/C%E7%9B%98/video/tg%E8%81%8A%E5%A4%A9%E8%AE%B0%E5%BD%95/ChatExport_2023-01-04/photos/photo_17@03-01-2023_23-59-35.jpg)



3.postman找到WS协议

进我next博客开F12

你能看到这个

In reply to [this message](#go_to_message7272)

{"Seq":268850,"Data":{"Ids":["12504","12384","12511","12510","12509","12508","12507","12506","12505"]}}



![photo_19@04-01-2023_00-12-05.jpg (1280×1038)](file:///Users/zervan/Downloads/C%E7%9B%98/video/tg%E8%81%8A%E5%A4%A9%E8%AE%B0%E5%BD%95/ChatExport_2023-01-04/photos/photo_19@04-01-2023_00-12-05.jpg)

刚刚我演示的API是获取一个文章集合的数据

Seq是请求序列号，随便填，而Ids是要请求的文章的ID

Field就是这样的一个前端，它调用了一大堆API来完成博客的呈现



博客做的数据交互的系统都是调ws的接口，比如说评论，把请求类型和数据放到JSON里，然后通过ws协议送达服务器，再由服务器处理后返回，呈现

服务器那边由噼里啪啦框架驱动，完成对数据的操作

这些是解耦的，如果你熟知我的API格式，你也能调用我博客的一系列API

F12里还能看到更多的API类型，你仿照着调用就知道是API怎么个格式了

![photo_22@04-01-2023_00-18-05.jpg (984×1015)](file:///Users/zervan/Downloads/C%E7%9B%98/video/tg%E8%81%8A%E5%A4%A9%E8%AE%B0%E5%BD%95/ChatExport_2023-01-04/photos/photo_22@04-01-2023_00-18-05.jpg)



底下就是数据

springboot不是前后端分离的，仍然属于SSR范畴

所以做成这样解耦的方式比较困难

这些API不是pilipala提供的

https://github.com/Thaumy/pilipala.plugin

参见里面的WSAPI插件

这些都是这个插件的功能









