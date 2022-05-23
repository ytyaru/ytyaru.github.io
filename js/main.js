window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('Loaded !!');
    async function requestWebmention() { // https://ytyaru.github.io/
        const mention = new WebMention() 
        await mention.make() 
    }
    requestWebmention()
});

