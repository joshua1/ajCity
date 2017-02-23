const thinky = require('thinky')({
  servers: [
    {
      host: '127.0.0.1',
      port: 28015
    }
  ],
  db: 'Ajala'
}
);

const r = thinky.r;
module.exports.configureDb = function configureDB() {
  console.log('DB Configuration Started');
  const dbExist = r.dbList().contains('Ajala');
  const tableList = r.db('Ajala').tableList();

  if (dbExist) {
    console.log('DB exist');
    if (tableList && tableList.length > 0) {
      if (!tableList.contains('Flight')) {
        r.db('Ajala').tableCreate('Flight').run();
      }
      if (!tableList.contains('Admin')) {
        r.db('Ajala').tableCreate('Admin').run();
      }
      if (!tableList.contains('Session')) {
        r.db('Ajala').tableCreate('Markup').run();
      }
      if (!tableList.contains('Markup')) {
        r.db('Ajala').tableCreate('Markup').run();
      }
    }
  } else {
    console.log('no DB');
    r.dbList().contains('Ajala')
      .do(dbExists => r.branch(dbExists, {
        created: 0
      }, r.dbCreate('Ajala'))).run()
      // Create the tables if they dont exist
      // Flight
      .then(() => tableList.contains('Flight')
        .do(tableExists => r.branch(tableExists, {
          created: 0
        }, r.db('Ajala').tableCreate('Flight'))).run()
    )
      // Admin Table
      .then(() => tableList.contains('Admin')
        .do(tableExists => r.branch(tableExists, {
          created: 0
        }, r.db('Ajala').tableCreate('Admin'))).run()
    )
      // Markups
      .then(() => {
        tableList.contains('Markup')
          .do(tableExists => r.branch(tableExists, {
            created: 0
          }, r.db('Ajala').tableCreate('Markup'))).run();
      })
      // Sessions
      .then(() => {
        tableList.contains('Sessions')
          .do(tableExists => r.branch(tableExists, {
            created: 0
          }, r.db('Ajala').tableCreate('Sessions'))).run();
      })
      //BankAccounts
      .then(() => {
        tableList.contains('BankAccounts')
          .do(tableExists => r.branch(tableExist, {
            created: 0
          }, r.db('Ajala').tableCreate('BankAccounts'))).run();
      });
  }
};
module.exports.DB = r;
module.exports.thinky = thinky;
