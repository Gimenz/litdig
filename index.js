const { default: axios } = require('axios');
const inquirer = require("inquirer")
var _ = require('lodash');
var fuzzy = require('fuzzy');
const readlineSync = require('readline-sync');
var Spinner = require('cli-spinner').Spinner;
const chalk = require('chalk');

var spinner = new Spinner('sedang proses... %s');
spinner.setSpinnerDelay(300)
spinner.setSpinnerString(' I  LOVE  YOU ');

function pad2(n) {
    return (n < 10 ? '0' : '') + n;
}
var date = new Date();
var month = pad2(date.getMonth() + 1);//months (0-11)
var day = pad2(date.getDate());//day (1-31)
var year = date.getFullYear();
var formattedDate = year + "-" + month + "-" + day;


banner = `
█████╗ ██╗   ██╗████████╗ ██████╗      ██████╗ ███████╗████████╗    ██╗     ██╗███╗   ██╗██╗  ██╗    
██╔══██╗██║   ██║╚══██╔══╝██╔═══██╗    ██╔════╝ ██╔════╝╚══██╔══╝    ██║     ██║████╗  ██║██║ ██╔╝    
███████║██║   ██║   ██║   ██║   ██║    ██║  ███╗█████╗     ██║       ██║     ██║██╔██╗ ██║█████╔╝     
██╔══██║██║   ██║   ██║   ██║   ██║    ██║   ██║██╔══╝     ██║       ██║     ██║██║╚██╗██║██╔═██╗     
██║  ██║╚██████╔╝   ██║   ╚██████╔╝    ╚██████╔╝███████╗   ██║       ███████╗██║██║ ╚████║██║  ██╗    
╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝      ╚═════╝ ╚══════╝   ╚═╝       ╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝    
                                                                                                      
███████╗ ██████╗  ██████╗ ███╗   ███╗   ██╗   ██╗███████╗    ██╗     ██╗████████╗██████╗ ██╗ ██████╗  
╚══███╔╝██╔═══██╗██╔═══██╗████╗ ████║   ██║   ██║██╔════╝    ██║     ██║╚══██╔══╝██╔══██╗██║██╔════╝  
  ███╔╝ ██║   ██║██║   ██║██╔████╔██║   ██║   ██║███████╗    ██║     ██║   ██║   ██║  ██║██║██║  ███╗ 
 ███╔╝  ██║   ██║██║   ██║██║╚██╔╝██║   ██║   ██║╚════██║    ██║     ██║   ██║   ██║  ██║██║██║   ██║ 
███████╗╚██████╔╝╚██████╔╝██║ ╚═╝ ██║██╗╚██████╔╝███████║    ███████╗██║   ██║   ██████╔╝██║╚██████╔╝ 
╚══════╝ ╚═════╝  ╚═════╝ ╚═╝     ╚═╝╚═╝ ╚═════╝ ╚══════╝    ╚══════╝╚═╝   ╚═╝   ╚═════╝ ╚═╝ ╚═════╝  
                                                                                                      `

async function getEvents(prov, date) {
    try {
        const { data } = await axios.get('https://event.literasidigital.id/data/get_events?prov=' + prov + '&regency=&date=' + date)
        const event = data.data
        return event
    } catch (error) {
        console.log(error);
    }
}

async function getInfo(prov, regency, date) {
    try {
        const { data } = await axios.get('https://event.literasidigital.id/data/get_overview?prov=' + prov + '&regency=' + regency + '&date=' + date)
        //console.log(data);
        return chalk`
  {bold.cyan
—————————————————————————— [LITDIG] ——————————————————————————
                    [?] {bold.green C0DED BY MASGIMENZ}
—————————————————— [INFORMASI EVENT LITDIG] ——————————————————

- Judul : ${chalk.cyan(data.nearby.tema)}
- Lokasi : ${chalk.cyan(data.nearby.lokasi)}
- Waktu : ${chalk.cyan(data.nearby.tanggal)} - ${chalk.cyan(data.nearby.waktu)} ${chalk.cyan(data.nearby.zona_waktu)}
- Link : ${chalk.cyan(/https?:\/\/(?:[-\w.]|(?:%[\da-fA-F]{2}))+\S\S\S\S\S\S\S\S\S\S\S\S\S\S/gm.exec(data.nearby.link))}

——————————————————————————————————————————————————————————————}`;
    } catch (error) {
        console.log(error);
    }

}

let prov = {
    "ACEH": 11,
    "SUMATERA UTARA": 12,
    "SUMATERA BARAT": 13,
    "RIAU": 14,
    "JAMBI": 15,
    "SUMATERA SELATAN": 16,
    "BENGKULU": 17,
    "LAMPUNG": 18,
    "KEPULAUAN BANGKA BELITUNG": 19,
    "KEPULAUAN RIAU": 21,
    "DKI JAKARTA": 31,
    "JAWA BARAT": 32,
    "JAWA TENGAH": 33,
    "DI YOGYAKARTA": 34,
    "JAWA TIMUR": 35,
    "BANTEN": 36,
    "BALI": 51,
    "NUSA TENGGARA BARAT": 52,
    "NUSA TENGGARA TIMUR": 53,
    "KALIMANTAN BARAT": 61,
    "KALIMANTAN TENGAH": 62,
    "KALIMANTAN SELATAN": 63,
    "KALIMANTAN TIMUR": 64,
    "KALIMANTAN UTARA": 65,
    "SULAWESI UTARA": 71,
    "SULAWESI TENGAH": 72,
    "SULAWESI SELATAN": 73,
    "SULAWESI TENGGARA": 74,
    "GORONTALO": 75,
    "SULAWESI BARAT": 76,
    "MALUKU": 81,
    "MALUKU UTARA": 82,
    "PAPUA BARAT": 91,
    "PAPUA": 94
}


function searchProv(answers, input) {
    input = input || '';
    return new Promise(function (resolve) {
        setTimeout(function () {
            var fuzzyResult = fuzzy.filter(input, Object.keys(prov));
            resolve(
                fuzzyResult.map(function (el) {
                    return el.original;
                })
            );
        }, _.random(30, 500));
    });
}

console.log(chalk`
  {bold.cyan
${banner}       
}
      `);

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
inquirer.prompt([
    {
        type: 'autocomplete',
        name: 'provinsi',
        default: 'JAWA TENGAH',
        message: 'Pilih Provinsi mana?',
        searchText: 'Searching. . .!',
        emptyText: 'Nothing found!',
        source: searchProv,
        pageSize: 4,
        validate: function (val) {
            return val ? true : 'Type something!';
        },
    }
]).then(async function (answers) {
    //console.log(prov[answers.provinsi]);
    spinner.start();
    let event = await getEvents(prov[answers.provinsi], formattedDate)
    if (event.length < 1) return console.log('tidak ada event di provinsi ' + answers.provinsi);
    let list = []
    let no = 1
    for (let i = 0; i < event.length; i++) {
        list += `${no}. ${chalk.green(event[i].tema)} | ${chalk.yellow(event[i].lokasi)} | ${chalk.cyan(event[i].waktu)}\n`
        no++
    }

    //console.log(event);
    spinner.stop()
    console.log("\nEnter your choice\n" + list)
    const nomer = readlineSync.question('Pilih Nomer : ');
    console.clear()
    const info = await getInfo(prov[answers.provinsi], event[nomer - 1].regency_id, formattedDate)
    console.log(info);
});

