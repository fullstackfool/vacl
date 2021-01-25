import type { Config } from '../../types/config';

export default class ACL {
    private roles: Set<string>;

    private permissions: Set<string>;

    public readonly forceRemove: boolean;

    /**
     * ACL constructor.
     *
     * @param {Config} config
     *
     * @returns {ACL}
     */
    public constructor(config?: Config) {
        this.roles = new Set(config?.roles ?? []);
        this.permissions = new Set(config?.permissions ?? []);
        this.forceRemove = config?.forceRemove ?? false;
    }

    /**
     * Get an array fo the roles.
     *
     * @returns {string[]}
     */
    public getRoles(): string[] {
        return [...this.roles];
    }

    /**
     * Get an array fo the permissions.
     *
     * @returns {string[]}
     */
    public getPermissions(): string[] {
        return [...this.permissions];
    }

    /**
     * Set the roles.
     *
     * @param {string[]} roles
     *
     * @returns {ACL}
     */
    public setRoles(roles: string[]): ACL {
        this.set('roles', roles);

        return this;
    }

    /**
     * Set the permissions.
     *
     * @param {string[]} permissions
     *
     * @returns {ACL}
     */
    public setPermissions(permissions: string[]): ACL {
        this.set('permissions', permissions);

        return this;
    }

    /**
     * Add roles to the existing store.
     *
     * @param {string | string[]} roles
     *
     * @returns {ACL}
     */
    public addRoles(roles: string[] | string): ACL {
        this.add('roles', roles);

        return this;
    }

    /**
     * Add permissions to the existing store.
     *
     * @param {string | string[]} permissions
     *
     * @returns {ACL}
     */
    public addPermissions(permissions: string[] | string): ACL {
        this.add('permissions', permissions);

        return this;
    }

    /**
     * Clear the stored roles.
     *
     * @returns {ACL}
     */
    public clearRoles(): ACL {
        return this.setRoles([]);
    }

    /**
     * Clear the stored permissions.
     *
     * @returns {ACL}
     */
    public clearPermissions(): ACL {
        return this.setPermissions([]);
    }

    /**
     * Clear both the stored roles and permissions.
     *
     * @returns {ACL}
     */
    public clear(): ACL {
        return this.clearRoles().clearPermissions();
    }

    /**
     * Check if all of the roles are present.
     *
     * @param {string|string[]} roles
     *
     * @see hasAllRoles
     * @returns {boolean}
     */
    public has(roles: string[] | string): boolean {
        return this.hasAllRoles(roles);
    }

    /**
     * Check if all of the roles are present.
     *
     * @param {string|string[]} roles
     *
     * @returns {boolean}
     */
    public hasAllRoles(roles: string[] | string): boolean {
        return this.all(this.roles, roles);
    }

    /**
     * Check if any of the roles are present.
     *
     * @param {string|string[]} roles
     *
     * @returns {boolean}
     */
    public hasAnyRoles(roles: string[] | string): boolean {
        return this.any(this.roles, roles);
    }

    /**
     * Check if all of the roles are missing.
     *
     * @param {string|string[]} roles
     *
     * @returns {boolean}
     */
    public missingAllRoles(roles: string[] | string): boolean {
        return this.none(this.roles, roles);
    }

    /**
     * Check if any of the roles are missing.
     *
     * @param {string|string[]} roles
     *
     * @returns {boolean}
     */
    public missingAnyRoles(roles: string[] | string): boolean {
        return !this.all(this.roles, roles);
    }

    /**
     * Check if all of the permissions are present.
     *
     * @param {string|string[]} permissions
     *
     * @see hasAllPermissions
     * @returns {boolean}
     */
    public can(permissions: string[] | string): boolean {
        return this.hasAllPermissions(permissions);
    }

    /**
     * Check if all of the permissions are present.
     *
     * @param {string|string[]} permissions
     *
     * @returns {boolean}
     */
    public hasAllPermissions(permissions: string[] | string): boolean {
        return this.all(this.permissions, permissions);
    }

    /**
     * Check if any of the permissions are present.
     *
     * @param {string|string[]} permissions
     *
     * @returns {boolean}
     */
    public hasAnyPermissions(permissions: string[] | string): boolean {
        return this.any(this.permissions, permissions);
    }

    /**
     * Check if all of the permissions are missing.
     *
     * @param {string|string[]} permissions
     *
     * @returns {boolean}
     */
    public missingAllPermissions(permissions: string[] | string): boolean {
        return this.none(this.permissions, permissions);
    }

    /**
     * Check if any of the permissions are missing.
     *
     * @param {string|string[]} permissions
     *
     * @returns {boolean}
     */
    public missingAnyPermissions(permissions: string[] | string): boolean {
        return !this.all(this.permissions, permissions);
    }

    /**
     * Add permissions to the existing store.
     *
     * @param {string=permissions|roles} set
     * @param {string|string[]} terms
     *
     * @returns {ACL}
     */
    private set(set: 'permissions' | 'roles', terms: string[] | string): void {
        if (set === 'roles') {
            this.roles = new Set(terms);
        } else {
            this.permissions = new Set(terms);
        }
    }

    /**
     * Add permissions to the existing store.
     *
     * @param {string=permissions|roles} set
     * @param {string|string[]} terms
     *
     * @returns {ACL}
     */
    private add(set: 'permissions' | 'roles', terms: string[] | string): void {
        if (Array.isArray(terms)) {
            this[set] = new Set([...this[set], ...terms]);
        } else {
            this[set].add(terms);
        }
    }

    /**
     * Discern that all of the terms are present in the set.
     *
     * @param {Set<string>} set
     * @param {string|string[]} terms
     *
     * @returns {boolean}
     * @private
     */
    private all(set: Set<string>, terms: string[] | string): boolean {
        if (Array.isArray(terms)) {
            return terms.every(term => set.has(term));
        }

        return set.has(terms);
    }

    /**
     * Discern that none of the terms are present in the set.
     *
     * @param {Set<string>} set
     * @param {string|string[]} terms
     *
     * @returns {boolean}
     * @private
     */
    private none(set: Set<string>, terms: string[] | string): boolean {
        if (Array.isArray(terms)) {
            return terms.every(term => !set.has(term));
        }

        return !set.has(terms);
    }

    /**
     * Discern that any of the terms are present in the set.
     *
     * @param {Set<string>} set
     * @param {string|string[]} terms
     *
     * @returns {boolean}
     * @private
     */
    private any(set: Set<string>, terms: string[] | string): boolean {
        if (Array.isArray(terms)) {
            return terms.some(term => set.has(term));
        }

        return set.has(terms);
    }
}
