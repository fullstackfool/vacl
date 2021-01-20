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
                handleNode(acl, el);
            }

            return;
        }

        const values = binding.value.split(',');

        if (binding.arg === 'any') {
            if (!acl.hasAnyPermissions(values)) {
                handleNode(acl, el);
            }
        }

        if (binding.arg === 'all') {
            if (!acl.hasAllPermissions(values)) {
                handleNode(acl, el);
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
                handleNode(acl, el);
            }

            return;
        }

        const values = binding.value.split(',');

        if (binding.arg === 'any') {
            if (!acl.missingAnyPermissions(values)) {
                handleNode(acl, el);
            }
        }

        if (binding.arg === 'all') {
            if (!acl.missingAllPermissions(values)) {
                handleNode(acl, el);
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
                handleNode(acl, el);
            }

            return;
        }

        const values = binding.value.split(',');

        if (binding.arg === 'any') {
            if (!acl.hasAnyRoles(values)) {
                handleNode(acl, el);
            }
        }

        if (binding.arg === 'all') {
            if (!acl.hasAllRoles(values)) {
                handleNode(acl, el);
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
                handleNode(acl, el);
            }

            return;
        }

        const values = binding.value.split(',');

        if (binding.arg === 'any') {
            if (!acl.missingAnyRoles(values)) {
                handleNode(acl, el);
            }
        }

        if (binding.arg === 'all') {
            if (!acl.missingAllRoles(values)) {
                handleNode(acl, el);
            }
        }
    };
}

/**
 * Handle the node based on the ACL settings.
 *
 * @param {ACL} acl
 * @param {HTMLElement} el
 *
 * @returns {void}
 */
function handleNode(acl: ACL, el: HTMLElement): void {
    if (acl.forceRemove) {
        return commentNode(el);
    }

    hideNode(el);
}

/**
 * Hide an element in the DOM.
 *
 * @param {HTMLElement} el
 *
 * @returns {void}
 */
function hideNode(el: HTMLElement): void {
    el.style.display = 'none';
}

/**
 * Remove an element from the DOM.
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

    if (el.parentNode) {
        el.parentNode.replaceChild(comment, el);
    }
}
