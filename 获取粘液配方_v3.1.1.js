function wait_next_container() {
    while(Player.openInventory().getCurrentSyncId() == LastSyncId || Player.openInventory().getCurrentSyncId() == 0){
        // 等待打开容器 
        Client.waitTick(1)
    }

    LastSyncId = Player.openInventory().getCurrentSyncId()
    Client.waitTick(1)
}

function getItemInfo() {
    var item_id = getItemIdBySlot(16)
    var data = {
        "item_name":getItemNameBySlot(16),
        "isMaterials":false,
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
                "material_count":material_count,
                "position":i
            })
        }
    }
    
    return [item_id, data]
}

function close_inventory() {
    Player.openInventory().close()
    while (Player.openInventory().getCurrentSyncId()!=0) {
        Client.waitTick(1)
    }
}

function back_to_last_menu() {
    var state = findItemById("slimefun:_UI_BACK","container")
    enter_into_slot_menu(state['slot'][0][0])
}

function back_to_main_menu() {
    var state
    while((state = findItemById("slimefun:_UI_BACK","container"))) {
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

function getItemIdBySlot(Index) {
    var Item = Player.openInventory().getSlot(Index)
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
            else{
                return PublicBukkitValues.asString()
            }
        }
        else{
            return Item.getItemId() 
        }
    }
}

function findItemById(id,map_identifiers) {
    let correct_slot = []
    let item_count = 0
    if (typeof(map_identifiers)=="string"){
        for (let slot = 0; slot < Player.openInventory().getTotalSlots() ; slot++) {
            let map_loc = Player.openInventory().getLocation(slot) 
            if (map_loc != map_identifiers) 
                continue
            
            let item = Player.openInventory().getSlot(slot)
            // Chat.log(slot);
            let item_id = getItemIdBySlot(slot)
            
            

            if (item_id == id) {
                correct_slot.push([slot, item.getCount()])
                item_count += item.getCount() 
            }
        }
    }
    else if(typeof(map_identifiers)=="object"){
        for (let slot = 0; slot < Player.openInventory().getTotalSlots() ; slot++) {
            let map_loc = Player.openInventory().getLocation(slot) 
            if (!map_identifiers.includes(map_loc))
                continue

            let item = Player.openInventory().getSlot(slot)
            let item_id = getItemIdBySlot(slot)

            if (item_id == id) {
                correct_slot.push([slot, item.getCount()])
                item_count += item.getCount() 
            }
        }
    }
    
    return {"slot":correct_slot.sort(function(a,b){return a[1]-b[1]}), "count":item_count}
}

function nextPage() {
    var state = findItemById('slimefun:_UI_NEXT_ACTIVE','container')
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
        if (!(k in b)) {
            b[k] = a[k]
        }
    } 
    return b
}

function move_sf_guide_to_main_hand(){
    s = findItemById('{"slimefun:slimefun_guide_mode":"SURVIVAL_MODE"}',['main','hotbar'])
    main_hand_slot = Player.openInventory().getSelectedHotbarSlotIndex()
    // KeyBind.pressKeyBind("key.inventory")
    Player.openInventory().swapHotbar(s['slot'][0][0], main_hand_slot) 
    Player.openInventory().close()
}

function open_guide(){
    move_sf_guide_to_main_hand()
    me.interact()
    wait_next_container()
}

var LastSyncId = 0
var SF_TITLE = ""

if (FS.makeDir('./config/')) {
    FS.createFile('./config/', 'type_list.txt')
    Chat.log("初始化成功，请进入config文件夹，编辑type_list.txt文件")
}
else{
    var me = Player.getPlayer()
    me.interact()
    wait_next_container()
    back_to_main_menu()

    var file = FS.open('./config/type_list.txt').readLines() 
    var class_list = []

    while(file.hasNext()) {
        line = file.next().split(',').map(str => parseInt(str));
        class_list.push(line)
    }
    current_data = {}
    current_mkm = {}
    for (let index = 0; index < class_list.length; index++) {
        let UNLOCK = true
        for (let deep = 0; deep < class_list[index].length; deep++) {
            item_id= getItemIdBySlot(class_list[index][deep])
            if (item_id == 'minecraft:barrier') {
                Chat.log(getItemNameBySlot(class_list[index][deep]))
                UNLOCK = false
                break
            }
            enter_into_slot_menu(class_list[index][deep])
        }
        if (UNLOCK==false) {
            continue
        }
        do {
            for (let slot = 9; slot < 45; slot++) {
                item_id= getItemIdBySlot(slot)
                // Chat.log(item_id)
                item_name = getItemNameBySlot(slot)
                if (item_id == "minecraft:air") {
                    break
                }
                if (item_id == 'slimefun:_UI_NO_PERMISSION') {
                    Chat.log("未解锁："+item_name)
                    continue
                }
                if (item_id == 'slimefun:_UI_NOT_RESEARCHED') {
                    Chat.log("未解锁："+item_name)
                    continue
                }
                
                Chat.log("读取："+item_name)
                enter_into_slot_menu(slot)
                info = getItemInfo()
                current_data[info[0]] = info[1]
                current_mkm[item_name] = info[0]
                back_to_last_menu()
                
                
            }
        } while (nextPage());
        back_to_main_menu()
    }


    if (FS.exists('./config/craft_formula.json') ) {
        f = FS.open('./config/craft_formula.json')
        previous_data = loads(f.read())
        data = merge(previous_data,current_data)
        s = dumps(data)
        f.write(s)    
        Chat.log("已将新配方合并至craft_formula.json")
    }
    else{
        FS.createFile('./config/', 'craft_formula.json')
        f = FS.open('./config/craft_formula.json')
        s = dumps(current_data)
        f.write(s)   
        Chat.log("已创建craft_formula.json并写入配方")  
    }


    if (FS.exists('./config/mainKeyMap.json') ) {
        f = FS.open('./config/mainKeyMap.json')
        previous_mkm = loads(f.read())
        mkm = merge(previous_mkm,current_mkm)
        s = dumps(mkm)
        f.write(s)    

    }
    else{
        FS.createFile('./config/', 'mainKeyMap.json')
        f = FS.open('./config/mainKeyMap.json')
        s = dumps(current_mkm)
        f.write(s)   

    }
}