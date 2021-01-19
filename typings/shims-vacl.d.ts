import type ACL from '../src/lib/ACL';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $vacl: ACL;
    }
}
