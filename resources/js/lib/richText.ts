export function renderBold(text: string): string {
    return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

/**
 * Renders a small markdown-ish subset used across admin-editable long-form
 * fields: "- " bullets (nestable via leading spaces), "## " subheadings,
 * blank-line paragraphs, **bold**, "![caption](src)" inline images, and
 * "!video[caption](src)" inline videos.
 */
export function renderRichText(text: string | null | undefined): string {
    if (!text) return '';

    const rawLines = text.split('\n').filter((line) => line.trim().length > 0);

    let html = '';
    // Indent width of each currently-open <ul>. The <li> at the deepest
    // level is left unclosed while its indent could still deepen further —
    // browsers nest a following <ul> inside that open <li> automatically.
    const listStack: number[] = [];
    let liOpen = false;

    const closeLi = () => {
        if (liOpen) {
            html += '</li>';
            liOpen = false;
        }
    };

    const closeListsDeeperThan = (indent: number) => {
        while (listStack.length && indent < listStack[listStack.length - 1]) {
            closeLi();
            html += '</ul>';
            listStack.pop();
            liOpen = listStack.length > 0;
        }
    };

    const closeAllLists = () => closeListsDeeperThan(-1);

    for (const raw of rawLines) {
        const indent = raw.match(/^\s*/)?.[0].length ?? 0;
        const line = raw.trim();

        const heading = line.match(/^#{2,3}\s+(.*)/);
        const video = line.match(/^!video\[(.*?)\]\((.*?)\)/);
        const image = line.match(/^!\[(.*?)\]\((.*?)\)/);
        const bullet = line.match(/^[-*]\s+(.*)/);

        if (heading) {
            closeAllLists();
            html += `<h4>${renderBold(heading[1])}</h4>`;
        } else if (video) {
            closeAllLists();
            const [, caption, src] = video;
            html += `<figure class="cs-rich-figure"><video src="${src}" muted loop autoplay playsinline></video>${
                caption ? `<figcaption>${renderBold(caption)}</figcaption>` : ''
            }</figure>`;
        } else if (image) {
            closeAllLists();
            const [, caption, src] = image;
            html += `<figure class="cs-rich-figure"><img src="${src}" alt="${caption}" loading="lazy" />${
                caption ? `<figcaption>${renderBold(caption)}</figcaption>` : ''
            }</figure>`;
        } else if (bullet) {
            closeListsDeeperThan(indent);
            if (listStack.length && indent === listStack[listStack.length - 1]) {
                closeLi();
            } else {
                html += '<ul>';
                listStack.push(indent);
            }
            html += `<li>${renderBold(bullet[1])}`;
            liOpen = true;
        } else {
            closeAllLists();
            html += `<p>${renderBold(line)}</p>`;
        }
    }
    closeAllLists();

    return html;
}
