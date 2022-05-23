window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('Loaded !!');
    async function requestWebmention() { // https://ytyaru.github.io/
        const domain = `ytyaru.github.io`
        const token = ``
        const res = await fetch(`https://webmention.io/api/mentions.jf2?domain=${domain}&token=${token}`)
        const json = await res.json()
        console.log(json)
    }
    requestWebmention()
});

