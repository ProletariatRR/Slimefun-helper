function findMutiBlockStructure() {
    
    let workstation = {}
    let dispensor_list = World.getWorldScanner()
    .withStringBlockFilter().contains("dispenser")
    .build().scanAroundPlayer(2)
    for (let i = 0; i < dispensor_list.size(); i++) {
        // Chat.log(dispensor_list[i])
        let neighbor_block = {}
        neighbor_block["up"] = World.getBlock(dispensor_list[i].add(0,1,0)).getId()
        neighbor_block["down"] = World.getBlock(dispensor_list[i].add(0,-1,0)).getId()
        neighbor_block["north"] = World.getBlock(dispensor_list[i].add(0,0,-1)).getId() 
        neighbor_block["south"] = World.getBlock(dispensor_list[i].add(0,0,1)).getId() 
        neighbor_block["west"] = World.getBlock(dispensor_list[i].add(-1,0,0)).getId()
        neighbor_block["east"] = World.getBlock(dispensor_list[i].add(1,0,0)).getId()
        // Chat.log(neighbor_block["up"])
        
        let player_pos = me.getPos()
        player_pos.y = dispensor_list[i].y
        let distance = dispensor_list[i].toVector(player_pos).getMagnitude()
        if (distance > 5) {
            continue
        }
        // if (!(dispensor_list[i].x == 15254 && dispensor_list[i].z==5574)) {
        //     continue
        // }
        // Chat.log(neighbor_block)

        if (neighbor_block["up"] == "minecraft:crafting_table"){
            workstation["slimefun:ENHANCED_CRAFTING_TABLE"] = {
                "container" : dispensor_list[i],
                "handle" : dispensor_list[i].add(0,1,0)
            }
            // Chat.log("已识别: 增强型工作台")

        }else if (neighbor_block["up"] == "minecraft:oak_fence"){
            workstation["slimefun:GRIND_STONE"] = {
                "container" : dispensor_list[i],
                "handle" : dispensor_list[i].add(0,1,0)
            }
            // Chat.log("已识别：磨石")

        }else if (neighbor_block["up"] == "minecraft:anvil"){
            workstation["slimefun:ARMOR_FORGE"] = {
                "container" : dispensor_list[i],
                "handle" : dispensor_list[i].add(0,1,0)
            }
            // Chat.log("已识别：盔甲锻造台")

        }else if(( neighbor_block["north"] == "minecraft:iron_bars" && neighbor_block["south"] == "minecraft:iron_bars" && neighbor_block["up"] == "minecraft:nether_brick_fence") ||
        ( neighbor_block["west"] == "minecraft:iron_bars"  && neighbor_block["east"] == "minecraft:iron_bars"  && neighbor_block["up"] == "minecraft:nether_brick_fence")){
            workstation["slimefun:ORE_CRUSHER"] = {
                "container" : dispensor_list[i],
                "handle" : dispensor_list[i].add(0,1,0)
            }
            // Chat.log("已识别：矿石粉碎机")

        }else if(( neighbor_block["north"] == "minecraft:nether_bricks" && neighbor_block["south"] == "minecraft:nether_bricks" && neighbor_block["up"] == "minecraft:nether_brick_fence" && neighbor_block["down"] =="minecraft:fire" ) ||
        ( neighbor_block["west"] == "minecraft:nether_bricks"  && neighbor_block["east"] == "minecraft:nether_bricks"  && neighbor_block["up"] == "minecraft:nether_brick_fence" && neighbor_block["down"] =="minecraft:fire")){
            workstation["slimefun:SMELTERY"] = {
                "container" : dispensor_list[i],
                "handle" : dispensor_list[i].add(0,1,0)
            }
            // Chat.log("已识别：冶炼炉")

        }else if(( neighbor_block["north"] == "minecraft:piston" && neighbor_block["south"] == "minecraft:piston" && neighbor_block["up"] == "minecraft:nether_brick_fence") ||
        ( neighbor_block["west"] == "minecraft:piston"  && neighbor_block["east"] == "minecraft:piston"  && neighbor_block["up"] == "minecraft:nether_brick_fence")){
            workstation["slimefun:COMPRESSOR"] = {
                "container" : dispensor_list[i],
                "handle" : dispensor_list[i].add(0,1,0)
            }
            // Chat.log("已识别：压缩机")

        }else if(( neighbor_block["north"] == "minecraft:smooth_stone_slab" && neighbor_block["south"] == "minecraft:smooth_stone_slab" && neighbor_block["down"] == "minecraft:glass") ||
        ( neighbor_block["west"] == "minecraft:smooth_stone_slab"  && neighbor_block["east"] == "minecraft:smooth_stone_slab"  && neighbor_block["down"] == "minecraft:glass")){
            workstation["slimefun:PRESSURE_CHAMBER"] = {
                "container" : dispensor_list[i],
                "handle" : dispensor_list[i].add(0,-2,0)
            }
            // Chat.log("已识别：压力舱")

        }else if((neighbor_block["north"] == "minecraft:crafting_table" && World.getBlock(dispensor_list[i].add(0,0,-2)).getId()  == "minecraft:bookshelf")
        || (neighbor_block["south"] == "minecraft:crafting_table" && World.getBlock(dispensor_list[i].add(0,0,2)).getId()  == "minecraft:bookshelf")
        || (neighbor_block["west"] == "minecraft:crafting_table" && World.getBlock(dispensor_list[i].add(-2,0,0)).getId()  == "minecraft:bookshelf")
        || (neighbor_block["east"] == "minecraft:crafting_table" && World.getBlock(dispensor_list[i].add(2,0,0)).getId()  == "minecraft:bookshelf")){
            if (neighbor_block["north"] == "minecraft:crafting_table" && World.getBlock(dispensor_list[i].add(0,0,-2)).getId()  == "minecraft:bookshelf") {
                workstation["slimefun:MAGIC_WORKBENCH"] = {
                    "container" : dispensor_list[i],
                    "handle" : dispensor_list[i].add(0,0,-1)
                }
            }else if (neighbor_block["south"] == "minecraft:crafting_table" && World.getBlock(dispensor_list[i].add(0,0,2)).getId()  == "minecraft:bookshelf") {
                workstation["slimefun:MAGIC_WORKBENCH"] = {
                    "container" : dispensor_list[i],
                    "handle" : dispensor_list[i].add(0,0,1)
                }
            }else if (neighbor_block["west"] == "minecraft:crafting_table" && World.getBlock(dispensor_list[i].add(-2,0,0)).getId() == "minecraft:bookshelf") {
                workstation["slimefun:MAGIC_WORKBENCH"] = {
                    "container" : dispensor_list[i],
                    "handle" : dispensor_list[i].add(-1,0,0)
                }
            }else if (neighbor_block["east"] == "minecraft:crafting_table" && World.getBlock(dispensor_list[i].add(2,0,0)).getId() == "minecraft:bookshelf") {
                workstation["slimefun:MAGIC_WORKBENCH"] = {
                    "container" : dispensor_list[i],
                    "handle" : dispensor_list[i].add(1,0,0)
                }
            }
            // Chat.log("已识别：魔法工作台")

        }else if(neighbor_block["down"] == "minecraft:oak_fence" && World.getBlock(dispensor_list[i].add(0,-2,0)).getId() == "minecraft:cauldron"){
            // Chat.log("已识别：洗矿机")
            workstation["slimefun:ORE_WASHER"] = {
                "container" : dispensor_list[i],
                "handle" : dispensor_list[i].add(0,-1,0)
            }
        }
    }

    return workstation
}

