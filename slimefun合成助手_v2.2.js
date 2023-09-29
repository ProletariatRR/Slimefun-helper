function findMutiBlockStructure() {
    let workstation = {}
    let dispensor_list = World.getWorldScanner()
    .withStringBlockFilter().contains("dispenser")
    .build().scanAroundPlayer(1)
    for (let i = 0; i < dispensor_list.size(); i++) {
        // Chat.log(dispensor_list[i])
        let neighbor_block = {}
        neighbor_block["up"] = World.getBlock(dispensor_list[i].add(0,1,0)).getName().getString()
        neighbor_block["down"] = World.getBlock(dispensor_list[i].add(0,-1,0)).getName().getString()
        neighbor_block["north"] = World.getBlock(dispensor_list[i].add(0,0,-1)).getName().getString()
        neighbor_block["south"] = World.getBlock(dispensor_list[i].add(0,0,1)).getName().getString()
        neighbor_block["west"] = World.getBlock(dispensor_list[i].add(-1,0,0)).getName().getString()
        neighbor_block["east"] = World.getBlock(dispensor_list[i].add(1,0,0)).getName().getString()

        let player_pos = me.getPos()
        let distance = dispensor_list[i].toVector(player_pos).getMagnitude()
        if (distance > 5) {
            continue
        }

        if (neighbor_block["up"] == "工作台"){
            workstation["增强型工作台 (Enhanced Crafting Table)"] = {
                "container" : dispensor_list[i],
                "handle" : dispensor_list[i].add(0,1,0)
            }
            // Chat.log("a: 增强型工作台 ")
            // Chat.log(dispensor_list[i])

        }else if (neighbor_block["up"] == "橡木栅栏"){
            workstation["磨石 (Grind Stone)"] = {
                "container" : dispensor_list[i],
                "handle" : dispensor_list[i].add(0,1,0)
            }
            // Chat.log("已识别：磨石")

        }else if (neighbor_block["up"] == "铁砧"){
            workstation["盔甲锻造台 (Armor Forge)"] = {
                "container" : dispensor_list[i],
                "handle" : dispensor_list[i].add(0,1,0)
            }
            // Chat.log("已识别：盔甲锻造台")

        }else if(( neighbor_block["north"] == "铁栏杆" && neighbor_block["south"] == "铁栏杆" && neighbor_block["up"] == "下界砖栅栏") ||
        ( neighbor_block["west"] == "铁栏杆"  && neighbor_block["east"] == "铁栏杆"  && neighbor_block["up"] == "下界砖栅栏")){
            workstation["矿石粉碎机 (Ore Crusher)"] = {
                "container" : dispensor_list[i],
                "handle" : dispensor_list[i].add(0,1,0)
            }
            // Chat.log("已识别：矿石粉碎机")

        }else if(( neighbor_block["north"] == "下界砖块" && neighbor_block["south"] == "下界砖块" && neighbor_block["up"] == "下界砖栅栏" && neighbor_block["down"] =="火" ) ||
        ( neighbor_block["west"] == "下界砖块"  && neighbor_block["east"] == "下界砖块"  && neighbor_block["up"] == "下界砖栅栏" && neighbor_block["down"] =="火")){
            workstation["冶炼炉 (Smeltery)"] = {
                "container" : dispensor_list[i],
                "handle" : dispensor_list[i].add(0,1,0)
            }
            // Chat.log("已识别：冶炼炉")

        }else if(( neighbor_block["north"] == "活塞" && neighbor_block["south"] == "活塞" && neighbor_block["up"] == "下界砖栅栏") ||
        ( neighbor_block["west"] == "活塞"  && neighbor_block["east"] == "活塞"  && neighbor_block["up"] == "下界砖栅栏")){
            workstation["压缩机 (Compressor)"] = {
                "container" : dispensor_list[i],
                "handle" : dispensor_list[i].add(0,1,0)
            }
            // Chat.log("已识别：压缩机")

        }else if(( neighbor_block["north"] == "平滑石头台阶" && neighbor_block["south"] == "平滑石头台阶" && neighbor_block["down"] == "玻璃") ||
        ( neighbor_block["west"] == "平滑石头台阶"  && neighbor_block["east"] == "平滑石头台阶"  && neighbor_block["down"] == "玻璃")){
            workstation["压力舱 (Pressure Chamber)"] = {
                "container" : dispensor_list[i],
                "handle" : dispensor_list[i].add(0,-2,0)
            }
            // Chat.log("已识别：压力舱")

        }else if((neighbor_block["north"] == "工作台" && World.getBlock(dispensor_list[i].add(0,0,-2)).getName().getString() == "书架")
        || (neighbor_block["south"] == "工作台" && World.getBlock(dispensor_list[i].add(0,0,2)).getName().getString() == "书架")
        || (neighbor_block["west"] == "工作台" && World.getBlock(dispensor_list[i].add(-2,0,0)).getName().getString() == "书架")
        || (neighbor_block["east"] == "工作台" && World.getBlock(dispensor_list[i].add(2,0,0)).getName().getString() == "书架")){
            if (neighbor_block["north"] == "工作台" && World.getBlock(dispensor_list[i].add(0,0,-2)).getName().getString() == "书架") {
                workstation["魔法工作台 (Magic Workbench)"] = {
                    "container" : dispensor_list[i],
                    "handle" : dispensor_list[i].add(0,0,-1)
                }
            }else if (neighbor_block["south"] == "工作台" && World.getBlock(dispensor_list[i].add(0,0,2)).getName().getString() == "书架") {
                workstation["魔法工作台 (Magic Workbench)"] = {
                    "container" : dispensor_list[i],
                    "handle" : dispensor_list[i].add(0,0,1)
                }
            }else if (neighbor_block["west"] == "工作台" && World.getBlock(dispensor_list[i].add(-2,0,0)).getName().getString() == "书架") {
                workstation["魔法工作台 (Magic Workbench)"] = {
                    "container" : dispensor_list[i],
                    "handle" : dispensor_list[i].add(-1,0,0)
                }
            }else if (neighbor_block["east"] == "工作台" && World.getBlock(dispensor_list[i].add(2,0,0)).getName().getString() == "书架") {
                workstation["魔法工作台 (Magic Workbench)"] = {
                    "container" : dispensor_list[i],
                    "handle" : dispensor_list[i].add(1,0,0)
                }
            }
            // Chat.log("已识别：魔法工作台")
        }else if(neighbor_block["down"] == "橡木栅栏" && World.getBlock(dispensor_list[i].add(0,-2,0)).getName().getString() == "炼药锅"){
            // Chat.log("已识别：洗矿机")
            workstation["洗矿机 (Ore Washer)"] = {
                "container" : dispensor_list[i],
                "handle" : dispensor_list[i].add(0,-1,0)
            }
        }
    }

    return workstation
}

