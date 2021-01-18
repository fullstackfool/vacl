import { can, cannot, has, hasnt } from '@/lib/Directives';
import type { App } from '@vue/runtime-core';
import type { Config } from './lib/ACL';
import ACL from './lib/ACL';

export default {
    install: (app: App, options?: Config): void => {
        const acl = app.config.globalProperties.$vacl = new ACL(options);

        app.directive('can', can(acl));
        app.directive('cannot', cannot(acl));
        app.directive('has', has(acl));
        app.directive('hasnt', hasnt(acl));
    }
};
