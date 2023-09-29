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


    for (let i = -26; i <= -19; i++) {
        // 磨石
        y = -42
        z = -9
        me.lookAt(i,y,z) 
        me.interactBlock(i,y,z,'down',false) 
        Client.waitTick(1)

        // 筛矿
        y = -42
        z = -15
        me.lookAt(i,y,z) 
        me.interactBlock(i,y,z,'down',false) 
        Client.waitTick(1)

        // 洗矿
        y = -47
        z = -15
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