function empty_main_hand() {
    Player.openInventory()
    main_hand_slot = Player.openInventory().getSelectedHotbarSlotIndex()
    free_slot = Player.openInventory().findFreeInventorySlot() 
    if (free_slot == -1) {
        Chat.log("[中断]背包空间不足")
        return false
    }
    // KeyBind.pressKeyBind("key.inventory")
    Player.openInventory().swapHotbar(free_slot, main_hand_slot) 
    return true
}


function move_sf_guide_to_main_hand(){
    s = findItemByName("Slimefun 指南 (箱子界面)",['main','hotbar'])
    main_hand_slot = Player.openInventory().getSelectedHotbarSlotIndex()
    // KeyBind.pressKeyBind("key.inventory")
    Player.openInventory().swapHotbar(s['slot'][0][0], main_hand_slot) 
    Player.openInventory().close()
}


function getItemNameBySlot(Index) {
    return Player.openInventory().getSlot(Index).getName().getString()
}

// function findItemByName(name) {
//     let total_slots = Player.openInventory().getTotalSlots()
//     let correct_slot = []
//     let item_count = 0
//     for (let slot = Math.floor(total_slots/9)*9-1; slot >= Math.floor(total_slots/9)*9-36; slot--) {
//         let item = Player.openInventory().getSlot(slot)
//         let item_name = item.getName().getString()

