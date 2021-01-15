export type Config = {
    roles?: Roles;
    permissions?: Permissions;
};

export type Roles = string[];
export type Permissions = string[];

export default class ACL {
    private roles: Set<string>;
    private permissions: Set<string>;

    /**
     * ACL constructor.
     *
     * @param {Config} config
     *
     * @returns {ACL}
     */
    constructor(config: Config | null = null) {
        this.roles = new Set(config?.roles ?? []);
        this.permissions = new Set(config?.permissions ?? []);
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
     * @param {Roles} roles
     *
     * @returns {ACL}
     */
    public setRoles(roles: Roles): ACL {
        this.set('roles', roles);

        return this;
    }

    /**
     * Set the permissions.
     *
     * @param {Permissions} permissions
     *
     * @returns {ACL}
     */
    public setPermissions(permissions: Permissions): ACL {
        this.set('permissions', permissions);

        return this;
    }

    /**
     * Add roles to the existing store.
     *
     * @param {Roles | string} roles
     *
     * @returns {ACL}
     */
    public addRoles(roles: string | Roles): ACL {
        this.add('roles', roles);

        return this;
    }

    /**
     * Add permissions to the existing store.
     *
     * @param {Permissions | string} permissions
     *
     * @returns {ACL}
     */
    public addPermissions(permissions: string | Permissions): ACL {
        this.add('permissions', permissions);

        return this;
    }

    /**
     * Add permissions to the existing store.
     *
     * @param {string=permissions|roles} set
     * @param {string|string[]} terms
     *
     * @returns {ACL}
     *
     * todo: Get the 'set' string to properly typehint as a method name eg: <M>
     */
    private set(set: 'roles' | 'permissions', terms: string | string[]): void {
        this[set] = new Set(terms);
    }

    /**
     * Add permissions to the existing store.
     *
     * @param {string=permissions|roles} set
     * @param {string|string[]} terms
     *
     * @returns {ACL}
     */
    private add(set: 'roles' | 'permissions', terms: string | string[]): void {
        if (Array.isArray(terms)) {
            this[set] = new Set([...this[set], ...terms]);
        } else {
            this[set].add(terms);
        }
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
    public clear() {
        return this.clearRoles().clearPermissions();
    }

    public hasAllPermissions(permissions: string | string[]): boolean {
        return this.all(this.permissions, permissions);
    }

    public hasAnyPermissions(permissions: string | string[]): boolean {
        console.log(permissions);
        return this.any(this.permissions, permissions);
    }

    public missingAllPermissions(permissions: string | string[]): boolean {
        return !this.all(this.permissions, permissions);
    }

    public missingAnyPermissions(permissions: string | string[]): boolean {
        return !this.any(this.permissions, permissions);
    }

    private all(set: Set<string>, terms: string | string[]): boolean {
        if (Array.isArray(terms)) {
            return terms.every(term => set.has(term));
        }

        return set.has(terms);
    }

    private any(set: Set<string>, terms: string | string[]): boolean {
        if (Array.isArray(terms)) {
            return terms.some(term => set.has(term));
        }

        return set.has(terms);
    }
}
