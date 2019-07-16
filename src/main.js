import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import App from './App.vue'
import router from './router'
import Net from '@/network/net'
import Evt from '@/event/bus'
import {
    Message,
    Notification,
    Loading,
    Progress,
    Input,
    Checkbox,
    Tooltip,
    Popover,
    Button,
    Link,
    Menu,
    MenuItem,
    Card,
    Dialog,
    Select,
    Option,
    Table,
    TableColumn,
    Badge,
    Form,
    FormItem,
    Tree
} from 'element-ui'

Vue.prototype.$net = Net
Vue.prototype.$uris = Net.uris
Vue.prototype.$db = Net.db
Vue.prototype.$evt = Evt

Vue.prototype.$msg = Message
Vue.prototype.$notify = Notification
Vue.use(VueClipboard)
Vue.use(Loading)
Vue.component(Input.name, Input)
Vue.component(Progress.name, Progress)
Vue.component(Checkbox.name, Checkbox)
Vue.component(Tooltip.name, Tooltip)
Vue.component(Popover.name, Popover)
Vue.component(Button.name, Button)
Vue.component(Link.name, Link)
Vue.component(Menu.name, Menu)
Vue.component(MenuItem.name, MenuItem)
Vue.component(Card.name, Card)
Vue.component(Dialog.name, Dialog)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Badge.name, Badge)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Tree.name, Tree)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')