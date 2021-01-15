import type { App } from '@vue/runtime-core';
import type { Config } from './lib/ACL';
import ACL from './lib/ACL';

function commentNode(el: HTMLElement) {
    const comment = document.createComment(' ');

    Object.defineProperty(comment, 'setAttribute', {
        value: () => undefined
    });

    // TODO: Find Vue3 alternative for below.
    // vnode.text = ' ';
    // vnode.elm = comment;
    // vnode.isComment = true;
    // vnode.context = undefined;
    // vnode.tag = undefined;
    // if (vnode.data) {
    //     vnode.data.directives = undefined;
    // }
    // if (vnode.componentInstance) {
    //     vnode.componentInstance.$el = comment;
    // }

    if (el.parentNode) {
        el.parentNode.replaceChild(comment, el);
    }
}

export default {
    install: (app: App, config: Config): void => {
        const acl = app.config.globalProperties.$vacl = new ACL(config);

        app.directive('can', {
            mounted(el: HTMLElement, binding) {
                if (acl.missingAnyPermissions(binding.value)) {
                    commentNode(el);
                }
            },
            beforeUpdate(el: HTMLElement, binding) {
                if (acl.missingAnyPermissions(binding.value)) {
                    commentNode(el);
                }
            }
        });
    }
};
