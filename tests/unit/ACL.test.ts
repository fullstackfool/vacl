/* eslint-env jest */

import ACL from '../../src/lib/ACL';

describe('ACL', () => {
    it('can_be_instantiated', () => {
        const acl = new ACL();

        expect(acl).toBeInstanceOf(ACL);
    });

    it('can_be_instantiated_with_a_config', () => {
        const config = {
            roles: ['admin'],
            permissions: ['edit']
        };
        const acl = new ACL(config);

        expect(acl.getRoles()).toStrictEqual(config.roles);
        expect(acl.getPermissions()).toStrictEqual(config.permissions);
    });

    it('can_return_empty_roles', () => {
        const acl = new ACL();

        expect(acl.getRoles()).toStrictEqual([]);
    });

    it('can_return_empty_permissions', () => {
        const acl = new ACL();

        expect(acl.getPermissions()).toStrictEqual([]);
    });

    it('can_replace_the_existing_roles', () => {
        const config = {
            roles: ['admin']
        };
        const acl = new ACL(config);

        expect(acl.getRoles()).toStrictEqual(config.roles);

        acl.setRoles(['manager']);
        expect(acl.getRoles()).toStrictEqual(['manager']);
    });

    it('can_replace_the_existing_permissions', () => {
        const config = {
            permissions: ['edit']
        };
        const acl = new ACL(config);

        expect(acl.getPermissions()).toStrictEqual(config.permissions);

        acl.setPermissions(['view']);
        expect(acl.getPermissions()).toStrictEqual(['view']);
    });

    it('can_add_a_single_role', () => {
        const config = {
            roles: ['admin']
        };
        const acl = new ACL(config).addRoles('manager');
        expect(acl.getRoles()).toStrictEqual(['admin', 'manager']);
    });

    it('can_add_multiple_roles', () => {
        const config = {
            roles: ['admin']
        };
        const acl = new ACL(config).addRoles(['manager', 'supervisor']);
        expect(acl.getRoles()).toStrictEqual(['admin', 'manager', 'supervisor']);
    });

    it('can_add_a_single_permission', () => {
        const config = {
            permissions: ['edit']
        };
        const acl = new ACL(config);

        acl.addPermissions('view');

        expect(acl.getPermissions()).toStrictEqual(['edit', 'view']);
    });

    it('can_add_multiple_permissions', () => {
        const config = {
            permissions: ['edit']
        };
        const acl = new ACL(config);

        acl.addPermissions(['view', 'delete']);

        expect(acl.getPermissions()).toStrictEqual(['edit', 'view', 'delete']);
    });
});