function wait_next_container() {
    tick = 0
    MAXTICKS = 10
    while(Player.openInventory().getCurrentSyncId() == LastSyncId || Player.openInventory().getCurrentSyncId() == 0){
        // 等待打开容器 
        Client.waitTick(1)
        tick++
        if (tick>MAXTICKS) {
            
            return false
        }
    }
    LastSyncId = Player.openInventory().getCurrentSyncId()
    Client.waitTick(1)
    return true
}

function open_container(x,y,z) {
    empty_main_hand()
    me.interactBlock(x, y, z, "up", false) 
    res = wait_next_container()
    if (res == false) {
        Chat.log("打开容器("+x+","+y+","+z+")失败：交互距离过远/网络波动")
        return false
    }
    return true
}

function getItemInfo() {
    var item_id = getItemIdBySlot(16)
    var data = {
        "item_name":getItemNameBySlot(16),
        "output_times":Player.openInventory().getSlot(16).getCount(),
        "craft_id":getItemIdBySlot(10),
        "craft_name":getItemNameBySlot(10),
        "materials":[]
    }

    var tabel = [3,4,5,12,13,14,21,22,23]
    for (let i = 0; i < 9; i++) {
        let material_id = getItemIdBySlot(tabel[i])
        let material_name = getItemNameBySlot(tabel[i])
        let material_count = Player.openInventory().getSlot(tabel[i]).getCount() 

        if (material_id!="minecraft:air"){
            data["materials"].push({
                "material_id":material_id,
                "material_name":material_name,
                "count":material_count,
                "position":i
            })
        }
    }
    
    return [item_id, data]
}

