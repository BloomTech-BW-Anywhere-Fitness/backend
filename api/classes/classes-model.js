const db = require('../data/db-config');

const getAllClasses = async () => {
    return db('classes')
}

const getClassById = async (id) => {
    const result = await db('classes').where('class_id', id).first();
    return result;
}

const insertClass = async (resource) => {
    const [newClassObject] = await db('classes').insert(resource, ['class_id', 'name', 'instructor_username', 'type', 'start_time', 'duration', 'intensity', 'location', 'attendees', 'class_size'])
  return newClassObject
}

const updateClass = async (id, changes) => {
    return db('classes')
        .where('class_id', id)
        .update(changes, '*')
}

const deleteClass = (id) => {
    return db('classes')
        .where('class_id', id)
        .del();
}

module.exports = {
    getAllClasses,
    getClassById,
    insertClass,
    updateClass,
    deleteClass
};