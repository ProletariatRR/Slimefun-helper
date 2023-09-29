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

function close_container() {
    Player.openInventory().close()
    while (Player.openInventory().getCurrentSyncId()!=0) {
        Client.waitTick(1)
    }
}

function open_container(x,y,z) {
    me.interactBlock(x, y, z, "up", false) 
    res = wait_next_container()
    if (res == false) {
        Chat.log("打开容器("+x+","+y+","+z+")失败：交互距离过远/网络波动")
        return false
    }
    return true
}


function build_chest_storage() {
    let chest_map = {} 
    let dispensor_list = chest_scanner.scanAroundPlayer(2)
    let inventory_count = 0
    let player_pos = me.getPos()
        
    Chat.log("正在查看库存")
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
        chest_map[dispensor_list[i]] = Player.openInventory()
        inventory_count++
        close_container()
    }
    Chat.log("检测到"+inventory_count+"个箱子")
    return chest_map
}

function getItemIdBySlot(Index,inventory) {
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
            else{
                return PublicBukkitValues.asString()
            }
        }
        else{
            return Item.getItemId() 
        }
    }
}


function findItemByIdInContainer(id,map_identifiers,inventory) {
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


function moveItemFromSlotToSlot(slot1, slot2, count) {
    Player.openInventory().click(slot1)
    for(let i = 0; i< count; i++) {
        Player.openInventory().click(slot2,1)
    }
    Player.openInventory().click(slot1)
}

function moveItemByIdFromContainerToInventory(item_id, count) {
    let container_state = findItemByIdInContainer(item_id,'container',Player.openInventory())
    let inventory_state = findItemByIdInContainer(item_id,['main','hotbar'],Player.openInventory())
    inventory_state['slot'] = inventory_state['slot'].reverse()

    let not_move=count
    if (container_state['count'] < count) {
        Chat.log("[中断]材料不足")
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

function moveItemByIdFromStorageToInventory(item_id, count) {
    let storage_state = findItemByIdInStorage(item_id)
    let not_move=count

    if (storage_state['count'] < count) {
        Chat.log("[中断]箱子存储材料不足")
        return false
    }

    let chest_index = 0

    while (not_move>0) {
        while (storage_state['chest'][chest_index][1] == 0){
            chest_index++
        }
        let pos = storage_state['chest'][chest_index][2].split(',').map(str => parseInt(str))

        open_container(pos[0],pos[1],pos[2])
        chest_map[storage_state['chest'][chest_index][2]] = Player.openInventory()

        if (storage_state['chest'][chest_index][1] >= not_move) {
            
            moveItemByIdFromContainerToInventory(item_id,not_move)
            close_container()
            storage_state['chest'][chest_index][1] -= not_move
            not_move = 0
        }
        else{
           
            moveItemByIdFromContainerToInventory(item_id,storage_state['chest'][chest_index][1])
            close_container()
            not_move -= storage_state['chest'][chest_index][1]
            storage_state['chest'][chest_index][1]=0
            
        }

    }
    return true
}


function findItemByIdInStorage(item_id) {
    let correct_chest = []
    let item_count = 0
    let keys = Object.keys(chest_map)
    for (let index = 0; index < keys.length; index++) {
        let chest_res = findItemByIdInContainer(item_id,'container',chest_map[keys[index]])
        correct_chest.push([index,chest_res['count'],keys[index]])
        item_count+=chest_res['count']
    }
    return {'chest':correct_chest.sort(function(a,b){return a[1]-b[1]}),'count':item_count}
}

var LastSyncId = 0
var me = Player.getPlayer()
var chest_scanner = World.getWorldScanner().withStringBlockFilter().contains("minecraft:chest").withStringStateFilter().contains("type=right","type=single").build()



var chest_map = build_chest_storage()
// // res = findItemByIdInStorage("minecraft:stone",chest_map)
// res = findItemByIdInStorage("slimefun:GOLD_DUST",chest_map)
// Chat.log(res)
// me.interact()
// wait_next_container()

moveItemByIdFromStorageToInventory('slimefun:IRON_DUST',2,chest_map)
// moveItemByIdFromStorageToInventory('minecraft:stone',64,chest_map)
// moveItemByIdFromContainerToInventory('minecraft:stone',128)