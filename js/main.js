window.addEventListener('DOMContentLoaded', async(event) => {
    try {
        window.mpurse.updateEmitter.removeAllListeners()
          .on('stateChanged', isUnlocked => console.log(isUnlocked))
          .on('addressChanged', address => console.log(address));
    } catch(e) { console.debug(e) }
    const mention = new WebMention() 
    await mention.make() 
    tippy('#web-mention-count', {
        theme: 'custom',
        allowHTML: true,
        interactive: true,
        trigger: 'click',
        arrow: false, // 吹き出し矢印の色は変えられなかったので消した
        placement: 'right',
        content: `<a href="https://ytyaru.github.io/">ここのURL</a>を書いて<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-text="いいね！" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>すると↓に表示されます。<a href="https://mstdn.jp/">mstdn.jp</a>か<a href="https://pawoo.net/">pawoo</a>でTootしても同じです。`,
    });
});