function close_container() {
    Player.openInventory().close()
    while (Player.openInventory().getCurrentSyncId()!=0) {
        Client.waitTick(1)
    }
}

function back_to_last_menu() {
    var state = findItemByIdInContainer("slimefun:_UI_BACK","container")
    enter_into_slot_menu(state['slot'][0][0])
}

function back_to_main_menu() {
    var state
    while((state = findItemByIdInContainer("slimefun:_UI_BACK","container"))) {
        if (state['count'] == 0) 
            break
        enter_into_slot_menu(state['slot'][0][0])
        Client.waitTick(1)
    }
}

function enter_into_slot_menu(slot) {
    Player.openInventory().click(slot)
    wait_next_container()
}


function loads(s) {
    return eval('('+s+')');
}
function dumps(o) {
    return JSON.stringify(o)
}

function getItemNameBySlot(Index) {
    return Player.openInventory().getSlot(Index).getName().getString()
}

function getItemNbtBySlot(Index) {
    Item = Player.openInventory().getSlot(Index), Nbt = Item.getNBT()
    return Nbt
}

function getItemIdBySlot(Index,inventory = Player.openInventory()) {
    var Item = inventory.getSlot(Index)
    var Nbt = Item.getNBT()

    if (Nbt==null) {
        return Item.getItemId()  
    }    
    else {
        if (Nbt.has("PublicBukkitValues")) {
            let PublicBukkitValues = Nbt.get("PublicBukkitValues")
            if(PublicBukkitValues.has("slimefun:slimefun_item")) {
                return "slimefun:"+PublicBukkitValues.get("slimefun:slimefun_item").asString()
            }
            else if(PublicBukkitValues.has("slimefun:slimefun_guide_mode")) {
                return "slimefun:slimefun_guide"
            }
            else{
                return Item.getItemId() 
            }
        }
        else{
            return Item.getItemId() 
        }
    }
}

function findItemByIdInContainer(id,map_identifiers,inventory = Player.openInventory()) {
    let correct_slot = []
    let item_count = 0
    if (typeof(map_identifiers)=="string"){
        for (let slot = 0; slot < inventory.getTotalSlots() ; slot++) {
            let map_loc = inventory.getLocation(slot) 
            if (map_loc != map_identifiers) 
                continue
            
            let item = inventory.getSlot(slot)
            // Chat.log(slot);
            let item_id = getItemIdBySlot(slot,inventory)
            
            if (item_id == id) {
                correct_slot.push([slot, item.getCount()])
                item_count += item.getCount() 
            }
        }
    }
    else if(typeof(map_identifiers)=="object"){
        for (let slot = 0; slot < inventory.getTotalSlots() ; slot++) {
            let map_loc = inventory.getLocation(slot) 
            if (!map_identifiers.includes(map_loc))
                continue

            let item = inventory.getSlot(slot)
            let item_id = getItemIdBySlot(slot,inventory)

            if (item_id == id) {
                correct_slot.push([slot, item.getCount()])
                item_count += item.getCount() 
            }
        }
    }
    
    return {"slot":correct_slot.sort(function(a,b){return a[1]-b[1]}), "count":item_count}
}

function findItemByIdInStorage(item_id) {
    let correct_chest = []
    let item_count = 0
    let keys = Object.keys(chest_map)
    let index = 0
    for (const chest in chest_map) {
        let chest_state = findItemByIdInContainer(item_id,'container',chest_map[chest])
        correct_chest.push([index++,chest_state['count'],chest])
        item_count+=chest_state['count']
        // Chat.log(chest_state['count'])
        
    }
    // Chat.log(item_count)
    return {'chest':correct_chest.sort(function(a,b){return a[1]-b[1]}),'count':item_count}
}


function nextPage() {
    var state = findItemByIdInContainer('slimefun:_UI_NEXT_ACTIVE','container')
    if (state['count'] == 0 ) {
        return false
    }
    else{
        enter_into_slot_menu(state['slot'][0][0])
        return true
    }
}

