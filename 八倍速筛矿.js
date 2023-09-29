scriptName = "圆石->沙砾->矿粉(x8)"

const reverse = !GlobalVars.getBoolean(scriptName);
GlobalVars.putBoolean(scriptName, reverse);

if (reverse) {
    Chat.log(Chat.createTextBuilder().append("[").withColor(0x7)
        .append(scriptName).withColor(0x3)
        .append("]").withColor(0x7).append(" 开启").withColor(0x2)
        .build());
} else {
    Chat.log(Chat.createTextBuilder().append("[").withColor(0x7)
        .append(scriptName).withColor(0x3)
        .append("]").withColor(0x7).append(" 关闭").withColor(0xc)
        .build());
}

me = Player.getPlayer()



while (GlobalVars.getBoolean(scriptName)) {
    // 循环中


    for (let i = -6517; i <= -6510; i++) {
        // 磨石
        y = 13
        z = 5411
        me.lookAt(i,y,z) 
        me.interactBlock(i,y,z,'down',false) 
        Client.waitTick(1)

        // 筛矿
        y = 13
        z = 5405
        me.lookAt(i,y,z) 
        me.interactBlock(i,y,z,'down',false) 
        Client.waitTick(1)

        // 洗矿
        y = 7
        z = 5405
        me.lookAt(i,y,z) 
        me.interactBlock(i,y,z,'down',false) 
        Client.waitTick(1)
    }

    if (GlobalVars.getBoolean(scriptName)){ 
        continue
    }

    // 循环后
    Chat.log(Chat.createTextBuilder().append("[").withColor(0x7)
        .append(scriptName).withColor(0x3)
        .append("]").withColor(0x7).append(" 运行结束").withColor(0x3)
        .build());
    break
}

