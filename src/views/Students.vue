<template>
    <div class="students-page">
        <div class="container page">
            <div class="content-box">
                <div class="row">
                    <div class="col-md-8">
                        <div v-if="errorDelete" class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Ошибка!</strong> Нельзя удалить запись.
                            <button type="button" @click="closeWarningDelete" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div v-if="errorAdd" class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Ошибка!</strong> Заполните все поля.
                            <button type="button" @click="closeWarningAdd" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div v-if="loading">Loading...</div>
                        <div v-else>
                            <table class="table table-striped table-dark text-center">
                                <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">ФИО</th>
                                    <th scope="col">Факультет</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="student in students" v-bind:key="student.id">
                                    <th scope="row">{{ student.id }}</th>
                                    <td>{{ student.fio }}</td>
                                    <td>{{ student.faculty.name }}</td>
                                    <div class="float-right">
                                        <td><button class="btn btn-delete" @click="deleteStudent(student.id)"><i class="fa fa-close"></i></button></td>
                                    </div>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-box bg-dark">
                            <form class="form-add-student" @submit.prevent="addStudentForm">
                                <div class="text-center form-title-box">
                                    <p>Добавить студента</p>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="addStudentFio" name="student_fio" id="form-add-student-fio" placeholder="ФИО">
                                </div>
                                <div class="form-group row">
                                    <label for="form-add-student-fac" class="col-sm-3">Факультет</label>
                                    <div class="col-sm-9">
                                        <select v-model="addStudentFacId" class="form-control" id="form-add-student-fac">
                                            <option disabled value="">Выберите</option>
                                            <option v-for="faculty in faculties" v-bind:key="faculty.id" v-bind:value="faculty.id">{{ faculty.name }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="text-center form-btn-box">
                                    <button type="submit" class="btn btn-primary">Отправить</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import studentsApi from '@/api/student';
    import facultiesApi from '@/api/faculty';

    export default {
        name: 'TpStudents',
        data() {
            return {
                loading: false,
                errorDelete: false,
                errorAdd: false,
                students: [],
                faculties: [],
                addStudentFio: '',
                addStudentFacId: '',
                studentId: '',
            }
        },
        methods: {
            addStudentForm: function () {
                if (this.addStudentFio == '' || this.addStudentFacId == '') {
                    this.errorAdd = true;
                    return;
                }
                const formData = {
                    fio: this.addStudentFio,
                    faculty_id: this.addStudentFacId,
                };
                studentsApi.addStudent(formData)
                    .then(async res => {
                        console.log(res);
                        this.loading = true;
                        this.students = await studentsApi.getStudents();
                        this.loading = false;
                        this.addStudentFio = '';
                        this.addStudentFacId = '';
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            deleteStudent: function (id) {
                console.log(id);
                studentsApi.deleteStudent(id)
                    .then(async (results) => {
                        console.log(results)
                        this.loading = true;
                        this.students = await studentsApi.getStudents();
                        this.loading = false;
                    })
                    .catch(error => {
                        console.log(error);
                        this.errorDelete = true;
                    })
                this.loading = false;
            },
            closeWarningDelete: function () {
                this.errorDelete = false;
            },
            closeWarningAdd: function () {
                this.errorAdd = false;
            }
        },
        mounted() {
            this.loading = true;
            studentsApi.getStudents()
                .then((results) => {
                    this.students = results;
                    this.loading = false;
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => (this.loading = false));
            facultiesApi.getFaculties()
                .then((results) => {
                    console.log(results);
                    this.faculties = results;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
</script>