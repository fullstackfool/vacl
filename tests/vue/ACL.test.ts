import { shallowMount, VueWrapper } from '@vue/test-utils';
import { createApp, h } from 'vue';
import ACL from '@/lib/ACL';
import Vacl from '@/index';

describe('vue', () => {
    const component = {
        render() {
            return h('div');
        }
    };

    it('can be installed correctly', () => {
        const app = createApp(component).use(Vacl);

        expect(app.config.globalProperties.$vacl).toBeInstanceOf(ACL);
    });

    it('provides the acl globally to all components', () => {
        const wrapper = shallowMount(component, {
            global: {
                plugins: [[Vacl, { permissions: ['view'] }]]
            }
        });

        expect(wrapper.vm.$vacl).toBeInstanceOf(ACL);
        expect(wrapper.vm.$vacl.can('view')).toBe(true);
        expect(wrapper.vm.$vacl.has('admin')).toBe(false);
    });

    it('should be able to configure global accessor name', () => {
        const wrapper = shallowMount(component, {
            global: {
                plugins: [[Vacl, { accessor: '$acl' }]]
            }
        });

        expect(wrapper.vm.$acl).toBeInstanceOf(ACL);
    });

    it('should be able to set the directive names from the config', () => {
        const div = document.createElement('div');
        div.id = 'id';
        document.body.appendChild(div);

        const app = createApp({
            template: `<div v-able="'view'" data-test='visible'></div>
             <div v-able="'edit'" data-test='hidden'></div>`
        })
            .use(Vacl, { directives: { can: 'able' }, permissions: ['view'] });

        const wrapper = new VueWrapper(app, app.mount('#id'));

        expect(wrapper.find('[data-test="visible"]').isVisible()).toBe(true);
        expect(wrapper.find('[data-test="hidden"]').isVisible()).toBe(false);
    });
});
