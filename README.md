## Tips
目前只有 iOS 性能窗口可以查看内存使用量


## Results
### iOS iPhone7
- 同步创建大量相同地址Image会crash；异步（100ms）不会crash，纹理大小不会增长
  分析：微信会复用同地址Image，但需要等load完成后，同步导致来不及复用
- 100ms创建大量不同地址Image会crash；200ms不会crash，纹理大小会清理
  分析：来不及GC内存就已经爆了
- 200ms创建大量不同地址Image并缓存会crash，纹理大小不会清理；500ms不会crash，纹理大小涨到3G
  分析：iOS应该存在显存的交换存储机制，使得长时间不用的纹理暂存
- 使用PIXI并绘图也基本符合上述规律


### Android OPPO
- 长时间绘制+清理后也依然会crash，不清楚原因
