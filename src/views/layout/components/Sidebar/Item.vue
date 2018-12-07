<script>
    export default {
        name: 'MenuItem',
        functional: true,
        props: {
            icon: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            }
        },
        render(createElement, context) {
            const {icon, title} = context.props;
            const vNodes = [];

            if (icon) {
                //vNodes.push(<svg-icon icon-class={icon}/>);
                vNodes.push(createElement('svg-icon', {
                    attrs: {
                        'icon-class': icon
                    },
                }));
            }
            if (title) {
                //vNodes.push(<span slot='title'>{(title)}</span>);
                vNodes.push(createElement('span', {
                    attrs: {
                        'slot': title
                    },
                    domProps: {
                        innerHTML: title
                    }
                }));
            }
            return vNodes;
        }
    }
</script>
