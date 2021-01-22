import type ACL from '../src/lib/ACL';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $vacl: ACL;
    }
}

export type Config = {
    roles?: string[];
    permissions?: string[];
    forceRemove?: boolean;
};
