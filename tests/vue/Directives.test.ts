import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import ACL from '../../src/lib/ACL';
import { can, cannot, has, hasnt } from '../../src/lib/Directives';

/******************************************************************************
 * PERMISSIONS
 *****************************************************************************/
describe('v-can', () => {
    it('will show an element if the single permission is matched', () => {
        const acl = new ACL({ permissions: ['view'] });
        const wrapper = getWrapper(acl,
            `<div v-can="'view'" data-test='visible'></div>
             <div v-can="'edit'" data-test='hidden'></div>`
        );

        expect(wrapper.find('[data-test="visible"]').isVisible()).toBeTruthy();
        expect(wrapper.find('[data-test="hidden"]').isVisible()).toBeFalsy();
    });

    it('will show an element if any of the permissions match', () => {
        const acl = new ACL({ permissions: ['view'] });
        const wrapper = getWrapper(acl,
            `<div v-can:any="'view,edit'" data-test='visible'></div>
             <div v-can:any="'delete,archive'" data-test='hidden'></div>`
        );

        expect(wrapper.find('[data-test="visible"]').isVisible()).toBeTruthy();
        expect(wrapper.find('[data-test="hidden"]').isVisible()).toBeFalsy();
    });

    it('will show an element if all of the permissions match', () => {
        const acl = new ACL({ permissions: ['view', 'edit'] });
        const wrapper = getWrapper(acl,
            `<div v-can:all="'view,edit'" data-test='visible'></div>
             <div v-can:all="'delete,archive'" data-test='hidden'></div>`
        );

        expect(wrapper.find('[data-test="visible"]').isVisible()).toBeTruthy();
        expect(wrapper.find('[data-test="hidden"]').isVisible()).toBeFalsy();
    });
});

describe('v-cannot', () => {
    it('will show an element if the permission is missing', () => {
        const acl = new ACL({ permissions: ['edit'] });
        const wrapper = getWrapper(acl,
            `<div v-cannot="'view'" data-test='visible'></div>
             <div v-cannot="'edit'" data-test='hidden'></div>`
        );

        expect(wrapper.find('[data-test="visible"]').isVisible()).toBeTruthy();
        expect(wrapper.find('[data-test="hidden"]').isVisible()).toBeFalsy();
    });

    it('will show an element if some of the permissions are missing', () => {
        const acl = new ACL({ permissions: ['view', 'delete', 'archive'] });
        const wrapper = getWrapper(acl,
            `<div v-cannot:any="'view,edit'" data-test='visible'></div>
             <div v-cannot:any="'delete,archive'" data-test='hidden'></div>`
        );

        expect(wrapper.find('[data-test="visible"]').isVisible()).toBeTruthy();
        expect(wrapper.find('[data-test="hidden"]').isVisible()).toBeFalsy();
    });

    it('will show an element if all of the permissions are missing', () => {
        const acl = new ACL({ permissions: ['delete'] });
        const wrapper = getWrapper(acl,
            `<div v-cannot:all="'view,edit'" data-test='visible'></div>
             <div v-cannot:all="'delete,archive'" data-test='hidden'></div>`
        );

        expect(wrapper.find('[data-test="visible"]').isVisible()).toBeTruthy();
        expect(wrapper.find('[data-test="hidden"]').isVisible()).toBeFalsy();
    });
});

/******************************************************************************
 * ROLES
 *****************************************************************************/
describe('v-has', () => {
    it('will show an element if the single role is matched', () => {
        const acl = new ACL({ roles: ['staff'] });
        const wrapper = getWrapper(acl,
            `<div v-has="'staff'" data-test='visible'></div>
             <div v-has="'supervisor'" data-test='hidden'></div>`
        );

        expect(wrapper.find('[data-test="visible"]').isVisible()).toBeTruthy();
        expect(wrapper.find('[data-test="hidden"]').isVisible()).toBeFalsy();
    });

    it('will show an element if any of the roles match', () => {
        const acl = new ACL({ roles: ['staff'] });
        const wrapper = getWrapper(acl,
            `<div v-has:any="'staff,supervisor'" data-test='visible'></div>
             <div v-has:any="'manager,admin'" data-test='hidden'></div>`
        );

        expect(wrapper.find('[data-test="visible"]').isVisible()).toBeTruthy();
        expect(wrapper.find('[data-test="hidden"]').isVisible()).toBeFalsy();
    });

    it('will show an element if all of the roles match', () => {
        const acl = new ACL({ roles: ['staff', 'supervisor'] });
        const wrapper = getWrapper(acl,
            `<div v-has:all="'staff,supervisor'" data-test='visible'></div>
             <div v-has:all="'manager,admin'" data-test='hidden'></div>`
        );

        expect(wrapper.find('[data-test="visible"]').isVisible()).toBeTruthy();
        expect(wrapper.find('[data-test="hidden"]').isVisible()).toBeFalsy();
    });
});

