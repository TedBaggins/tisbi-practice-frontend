import axios from '@/api/axios';

const getFaculties = () => {
    return axios.get(`/faculties`).then(response => response.data);
}

const addFaculty = formData => {
    return axios.post('/faculties', formData).then(response => response.data);
}

const deleteFaculty = id => {
    return axios.delete(`/faculties/${id}`);
}

export default {
    getFaculties,
    addFaculty,
    deleteFaculty
}