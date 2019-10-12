
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Students').del()
    .then(function () {
      // Inserts seed entries
      return knex('Students').insert([
        {
          name: 'Aubrey Snider',
          isActive: true,
          cohortId: 1,
          username: 'aubrey',
          password: 'aStudent'
        },
        {
          name: 'Joey',
          isActive: true,
          cohortId: 1,
          username: 'joey',
          password: 'jStudent'
        },
        {
          name: 'Ryan',
          isActive: false,
          cohortId: 1,
          username: 'ryan',
          password: 'rStudent'
        },
        {
          name: 'Sarah',
          isActive: true,
          cohortId: 2,
          username: 'sarah',
          password: 'sStudent'
        },
        // {
        //   name: 'Chantee',
        //   isActive: true,
        //   cohortID: 1,
        //   username: 'chantee',
        //   password: 'cStudent'
        // },
        // {
        //   name: 'Laura',
        //   isActive: true,
        //   cohortID: 2,
        //   username: 'laura',
        //   password: 'lStudent'
        // },

      ]);
    });
};
