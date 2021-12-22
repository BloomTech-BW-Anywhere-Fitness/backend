exports.seed = function(knex, Promise) {
    return knex('classes').insert([
      { 
        name: 'Bootcamp challenge!', 
        instructor_username: 'hughespham', 
        type: 'bootcamp', 
        start_time: '6pm Friday', 
        duration: '45 mins', 
        intensity: 'advanced', 
        location: '123 Grove St', 
        class_size: 20 
      },
      { 
        name: 'Pumping iron at the beach!', 
        instructor_username: 'hughespham', 
        type: 'weightlifting', 
        start_time: '5pm Thursday', 
        duration: '45 mins', 
        intensity: 'beginner', 
        location: '456 Beach Blvd', 
        class_size: 15 }
    ]);
  };