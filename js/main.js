window.addEventListener('DOMContentLoaded', async(event) => {
    const mention = new WebMention() 
    await mention.make() 
    try {
        window.mpurse.updateEmitter.removeAllListeners()
          .on('stateChanged', isUnlocked => console.log(isUnlocked))
          .on('addressChanged', address => console.log(address));
    } catch(e) { console.debug(e) }
    document.querySelector(`toot-dialog`).addEventListener('toot', async(event) => {
        console.debug('トゥートしました！ここから先はWebComponent,brid.gyと連携させたいが難しそう。brid.gyのAPIがなさそうなのとタイミング問題もある。なので妥協してマストドンAPIの応答からコメントHTMLを作成して即座に表示する。', event.detail);
        //document.querySelector(`#res`).value = JSON.stringify(event.detail.json)
        const html = new Comment().mastodonResToComment(event.detail.json)
        document.querySelector(`#web-mention-comment`).innerHTML = html + document.querySelector(`#web-mention-comment`).innerHTML
    });
});

