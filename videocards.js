const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    let now = new Date()
    let start = Date.now()
    const interval = 3000

    fs.appendFileSync('C:/Users/slupi/Desktop/parser/videocards.txt', '\n' + 'Результаты парсинга видеокарт МВидео за: ' + `${now}` + '\n', (err) => {
        if (err) {
            console.error(err)
            return
        }
    })

    console.log('Парсинг МВидео (категория: Видеокарты):\n')
    console.log('Примерное время завершения: вычисляется...')

    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto('https://www.mvideo.ru/komputernye-komplektuushhie-5427/videokarty-5429/f/category=videokarty-5438/tolko-v-nalichii=da?reff=menu_main')

    await new Promise(t => setTimeout(t, interval))

    await page.evaluate(() => {
        window.scrollTo({
            top: 2000,
            left: 0,
            behavior: 'smooth'
        })
    })

    await new Promise(t => setTimeout(t, interval))

    await page.evaluate(() => {
        window.scrollTo({
            top: 6000,
            left: 0,
            behavior: 'smooth'
        })
    })

    await new Promise(t => setTimeout(t, interval))

    await page.evaluate(() => {
        window.scrollTo({
            top: 10000,
            left: 0,
            behavior: 'smooth'
        })
    })

    /* await new Promise(t => setTimeout(t, interval)) */

    let pages = await page.evaluate(() => {
        let pagesLinks = Array.from(document.querySelectorAll('.page-link'), el => el.href)
        pagesLinks.splice(0, 2)
        pagesLinks.splice(-1, 1)
        return pagesLinks
    })

    await new Promise(t => setTimeout(t, interval))

    let arr = await page.evaluate(() => {
        let text = Array.from(document.querySelectorAll('.product-title__text.product-title--clamp'), el => el.href)
        return text
    })

    let arrVal = arr.length

    let parseSec = (interval / 1000 * ((arrVal * (pages.length + 1) * 7.5 / 1.5))) / (arrVal * (pages.length + 1) / 1.5)

    let progress = now.getMinutes() + (parseSec * (arrVal * (pages.length + 1) / 1.5))

    console.log(arr)
    console.log(arrVal)


    const ts = 120000
    setInterval(() => {
        if (progress > (ts / 1000)) console.log('Примерное время завершения: ' + (progress -= (ts / 1000)) + ' сек')
        else return
    },
        ts
    )

    await new Promise(t => setTimeout(t, interval))

    await browser.close()

    for (let index = 0; arr.length > index; index++) {
        const cardPage = await puppeteer.launch({ headless: false })
        const newcardPage = await cardPage.newPage()
        await newcardPage.goto(arr[index])

        await new Promise(t => setTimeout(t, interval))

        await newcardPage.evaluate(() => {
            window.scrollTo({
                top: 800,
                left: 0,
                behavior: 'smooth'
            })
        })

        await new Promise(t => setTimeout(t, interval))

        await newcardPage.evaluate(() => {
            window.scrollTo({
                top: 1400,
                left: 0,
                behavior: 'smooth'
            })
        })

        await new Promise(t => setTimeout(t, interval))

        await newcardPage.evaluate(() => {
            window.scrollTo({
                top: 2200,
                left: 0,
                behavior: 'smooth'
            })
        })

        await new Promise(t => setTimeout(t, interval))

        let name = await newcardPage.evaluate(() => {
            let cardName = '\n' + '\n' + document.querySelector('.bar__product-title').innerText
            return cardName
        })

        let price = await newcardPage.evaluate(() => {
            let cardPrice/*  = document.querySelector('.price__main-value').innerText */
            if (document.querySelector('.price__main-value')) {
                cardPrice = document.querySelector('.price__main-value').innerText
                return cardPrice
            }
            else {
                cardPrice = 'Уточните цену на сайте'
                return cardPrice
            }
        })

        let attr = await newcardPage.evaluate(() => {
            let attrName = Array.from(document.querySelectorAll('.item-with-dots.item-with-dots--mobile-column-layout'), el => '\n' + el.innerText.replace('\n', ' '))
            return attrName
        })

        console.log(name)
        console.log(index)
        console.log(price)
        console.log(attr)

        fs.appendFileSync('C:/Users/slupi/Desktop/parser/videocards.txt', `${name}\n${price}\n${attr}\n`, (err) => {
            if (err) {
                console.error(err)
                return
            }
        })

        await new Promise(t => setTimeout(t, interval))

        await cardPage.close()
    }

    for (let index = 0; pages.length > index; index++) {
        const browser = await puppeteer.launch({ headless: false })
        const newPage = await browser.newPage()
        newPage.goto(pages[index])

        await new Promise(t => setTimeout(t, interval))

        await newPage.evaluate(() => {
            window.scrollTo({
                top: 2000,
                left: 0,
                behavior: 'smooth'
            })
        })

        await new Promise(t => setTimeout(t, interval))

        await newPage.evaluate(() => {
            window.scrollTo({
                top: 6000,
                left: 0,
                behavior: 'smooth'
            })
        })

        await new Promise(t => setTimeout(t, interval))

        await newPage.evaluate(() => {
            window.scrollTo({
                top: 10000,
                left: 0,
                behavior: 'smooth'
            })
        })

        let arr = await newPage.evaluate(() => {
            let text = Array.from(document.querySelectorAll('.product-title__text.product-title--clamp'), el => el.href)
            return text
        })

        arrVal += arr

        console.log(arr)
        console.log(arrVal)

        for (let index = 0; arr.length > index; index++) {
            const cardPage = await puppeteer.launch({ headless: false })
            const newcardPage = await cardPage.newPage()
            await newcardPage.goto(arr[index])

            await new Promise(t => setTimeout(t, interval))

            await newcardPage.evaluate(() => {
                window.scrollTo({
                    top: 800,
                    left: 0,
                    behavior: 'smooth'
                })
            })

            await new Promise(t => setTimeout(t, interval))

            await newcardPage.evaluate(() => {
                window.scrollTo({
                    top: 1400,
                    left: 0,
                    behavior: 'smooth'
                })
            })

            await new Promise(t => setTimeout(t, interval))

            await newcardPage.evaluate(() => {
                window.scrollTo({
                    top: 2200,
                    left: 0,
                    behavior: 'smooth'
                })
            })

            await new Promise(t => setTimeout(t, interval))

            let name = await newcardPage.evaluate(() => {
                let cardName = '\n' + '\n' + document.querySelector('.bar__product-title').innerText
                return cardName
            })

            let price = await newcardPage.evaluate(() => {
                let cardPrice
                if (document.querySelector('.price__main-value')) {
                    cardPrice = document.querySelector('.price__main-value').innerText
                    return cardPrice
                }
                else {
                    cardPrice = 'Уточните цену на сайте'
                    return cardPrice
                }
            })

            let attr = await newcardPage.evaluate(() => {
                let attrName = Array.from(document.querySelectorAll('.item-with-dots.item-with-dots--mobile-column-layout'), el => '\n' + el.innerText.replace('\n', ' '))
                return attrName
            })

            console.log(name)
            console.log(index)
            console.log(price)
            console.log(attr)

            fs.appendFileSync('C:/Users/slupi/Desktop/parser/videocards.txt', `${name}\n${price}\n${attr}\n`, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })

            await new Promise(t => setTimeout(t, interval))

            await cardPage.close()
        }

        fs.appendFileSync('C:/Users/slupi/Desktop/parser/videocards.txt', 'всего видеокарт в наличии: ' + `${arrVal}` + ' \n', (err) => {
            if (err) {
                console.error(err)
                return
            }
        })

        await browser.close()
    }

    let end = Date.now()

    console.log('Парсинг завершён за ' + `${(end - start) / 1000}` + ' секунд')
})()


module.exports;