function method(o) {
    for (const m in o) {
        Chat.log(m)
    }
}

function merge(a,b) {
    for (const k in a) {
        
        if (k in b) {
            b[k]["count"] += a[k]["count"]
        }
        else {
            b[k] = a[k]
        }
    } 
    return b
}

function move_sf_guide_to_main_hand(){
    s = findItemByIdInContainer(SF_ID,['main','hotbar'])
    if(s['count'] == 0) {
        Chat.log("背包中未检测到粘液书")
        return false
    }
    main_hand_slot = Player.openInventory().getSelectedHotbarSlotIndex()
    // KeyBind.pressKeyBind("key.inventory")
    Player.openInventory().swapHotbar(s['slot'][0][0], main_hand_slot) 
    Client.waitTick(1)
    // Player.openInventory().close()
    return true
}

function empty_main_hand() {
    // Player.openInventory().close()
    // while (Player.openInventory().getCurrentSyncId() != 0) {
    //     // Client.waitTick(1)
    //     Chat.log("未返回")
    // }
    main_hand_slot = Player.openInventory().getSelectedHotbarSlotIndex()
    free_slot = Player.openInventory().findFreeInventorySlot() 
    if (free_slot == -1) {
        Chat.log("[中断]背包空间不足")
        return false
    }

    // Player.openInventory().openGui()
    Player.openInventory().swapHotbar(free_slot, main_hand_slot) 
    // Client.waitTick(1)
    // while (getItemIdBySlot(free_slot) == "minecraft:air") {
    //     Client.waitTick(1)  
    //     Chat.log(getItemIdBySlot(free_slot))      
    // }
    // Player.openInventory().close()

    return true
}


function open_guide(){
    res  = move_sf_guide_to_main_hand()
    if (res == false) {
        return false
    }
    me.interact()
    wait_next_container()
}


function product_stack(item_id, item_count, enforced) {

    state = findItemByIdInContainer(item_id,['main','hotbar'])
    let lack = {}

    if (will_be_used_item[item_id] == null) {
        will_be_used_item[item_id] = 0
    }

    if (state["count"]>=item_count+will_be_used_item[item_id] && !enforced) { 
        // 已有数量 >= 需要数量 + 已用数量
        // 已经足够（无需制作）
        will_be_used_item[item_id]+= item_count // 用掉的个数
        return {}

    } else if (current_data[item_id] == null || current_data[item_id]['isMaterials'] == true) {
        // 无配方（初级材料）
        lack[item_id] = {
            "name":"",
            "count":item_count
        }
        return lack
    }else {
        // 不够
        // 制作缺少的数量
        
        // 制作次数 =  ( 需要数量 - (已有数量 - 已用数量) ) / 产物倍数 
        let product_count = Math.ceil((item_count - (state["count"] - will_be_used_item[item_id])) / current_data[item_id]["output_times"]) 

        if (enforced) {
            // 制作次数 =  ( 需要数量 ) / 产物倍数 
            product_count = Math.ceil((item_count ) / current_data[item_id]["output_times"]) 
        }

        
        will_be_used_item[item_id] -= product_count*current_data[item_id]["output_times"] - item_count // 已使用数量 = 已使用数量 + 当前需要 - 制作的次数*产物倍数
        
        let materials = current_data[item_id]["materials"]
        var lacking_flag = false // 缺材料标记
        for (let i = 0; i < materials.length; i++) {
            // 准备材料
            let inherit_lack = product_stack(materials[i]["material_id"], materials[i]["material_count"]*product_count,false) // 材料入栈

            if (inherit_lack[materials[i]["material_id"]]!=null) {
                inherit_lack[materials[i]["material_id"]]["name"] =  materials[i]["material_name"]
            }

            for (const item in inherit_lack) {
                lacking_flag = true // 进入该循环说明缺材料
                if (lack[item] == null) {
                    lack[item] = inherit_lack[item]
                } else {
                    lack[item]['count'] += inherit_lack[item]['count']
                }
            }
        }
        if (stack[item_id] == null) {   
            stack[item_id] = product_count
        }
        else {
            stack[item_id] += product_count
        }
    }

    return lack
}

function make(item_id,item_count) {
    stack = {}
    will_be_used_item = {}
    return [product_stack(item_id,item_count,true), stack]
}

