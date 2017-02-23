import rethink from 'rethinkdbdash';
import service from 'feathers-rethinkdb';

module.exports=function(){
    const r = rethink({
        db: 'Ajala'
    });
    const app=this;
    app.use('/bankAccounts',service({
        Model:r,
        name:'BankAccounts',

    }));
}