//         if (item_name == name) {
//             correct_slot.push([slot, item.getCount()])
//             item_count += item.getCount() 
//         }
//     }

//     return {"slot":correct_slot.sort(function(a,b){return a[1]-b[1]}), "count":item_count}
// }

function findItemByName(name,map_identifiers) {
    // let total_slots = Player.openInventory().getTotalSlots()
    let correct_slot = []
    let item_count = 0

    item_list = Player.openInventory().getItems(map_identifiers)
    for (let slot = 0; slot < Player.openInventory().getTotalSlots() ; slot++) {
        map_loc = Player.openInventory().getLocation(slot) 
        if (typeof(map_identifiers)=="string" && map_loc == map_identifiers){        }
        else if(typeof(map_identifiers)=="object" && map_identifiers.includes(map_loc)) {        }
        else{
            continue
        }

        let item = Player.openInventory().getSlot(slot)
        let item_name = item.getName().getString()

        if (item_name == name) {
            correct_slot.push([slot, item.getCount()])
            item_count += item.getCount() 
        }
    }
    return {"slot":correct_slot.sort(function(a,b){return a[1]-b[1]}), "count":item_count}
}

function product_stack(item_name, item_count, enforced) {
    
    state = findItemByName(item_name,['main','hotbar'])
    let lack = {}

    if (will_be_used_item[item_name] == null) {
        will_be_used_item[item_name] = 0
    }

    if (state["count"]>=item_count+will_be_used_item[item_name] && !enforced) { 
        // 已有数量 >= 需要数量 + 已用数量
        // 已经足够（无需制作）
        will_be_used_item[item_name]+= item_count // 用掉的个数
        return {}

    } else if (current_data[item_name] == null) {
        // 无配方（初级材料）
        lack[item_name] = item_count
        return lack
    }else {
        // 不够
        // 制作缺少的数量
        
        let product_count = Math.ceil((item_count - (state["count"] - will_be_used_item[item_name])) / current_data[item_name]["output_times"]) 

        if (enforced) {
            product_count = Math.ceil((item_count ) / current_data[item_name]["output_times"]) 
        }

        // 制作次数 =  ( 需要数量 - (已有数量 - 已用数量) ) / 产物倍数 
        will_be_used_item[item_name] -= product_count*current_data[item_name]["output_times"] - item_count // 已使用数量 = 已使用数量 + 需要 - 制作的次数*产物倍数
        
        let materials = current_data[item_name]["materials"]
        var lacking_flag = false // 缺材料标记
        for (let i = 0; i < materials.length; i++) {
            // 准备材料
            let inherit_lack = product_stack(materials[i]["name"], materials[i]["count"]*product_count,false) // 材料入栈
            
            // will_be_used_item[materials[i]["name"]] += materials[i]["count"]*product_count // 已使用材料数量
            
            
            for (const item in inherit_lack) {
                lacking_flag = true // 进入该循环说明缺材料
                if (lack[item] == null) {
                    lack[item] = inherit_lack[item]
                } else {
                    lack[item] += inherit_lack[item]
                }
            }
        }

        for (let i = 0; i < product_count; i++) {
            stack.push(item_name)
        }
    }
    return lack
}

function make(item_name,item_count) {
    stack = []
    will_be_used_item = {}
    return [product_stack(item_name,item_count,true), stack]
}


// function moveItemFromSlotToSlot(slot1, slot2, count) {
//     Player.openInventory().click(slot1,0)
//     for (let i = 0; i < count; i++) {
//         Player.openInventory().click(slot2,1)
//     }
//     Player.openInventory().click(slot1,0)
// }

