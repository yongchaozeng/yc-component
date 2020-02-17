let fs = require('fs')
let basepath = 'src/components/';
let moment = require('moment');
let cptName = process.argv.splice(2)[0];
let path = cptName.split('/');
let name = path[path.length - 1];
let file = [];
async function creatCpt() {
    try {
        await exists(); // 检测文件夹
        await writeFile(await readFile()); //写入组件
    }
    catch (err) {
        console.error(err);
    }
}
let exists = function () {
    return new Promise((res) => {
        (async  ()=> {
            for (let fileName of path) {
                fs.existsSync(basepath + fileName) ? basepath = `${basepath}${fileName}/` : await mkdir(fileName);
            }
            res(basepath);
        })()
    })
}
let mkdir = function (a) {
    return new Promise((res, rej) => {
        fs.mkdir(basepath + a, (err) => {
            if (err) rej(err);
            basepath = `${basepath}${a}/`
            res(basepath);
        });
    })
}
let reads = [`${basepath}template/index.tsx`, ];//要读取的文件

let readFile = function () {
    return new Promise((res) => {
        for (let a of reads) {
            let text = fs.readFileSync(a).toString();
            text = text.replace(/time/g, moment().format('YYYY/MM/DD'))
                .replace(/temp/g, name);
            file.push(text)
        }
        res(file);
    })
}

let writes = [  `index.tsx`,`index.less`,];

let writeFile = function (file) {

    return new Promise((res, rej) => {
        (async function () {
            for (let template of writes) {
                await fs.writeFile(`${basepath}${template}`,
                    template == writes[0] ?file[0]: '', (err) => {
                        if (err) rej(err)
                    })
            }
            res('succ');
        })()
    })
}
creatCpt()
