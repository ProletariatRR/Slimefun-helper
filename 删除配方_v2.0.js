
function loads(s) {
    return eval('('+s+')');
}
function dumps(o) {
    return JSON.stringify(o)
}

if (FS.exists('./config/craft_formula.json') && FS.exists('./config/blacklist.txt')) {
    f = FS.open('./config/craft_formula.json')
    bl = FS.open('./config/blacklist.txt').readLines()
    data = loads(f.read())
    while(bl.hasNext()) {
        line = bl.next();
        if (data[line] != null) {
            delete data[line]
            Chat.log("删除："+line)
        }
        else{
            Chat.log("不存在："+line)
        }
    }

    f.write(dumps(data))
    Chat.log("已保存")
}
else{

    FS.createFile('./config/', 'blacklist.txt')
    Chat.log("初始化成功，请进入config文件夹，编辑blacklist.txt文件")
}

