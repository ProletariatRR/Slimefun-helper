
class sfRecipe{
    constructor (file_name) {
        let f = FS.open(file_name)
        this.data = JSON.parse(f.read())
    }
}

class sfCalculator{
    constructor () {
        this.lacking_materials = {}
        this.producing_queue = {}
        this.current_item = {}
    }

    clear_data() {
        this.lacking_materials = {}
        this.producing_queue = {}
        this.current_item = {}
    }

    initRecipe(data){
        this.recipe = data
    }

    addLackingMaterials(item_id, item_count) {
        if (this.lacking_materials[item_id] == null) {
            this.lacking_materials[item_id] = {
                "name":"",
                "count":item_count
            }
        }
        else{            
            this.lacking_materials[item_id]["count"] += item_count
        }
    }

    addProducingQueue(item_id, producing_count) {
        if (this.producing_queue[item_id] == null) {
            this.producing_queue[item_id] = producing_count
        }
        else{
            this.producing_queue[item_id] += producing_count
        }
    }

    addCurrentItem(item_id, item_count) {
        if (this.current_item[item_id] == null) {
            this.current_item[item_id] = item_count
        }
        else{
            this.current_item[item_id] += item_count
        }

    }

    calculateMaterials(item_id, item_count){

        this.addCurrentItem(item_id, 0)
        if (this.recipe[item_id] == null || this.recipe[item_id]["isMaterials"] == true) {
            this.addLackingMaterials(item_id, item_count)
            return true // 初级材料
        }
    
        let producing_count
        if(this.current_item[item_id] > item_count) {
            producing_count = 0
        }
        else{
            // 制作次数 =  ( 需要数量 - 已有数量) / 产物倍数 
            producing_count = Math.ceil((item_count - this.current_item[item_id]) / this.recipe[item_id]["output_times"])

            // 已有数量 +=  制作的次数*产物倍数 - 需要数量
            this.addCurrentItem(item_id, producing_count*this.recipe[item_id]["output_times"] - item_count)
        }

        for (let i = 0; i < this.recipe[item_id]["materials"].length; i++) {
            let material = this.recipe[item_id]["materials"][i]
            let is_material = this.calculateMaterials(material["material_id"], material["material_count"]*producing_count)
            if (is_material) {
                this.lacking_materials[material["material_id"]]["name"] = material["material_name"]
            }
        }

        this.addProducingQueue(item_id, producing_count)
        return false
        
    }

}


const recipe = new sfRecipe("./config/craft_formula.json")

const calculator = new sfCalculator()
calculator.initRecipe(recipe.data)
calculator.clear_data()
calculator.calculateMaterials("slimefun:ELECTRIC_MOTOR",1)
// calculator.calculateMaterials("slimefun:ELECTRIC_MOTOR",1)

// for(item in calculator.lacking_materials){
//     Chat.log(calculator.lacking_materials[item]['name'] + " x " + calculator.lacking_materials[item]['count']);
    
// }

// for(item in calculator.producing_queue){
//     Chat.log(recipe.data[item]["item_name"] + " x " + calculator.producing_queue[item]);
    
// }
