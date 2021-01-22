import { mount } from '@vue/test-utils';
import { createApp, h } from 'vue';
import ACL from '../../src/lib/ACL';
import Vacl from '../../src/index';

describe('reactivity', () => {
    it('can be installed correctly', () => {
        const app = createApp({
            template: '<div></div>'
        }).use(Vacl);

        expect(app.config.globalProperties.$vacl).toBeInstanceOf(ACL);
    });

    it('provides the acl globally to all components', () => {
        const component = {
            render() {
                return h('div');
            }
        };

        const app = mount(component, {
            global: {
                plugins: [[Vacl, { permissions: ['view'] }]]
            }
        });

        expect(app.vm.$vacl).toBeInstanceOf(ACL);
        expect(app.vm.$vacl.can('view')).toBeTruthy();
        expect(app.vm.$vacl.has('admin')).toBeFalsy();
    });
});
