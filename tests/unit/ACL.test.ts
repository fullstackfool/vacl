import ACL from '@/lib/ACL';

describe('acl', () => {
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

    it('can_clear_the_roles', () => {
        const config = {
            roles: ['admin']
        };
        const acl = new ACL(config).clearRoles();

        expect(acl.getRoles()).toStrictEqual([]);
    });

    it('can_clear_the_permissions', () => {
        const config = {
            permissions: ['view']
        };
        const acl = new ACL(config).clearPermissions();

        expect(acl.getPermissions()).toStrictEqual([]);
    });

    it('can_clear_both_the roles_and_permissions', () => {
        const config = {
            roles: ['admin'],
            permissions: ['view']
        };
        const acl = new ACL(config).clear();

        expect(acl.getRoles()).toStrictEqual([]);
        expect(acl.getPermissions()).toStrictEqual([]);
    });

    it('can_calculate_if_all_roles_are_present', () => {
        const config = {
            roles: ['admin', 'manager', 'supervisor']
        };
        const acl = new ACL(config);

        expect(acl.hasAllRoles('admin')).toBeTruthy();
        expect(acl.hasAllRoles(['admin', 'manager'])).toBeTruthy();

        expect(acl.hasAllRoles('intern')).toBeFalsy();
        expect(acl.hasAllRoles(['admin', 'intern'])).toBeFalsy();
    });

    it('can_calculate_if_any_roles_are_present', () => {
        const config = {
            roles: ['admin', 'manager', 'supervisor']
        };
        const acl = new ACL(config);

        expect(acl.hasAnyRoles('manager')).toBeTruthy();
        expect(acl.hasAnyRoles(['admin', 'manager'])).toBeTruthy();

        expect(acl.hasAnyRoles('intern')).toBeFalsy();
        expect(acl.hasAnyRoles(['worker', 'intern'])).toBeFalsy();
    });

    it('can_calculate_if_all_roles_are_missing', () => {
        const config = {
            roles: ['admin', 'manager', 'supervisor']
        };
        const acl = new ACL(config);

        expect(acl.missingAllRoles('intern')).toBeTruthy();
        expect(acl.missingAllRoles(['worker', 'intern'])).toBeTruthy();

        expect(acl.missingAllRoles('admin')).toBeFalsy();
        expect(acl.missingAllRoles(['admin', 'intern'])).toBeFalsy();
    });

    it('can_calculate_if_any_roles_are_missing', () => {
        const config = {
            roles: ['admin', 'manager', 'supervisor']
        };
        const acl = new ACL(config);

        expect(acl.missingAnyRoles('intern')).toBeTruthy();
        expect(acl.missingAnyRoles(['admin', 'intern'])).toBeTruthy();

        expect(acl.missingAnyRoles('admin')).toBeFalsy();
        expect(acl.missingAnyRoles(['admin', 'manager'])).toBeFalsy();
    });

    it('can_calculate_if_all_permissions_are_present', () => {
        const config = {
            permissions: ['edit', 'view', 'delete']
        };
        const acl = new ACL(config);

        expect(acl.hasAllPermissions('edit')).toBeTruthy();
        expect(acl.hasAllPermissions(['edit', 'view'])).toBeTruthy();

        expect(acl.hasAllPermissions('duplicate')).toBeFalsy();
        expect(acl.hasAllPermissions(['edit', 'duplicate'])).toBeFalsy();
    });

    it('can_calculate_if_any_permissions_are_present', () => {
        const config = {
            permissions: ['edit', 'view', 'delete']
        };
        const acl = new ACL(config);

        expect(acl.hasAnyPermissions('view')).toBeTruthy();
        expect(acl.hasAnyPermissions(['edit', 'view'])).toBeTruthy();

        expect(acl.hasAnyPermissions('duplicate')).toBeFalsy();
        expect(acl.hasAnyPermissions(['archive', 'duplicate'])).toBeFalsy();
    });

    it('can_calculate_if_all_permissions_are_missing', () => {
        const config = {
            permissions: ['edit', 'view', 'delete']
        };
        const acl = new ACL(config);

        expect(acl.missingAllPermissions('duplicate')).toBeTruthy();
        expect(acl.missingAllPermissions(['archive', 'duplicate'])).toBeTruthy();

        expect(acl.missingAllPermissions('edit')).toBeFalsy();
        expect(acl.missingAllPermissions(['edit', 'duplicate'])).toBeFalsy();
    });

    it('can_calculate_if_any_permissions_are_missing', () => {
        const config = {
            permissions: ['edit', 'view', 'delete']
        };
        const acl = new ACL(config);

        expect(acl.missingAnyPermissions('duplicate')).toBeTruthy();
        expect(acl.missingAnyPermissions(['edit', 'duplicate'])).toBeTruthy();

        expect(acl.missingAnyPermissions('edit')).toBeFalsy();
        expect(acl.missingAnyPermissions(['edit', 'view'])).toBeFalsy();
    });
});