function moveItemByIdFromInventoryToSlot(item_id, slot, count) {
    let state = findItemByIdInContainer(item_id,['main','hotbar'])
    let not_move=count
    if (state['count'] < count) {

        return false
    }
    i = 0
    while (not_move>0) {
        if (state['slot'][i][1] == 0){
            i++
        }
        moveItemFromSlotToSlot(state['slot'][i][0], slot, 1)
        state['slot'][i][1]--
        not_move--
    }
    return true
}

function moveItemFromSlotToSlot(slot1, slot2, count) {
    Player.openInventory().click(slot1)
    for(let i = 0; i< count; i++) {
        Player.openInventory().click(slot2,1)
    }
    Player.openInventory().click(slot1)
}


function moveItemByIdFromContainerToInventory(item_id, count) {
    let container_state = findItemByIdInContainer(item_id,'container')
    let inventory_state = findItemByIdInContainer(item_id,['main','hotbar'])
    inventory_state['slot'] = inventory_state['slot'].reverse()

    let not_move=count
    if (container_state['count'] < count) {
        Chat.log("[中断]容器材料不足")
        return false
    }
    let con_index = 0
    let inv_index = 0

    while (not_move>0) {

        while (container_state['slot'][con_index][1] == 0){
            con_index++
        }

        if (inventory_state['slot'].length == 0) {
            free_slot = Player.openInventory().findFreeInventorySlot() 
            if (free_slot == -1) {
                Chat.log("[中断]背包空间不足")
                return false
            }
            inventory_state['slot'].push([free_slot,0])
        }

        while (inventory_state['slot'][inv_index][1] == 64){
            inv_index++
            if (inv_index >= inventory_state['slot'].length) {
                // Chat.log("填满整组")
                free_slot = Player.openInventory().findFreeInventorySlot() 
                if (free_slot == -1) {
                    Chat.log("[中断]背包空间不足")
                    return false
                }
                inventory_state['slot'].push([free_slot,0])
            }
        }

        moveItemFromSlotToSlot(container_state['slot'][con_index][0], inventory_state['slot'][inv_index][0], 1)

        container_state['slot'][con_index][1]--
        inventory_state['slot'][inv_index][1]++
        not_move--
        // Chat.log(inventory_state)
    }
    return true
}

function moveItemByIdFromStorageToInventory(item_id, count, Just_Tick_It = false) {
    
    let storage_state = findItemByIdInStorage(item_id)
    let not_move=count
    // Chat.log(storage_state['count'])
    if (storage_state['count'] < count) {
        
        if(Just_Tick_It) {
            not_move = storage_state['count']
        }
        else{
            Chat.log(item_id+"库存剩余 x"+storage_state['count'])
            return false
        }
    }
    

    let chest_index = 0

    while (not_move>0) {
        while (storage_state['chest'][chest_index][1] == 0){
            chest_index++
        }
        let pos = storage_state['chest'][chest_index][2].split(',').map(str => parseInt(str))

        open_container(pos[0],pos[1],pos[2])
        
        let res 
        if (storage_state['chest'][chest_index][1] >= not_move) {
            
            res = moveItemByIdFromContainerToInventory(item_id,not_move)
            chest_map[storage_state['chest'][chest_index][2]] = Player.openInventory()

            storage_state['chest'][chest_index][1] -= not_move
            not_move = 0
        }
        else{
           
            res = moveItemByIdFromContainerToInventory(item_id,storage_state['chest'][chest_index][1])
            chest_map[storage_state['chest'][chest_index][2]] = Player.openInventory()

            not_move -= storage_state['chest'][chest_index][1]
            storage_state['chest'][chest_index][1]=0
            
        }

        if (res == false) {
            return false
        }

    }
    // 
    if(Just_Tick_It) {
        return Math.min(storage_state['count'], count)
    }
    else{
        return true
    }

}


function empty_dispenser(){
    for (let index = 0; index < 9; index++) {
        if(getItemNameBySlot(index) != "空气") {
            Player.openInventory().quick(index)
        }
    }
}

