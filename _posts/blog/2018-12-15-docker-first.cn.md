---
layout: post_wide
title: "docker 命令小记"
description: ""
keywords:   ""
category: blog
---

#### docker image 删除
1. docker 删除 none image

> 命令如下:

```
   docker stop $(docker ps -a | grep "Exited" | awk '{print $1 }')
   docker rm $(docker ps -a | grep "Exited" | awk '{print $1 }')
   docker rmi $(docker images | grep "none" | awk '{print $3}')
```


---
