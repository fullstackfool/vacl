import type ACL from '../src/lib/ACL';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        [key: string]: ACL | any;
    }
}

export type Directives = {
    can?: string,
    cannot?: string,
    has?: string,
    hasnt?: string
}

export type Config = {
    roles?: string[];
    permissions?: string[];
    forceRemove?: boolean;
    accessor?: string
    directives?: Directives
};
