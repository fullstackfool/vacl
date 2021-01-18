import { Directive, DirectiveBinding } from '@vue/runtime-core';
import type ACL from './ACL';

/**
 * Directive to assert permissions.
 *
 * @param {ACL} acl
 *
 * @returns {Directive<HTMLElement, DirectiveBinding>}
 */
export function can(acl: ACL): Directive<HTMLElement, DirectiveBinding> {
    return (el: HTMLElement, binding: DirectiveBinding): void => {
        if (!binding.arg) {
            if (acl.missingAnyPermissions(binding.value)) {
                commentNode(el);
            }

            return;
        }

        const values = binding.value.split(',');

        if (binding.arg === 'any') {
            if (!acl.hasAnyPermissions(values)) {
                commentNode(el);
            }
        }

        if (binding.arg === 'all') {
            if (!acl.hasAllPermissions(values)) {
                commentNode(el);
            }
        }
    };
}

/**
 * Directive to assert missing permissions.
 *
 * @param {ACL} acl
 *
 * @returns {Directive<HTMLElement, DirectiveBinding>}
 */
export function cannot(acl: ACL): Directive<HTMLElement, DirectiveBinding> {
    return (el: HTMLElement, binding: DirectiveBinding): void => {
        if (!binding.arg) {
            if (acl.hasAllPermissions(binding.value)) {
                commentNode(el);
            }

            return;
        }

        const values = binding.value.split(',');

        if (binding.arg === 'any') {
            if (!acl.missingAnyPermissions(values)) {
                commentNode(el);
            }
        }

        if (binding.arg === 'all') {
            if (!acl.missingAllPermissions(values)) {
                commentNode(el);
            }
        }
    };
}

/**
 * Directive to assert roles.
 *
 * @param {ACL} acl
 *
 * @returns {Directive<HTMLElement, DirectiveBinding>}
 */
export function has(acl: ACL): Directive<HTMLElement, DirectiveBinding> {
    return (el: HTMLElement, binding: DirectiveBinding): void => {
        if (!binding.arg) {
            if (acl.missingAnyRoles(binding.value)) {
                commentNode(el);
            }

            return;
        }

        const values = binding.value.split(',');

        if (binding.arg === 'any') {
            if (!acl.hasAnyRoles(values)) {
                commentNode(el);
            }
        }

        if (binding.arg === 'all') {
            if (!acl.hasAllRoles(values)) {
                commentNode(el);
            }
        }
    };
}

/**
 * Directive to assert missing roles.
 *
 * @param {ACL} acl
 *
 * @returns {Directive<HTMLElement, DirectiveBinding>}
 */
export function hasnt(acl: ACL): Directive<HTMLElement, DirectiveBinding> {
    return (el: HTMLElement, binding: DirectiveBinding): void => {
        if (!binding.arg) {
            if (acl.hasAllRoles(binding.value)) {
                commentNode(el);
            }

            return;
        }

        const values = binding.value.split(',');

        if (binding.arg === 'any') {
            if (!acl.missingAnyRoles(values)) {
                commentNode(el);
            }
        }

        if (binding.arg === 'all') {
            if (!acl.missingAllRoles(values)) {
                commentNode(el);
            }
        }
    };
}

/**
 * Remove the element from the DOM.
 *
 * @param {HTMLElement} el
 *
 * @returns {void}
 */
function commentNode(el: HTMLElement): void {
    const comment = document.createComment(' ');

    //TODO: Loosing 2% test coverage due to this closure.
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
