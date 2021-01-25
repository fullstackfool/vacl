/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { can, cannot, has, hasnt } from './lib/Directives';
import type { App } from '@vue/runtime-core';
import type { Config, Directives } from '../types/config';
import ACL from './lib/ACL';

const defaults: Required<Config> = {
    roles: [],
    permissions: [],
    forceRemove: false,
    accessor: '$vacl',
    directives: {
        can: 'can',
        cannot: 'cannot',
        has: 'has',
        hasnt: 'hasnt'
    } as Required<Directives>
};

export default {
    install: (app: App, options?: Config): void => {
        const directives = { ...defaults.directives, ...Object(options?.directives) };
        const acl = app.config.globalProperties[options?.accessor ?? defaults.accessor] = new ACL(options);

        app.directive(directives.can, can(acl));
        app.directive(directives.cannot, cannot(acl));
        app.directive(directives.has, has(acl));
        app.directive(directives.hasnt, hasnt(acl));
    }
};
