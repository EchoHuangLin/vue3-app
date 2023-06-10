import type { App } from 'vue';
import useUser from '@/store/useUser';

export default {
    install(app: App) {
        app.directive("role",(el, binding)=> {
                let user = useUser();
                if (binding.value === user.role ) {
                    el.style.display = "block";
                } else {
                    el.style.display = "none";
                }
            }
        )
    }
}
