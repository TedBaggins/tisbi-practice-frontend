import axios from '@/api/axios';

const getStudents = () => {
    return axios.get(`/students`).then(response => response.data);
}

const addStudent = formData => {
    return axios.post('/students', formData).then(response => response.data);
}

const deleteStudent = id => {
    return axios.delete(`/students/${id}`);
}

export default {
    getStudents,
    addStudent,
    deleteStudent
}