function produce(item_id){
    // res = moveItemByIdFromStorageToInventory(item_id,1)
    // if (res == true) {
    //     Chat.log('已经拿了'+item_id)
    //     return true
    // }

    let product_method = current_data[item_id]['craft_id']
    let materials = current_data[item_id]["materials"]
    // res = empty_main_hand()
    if (res == false) {
        return false
    }

    if (workstation[product_method] == null) {
        Chat.log("工作台："+current_data[item_id]['craft_name'])
        Chat.log("超出交互距离/未正确搭建/暂不支持")
        return false
    }

    let x = workstation[product_method]["container"]["x"]
    let y = workstation[product_method]["container"]["y"]
    let z = workstation[product_method]["container"]["z"]
    
    open_container(x, y, z)
    empty_dispenser()

    for (let i = 0; i < materials.length; i++) {
        
        res = moveItemByIdFromInventoryToSlot(materials[i]["material_id"],current_data[item_id]["materials"][i]["position"],materials[i]["material_count"])
        
        if(res==false){
            Chat.log("[中断]缺少材料："+materials[i]["material_name"])
            empty_dispenser()
            // REPLENISH_MATERIALS = true
            return false
        }
    }



    me.interactBlock(workstation[product_method]["handle"]["x"],
    workstation[product_method]["handle"]["y"],
    workstation[product_method]["handle"]["z"], "up", false) // 交互把手

    LastSyncId = Player.openInventory().getCurrentSyncId() //更新容器同步ID

    // t = 0
    while(getItemIdBySlot(0)!=item_id){
        //等待产物出现
        // Chat.log((++t)+'ticks')
        Client.waitTick(1)
    }
    moveItemByIdFromContainerToInventory(item_id, current_data[item_id]['output_times'])
    modify_item_dict(item_id,-current_data[item_id]["output_times"])

    return true
}


function modify_item_dict(item_id,num) {
    if (current_data[item_id] == null || current_data[item_id]["isMaterials"] == true) {
        // Chat.log(item_id)
        Chat.log("不可制作该物品")
        return
    }
    if (item_id != "" && current_data[item_id] != null) {
        if (item_dict[item_id] == null) {
            item_dict[item_id] = num
        }
        else {
            item_dict[item_id] += num
        }
        if (item_dict[item_id]<=0) {
            delete item_dict[item_id]
        }
    }
    update_hud_list();
    
}


function update_hud_list() { JsMacros.once("Tick", JavaWrapper.methodToJavaAsync(() => {
    // 制作列表
    let current_item_list = Object.keys(item_dict)
    for (let index = 0; index < current_item_list.length && index+1 < hud_text_list.length; index++) {
        let item_name = current_data[current_item_list[index]]['item_name']
        hud_text_list[index+1]?.setText(item_name+' x '+item_dict[current_item_list[index]]);
    }
    for (let index = current_item_list.length; index+1 < hud_text_list.length; index++) {
        hud_text_list[index+1]?.setText("");
    }
    
    // text_background.setSize(100,Math.min((current_item_list.length+1)*9,hud_text_list.length*9)) 
    CALCULATE_MATERIALS = true;
}));}

