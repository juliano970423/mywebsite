// customShowdownExtensions.js
export default function alert() {
    return [
        {
            type: 'lang',
            regex: />\[!(\w+)\](.+)/g,
            replace: function (wholeMatch, type, content) {
                // 根据不同的类型生成不同的HTML
                console.log(content)
                switch (type.toLowerCase()) {
                    case 'important':
                        return `<div style="padding: 15px; margin-bottom: 20px; border: 1px solid #f5c6cb; background-color: #f8d7da; color: #721c24; border-radius: 4px;">${content.trim()}</div>`;
                    case 'note':
                        return `<div style="padding: 15px; margin-bottom: 20px; border: 1px solid #bee5eb; background-color: #d1ecf1; color: #0c5460; border-radius: 4px;">${content.trim()}</div>`;
                    case 'warning':
                        return `<div style="padding: 15px; margin-bottom: 20px; border: 1px solid #ffeeba; background-color: #fff3cd; color: #856404; border-radius: 4px;">${content.trim()}</div>`;
                    default:
                        return `<div style="padding: 15px; margin-bottom: 20px; border: 1px solid #ccc; background-color: #f8f9fa; color: #212529; border-radius: 4px;">${content.trim()}</div>`;
                }
            }
        }
    ];
}
