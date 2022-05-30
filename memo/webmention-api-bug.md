# webmention api バグ？

* https://github.com/aaronpk/webmention.io#api

　複数のwm-property[]を指定しても、なぜか最後に指定したwm-property[]の種類しか取得できなかった。

```javascript
    async #comment() {
        // 複数のwm-property[]を指定しても、なぜか最後に指定したwm-property[]の種類しか取得できなかった
        /*
        const url = this.#getRequestUrl(this.per, this.page)
        url.searchParams.set('wm-property[]', 'in-reply-to');
        url.searchParams.set('wm-property[]', 'mention-of');
        url.searchParams.set('wm-property[]', 'repost-of');
        console.log(url.searchParams)
        console.log(url)
        const mentions = await this.#request(url)
        console.log(mentions)
        */
        /* fetchエラー
        const url = this.#getRequestUrl(this.per, this.page)
        url.searchParams.set('wm-property[0]', 'in-reply-to');
        url.searchParams.set('wm-property[1]', 'repost-of');
        url.searchParams.set('wm-property[2]', 'mention-of');
        console.log(url.searchParams)
        console.log(url)
        const mentions = await this.#request(url)
        console.log(mentions)
        */
        /* fetchエラー
        const url = `${this.API_URL}?target=${this.target}&sort-by=published&sort-dir=down&per-page=${this.per}&page=${this.page}&wm-property[0]=in-reply-to&wm-property[1]=repost-of&wm-property[2]=mention-of`
        console.log(url)
        const mentions = await this.#request(url)
        console.log(mentions)
        */
        /* mention-ofのみ取得
        const url = `${this.API_URL}?target=${this.target}&sort-by=published&sort-dir=down&per-page=${this.per}&page=${this.page}&wm-property[]=in-reply-to&wm-property[]=repost-of&wm-property[]=mention-of`
        console.log(url)
        const mentions = await this.#request(url)
        console.log(mentions)
        */
        const url = `${this.API_URL}?target=${this.target}&wm-property[]=in-reply-to&wm-property[]=repost-of&wm-property[]=mention-of`
        console.log(url)
        const mentions = await this.#request(url)
        console.log(mentions)

        /*
        */
        //const url = `${this.API_URL}?target=${this.target}&sort-by=published&sort-dir=down&per-page=${this.per}&page=${this.page}&wm-property=in-reply-to&wm-property=repost-of&wm-property=mention-of`
        //const url = `${this.API_URL}?target=${this.target}&sort-by=published&sort-dir=down&per-page=${this.per}&page=${this.page}&wm-property=in-reply-to,repost-of,mention-of`

        /*
        const url = this.#getRequestUrl(this.per, this.page)
        url.searchParams.set('wm-property[]', 'in-reply-to,repost-of,mention-of');
        console.log(url)
        const mentions = await this.#request(url)
        console.log(mentions)
        */

        console.log(url)
        //const mentions = await this.#request(url)
        console.log(mentions)
        document.getElementById('web-mention-comment').innerHTML += mentions.children.filter(child=>child.hasOwnProperty('content')).map(child=>this.#commentTypeA(child)).join('')
    }
```