function update_hud_material(material_dict) { JsMacros.once("Tick", JavaWrapper.methodToJavaAsync(() => {
    

    // 材料列表
    let current_item_list = Object.keys(material_dict)
    for (let index = 0; index < current_item_list.length && index+1 < hud_text_material.length; index++) {
        let item_name = material_dict[current_item_list[index]]["name"]
        let item_count = material_dict[current_item_list[index]]["count"]
        // Chat.log(item_name)
        hud_text_material[index+1]?.setText(item_name+' x '+item_count);
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
    
    // // 合成队列
    
    // // Chat.log('合成队列：'+'('+queue.length+')')
    // correct_repeat = 0
    // last_same_item = -1

    // for (let index = 0; index < queue.length && index-correct_repeat+1 <= hud_text_queue.length; index++) {

    //     // let item_name = current_data[]['item_name']

    //     if (queue[index] == queue[index-1]) {
    //         correct_repeat++
    //         hud_text_queue[index-correct_repeat+1]?.setText(current_data[queue[index]]['item_name']+" ("+(index-last_same_item+1)+")");
    //     } else {
    //         hud_text_queue[index-correct_repeat+1]?.setText(current_data[queue[last_same_item = index]]['item_name']);
    //     }
        
        
    // }
    // for (let index = queue.length; index-correct_repeat+1 < hud_text_queue.length; index++) {
    //     hud_text_queue[index-correct_repeat+1]?.setText("");
        
    // }
    // // CALCULATE_MATERIAL = true;
    let current_item_list = Object.keys(queue)
    let total_count = 0
    for (let index = 0; index < current_item_list.length && index+1 < hud_text_queue.length; index++) {
        let item_name = current_data[current_item_list[index]]['item_name']
        let item_count = queue[current_item_list[index]]
        total_count += item_count
        // Chat.log(item_name)
        hud_text_queue[index+1]?.setText(item_name+' ('+item_count+')');
        if (index == hud_text_queue.length-2) {
            hud_text_queue[index+1]?.setText("... ...");
        }
    }
    hud_text_queue[0]?.setText('合成队列：'+'('+total_count+')');
    for (let index = current_item_list.length; index+1 < hud_text_queue.length; index++) {
        hud_text_queue[index+1]?.setText("");
    }
    // Chat.log(stack)
}));}

function build_chest_storage() {
    let chest_scanner = World.getWorldScanner().withStringBlockFilter().contains("minecraft:chest").withStringStateFilter().contains("type=right","type=single").build()
    let chest_map = {} 
    let dispensor_list = chest_scanner.scanAroundPlayer(2)
    let inventory_count = 0
    let player_pos = me.getPos()
        
    Chat.log("正在查看库存")
    res = empty_main_hand()
    if (res == false ) {
        return false
    }
    for (let i = 0; i < dispensor_list.size(); i++) {
        player_pos.y = dispensor_list[i].y
        let distance = dispensor_list[i].toVector(player_pos).getMagnitude()
        if (distance > 5) {
            continue
        }

        res = open_container(dispensor_list[i].x,dispensor_list[i].y,dispensor_list[i].z)
        if (res == false) {
            continue
        }
        // Chat.log(dispensor_list[i].toString())
        chest_map[dispensor_list[i].toString()] = Player.openInventory()
        inventory_count++

    }
    close_container()
    Chat.log("检测到"+inventory_count+"个箱子")
    return chest_map
}



scriptName = "slimefun合成助手v3.1"

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
// var workstation = findMutiBlockStructure()
var workstation
var stack = {}
var will_be_used_item = {}
var chest_map 


var MAKE_ITEM = false
var CALCULATE_MATERIALS = false
var REPLENISH_MATERIALS = false

var SF_TITLE = ""
var SF_ID = ""


Hud.clearDraw2Ds()
// modify_item_dict("slimefun:GRANDPAS_WALKING_STICK",1)
// Chat.log(item_dict)
if (reverse) {
    Chat.log(Chat.createTextBuilder().append("[").withColor(0x7)
    .append(scriptName).withColor(0x3)
    .append("]").withColor(0x7).append(" 开启").withColor(0x2)
    .build());
    // 初始化Hud
    d2d = Hud.createDraw2D()
    
    d2d.setOnInit(JavaWrapper.methodToJavaAsync(() => {
        const top_line_percentage = 0.05
        const middle_line_percentage = 0.5
        const bottom_line_percentage = 0.90

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
    JsMacros.once("Tick", JavaWrapper.methodToJavaAsync(() => {
        hud_text_list[0]?.setText("制作列表：");
        hud_text_material[0]?.setText("材料列表：");
        hud_text_queue[0]?.setText("合成队列：(0)");
    }));

    // 初始化Hud

    // chest_map = build_chest_storage()
    ts = parseInt(Player.openInventory().getTotalSlots()/9)*9 - (9- Player.openInventory().getSelectedHotbarSlotIndex())
    SF_ID = getItemIdBySlot(ts)
    Chat.log('主手快捷栏：'+ts)
    Chat.log('已识别粘液书ID：'+SF_ID)
    me.interact()
    wait_next_container()
    // back_to_main_menu()
    SF_TITLE = Player.openInventory().getContainerTitle()
    close_container()

    Chat.log("已识别粘液书标题："+SF_TITLE)
    
    Chat.log("更新周围箱子库存，请不要手动改变箱子内物品")
    move_sf_guide_to_main_hand()
    chest_map = build_chest_storage() // 更新库存
    move_sf_guide_to_main_hand()
    


    // 初始化监听器
    var ClickSlot_Listener = JsMacros.on("ClickSlot", JavaWrapper.methodToJava((event) => {
        // Chat.log(event.slot)
        if (event.mode != 5) {
            CALCULATE_MATERIALS = true;
        }
        else {
            if (event.button == 2 ||event.button == 6 ||event.button == 10) {
                CALCULATE_MATERIALS = true;
            }
        }
        
        if (Player.openInventory().getContainerTitle() != SF_TITLE) { return }
        if (event.mode == 6) { return }

        if (event.slot == 16 && getItemIdBySlot(0)=="slimefun:_UI_BACK") {
            current_item_id = getItemIdBySlot(16)

            // Chat.log(current_item_id)
            if (event.mode==0 || event.mode==4){
                // 0单击
                // 4扔出
                if (event.button == 0) {
                    modify_item_dict(current_item_id,1)
                }
                else if (event.button == 1) {
                    modify_item_dict(current_item_id,-1)
                }
            }
            else if (event.mode==1) {
                // 1 shift单击
                if (event.button == 0) {
                    modify_item_dict(current_item_id,64)
                }
                else if (event.button == 1) {
                    modify_item_dict(current_item_id,-64)
                }
            }
        }

        if (event.slot == 10 && getItemIdBySlot(0)=="slimefun:_UI_BACK") {
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
        MAKE_ITEM = false 
        // chest_map = build_chest_storage() // 更新库存
        current_item_list = Object.keys(item_dict)
        let lack = {}
        let queue = {}
        for (let index = 0; index < current_item_list.length && index+1 < hud_text_list.length; index++) {
            lack_queue = make(current_item_list[index],   item_dict[current_item_list[index]])
            // a_lack, a_queue = make(current_item_list[index],   item_dict[current_item_list[index]])
            lack = merge(lack, lack_queue[0])
            queue = merge(queue, lack_queue[1]);
        }
        while(Player.openInventory().getCurrentSyncId() != 0){
            Client.waitTick(1)
            // 等待回到正常背包
        }

        if (Object.keys(lack).length == 0) {
            var workstation = findMutiBlockStructure()
            let make_list = Object.keys(queue)
            let lack_flag = false
            for (let i = 0; i < make_list.length && !lack_flag; i++) {
                let item_id = make_list[i]
                while (queue[item_id]>0) {
                    res = produce(make_list[i])
                    if (res == false) {
                        lack_flag = true
                        break
                    }
                    queue[item_id]--
                    if (queue[item_id] == 0) {
                        delete queue[item_id]
                    }
                    update_hud_queue(queue)
                }
            }
        }
        else{
            REPLENISH_MATERIALS = true
        }
        close_container()
        move_sf_guide_to_main_hand()

    }
    else if (CALCULATE_MATERIALS){
        CALCULATE_MATERIALS = false

        let lack = {}
        let queue = {}

        for (let item_id in item_dict) {
            lack_queue = make(item_id, item_dict[item_id])
            lack = merge(lack, lack_queue[0])
            queue = merge(queue,lack_queue[1]);
        }

        update_hud_queue(queue)
        update_hud_material(lack)
    }
    else if(REPLENISH_MATERIALS){
        // chest_map = build_chest_storage() // 更新库存
        REPLENISH_MATERIALS = false
        let lack = {}
        let queue = {}
        for (let item_id in item_dict) {
            lack_queue = make(item_id,   item_dict[item_id])
            lack = merge(lack, lack_queue[0])
            queue = merge(queue,lack_queue[1]);
        }
        update_hud_material(lack) // 计算材料

        // 拿合成队列
        let res 
        queue_key = Object.keys(queue).reverse()
        for (let i = 1; i < queue_key.length; i++) {
            let item_id = queue_key[i]

            res = moveItemByIdFromStorageToInventory(item_id,queue[item_id]*current_data[item_id]['output_times'], Just_Tick_It = true)
            // Chat.log(item_id+" x "+queue[item_id])
            if (res > 0) {
                lack = {}
                queue = {}

                for (let item_id in item_dict) {
                    lack_queue = make(item_id, item_dict[item_id])
                    lack = merge(lack, lack_queue[0])
                    queue = merge(queue,lack_queue[1]);
                }
                update_hud_queue(queue)
                update_hud_material(lack)
            }
        }
        


        // 拿材料列表
        
        for (let material in lack) {
            res = moveItemByIdFromStorageToInventory(material,lack[material]['count'])
            if ( res == false ) {
                break
            }
            else if (res == true) {
                delete lack[material]
                update_hud_material(lack)
            }
        }
        close_container()
        move_sf_guide_to_main_hand()
        CALCULATE_MATERIALS = true
        if ( res == true ) {
            MAKE_ITEM = true
        }
    }

    if (GlobalVars.getBoolean(scriptName)){ 
        continue
    }
    
    ClickSlot_Listener.off()
    Hud.unregisterDraw2D(d2d);
    break
}

