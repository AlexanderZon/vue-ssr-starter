import Index from 'src/pages/index.vue';

import Dashboard from 'src/pages/dashboard/index.vue';
import Transactions from 'src/pages/transactions/index.vue';
import Categories from 'src/pages/categories/index.vue';
import Accounts from 'src/pages/accounts/index.vue';

import Admin from 'src/pages/admin.vue';

const routes = [
    { path: '/', component: Index, children: [
        { path: '', name: 'index', component: Dashboard },
        { path: 'transactions', name: 'transactions', component: Transactions },
        { path: 'categories', name: 'categories', component: Categories },
        { path: 'accounts', name: 'accounts', component: Accounts },
    ]},
    {
      path: '/admin', name: 'admin', component: Admin,
    },
];

export default routes;