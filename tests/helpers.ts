import type ACL from '@/lib/ACL';
import type { VueWrapper } from '@vue/test-utils';
import { shallowMount } from '@vue/test-utils';
import { can, cannot, has, hasnt } from '@/lib/Directives';

/**
 * Create a test wrapper.
 *
 * @param {ACL} acl
 * @param {string} template
 *
 * @returns {VueWrapper<any>}
 */
export function getWrapper(acl: ACL, template: string): VueWrapper<any> {
    return shallowMount({ template }, {
        global: {
            directives: {
                can: can(acl),
                cannot: cannot(acl),
                has: has(acl),
                hasnt: hasnt(acl)
            }
        }
    });
}