function moveItemByNameToSlot(item, slot, count) {
    let state = findItemByName(item,['main','hotbar'])
    let not_move=count
    if (state['count'] < count) {
        Chat.log("[中断]材料不足："+item+' x '+count)
        return false
    }
    i = 0
    while (not_move>0) {
        if (state['slot'][i][1] == 0){
            i++
        }
        Player.openInventory().click(state['slot'][i][0])
        // Player.openInventory().dragClick([slot],1)
        Player.openInventory().click(slot,1)
        Player.openInventory().click(state['slot'][i][0])
        state['slot'][i][1]--
        not_move--
    }
    return true

}

function produce(item_name){
    // Chat.log("制作：" +item_name )
    let product_method = current_data[item_name]['method']
    let materials = current_data[item_name]["materials"]


    res = empty_main_hand()
    if (res == false) {
        return false
    }

    let x = workstation[product_method]["container"]["x"]
    let y = workstation[product_method]["container"]["y"]
    let z = workstation[product_method]["container"]["z"]
    
    
    
    me.interactBlock(x, y, z, "up", false) 
    // Chat.log(x)
    // Chat.log(y)
    // Chat.log(z)
    while(Player.openInventory().getCurrentSyncId() == LastSyncId || Player.openInventory().getCurrentSyncId() == 0){
        // 等待打开容器 
        Client.waitTick(1)
    }

    for (let index = 0; index < 9; index++) {
        if(getItemNameBySlot(index) != "空气") {
            Player.openInventory().quick(index)
        }
    }

    for (let i = 0; i < materials.length; i++) {
        res = moveItemByNameToSlot(materials[i]["name"],current_data[item_name]["materials"][i]["position"],materials[i]["count"])
        if(res==false){
            for (let index = 0; index < 9; index++) {
                if(getItemNameBySlot(index) != "空气") {
                    Player.openInventory().quick(index)
                }
            }
            return false
        }
        
    }

    
    me.interactBlock(workstation[product_method]["handle"]["x"],
    workstation[product_method]["handle"]["y"],
    workstation[product_method]["handle"]["z"], "up", false) // 交互把手

    LastSyncId = Player.openInventory().getCurrentSyncId() //更新容器同步ID

    while(getItemNameBySlot(0)!=item_name){
        //等待产物出现
        // Client.waitTick(1)
    }
    free_slot = Player.openInventory().findFreeInventorySlot() 
    if (free_slot == -1) {
        Chat.log("[中断]背包空间不足")
        return false
    }

    Player.openInventory().quick(0)

    for (let index = 0; index < 9; index++) {
        if(getItemNameBySlot(index) != "空气") {
            Player.openInventory().quick(index)
        }
    }
    
    // move_sf_guide_to_main_hand()
    modify_item_dict(item_name,-1*current_data[item_name]["output_times"])
    return true
}


function loads(s) {
    return eval('('+s+')');
}
function dumps(o) {
    return JSON.stringify(o)
}

function merge(a,b) {
    for (const k in a) {
        
        if (k in b) {
            b[k] += a[k]
        }
        else {
            b[k] = a[k]
        }
    } 
    return b
}

function modify_item_dict(item_name,num) {
    if (item_name != "") {
        if (item_dict[item_name] == null) {
            item_dict[item_name] = num
        }
        else {
            item_dict[item_name] += num
        }
        if (item_dict[item_name]<=0) {
            delete item_dict[item_name]
        }
    }
    update_hud_list();
    
}

function update_hud_list() { JsMacros.once("Tick", JavaWrapper.methodToJava(() => {
    // 制作列表
    let current_item_list = Object.keys(item_dict)
    for (let index = 0; index < current_item_list.length && index+1 < hud_text_list.length; index++) {
        hud_text_list[index+1]?.setText(current_item_list[index]+' x '+item_dict[current_item_list[index]]);
    }
    for (let index = current_item_list.length; index+1 < hud_text_list.length; index++) {
        hud_text_list[index+1]?.setText("");
    }
    
    // text_background.setSize(100,Math.min((current_item_list.length+1)*9,hud_text_list.length*9)) 
    CALCULATE_MATERIAL = true;
}));}