describe('v-hasnt', () => {
    it('will show an element if the role is missing', () => {
        const acl = new ACL({ roles: ['staff'] });
        const wrapper = getWrapper(acl,
            `<div v-hasnt="'supervisor'" data-test='visible'></div>
             <div v-hasnt="'staff'" data-test='hidden'></div>`
        );

        expect(wrapper.find('[data-test="visible"]').isVisible()).toBeTruthy();
        expect(wrapper.find('[data-test="hidden"]').isVisible()).toBeFalsy();
    });

    it('will show an element if some of the roles are missing', () => {
        const acl = new ACL({ roles: ['staff', 'manager', 'admin'] });
        const wrapper = getWrapper(acl,
            `<div v-hasnt:any="'staff,supervisor'" data-test='visible'></div>
         <div v-hasnt:any="'manager,admin'" data-test='hidden'></div>`
        );

        expect(wrapper.find('[data-test="visible"]').isVisible()).toBeTruthy();
        expect(wrapper.find('[data-test="hidden"]').isVisible()).toBeFalsy();
    });

    it('will show an element if all of the roles are missing', () => {
        const acl = new ACL({ roles: ['manager'] });
        const wrapper = getWrapper(acl,
            `<div v-hasnt:all="'staff,supervisor'" data-test='visible'></div>
         <div v-hasnt:all="'manager,admin'" data-test='hidden'></div>`
        );

        expect(wrapper.find('[data-test="visible"]').isVisible()).toBeTruthy();
        expect(wrapper.find('[data-test="hidden"]').isVisible()).toBeFalsy();
    });
});

/******************************************************************************
 * PERMISSIONS + ROLES
 *****************************************************************************/
describe('combining directives', () => {
    it('will show an element if both the permissions and roles match', () => {
        const acl = new ACL({ permissions: ['view'], roles: ['manager'] });
        const wrapper = getWrapper(acl,
            `<div v-can="'view'" v-has="'manager'" data-test='visible'></div>
         <div v-can="'edit'" v-has="'admin'" data-test='hidden'></div>`
        );

        expect(wrapper.find('[data-test="visible"]').isVisible()).toBeTruthy();
        expect(wrapper.find('[data-test="hidden"]').isVisible()).toBeFalsy();
    });
});

/******************************************************************************
 * DOM REMOVAL
 *****************************************************************************/
describe('dom removal', () => {
    it('will also remove the element if configured', () => {
        const acl = new ACL({
            permissions: ['view'],
            roles: ['staff'],
            forceRemove: true
        });
        const wrapper = getWrapper(acl,
            `<div v-can="'view'" data-test='existing-permission'></div>
             <div v-can="'edit'" data-test='removed-permission'></div>
             <div v-has="'staff'" data-test='existing-role'></div>
             <div v-has="'admin'" data-test='removed-role'></div>`
        );

        expect(wrapper.find('[data-test="existing-permission"]').exists()).toBeTruthy();
        expect(wrapper.find('[data-test="removed-permission"]').exists()).toBeFalsy();

        expect(wrapper.find('[data-test="existing-role"]').exists()).toBeTruthy();
        expect(wrapper.find('[data-test="removed-role"]').exists()).toBeFalsy();
    });
});


// eslint-disable-next-line jest/no-commented-out-tests
// describe('binding validation', () => {
// eslint-disable-next-line jest/no-commented-out-tests
//     it('will throw an error when an incorrect binding is used', () => {
//         const acl = new ACL();
//
//         const incorrectType = () => {
//             getWrapper(acl, `<div v-can='1'></div>`);
//         };
//
//         expect(incorrectType).toThrow("Value passed to v-can should be a non-empty string. \"1\" passed.");
//     });
//
// eslint-disable-next-line jest/no-commented-out-tests
//     it('will throw an error when an empty binding is used', () => {
//         const acl = new ACL();
//
//         const incorrectType = () => {
//             getWrapper(acl, `<div v-can='1'></div>`);
//         };
//
//         expect(incorrectType).toThrow("Value passed to v-can should be a non-empty string. \"1\" passed.");
//     });
// });

/**
 * Create a test wrapper.
 *
 * @param {ACL} acl
 * @param {string} template
 *
 * @returns {VueWrapper<any>}
 */
function getWrapper(acl: ACL, template: string): VueWrapper<any> {
    return mount({ template }, {
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
