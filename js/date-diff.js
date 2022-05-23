class DateDiff { // 〜時間前のような表記を生成する
    constructor() { this.base = new Date() }
    get Base() { return this.base }
    set Base(d) { if (d instanceof Date) { this.base = d } }
    diff (target) { // target: epochTime(Date.parse(`ISO8601`)の返り値)
        const diff = this.base.getTime() - target
        const elapsed = new Date(diff);
        if (elapsed.getUTCFullYear() - 1970) { return elapsed.getUTCFullYear() - 1970 + '年前' }
        else if (elapsed.getUTCMonth()) { return elapsed.getUTCMonth() + 'ヶ月前' }
        else if (elapsed.getUTCDate() - 1) { return elapsed.getUTCDate() - 1 + '日前' }
        else if (elapsed.getUTCHours()) { return elapsed.getUTCHours() + '時間前' }
        else if (elapsed.getUTCMinutes()) { return elapsed.getUTCMinutes() + '分前' }
        else { return elapsed.getUTCSeconds() + '秒前' }
    }
}
