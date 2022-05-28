class WebMention {
    constructor() {
        this.dateDiff = new DateDiff()
        this.target = `https://ytyaru.github.io/`
        this.count = null
        this.mentions = null
    }
    async make() {
        this.dateDiff.Base = new Date()
        await this.#count()
        await this.#mentions()
    }
    async #count() {
        const res = await fetch(`https://webmention.io/api/count?target=${this.target}`)
        let json = await res.json()
        this.count = json
        console.debug(json)
        document.getElementById('web-mention-count').textContent = `${json['count']} mensions`
        //json = this.#getTestCount()
        //if (0 < json['count']) { document.getElementById('web-mention-count').textContent = `${json['count']} mensions` }
    }
    #getTestCount() { return {
        "count": 6,
        "type": {
            "bookmark": 1,
            "mention": 2,
            "rsvp-maybe": 1,
            "rsvp-no": 1,
            "rsvp-yes": 1
        }
    }}
    async #mentions() {
        const res = await fetch(`https://webmention.io/api/mentions.jf2?target=${this.target}&sort-by=published&sort-dir=down&per-page=30&page=0`)
        const mentions = await res.json()
        this.mentions = mentions
        console.debug(mentions)
        await this.#comment()
        await this.#like()
        await this.#bookmark()
    }
    async #comment() {
        //mentions.children = this.#getTestChildren()
        const comments = this.mentions.children.filter(child=>child.hasOwnProperty('content')).map(child=>this.#commentTypeA(child))
        document.getElementById('web-mention-comment').innerHTML = comments.join('')
    }
    async #like() { // ツイートでいう♥いいね！
        const htmls = this.mentions.children.filter(child=>child.hasOwnProperty('like-of')).map(child=>this.#author(child.author))
        // 表示用HMTLを作成する予定
        const count = (this.count.type.hasOwnProperty('like')) ? this.count.type.like : 0
        document.getElementById('web-mention-hart').innerHTML = `<span title="いいね！">♥${count}</span>${htmls.slice(0,10).join('')}`
    }
    async #bookmark() { // 
        const htmls = this.mentions.children.filter(child=>child.hasOwnProperty('bookmark-of')).map(child=>this.#author(child.author))
        // 表示用HMTLを作成する予定
        const count = (this.count.type.hasOwnProperty('bookmark')) ? this.count.type.bookmark : 0
        document.getElementById('web-mention-bookmark').innerHTML = `<span title="ブックマーク">🔖${count}</span>${htmls.slice(0,5).join('')}`
    }
    #author(author, size=32) {
        const name = author.name
        const photo = author.photo || ''
        return `<a href="${author.url}" title="${author.name}"><img src="${author.photo}" alt="${author.name}" width="${size}" height="${size}"></a>`
    }
    #commentTypeA(child) { // コメント、日時、人（アイコン、名前）
        const content = child.content.html || child.content.text
        const diff = this.dateDiff.diff(Date.parse(child.published))
        return `<div class="mention"><div class="mention-meta"><a href="${child.author.url}"><img src="${child.author.photo}" alt="${child.author.name}" width="32" height="32"><span>${child.author.name}<span></a>　<span title="${this.dateDiff.Iso}">${diff}</span><div>${content}</div></div></div>`
        //return `<div class="mention"><div class="mention-meta"><a href="${child.author.url}"><img src="${child.author.photo}" alt="${child.author.name}" width="32" height="32"><span>${child.author.name}<span></a>　<span title="${child.published}">${diff}</span><div>${content}</div></div></div>`

        //return `<div class="mention"><div>${content}</div><div class="mention-meta"><div title="${child.published}">${diff}</div><div><a href="${child.author.url}"><img src="${child.author.photo}" alt="${child.author.name}" width="32" height="32">${child.author.name}</a></div></div></div></div>`
        //return `<div class="mention"><div>${content}</div><div class="mention-meta"><div title="${child.published}">${diff}</div><div><a href="${child.author.url}"><img src="${child.author.photo}" alt="${child.author.name}" width="32" height="32">${child.author.name}</a></div></div></div>`
    }
    #commentTypeB(child) { // 人、コメント、日時
        const content = child.content.html || child.content.text
        const diff = this.dateDiff.diff(Date.parse(child.published))
        return `<tr><td><a href="${child.author.url}"><img src="${child.author.photo}" alt="${child.author.name}" width="64" height="64"><br>${child.author.name}</a></td><td><div></div><div>${content}<div>${name}</div><div>${date}</div></div></td></tr>`
    }
    #getTestChildren() {
        return [
            {
              "type": "entry",
              "author": {
                "type": "card",
                "name": "Tantek Çelik",
                "url": "http://tantek.com/",
                "photo": "http://tantek.com/logo.jpg"
              },
              "url": "http://tantek.com/2013/112/t2/milestone-show-indieweb-comments-h-entry-pingback",
              "published": "2013-04-22T15:03:00-07:00",
              "wm-received": "2013-04-25T17:09:33-07:00",
              "wm-id": 900,
              "content": {
                "text": "Another milestone: @eschnou automatically shows #indieweb comments with h-entry sent via pingback http://eschnou.com/entry/testing-indieweb-federation-with-waterpigscouk-aaronpareckicom-and--62-24908.html",
                "html": "Another milestone: <a href=\"https:\/\/twitter.com\/eschnou\">@eschnou<\/a> automatically shows #indieweb comments with h-entry sent via pingback <a href=\"http:\/\/eschnou.com\/entry\/testing-indieweb-federation-with-waterpigscouk-aaronpareckicom-and--62-24908.html\">http:\/\/eschnou.com\/entry\/testing-indieweb-federation-with-waterpigscouk-aaronpareckicom-and--62-24908.html<\/a>"
              },
              "mention-of": "https://indieweb.org/",
              "wm-property": "mention-of",
              "wm-private": false
            }, 
            {
              "type": "entry",
              "author": {
                "type": "card",
                "name": "名前ですよ",
                "url": "http://tantek.com/",
                "photo": "http://tantek.com/logo.jpg"
              },
              "url": "http://tantek.com/2013/112/t2/milestone-show-indieweb-comments-h-entry-pingback",
              "published": "2013-04-22T15:03:00-07:00",
              "wm-received": "2013-04-25T17:09:33-07:00",
              "wm-id": 900,
              "content": {
                "text": "ああああああああああああああああ",
                "html": "ああああああああああああああああiiiiiiiiiii"
              },
              "mention-of": "https://indieweb.org/",
              "wm-property": "mention-of",
              "wm-private": false
            }
        ]
    }
}
