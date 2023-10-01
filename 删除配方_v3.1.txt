
function loads(s) {
    return eval('('+s+')');
}
function dumps(o) {
    return JSON.stringify(o)
}

mkm = loads(FS.open('./config/mainKeyMap.json').read())


if (FS.exists('./config/craft_formula.json') && FS.exists('./config/blacklist.txt')) {
    f = FS.open('./config/craft_formula.json')
    bl = FS.open('./config/blacklist.txt').readLines()
    data = loads(f.read())
    while(bl.hasNext()) {
        line = bl.next();
        
        if(data[mkm[line]] == null ||data[mkm[line]]['isMaterials'] == true){
            Chat.log("不存在："+line)
        }
        else if (data[mkm[line]] != null || data[mkm[line]]['isMaterials'] == false) {
            data[mkm[line]]['isMaterials'] = true
            Chat.log("删除："+line)
        }
    }

    f.write(dumps(data))
    Chat.log("已保存")
}
else{

    FS.createFile('./config/', 'blacklist.txt')
    Chat.log("初始化成功，请进入config文件夹，编辑blacklist.txt文件")
}