function update_hud_material(material_dict) { JsMacros.once("Tick", JavaWrapper.methodToJava(() => {
    

    // 材料列表
    let current_item_list = Object.keys(material_dict)
    for (let index = 0; index < current_item_list.length && index+1 < hud_text_material.length; index++) {
        hud_text_material[index+1]?.setText(current_item_list[index]+' x '+material_dict[current_item_list[index]]);
        if (index == hud_text_material.length-2) {
            hud_text_material[index+1]?.setText("... ...");
        }
    }
    for (let index = current_item_list.length; index+1 < hud_text_material.length; index++) {
        hud_text_material[index+1]?.setText("");
    }
    // text_background.setSize(100,Math.min((current_item_list.length+1)*9,hud_text_list.length*9)) 
}));}

function update_hud_queue(queue) { JsMacros.once("Tick", JavaWrapper.methodToJavaAsync(() => {
    
    // 合成队列
    hud_text_queue[0]?.setText('合成队列：'+'('+queue.length+')');
    // Chat.log('合成队列：'+'('+queue.length+')')
    correct_repeat = 0
    last_same_item = -1

    for (let index = 0; index < queue.length && index-correct_repeat+1 <= hud_text_queue.length; index++) {
        if (queue[index] == queue[index-1]) {
            correct_repeat++
            hud_text_queue[index-correct_repeat+1]?.setText(queue[index]+" ("+(index-last_same_item+1)+")");
        } else {
            hud_text_queue[index-correct_repeat+1]?.setText(queue[last_same_item = index]);
        }
        
        
    }
    for (let index = queue.length; index-correct_repeat+1 < hud_text_queue.length; index++) {
        hud_text_queue[index-correct_repeat+1]?.setText("");
        
    }

}));}

scriptName = "Slimefun合成助手"

const reverse = !GlobalVars.getBoolean(scriptName);
GlobalVars.putBoolean(scriptName, reverse);

var me = Player.getPlayer();
var item_dict = {};

var d2d;
var hud_text_list = [];
var hud_text_material = [];
var hud_text_queue = [];


var f = FS.open('./config/craft_formula.json')
var current_data = loads(f.read())
var LastSyncId = 0
var workstation = findMutiBlockStructure()
var stack = []
var will_be_used_item = {}


var MAKE_ITEM = false
var CALCULATE_MATERIAL = false



