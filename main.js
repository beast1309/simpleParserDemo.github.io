const puppeteer = require('puppeteer');
const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });
const fs = require('fs');


readline.question('Выберите категорию для парсинга:\n1. Видеокарты\n2. Процессоры\n3. SSD-накопители\n4. Материнские платы\n5. Оперативная память\n6. Блоки питания\n7. Корпусы\n', (category) => {
    switch (category) {
        case '1': console.log('vid');
            const videocards = require('./videocards.js')
            break;
        case '2': console.log('proc');

            break;
        case '3': console.log('ssd');

            break;
        case '4': console.log('mp');

            break;
        case '5': console.log('om');

            break;
        case '6': console.log('bp');

            break;
        case '7': console.log('c');

            break;
        default: console.log('Введите номер соответствующей категории');

            break;
    }
    readline.close();
})
