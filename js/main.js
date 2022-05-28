window.addEventListener('DOMContentLoaded', async(event) => {
    const mention = new WebMention() 
    await mention.make() 
    try {
        window.mpurse.updateEmitter.removeAllListeners()
          .on('stateChanged', isUnlocked => console.log(isUnlocked))
          .on('addressChanged', address => console.log(address));
    } catch(e) { console.debug(e) }
});