if (reverse) {
    Chat.log(Chat.createTextBuilder().append("[").withColor(0x7)
    .append(scriptName).withColor(0x3)
    .append("]").withColor(0x7).append(" 开启").withColor(0x2)
    .build());
    // 初始化Hud
    d2d = Hud.createDraw2D()
    
    d2d.setOnInit(JavaWrapper.methodToJava(() => {
        const top_line_percentage = 0.35
        const middle_line_percentage = 0.5
        const bottom_line_percentage = 0.95

        const w = d2d.getWidth()
        const h = d2d.getHeight()

        const top_line_height = Math.round(h*top_line_percentage)
        const middle_line_height = Math.round(h*middle_line_percentage)
        const bottom_line_height = Math.round(h*bottom_line_percentage)

        line_left_blank = 4
        line_width = 100

        for (let index = 0,line_height = top_line_height;    line_height <= middle_line_height;   index++,line_height+=9) {
            hud_text_list.push(d2d.addText("", line_left_blank, line_height, 0xFFFFFF, true))
        }
        // text_background = d2d.addRect(0, top_line_height-1, 100, top_line_height+9, 0x0F0F0F,0x80) 

        for (let index = 0,line_height = middle_line_height;    line_height <= bottom_line_height;   index++,line_height+=9) {
            hud_text_material.push(d2d.addText("", line_left_blank, line_height, 0xFFFFFF, true))
        }

        for (let index = 0,line_height = top_line_height;    line_height <= bottom_line_height;   index++,line_height+=9) {
            hud_text_queue.push(d2d.addText("", line_left_blank + line_width, line_height, 0xFFFFFF, true))
        }

    }));
    
    Hud.registerDraw2D(d2d);
    JsMacros.once("Tick", JavaWrapper.methodToJava(() => {
        hud_text_list[0]?.setText("制作列表：");
        hud_text_material[0]?.setText("材料列表：");
        hud_text_queue[0]?.setText("合成队列：(0)");
    }));

    // 初始化Hud

    // 初始化监听器
    var ClickSlot_Listener = JsMacros.on("ClickSlot", JavaWrapper.methodToJava((event) => {
        
        if (event.mode != 5) {
            CALCULATE_MATERIAL = true;
        }
        else {
            if (event.button == 2 ||event.button == 6 ||event.button == 10) {
                CALCULATE_MATERIAL = true;
            }
        }
        
        if (Player.openInventory().getContainerTitle() != "Slimefun 指南") { return }
        if (event.mode == 6) { return }

        if (event.slot == 16 && Player.openInventory().getSlot(0).getName().getString() == "⇦ 返回") {
            current_item_name = Player.openInventory().getSlot(16).getName().getString()
            // Chat.log(current_item_name)
            if (event.mode==0 || event.mode==4){
                // 0单击
                // 4扔出
                if (event.button == 0) {
                    modify_item_dict(current_item_name,1)
                }
                else if (event.button == 1) {
                    modify_item_dict(current_item_name,-1)
                }
            }
            else if (event.mode==1) {
                // 1 shift单击
                if (event.button == 0) {
                    modify_item_dict(current_item_name,64)
                }
                else if (event.button == 1) {
                    modify_item_dict(current_item_name,-64)
                }
            }
        }

        if (event.slot == 10 && Player.openInventory().getSlot(0).getName().getString() == "⇦ 返回") {
            if (event.button == 0) {
                MAKE_ITEM = true
            }
        }
    }))
    // 初始化监听器

} else {
    Chat.log(Chat.createTextBuilder().append("[").withColor(0x7)
    .append(scriptName).withColor(0x3)
    .append("]").withColor(0x7).append(" 关闭").withColor(0xc)
    .build());
}



while (GlobalVars.getBoolean(scriptName)) {
    // 循环中
    Client.waitTick(1)
    if (MAKE_ITEM) {
        current_item_list = Object.keys(item_dict)
        let lack = {}
        let queue = []
        for (let index = 0; index < current_item_list.length && index+1 < hud_text_list.length; index++) {
            lack_queue = make(current_item_list[index],   item_dict[current_item_list[index]])
            // a_lack, a_queue = make(current_item_list[index],   item_dict[current_item_list[index]])
            lack = merge(lack, lack_queue[0])
            queue = queue.concat(lack_queue[1]);
        }
        
        while(Player.openInventory().getCurrentSyncId() != 0){
            Client.waitTick(1)
            // 等待回到正常背包
        }

        if (MAKE_ITEM) {
            // for (let i = 0; i < queue.length; i++) {
            //     res = produce(queue[i])
                
            //     if (res == false) { // 合成中断
            //         move_sf_guide_to_main_hand()

            //         break
            //     }
                
            // }
            while (queue.length > 0) {
                res = produce(queue.shift())
                update_hud_queue(queue)
                if (res == false) { // 合成中断
                    move_sf_guide_to_main_hand()
                    break
                }
            }
        }
        MAKE_ITEM = false // 制作完成
        move_sf_guide_to_main_hand()
    }

    if (CALCULATE_MATERIAL){
        current_item_list = Object.keys(item_dict)
        let lack = {}
        let queue = []
        for (let index = 0; index < current_item_list.length && index+1 < hud_text_list.length; index++) {
            lack_queue = make(current_item_list[index],   item_dict[current_item_list[index]])
            // a_lack, a_queue = make(current_item_list[index],   item_dict[current_item_list[index]])
            lack = merge(lack, lack_queue[0])
            queue = queue.concat(lack_queue[1]);
        }
        // Chat.log(lack)
        update_hud_queue(queue)
        update_hud_material(lack)
        CALCULATE_MATERIAL = false

    }

    if (GlobalVars.getBoolean(scriptName)){ 
        continue
    }
    
    ClickSlot_Listener.off()
    Hud.unregisterDraw2D(d2d);
    break
}

